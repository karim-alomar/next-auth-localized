import React, { ReactNode } from "react";
import { FormLabel } from "@/components";

interface Props {
  children: string | ReactNode;
  isRequired?: boolean;
  className?: string;
}
export const InputLabel = ({
  children,
  isRequired = false,
  className,
  ...props
}: Props) => {
  return (
    <FormLabel className={className} {...props}>
      {children}
      {isRequired && <span className="text-destructive">*</span>}
    </FormLabel>
  );
};
