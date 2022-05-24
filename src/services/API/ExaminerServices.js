import config from "../../config.json";
import axios from "axios";
import token from "../Token";

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
    url: APIEndpoint + "/add-new-patient",
    data: {
      patient_id: data["PatientID"],
      firstname: data["First Name"],
      lastname: data["Last Name"],
      nic: data["NIC"],
      contact_no: data["Contact Number"],
      email: data["Email"],
      birthday: data["Birthday"],
      gender_type: data["Gender"],
    },
    headers: { Authorization: `Bearer ${token.getAccessToken()}` },
  });
};

const getpatienttestdetails1 = (testrecordid) => {
  return axios({
    method: "get",
    url: APIEndpoint + `/test/test-record/${testrecordid}`,
    headers: { Authorization: `Bearer ${token.getAccessToken()}` },
  });
};

const getpatienttestdetails = (skip, take, patient_id) => {
  return axios({
    method: "get",
    url:
      APIEndpoint +
      `/test/tests?skip=${skip}&take=${take}&patient_id=${patient_id}`,
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

export default {
  getpatientdetails,
  dotest,
  gettesttypes,
  getpatienttestdetails,
  getpatienttestrecordsforatest,
  createtest,
  confirmtest,
  addPatient,
};
