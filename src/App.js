import React, { useState, useEffect, useMemo } from "react";
import { SQLBar } from "./Pages/Home/components/SQLbar";
import { Pagination } from "./Pages/Home/components/paginationComp";
import { Table } from "./Pages/Home/components/table";
import { FilterBar } from "./Pages/Home/components/filterBar";
import Papa from "papaparse";
import productData from "./utils/datasets/products.csv";
import alasql from "alasql";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [sqlQuery, setSQLQuery] = useState("");
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [table, setTable] = useState(productData);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [currentTableData, setCurrentTableData] = useState(tableData);

  const handleQuery = () => {
    try {
      const modifiedSQL = sqlQuery.replace(/FROM (\w+)/, "FROM ?");
      const newFilteredData = alasql(modifiedSQL, [tableData]);
      const lastRowIndex = currentPage * rowsPerPage;
      const firstRowIndex = lastRowIndex - rowsPerPage;
      setCurrentTableData(newFilteredData.slice(firstRowIndex, lastRowIndex));
      setFilteredData(newFilteredData);
      setCurrentPage(1);
    } catch (error) {
      toast.error(`Error in SQL Query : ${error}`);
    }
  };

  useEffect(() => {
    Papa.parse(table, {
      download: true,
      header: true,
      complete: (result) => {
        setTableData(result.data);
        setColumns(result.meta.fields);
      },
    });

    setCurrentPage(1)
  }, [table]);

  useEffect(() => {
    const lastRowIndex = currentPage * rowsPerPage;
    const firstRowIndex = lastRowIndex - rowsPerPage;
    const tempData = tableData.slice(firstRowIndex, lastRowIndex);
    setCurrentTableData(tempData);
    setFilteredData([]);
  }, [tableData, rowsPerPage]);

  useEffect(() => {
    const lastRowIndex = currentPage * rowsPerPage;
    const firstRowIndex = lastRowIndex - rowsPerPage;

    const tempData = (
      filteredData.length !== 0 ? filteredData : tableData
    ).slice(firstRowIndex, lastRowIndex);
    setCurrentTableData(tempData);
  }, [currentPage]);

  return (
    <div className="container mx-auto flex flex-col items-center px-16 py-12">
      <Toaster position="top-right" reverseOrder={false} />
      <SQLBar
        searchTerm={sqlQuery}
        setSearchTerm={setSQLQuery}
        handleQuery={handleQuery}
        setTable={setTable}
      />
      <FilterBar
        setTable={setTable}
        setSearchTerm={setSQLQuery}
        columns={columns}
      />

      <Pagination
        totalRows={(filteredData.length > 0 ? filteredData : tableData).length}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <Table columns={columns} data={currentTableData} />
    </div>
  );
}

export default App;
