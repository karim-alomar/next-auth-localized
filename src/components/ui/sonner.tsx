"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Cairo } from "next/font/google";
import { Toaster as Sonner, ToasterProps } from "sonner";
const cairo = Cairo({ subsets: ["latin"] });
const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className={cn("toaster group")}
      richColors
      position="top-center"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-primary-foreground group-[.toaster]:text-foreground group-[.toaster]:border-white/10 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          fontFamily: cairo.style.fontFamily,
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
