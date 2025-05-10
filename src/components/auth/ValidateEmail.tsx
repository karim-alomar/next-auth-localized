"use client";

import {
  Button,
  Form,
  InputControl,
  ResetPassowrd,
  SubmitButton,
} from "@/components";
import { useAuth } from "@/hooks/api/useAuth";
import { LOGIN_ROUTE } from "@/routes";
import {
  IValidateEmailSchema,
  ValidateEmailSchema,
} from "@/schemas/reset-password-schema";
import { clientGetDictionary } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const ValidateEmail = () => {
  const [formType, setFormType] = useState<"reset" | "validate">("validate");
  const [userEmail, setUserEmail] = useState<string>("");
  const dictionary = clientGetDictionary();
  const form = useForm<IValidateEmailSchema>({
    resolver: zodResolver(ValidateEmailSchema),
    defaultValues: {
      email: "",
    },
  });

  const validateEmailMutation = useAuth.validateEmail.useMutation({
    onSuccess(data, variables) {
      setFormType("reset");
      setUserEmail(variables.email);
      toast.success(data.message.success.title, {
        description: data.message.success.description,
      });
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: IValidateEmailSchema) => {
    validateEmailMutation.mutate(data);
  };
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col h-full items-start justify-center p-6 gap-2 w-3/4 mx-auto">
        <span className="font-extrabold text-4xl">
          {dictionary.auth.reset_password}
        </span>
        <span>{dictionary.auth.enter_your_email}</span>
        {formType === "reset" ? (
          <ResetPassowrd email={userEmail} />
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full mt-10 space-y-6"
            >
              <InputControl
                control={form.control}
                inputName="email"
                inputPlaceholder={dictionary.auth.email}
                labelclassName="border-0 rounded-none border-b border-white/30 focus-within:border-white/50"
              />

              <SubmitButton
                title={dictionary.auth.validate_email}
                disabled={validateEmailMutation.isPending}
                loading={validateEmailMutation.isPending}
                type="submit"
                className="w-full block bg-auth-foreground/80  hover:bg-auth-foreground"
              />
            </form>
          </Form>
        )}
      </div>
      <div className="flex items-center justify-center gap-10 mb-16">
        <span className="text-white/50 text-sm">
          {dictionary.auth.back_to_login}
        </span>
        <Link href={LOGIN_ROUTE}>
          <Button className="bg-zinc-700 text-sm rounded-sm" size="sm">
            {dictionary.auth.login}
          </Button>
        </Link>
      </div>
    </div>
  );
};
