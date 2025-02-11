import { ReactNode, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "@/context/ContextProvider";

interface PrivateRouteProps {
    children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, setUser } = useContext(AppContext);

    useEffect(() => {
        const fetchUser = JSON.parse(localStorage.getItem("chattyappyCredentials") ?? "{}");

        if (!fetchUser || !fetchUser.userId) {
            navigate("/", { state: { from: location.pathname } }); // Redirect and save attempted path
        } else {
            setUser(fetchUser); // Only set user if valid
        }
    }, [navigate, setUser, location.pathname]);

    return user && user.userId ? <>{children}</> : null;
};

export default PrivateRoute;