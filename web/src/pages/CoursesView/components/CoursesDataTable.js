import React from "react";
import MUIDataTable from "mui-datatables";
import { useHistory } from "react-router-dom";

const columns = ["Name", "Passcode", "Allowed absences", "Enrolled students"];

let ids = [];

const CoursesDataTable = ({ courses }) => {
  let data = [];

  const history = useHistory();

  const handleRowClick = (rowData, rowMeta) => {
    const selectedCourse = {};
    selectedCourse.id = ids[rowMeta.rowIndex];
    selectedCourse.data = rowData;
    console.log('selected course: ', selectedCourse);

    history.push({
      pathname: '/courses/edit',
      search: '',
      state: { detail: selectedCourse }
    });

  };

  const options = {
    selectableRows: true,
    onRowClick: handleRowClick
  };
  
  courses.map((course) => {
    ids.push(course.id);
    let _course = [course.name, course.passcode, course.allowedAbsences, course.enrolledStudents ? course.enrolledStudents.length : 0];

    data.push(_course);
  });

  return (
    <>
      <MUIDataTable title={"All courses"} data={data} columns={columns} options={options} />
    </>
  );
};

export default CoursesDataTable;
