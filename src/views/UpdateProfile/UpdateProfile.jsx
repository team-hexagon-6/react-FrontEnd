import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./UpdateProfile.css";
import 'font-awesome/css/font-awesome.css';
import { Row, Col } from 'react-bootstrap';
import HeaderOne from "../../components/headers/HeaderOne";
import UserServices from '../../services/API/UserServices';
import Validation from '../../Validation';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Dashboard from './../dashboard/Dashboard';
import Loader from '../../components/loader/Loader';

const UpdateProfile = () => {

    const navigate = useNavigate();

    const [loader, setLoader] = useState(flase);

    const formValues = {
        'First Name': '',
        'Last Name': '',
        'NIC': '',
        'Contact Number': '',
        'Email': '',
        'Birthday': ''
    }

    var [state, setState] = useState(formValues);
    const [errordata, setError] = useState(formValues);
    const [user, setUser] = useState([])

    const handleUser = (event) => {
        console.log(event.target.value);
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    const errors = {};

    useEffect(() => {
        getUser();
    }, [])

    const getUser = async () => {
        setLoader(true);
        try {
            const getuser = await UserServices.getUser();
            //  setUser( getuser.data.data);
            state = {
                'First Name': getuser.data.data.firstname,
                'Last Name': getuser.data.data.lastname,
                'NIC': getuser.data.data.nic,
                'Contact Number': getuser.data.data.contact_no,
                'Email': getuser.data.data.email,
                'Birthday': getuser.data.data.birthday.split('T')[0]
            }
            setState(state)

            //  console.log(getuser);


        }
        catch (err) {
            // console.log(err);

        }
        setTimeout(() => {
            setLoader(false);
        }, 200);
    }
    const handleSubmit = async (event) => {
        setLoader(true);
        console.log(state);
        const { value, error } = Validation.validateupdateprofile(state)
        event.preventDefault();
        if (error) {
            error.details.map(item => {
                errors[item.path[0]] = item.message;
            });
        }
        else {
            try {
                const response = await UserServices.updateprofile(state);
                navigate('/dashboard')
                console.log(response)
            } catch (error) {
                console.log(error.message);
            }
        }
        setError(errors);
        setTimeout(() => {
            setLoader(false);
        }, 200);
    }

    if (loader) {
        return <Loader />
    } else {

        return (
            <div>
                <HeaderOne />
                <div className='form-container col-xl-5 mt-2 pt-5 mx-auto ' style={{ background: 'none' }}>
                    <h1 className='fs-1 text-primary mb-5'>{state['First Name'] ? 'Update Profile' : 'Create Profile'}</h1>
                    <Form onSubmit={handleSubmit} >
                        <Form.Group as={Row} className='fa fw-bold col-xl-12 mb-2 mx-auto' controlId='First Name'>
                            <Form.Label className='fa' column sm={4}>First Name</Form.Label>
                            <Col sm={6} >
                                <Form.Control className='fa' type="text" value={state['First Name']} name='First Name' placeholder='&#xf007; First Name' onChange={handleUser} />
                                {errordata['First Name'] !== '' && <p className="error">{errordata['First Name']}</p>}
                            </Col>

                        </Form.Group>

                        <Form.Group as={Row} className='fa fw-bold col-xl-12 mb-2 mx-auto' controlId='Last Name'>
                            <Form.Label className='fa' column sm={4} >Last Name </Form.Label>
                            <Col sm={6}>
                                <Form.Control className='fa' type="text" value={state['Last Name']} name='Last Name' placeholder='&#xf234; Last Name' onChange={handleUser} />
                                {errordata['Last Name'] !== '' && <p className="error">{errordata['Last Name']}</p>}
                            </Col>

                        </Form.Group>

                        <Form.Group as={Row} className='fa fw-bold col-xl-12 mb-2 mx-auto' controlId='NIC'>
                            <Form.Label className='fa' column sm={4} >NIC</Form.Label>
                            <Col sm={6}>
                                <Form.Control className='fa' type="text" value={state['NIC']} name='NIC' placeholder='&#xf2c2; NIC' onChange={handleUser} />
                                {errordata.NIC !== '' && <p className="error">{errordata.NIC}</p>}
                            </Col>

                        </Form.Group>

                        <Form.Group as={Row} className='fa fw-bold col-xl-12 mb-2 mx-auto' controlId='Contact Number'>
                            <Form.Label className='fa' column sm={4}>Contact Number</Form.Label>
                            <Col sm={6}>
                                <Form.Control className='fa' type="text" value={state['Contact Number']} name='Contact Number' placeholder='&#xf095; Contact Number' onChange={handleUser} />
                                {errordata['Contact Number'] !== '' && <p className="error">{errordata['Contact Number']}</p>}
                            </Col>

                        </Form.Group>

                        <Form.Group as={Row} className='fa fw-bold col-xl-12 mb-2 mx-auto' controlId='Email'>
                            <Form.Label className='fa' column sm={4} >Email</Form.Label>
                            <Col sm={6}>
                                <Form.Control className='fa' type="text" value={state['Email']} name='Email' placeholder='&#xf0e0; Email' onChange={handleUser} />
                                {errordata.Email !== '' && <p className="error">{errordata.Email}</p>}
                            </Col>

                        </Form.Group>

                        <Form.Group as={Row} className='fa fw-bold col-xl-12 mb-2 mx-auto' controlId='Birthday'>
                            <Form.Label className='fa' column sm={4} >Birthday</Form.Label>
                            <Col sm={6}>
                                <Form.Control className='fa' type="date" value={state['Birthday']} name='Birthday' placeholder='&#xf1fd; Birthday' onChange={handleUser} />
                                {errordata.Birthday !== '' && <p className="error">{errordata.Birthday}</p>}
                            </Col>

                        </Form.Group>
                        <Button className='btn btn-primary button' size="lg" block="block" type="submit">Update</Button>
                    </Form>

                </div>
            </div>
        )

    }
}


export default UpdateProfile;