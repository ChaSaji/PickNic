import { LoginSchemaType } from "@/schemas/loginSchema";
import { saveToken } from "../auth/token";
import { fetchAPI } from "./helper";
import { ApiResponse } from "@/types/utils";
import { APIError } from "./ApiError";

export const postLoginForm = async ({
  username,
  password,
}: LoginSchemaType): Promise<ApiResponse<void>> => {
  try {
    const response = await fetchAPI({
      endpoint: "auth/login",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: {
        username: username,
        password: password,
      },
    });

    saveToken(response.access_token);
    return { success: true, message: "ログインに成功しました。" };
  } catch (error) {
    let userMessage = "エラーが発生しました。";
    if (error instanceof APIError && error.status === 401) {
      userMessage = "メールアドレスあるいはパスワードが正しくありません。";
    }
    return { success: false, message: userMessage };
  }
};
