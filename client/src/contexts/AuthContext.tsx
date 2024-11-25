"use client";

import authServiceInstance from "@/services/AuthService";
import Router from "next/router";
import { parseCookies, setCookie } from "nookies";
import { createContext, useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
}

interface SignInData {
  email: string;
  password: string;
}

interface IAuthContext {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (data: SignInData) => Promise<void>;
}

export const AuthContext = createContext({} as IAuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { "wiserooms.token": token } = parseCookies();

    if (token) {
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

    Router.push("/");
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
