import React from "react";
import MUIDataTable from "mui-datatables";

const columns = ["Email", "JMBAG", "Phone number", "User type"];

const options = {
  filterType: "checkbox",
};

const StudentsDataTable = ({ students }) => {
  let data = [];

  students.map((student) => {
    let _student = [
      student.email,
      student.jmbag,
      student.phoneNumber,
      student.userType,
    ];
    data.push(_student);
  });

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
