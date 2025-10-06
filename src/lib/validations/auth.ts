import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Enter a valid email" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" }),
});

export type SignInValues = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "Full name must be at least 3 characters" })
    .max(80, { message: "Full name cannot exceed 80 characters" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Enter a valid email" }),
  universityId: z
    .string()
    .trim()
    .min(6, { message: "University ID must be at least 6 characters" })
    .max(20, { message: "University ID cannot exceed 20 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(64, { message: "Password cannot exceed 64 characters" }),
  universityCard: z
    .string()
    .min(1, { message: "Upload your university ID card" }),
});

export type SignUpValues = z.infer<typeof signUpSchema>;

export const defaultSignInValues: SignInValues = {
  email: "",
  password: "",
};

export const defaultSignUpValues: SignUpValues = {
  fullName: "",
  email: "",
  universityId: "",
  password: "",
  universityCard: "",
};
