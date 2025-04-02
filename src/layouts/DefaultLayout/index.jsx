import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import Header from "../Header";

const DefaultLayout = () => {
    return (
        <div className="wrapper">
            <h1>Default Layout</h1>
            <Header />
            <Navigation />
            <Outlet />
        </div>
    );
};

export default DefaultLayout;
