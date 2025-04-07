import config from "@/config";
import AdminLayout from "@/layouts/AdminLayout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound.jsx";
import ProductDetail from "@/pages/ProductDetail";
import Products from "@/pages/Products";
import Users from "@/pages/Users";
import Register from "../Register";
import Login2 from "../Login2";
import Register2 from "../Register2";
import Profile from "../Profile";
import ProfileEdit from "../ProfileEdit/ProfileEdit";

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
        path: config.routes.register2,
        component: Register2,
    },
    {
        path: config.routes.login,
        component: Login,
    },
    {
        path: config.routes.login2,
        component: Login2,
    },
    {
        path: config.routes.users,
        component: Users,
        protected: true,
    },
    {
        path: config.routes.profile,
        component: Profile,
        protected: true,
    },
    {
        path: config.routes.profileEdit,
        component: ProfileEdit,
        protected: true,
    },

    {
        path: config.routes.notFound,
        component: NotFound,
    },
];

export default routes;
