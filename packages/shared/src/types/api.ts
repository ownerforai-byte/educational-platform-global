export interface ApiErrorResponse {
  message: string;
  code?: string;
  details?: unknown;
}

export interface ApiResponse<T = unknown, M = Record<string, unknown>> {
  ok: boolean;
  data?: T;
  error?: ApiErrorResponse;
  meta?: M;
}

export interface PaginatedMeta {
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
  cursor?: string;
  [key: string]: unknown;
}

export interface PaginatedResponse<T> extends ApiResponse<T[], PaginatedMeta> {
  meta: PaginatedMeta;
}
