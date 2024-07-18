"use client";

import Button from "@/components/Button/Button";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { deleteUser } from "@/lib/api/user";
import { useApiSubmit } from "@/hooks/useApiSubmit";
import { useAuth } from "@/context/AuthContext";

type PropsType = {
  label: string;
  value: string;
};

const UserDetailText = (props: PropsType) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        borderBottom: "dashed",
        marginTop: 10,
        paddingBottom: 10,
      }}
    >
      <div style={{ display: "flex", fontSize: 20, fontWeight: 600 }}>
        {props.label}
      </div>
      <div style={{ display: "flex", paddingLeft: 20 }}>{props.value}</div>
    </div>
  );
};

const MyPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const userId = params["userId"] as string;
  const { onApiSubmit } = useApiSubmit(deleteUser);

  const handleClickEdit = () => {
    router.push(`/users/me/edit`);
  };
  const handleClickDelate = async () => {
    if (!userId) return;
    const result = await onApiSubmit({ id: userId });
    if (result.success) {
      router.push(`/users`);
    }
  };

  return (
    <PageTemplate titleLabel="アカウント詳細">
      <div style={{ display: "flex", justifyContent: "end", gap: 10 }}>
        <Button onClick={handleClickEdit} label="編集" />
        <Button onClick={handleClickDelate} label="削除" />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 20,
          gap: 10,
        }}
      >
        {user && (
          <>
            <UserDetailText label="ユーザID" value={user.user.id} />
            <UserDetailText label="ユーザ名" value={user.user.name} />
            <UserDetailText label="メールアドレス" value={user.user.email} />
          </>
        )}
      </div>
    </PageTemplate>
  );
};

export default MyPage;
