import { z } from "zod";

export const inviteFormSchema = z
  .object({
    name: z
      .string()
      .min(6, { message: "Name must be at least 6 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    confirmEmail: z.string().email({ message: "Invalid email address" }),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Email must match the one provided above",
    path: ["confirmEmail"],
  });
