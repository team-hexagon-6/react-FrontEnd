import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./UserCompeleteRegistration.css";
import 'font-awesome/css/font-awesome.css';
import { Row,Col } from 'react-bootstrap';
import HeaderOne from "../../components/headers/HeaderOne";




const {UserCompleteRegistrationValidationSchema } = require('./UserCompeleteRegistrationValidation');

export default function UserCompeleteRegistration() {
    
    const formValues={
        firstname:'',
        lastname:'',
        nic :'',
        contact_no :'',
        email :'',
        birthday :''
    }
    
    const [state,setState]=React.useState(formValues);
    
    const handleUser=(event)=>{
        setState({
            ...state,
            [event.target.name] : event.target.value})
    }
    
    const handleSubmit=async(event)=>{
        // try{
        // const result = await authSchema.validateAsync(formValues);
        const {value,error}=UserCompleteRegistrationValidationSchema.validate(state,{abortEarly: false});
        console.log(value);
        console.error(error);
        // console.log(result);
        // }
        event.preventDefault();    
    }
  return (
    <div>
    <HeaderOne/>
    <div className='form-container col-xl-5 mt-5 pt-5 mx-auto border border-2 '>
        
        <h1 className='fs-1 text-primary mb-5'>Complete Registration</h1>
         <Form onSubmit={handleSubmit} >
            <Form.Group as={Row} className='fa fw-bold col-xl-12 mb-4 mx-auto' controlId='First Name'>
                <Form.Label column sm={4}>First Name</Form.Label>
                <Col sm={6} >
                <Form.Control  type="text" name='firstname' placeholder='&#xf007; First Name' onChange={handleUser} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className='fa fw-bold col-xl-12 mb-4 mx-auto' controlId='Last Name'>
                 <Form.Label column sm={4} >Last Name </Form.Label>
                 <Col sm={6}>
                <Form.Control type="text" name='lastname' placeholder='&#xf234; Last Name' onChange={handleUser}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className='fa fw-bold col-xl-12 mb-4 mx-auto' controlId='NIC'>
                <Form.Label column sm={4} >NIC</Form.Label>
                <Col sm={6}>
                <Form.Control type="text" name='nic' placeholder='&#xf2c2; NIC' onChange={handleUser}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className='fa fw-bold col-xl-12 mb-4 mx-auto' controlId='Contact Number'>
                <Form.Label column sm={4}>Contact Number</Form.Label>
                <Col sm={6}>
                <Form.Control type="text" name='contact_no' placeholder='&#xf095; Contact Number' onChange={handleUser}/>
                </Col>
           </Form.Group>

           <Form.Group as={Row} className='fa fw-bold col-xl-12 mb-4 mx-auto' controlId='Email'>
               <Form.Label column sm={4} >Email</Form.Label>
               <Col sm={6}>
               <Form.Control type="text" name='email' placeholder='&#xf0e0; Email' onChange={handleUser}/>
               </Col>
           </Form.Group>

           <Form.Group as={Row} className='fa fw-bold col-xl-12 mb-4 mx-auto' controlId='Birthday'>
               <Form.Label column sm={4} >Birthday</Form.Label>
               <Col sm={6}>
               <Form.Control type="date" name='birthday' placeholder='&#xf1fd; Birthday' onChange={handleUser}/>
               </Col>
           </Form.Group>
           <Button className='button btn btn-primary' size="lg" block="block" type="submit">Register</Button>
        </Form>
        
    </div>
    </div>
  )
}
