import config from "@/config";
import { NavLink } from "react-router-dom";

// import config from "../../../config";
const Navigation = () => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to={config.routes.home}>Home</NavLink>
                </li>

                <li>
                    <NavLink to={config.routes.products}>Products</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
