import config from "../../config.json";
import axios from "../HttpServices";
import token from "../Token";
// import { genderTypes } from './../../../../node-server/prisma/seed/genderTypes';

//API endpoint
const APIEndpoint = config.DOMAIN_NAME + "/api";

const getpatientdetails = (patientid) => {
  return axios({
    method: "get",
    url: APIEndpoint + `/patient/get-patient/${patientid}`,
    headers: { Authorization: `Bearer ${token.getAccessToken()}` },
  });
};
const addPatient = (data) => {
  return axios({
    method: "post",
    url: APIEndpoint + "/patient/add-new-patient",
    data: {
      patient_id: data["Patient ID"],
      firstname: data["First Name"],
      lastname: data["Last Name"],
      nic: data["NIC"],
      contact_no: data["Contact Number"],
      email: data["Email"],
      birthday: data["Birthday"],
      gender_type: data["GenderValue"],
    },
    headers: { Authorization: `Bearer ${token.getAccessToken()}` },
  });
};

const updatePatientProfile = (data) => {
  // console.log("id is", patient_id);
  return axios({
    method: "post",
    url: APIEndpoint + "/patient/update-patient",
    data: {
      patient_id: data["patient_id"],
      firstname: data["First Name"],
      lastname: data["Last Name"],
      nic: data["NIC"],
      contact_no: data["Contact Number"],
      email: data["Email"],
      birthday: data["Birthday"],
      gender_type: data["GenderValue"],
    },

    headers: { Authorization: `Bearer ${token.getAccessToken()}` },
  });
};

// const getpatienttestdetails1 = (testrecordid) => {
//   return axios({
//     method: "get",
//     url: APIEndpoint + `/test/test-record/${testrecordid}`,
//     headers: { Authorization: `Bearer ${token.getAccessToken()}` },
//   });
// };

const getpatienttestdetails = (skip, take, patient_id) => {
  return axios({
    method: "get",
    url:
      APIEndpoint +
      `/test/tests?skip=${skip}&take=${take}&patient_id=${patient_id}`,
    headers: { Authorization: `Bearer ${token.getAccessToken()}` },
  });
};

const getgendertypes = () => {
  return axios({
    method: "get",
    url: APIEndpoint + "/patient/gender-types",
    headers: { Authorization: `Bearer ${token.getAccessToken()}` },
  });
};

const getpatienttestrecordsforatest = (testid) => {
  return axios({
    method: "get",
    url: APIEndpoint + `/test/test/${testid}`,
    headers: { Authorization: `Bearer ${token.getAccessToken()}` },
  });
};

const dotest = (data) => {
  return axios({
    method: "post",
    url: APIEndpoint + "/test/do-test",
    data: {
      patient_id: data.patient_id,
      test_type: data.test_type,
      base64_img: "ewrw",
    },
    headers: { Authorization: `Bearer ${token.getAccessToken()}` },
  });
};

const createtest = (patient_id) => {
  return axios({
    method: "post",
    url: APIEndpoint + "/test/create-new-test",
    data: {
      patient_id: patient_id,
    },
    headers: { Authorization: `Bearer ${token.getAccessToken()}` },
  });
};

const gettesttypes = () => {
  return axios({
    method: "get",
    url: APIEndpoint + "/test/test-types",
    headers: { Authorization: `Bearer ${token.getAccessToken()}` },
  });
};
const getGenderTypes = () => {
  return axios({
    method: "get",
    url: APIEndpoint + "/patient/gender-types",
    headers: { Authorization: `Bearer ${token.getAccessToken()}` },
  });
};

const confirmtest = (test_id, patient_id) => {
  return axios({
    method: "post",
    url: APIEndpoint + "/test/confirm-test",
    data: {
      test_id: test_id,
      patient_id: patient_id,
    },
    headers: { Authorization: `Bearer ${token.getAccessToken()}` },
  });
};

const getPatients = (skip, take) => {
  return axios({
    method: "get",
    url: APIEndpoint + `/patient/get-all-patients?skip=${skip}&take=${take}`,
    headers: { Authorization: `Bearer ${token.getAccessToken()}` },
  });
};

export default {
  getpatientdetails,
  dotest,
  gettesttypes,
  getpatienttestdetails,
  getpatienttestrecordsforatest,
  createtest,
  confirmtest,
  getPatients,
  addPatient,
  getGenderTypes,
  getgendertypes,
  updatePatientProfile,
};
