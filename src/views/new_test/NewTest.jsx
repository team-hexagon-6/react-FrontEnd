import { useState } from "react";
import { Button, ButtonGroup, Card, Form, ToggleButton } from "react-bootstrap";
import HeaderOne from "../../components/headers/HeaderOne";
import "./NewTest.css"
import Validation from '../../Validation';

const NewTest = () => {

    const [checked, setChecked] = useState(false);

    const [patient_id, setPatientID] = useState('');
    const [test_type, setTestType] = useState('');
    const [date, setDate] = useState('');
    const [base64_img, setBase64Img] = useState('');


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
            window.alert(`Please confirm test delails\n\nPatient ID: ${patient_id}\nTest type: ${test_type}\nDate: ${date}\n\n\Click OK to start the test.`);
        }
    }

    return (
        <div className="new_test">

            <HeaderOne />
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
                                    onChange={(e) => setPatientID(e.target.value)}
                                />
                                {id_err != '' && <p className="error">{id_err}</p>}
                            </Form.Group>
                        </div>
                        <div className="col-md-6">
                            <Form.Group className="mb-3">
                                <Form.Label>Type of The Test</Form.Label>
                                <div className="col-md-3">
                                    <ButtonGroup className="mb-12">
                                        {radios.map((radio, idx) => (
                                            <ToggleButton
                                                key={idx}
                                                id={`radio-${idx}`}
                                                type="radio"
                                                variant={idx % 2 ? 'outline-primary' : 'outline-primary'}
                                                name="radio"
                                                value={radio.value}
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
                                    <div className="preview" id="imagePreview"><img src="../../public/No_Preview.png" alt=""/></div>
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
}

export default NewTest;