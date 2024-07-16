import { LoginSchemaType } from "@/schemas/loginSchema";
import { removeToken, saveToken } from "../auth/token";
import { fetchAPI, fetchAPIWithAuth } from "./helper";
import { ApiResponse } from "@/types/utils";
import { APIError } from "./ApiError";
import AuthUser from "@/types/user";

export const postLoginForm = async ({
  username,
  password,
}: LoginSchemaType): Promise<ApiResponse<AuthUser | null>> => {
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

    const data = {
      user: { id: response.id, name: response.username, email: response.email },
      organization: {
        id: response.organization_id,
        name: response.organization_id,
      },
    };

    saveToken(response.access_token);
    return { success: true, message: "ログインに成功しました。", data };
  } catch (error) {
    let userMessage = "エラーが発生しました。";
    if (error instanceof APIError && error.status === 401) {
      userMessage = "メールアドレスあるいはパスワードが正しくありません。";
    }
    return { success: false, message: userMessage };
  }
};

export const postLogout = async (): Promise<
  ApiResponse<{ message: string } | null>
> => {
  try {
    const response = await fetchAPIWithAuth({
      endpoint: "auth/logout",
      method: "POST",
    });

    removeToken();
    return {
      success: true,
      message: "ログアウトに成功しました。",
      data: response,
    };
  } catch (error) {
    let userMessage = "エラーが発生しました。";
    if (error instanceof APIError && error.status === 401) {
      userMessage = "ログアウトに失敗しました。";
    }
    return { success: false, message: userMessage };
  }
};

export const getMe = async (): Promise<ApiResponse<null>> => {
  try {
    const response = await fetchAPIWithAuth({
      endpoint: "auth/users/me",
      method: "GET",
    });

    return { success: true, message: "セッションが有効です。", data: response };
  } catch (error) {
    let userMessage = "エラーが発生しました。";
    if (error instanceof APIError && error.status === 401) {
      userMessage = "セッションが無効です。";
    }
    return { success: false, message: userMessage };
  }
};
