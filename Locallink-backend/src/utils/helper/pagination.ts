import { IPagination } from "../../@types/interface/pagination.interface.js";

export const generatePaginationMeta = (
  totalItems: number,
  page: number,
  perPage: number,
): IPagination => {
  const totalPages = Math.max(
    Math.ceil(Number(totalItems) / Number(perPage)),
    1,
  );
  return {
    page: Number(page),
    totalPages,
    perPage: Number(perPage),
    totalItems: Number(totalItems),
  };
};
