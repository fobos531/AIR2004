import React from "react";
import MUIDataTable from "mui-datatables";

const columns = ["Name", "Passcode", "Allowed absences"];

const options = {
  filterType: "checkbox",
};

const CoursesDataTable = ({ courses }) => {
  let data = [];

  courses.map((course) => {
    let _course = [course.name, course.passcode, course.allowedAbsences];
    data.push(_course);
  });

  return (
    <>
      <MUIDataTable title={"All courses"} data={data} columns={columns} options={options} />
    </>
  );
};

export default CoursesDataTable;
