import { z } from "zod";

export const userSchema = z.object({
  username: z
    .string()
    .min(3, { message: "ユーザ名は３文字以上の必要があります" })
    .max(12, { message: "ユーザ名は12文字以上の必要があります" }),
  email: z.string().email({ message: "メールアドレスの形式ではありません" }),
  password: z
    .string()
    .min(8, { message: "パスワードは８文字以上の必要があります" })
    .max(12, { message: "パスワードは12文字以下の必要があります" }),
});

export type userSchemaType = z.infer<typeof userSchema>;
export type userPutSchemaType = { id: string; body: userSchemaType };
