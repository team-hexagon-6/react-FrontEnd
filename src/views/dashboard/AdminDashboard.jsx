import "./AdminDashboard.css"
import HeaderOne from "../../components/headers/HeaderOne";
import { Button, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import 'font-awesome/css/font-awesome.css';
import UserServices from "../../services/API/UserServices";
import { useEffect, useState } from "react";

const AdminDashboard = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState([]);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async (usertype) => {
        try {
            const response = await UserServices.getUser();
            setUser(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (

        <div className="admin_dash">

            <HeaderOne />

            <div className="col-sm-4 reg">

                <h1 className="admindash_header">Admin Dashboard</h1>

                <h6 className="admindash_header">Welcome, {user.firstname && user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1)}!</h6>

                <div className="container dashboard justify-content-center text-center">

                    <div className="image" style={{ marginBottom: "0px" }}>
                        <img src="../../public/dashboard.png" alt="" />
                    </div>

                    <ButtonGroup vertical className="d-flex">
                        <Button
                            className="dash_btn"
                            style={{ borderRadius: "20px", margin: "20px", width: "100%", marginLeft: "auto" }}
                            onClick={() => { navigate('/registerUser') }}>
                            Register A New User
                        </Button>
                        <Button
                            className="dash_btn"
                            style={{ borderRadius: "20px", margin: "20px", width: "100%", marginLeft: "auto" }}
                            onClick={() => { navigate('/allUsers') }}>
                            View All Users
                        </Button>
                    </ButtonGroup>

                </div>

            </div>

        </div>

    );
}

export default AdminDashboard;