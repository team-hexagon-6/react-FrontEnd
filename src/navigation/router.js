import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "../views/login/Login";
import RegisterUser from "../views/registration/RegisterUser";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/registerUser" element ={<RegisterUser/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
