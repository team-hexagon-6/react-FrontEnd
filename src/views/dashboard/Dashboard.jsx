import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css"
import 'font-awesome/css/font-awesome.css';
import UserServices from "../../services/API/UserServices";
import Loader from "../../components/loader/Loader";

const Dashboard = () => {

    const navigate = useNavigate();

    const [loader, setLoader] = useState(false);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async (usertype) => {
        setLoader(true);
        try {
            const response = await UserServices.getUser();
            if (response.data.data.auth.complete_profile) {
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
            } else {
                navigate('/updateProfile');
            }
        } catch (error) {
            console.log(error);
        }
        setTimeout(() => {
            setLoader(false);
        }, 200);
    };

    if (loader) {
        return <Loader/>
    }
    else{
        return (
        <div className="dashboard">

        </div>
    );
    }
}

export default Dashboard;