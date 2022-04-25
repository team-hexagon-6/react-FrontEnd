import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "../views/login/Login";
import RegisterUser from "../views/registration/RegisterUser";
import UserCompleteRegistration from "../views/UserCompleteRegistration/UserCompleteRegistration";


export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/registerUser" element ={<RegisterUser/>}></Route>
        <Route path="/userCompleteRegistration" element ={<UserCompleteRegistration/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
