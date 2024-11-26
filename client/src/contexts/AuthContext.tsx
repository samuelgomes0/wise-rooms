"use client";

import authServiceInstance from "@/services/AuthService";
import { IUser } from "@/types";
import { useRouter } from "next/navigation";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, useEffect, useState } from "react";

interface SignInData {
  email: string;
  password: string;
}

interface IAuthContext {
  isAuthenticated: boolean;
  user: IUser | null;
  signIn: (data: SignInData) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext({} as IAuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const router = useRouter();

  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInData) {
    const { data } = await authServiceInstance.signIn({
      email,
      password,
    });

    const { token } = data;

    if (token) {
      authServiceInstance.profile().then(({ data }) => {
        setUser(data.user);
      });
    }

    setCookie(undefined, "wiserooms.token", token, {
      maxAge: 60 * 60, // 1 hour
    });

    router.push("/");
  }

  function signOut() {
    destroyCookie(undefined, "wiserooms.token");
    setUser(null);
    router.push("/");
  }

  useEffect(() => {
    const { "wiserooms.token": token } = parseCookies();

    if (token) {
      authServiceInstance.profile().then(({ data }) => {
        setUser(data.user);
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
