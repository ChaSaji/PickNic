"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchemaType, loginSchema } from "@/schemas/loginSchema";
import Button from "@/components/Button/Button";
import InputField from "@/components/InputField/InputField";
import { postLoginForm } from "@/lib/api/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const formMethods = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: LoginSchemaType) => {
    const result = await postLoginForm(data);

    if (result.success) {
      toast.success(result.message);
      formMethods.reset();
      router.push("/events");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#FF914D",
          fontSize: 60,
          lineHeight: 1,
          marginTop: 0,
        }}
      >
        PickNic
        <br />
        イベント主催管理
      </h1>
      <FormProvider {...formMethods}>
        <form
          onSubmit={formMethods.handleSubmit(handleLogin)}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
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
            type="password"
            size="large"
            direction="row"
            name={"password"}
            label={"パスワード"}
            placeholder={"8文字以上12文字以下"}
          />

          <Button size="fit" label="送信" />
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginPage;
