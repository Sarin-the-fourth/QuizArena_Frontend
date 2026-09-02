import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z.string().trim().min(1, "Name is Required"),
    email: z.string().trim().min(1, "Email is required"),
    password: z
      .string()
      .min(8, "Password must have at least 8 characters")
      .regex(/[a-z]/, "Password must contain a lowercase letter.")
      .regex(/[A-Z]/, "Password must contain an uppercase letter.")
      .regex(/\d/, "Password must contain a number.")
      .regex(
        /[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/,
        "Password must contain a special character."
      )
      .refine(
        (password) => !/\s/.test(password),
        "Password cannot contain spaces."
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpForm = z.infer<typeof signUpSchema>;
