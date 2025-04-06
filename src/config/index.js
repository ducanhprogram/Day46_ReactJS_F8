const config = {
    routes: {
        home: "/",
        register: "/register",
        register2: "/register2",
        login: "/login",
        login2: "/login2",
        products: "/products",
        productDetail: "/products/:slug",
        users: "/users",
        profile: "/profile/:username",
        profileEdit: "/profile/:username/edit",
        notFound: "*",
    },
};

export default config;
