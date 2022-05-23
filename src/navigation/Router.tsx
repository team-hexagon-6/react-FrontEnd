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
<<<<<<< HEAD
import Clerkpage from "../views/Clerkpage/Clerkpage";
import AllPatient from "../views/allpatient/AllPatient";
import Doctor from "../views/Doctor/Doctor";
import AdminDashboard from "../views/Admin/AdminDashboard";
=======
import AdminDashboard from "../views/dashboard/AdminDashboard";
import TestDetails from "../views/test_details/TestDetails";
import TestRecords from "../views/test_records/TestRecords";
import { AuthProvider } from "../utils/auth";
import HomePage from './../views/HomePage/HomePage';
>>>>>>> ab20a250423e1b8a38c19dac5f846aa3cd39f727

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
        <Route path="/clerk" element = {<Clerkpage/>}></Route>
        <Route path="/allpatients" element = {<AllPatient/>}></Route>
        <Route path="/doctor" element = {<Doctor/>}></Route>
        <Route path="/admin" element = {<AdminDashboard/>}></Route>

        <Route path="/patientReport/:patientid/:testid" element ={<PatientReport/>}></Route>
        <Route path="*" element = {<NotFound/>}></Route>
        <Route path="/adminDashboard" element = {<AdminDashboard/>}></Route>
        <Route path="/testDetails/:patientid" element ={<TestDetails/>}></Route>
        <Route path="/testRecords/:testid" element ={<TestRecords/>}></Route>
        

      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default Router;
