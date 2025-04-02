import { useNavigate } from "react-router-dom";

import { useState } from "react";
import InputText from "@/components/InputText/InputText";
import httpRequest from "@/utils/httpRequest";

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        passwordConfirmation: "",
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    //Tác họ và tên
    const splitFullName = (fullName) => {
        const nameParts = fullName.trim().split(" ");
        const firstName = nameParts.pop();
        const lastName = nameParts.join(" ");
        return { firstName, lastName };
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const { fullName, email, password, passwordConfirmation } = formData;

        if (password !== passwordConfirmation) {
            setErrors({
                passwordConfirmation: "Mật khẩu nhập lại không khớp.",
            });
            return;
        }
        const { firstName, lastName } = splitFullName(fullName);

        const payload = {
            firstName,
            lastName,
            email,
            password,
            password_confirmation: passwordConfirmation,
        };

        try {
            const response = await httpRequest.post("/auth/register", payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            localStorage.setItem("token", response.access_token);
            alert("Đăng ký thành công");
            navigate("/");
        } catch (error) {
            console.log(error);
            if (error.response) {
                const data = error.response.data;
                console.log("Dữ liệu lỗi từ API:", data);

                if (data.message) {
                    // Xử lý lỗi từ message object
                    const errorMessages = {};

                    // Nếu có lỗi email
                    if (data.message.email && data.message.email.length > 0) {
                        errorMessages.email =
                            "Email này đã được sử dụng. Vui lòng sử dụng email khác";
                    }

                    if (
                        data.message.password &&
                        data.message.password.length > 0
                    ) {
                        errorMessages.password =
                            "Mật khẩu phải có ít nhất 8 ký tự!!!";
                    }

                    if (
                        data.message.firstName &&
                        data.message.firstName.length > 0
                    ) {
                        errorMessages.fullName = data.message.firstName[0];
                    }
                    if (
                        data.message.lastName &&
                        data.message.lastName.length > 0
                    ) {
                        errorMessages.fullName = data.message.lastName[0];
                    }

                    setErrors(errorMessages);
                }
            } else {
                console.error("Lỗi kết nối API:", error.message);
            }
        }
    };
    return (
        <div
            style={{ maxWidth: "400px", margin: "50px auto", padding: "20px" }}
        >
            <h2>Đăng ký</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <InputText
                        label={"Họ và tên"}
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        error={errors.fullName}
                    />
                </div>
                <div>
                    <InputText
                        label={"Email"}
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                    />
                </div>
                <div>
                    <InputText
                        label={"Mật khẩu"}
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                    />
                </div>

                <div>
                    <InputText
                        label={"Nhập lại mật khẩu"}
                        type="password"
                        name="passwordConfirmation"
                        value={formData.passwordConfirmation}
                        onChange={handleChange}
                        error={errors.passwordConfirmation}
                    />
                </div>

                <button type="submit">Đăng ký</button>
            </form>
        </div>
    );
};

export default Register;
