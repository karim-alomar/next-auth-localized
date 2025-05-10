import { ACCESS_TOKEN_KEY } from "@/global";
import Cookies from "js-cookie";
import { signOut } from "next-auth/react";
import { useParams, usePathname } from "next/navigation";
export const useLogout = () => {
  const pathname = usePathname();
  const { lang } = useParams<{ lang: string }>();
  const logOut = () => {
    Cookies.remove(ACCESS_TOKEN_KEY);
    signOut({
      callbackUrl: pathname.replace(`/${lang}`, ""),
    });
  };
  return logOut;
};
