import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory } from "@fortawesome/free-solid-svg-icons";

export const SQLBar = ({
  searchTerm,
  setSearchTerm,
  setSQLQuery,
  handleQuery,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleRunQuery = () => {
    if (!history.includes(searchTerm)) {
      setHistory([...history, searchTerm]);
    }
    handleQuery();
  };

  const handleHistoryClick = (query) => {
    setSearchTerm(query);
    setDropdownOpen(false);
  };

  return (
    <div className="mb-1 ml-4 w-full flex items-center relative">
      <div className="py-2 px-8 w-full border rounded-xl italic text-slate-400 flex items-center">
        <input
          type="text"
          className="flex-grow outline-none px-2"
          placeholder="Query"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => setDropdownOpen(!isDropdownOpen)}
          className="h-8 w-8 ml-2 bg-white rounded-full hover:bg-gray-100 text-sm"
          title="View History"
        >
          <FontAwesomeIcon icon={faHistory} />
        </button>
      </div>
      
      <div ref={dropdownRef}>
        {isDropdownOpen && (
          <div
            className="absolute bg-white mt-2 w-64 rounded-md shadow-lg border"
            style={{ right: "10rem" }}
          >
            <ul>
              {history.map((query, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleHistoryClick(query)}
                >
                  {query}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <button
        onClick={handleRunQuery}
        className="bg-[#468AF9] text-white font-extralight mr-7 rounded-md py-2 px-4 m-2 inline-block whitespace-nowrap hover:shadow-lg hover:bg-gradient-to-r hover:from-[#468AF9] hover:to-[#357abD]"
        style={{ height: "100%" }}
      >
        Run Query
      </button>
    </div>
  );
};
