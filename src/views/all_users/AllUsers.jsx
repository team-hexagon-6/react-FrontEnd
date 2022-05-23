import "./AllUsers.css";
import HeaderOne from "../../components/headers/HeaderOne";
import Searchbar from "../../components/Searchbar/Searchbar";
import { Card, Form, Button, Table, FormControl, InputGroup, DropdownButton, Dropdown, Pagination, } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminServices from "../../services/API/AdminServices";

const AllUsers = () => {

  const [usertype, setusertype] = useState('Doctors');
  //When Doctor or Examiner is clicked
  const displayDoctors = () => {
    getUsers("doctor");
    setusertype('Doctors');
  }
  const displayExaminers = () => {
    getUsers("examiner");
    setusertype('Examiners');
  }

  // When update button is clicked
  const navigate = useNavigate();
  const updateUser = (user_id) => {
    console.log("delete user fn");
    navigate(`/userCompleteRegistration?user=${user_id}`);
  };

  // Search term
  const [search, setSearch] = useState("");

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers("doctor");
  }, []);

  const getUsers = async (usertype) => {
    try {
      if (usertype === "doctor") {
        const response = await AdminServices.getDoctors(0, 50);
        setUsers(response.data.data);
      }
      else if (usertype === "examiner") {
        const response = await AdminServices.getExaminers(0, 50);
        setUsers(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="all_users">
      <HeaderOne />

      <h1 className="alluser_header">All Users</h1>

      <div className="container users">

        <div className="d-flex form">
          <div className="row">
            <DropdownButton title={usertype} placeholder="&#xf2c2;" id="bg-vertical-dropdown-3" style={{ color: "black" }}>
              <Dropdown.Item eventKey="1" onClick={displayDoctors}>Doctors</Dropdown.Item>
              <Dropdown.Item eventKey="2" onClick={displayExaminers}>Examiners</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>

        <h4 className="category">{usertype}</h4>

        <div className="user_display">

          <input
            type="search"
            placeholder="  Search a user"
            style={{
              borderRadius: "20px",
              border: "2px solid #1376BD",
              height: "40px",
              display: "flex",
              float: "right",
              width: "25%",
              marginBottom: "10px", 
            }}
            onChange={(event) => setSearch(event.target.value)}
          />

          {users.length === 0 &&
            <div><h5 style={{ color: "black", textAlign: "center", margin: "10px" }}>No {usertype} to display</h5>
              <div className="image">
                <img src="../../public/404.png" alt="" />
              </div>
            </div>}
          {users.length !== 0 &&
            <Table style={{ color: "#1376BD", tableLayout: "fixed", width: "100%" }}>
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
                {/* sample database result object to html convert with search enabled */}
                {users
                  .filter((value, key) => {
                    if (search == "") {
                      return value;
                    } else if (
                      value.firstname
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                      value.lastname.toLowerCase().includes(search.toLowerCase()) ||
                      value.auth.id.includes(search) || value.contact_no.includes(search) || value.nic.includes(search) || value.email.includes(search)

                    ) {
                      return value;
                    }
                  })
                  .map((value, key) => {
                    // Tables should come here

                    return (
                      <tr key={key}>
                        <td>{value.auth.id}</td>
                        <td>{value.firstname}</td>
                        <td>{value.lastname}</td>
                        <td>{value.nic}</td>
                        <td>{value.contact_no}</td>
                        <td>{value.email}</td>
                        <td>{value.birthday.slice(0, 10)}</td>
                        <td>
                          <Button className="btn-primary" style={{ borderRadius: "20px" }} onClick={() => updateUser(value.auth.id)}>Update</Button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>}
        </div>

      </div>

    </div>
  );
};

export default AllUsers;
