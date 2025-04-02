import { BrowserRouter } from "react-router-dom";
import ScrollTop from "./components/ScrollTop";
import AppRoutes from "./components/AppRoutes/AppRoutes";

function App() {
    return (
        <BrowserRouter>
            <ScrollTop />
            <AppRoutes />
        </BrowserRouter>
    );
}

export default App;
