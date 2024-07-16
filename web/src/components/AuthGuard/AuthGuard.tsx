"use client";

import { useAuth } from "@/context/AuthContext";
import { getMe } from "@/lib/api/auth";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";

const AuthGuard: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { setUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let ignore = false;

    const checkAuth = async () => {
      const result = await getMe();
      if (!ignore) {
        if (result.success) {
          setIsAuthenticated(true);
        } else {
          setUser(null);
          toast.error(result.message);
          router.push("/login");
        }
        setIsLoading(false);
      }
    };

    checkAuth();

    return () => {
      ignore = true;
    };
  }, [pathname, searchParams, setUser, router]);

  if (isLoading) return null;

  return isAuthenticated && <>{children}</>;
};

export default AuthGuard;
