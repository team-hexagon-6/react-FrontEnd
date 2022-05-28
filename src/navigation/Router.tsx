import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AddPatient from "../views/addPatient/AddPatient";
import Login from "../views/login/Login";
import NewTest from "../views/new_test/NewTest";
import RegisterUser from "../views/registration/RegisterUser";
import UpdateProfile from "../views/UpdateProfile/UpdateProfile";
import PatientReport from './../views/patientReport/PatientReport';
import { RequireAuth } from "../utils/requireAuth";

import NotFound from "../views/not_found/NotFound"; 
import AllUsers from "../views/all_users/AllUsers";
import Examiner from "../views/Examiner/Examiner";
import AllPatient from "../views/allpatient/AllPatient";
import Doctor from "../views/Doctor/Doctor";
import AdminDashboard from "../views/dashboard/AdminDashboard";
import TestDetails from "../views/test_details/TestDetails";
import TestRecords from "../views/test_records/TestRecords";
import { AuthProvider } from "../utils/auth";
import HomePage from './../views/HomePage/HomePage';
import AdminUpdate from "../views/update/AdminUpdate";
import UpdatePatientProfile from "../views/updatePatientprofile/UpdatePatientProfile";
import About from "../views/about/About";
import ViewPatient from "../views/View_patient/view_patient";

// FIXME: This is a temporary solution to get the pagination working.
import TestingPage from "../views/testingroute/TestingPage";
import Dashboard from "../views/dashboard/Dashboard";

const  Router =() =>{
  return (
    <AuthProvider> 
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<HomePage />} />
        <Route path="*" element = {<NotFound/>}></Route>

        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registerUser" element ={<RequireAuth><RegisterUser/></RequireAuth>}></Route>
        <Route path="/updateProfile" element ={<UpdateProfile/>}></Route>
        <Route path="/newTest/:patientid" element = {<NewTest/>}></Route>
        <Route path="/allUsers" element = {<AllUsers/>}></Route>
        <Route path="/examiner" element = {<Examiner/>}></Route>
        <Route path="/allpatients" element = {<AllPatient/>}></Route>
        <Route path="/viewPatient" element = {<ViewPatient />}></Route>
        <Route path="/doctor" element = {<Doctor/>}></Route>

        <Route path="/patientReport/:patientid/:testid" element ={<PatientReport/>}></Route>
        <Route path="*" element = {<NotFound/>}></Route>
        <Route path="/dashboard" element = {<Dashboard/>}></Route>
        <Route path="/adminDashboard" element = {<AdminDashboard/>}></Route>
        <Route path="/testDetails/:patientid" element ={<TestDetails/>}></Route>
        <Route path="/testRecords/:testid" element ={<TestRecords/>}></Route>
        <Route path="/addPatient" element={<AddPatient/>}></Route>
        <Route path="/updateUser/:user_id" element ={<AdminUpdate/>}></Route>
        <Route path="/updatePatientProfile" element ={<UpdatePatientProfile/>}></Route>

        {/* FIXME: this is testing route just for testing remove when the deploying */}
        <Route path="/testing" element ={<TestingPage/>}></Route>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default Router;
