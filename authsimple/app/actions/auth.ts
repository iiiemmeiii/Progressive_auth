"use server";

import { redirect } from "next/navigation";
import * as z from "zod";
import {
  FormStateSignup,
  FormStateLogin,
  LoginFormShema,
  SignupFormSchema,
} from "../lib/definition";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function signup(
  prevState: FormStateSignup,
  formData: FormData,
): Promise<FormStateSignup> {
  // GET USER FOORMA DATA AND VAIDATE BY ZOD
  const validateFields = SignupFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validateFields.success) {
    console.log(z.treeifyError(validateFields.error));
    return {
      success: false,
      message: "CHECK YOUR ERROR",
      errors: z.treeifyError(validateFields.error),
    };
  }

  // CREATE SUPABASE CLIENT
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email: validateFields.data.email,
    password: validateFields.data.password,
    options: {
      emailRedirectTo: "http://localhost:3000",
    },
  });
  console.log("prevState" + prevState);

  if (error) {
    console.log({ err: error.message, status: error.status });
    redirect(`/signup?error=${error.message}`);
  }
  console.log(data);
  revalidatePath("/");
  redirect("/login");
}

// LOGIN LOGIN
export async function login(
  formState: FormStateLogin,
  formData: FormData,
) {
  const supabase = await createClient();

  const validateLoginFields = LoginFormShema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  console.log({body: validateLoginFields.data})
  if (!validateLoginFields.success) {
    console.log(z.treeifyError(validateLoginFields.error));
    return {
      success: false,
      message: "CHECK YOUR ERROR",
      errors: z.treeifyError(validateLoginFields.error),
    };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: validateLoginFields.data.email,
    password: validateLoginFields.data.password,
  });
  console.log("{data: data}");

  if (error) {
    console.log(`{ERROORR: ${error}}`);

    redirect(`/error`);
  }

  revalidatePath("/");
  redirect("/auth/profile");
}


