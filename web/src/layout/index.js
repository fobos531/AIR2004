import React from "react";
import TopBar from "./TopBar";
import NavBar from "./Navbar/index";

export const Index = () => {
  return (
    <>
      <TopBar />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <NavBar style={{ flex: 1 }} />
        {/* Main content goes here */}
      </div>
    </>
  );
};
