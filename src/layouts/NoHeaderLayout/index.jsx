import { Outlet } from "react-router-dom";
import Navigation from "../DefaultLayout/Navigation";
import Footer from "../Footer";

const NoHeaderLayout = () => {
    return (
        <div>
            <Navigation />
            <Outlet />
            <Footer />
        </div>
    );
};

export default NoHeaderLayout;
