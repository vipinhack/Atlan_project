import React, { createContext, useState, useContext } from "react";

const SQLContext = createContext();

export const useSQL = () => {
  return useContext(SQLContext);
};

export const SQLProvider = ({ children }) => {
  const [selectColumns, setSelectColumns] = useState([]);
  const [fromTable, setFromTable] = useState("");
  const [whereConditions, setWhereConditions] = useState([]);

  return (
    <SQLContext.Provider
      value={{
        selectColumns,
        setSelectColumns,
        fromTable,
        setFromTable,
        whereConditions,
        setWhereConditions,
      }}
    >
      {children}
    </SQLContext.Provider>
  );
};
