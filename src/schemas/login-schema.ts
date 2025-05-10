import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "email_is_invalid" }),
  password: z
    .string()
    .regex(/[A-Z]/, "password_uppercase_validation")
    .regex(/[0-9]/, "password_number_validation")
    .min(8, `inputs.password_error_message`),
});

export type ILoginSchema = z.infer<typeof LoginSchema>;
