"use client";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components";
import { GlobalContext } from "@/context/GlobalContext";
import { clientGetDictionary } from "@/utils";
import { locales } from "@/utils/getLocale";
import Cookies from "js-cookie";
import { Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode, useContext } from "react";
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
    <div className="grid grid-cols-12 w-full h-full">
      <div className="bg-auth-background md:col-span-4 col-span-12 z-20">
        <div className="flex flex-col h-full">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="hover:bg-primary/30 bg-primary-foreground text-primary rounded-none w-full">
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
                      onClick={() => {
                        Cookies.set("locale", l);
                      }}
                    >
                      <DropdownMenuItem>
                        {locales.find((l) => l !== lang)}
                      </DropdownMenuItem>
                    </Link>
                  ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          {children}
        </div>
      </div>
      <div className="bg-auth-foreground col-span-8 md:block hidden z-10">
        <span className="fixed pointer-events-none bottom-0 end-0 w-full h-1/2 bg-gradient-to-b to-auth-background/60 z-10"></span>
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
            width={650}
            height={300}
          />
        </div>
      </div>
    </div>
  );
};

export default Template;
