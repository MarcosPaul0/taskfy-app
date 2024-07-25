import { useSearchParams } from "next/navigation";
import { UsePaginationParams } from "./usePaginationParams.interface";

export function usePagination({ totalPages = 1 }: UsePaginationParams) {
  const { get } = useSearchParams();

  const currentPage = get("page");

  const nextPageIsDisabled = Boolean(Number(currentPage) + 1 >= totalPages);

  const previousPageIsDisabled = Boolean(currentPage && Number(currentPage) <= 0);

  const nextPage = currentPage ? `?page=${nextPageIsDisabled ? Number(currentPage) : Number(currentPage) + 1}` : "?page=1";

  const previousPage = currentPage ? `?page=${previousPageIsDisabled ? Number(currentPage) : Number(currentPage) - 1}` : "?page=0";

  return { currentPage, nextPage, previousPage };
}
