import * as z from "zod";

export const SignupFormSchema = z.object({
  email: z.email({ error: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(5, { error: "Be at least 5 characters long" })
    .regex(/[a-zA-Z]/, { error: "Contain at least one letter." })
    .regex(/[0-9]/, { error: "Contain at least one number." })
    .trim(),
});

export const LoginFormShema = z.object({
   email: z.email({ error: "Votre email n'existe pas." }).trim(),
   password: z.string({error: "password incorect"}).trim()
})

type SignupFormData = z.infer<typeof SignupFormSchema>
type LoginFormData = z.infer<typeof LoginFormShema>

export type FormStateSignup =
  | {
      success: boolean;
      message?: string | null;
      errors?: z.core.$ZodErrorTree<SignupFormData>;

    }
  | undefined;

  export type FormStateLogin =
  | {
      success: boolean;
      message?: string | null;
      errors?: z.core.$ZodErrorTree<LoginFormData>;

    }
  | undefined;
