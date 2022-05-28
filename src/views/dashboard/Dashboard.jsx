import { useEffect, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import "./AdminDashboard.css"
import 'font-awesome/css/font-awesome.css';
import UserServices from "../../services/API/UserServices";
import Loader from "../../components/loader/Loader";
import Token from '../../services/Token'
import jwtDecode from "jwt-decode";
const Dashboard = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    console.log(location)

    const [loader, setLoader] = useState(false);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async (usertype) => {
        setLoader(true);
        try {
            // const response = await UserServices.getUser();
            
            // setAuth({usertype:response.data.data.auth.usertype.name})
            const user=jwtDecode(Token.getAccessToken())
            console.log(from)
            navigate(from, { replace: true })
            // console.log("usertype",response.data.data.auth.usertype.name);
            if (user.profile_complete) {
                switch (user.role) {
                    case '_32345':
                        navigate('/adminDashboard');
                        break;
                    case '_32446':
                        navigate('/doctor');
                        break
                    case '_32247':
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