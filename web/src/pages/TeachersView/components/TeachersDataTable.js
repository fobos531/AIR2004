import React from "react";
import MUIDataTable from "mui-datatables";

const columns = ["Name", "Surname", "Email", "Phone number", "User type"];

const options = {
  filterType: "checkbox",
};

const TeachersDataTable = ({ teachers }) => {
  let data = [];
  console.log("TEACHERS", teachers);
  teachers.map((teacher) => {
    let _teacher = [teacher.name, teacher.surname, teacher.email, teacher.phoneNumber, teacher.userType];
    data.push(_teacher);
  });

  return (
    <>
      <MUIDataTable
        title={"All teachers"}
        data={data}
        columns={columns}
        options={options}
      />
    </>
  );
};

export default TeachersDataTable;
