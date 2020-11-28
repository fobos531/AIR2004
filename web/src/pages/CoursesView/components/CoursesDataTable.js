import React from "react";
import MUIDataTable from "mui-datatables";

const columns = ["Name", "Passcode", "Allowed absences"];

const options = {
  filterType: "checkbox",
};

const CoursesDataTable = ({ courses }) => {
  let data = [];

  courses.map((courses) => {
    let _courses = [
      courses.name,
      courses.passcode,
      courses.allowedAbsences
    ];
    data.push(_courses);
  });

  return (
    <>
      <MUIDataTable
        title={"All courses"}
        data={data}
        columns={columns}
        options={options}
      />
    </>
  );
};

export default CoursesDataTable;
