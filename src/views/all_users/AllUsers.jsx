import "./AllUsers.css";
import HeaderOne from "../../components/headers/HeaderOne";
import Searchbar from "../../components/Searchbar/Searchbar";
import { Card, Form, Button, Table, FormControl, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AllUsers = () => {

    // When update button is clicked
    const navigate = useNavigate();
    const deleteUser = (user_id) => {
        console.log("delete user fn");
        navigate(`/userCompleteRegistration?user=${user_id}`)
    }

    // Search term
    const [search, setSearch] = useState('');

    const handleSubmit = async (e) => {

    }

    const arr = [{ id: "10", fn: "Deshan", ln: "Lakshitha", nic: "1111111", no:"0111111", mail: "adsdada", bd: "2525" }, { id: "11", fn: "Kamal", ln: "Silva", nic: "1111111", no:"0111111", mail: "adsdada", bd: "2525" }, { id: "12", fn: "Anjana", ln: "Lakshitha", nic: "1111111", no:"0111111", mail: "adsdada", bd: "2525" }];

    return (

        <div className="all_users">

            {/* sample database result object to html convert with search enabled */}
            {arr.filter(
                (value, key) => {
                    if (search == "")
                        return value;
                    else if (value.ab.toLowerCase().includes(search.toLowerCase())) {
                        return value;
                    }
                }
            )
                .map(
                    (value, key) => {
                        return (
                            // Tables should come here

                            

                            <div className="user" key={key}>
                                {/* <p>{value.ab}</p> */}
                            </div>
                        )
                    }
                )}

            <HeaderOne />

            <h1 className="alluser_header">All Users</h1>

            <div className="container users">

                <div className="d-flex form">
                    <div className="row">
                    <input
                        type="search"
                        placeholder="Search by Name"
                        style={{ borderRadius: "20px", border: "2px solid #1376BD", height: "40px"}}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                    </div>
                </div>



                <h4 className="category" >Doctors</h4>

                <div className="user_display">
                    <Table style={{ color: "#1376BD" }}>
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>NIC</th>
                                <th>Contact No</th>
                                <th>Email</th>
                                <th>Birthday</th>
                            </tr>
                        </thead>
                        <tbody style={{ color: "black" }}>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td><Button className="btn-primary" style={{ borderRadius: "20px" }}>Update</Button></td>
                            </tr>
                        </tbody>
                    </Table>
                </div>

                <h4 className="category">Examiners</h4>

                <div className="user_display">
                    <Table style={{ color: "#1376BD" }}>
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>NIC</th>
                                <th>Contact No</th>
                                <th>Email</th>
                                <th>Birthday</th>
                            </tr>
                        </thead>
                        <tbody style={{ color: "black" }}>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td><Button className="btn-primary" style={{ borderRadius: "20px" }}>Update</Button></td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>

        </div >

    );
}

export default AllUsers;