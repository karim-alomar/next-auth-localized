"use client";

import { Button, Form, InputControl, SubmitButton } from "@/components";
import { useAuth } from "@/hooks/api/useAuth";
import {
  DEFAULT_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  RESET_PASSWORD_ROUTE,
} from "@/routes";
import { ILoginSchema, LoginSchema } from "@/schemas/login-schema";
import { IRegisterSchema, RegisterSchema } from "@/schemas/register-schema";
import { clientGetDictionary } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
interface Props {
  formType: "login" | "register";
}
export const AuthForm = ({ formType }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dictionary = clientGetDictionary();
  const callbackUrl = searchParams.get("callbackUrl") as string;
  const form = useForm<ILoginSchema | IRegisterSchema>({
    resolver: zodResolver(formType === "login" ? LoginSchema : RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const loginMutation = useAuth.login.useMutation({
    onSuccess(data, variables) {
      signIn("credentials", {
        email: variables.email,
        password: variables.password,
        callbackUrl: callbackUrl || DEFAULT_ROUTE,
      });
      toast.success(data.message.success.title, {
        description: data.message.success.description,
      });
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const registerMutation = useAuth.register.useMutation({
    onSuccess(data) {
      router.push(LOGIN_ROUTE);
      toast.success(data.message.success.title, {
        description: data.message.success.description,
      });
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: ILoginSchema | IRegisterSchema) => {
    const mutation = formType === "login" ? loginMutation : registerMutation;
    mutation.mutate({
      ...data,
      name: (data as IRegisterSchema).name || "",
    });
  };
  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1 flex flex-col items-start justify-center p-6 gap-2 w-3/4 mx-auto">
        <span className="font-extrabold text-4xl">
          {formType === "login"
            ? dictionary.auth.login
            : dictionary.auth.register}
        </span>
        <span>{dictionary.auth.enter_account_details}</span>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full mt-10 space-y-6"
          >
            {formType === "register" && (
              <InputControl
                control={form.control}
                inputName="name"
                inputPlaceholder={dictionary.auth.full_name}
                labelclassName="border-0 rounded-none border-b border-white/30 focus-within:border-white/50"
              />
            )}
            <InputControl
              control={form.control}
              inputName="email"
              inputPlaceholder={dictionary.auth.email}
              labelclassName="border-0 rounded-none border-b border-white/30 focus-within:border-white/50"
            />
            <InputControl
              control={form.control}
              inputName="password"
              inputPlaceholder={dictionary.auth.password}
              type="password"
              labelclassName="border-0 rounded-none border-b border-white/30 focus-within:border-white/50"
            />
            {formType === "login" && (
              <Link
                href={RESET_PASSWORD_ROUTE}
                className="block text-white/50 hover:text-white/70 transition-all ease-in-out text-sm"
              >
                {dictionary.auth.forgot_password}
              </Link>
            )}
            <SubmitButton
              title={
                formType === "login"
                  ? dictionary.auth.login
                  : dictionary.auth.register
              }
              disabled={loginMutation.isPending || registerMutation.isPending}
              loading={loginMutation.isPending || registerMutation.isPending}
              type="submit"
              className="w-full block bg-auth-foreground/80  hover:bg-auth-foreground"
            />
          </form>
        </Form>
      </div>
      <div className="flex items-center justify-center gap-10 mb-10">
        <span className="text-white/50 text-sm">
          {formType === "login"
            ? dictionary.auth.dont_have_account
            : dictionary.auth.already_have_account}
        </span>
        <Link href={formType === "login" ? REGISTER_ROUTE : LOGIN_ROUTE}>
          <Button className="text-sm rounded-sm" size="sm">
            {formType === "login"
              ? dictionary.auth.sign_up
              : dictionary.auth.login}
          </Button>
        </Link>
      </div>
    </div>
  );
};
