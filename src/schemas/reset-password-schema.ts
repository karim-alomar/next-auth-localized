import { z } from "zod";

export const ResetPasswordSchema = z.object({
  password: z
    .string()
    .regex(/[A-Z]/, "password_uppercase_validation")
    .regex(/[0-9]/, "password_number_validation")
    .min(8, `inputs.password_error_message`),
});

export type IResetPasswordSchema = z.infer<typeof ResetPasswordSchema>;

export const ValidateEmailSchema = z.object({
  email: z.string().email({ message: "email_is_invalid" }),
});

export type IValidateEmailSchema = z.infer<typeof ValidateEmailSchema>;
