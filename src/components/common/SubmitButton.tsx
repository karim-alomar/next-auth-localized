"use client";
import { Button } from "@/components";
import { cn } from "@/lib/utils";
import { clientGetDictionary } from "@/utils";
import { Loader2 } from "lucide-react";

export interface ISubmitButton
  extends Omit<React.ComponentProps<"button">, "disabled"> {
  title: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  isSendProtected?: boolean;
}
export const SubmitButton = ({
  title: title,
  loading,
  disabled,
  className,
  isSendProtected,
  ...props
}: ISubmitButton) => {
  const dictionary = clientGetDictionary();
  return (
    <Button
      type="submit"
      disabled={disabled || isSendProtected}
      className={cn("w-full cursor-pointer text-primary", className)}
      onClick={(e) => {
        if (isSendProtected || disabled) {
          e.preventDefault();
        }
      }}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <p>{dictionary.common.please_wait}</p>
          <Loader2 className="ms-2 h-4 w-4 animate-spin" />
        </div>
      ) : (
        <span>{title}</span>
      )}
    </Button>
  );
};

export default SubmitButton;
