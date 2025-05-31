import Negotiator from "negotiator";
import { NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";

export const defaultLocale = "en";

export const locales = [defaultLocale, "ar"];

export function getLocale(request: NextRequest) {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  const locale = match(languages, locales, defaultLocale);

  return locale;
  // const { pathname } = request.nextUrl;
  // const pathLocale = pathname.split("/")[1];

  // if (locales.includes(pathLocale)) {
  //   return pathLocale;
  // }

  // const negotiator = new Negotiator({
  //   headers: Object.fromEntries(request.headers),
  // });
  // return match(negotiator.languages(), locales, defaultLocale);
}
