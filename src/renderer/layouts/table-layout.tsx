import React, { useMemo, useState, type ReactNode } from "react";
import {
  Search,
  X,
  ChevronDown,
  Edit,
  Trash,
  RefreshCcw,
  ArrowDownUp,
  ArrowBigUp,
  ArrowBigDown,
  Plus,
} from "lucide-react";
import { useSharedState } from "../pages/context/state-context";

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
  createBtn?: ReactNode;
  stateKey: string;
};

type TableStateProps = {
    sortColumn: string | null,
    sortDirection: "asc" | "desc",
    currentPage: number,
}

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
  itemsPerPage = 10,
  createBtn,
  stateKey,
}) => {

  const { getState, setState } = useSharedState();

  // Estado inicial persistente
  const initialState: TableStateProps = getState(stateKey) || {
    sortColumn: null,
    sortDirection: "asc",
    currentPage: 1,
  };

  // Estados
  const [sortColumn, setSortColumn] = useState<string | null>(
    initialState.sortColumn
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">(
    initialState.sortDirection
  );
  // const [searchVisible, setSearchVisible] = useState<boolean>(
  //   initialState.searchVisible
  // );
  // const [searchColumn, setSearchColumn] = useState<string>(
  //   initialState.searchColumn
  // );
  // const [searchValue, setSearchValue] = useState<string>(
  //   initialState.searchValue
  // );
  const [currentPage, setCurrentPage] = useState<number>(
    initialState.currentPage
  );
  // const [dropdownOpen, setDropdownOpen] = useState<boolean>(
  //   initialState.dropdownOpen
  // );

  // const [sortColumn, setSortColumn] = useState<string | null>(null);
  // const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const [searchVisible, setSearchVisible] = useState<boolean>(false);
  const [searchColumn, setSearchColumn] = useState<string>(columns[0]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const handleSort = (col: string) => {
    if (sortColumn === col) {
      const newDirection = sortDirection === "asc" ? "desc" : "asc";
      setSortDirection(newDirection);
      persistState({ sortDirection: newDirection });
    } else {
      setSortColumn(col);
      setSortDirection("asc");
      persistState({ sortColumn: col, sortDirection: "asc" });
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
    // persistState({ searchValue: "", searchVisible: false });
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

  const persistState = (updated: Partial<typeof initialState>) => {
    setState(stateKey, {
      sortColumn,
      sortDirection,
      searchColumn,
      searchVisible,
      searchValue,
      currentPage,
      ...updated,
    });
  };

  return (
    <div className="space-y-4 flex flex-col h-full justify-between overflow-auto">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <div className="flex gap-2">
            {createBtn ? (
              createBtn
            ) : (
              <button
                className="flex items-center gap-2 border p-2 rounded-md bg-primary text-base-100 shadow-md cursor-pointer"
                onClick={onCreate}
              >
                <Plus />
                Cadastrar
              </button>
            )}
          </div>

          <div className="flex gap-2 items-center">
            {searchVisible ? (
              <div className="relative">
                <div className="flex items-center rounded-md bg-base-100 p-2 gap-1">
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
                    className="input input-xs rounded-xs border-neutral-300 focus:outline-none "
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
                  <div className="absolute z-20 mt-1 bg-white border border-neutral-300 rounded-md shadow-2xl w-40 ">
                    {columns.map((col) => (
                      <div
                        key={col}
                        onClick={() => {
                          setSearchColumn(col);
                          setDropdownOpen(false);
                        }}
                        className={`px-3 py-1 cursor-pointer hover:bg-gray-100 ${
                          col === searchColumn
                            ? "bg-gray-100 font-semibold"
                            : ""
                        }`}
                      >
                        {col}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div
                className="p-2 cursor-pointer"
                onClick={() => setSearchVisible(true)}
                title="Buscar"
              >
                <Search size={24} className="h-6 w-6" />
              </div>
            )}

            <div onClick={onRefresh} title="Atualizar">
              <RefreshCcw className="text-green-500 cursor-pointer " />
            </div>
          </div>
        </div>

        {/* Tabela */}
        <div className="overflow-x-auto border border-neutral-300 shadow-md rounded-md">
          <table className="table table-zebra w-full over ">
            <thead className="bg-neutral-700 text-base-100">
              <tr className="">
                {columns.map((col) => (
                  <th
                    key={col}
                    className={`capitalize ${
                      sortableColumns.includes(col)
                        ? "cursor-pointer select-none hover:text-primary "
                        : ""
                    }`}
                    onClick={() => {
                      if (sortableColumns.includes(col)) handleSort(col);
                    }}
                  >
                    <div className="flex items-center content-center">
                      {col}
                      {sortableColumns.includes(col) && (
                        <span className="ml-1 ">
                          {sortColumn === col ? (
                            sortDirection === "asc" ? (
                              <ArrowBigUp className="w-6 h-6 text-primary" />
                            ) : (
                              <ArrowBigDown className="w-6 h-6 text-primary" />
                            )
                          ) : (
                            <ArrowDownUp className="w-6 h-6" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
                {(editButtons || deleteButtons) && <th>Ações</th>}
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 ? (
                <tr className="">
                  <td colSpan={columns.length + 1} className="text-center ">
                    Nenhum dado encontrado.
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="bg-base-300 hover:bg-primary/50 transition-colors duration-300 cursor-pointer"
                  >
                    {columns.map((col) => (
                      <td className="cursor-pointer" key={col}>
                        <div className="cursor-auto">{row[col] ?? "-"}</div>
                      </td>
                    ))}
                    {(editButtons || deleteButtons) && (
                      <td className="flex gap-2 ">
                        {editButtons && (
                          <div className="tooltip" data-tip="Editar">
                            <Edit
                              className=" btn-xs btn-info text-blue-500"
                              onClick={() => onEdit?.(row)}
                            ></Edit>
                          </div>
                        )}
                        {deleteButtons && (
                          <div className="tooltip" data-tip="Excluir">
                            <Trash
                              className="btn-xs btn-error text-red-500"
                              onClick={() => onDelete?.(row)}
                            />
                          </div>
                        )}
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Paginação */}
      {pagination && totalPages > 1 && (
        <div className="flex justify-center gap-1 ">
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
                onClick={() => {
                  setCurrentPage(Number(page));
                  persistState({ currentPage: page });
                }}
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
