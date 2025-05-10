import { ACCEPT_LANGUAGE_KEY, ACCESS_TOKEN_KEY, LOCALE_KEY } from "@/global";
import { APIResponse } from "@/types";
import Axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

export const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,

  withCredentials: false,
  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
    authorization: Cookies.get(ACCESS_TOKEN_KEY),
  },
});

axios.interceptors.request.use((config) => {
  config.headers[ACCEPT_LANGUAGE_KEY] = Cookies.get(LOCALE_KEY) || "en";
  config.headers.authorization = Cookies.get(ACCESS_TOKEN_KEY) || "";

  return config;
});

axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response && error.response.data) {
      console.log(error.response);
      const customErrorMessage =
        error.response.data.message?.error.title || error.message;
      // const customErrorDescriptionMessage =
      //   error.response.data.message?.error.description;
      error.message = customErrorMessage;
    }
    return Promise.reject(error);
  }
);

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface CallerOptions extends AxiosRequestConfig {
  method?: HttpMethod;
  url: string;
  contentType?: "multipart" | "json";
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const caller = async <T = any>({
  method = "GET",
  url,
  headers = {},
  contentType = "json",
  ...config
}: CallerOptions): Promise<APIResponse<T>> => {
  try {
    switch (contentType) {
      case "multipart":
        headers["Content-Type"] = "multipart/form-data";
        break;
      default:
        headers["Content-Type"] = "application/json";
        break;
    }
    const res = await axios({
      method,
      url,
      headers,
      ...config,
    });
    return res as unknown as APIResponse<T>;
  } catch (error) {
    throw error;
  }
};
