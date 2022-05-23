import React, { Component } from 'react';
import HeaderOne from "../../components/headers/HeaderOne";
import {
  Card,
  Form,
  Button,
  Table,
  FormControl,
  InputGroup,
} from "react-bootstrap";

import './allpatients.css'
export class AllPatient extends Component {
    constructor(props) {
        super(props)
      
        this.state = {
            names : ['11111', '22222', '33333'],
            filter:'',
            patient_id:''
        }
      }

      setfilter = (event)=>{
        this.setState({
          filter : event.target.value
        })
      }
      setPatientId = (event)=>{
        this.setState({
          patient_id : event.target.value
        })
      }
  render() {
    return (
      <div>
    <HeaderOne/>
      
      <div className='out_layouts'>   
      <div class="float-parent-element">
        <div class="float-child-element">
          <div class="fetch">
          <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                aria-describedby="passwordHelpInline"
                value={this.state.filter}
                onChange={this.setfilter}
              />
               <button class="btn btn-outline-secondary" type="button" id="button-addon2">Filter</button>

            </div>
          </div>
        </div>
        <div class="float-child-element">
          <div class="search">
            
          <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                aria-describedby="passwordHelpInline"
                value={this.state.patient_id}
                onChange={this.setPatientId}
              />
               <button class="btn btn-outline-secondary" type="button" id="button-addon2">Show Patient</button>

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
          {this.state.names.map((name) => {
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
}

export default AllPatient