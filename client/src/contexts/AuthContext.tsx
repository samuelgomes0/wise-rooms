"use client";

import authServiceInstance from "@/services/AuthService";
import { IUser } from "@/types";
import { useRouter } from "next/navigation";
import { parseCookies, setCookie } from "nookies";
import { createContext, useEffect, useState } from "react";

interface SignInData {
  email: string;
  password: string;
}

interface IAuthContext {
  isAuthenticated: boolean;
  user: IUser | null;
  signIn: (data: SignInData) => Promise<void>;
}

export const AuthContext = createContext({} as IAuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const router = useRouter();

  const isAuthenticated = !!user;

  useEffect(() => {
    const { "wiserooms.token": token } = parseCookies();

    if (token) {
      authServiceInstance.profile().then(({ data }) => {
        setUser(data.user);
      });
    }
  }, []);

  async function signIn({ email, password }: SignInData) {
    const { data } = await authServiceInstance.signIn({
      email,
      password,
    });

    const { token, user } = data;

    setCookie(undefined, "wiserooms.token", token, {
      maxAge: 60 * 60, // 1 hour
    });

    setUser(user);

    router.push("/");
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
