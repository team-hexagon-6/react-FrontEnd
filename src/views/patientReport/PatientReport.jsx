import {useEffect,useState} from 'react';
import HeaderOne from "../../components/headers/HeaderOne";
import "./PatientReport.css";
import 'font-awesome/css/font-awesome.css';
import { Row,Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ExaminerServices from '../../services/API/ExaminerServices';
import { useParams } from 'react-router-dom';



const PatientReport =()=>{

    const [reportdetails,setReportDetails]=useState({
        details:{},
        testrecords:{}
    });
    const params=useParams();
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    useEffect(()=>{
        getPatientDetails();
     },[])

    const getPatientDetails=async()=>{
        try{

            const patientDetails= await ExaminerServices.getpatientdetails(params.patientid);
            const testRecords=await ExaminerServices.getpatienttestrecordsforatest(params.testid);
            setReportDetails({
                ...reportdetails,
                details:patientDetails.data.data,
                testrecords:testRecords.data.test
            })
        }
        catch(err){
            console.log(err);
        }
        
    }
    
    
  return (
    <div>
    <HeaderOne/>
    {console.log(reportdetails.testrecords)}
    <div className='form-container col-xl-5 mx-auto '>
        <h1 className='fs-1 fw-bold mb-0'>Report</h1>
        <Row>
        <Col>
        <div className='Header-One mb-0'>
        <HeaderOne />
        </div>
        </Col>
        <Col>
        <div className='Hospital-details mt-3 '>
        <h4 className='mb-0' style={{'font-size':17}}>MDK Hospital</h4>
        <h5 className='mb-0' style={{'font-size':15}}>99/Horana Road</h5>
        <h5 className='mb-0' style={{'font-size':14}}> 0342251888/034227299</h5>
       
        </div>
        </Col>
        </Row>
        <hr  style={{margin:'1px 3px'}} />
        <h6>   Report- Parkinson Disease Test</h6> 
        <u><h6 className='DetailsSection mb-4'>Patient Details:</h6></u>
         <Form >
         <Form.Group as={Row} className='fa fw-bold col-xl-6 mt-3 mb-3 mx-auto' controlId='0th Row'>
            <Form.Label  sm={4}>Patient ID</Form.Label>
            <Form.Control  type="text"size='sm' value={ reportdetails.details.id} name='First Name'  disabled />
         </Form.Group>
            <Form.Group as={Row} className='fa fw-bold col-xl-10 mt-3 mb-3 mx-auto' controlId='1st Row'>
                
                <Col align='left' sm={6} >
                <Form.Label  sm={4}>First Name</Form.Label>
                <Form.Control  type="text" size='sm' value={reportdetails.details.firstname} name='First Name'  disabled />
                </Col>
                
                
                 <Col align='left' sm={6}>
                <Form.Label sm={4} >Last Name </Form.Label>
                <Form.Control type="text" size='sm' value={reportdetails.details.lastname} name='Last Name'  disabled/>
               
                </Col>
                
            </Form.Group>
            <br />
             <u><h6 className='DetailsSection'>Test Details:</h6></u>


            <Form.Group as={Row} className='fa fw-bold col-xl-6 mt-3 mb-3 mx-auto' controlId='4th Row'>
                <Col align='left' sm={6} >
                <Form.Label  sm={4}>Test ID</Form.Label>
                <Form.Control  type="text"size='sm' value={reportdetails?.testrecords?.id || ''} name='Test ID'  disabled />
                </Col>
                <Col align='left' sm={6}>
                <Form.Label sm={4} >Test Start At</Form.Label>
                <Form.Control type="text" size='sm' value={reportdetails?.testrecords?.created_at || ''} name='Last Name'  disabled/>
               
                </Col>
            </Form.Group>
            {reportdetails?.testrecords?.testrecord?.map((row,index)=>(
            <div>
               <u> <h6 className='DetailsSection'>Test Record: {index+1}</h6></u>
            <Form.Group as={Row} className='fa fw-bold col-xl-10 mt-3 mb-3 mx-auto' controlId='1st Row'>
            <Col align='left' sm={6} >
                <Form.Label  sm={4}>Examiner ID</Form.Label>
                <Form.Control  type="text" size='sm' value={row.examiner.user_id || ''} name='First Name'  disabled />
                </Col>
                
                <Col align='left' sm={6}>
                <Form.Label sm={4} >Examiner Name </Form.Label>
                <Form.Control type="text" size='sm' value={'Examiner Name'} name='Last Name'  disabled/>
                </Col>
                
                
                

                
            </Form.Group>
            <Form.Group as={Row} className='fa fw-bold col-xl-10 mt-3 mb-3 mx-auto' controlId='1st Row'>
                
            <Col align='left' sm={6} >
                <Form.Label  sm={4}>Test Type</Form.Label>
                <Form.Control  type="text" size='sm' value={row.test_type.name || ''} name='First Name'  disabled />
                </Col>
                
                 
                <Col align='left' sm={6} >
                <Form.Label  sm={4}>Test Result</Form.Label>
                <Form.Control  type="text"  size='sm' value={row.test_result.name || ''} name='Test ID'  disabled />
                </Col>
                
            </Form.Group>
            {/* <Form.Group as={Row} className='fa fw-bold col-xl-6 mt-3 mb-3 mx-auto' controlId='4th Row'>
                
            </Form.Group>  */}
            </div>))
            }




            <div className='row'>
                <div className='col mb-3'>
                <hr className='DetailsSection mt-4' style={{margin:'1px'}}></hr>
                    <h6>Signature</h6>
                </div>
                <div className='col '>
            
                    <hr style={{margin:'4px'}} className=' mt-4'></hr>
                    <h6>Checked by</h6>
                </div>
                <div className='col '>
                {date}
                 <hr style={{margin:'4px'}} className=' mt-0'></hr>
                    <h6>Date</h6>
                </div>

            </div>
             



        </Form>
        <div className='b'>
            <Button  type="submit" style={{"borderRadius": "5px","margin":"0px 5px 20px"}} onClick={()=>window.print()} >Print Report</Button>
        </div>

    </div>
    </div>
  )



}

export default PatientReport;