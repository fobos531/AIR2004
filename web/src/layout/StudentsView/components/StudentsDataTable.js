import React from "react";
import MUIDataTable from "mui-datatables";

const columns = ["Email", "JMBAG", "Phone number", "User type"];
const data = [["Test test", "00161203102", "123-456-7890", "Administrator"]];

const options = {
  filterType: "checkbox",
};

const StudentsDataTable = () => {
  return (
    <>
      <MUIDataTable
        title={"All students"}
        data={data}
        columns={columns}
        options={options}
      />
    </>
  );
};

export default StudentsDataTable;
