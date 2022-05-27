import "./AllUsers.css";
import HeaderOne from "../../components/headers/HeaderOne";
import Searchbar from "../../components/Searchbar/Searchbar";
import { Card, Form, Button, Table, FormControl, InputGroup, DropdownButton, Dropdown, Pagination, } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminServices from "../../services/API/AdminServices";
import Paginate from "../../components/pagination/paginate";

const AllUsers = () => {
  
  //For Pagination
  const [skip,setSkip] = useState(0);
  const [take,setTake] = useState(10);
  const [totalItems,setTotalItems] = useState(0);
  const changePage = async (skip_value) => {
    console.log(skip_value);
    // setSkip(skip_value);
    getUsers(usertype, skip_value, take);
  }

  const [usertype, setusertype] = useState('doctor');
  //When Doctor or Examiner is clicked
  const displayDoctors = () => {
    // setSkip(0);
    getUsers("doctor", 0, take);
    setusertype('doctor');
  }
  const displayExaminers = () => {
    // setSkip(0);
    getUsers("examiner", 0, take);
    setusertype('examiner');
  }

  // When update button is clicked
  const navigate = useNavigate();
  const params = useParams();
  const updateUser = (user_id) => {
    navigate(`/updateUser/${user_id}`);
  };

  const deactivateUser = (user_id) => {
  /////
  };

  // Search term
  const [search, setSearch] = useState("");

  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers("doctor", skip, take);
  }, []);

  const getUsers = async (usertype, skip_value, take) => {
    console.log(skip_value, take, usertype);
    try {
      let response = null;
      if (usertype === "doctor") {
        response = await AdminServices.getDoctors(skip_value, take);
      }
      else if (usertype === "examiner") {
        response = await AdminServices.getExaminers(skip_value, take);
        
      }
      setSkip(skip_value);
      setUsers(response.data.data);
      setTotalItems(response.data.total_items);
      console.log(response);
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
            <DropdownButton title={usertype.charAt(0).toUpperCase() + usertype.slice(1)} placeholder="&#xf2c2;" id="bg-vertical-dropdown-3" style={{ color: "black" }}>
              <Dropdown.Item eventKey="1" onClick={displayDoctors}>Doctors</Dropdown.Item>
              <Dropdown.Item eventKey="2" onClick={displayExaminers}>Examiners</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>

        <div className="title_search">
          {usertype === 'doctor' && <h4 className="category">Doctors</h4>}
          {usertype === 'examiner' && <h4 className="category">Examiners</h4>}
          {/* <input
            type="search"
            placeholder={"   Search " + usertype}
            style={{
              borderRadius: "20px",
              border: "2px solid #1376BD",
              height: "40px",
              display: "flex",
              float: "right",
              width: "25%",
              marginBottom: "10px",
              marginTop: "20px",
            }}
            onChange={(event) => setSearch(event.target.value)}
          /> */}
        </div>

        <div className="user_display">
          {users.length === 0 &&
            <div><h5 style={{ color: "black", textAlign: "center", margin: "10px" }}>No {usertype} to display</h5>
              <div className="image">
                <img src="../../public/404.png" alt="" />
              </div>
            </div>}
          {users.length !== 0 &&
            <Table style={{ color: "#1376BD", width: "100%" }}>
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
                        <td>{value.birthday && value.birthday.slice(0, 10)}</td>
                        <td>
                          <Button variant="outline-primary" className="" style={{ borderRadius: "20px" }} onClick={() => updateUser(value.auth.id)}>Update</Button>
                        </td>
                        <td>
                          <Button variant="outline-danger" className="" style={{ borderRadius: "20px" }} onClick={() => deactivateUser(value.auth.id)}>Delete</Button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>}

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

    </div>
  );
};

export default AllUsers;
