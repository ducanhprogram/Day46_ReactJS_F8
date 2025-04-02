import config from "@/config";
import authService from "@/services/authService";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        // const token = localStorage.getItem("token");
        setLoading(true);

        (async () => {
            try {
                const data = await authService.getCurrentUser();
                setCurrentUser(data.user);
            } catch (error) {
                console.error("Error fetching current user: ", error);
                if (error.response?.status === 401) {
                    localStorage.removeItem("token");
                    Navigate("/login");
                }
                setCurrentUser(null);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!currentUser) {
        const path = encodeURIComponent(location.pathname);
        console.log(path);
        return (
            <Navigate
                to={`${config.routes.login}${path ? `?continue=${path}` : ""}`}
            />
        );
    }
    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.element,
};

export default ProtectedRoute;
