import en from "../dictionaries/en.json";
import ar from "../dictionaries/ar.json";
import { LOCALE_KEY } from "@/global";
import Cookies from "js-cookie";
import { defaultLocale, locales } from "./getLocale";
const dictionaries = {
  en: () => import("../dictionaries/en.json").then((module) => module.default),
  ar: () => import("../dictionaries/ar.json").then((module) => module.default),
};

const translations = {
  en,
  ar,
} as const;
export const getDictionary = async (locale: string) => {
  return dictionaries[locale as keyof typeof dictionaries]?.();
};

export const clientGetDictionary = () => {
  const locale = Cookies.get(LOCALE_KEY);

  const safeLocale = locales.includes(locale ?? "") ? locale : defaultLocale;

  return translations[safeLocale as keyof typeof translations];
};
