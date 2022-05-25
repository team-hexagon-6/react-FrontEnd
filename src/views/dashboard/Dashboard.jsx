import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css"
import 'font-awesome/css/font-awesome.css';
import UserServices from "../../services/API/UserServices";

const Dashboard = () => {

    const navigate = useNavigate();

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async (usertype) => {
        try {
            const response = await UserServices.getUser();
            switch (response.data.data.auth.usertype.name) {
                case 'admin':
                    navigate('/adminDashboard');
                    break;
                case 'doctor':
                    navigate('/doctor');
                    break
                case 'examiner':
                    navigate('/examiner');
                    break
                default:
                    break;
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="dashboard">

        </div>
    );
}

export default Dashboard;