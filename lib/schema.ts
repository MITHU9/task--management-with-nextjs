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
  password: z.string().min(8, "Password must be at least 8 characters long"),
  role: z.string().min(1, "Role is required"),
});
