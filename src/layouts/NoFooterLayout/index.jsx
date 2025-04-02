import { Outlet } from "react-router-dom";
import Navigation from "../DefaultLayout/Navigation";
import Header from "../Header";

const NoFooterLayout = () => {
    return (
        <div>
            <Header />
            <Navigation />
            <Outlet />
        </div>
    );
};

export default NoFooterLayout;
