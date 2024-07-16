"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextData } from "./interfaces/authContextData.interface";
import { AuthContextProviderProps } from "./interfaces/authContextProviderProps.interface";
import { SignInFormData } from "@taskfy/app/out-session/sign-in/interfaces/signInFormData.interface";
import { cookiesStore } from "@taskfy/services/cookiesStore";
import { COOKIES } from "@taskfy/constants/cookies.constant";
import { useNotify } from "@taskfy/hooks/useNotify";
import { apiClient } from "@taskfy/services/apiClient";
import { API_ROUTES } from "@taskfy/routes/api.routes";
import { usePathname, useRouter } from "next/navigation";
import { APP_ROUTES } from "@taskfy/routes/app.routes";
import { AuthResponse } from "./interfaces/authResponse.interface";
import { UserResponse } from "@taskfy/interfaces/responses/userResponse.interface";
import { HTTP_STATUS } from "@taskfy/constants/httpStatus.constant";
import { isAxiosError } from "axios";

const AuthContext = createContext({} as AuthContextData);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const { errorNotify } = useNotify();

  const [user, setUser] = useState<UserResponse | null>(null);

  const isAuthenticated = !!user;

  const router = useRouter();
  const pathname = usePathname();

  async function refreshUser(): Promise<void> {
    const userResponse = await apiClient.get<UserResponse>(API_ROUTES.USER);

    const userData = userResponse.data;

    setUser(userData);
  }

  async function getUser(token: string): Promise<void> {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    await refreshUser();
  }

  const SIGN_IN_ERROR_MESSAGES = {
    [HTTP_STATUS.UNAUTHORIZED]: "Email ou senha inválida",
    [HTTP_STATUS.BAD_REQUEST]: "Ocorreu algum erro ao logar",
  } as const;

  async function signIn(signInData: SignInFormData) {
    try {
      const authResponse = await apiClient.post<AuthResponse>(
        API_ROUTES.AUTH,
        signInData,
      );

      const authData = authResponse.data;

      cookiesStore.set(COOKIES.TOKEN, authData.token);
      cookiesStore.set(COOKIES.REFRESH_TOKEN, authData.refreshToken.id);

      await getUser(authData.token);

      router.push(APP_ROUTES.HOME);
    } catch (error) {
      cookiesStore.delete(COOKIES.TOKEN);
      cookiesStore.delete(COOKIES.REFRESH_TOKEN);

      if (isAxiosError(error)) {
        errorNotify({
          message:
            SIGN_IN_ERROR_MESSAGES[
              error.response?.status as keyof typeof SIGN_IN_ERROR_MESSAGES
            ],
        });
      }
    }
  }

  async function signOut() {
    cookiesStore.delete(COOKIES.TOKEN);
    cookiesStore.delete(COOKIES.REFRESH_TOKEN);

    router.push(APP_ROUTES.SIGN_IN);
  }

  useEffect(() => {
    (async () => {
      const token = cookiesStore.get(COOKIES.TOKEN);

      if (token && !isAuthenticated) {
        try {
          await getUser(token);

          if (pathname === APP_ROUTES.SIGN_IN) {
            router.push(APP_ROUTES.HOME);
          }
        } catch {
          cookiesStore.delete(COOKIES.TOKEN);
          cookiesStore.delete(COOKIES.REFRESH_TOKEN);
        }
      }
    })();
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signOut, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
