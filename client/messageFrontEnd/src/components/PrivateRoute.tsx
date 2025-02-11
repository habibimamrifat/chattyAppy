import { AppContext } from '@/context/ContextProvider';
import React, { ReactNode, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface PrivateRouteProps {
    children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const navigate = useNavigate();
    const fetchUser = JSON.parse(localStorage.getItem("chattyappyCredentials") || '{}');
    useEffect(() => {
        if (!user || !user.userId) {
            navigate("/");
        }
    },[navigate, fetchUser]);

    const { user, setUser } = useContext(AppContext); 

    setUser(fetchUser)

    return user && user.userId ? <>{children}</> : null;
};

export default PrivateRoute;
