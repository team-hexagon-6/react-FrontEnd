import HeaderOne from "../../components/headers/HeaderOne";
import React, { useEffect, useState } from 'react';
import "./TestDetails.css";
import 'font-awesome/css/font-awesome.css';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ExaminerServices from '../../services/API/ExaminerServices';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from "../../components/loader/Loader";




const TestDetails = () => {

    const [reportdetails, setReportDetails] = useState({
        details: {},
        testdetails: []
    });
    let navigate = useNavigate();
    const params = useParams();

    const [loader, setLoader] = useState(false);

    // var today = new Date();
    // var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var response = {};
    const handleButton = async () => {
        setLoader(true);
        try {
            response = await ExaminerServices.createtest(params.patientid);
            // console.log(response);
            // const temp=[...storedbuttons]
            // temp.push(threebuttons())
            // setstoredbuttons(temp);
            // }
            getPatientDetails();
        }
        catch (err) {
            console.log(err);
        }
        setTimeout(() => {
            setLoader(false);
        }, 200);
    }

    const handleButtonTestRecords = async (event) => {
        navigate(`/testRecords/${event.currentTarget.getAttribute("data-id")}`)

    }

    const handleStartTest = () => {
        navigate(`/newTest/${params.patientid}`)

    }
    const handleActive = async (event) => {
        setLoader(true);
        try {
            console.log(event)
            const respone = await ExaminerServices.confirmtest(event.currentTarget.getAttribute("data-id"), params.patientid);
            getPatientDetails();
        }
        catch (err) {
            console.log(err);
        }
        setTimeout(() => {
            setLoader(false);
        }, 200);
    }

    useEffect(() => {
        getPatientDetails();
    }, [])

    const getPatientDetails = async () => {
        setLoader(true);
        try {

            const patientDetails = await ExaminerServices.getpatientdetails(params.patientid);
            const patienttestDetails = await ExaminerServices.getpatienttestdetails(0, 10, params.patientid);
            console.log(patienttestDetails);
            setReportDetails({
                ...reportdetails,
                details: patientDetails.data.data,
                testdetails: patienttestDetails.data.tests
            })
        }
        catch (err) {
            console.log(err);
        }
        setTimeout(() => {
            setLoader(false);
        }, 200);
    }
    // const threebuttons=()=>{
    //     return (
    //         <div>
    //             {response.data.test_id}
    //             <div className="btn-group" role="group" aria-label="Basic example">
    //             <button type="button" className="btn btn-secondary" onClick={handleButtonTestRecords}>Test Records</button>
    //             <button type="button" className="btn btn-secondary" onClick={handleStartTest} disabled={disable}>Start Test</button>
    //             <button type="button" className="btn btn-secondary" onClick={handleActive} disabled={disable} >{disable? 'DeActivated':'DeActive'}</button>
    //             </div> <br/>
    //         </div>

    //     );
    // }

    if (loader) {
        return <Loader />
    } else {

        return (
            <div>
                <HeaderOne />
                <div className='form-container col-xl-6 mx-auto '>
                    <h1 className='fs-1 fw-bold mb-0'>Start Test</h1>

                    <hr style={{ margin: '1px 3px' }} />

                    <Form >
                        <Form.Group as={Row} className='fa fw-bold col-xl-6 mt-3 mb-3 mx-auto' controlId='0th Row'>
                            <Form.Label sm={4}>Patient ID</Form.Label>
                            <Form.Control type="text" value={reportdetails.details.id} name='First Name' disabled />
                        </Form.Group>
                        <Form.Group as={Row} className='fa fw-bold col-xl-10 mt-3 mb-3 mx-auto' controlId='1st Row'>

                            <Col align='left' sm={6} >
                                <Form.Label sm={4}>First Name</Form.Label>
                                <Form.Control type="text" size='sm' value={reportdetails.details.firstname} name='First Name' disabled />
                            </Col>


                            <Col align='left' sm={6}>
                                <Form.Label sm={4} >Last Name </Form.Label>
                                <Form.Control type="text" size='sm' value={reportdetails.details.lastname} name='Last Name' disabled />

                            </Col>

                        </Form.Group>

                    </Form>
                    <div className='b'>
                        <Button type="submit" style={{ borderRadius: "20px", margin: "0px 5px 20px" }} onClick={handleButton} >Create New Test</Button>
                    </div>
                    {console.log(reportdetails.testdetails)}

                    {/* {storedbuttons.map((row, index)=> row.props.children)} */}
                    {reportdetails.testdetails.map((row, index) => (
                        <div>
                            <div className="test_ids" style={{margin: "10px"}}>
                                {row.id}

                                <div className="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" className="opt_btn btn btn-secondary" onClick={handleButtonTestRecords} data-id={row.id}>Test Records</button>
                                    <button type="button" className="opt_btn btn btn-secondary" onClick={handleStartTest} disabled={row.confirmed} >Start Test</button>
                                    <button type="button" className="opt_btn btn btn-secondary" onClick={handleActive} disabled={row.confirmed} data-id={row.id} >{row.confirmed ? 'DeActivated' : 'DeActive'}</button>
                                </div>

                            </div>
                        </div>

                    ))
                    }





                </div>
            </div>
        )

    }

}


export default TestDetails;

