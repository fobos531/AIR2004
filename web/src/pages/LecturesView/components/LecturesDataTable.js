import React from "react";
import MUIDataTable from "mui-datatables";

const columns = ["Course", "Type", "Time start", "Time end"];

const options = {
  filterType: "checkbox",
};

const LecturesDataTable = ({ lectures }) => {
  let data = [];

  lectures.map((lecture) => {
    let _lecture = [lecture.course.name, lecture.type, lecture.timeStart, lecture.timeEnd];
    data.push(_lecture);
  });

  return (
    <>
      <MUIDataTable title={"All lectures"} data={data} columns={columns} options={options} />
    </>
  );
};

export default LecturesDataTable;
