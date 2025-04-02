import DefaultLayout from "@/layouts/DefaultLayout";
import NoLayout from "@/layouts/NoLayout";
import routes from "@/pages/routes";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import { Fragment } from "react";

function AppRoutes() {
    return (
        <Routes>
            {routes.map((route) => {
                const Component = route.component;
                const Layout =
                    route.layout === undefined
                        ? DefaultLayout
                        : route.layout || NoLayout;

                const RouteWrapper = route.protected
                    ? ProtectedRoute
                    : Fragment;

                return (
                    <Route key={route.path} element={<Layout />}>
                        <Route
                            path={route.path}
                            element={
                                <RouteWrapper>
                                    <Component />
                                </RouteWrapper>
                            }
                        />
                    </Route>
                );
            })}
        </Routes>
    );
}

export default AppRoutes;
