"use client";

import Button from "@/components/Button/Button";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { deleteUser, getUser } from "@/lib/api/user";
import { User } from "@/types/user";
import { useApiSubmit } from "@/hooks/useApiSubmit";
import { toast } from "react-toastify";
import DetailText from "@/components/DetailText/DetailText";

const UserDetailPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const params = useParams();
  const userId = params["userId"] as string;
  const { onApiSubmit } = useApiSubmit(deleteUser);

  const handleClickBuck = () => {
    router.push(`/users`);
  };
  const handleClickDelate = async () => {
    if (!userId) return;
    const result = await onApiSubmit({ id: userId });
    if (result.success) {
      router.push(`/users`);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        if (!userId) return;
        const result = await getUser({ id: userId });
        result.data && setUser(result.data);
        if (!result.success) {
          toast.error(result.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  return (
    <PageTemplate titleLabel="ユーザ詳細">
      <div style={{ display: "flex", justifyContent: "end", gap: 10 }}>
        <Button onClick={handleClickBuck} label="戻る" />
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
            <DetailText label="ユーザID" value={user.id} />
            <DetailText label="ユーザ名" value={user.name} />
            <DetailText label="メールアドレス" value={user.email} />
          </>
        )}
      </div>
    </PageTemplate>
  );
};

export default UserDetailPage;
