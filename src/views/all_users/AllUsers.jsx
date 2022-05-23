import "./AllUsers.css";
import HeaderOne from "../../components/headers/HeaderOne";
import Searchbar from "../../components/Searchbar/Searchbar";
import {
  Card,
  Form,
  Button,
  Table,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminServices from "../../services/API/AdminServices";

const AllUsers = () => {
  // When update button is clicked
  const navigate = useNavigate();
  const deleteUser = (user_id) => {
    console.log("delete user fn");
    navigate(`/userCompleteRegistration?user=${user_id}`);
  };

  // Search term
  const [search, setSearch] = useState("");

  const [users, setUsers] = useState({
    doctors:[],
    examiners:[]
  });
  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const response = await AdminServices.getAllUsers(0, 3);
      let users=response.data.data
      let d = [];
      let e = [];
      users.map((value, key) => {
        if (value.auth.usertype.name == "doctor") {
          d.push(value);
        } else if (value.auth.usertype.name == "examiner") {
          e.push(value);
        }
      });
      setUsers({...users,doctors:d,examiners:e});
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
            <input
              type="search"
              placeholder="Search by Name"
              style={{
                borderRadius: "20px",
                border: "2px solid #1376BD",
                height: "40px",
              }}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>

        <h4 className="category">Doctors</h4>

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
              {/* sample database result object to html convert with search enabled */}
              {users.doctors
                .filter((value, key) => {
                  if (search == "") {
                    return value;
                  } else if (
                    value.firstname
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    value.lastname.toLowerCase().includes(search.toLowerCase())
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
              {/* sample database result object to html convert with search enabled */}
              {users.examiners
                .filter((value, key) => {
                  if (search == "") {
                    return value;
                  } else if (
                    value.firstname
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    value.lastname.toLowerCase().includes(search.toLowerCase())
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
  );
};

export default AllUsers;
