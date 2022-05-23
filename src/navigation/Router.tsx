import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AddPatient from "../views/addPatient/AddPatient";
import Login from "../views/login/Login";
import NewTest from "../views/new_test/NewTest";
import RegisterUser from "../views/registration/RegisterUser";
import UserCompleteRegistration from "../views/UserCompleteRegistration/UserCompleteRegistration";


const  Router =() =>{
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/registerUser" element ={<RegisterUser/>}></Route>
        <Route path="/userCompleteRegistration" element ={<UserCompleteRegistration/>}></Route>
        <Route path="/newTest" element = {<NewTest/>}></Route>
        <Route path="/addPatient" element={<AddPatient/>}></Route>
      </Routes>
    </BrowserRouter>

  );
}

export default Router;
