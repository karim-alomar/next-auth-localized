"use client";
import { Toaster } from "@/components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";
import { ReactNode, createContext, useEffect, useMemo, useState } from "react";

interface initValue {
  lang: string;
  dir: "ltr" | "rtl";
  isRtl: boolean;
  pathnameWithoutParams: string;
}
export const GlobalContext = createContext<initValue>({
  lang: "en",
  dir: "ltr",
  isRtl: false,
  pathnameWithoutParams: "",
});
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 1000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});
export const GlobalProvider = ({
  children,
  lang,
}: {
  lang: string;
  children: ReactNode;
}) => {
  // const { setTheme } = useTheme();
  const pathname = usePathname();
  const pathnameWithoutParams = pathname.slice(3);
  const [client, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);
  const isRtl = useMemo(() => {
    return lang === "ar";
  }, [lang]);

  const dir = useMemo(() => {
    return lang === "ar" ? "rtl" : "ltr";
  }, [lang]);
  // useEffect(() => {
  //   setTheme("dark");
  // }, []);
  const value: initValue = {
    lang,
    isRtl,
    dir,
    pathnameWithoutParams,
  };

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {/* <CookiesProvider defaultSetOptions={{ path: "/" }}> */}
        {/* <DirectionProvider dir={dir}> */}
        {/* <TooltipProvider delayDuration={0}> */}
        {/* <NextTopLoader
              initialPosition={0.08}
              crawlSpeed={200}
              height={4}
              crawl={true}
              showSpinner={false}
              easing="ease"
              speed={200}
              zIndex={1600}
            /> */}
        {/* <AuthProvider> */}
        {/* <AppProvider> */}
        <GlobalContext.Provider value={value}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {client && children}
            <Toaster closeButton={false} />
          </ThemeProvider>
        </GlobalContext.Provider>
        {/* </AppProvider> */}
        {/* </AuthProvider> */}
        {/* </TooltipProvider> */}
        {/* </DirectionProvider> */}
        {/* </CookiesProvider> */}
      </QueryClientProvider>
    </SessionProvider>
  );
};
