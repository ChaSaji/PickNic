"use client";

import PageTemplate from "@/components/PageTemplate/PageTemplate";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "@/components/InputField/InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  userSchemaType,
  userSchema,
  userPutSchemaType,
} from "@/schemas/userSchema";
import Button from "@/components/Button/Button";
import { putUserForm } from "@/lib/api/user";
import { useApiSubmit } from "@/hooks/useApiSubmit";
import AuthUser from "@/types/user";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function MyEditPage() {
  const { user, setUser } = useAuth();
  const { onApiSubmit, apiResponse } = useApiSubmit<
    userPutSchemaType,
    AuthUser
  >(putUserForm);
  const formMethods = useForm<userSchemaType>({
    resolver: zodResolver(userSchema),
  });
  const router = useRouter();

  const handleSubmit = formMethods.handleSubmit(async (data) => {
    if (!user) return;
    const updatedData: userPutSchemaType = {
      id: user?.user.id,
      body: { ...data },
    };
    await onApiSubmit(updatedData);
  });

  useEffect(() => {
    if (user) formMethods.setValue("username", user.user.name);
  }, []);

  useEffect(() => {
    if (apiResponse?.success) {
      formMethods.reset();
      apiResponse.data && setUser(apiResponse.data);
      router.push("/users/me");
    }
  }, [apiResponse]);

  return (
    <PageTemplate titleLabel="アカウント編集" style={{ marginBottom: 200 }}>
      {user && (
        <div
          style={{
            display: "flex",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FormProvider {...formMethods}>
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 30,
              }}
            >
              <InputField
                size="large"
                direction="row"
                name={"username"}
                label={"ユーザネーム"}
                placeholder={"username"}
                defaultValue={user.user.name}
                disabled
              />

              <InputField
                size="large"
                direction="row"
                name={"email"}
                label={"メールアドレス"}
                placeholder={"emal@example.com"}
                defaultValue={user.user.email}
              />

              <InputField
                type="password"
                size="large"
                direction="row"
                name={"password"}
                label={"パスワード"}
                placeholder={"8文字以上12文字以下"}
              />

              <Button size="fit" label="更新" />
              <Button
                type="button"
                size="fit"
                label="キャンセル"
                onClick={() => router.push("/users/me")}
              />
            </form>
          </FormProvider>
        </div>
      )}
    </PageTemplate>
  );
}
