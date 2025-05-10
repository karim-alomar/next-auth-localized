export type APIResponse<T> = {
  data: T;
  message: messageType;
  meta?: MetaData;
  token?: string;
  extra_response?: {
    resend_code?: boolean;
  };
};

export type messageContentType = {
  title?: string;
  description?: string;
};
export type messageType = {
  error: messageContentType;
  success: messageContentType;
};

export type MetaData = {
  offset?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
  // from: number | null;
  // last_page: number;
  // links: Array<PaginationLink>;
  // path: string;
  // to: number | null;
};

export type ErrorType = Error & { digest?: string };
