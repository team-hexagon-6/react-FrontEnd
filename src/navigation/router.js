import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "../views/login/Login";
import RegisterUser from "../views/registration/RegisterUser";
import UserCompeleteRegistration from './../views/UserCompeleteRegistration/UserCompeleteRegistration';


export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/registerUser" element ={<RegisterUser/>}></Route>
        <Route path="/userCompeleteRegistration" element ={<UserCompeleteRegistration/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
