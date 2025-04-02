import config from "@/config";
import AdminLayout from "@/layouts/AdminLayout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound.jsx";
import ProductDetail from "@/pages/ProductDetail";
import Products from "@/pages/Products";
import Register from "@/pages/Register2";
import Register2 from "@/pages/Register2";
import Users from "@/pages/Users";

const routes = [
    {
        path: config.routes.home,
        component: Home,
    },
    {
        path: config.routes.products,
        component: Products,
        layout: AdminLayout,
    },
    {
        path: config.routes.productDetail,
        component: ProductDetail,
        layout: null,
        protected: false,
    },

    {
        path: config.routes.register,
        component: Register,
    },
    {
        path: config.routes.login,
        component: Login,
    },
    {
        path: config.routes.users,
        component: Users,
        protected: true,
    },
    {
        path: config.routes.register2,
        component: Register2,
    },
    {
        path: config.routes.notFound,
        component: NotFound,
    },
];

export default routes;
