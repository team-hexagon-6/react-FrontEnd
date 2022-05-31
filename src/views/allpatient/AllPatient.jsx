import React, { Component } from 'react';
import { useNavigate, Link } from "react-router-dom";
import HeaderTwo from "../../components/headers/HeaderTwo";
import Paginate from "../../components/pagination/paginate";
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
import Loader from '../../components/loader/Loader';
import Token from '../../services/Token'
import jwtDecode from "jwt-decode";

const AllPatient = () => {
  // const [names, setnames] = useState(['Bruce', 'Clark', 'Diana', 'Bruce1', 'Clark1', 'Diana1', 'Bruce2', 'Clark2', 'Diana2']);
  const [filter, setfilter] = useState("");
  const [patient_id, setPatientId] = useState("");
  //For Pagination
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(8);
  const [totalItems, setTotalItems] = useState(0);
  const ROLES = {
    'Examiner': '_32247',
    'Doctor': '_32446',
    'Admin': '_32345'
  }


  const changePage = async (skip) => {
    console.log(skip);
    // setSkip(skip_value);
    getPatients(skip, take);
  }




  const [loader, setLoader] = useState(false);

  const [all_ids, setAllPatient] = useState([]);

  const navigate = useNavigate();
  const navigateMe = () => {
    // console.log("delete user fn");
    if (patient_id) {
      navigate(`/test-details/${patient_id}`);
    } else {
      window.alert(`Please insert patient id`);
    }

  };
  try {
    var user = jwtDecode(Token.getAccessToken())
  }
  catch (err) {
    user = null
  }
  const filterpatient = async (filter) => {
    setLoader(true);
    let response = null;
    try {
      response = await ExaminerServices.getpatientdetails(filter);
      console.log(response.data.data);
      setAllPatient([response.data.data]);
      console.log("All patient details", all_ids);
      setfilter('');
    } catch (error) {
      if (response == null) {setAllPatient([])};
      console.log();
    }
    setTimeout(() => {
      setLoader(false);
    }, 200);
  };

  useEffect(() => {
    getPatients(skip, take);
  }, []);

  const getPatients = async (skip_value, take) => {
    setLoader(true);
    console.log(take);
    try {
      const response = await ExaminerServices.getPatients(skip_value, take);
      console.log(response.data.data);
      console.log(response.data.total_items);
      setAllPatient(response.data.data);
      setTotalItems(response.data.total_items);
      setSkip(skip_value);
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      setLoader(false);
    }, 200);


  };

  if (loader) {
    return <Loader />;
  } else {
    return (
      <div>
        <HeaderTwo />
        <div className='out_layouts'>
          <div className="float-parent-element">
            <div className="float-child-element">
              <div className="fetch">
                <div className="input-group mb-3">
                  <input
                    placeholder="Filter Patient"
                    type="text"
                    className="form-control"
                    aria-describedby="passwordHelpInline"
                    value={filter}
                    onChange={(event) => {
                      setfilter(event.target.value);
                    }}
                    style={{ borderRadius: "20px 0 0 20px" }}
                  />
                  <button
                    onClick={() => filterpatient(filter)}
                    className="btn btn-outline-primary"
                    style={{ borderRadius: "0 20px 20px 0" }}
                    type="button"
                    id="button-addon2"
                  >
                    Filter Patient
                  </button>
                </div>
              </div>
            </div>
            <div className="float-child-element">
              <div className="search">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    placeholder="Patient ID"
                    className="form-control"
                    aria-describedby="passwordHelpInline"
                    value={patient_id}
                    onChange={(event) => {
                      setPatientId(event.target.value);
                    }}
                    style={{ borderRadius: "20px 0 0 20px" }}
                  />
                  <button
                    onClick={() => navigateMe(patient_id)}
                    className="btn btn-outline-primary"
                    style={{ borderRadius: "0 20px 20px 0" }}
                    type="button"
                    id="button-addon2"
                  >
                    Search Patient
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="user_display">
            {all_ids.length === 0 &&
              <div><h5 style={{ color: "black", textAlign: "center", margin: "10px" }}>No patients to display</h5>
                <div className="image">
                  <img src="../../public/404.png" alt="" />
                </div>
              </div>}
            {all_ids.length !== 0 &&
              <Table hover style={{ color: "#1376BD", width: "100%" }}>
                <thead>
                  <tr>
                    <th>Patient ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
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
                  {all_ids
                    // .filter((name) => {
                    //   if (filter == "") {
                    //     return name;
                    //   } else if (
                    //     (name.id+name.firstname + name.lastname)
                    //       .toLocaleLowerCase()
                    //       .includes(filter.toLocaleLowerCase())
                    //   ) {
                    //     return name;
                    //   }
                    // })
                    .map((name) => {
                      // Tables should come here

                      return (
                        <tr key={name}>
                          <td>{name.id}</td>
                          <td>{name.firstname}</td>
                          <td>{name.lastname}</td>
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
                              // data-id={name.patient_id}
                              onClick={() => {
                                navigate(`/test-details/${name.id}`);
                              }}
                            >
                              View
                            </Button>
                          </td>

                          {user.role == ROLES.Examiner ?
                            <>

                              <td>

                                <Button
                                  className="btn-primary"
                                  style={{ borderRadius: "20px" }}
                                  // data-id={name.patient_id}
                                  onClick={() => {
                                    navigate(`/test-details/${name.id}`);
                                  }}
                                >
                                  Do Test
                                </Button>
                              </td>

                              <td>
                                <Link
                                  to={"/update-patient-profile"}
                                  state={{ patient_id: name.id }}
                                >
                                  <Button
                                    className="btn-primary"
                                    style={{ borderRadius: "20px" }}
                                  // data-id={name.patient_id}
                                  // onClick={()=>{navigate(`/testDetails/${name.id}`)}}
                                  >
                                    Update
                                  </Button>
                                </Link>
                              </td>
                            </>
                            : ''
                          }

                        </tr>
                      );
                    })}
                </tbody>
              </Table>}
          </div>
          <div className="container paginate_div text-center">
            <Paginate
              skip={skip}
              take={take}
              setSkip={changePage}
              totalItems={totalItems}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default AllPatient;
