import { userSchemaType } from "@/schemas/userSchema";
import { ApiResponse } from "@/types/utils";
import { fetchAPIWithAuth } from "./helper";
import AuthUser, { User } from "@/types/user";
import { ApiError } from "./ApiError";

export const getUserList = async (): Promise<ApiResponse<Array<User>>> => {
  try {
    const response = await fetchAPIWithAuth({
      endpoint: "auth/users/",
      method: "GET",
    });

    // TODO: userがany型になってしまった。fetchAPIにジェネリックで型指定する必要有
    const data = response.users.map((user: any) => ({
      id: user.id,
      name: user.username,
      email: user.email,
    }));

    return { success: true, message: "ユーザ取得に成功しました。", data };
  } catch (error) {
    let userMessage = "エラーが発生しました。";
    if (error instanceof ApiError && error.status === 400) {
      userMessage = error.detail;
    }
    return { success: false, message: userMessage };
  }
};

export const postUserForm = async ({
  username,
  email,
  password,
}: userSchemaType): Promise<ApiResponse<AuthUser | null>> => {
  try {
    const response = await fetchAPIWithAuth({
      endpoint: "auth/users/",
      method: "POST",
      body: {
        username: username,
        email: email,
        password: password,
      },
    });

    const data = {
      user: { id: response.id, name: response.username, email: response.email },
      organization: {
        id: response.organization_id,
        name: response.organization_id,
      },
      accessToken: response.access_token,
    };

    return { success: true, message: "ユーザ作成に成功しました。", data };
  } catch (error) {
    let userMessage = "エラーが発生しました。";
    if (error instanceof ApiError && error.status === 400) {
      userMessage = error.detail;
    }
    return { success: false, message: userMessage };
  }
};
