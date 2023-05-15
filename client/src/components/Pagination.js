import React, { useState } from "react";

const Pagination = ({ totalMembers, membersPerPage, paginate }) => {
  const [number, setNumber] = useState(1);
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalMembers / membersPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <div className="py-12 text-center">
      <button
        className={`px-3 py-1 m-1 text-center ${
          number <= 1 ? "bg-blue-300" : "bg-blue-600"
        }`}
        onClick={() => {
          number > 1 ? setNumber(number - 1) : setNumber(1);
          if (number > 1) paginate(number - 1);
        }}
      >
        Previous
      </button>

      {pageNumber.map((num) => {
        return (
          <>
            <button
              className={`px-3 py-1 m-1 text-center ${
                num === number ? "bg-gray-600" : "bg-gray-300"
              }`}
              onClick={() => {
                setNumber(num);
                paginate(num);
              }}
            >
              {num}
            </button>
          </>
        );
      })}
      <button
        className={`px-3 py-1 m-1 text-center ${
          number >= pageNumber.length ? "bg-blue-300" : "bg-blue-600"
        }`}
        onClick={() => {
          number < pageNumber.length
            ? setNumber(number + 1)
            : setNumber(pageNumber.length);
          if (number < pageNumber.length) paginate(number + 1);
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
