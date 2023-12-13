import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import productData from "../../../utils/datasets/products.csv";
import employeeData from "../../../utils/datasets/employees.csv";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faCheck } from "@fortawesome/free-solid-svg-icons";

export const FilterBar = ({
  setSearchTerm: setSQLQuery,
  setTable,
  columns,
}) => {
  const [selectBlobs, setSelectBlobs] = useState([0]);
  const [whereBlobs, setWhereBlobs] = useState([0]);

  const [selectTerms, setSelectTerm] = useState([]);
  const [fromTerm, setFromTerm] = useState("productData");
  const [whereTermsList, setWhereTermsList] = useState([]);

  const generateSQL = () => {
    const selectString = selectTerms.length > 0 ? selectTerms.join(", ") : "*";

    const whereString =
      whereTermsList.length > 0 ? `WHERE ${whereTermsList.join(" AND ")}` : "";

    const whereWithSpace = whereString ? ` ${whereString}` : "";

    const SQL = fromTerm
      ? `SELECT ${selectString} FROM ${fromTerm}${whereWithSpace}`
      : "";

    setSQLQuery(SQL.trim());
  };

  const handleSELECTChange = (idx, e) => {
    if (fromTerm === "?") {
      toast.error("Select a Table First");
      return;
    }

    // Copying the current selectTerms array
    const newSelectTerms = [...selectTerms];

    // Updating the i-th element with the new value
    newSelectTerms[idx] = e.target.value;

    // Updating the selectTerms state
    setSelectTerm(newSelectTerms);

    generateSQL();
  };

  const handleSELECTDelete = (idx) => {
    // Remove the blob based on the index
    const newSelectBlobs = selectBlobs.filter((_, index) => index !== idx);
    setSelectBlobs(newSelectBlobs);

    // Remove the term based on the index
    const newSelectTerms = selectTerms.filter((_, index) => index !== idx);
    setSelectTerm(newSelectTerms);

    generateSQL();
  };

  const handleFROMChange = (e) => {
    if (e.target.value === "productData") {
      setTable(productData);
    } else {
      setTable(employeeData);
    }

    setFromTerm(e.target.value);
    setWhereTermsList([]);
    setSelectTerm([]);

    setSelectBlobs([0]);
    setWhereBlobs([0]);

    generateSQL();
  };

  const handleWHERESubmit = ({ index, whereTerm }) => {
    const newWhereTerms = [...whereTermsList];
    newWhereTerms[index] = whereTerm;
    setWhereTermsList(newWhereTerms);
  };

  const handleWHEREDelete = (idx) => {
    // Remove the blob based on the index
    const newWhereBlobs = whereBlobs.filter((_, index) => index !== idx);
    setWhereBlobs(newWhereBlobs);

    // Remove the term based on the index
    const newWhereTerms = whereTermsList.filter((_, index) => index !== idx);
    setWhereTermsList(newWhereTerms);

    generateSQL();
  };

  useEffect(() => {
    generateSQL();
  }, [selectTerms, fromTerm, whereTermsList]);

  useEffect(() => {
    console.log(whereTermsList);
  }, [whereTermsList]);

  return (
    <div className="w-full p-6 mb-5 mt-5 flex items-center overflow-x-auto scrollbar-thin bg-blue-100">
      {/* Container div */}
      <div className="flex flex-nowrap items-center min-w-full">
        {/* SELECT section */}
        <div className="font-sans font-medium italic flex-shrink-0">SELECT</div>
        {selectBlobs.map((_, index) => (
          <SELECTColumnBlob
            columns={columns}
            key={index}
            onChangeHandler={(e) => {
              handleSELECTChange(index, e);
            }}
            onDeleteHandler={() => handleSELECTDelete(index)}
          />
        ))}
        <AddColumnButton
          onClick={() => setSelectBlobs([...selectBlobs, selectBlobs.length])}
        />
        {/* FROM section */}
        <div className="font-sans italic ml-2 flex-shrink-0 font-medium">
          FROM
        </div>
        <FROMColumnBlob onChangeHandler={handleFROMChange} />
        {/* WHERE section */}
        <div className="font-sans italic ml-2 flex-shrink-0 font-medium">
          WHERE
        </div>
        {whereBlobs.map((_, index) => (
          <WHEREColumnBlob
            key={index}
            index={index}
            handleSubmit={({ index, whereTerm }) => {
              handleWHERESubmit({ index, whereTerm });
            }}
            onDeleteHandler={handleWHEREDelete}
            columns={columns}
          />
        ))}
        <AddColumnButton
          onClick={() => setWhereBlobs([...whereBlobs, whereBlobs.length])}
        />
      </div>
    </div>
  );
};

const AddColumnButton = ({ onClick }) => (
  <div
    onClick={onClick}
    className=" w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-300 text-gray-700 flex items-center justify-center ml-2 shadow-md hover:shadow-xl border hover:border-gray-400 transition-all duration-200 ease-in-out flex-shrink-0"
  >
    +
  </div>
);

const SELECTColumnBlob = ({ onChangeHandler, onDeleteHandler, columns }) => {
  return (
    <div className="px-2 py-1 ml-3 rounded-lg border bg-white border-[#468AF9] flex items-center text-sm text-[#468AF9] flex-shrink-0">
      <select
        onChange={onChangeHandler}
        className="text-sm bg-transparent border-0 outline-none"
        defaultValue="*"
      >
        <option
          value="*"
          className="bg-gray-200 font-bold text-blue-700 px-2 py-1 rounded hover:bg-gray-300"
        >
          *
        </option>
        {columns.map((item, index) => (
          <option key={`${index}-${item}`}>{item}</option>
        ))}
      </select>
      {/* Delete Button */}
      <button
        onClick={onDeleteHandler}
        className="ml-2 w-4 h-4 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 focus:bg-red-700 focus:ring focus:ring-red-200 focus:ring-opacity-50 transition ease-in-out duration-200"
      >
        <FontAwesomeIcon icon={faTrashAlt} className="text-white text-[8px]" />
      </button>
    </div>
  );
};

const FROMColumnBlob = ({ onChangeHandler }) => (
  <div className="px-2 py-1 ml-3 rounded-lg border bg-white border-[#468AF9] flex items-center text-sm text-[#468AF9] flex-shrink-0">
    <select
      onChange={onChangeHandler}
      className="text-sm bg-transparent border-0 outline-none"
    >
      <option>productData</option>
      <option>employeeData</option>
    </select>
  </div>
);

function WHEREColumnBlob({ index, handleSubmit, columns, onDeleteHandler }) {
  const [property, setProperty] = useState("");
  const [operator, setOperator] = useState("");
  const [value, setValue] = useState("");

  const isSubmitActive =
    property !== "" &&
    property !== "?" &&
    operator !== "" &&
    operator !== "?" &&
    value !== "";

  return (
    <div className="shadow-lg shadow-slate-200 ml-3 pr-2 bg-white rounded-lg border border-[#468AF9] flex items-center text-xs text-[#468AF9] flex-shrink-0">
      <div className="px-4 py-1 border-r">
        <select
          onChange={(e) => {
            setProperty(e.target.value);
          }}
          className="text-sm bg-transparent border-0 outline-none"
        >
          <option value="?">?</option>
          {columns &&
            columns.map((item, idx) => (
              <option key={`${idx}-${item}`}>{item}</option>
            ))}
        </select>
      </div>
      <div className="px-4 py-1 border-r">
        <select
          onChange={(e) => {
            setOperator(e.target.value);
          }}
          className="text-sm bg-transparent border-0 outline-none"
        >
          <option value="?">?</option>
          <option className=" m-15">=</option>
          <option className=" m-15">&gt;</option>
          <option className=" m-15">&lt;</option>
        </select>
      </div>
      <div className="px-4 py-1 flex">
        <input
          onChange={(e) => {
            setValue(e.target.value);
          }}
          value={value}
          type="text"
          placeholder="Enter value"
          className="text-xs bg-transparent border border-[#468AF9] rounded-full outline-none px-3 my-1 text-[#468AF9] hover:border-[#6AA0F8] focus:border-[#305FA5] focus:ring-1 focus:ring-[#468AF9] focus:ring-opacity-50"
        />

        <button
          onClick={() => {
            if (!isSubmitActive) return;
            handleSubmit({
              index: index,
              whereTerm: `${property} ${operator} '${value}'`,
            });
          }}
          className={`ml-2 w-6 h-6 flex items-center justify-center rounded-full 
                     ${isSubmitActive ? "bg-blue-500" : "bg-gray-300"} 
                     text-white transition ease-in-out duration-200`}
        >
          <FontAwesomeIcon icon={faCheck} />
        </button>
      </div>
      {/* Delete Button */}
      <button
        onClick={() => onDeleteHandler(index)}
        className="ml-2 w-4 h-4 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 focus:bg-red-700 focus:ring focus:ring-red-200 focus:ring-opacity-50 transition ease-in-out duration-200"
      >
        <FontAwesomeIcon icon={faTrashAlt} className="text-white text-[8px]" />
      </button>
    </div>
  );
}
