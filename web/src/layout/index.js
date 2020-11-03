import React from "react";
import TopBar from "./TopBar";
import NavBar from "./Navbar/index";
import StudentsView from "./StudentsView/index";
export const Index = () => {
  return (
    <>
      <TopBar />
      <NavBar />
      {/* Main content goes here */}
      <main>
        <StudentsView />
      </main>
    </>
  );
};
