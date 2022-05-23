import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "../views/login/Login";
import NewTest from "../views/new_test/NewTest";
import RegisterUser from "../views/registration/RegisterUser";
import UserCompleteRegistration from "../views/UserCompleteRegistration/UserCompleteRegistration";
import PatientReport from './../views/patientReport/PatientReport';
import { RequireAuth } from "../utils/requireAuth";

import NotFound from "../views/not_found/NotFound"; 
import AllUsers from "../views/all_users/AllUsers";
import TestDetails from "../views/test_details/TestDetails";
import TestRecords from "../views/test_records/TestRecords";
import { AuthProvider } from "../utils/auth";
import HomePage from './../views/HomePage/HomePage';

const  Router =() =>{
  return (
    <AuthProvider> 
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<HomePage />} />
        <Route path="*" element = {<NotFound/>}></Route>

        <Route path="/login" element={<Login />} />
        <Route path="/registerUser" element ={<RequireAuth><RegisterUser/></RequireAuth>}></Route>
        <Route path="/userCompleteRegistration" element ={<UserCompleteRegistration/>}></Route>
        <Route path="/newTest/:patientid" element = {<NewTest/>}></Route>
        <Route path="/allUsers" element = {<AllUsers/>}></Route>
        <Route path="/patientReport/:patientid/:testid" element ={<PatientReport/>}></Route>
        <Route path="*" element = {<NotFound/>}></Route>
        <Route path="/testDetails/:patientid" element ={<TestDetails/>}></Route>
        <Route path="/testRecords/:testid" element ={<TestRecords/>}></Route>
        

      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default Router;
