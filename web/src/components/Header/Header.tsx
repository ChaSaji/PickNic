"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { FaCaretDown } from "react-icons/fa";

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
      <div style={{ display: "flex", gap: 20 }}>
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
            position: "relative",
            fontSize: 24,
            lineHeight: 2,
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          {user?.organization.name}
        </div>
      </div>
      <div
        onClick={() => router.push("/users")}
        style={{
          display: "flex",
          fontSize: 24,
          lineHeight: 2,
          fontWeight: 500,
          cursor: "pointer",
          alignItems: "center",
          gap: 5,
        }}
      >
        {user?.user.name}
        <FaCaretDown />
      </div>
    </div>
  );
};

export default Header;
