import "./AdminDashboard.css"
import HeaderOne from "../../components/headers/HeaderOne";
import { Button, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {

    const navigate = useNavigate();

    return (

        <div className="admin_dash">

            <HeaderOne />

            <div className="col-sm-4 reg">

                <h1 className="admindash_header">Admin Dashboard</h1>

                <div className="container dashboard justify-content-center text-center">

                    <div className="image" style={{marginBottom: "0px"}}>
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