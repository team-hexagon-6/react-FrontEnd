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
import HomePage from './../views/HomePage/HomePage';
import AdminUpdate from "../views/update/AdminUpdate";
import UpdatePatientProfile from "../views/updatePatientprofile/UpdatePatientProfile";
import About from "../views/about/About";
import ViewPatient from "../views/View_patient/view_patient";
import Unauthorized from "../views/not_found/Unauthorized";


// FIXME: This is a temporary solution to get the pagination working.
import TestingPage from "../views/testingroute/TestingPage";
import Dashboard from "../views/dashboard/Dashboard";

const ROLES ={
  'Examiner':'_32247',
  'Doctor':'_32446',
  'Admin':'_32345'
}


const  Router =() =>{
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element = {<NotFound/>}></Route>
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registerUser" element ={<RequireAuth allowedRoles={[ROLES.Admin]}><RegisterUser/></RequireAuth>}></Route>
        <Route path="/updateProfile" element ={<RequireAuth allowedRoles={[ROLES.Doctor,ROLES.Examiner]}><UpdateProfile/></RequireAuth>}></Route>
        <Route path="/newTest/:patientid" element = {<RequireAuth allowedRoles={[ROLES.Examiner]}><NewTest/></RequireAuth>}></Route>
        <Route path="/allUsers" element = {<RequireAuth allowedRoles={[ROLES.Admin]}><AllUsers/></RequireAuth>}></Route>
        <Route path="/examiner" element = {<RequireAuth allowedRoles={[ROLES.Examiner]}><Examiner/></RequireAuth>}></Route>
        <Route path="/allpatients" element = {<RequireAuth allowedRoles={[ROLES.Examiner,ROLES.Doctor]}><AllPatient/></RequireAuth>}></Route>
        <Route path="/viewPatient" element = {<RequireAuth allowedRoles={[ROLES.Examiner,ROLES.Doctor]}><ViewPatient /></RequireAuth>}></Route>
        <Route path="/doctor" element = {<RequireAuth allowedRoles={[ROLES.Doctor]}><Doctor/></RequireAuth>}></Route>

        <Route path="/patientReport/:patientid/:testid" element ={<RequireAuth allowedRoles={[ROLES.Examiner,ROLES.Doctor]}><PatientReport/></RequireAuth>}></Route>
        {/* <Route path="*" element = {<NotFound/>}></Route> */}
        <Route path="/dashboard" element = {<Dashboard/>}></Route>
        <Route path="/adminDashboard" element = {<RequireAuth allowedRoles={[ROLES.Admin]}><AdminDashboard/></RequireAuth>}></Route>
        <Route path="/testDetails/:patientid" element ={<RequireAuth allowedRoles={[ROLES.Examiner,ROLES.Doctor]}><TestDetails/></RequireAuth>}></Route>
        <Route path="/testRecords/:testid" element ={<RequireAuth allowedRoles={[ROLES.Examiner,ROLES.Doctor]}><TestRecords/></RequireAuth>}></Route>
        <Route path="/addPatient" element={<RequireAuth allowedRoles={[ROLES.Examiner]}><AddPatient/></RequireAuth>}></Route>
        <Route path="/updateUser/:user_id" element ={<RequireAuth allowedRoles={[ROLES.Admin]}><AdminUpdate/></RequireAuth>}></Route>
        <Route path="/updatePatientProfile" element ={<RequireAuth allowedRoles={[ROLES.Examiner]}><UpdatePatientProfile/></RequireAuth>}></Route>

        {/* FIXME: this is testing route just for testing remove when the deploying */}
        <Route path="/testing" element ={<TestingPage/>}></Route>
      
      </Routes>
      </BrowserRouter>
    
  );
}

export default Router;
