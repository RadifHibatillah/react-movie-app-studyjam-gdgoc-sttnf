import { z } from "zod";

export const movieSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  description: z.string().min(1, "Deskripsi wajib diisi"),
  poster_url: z.string().url("URL poster tidak valid"),
  release_date: z.string().min(1, "Tanggal rilis wajib diisi"),
  rating: z.coerce.number().min(1, "Rating harus lebih dari 1").max(10, "Rating harus antara 1-10"),
  duration_minutes: z.coerce.number().min(10, "Durasi harus lebih dari 10"),
  director: z.string().min(1, "Sutradara wajib diisi"),
  genre: z
    .string()
    .default("")
    .transform((v) => v.split(",").map((g) => g.trim()).filter(Boolean))
    .refine((arr) => arr.length > 0, { message: "Minimal 1 genre harus diisi" })
});
