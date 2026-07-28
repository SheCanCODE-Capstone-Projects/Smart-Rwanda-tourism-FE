type PaginationProps = { currentPage: number; totalItems: number; pageSize: number; onChange: (page: number) => void };

const Pagination = ({ currentPage, totalItems, pageSize, onChange }: PaginationProps) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  if (totalItems <= pageSize) return null;
  return <nav className="flex items-center justify-between border-t border-gray-100 pt-5" aria-label="Reservation pagination"><p className="text-sm text-gray-500">Page {currentPage} of {totalPages}</p><div className="flex gap-2"><button type="button" disabled={currentPage === 1} onClick={() => onChange(currentPage - 1)} className="rounded-lg border border-gray-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50">Previous</button><button type="button" disabled={currentPage === totalPages} onClick={() => onChange(currentPage + 1)} className="rounded-lg border border-gray-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50">Next</button></div></nav>;
};

export default Pagination;
