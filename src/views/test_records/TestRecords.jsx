import HeaderTwo from "../../components/headers/HeaderTwo";
import React, { useEffect, useState } from 'react';
import "./TestRecords.css";
import 'font-awesome/css/font-awesome.css';
import { Row, Col, Accordion } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ExaminerServices from '../../services/API/ExaminerServices';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from "../../components/loader/Loader";
import NotFound from "../not_found/NotFound";


const TestRecords = () => {
    const [testrecords, settestrecords] = useState([])
    let navigate = useNavigate();

    const [loader, setLoader] = useState(false);

    const params = useParams();

    const handleButton = async () => {


    }

    useEffect(() => {
        getPatientRecords();
    }, [])

    const getPatientRecords = async () => {
        setLoader(true);
        try {
            const testRecords = await ExaminerServices.getpatienttestrecordsforatest(params.testid);
            //  console.log(testRecords.data.test);
            settestrecords(
                testRecords.data.test
            )
        }
        catch (err) {
            // console.log(err);
        }
        setTimeout(() => {
            setLoader(false);
        }, 200);
    }

    if (loader) {
        return <Loader />
    } else {

        if (testrecords?.testrecord?.length != 0) {
            return (
                <div>
                    <HeaderTwo />
                    <div className='form-container col-xl-6 mx-auto '>
                        <h1 className='fs-1 fw-bold mb-0'>Test Records</h1>

                        <hr style={{ margin: '1px 3px' }} />
                        <Form >
                            <Form.Group as={Row} className='fa fw-bold col-xl-6 mt-3 mb-3 mx-auto' controlId='0th Row'>
                                <Form.Label sm={4}>Test ID</Form.Label>
                                <Form.Control type="text" value={params.testid} name='First Name' disabled />
                            </Form.Group>
                            {testrecords?.testrecord?.map((row, index) => (
                                <div key={index}>
                                    <Accordion defaultActiveKey="0">
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>Test Record {index + 1} {row.examiner.firstname} {row.examiner.user_id}</Accordion.Header>
                                            <Accordion.Body>
                                                Test Type: {row.test_type.name} <br />
                                                Test Result: {row.test_result.name}
                                            </Accordion.Body>
                                        </Accordion.Item>

                                    </Accordion>
                                </div>
                            ))}

                        </Form>
                        <div className='b'>
                            <Button type="submit" style={{ "borderRadius": "5px", "margin": "0px 5px 20px" }} onClick={() => navigate(`/patient-report/${testrecords.patient_id}/${params.testid}`)} >See Report</Button>
                        </div>
                    </div>
                </div>
            )

        }
        else {
            return (
                <div>
                    <NotFound content="NoRecords"/>
                </div>
            );
        }
    }
}

export default TestRecords;

