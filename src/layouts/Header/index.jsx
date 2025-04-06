import authService from "@/services/authService";
import { setToken } from "@/utils/httpRequest";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = async () => {
        const isConfirm = window.confirm("Bạn có muốn đăng xuất?");
        if (!isConfirm) {
            return;
        }

        if (!token) {
            navigate("/");
            return;
        }

        try {
            const data = await authService.logout(token);

            console.log(data);
            if (data.status === "success") {
                setToken(null);
                navigate("/");
            } else {
                console.error("Đăng xuất thất bại:", data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <header>
            {token ? (
                <button onClick={handleLogout}>Đăng xuất</button>
            ) : (
                <div>
                    <button
                        onClick={() => {
                            navigate("/login2");
                        }}
                    >
                        Đăng nhập
                    </button>
                    <button
                        onClick={() => {
                            navigate("/register2");
                        }}
                    >
                        Đăng ký
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;
