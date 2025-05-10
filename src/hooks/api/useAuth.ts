import { caller } from "@/lib/axios";
import { AuthType } from "@/types/authType";
import { APIResponse } from "@/types/common";
import { keepPreviousData } from "@tanstack/react-query";
import { router } from "react-query-kit";

export const useAuth = router("auth", {
  auth: router.query({
    fetcher: async () =>
      await caller({
        method: "GET",
        url: "auth",
      }),
    placeholderData: keepPreviousData,
  }),
  register: router.mutation({
    mutationFn: async (body: AuthType) => {
      const auth = await caller({
        method: "POST",
        url: "auth/register",
        data: body,
      });
      return auth;
    },
  }),
  login: router.mutation({
    mutationFn: async (body: Omit<AuthType, "name">) => {
      const auth = await caller({
        method: "POST",
        url: "auth/login",
        data: body,
      });
      return auth;
    },
  }),
  validateEmail: router.mutation({
    mutationFn: async (body: { email: string }) => {
      const auth = await caller({
        method: "POST",
        url: "auth/validate-email",
        data: body,
      });
      return auth;
    },
  }),
  resetPassword: router.mutation({
    mutationFn: async (body: { email: string; password: string }) => {
      const res: APIResponse<{
        accountVerified: boolean;
        hasSubscription: boolean;
      }> = await caller({
        method: "POST",
        url: "auth/reset-password",
        data: body,
      });
      return res;
    },
  }),
});
