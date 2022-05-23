import React from "react";
import logo from "../../assets/images/logo.svg";
import "./HeaderOne.css";

function headerOne() {
  return (
    <div className="headerOne">
      <img src={logo} alt="" />
    </div>
  );
}

export default headerOne;
