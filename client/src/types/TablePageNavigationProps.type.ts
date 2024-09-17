export type TablePageNavigationProps = {
  indexOfFirstItem: number;
  indexOfLastItem: number;
  currentPage: number;
  handlePageChange: (newPage: number) => void;
  totalPages: number;
};
