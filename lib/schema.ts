import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name must be at most 100 characters long"),
  image: z.string().optional(),
  about: z
    .string()
    .max(500, "About must be at most 500 characters long")
    .optional(),
  country: z.string().min(1, "Country is required"),
  industryType: z.string().min(1, "Industry type is required"),
  role: z.string().min(1, "Role is required"),
});

export const workspaceSchema = z.object({
  name: z
    .string()
    .min(2, "Name is required")
    .max(100, "Maximum is 100 characters"),
  description: z.string().optional(),
});

export type UserDataType = z.infer<typeof userSchema>;
export type WorkspaceDataType = z.infer<typeof workspaceSchema>;
