import { z } from "zod";

export const RegisterSchema = z.object({
  name: z
    .string({ message: "the_name_is_required" })
    .min(2, "the_name_is_required"),
  email: z.string().email({ message: "email_is_invalid" }),
  password: z
    .string()
    .regex(/[A-Z]/, "password_uppercase_validation")
    .regex(/[0-9]/, "password_number_validation")
    .min(8, `password_error_message`),
});

export type IRegisterSchema = z.infer<typeof RegisterSchema>;
