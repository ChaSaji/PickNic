import { userPutSchemaType, userSchemaType } from "@/schemas/userSchema";
import { ApiResponse } from "@/types/utils";
import { fetchAPIWithAuth } from "./helper";
import AuthUser, { User } from "@/types/user";
import { ApiError } from "./ApiError";

export const getUser = async ({
  id,
}: {
  id: string;
}): Promise<ApiResponse<User>> => {
  try {
    const response = await fetchAPIWithAuth({
      endpoint: `auth/users/${id}`,
      method: "GET",
    });

    const data = {
      id: response.id,
      name: response.username,
      email: response.email,
    };

    return { success: true, message: "ユーザ取得に成功しました。", data };
  } catch (error) {
    let userMessage = "エラーが発生しました。";
    if (error instanceof ApiError) {
      userMessage = error.detail;
    }
    return { success: false, message: userMessage };
  }
};

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
        name: response.organization_name,
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

export const putUserForm = async ({
  id,
  body,
}: userPutSchemaType): Promise<ApiResponse<AuthUser>> => {
  try {
    const response = await fetchAPIWithAuth({
      endpoint: `auth/users/update/${id}`,
      method: "PUT",
      body: {
        username: body.username,
        email: body.email,
        password: body.password,
      },
    });

    const data = {
      user: { id: response.id, name: response.username, email: response.email },
      organization: {
        id: response.organization_id,
        name: response.organization_name,
      },
    };

    return { success: true, message: "ユーザ更新に成功しました。", data };
  } catch (error) {
    let userMessage = "エラーが発生しました。";
    if (error instanceof ApiError) {
      userMessage = error.detail;
    }
    return { success: false, message: userMessage };
  }
};

export const deleteUser = async ({
  id,
}: {
  id: string;
}): Promise<ApiResponse<User>> => {
  try {
    const response = await fetchAPIWithAuth({
      endpoint: `auth/users/delete/${id}`,
      method: "DELETE",
    });

    const data = {
      id: response.id,
      name: response.username,
      email: response.email,
    };

    return { success: true, message: "ユーザ削除に成功しました。", data };
  } catch (error) {
    let userMessage = "エラーが発生しました。";
    if (error instanceof ApiError && error.status === 400) {
      userMessage = error.detail;
    }
    return { success: false, message: userMessage };
  }
};
