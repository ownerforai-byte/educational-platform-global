import type { Request } from "express";

export interface PaginationParams {
  page: number;
  pageSize: number;
  offset: number;
  limit: number;
}

export function parsePagination(
  req: Request,
  defaultPageSize = 20,
  maxPageSize = 100
): PaginationParams {
  const pageRaw = parseInt(String(req.query.page ?? "1"), 10);
  const pageSizeRaw = parseInt(
    String(req.query.pageSize ?? req.query.limit ?? defaultPageSize),
    10
  );

  const page = Number.isFinite(pageRaw) && pageRaw > 0 ? pageRaw : 1;
  const pageSize =
    Number.isFinite(pageSizeRaw) && pageSizeRaw > 0
      ? Math.min(pageSizeRaw, maxPageSize)
      : defaultPageSize;

  const offset = (page - 1) * pageSize;
  const limit = pageSize;

  return { page, pageSize, offset, limit };
}
