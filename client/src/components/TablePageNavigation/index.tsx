import { bookings } from "@/api/bookings";
import { TablePageNavigationProps } from "@/types";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

export function TablePageNavigation({
  indexOfFirstItem,
  indexOfLastItem,
  currentPage,
  handlePageChange,
  totalPages,
}: TablePageNavigationProps) {
  return (
    <div className="flex items-center justify-between mt-4">
      <p className="text-sm text-gray-500">
        Exibindo {indexOfFirstItem + 1} -{" "}
        {Math.min(indexOfLastItem, bookings.length)} de {bookings.length}{" "}
        reservas
      </p>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() =>
                handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
              }
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, index) => index + 1)
            .filter(
              (page) =>
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
            )
            .map((page, index, array) => (
              <React.Fragment key={page}>
                {array[index - 1] && page - array[index - 1] > 1 && (
                  <PaginationItem key={`ellipsis-${page}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                <PaginationItem key={`page-${page}`}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === page}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              </React.Fragment>
            ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() =>
                handlePageChange(
                  currentPage < totalPages ? currentPage + 1 : totalPages
                )
              }
            >
              Próximo
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
