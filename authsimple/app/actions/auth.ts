"use server";

import { redirect } from "next/navigation";
import * as z from "zod";
import { FormState, SignupFormSchema } from "../lib/definition";
import { createClient } from "@/lib/supabase/server";

export async function signup(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  // GET USER FOORMA DATA AND VAIDATE BY ZOD
  const validateFields = SignupFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validateFields.success) {
    console.log("ZZZZZZZZZZZOOOOOOOOOOOOOOODDDDDDDDDDDDDDDDDD");
    console.log(z.treeifyError(validateFields.error));
    return {
      success: false,
      message: "CHECK YOUR ERROR",
      errors: z.treeifyError(validateFields.error) 
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
    redirect(`http://localhost:3000/signup?error=${error.message}`);
  }
  console.log(data);
  redirect("http://localhost:3000/login");
}
