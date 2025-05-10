"use client";

import { ResetPasswordSchema } from "@/schemas/reset-password-schema";

import { Form, InputControl, SubmitButton } from "@/components";
import { useAuth } from "@/hooks/api/useAuth";
import { IResetPasswordSchema } from "@/schemas/reset-password-schema";
import { clientGetDictionary } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LOGIN_ROUTE } from "@/routes";

export const ResetPassowrd = ({ email }: { email: string }) => {
  const dictionary = clientGetDictionary();
  const router = useRouter();
  const form = useForm<IResetPasswordSchema>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const resetPasswordMutation = useAuth.resetPassword.useMutation({
    onSuccess(data) {
      toast.success(data.message.success.title, {
        description: data.message.success.description,
      });
      router.push(LOGIN_ROUTE);
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: IResetPasswordSchema) => {
    resetPasswordMutation.mutate({
      email,
      password: data.password,
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full mt-10 space-y-6"
      >
        <InputControl
          control={form.control}
          inputName="password"
          inputPlaceholder={dictionary.auth.password}
          type="password"
          labelclassName="border-0 rounded-none border-b border-white/30 focus-within:border-white/50"
        />
        <SubmitButton
          title={dictionary.auth.reset_password}
          disabled={resetPasswordMutation.isPending}
          loading={resetPasswordMutation.isPending}
          type="submit"
          className="w-full block bg-auth-foreground/80  hover:bg-auth-foreground"
        />
      </form>
    </Form>
  );
};
