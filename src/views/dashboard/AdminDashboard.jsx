import "./AdminDashboard.css"
import HeaderTwo from "../../components/headers/HeaderTwo";
import { Button, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import 'font-awesome/css/font-awesome.css';
import UserServices from "../../services/API/UserServices";
import { useEffect, useState } from "react";
import Loader from "../../components/loader/Loader";

const AdminDashboard = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState([]);

    const [loader, setLoader] = useState(false);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async (usertype) => {
        setLoader(true);
        try {
            const response = await UserServices.getUser();
            setUser(response.data.data);
        } catch (error) {
            console.log(error);
        }
        setTimeout(() => {
            setLoader(false);
          }, 200);
    };

    if (loader) {
        return (
            <Loader />
        )
    } 
    else {

        return (

            <div className="admin_dash">

                <HeaderTwo />

                <div className="col-sm-4 mt-5 reg">

                    <h1 className="admindash_header">Admin Dashboard</h1>

                    <h6 className="admindash_header">Welcome, {user.firstname && user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1)}!</h6>

                    <div className="container dashboard justify-content-center text-center">

                        <div className="image" style={{ marginBottom: "0px" }}>
                            <img src="https://i.ibb.co/6n0rvNF/dashboard.png" alt="" />
                        </div>

                        <ButtonGroup vertical className="d-flex">
                            <Button
                                className="dash_btn"
                                style={{ borderRadius: "20px", margin: "20px", width: "100%", marginLeft: "auto" }}
                                onClick={() => { navigate('/register-user') }}>
                                Register A New User
                            </Button>
                            <Button
                                className="dash_btn"
                                style={{ borderRadius: "20px", margin: "20px", width: "100%", marginLeft: "auto" }}
                                onClick={() => { navigate('/users') }}>
                                View All Users
                            </Button>
                        </ButtonGroup>

                    </div>

                </div>

            </div>

        );
    }

}

export default AdminDashboard;