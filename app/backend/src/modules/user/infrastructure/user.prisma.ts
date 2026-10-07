import { prisma } from "@/config/prisma.js";
import { IUserRepository } from "../domain/User.repository.js";
import { UserEntity } from "../domain/User.js";
import { Prisma, Profile, User } from "../../../../generated/prisma/client.js";
import { AppError, ConflictError, NotFoundPage } from "@/errors/AppError.js";
import bcrypt from "bcrypt"
import { Role } from "../../../../generated/prisma/enums.js";
import { CreateUserInput, UpdateUserInput } from "@/lib/user.shema.js";

type recordsType = User & {
    profile?: Profile | null
}


export class UserPrismaConfig implements IUserRepository {
    private userMapper(raw: recordsType): UserEntity {
        return {
            id: raw.id,
            email: raw.email,
            role: raw.role,
            profile: raw.profile ? {
                firstname: raw.profile.firstName ?? undefined,
                lastname: raw.profile.lastName ?? undefined,
                profession: raw.profile.profession ?? undefined
            } : undefined
        }
    }

    async readUsers(): Promise<UserEntity[]> {
        const records = await prisma.user.findMany(
            {
                orderBy: { email: "asc" },
                include: { profile: true }
            }
        )
        return records.map(r => this.userMapper(r))
    }

    async createUser(data: CreateUserInput): Promise<UserEntity> {
        const exist = await prisma.user.findUnique({ where: { email: data.email } })
        if (exist) throw new ConflictError("User already exist")

        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(data.password, salt)

        const record = await prisma.user.create({
            data: {
                email: data.email,
                passwordHash,
                role: data.role ?? Role.USER,
                profile: data.profile ? {
                    create: {
                        firstName: data.profile?.firstname ?? null,
                        lastName: data.profile?.lastname ?? null,
                        profession: data.profile?.profession ?? null
                    }

                } : undefined

            },
            include: { profile: true }
        })
        return this.userMapper(record)

    }

    async updateUser(id: string, data: UpdateUserInput): Promise<UserEntity> {
        const exist = await prisma.user.findUnique({
            where: { id },
            include: { profile: true }
        })
        if (!exist) throw new NotFoundPage("User n'existe pas")

        const password = data.password
        if (password) {
            const salt = await bcrypt.genSalt(12)
            const updatePassword = await bcrypt.hash(password, salt)
            exist.passwordHash = updatePassword
        }
        // const { password, profile, ...userField } = data

        // const updatedData: Prisma.UserUpdateInput = { ...userField }

        // if (password) {
        //     const salt = await bcrypt.genSalt(12)
        //     updatedData.passwordHash = await bcrypt.hash(password, salt)
        // }

        // try {

        //     if (profile && Object.keys(profile).length > 0) {

        //         updatedData.profile = {
        //             upsert: {
        //                 create: {
        //                     firstName: profile.firstname ?? null,
        //                     lastName: profile.lastname ?? null,
        //                     profession: profile.profession ?? null,
        //                 },
        //                 update: profile,
        //                 where: { id }
        //             }
        //         }
        //     }
        //     const record = await prisma.user.update({
        //         where: { id },
        //         data: updatedData,
        //         include: { profile: true }
        //     })

        //     return this.userMapper(record)

        // } catch (err) {
        //     if (err instanceof AppError) {
        //         throw err
        //     }
        // }




    }

    async deleteUser(id: string): Promise<void> {
        const exist = await prisma.user.findUnique({
            where: { id },
            include: { profile: true }
        })

        if (!exist) throw new NotFoundPage("User n'existe pas")
        await prisma.user.delete({ where: { id } })
    }
}