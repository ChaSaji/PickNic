"use client";

import { postLoginForm, postLogout } from "@/lib/api/auth";
import { removeToken, saveToken } from "@/lib/auth/token";
import { LoginSchemaType } from "@/schemas/loginSchema";
import AuthUser from "@/types/user";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "react-toastify";

interface AuthContextProps {
  user: AuthUser | null;
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
  login: (data: LoginSchemaType) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const router = useRouter();

  const login = async (data: LoginSchemaType) => {
    const result = await postLoginForm(data);
    result.data &&
      result.data.accessToken &&
      saveToken(result.data.accessToken);

    if (result.success && result.data) {
      toast.success(result.message);
      setUser(result.data);
      router.push("/events");
    } else {
      toast.error(result.message);
    }
  };

  const logout = async () => {
    const result = await postLogout();
    removeToken();

    if (result.success && result.data) {
      toast.success(result.message);
      setUser(null);
      router.push("/login");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
