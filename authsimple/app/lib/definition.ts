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

type SignupFormData = z.infer<typeof SignupFormSchema>

export type FormState =
  | {
      success: boolean;
      message?: string | null;
      errors?: z.core.$ZodErrorTree<SignupFormData>;

    }
  | undefined;
