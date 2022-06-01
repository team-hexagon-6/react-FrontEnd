import { useState, useEffect } from "react";
import { Button, ButtonGroup, Card, Form, ToggleButton } from "react-bootstrap";
import HeaderTwo from "../../components/headers/HeaderTwo";
import "./NewTest.css"
import Validation from '../../Validation';
import ExaminerServices from "../../services/API/ExaminerServices";
import _503 from "../not_found/_503";
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Loader from "../../components/loader/Loader";

import Messages from "../../helpers/Messages";


const NewTest = () => {

    const [checked, setChecked] = useState(false);

    const [patient_id, setPatientID] = useState('');
    const [test_type, setTestType] = useState('');
    const [date, setDate] = useState('');
    const [base64_img, setBase64Img] = useState('');
    const [testTypes, setTestTypes] = useState([]);
    const params = useParams();
    console.log(params);

    const [loader, setLoader] = useState(false);

    const [id_err, setIdErr] = useState('');
    const [type_err, setTypeErr] = useState('');
    const [img_err, setImgErr] = useState('');
    const [date_err, setDateErr] = useState('');

    const radios = [
        { name: 'Spiral', value: 'spiral' },
        { name: 'Wave', value: 'wave' },
    ];

    // Validate uploaded image file
    const fileValidation = () => {

        var fileInput = document.getElementById('file');
        if (Validation.imageValidation(fileInput)) {

            // Image preview
            if (fileInput.files && fileInput.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    document.getElementById(
                        'imagePreview').innerHTML =
                        '<img src="' + e.target.result + '"/>';

                    setBase64Img(reader.result.replace("data:", "")
                        .replace(/^.+,/, ""));

                };

                reader.readAsDataURL(fileInput.files[0]);
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIdErr('');
        setTypeErr('');
        setDateErr('');

        if (!document.getElementById('file').value) {
            setImgErr("Test image sample is required")
        }

        const { value, error } = Validation.new_test({ patient_id, test_type, date });

        if (error) {
            const errors = {};
            error.details.map(item => {
                errors[item.path[0]] = item.message;
            });

            if (errors.patient_id)
                setIdErr(errors.patient_id.replace('"patient_id"', 'Patient ID'));
            if (errors.test_type)
                setTypeErr(errors.test_type.replace('"test_type"', 'Test type'));
            if (errors.date)
                setDateErr(errors.date.replace('"date"', 'Date'));
        } else {
            window.alert(`Please confirm test details\n\nPatient ID: ${patient_id}\nTest type: ${test_type}\nDate: ${date}\n\n\Click OK to start the test.`);
            setLoader(true);
            try {
                const response = await ExaminerServices.dotest({ patient_id, test_type, date, base64_img });
                if (response.status === 201) {
                    Messages.SuccessMessage("Start test Successfull'");
                    setTimeout(() => {
                        setLoader(false);
                    }, 200);
                    setTimeout(navigate('/login?registration=successful'), 3000);
                }


            } catch (error) {
                console.log(error);
                Messages.ErrorMessage({
                    error: error,
                    custom_message: `P with ID: ${patient_id} already exists`
                  });
            }


        }
    }

    useEffect(() => {
        getTestTypes();
    }, [])

    const getTestTypes = async () => {
        try {
            const testType = await ExaminerServices.gettesttypes();
            console.log(testType.data.testTypes);
            setTestTypes(testType.data.testTypes);
            setPatientID(params.patientid)

        }
        catch (err) {
            console.log(err);

        }

    }

    if (loader) {
        return <Loader />
    } else {

        if (testTypes) {
            return (

                <div className="new_test">

                    <HeaderTwo />
                    <h1 className="test_header">New Test</h1>

                    <div className="container test_form justify-content-center">
                        <Form onSubmit={handleSubmit}>

                            <div className="row">
                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Patient ID</Form.Label>
                                        <Form.Control
                                            className="fa"
                                            style={{ borderRadius: "20px" }}
                                            placeholder="&#xf2c2; Patient id"
                                            value={patient_id}
                                            // onChange={(e) => setPatientID(e.target.value)}
                                            disabled />
                                        {id_err != '' && <p className="error">{id_err}</p>}
                                    </Form.Group>
                                </div>

                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Type of The Test</Form.Label>

                                        <div className="col-md-3">
                                            <ButtonGroup className="mb-12">
                                                {testTypes.map((radio, idx) => (
                                                    <ToggleButton
                                                        key={idx}
                                                        id={`radio-${idx}`}
                                                        type="radio"
                                                        variant={idx % 2 ? 'outline-primary' : 'outline-primary'}
                                                        name="radio"
                                                        value={radio.slug}
                                                        checked={test_type === radio.value}
                                                        onChange={(e) => setTestType(e.currentTarget.value)}
                                                    >
                                                        {radio.name}
                                                    </ToggleButton>
                                                ))}
                                            </ButtonGroup>
                                        </div>

                                        {type_err != '' && <p className="error">{type_err}</p>}
                                    </Form.Group>

                                </div>
                            </div>

                            <div className="row upload">
                                <div className="col-md-3"></div>
                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <br /><p style={{ textAlign: "center" }}>Upload test image sample of the patient here</p>

                                        <div className="container upload_preview">
                                            <Form.Control type="file" id="file" onChange={fileValidation} />
                                            {img_err != '' && <p className="error">{img_err}</p>}
                                            <div className="preview" id="imagePreview"><img src="https://i.ibb.co/Q68tPz8/No-Preview.png" alt="" /></div>
                                        </div>

                                    </Form.Group>
                                </div>
                                <div className="col-md-3"></div>
                            </div>

                            <div className=" container row bottom_div justify-content-center">
                                <div className="col-md-6">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control
                                        style={{ borderRadius: "20px", width: "50%" }}
                                        type="date" name='date'
                                        placeholder='&#xf1fd; Date'
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                    {date_err != '' && <p className="error">{date_err}</p>}
                                </div>
                                <div className="col-md-6">
                                    <br />
                                    <Button type="submit" className="test_button" style={{ borderRadius: "20px" }}>
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
}

export default NewTest;