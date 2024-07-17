"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Header = () => {
  const { user } = useAuth();
  const router = useRouter();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        height: "60px",
        alignItems: "center",
      }}
    >
      <div
        onClick={() => router.push("/events")}
        style={{
          fontSize: 48,
          lineHeight: 1,
          fontWeight: 700,
          color: "#FF914D",
          cursor: "pointer",
        }}
      >
        PickNic
      </div>
      <div
        onClick={() => router.push("/users")}
        style={{
          fontSize: 24,
          lineHeight: 2,
          fontWeight: 500,
          cursor: "pointer",
        }}
      >
        {user?.user.name}
      </div>
    </div>
  );
};

export default Header;
