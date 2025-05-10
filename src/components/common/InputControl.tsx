"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  InputLabel,
} from "@/components";
import {
  ChangeEvent,
  ElementType,
  InputHTMLAttributes,
  forwardRef,
} from "react";
import { Control } from "react-hook-form";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  inputName: string;
  isRequired?: boolean;
  inputLabel?: string;
  inputPlaceholder?: string;
  labelclassName?: string;
  displayErrorMessage?: boolean;
  iconPrepend?: ElementType;
  iconAppend?: ElementType;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const InputControl = forwardRef<HTMLInputElement, Props>(
  (
    {
      control,
      inputName,
      isRequired,
      inputLabel,
      inputPlaceholder,
      labelclassName,
      displayErrorMessage = true,
      iconPrepend,
      iconAppend,
      onChange,
      ...props
    }: Props,
    ref
  ) => {
    return (
      <FormField
        control={control}
        name={inputName}
        render={({ field }) => (
          <FormItem>
            {inputLabel && (
              <div className="flex flex-col items-start justify-start gap-2">
                <div className="flex items-center justify-start gap-2">
                  <InputLabel isRequired={isRequired}>{inputLabel}</InputLabel>
                </div>
              </div>
            )}
            <FormControl>
              <Input
                placeholder={inputPlaceholder}
                {...field}
                {...props}
                labelclassName={labelclassName}
                ref={ref}
                iconAppend={iconAppend}
                iconPrepend={iconPrepend}
                required={isRequired}
                onFocus={(e) =>
                  e.target.addEventListener(
                    "wheel",
                    function (e) {
                      e.preventDefault();
                    },
                    { passive: false }
                  )
                }
                height="auto"
                type={props.type}
                onChange={(e) => {
                  field.onChange(e);
                  onChange?.(e);
                }}
              />
            </FormControl>

            {displayErrorMessage && <FormMessage />}
          </FormItem>
        )}
      />
    );
  }
);

InputControl.displayName = "InputControl";
