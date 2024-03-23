import { useJwt } from "react-jwt";
import { Navigate } from "react-router-dom";
import { getParameterByName } from "./parameterHelpers";
import { useSelector } from "react-redux";

export default function PrivateRoute({ children }) {
    const { user } = useSelector((state) => ({
        user: state.user,
    }));
    const token = getParameterByName("token") || user.token || JSON.parse(localStorage.getItem("accessToken"))
    const { isExpired } = useJwt(token);

    if (isExpired) return <Navigate to="/login" />

    return children

}

