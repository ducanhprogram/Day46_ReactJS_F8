import config from "@/config";
import useUser from "@/hooks/useUser";
import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
    const user = useUser();
    console.log(user);
    return (
        <div className="wrapper">
            <h1>Admin Layout</h1>
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

            {user && <div>Xin chào, {user.firstName}</div>}
            <Outlet />
        </div>
    );
};

export default AdminLayout;
