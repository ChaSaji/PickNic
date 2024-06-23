import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "メールアドレスの形式ではありません" }),
  password: z
    .string()
    .min(8, { message: "パスワードは８文字以上の必要があります" })
    .max(12, { message: "パスワードは12文字以下の必要があります" }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
