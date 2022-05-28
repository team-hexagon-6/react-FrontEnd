import React from "react";
import { NavLink } from "react-router-dom";
import NavBar from "./NavBar";
import "./HomePage.css";
import Image from "../../assets/images/image1.jpg";
export default function HomePage() {
  return (
    <div>
      <NavBar />
      <div className="homepage">
        <h3 className="Header">Parkinson's Disease Detection System</h3>
        <div className="middle">
          <p className="desc">
            Ashhdbuhdbqwd bqub uyqbdq buqdi nqwidqid bqwi qiwdbqiun qiudnqiudnq
            berguerbgrbgherbghrgb irgbeigbrwignwiugniug nwrignwingw
            tjttkuuuuuuu uuuuuuuuu uuuuuuuu veeeeeeeeeeen
          </p>
        </div>
      </div>
    </div>
  );
}
