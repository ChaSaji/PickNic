import { getToken } from "../auth/token";
import { ApiError } from "./ApiError";

type optionType = {
  baseUrl?: string;
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: Record<string, any> | null;
};

export const fetchAPIWithAuth = async ({
  headers = {
    "Content-Type": "application/json",
  },
  ...rest
}: optionType) => {
  return await fetchAPI({
    headers: { ...headers, Authorization: "Bearer " + getToken() },
    ...rest,
  });
};

export const fetchNextAPI = async ({ ...rest }: optionType) => {
  return await fetchAPI({
    baseUrl: "",
    ...rest,
  });
};

export const fetchAPI = async ({
  baseUrl = process.env.NEXT_PUBLIC_API_URL,
  endpoint,
  method = "GET",
  headers = {
    "Content-Type": "application/json",
  },
  body = null,
}: optionType) => {
  const options: RequestInit = { method, headers };

  if (body && headers["Content-Type"] == "application/json") {
    options.body = JSON.stringify(body);
  } else if (
    body &&
    headers["Content-Type"] == "application/x-www-form-urlencoded"
  ) {
    options.body = new URLSearchParams(body).toString();
  }

  try {
    const response = await fetch(`${baseUrl}/${endpoint}`, options);
    if (!response.ok) {
      const errorRes = await response.json();
      const error = new ApiError(
        `HTTP error! status: ${response.status}`,
        response.status,
        errorRes.detail
      );
      throw error;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
