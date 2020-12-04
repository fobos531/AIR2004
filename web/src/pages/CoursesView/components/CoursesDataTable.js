import React from "react";
import MUIDataTable from "mui-datatables";

const columns = ["Name", "Passcode", "Allowed absences", "Enrolled students", "Action"];

let ids = [];
let rowItem = [];

const handleRowClick = (rowData, rowMeta) => {
  console.log(rowData, rowMeta);
  console.log('id: ', ids[rowMeta.rowIndex]);
  rowItem = [];
  rowItem.push(ids[rowMeta.rowIndex], rowData);
  console.log('item: ', rowItem);
};

const options = {
  filterType: "checkbox",
  onRowClick: handleRowClick,
};

const CoursesDataTable = ({ courses }) => {
  let data = [];
  
  courses.map((course) => {
    ids.push(course.id);
    let _course = [course.name, course.passcode, course.allowedAbsences, course.enrolledStudents.length, ];
    data.push(_course);
  });

  console.log('aa: ', ids);

  return (
    <>
      <MUIDataTable title={"All courses"} data={data} columns={columns} options={options} />
    </>
  );
};

export default CoursesDataTable;
