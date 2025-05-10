"use client";
import {
  ResizablePanelGroup,
  ResizablePanel,
  DropdownMenu,
  DropdownMenuTrigger,
  Button,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components";
import { GlobalContext } from "@/context/GlobalContext";
import { clientGetDictionary } from "@/utils";
import { locales } from "@/utils/getLocale";
import { Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useContext } from "react";
import Cookies from "js-cookie";
import { usePathname, useSearchParams } from "next/navigation";
interface Props {
  children: ReactNode;
}
const Template = ({ children }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { lang } = useContext(GlobalContext);
  const dictionary = clientGetDictionary();
  const pathnameWithoutParams = pathname.slice(3);
  const callbackUrl = searchParams.get("callbackUrl") as string;
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-screen max-w-md min-w-full text-white"
    >
      <ResizablePanel defaultSize={40} className="bg-auth-background">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="hover:bg-primary/30 rounded-none w-full">
              <Globe />
              <span>{locales.find((l) => l === lang)}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuGroup>
              {locales
                .filter((l) => l !== lang)
                .map((l) => (
                  <Link
                    href={`/${l}${pathnameWithoutParams}${
                      callbackUrl ? `?callbackUrl=${callbackUrl}` : ""
                    }`}
                    key={l}
                  >
                    <DropdownMenuItem
                      onClick={() => {
                        Cookies.set("locale", l);
                      }}
                    >
                      {locales.find((l) => l !== lang)}
                    </DropdownMenuItem>
                  </Link>
                ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        {children}
      </ResizablePanel>
      <ResizablePanel
        defaultSize={60}
        className="md:block hidden bg-auth-foreground relative"
      >
        <span className="absolute bottom-0 end-0 w-full h-1/2 bg-gradient-to-b to-auth-background/60 z-10"></span>
        <div className="flex flex-col h-full items-center justify-center py-6 px-10">
          <div className="flex flex-col items-start gap-3">
            <span className="font-extrabold text-4xl">
              {pathname.includes("reset-password")
                ? dictionary.auth.validate_email
                : dictionary.auth.welcome_back}
            </span>
            <span className="text-white/50 ">
              {pathname.includes("reset-password")
                ? dictionary.auth.validate_email_description
                : dictionary.auth.welcome_back_description}
            </span>
          </div>
          <Image
            src={
              pathname.includes("reset-password")
                ? "/password.svg"
                : "/welcome.svg"
            }
            alt="welcome-back"
            className="mt-10"
            width={750}
            height={300}
          />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
export default Template;
