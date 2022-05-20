import HeaderOne from "../../components/headers/HeaderOne";
import "./NotFound.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFound = () => {

    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }

    return (
        <div className="not_found">

            <HeaderOne />

            <h1 className="notfound_header">404 Error - Page Not Found</h1>

            <p style={{color: "black", textAlign: "center", margin: "10px"}}>Sorry, we couldn't find the page you requested.</p>

            <div className="image">
                <img src="../../public/404.png" alt=""/>
            </div>

            <div className="back_button">        
                <Button onClick={goBack} className="reg_button" style={{ borderRadius: "20px" }}>
                    Go Back
                </Button>
            </div>

        </div>
    );
}

export default NotFound;