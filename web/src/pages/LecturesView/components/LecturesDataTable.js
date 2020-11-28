import React from "react";
import MUIDataTable from "mui-datatables";

const columns = ["Course", "Type", "Time start", "Time end"];

const options = {
  filterType: "checkbox",
};

const LecturesDataTable = ({ lectures  }) => {
  let data = [];

  lectures.map((lectures) => {
    let _lectures = [
      lectures.course,
      lectures.type,
      lectures.timeStart,
      lectures.timeEnd
    ];
    data.push(_lectures);
  });

  return (
    <>
      <MUIDataTable
        title={"All lectures"}
        data={data}
        columns={columns}
        options={options}
      />
    </>
  );
};

export default LecturesDataTable;
