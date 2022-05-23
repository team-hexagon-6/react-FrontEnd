import config from "../../config.json";
import axios from "axios";
import token from "../Token"

//API endpoint
const APIEndpoint = config.DOMAIN_NAME + '/api';

const getpatientdetails = (patientid) => {
    return axios({
      method: "get",
      url: APIEndpoint+`/patient/get-patient/${patientid}`,
      headers: {Authorization: `Bearer ${token.getAccessToken()}`},
      
    });
  };

  const getpatienttestdetails = (testrecordid) => {
    return axios({
      method: "get",
      url: APIEndpoint+`/test/test-record/${testrecordid}`,
      headers: {Authorization: `Bearer ${token.getAccessToken()}`},
      
    });
  };


const dotest =(data)=>{
    return axios({
        method: "post",
        url: APIEndpoint + '/test/do-test',
        data: {
          patient_id: data.patient_id,
          test_type: data.test_type,
          base64_img: 'ewrw',
        },
        
      });


}

const gettesttypes =()=>{
  return axios({
    method: "get",
    url: APIEndpoint + '/test/test-types',
    headers: {Authorization: `Bearer ${token.getAccessToken()}`}
  });

}
  

export default{
   getpatientdetails,
   dotest,
   gettesttypes,
   getpatienttestdetails
}