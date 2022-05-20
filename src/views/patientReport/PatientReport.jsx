import React from 'react';
import HeaderOne from "../../components/headers/HeaderOne";
import "./PatientReport.css";
import 'font-awesome/css/font-awesome.css';
import { Row,Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const PatientReport =()=>{

    const formValues={
        'First Name':'',
        'Last Name':'',
        'NIC' :'',
        'Contact Number' :'',
        'Email' :'',
        'Birthday' :''
    }

    const [state,setState]=React.useState(formValues);
    const [errordata,setError]=React.useState(formValues);
    
    const handleUser=(event)=>{
        setState({
            ...state,
            [event.target.name] : event.target.value})
    }

    const errors = {};
    const handleSubmit=async(event)=>{
        const {value,error}=Validation.ValidateUserCompleteRegistration(state)
        event.preventDefault();
        console.log(state);
        if (error) {
            error.details.map(item => {
                errors[item.path[0]] = item.message;
            });    
        } 
        else {
            try {
                const response = await UserServices.AuthUserCompleteRegistration(state);
            } catch (error) {
                console.log(error.message);
            }
        } 
        setError(errors);
    }
  return (
    <div>
    <HeaderOne/>
    <div className='form-container col-xl-5 mx-auto '>
        
        <h1 className='fs-1 fw-bold mb-3'>Report</h1>
        <Row>
        <Col>
        <div className='Header-One'>
        <HeaderOne />
        </div>
        </Col>
        <Col>
        <div className='Hospital-details mt-3 '>
        <h5 className='mb-0'>Hospital Name</h5>
        <h6 className='mb-0'>Hospital Address </h6>
        Contact Details
        </div>
        </Col>
        </Row>
        <hr />
        <h6>   Report- Parkinson Disease Test</h6> 
         <Form onSubmit={handleSubmit} >
            <Form.Group as={Row} className='fa fw-bold col-xl-12 mt-3 mb-2 mx-auto' controlId='First Name'>
                
                <Col sm={6} >
                <Form.Label column sm={4}>First Name</Form.Label>
                <Form.Control  type="text" name='First Name' placeholder='&#xf007; First Name' disabled />
                </Col>
                
                
                 <Col sm={6}>
                <Form.Label column sm={4} >Last Name </Form.Label>
                <Form.Control type="text" name='Last Name' placeholder='&#xf234; Last Name' disabled/>
               
                </Col>
                
            </Form.Group>

            <Form.Group as={Row} className='fa fw-bold col-xl-12 mb-2 mx-auto' controlId='Last Name'>
                
                
            </Form.Group>

            <Form.Group as={Row} className='fa fw-bold col-xl-12 mb-2 mx-auto' controlId='NIC'>
                <Form.Label column sm={4} >NIC</Form.Label>
                <Col sm={6}>
                <Form.Control type="text" name='NIC' placeholder='&#xf2c2; NIC' disabled/>
                {errordata.NIC !== '' && <p className="error">{errordata.NIC}</p>}
                </Col>
                
            </Form.Group>

            <Form.Group as={Row} className='fa fw-bold col-xl-12 mb-2 mx-auto' controlId='Contact Number'>
                <Form.Label column sm={4}>Contact Number</Form.Label>
                <Col sm={6}>
                <Form.Control type="text" name='Contact Number' placeholder='&#xf095; Contact Number' disabled/>
                {errordata['Contact Number'] !== '' && <p className="error">{errordata['Contact Number']}</p>}
                </Col>
                
           </Form.Group>

           <Form.Group as={Row} className='fa fw-bold col-xl-12 mb-2 mx-auto' controlId='Email'>
               <Form.Label column sm={4} >Email</Form.Label>
               <Col sm={6}>
               <Form.Control type="text" name='Email' placeholder='&#xf0e0; Email' disabled/>
               {errordata.Email !== '' && <p className="error">{errordata.Email}</p>}
               </Col>
               
           </Form.Group>

           <Form.Group as={Row} className='fa fw-bold col-xl-12 mb-2 mx-auto' controlId='Birthday'>
               <Form.Label column sm={4} >Birthday</Form.Label>
               <Col sm={6}>
               <Form.Control type="date" name='Birthday' placeholder='&#xf1fd; Birthday' disabled/>
               {errordata.Birthday !== '' && <p className="error">{errordata.Birthday}</p>}
               </Col>
              
           </Form.Group>
           
        </Form>
        <div className='b'>
            <Button  type="submit" style={{"border-radius": "5px","margin":"0px 5px 20px"}} >Print Report</Button>
        </div>

    </div>
    </div>
  )



}

export default PatientReport;