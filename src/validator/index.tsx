import { z } from "zod";

export const inviteFormSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters long" })
      .refine(
        (value) => value === value.trim(), // Ensure the string has no spaces after trimming
        { message: "Name should not have spaces at the start or end" }
      ),
    email: z.string().email({ message: "Invalid email address" }),
    confirmEmail: z.string().email({ message: "Invalid email address" }),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Email must match the one provided above",
    path: ["confirmEmail"],
  });
