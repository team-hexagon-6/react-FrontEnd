import { useState, useEffect } from "react";
import { Button, ButtonGroup, Card, Form, ToggleButton } from "react-bootstrap";
import HeaderTwo from "../../components/headers/HeaderTwo";
import "./NewTest.css";
import Validation from "../../Validation";
import ExaminerServices from "../../services/API/ExaminerServices";
import _503 from "../not_found/_503";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { confirm } from "react-confirm-box"

import Messages from "../../helpers/Messages";

const NewTest = () => {
  const [checked, setChecked] = useState(false);

  const [patient_id, setPatientID] = useState("");
  const [testtype, setTestType] = useState({});
  const [date, setDate] = useState("");
  const [base64_img, setBase64Img] = useState("");
  const [testTypes, setTestTypes] = useState([]);
  const params = useParams();

//   console.log(params);
  const location = useLocation();
  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);

  const [id_err, setIdErr] = useState("");
  const [type_err, setTypeErr] = useState("");
  const [img_err, setImgErr] = useState("");
  const [date_err, setDateErr] = useState("");

  // const radios = [
  //     { name: 'Spiral', value: 'spiral' },
  //     { name: 'Wave', value: 'wave' },
  // ];

  // Validate uploaded image file
  const fileValidation = () => {
    var fileInput = document.getElementById("file");
    if (Validation.imageValidation(fileInput)) {
      // Image preview
      if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          document.getElementById("imagePreview").innerHTML =
            '<img src="' + e.target.result + '"/>';

          setBase64Img(reader.result.replace("data:", "").replace(/^.+,/, ""));
        };

        reader.readAsDataURL(fileInput.files[0]);
      }
    }
  };

  const handleSelect = (event) => {
    // console.log(event)
    // console.log("event is", event.split(",")[0]);
    // console.log('helllo',event)
    // console.log(event[0]);
    // console.log(event[1]);
    setTestType({
      name: event[0],
      value: event[1],
    });
    // console.log('ererere',testtype)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIdErr("");
    setTypeErr("");
    setDateErr("");

    const testtypevalue = testtype.value;
    // console.log("valuefdsafasfa", testtypevalue);
    // console.log('type',testtypevalue)
    const { value, error } = Validation.new_test({
      patient_id,
      test_type: testtypevalue,
    });
    //  console.log('valuefdsafasfa',testtypevalue)

    if (error || !document.getElementById("file").value) {
      
      if (error) {
        const errors = {};
        error.details.map((item) => {
          errors[item.path[0]] = item.message;
        });
        if (errors.patient_id)
          setIdErr(errors.patient_id.replace('"patient_id"', "Patient ID"));
        if (errors.test_type)
          setTypeErr(errors.test_type.replace('"test_type"', "Test type"));
      }
      if (!document.getElementById("file").value) {
        setImgErr("Test image sample is required");
      }
      else{
        setImgErr("");

      }
      // if (errors.date)
      //     setDateErr(errors.date.replace('"date"', 'Date'));
    } else {
    setTypeErr('')
    setImgErr('')
    const options={
        labels:{
            confirmable:"Confirm",
            cancellable:"Cancel"
        }
    }
    const result=await confirm(`Please confirm test details\n\n\n\n\tPatient ID: ${patient_id}   Test type: ${testtype.name}\n\n\Click OK to start the test.`,options);
        if(result){
            setLoader(true);
            try {
                const test_id = location.state.test_id;
                const formData = new FormData();
                formData.append("patient_id", patient_id);
                formData.append("test_id", test_id);
                formData.append("image_string", base64_img);
                formData.append("test_type", testtypevalue);
                const response = await ExaminerServices.dotest(formData);
                if (response.status === 200) {
                Messages.SuccessMessage("Test was conducted successfully");
                setTimeout(() => {
                    setLoader(false);
                }, 200);
                navigate(`/test-records/${test_id}`);
                }
            } catch (error) {
                // console.log(error);
                Messages.ErrorMessage({
                error: error,
                custom_message: `Test Failed`,
                });
                setLoader(false)
                // navigate(0);
            }
        }
    }
  };

  useEffect(() => {
    getTestTypes();
  }, []);

  const getTestTypes = async () => {
    try {
      const testType = await ExaminerServices.gettesttypes();
      // console.log(testType.data.testTypes);
      setTestTypes(testType.data.testTypes);
      setPatientID(location.state.patient_id);
    } catch (err) {
    //   console.log(err);
    }
  };

  if (loader) {
    return <Loader />;
  } else {
    if (testTypes) {
      return (
        <div className="new_test">
          <HeaderTwo />
          <h1 className="test_header">New Test</h1>

          <div className="container test_form justify-content-center">
            <Form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-2">
                  <Form.Group className="mb-3">
                    <Form.Label>Patient ID</Form.Label>
                    <Form.Control
                      className="fa"
                      style={{ borderRadius: "20px" }}
                      placeholder="&#xf2c2; Patient id"
                      value={patient_id}
                      // onChange={(e) => setPatientID(e.target.value)}
                      disabled
                    />
                    {id_err != "" && <p className="error">{id_err}</p>}
                  </Form.Group>
                </div>

                <div className="col-md-6">
                  <Form.Group>
                    <Form.Label>Type of The Test</Form.Label>

                    <div className="col-md-3">
                      <ButtonGroup className="mb-12">
                        {/* {console.log('testTypes',testTypes)} */}
                        {testTypes?.map((radio, idx) => (
                          <ToggleButton
                            key={idx}
                            id={`radio-${idx}`}
                            type="radio"
                            variant={
                              idx % 2 ? "outline-primary" : "outline-primary"
                            }
                            name="radio"
                            // value={radio.slug}
                            checked={testtype.value === radio.slug}
                            onChange={() =>
                              handleSelect([radio.name, radio.slug])
                            }
                          >
                            {radio.name}
                          </ToggleButton>
                        ))}
                      </ButtonGroup>
                    </div>

                    {type_err != "" && <p className="error">{type_err}</p>}
                  </Form.Group>
                </div>
              </div>

              <div className="row upload">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <br />
                    <p style={{ textAlign: "center" }}>
                      Upload test image sample of the patient here
                    </p>

                    <div className="container upload_preview">
                      <Form.Control
                        type="file"
                        id="file"
                        onChange={fileValidation}
                      />
                      {img_err != "" && <p className="error">{img_err}</p>}
                      <div className="preview" id="imagePreview">
                        <img
                          src="https://i.ibb.co/Q68tPz8/No-Preview.png"
                          alt=""
                        />
                      </div>
                    </div>
                  </Form.Group>
                </div>
                <div className="col-md-3"></div>
              </div>

              <div className=" container row bottom_div justify-content-center">
                {/* <div className="col-md-6">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control
                                        style={{ borderRadius: "20px", width: "50%" }}
                                        type="date" name='date'
                                        placeholder='&#xf1fd; Date'
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                    {date_err != '' && <p className="error">{date_err}</p>}
                                </div> */}
                <div className="col-md-6"></div>
                <div className="col-md-6">
                  <br />
                  <Button
                    type="submit"
                    className="test_button"
                    style={{ borderRadius: "20px" }}
                  >
                    Do Test
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <_503 />
        </div>
      );
    }
  }
};

export default NewTest;
