import { BrowserRouter } from "react-router-dom";
import ScrollTop from "./components/ScrollTop";
import AppRoutes from "./components/AppRoutes/AppRoutes";
import useTheme from "./hooks/useTheme";

import styles from "../src/pages/Home/Home.module.scss";
import clsx from "clsx";
function App() {
    const { theme, toggleTheme } = useTheme();
    return (
        <BrowserRouter>
            <ScrollTop />

            <div className={clsx(styles.app, styles[`${theme}-mode`])}>
                <button onClick={toggleTheme}>
                    Chuyển sang {theme === "light" ? "dark" : "light"}
                </button>
                <AppRoutes />
            </div>
        </BrowserRouter>
    );
}

export default App;
