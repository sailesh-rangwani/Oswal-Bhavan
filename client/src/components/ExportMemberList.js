import React from "react";

const ExportMemberList = ({ exportToPdf, exportToXls, filteredMembers }) => {
  return (
    <div>
      <button
        className="px-4 py-2 rounded bg-indigo-500 text-white mr-4"
        onClick={() => exportToPdf(filteredMembers)}
      >
        Export PDF
      </button>
      <button
        className="px-4 py-2 rounded bg-indigo-500 text-white"
        onClick={() => exportToXls(filteredMembers)}
      >
        Export XLS
      </button>
    </div>
  );
};

export default ExportMemberList;
