import React, { useMemo, useState } from "react";
import { Search, X, ChevronDown } from "lucide-react";

type TableProps = {
  columns: string[];
  data: Record<string, any>[];
  editButtons?: boolean;
  deleteButtons?: boolean;
  sortableColumns?: string[];
  onCreate?: () => void;
  onRefresh?: () => void;
  onEdit?: (row: Record<string, any>) => void;
  onDelete?: (row: Record<string, any>) => void;
  pagination?: boolean;
  itemsPerPage?: number;
};

const DynamicTable: React.FC<TableProps> = ({
  columns,
  data,
  editButtons = false,
  deleteButtons = false,
  sortableColumns = [],
  onCreate,
  onRefresh,
  onEdit,
  onDelete,
  pagination = true,
  itemsPerPage = 15,
}) => {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const [searchVisible, setSearchVisible] = useState<boolean>(false);
  const [searchColumn, setSearchColumn] = useState<string>(columns[0]);
  const [searchValue, setSearchValue] = useState<string>("");

  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleSort = (col: string) => {
    if (sortColumn === col) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(col);
      setSortDirection("asc");
    }
  };

  const filteredData = useMemo(() => {
    if (!searchValue) return data;
    return data.filter((row) => {
      const cellValue = String(row[searchColumn] ?? "").toLowerCase();
      return cellValue.includes(searchValue.toLowerCase());
    });
  }, [data, searchValue, searchColumn]);

  const sortedData = useMemo(() => {
    if (!sortColumn) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortColumn] ?? "";
      const bValue = b[sortColumn] ?? "";

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortColumn, sortDirection]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage) || 1;

  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    const start = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(start, start + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage, pagination]);

  const clearSearch = () => {
    setSearchValue("");
    setSearchVisible(false);
    setDropdownOpen(false);
  };

  const createPageNumbers = () => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-2">
        <div className="flex gap-2">
          <button className="btn btn-primary btn-sm" onClick={onCreate}>
            Cadastrar
          </button>
        </div>

        <div className="flex gap-2 items-center">
          {searchVisible ? (
            <div className="relative">
              <div className="flex items-center border rounded-md bg-white">
                <div
                  className="flex items-center gap-1 px-2 cursor-pointer hover:bg-gray-100 rounded-l-md"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <span className="font-semibold capitalize">
                    {searchColumn}
                  </span>
                  <ChevronDown size={14} />
                </div>

                <input
                  type="text"
                  className="input input-xs border-0 focus:outline-none"
                  placeholder={`Buscar em ${searchColumn}...`}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />

                <button
                  className="btn btn-xs btn-circle btn-ghost"
                  onClick={clearSearch}
                  title="Limpar"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute z-20 mt-1 bg-white border rounded-md shadow-md w-40">
                  {columns.map((col) => (
                    <div
                      key={col}
                      onClick={() => {
                        setSearchColumn(col);
                        setDropdownOpen(false);
                      }}
                      className={`px-3 py-1 cursor-pointer hover:bg-gray-100 ${
                        col === searchColumn ? "bg-gray-100 font-semibold" : ""
                      }`}
                    >
                      {col}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <button
              className="btn btn-sm btn-ghost"
              onClick={() => setSearchVisible(true)}
              title="Buscar"
            >
              <Search size={18} />
            </button>
          )}

          <button
            className="btn btn-outline btn-sm"
            onClick={onRefresh}
            title="Atualizar"
          >
            Atualizar
          </button>
        </div>
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  className={`capitalize ${
                    sortableColumns.includes(col)
                      ? "cursor-pointer select-none"
                      : ""
                  }`}
                  onClick={() => {
                    if (sortableColumns.includes(col)) handleSort(col);
                  }}
                >
                  {col}
                  {sortableColumns.includes(col) && (
                    <span className="ml-1">
                      {sortColumn === col
                        ? sortDirection === "asc"
                          ? "▲"
                          : "▼"
                        : "⇅"}
                    </span>
                  )}
                </th>
              ))}
              {(editButtons || deleteButtons) && <th>Ações</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="text-center">
                  Nenhum dado encontrado.
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((col) => (
                    <td key={col}>{row[col] ?? "-"}</td>
                  ))}
                  {(editButtons || deleteButtons) && (
                    <td className="flex gap-2">
                      {editButtons && (
                        <button
                          className="btn btn-xs btn-info"
                          onClick={() => onEdit?.(row)}
                        >
                          Editar
                        </button>
                      )}
                      {deleteButtons && (
                        <button
                          className="btn btn-xs btn-error"
                          onClick={() => onDelete?.(row)}
                        >
                          Excluir
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Paginação */}
      {pagination && totalPages > 1 && (
        <div className="flex justify-center gap-1">
          <button
            className="btn btn-sm"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Anterior
          </button>

          {createPageNumbers().map((page, index) =>
            page === "..." ? (
              <span key={index} className="btn btn-sm btn-disabled">
                ...
              </span>
            ) : (
              <button
                key={index}
                className={`btn btn-sm ${
                  currentPage === page ? "btn-primary" : "btn-outline"
                }`}
                onClick={() => setCurrentPage(Number(page))}
              >
                {page}
              </button>
            )
          )}

          <button
            className="btn btn-sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
          >
            Próximo
          </button>
        </div>
      )}
    </div>
  );
};

export default DynamicTable;
