import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";


const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();
    if(loading){
        return "Loading..."
    }
    if(!user){
        //navigate
        return <Navigate to={'/login'} />
    }
    return children;
};

export default PrivateRoute;