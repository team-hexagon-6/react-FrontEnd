
import { Navigate, useLocation } from "react-router-dom";
import Token from '../services/Token'
import jwtDecode from "jwt-decode";
export const RequireAuth = ({ children,allowedRoles }) => {
  // const {auth} = useAuth({
  //   userRole:''
  // });
  const location = useLocation();
  // if (!auth.roles) {
  //   return <Navigate to="/login"  state={{path:location.pathname}} />;
  // }
  // return children
  // console.log("hello",auth);
  // console.log("allowedRoles",allowedRoles);
   try{
    var user=jwtDecode(Token.getAccessToken())
   }
   catch(err){
     user=null
   }
  
 

  return (
    allowedRoles?.find(role => user?.role?.includes(role))
        ? children
        : user? <Navigate to="/unauthorized" state={{ from: location }} replace />
            : <Navigate to="/login" state={{ from: location }} replace />
);
};
