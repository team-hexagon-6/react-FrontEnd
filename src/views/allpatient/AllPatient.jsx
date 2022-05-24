import React, { Component } from 'react';
import { useNavigate } from "react-router-dom";
import HeaderOne from "../../components/headers/HeaderOne";
import { useEffect, useState } from "react"; 
import {
  Card,
  Form,
  Button,
  Table,
  FormControl,
  InputGroup,
} from "react-bootstrap";

import './allpatients.css'
import ExaminerServices from '../../services/API/ExaminerServices';

const AllPatient =  () => {

  const [names,setnames] = useState(['Bruce', 'Clark', 'Diana','Bruce1', 'Clark1', 'Diana1','Bruce2', 'Clark2', 'Diana2']);
  const [filter, setfilter] = useState('');
  const [patient_id, setPatientId] = useState('');
  const [all_ids, setAllPatient] = useState([]);

    const navigate = useNavigate();
    const navigateMe = () => {
      // console.log("delete user fn");
      navigate(`/doctor`);
    };


    useEffect(() => {
      getPatients();
    }, []);
  
    const getPatients = async () => {
      try {
          const response = await ExaminerServices.getPatients();
          setAllPatient(response.data);

      } catch (error) {
        console.log(error);
      }
    };

    return (
      <div>
    <HeaderOne/>
      <div className='out_layouts'>   
      <div className="float-parent-element">
        <div className="float-child-element">
          <div className="fetch">
          <div className="input-group mb-3">
              <input
              placeholder='Search Patient ID'
                type="text"
                className="form-control"
                aria-describedby="passwordHelpInline"
                value={filter}
                onChange={(event)=>{setfilter(event.target.value)}}
              />
               

            </div>
          </div>
        </div>
        <div className="float-child-element">
          <div className="search">
            
          <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                aria-describedby="passwordHelpInline"
                value={patient_id}
                onChange={(event)=>{setPatientId(event.target.value)}}
              />
               <button onClick={()=>{navigateMe()}} className="btn btn-outline-secondary" type="button" id="button-addon2">Show Patient</button>

            </div>
            </div>
        </div>
    </div>     
          <div className="user_display">
      <Table style={{ color: "#1376BD" }}>
        <thead>
          <tr>
            <th>Patient ID</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody style={{ color: "black" }}>
          {/* sample database result object to html convert with search enabled */}
          {names.filter((name)=>{
            if(filter == ''){
              return name;
            }else if(name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())){
              return name;
            }
          }).map((name) => {
              // Tables should come here

              return (
                <tr key={name}>
                  <td>{name}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                  <Button
                      className="btn-primary"
                      style={{ borderRadius: "20px" }}
                    >
                      View
                    </Button>
                  </td>
                  <td> 
                    <Button
                      className="btn-primary"
                      style={{ borderRadius: "20px" }}
                    >
                      Do Test
                    </Button></td>
                  <td>
                    <Button
                      className="btn-primary"
                      style={{ borderRadius: "20px" }}
                    >
                      Update
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
    </div>
    </div>
    )
  }


export default AllPatient;