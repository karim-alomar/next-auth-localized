"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeOff, X } from "lucide-react";
import { ElementType, useState } from "react";

function Input({
  className,
  type,
  iconPrepend: IconPrepend,
  iconAppend: IconAppend,
  onClear,
  clearable,
  labelclassName,
  ...props
}: React.ComponentProps<"input"> & {
  iconPrepend?: ElementType;
  iconAppend?: ElementType;
  onClear?: () => void;
  clearable?: boolean;
  labelclassName?: string;
}) {
  const [displayPassword, setDisplayPassword] = useState(false);
  return (
    <label
      className={cn(
        "w-full group border dark:border-white/20 overflow-hidden rounded-md flex items-center justify-start dark:focus-within:border-primary/50 dark:focus-within:ring-primary/20 dark:focus-within:ring-4 focus-within:border-black/30 transition-all ease-in-out",
        labelclassName
      )}
    >
      {IconPrepend && (
        <div className="px-3 leading-3 transition-all ease-in-out">
          <IconPrepend size={17} />
        </div>
      )}
      <input
        type={displayPassword ? "text" : type}
        data-slot="input"
        className={cn(
          "flex h-9 w-full bg-transparent px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium  focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        // className={cn(
        //   "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        //   "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        //   "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        //   className
        // )}
        {...props}
      />
      {clearable && (
        <button
          className={cn(
            "dark:bg-white/50 mx-3 dark:hover:bg-white bg-black/50 hover:bg-black text-white w-4 h-4 p-0.5 dark:text-black rounded-full flex items-center justify-center transition-all ease-linear opacity-0",
            props.ref &&
              "current" in props.ref &&
              props.ref.current &&
              props.ref.current?.value?.length > 0 &&
              "opacity-100"
          )}
          onClick={onClear}
        >
          <X />
        </button>
      )}
      {type === "password" ? (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setDisplayPassword((prev) => !prev);
          }}
          className="px-3 cursor-pointer"
        >
          {displayPassword ? <Eye size={17} /> : <EyeOff size={17} />}
        </button>
      ) : (
        IconAppend && (
          <div className="px-3 leading-3 transition-all ease-in-out">
            {/* dark:group-focus-within:text-white dark:text-white/70 text-black/70 group-focus-within:text-black */}
            <IconAppend size={17} />
          </div>
        )
      )}
    </label>
  );
}

export { Input };
