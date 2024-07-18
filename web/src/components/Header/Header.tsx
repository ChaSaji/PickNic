"use client";

import { useAuth } from "@/context/AuthContext";
import { Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";

const Header = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
        onClick={handleClick}
        style={{
          display: "flex",
          fontSize: 24,
          lineHeight: 2,
          fontWeight: 500,
          cursor: "pointer",
          alignItems: "center",
          gap: 5,
          paddingRight: 20,
        }}
      >
        {user?.user.name}
        <FaCaretDown />
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          style={{ fontWeight: 600 }}
          onClick={() => {
            router.push(`/users/${user?.user.id}`);
            setAnchorEl(null);
          }}
        >
          アカウント
        </MenuItem>
        <MenuItem
          style={{ fontWeight: 600 }}
          onClick={() => {
            router.push(`/users`);
            setAnchorEl(null);
          }}
        >
          組織
        </MenuItem>
        <MenuItem
          style={{ fontWeight: 600 }}
          onClick={() => {
            router.push(`/events`);

            setAnchorEl(null);
          }}
        >
          イベント
        </MenuItem>
        <MenuItem
          style={{ fontWeight: 600 }}
          onClick={() => {
            logout();
            setAnchorEl(null);
          }}
        >
          ログアウト
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Header;
