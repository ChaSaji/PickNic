"use client";

import PageTemplate from "@/components/PageTemplate/PageTemplate";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "@/components/InputField/InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchemaType, userSchema } from "@/schemas/userSchema";
import Button from "@/components/Button/Button";
import { postUserForm } from "@/lib/api/user";
import { useApiSubmit } from "@/hooks/useApiSubmit";
import AuthUser from "@/types/user";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UserCreatePage() {
  const { onApiSubmit, apiResponse } = useApiSubmit<
    userSchemaType,
    AuthUser | null
  >(postUserForm);
  const formMethods = useForm<userSchemaType>({
    resolver: zodResolver(userSchema),
  });
  const router = useRouter();

  useEffect(() => {
    if (apiResponse?.success) {
      formMethods.reset();
      router.push("/users");
    }
  }, [apiResponse]);

  return (
    <PageTemplate titleLabel="ユーザ登録" style={{ marginBottom: 200 }}>
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
            onSubmit={formMethods.handleSubmit(onApiSubmit)}
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
            />

            <InputField
              size="large"
              direction="row"
              name={"email"}
              label={"メールアドレス"}
              placeholder={"emal@example.com"}
            />

            <InputField
              type="password"
              size="large"
              direction="row"
              name={"password"}
              label={"パスワード"}
              placeholder={"8文字以上12文字以下"}
            />

            <Button size="fit" label="登録" />
            <Button
              type="button"
              size="fit"
              label="キャンセル"
              onClick={() => router.push("/users")}
            />
          </form>
        </FormProvider>
      </div>
    </PageTemplate>
  );
}
