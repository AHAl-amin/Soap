import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivetRoute = ({ children }) => {
    
    const access_token = useSelector(state => state.auth.token);
   
    return access_token ? children : <Navigate to="/login" replace />;
};

export default PrivetRoute;