import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AddPatient from "../views/addPatient/AddPatient";
import Login from "../views/login/Login";
import NewTest from "../views/new_test/NewTest";
import RegisterUser from "../views/registration/RegisterUser";
import UpdateProfile from "../views/UpdateProfile/UpdateProfile";
import PatientReport from './../views/patientReport/PatientReport';
import { RequireAuth } from "../utils/requireAuth";
import Logout from "../components/logout"
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
import Dashboard from "../views/dashboard/Dashboard";
import UpdatePassword from "../views/update_password/UpdatePassword";


const ROLES ={
  'Examiner':'_32247',
  'Doctor':'_32446',
  'Admin':'_32345'
}


const  Router =() =>{
  return (
    <BrowserRouter>
      <Routes>
        {/* Navigation bar routings */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/dashboard" element = {<RequireAuth allowedRoles={[ROLES.Admin,ROLES.Doctor,ROLES.Examiner]} ><Dashboard/></RequireAuth>}></Route>

        {/* Prohibited routings */}
        <Route path="*" element = {<NotFound/>}></Route>
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Admin routings */}
        <Route path="/users" element = {<RequireAuth allowedRoles={[ROLES.Admin]}><AllUsers/></RequireAuth>}></Route>
        <Route path="/register-user" element ={<RequireAuth allowedRoles={[ROLES.Admin]}><RegisterUser/></RequireAuth>}></Route>
        <Route path="/admin" element = {<RequireAuth allowedRoles={[ROLES.Admin]}><AdminDashboard/></RequireAuth>}></Route>
        <Route path="/update-user" element ={<RequireAuth allowedRoles={[ROLES.Admin]}><AdminUpdate/></RequireAuth>}></Route>

        {/* Examiner routings */}
        <Route path="/new-test" element = {<RequireAuth allowedRoles={[ROLES.Examiner]}><NewTest/></RequireAuth>}></Route>
        <Route path="/examiner" element = {<RequireAuth allowedRoles={[ROLES.Examiner]}><Examiner/></RequireAuth>}></Route>
        <Route path="/add-patient" element={<RequireAuth allowedRoles={[ROLES.Examiner]}><AddPatient/></RequireAuth>}></Route>
        <Route path="/update-patient-profile" element ={<RequireAuth allowedRoles={[ROLES.Examiner]}><UpdatePatientProfile/></RequireAuth>}></Route>

        
        {/* Examiner and Doctor routings */}
        <Route path="/update-profile" element ={<RequireAuth allowedRoles={[ROLES.Examiner,ROLES.Doctor]}><UpdateProfile/></RequireAuth>}></Route>
        <Route path="/patients" element = {<RequireAuth allowedRoles={[ROLES.Examiner,ROLES.Doctor]}><AllPatient/></RequireAuth>}></Route>
        <Route path="/view-patient" element = {<RequireAuth allowedRoles={[ROLES.Examiner,ROLES.Doctor]}><ViewPatient /></RequireAuth>}></Route>
        <Route path="/patient-report/:patientid/:testid" element ={<RequireAuth allowedRoles={[ROLES.Examiner,ROLES.Doctor]}><PatientReport/></RequireAuth>}></Route>
        <Route path="/test-details/:patientid" element ={<RequireAuth allowedRoles={[ROLES.Examiner,ROLES.Doctor]}><TestDetails/></RequireAuth>}></Route>
        <Route path="/test-records/:testid" element ={<RequireAuth allowedRoles={[ROLES.Examiner,ROLES.Doctor]}><TestRecords/></RequireAuth>}></Route>
        <Route path="/update-password" element = {<RequireAuth allowedRoles={[ROLES.Examiner,ROLES.Doctor]}><UpdatePassword /></RequireAuth>}></Route>

        {/* Doctor routings */}
        <Route path="/doctor" element = {<RequireAuth allowedRoles={[ROLES.Doctor]}><Doctor/></RequireAuth>}></Route>
      {/* testing
       */}
       
      </Routes>
      </BrowserRouter>
    
  );
}

export default Router;
