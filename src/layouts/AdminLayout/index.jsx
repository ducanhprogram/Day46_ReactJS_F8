import { Outlet } from "react-router-dom";

const AdminLayout = () => {
    return (
        <div className="wrapper">
            <h1>Admin Layout</h1>
            <nav>
                <ul>
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/products">Products</a>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    );
};

export default AdminLayout;
