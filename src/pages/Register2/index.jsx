import { useNavigate } from "react-router-dom";
import httpRequest from "@/utils/httpRequest";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import registerSchema from "@/utils/schema/registerSchema";
import InputTextHookForm from "@/components/InputText/InputTextHookForm";
import { useEffect } from "react";
import authService from "@/services/authService";

let timer;

const Register2 = () => {
    const navigate = useNavigate();

    // Khởi tạo React Hook Form với Yup resolver
    const {
        register,
        handleSubmit,
        watch,
        trigger,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm({
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            passwordConfirmation: "",
        },
        resolver: yupResolver(registerSchema),
    });

    //Tác họ và tên
    const splitFullName = (fullName) => {
        const nameParts = fullName.trim().split(" ");
        const firstName = nameParts.pop();
        const lastName = nameParts.join(" ");
        return { firstName, lastName };
    };

    const onSubmit = async (data) => {
        const { fullName, email, password, passwordConfirmation } = data;
        const { firstName, lastName } = splitFullName(fullName);

        const payload = {
            firstName,
            lastName,
            email,
            password,
            password_confirmation: passwordConfirmation,
        };

        try {
            const response = await httpRequest.post("/auth/register", payload);
            httpRequest.setToken(response.access_token);
            alert("Đăng ký thành công");
            navigate("/");
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data.message) {
                const data = error.response.data;
                console.log(data);

                // Sử dụng setError để gán lỗi từ API vào form
                if (data.message.email) {
                    setError("email", {
                        type: "manual",
                        message:
                            "Email này đã được sử dụng. Vui lòng sử dụng email khác.",
                    });
                }
                if (data.message.password) {
                    setError("password", {
                        type: "manual",
                        message: "Mật khẩu phải có ít nhất 81 ký tự!!!",
                    });
                }
                if (data.message.firstName) {
                    setError("fullName", {
                        type: "manual",
                        message: data.message.firstName[0],
                    });
                }
                if (data.message.lastName) {
                    setError("fullName", {
                        type: "manual",
                        message: data.message.lastName[0],
                    });
                }
            } else {
                console.error("Lỗi kết nối API:", error.message);
            }
        }
    };

    //Lấy gái trị nhập từ form
    const emailValue = watch("email");

    useEffect(() => {
        //Khi người dùng chưa nhập gì hoặc xóa hết
        if (!emailValue) {
            return;
        }
        clearTimeout(timer);
        timer = setTimeout(async () => {
            //trigger("email") validation cho field email, nó lấy giá trị hiện tại của field email trong form
            const isValid = await trigger("email");
            if (isValid) {
                //exists : true tức là email đã tồn tai, false là email chưa tồn tại
                const exists = await authService.checkEmail(emailValue);

                if (exists) {
                    setError("email", {
                        type: "manual",
                        message: "Email đã tồn tại...",
                    });
                } else {
                    clearErrors("email");
                }
            }
        }, 800);
    }, [emailValue, trigger, setError, clearErrors]);
    return (
        <div
            style={{ maxWidth: "400px", margin: "50px auto", padding: "20px" }}
        >
            <h2>Đăng ký</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <InputTextHookForm
                        label={"Họ và tên"}
                        type="text"
                        name="fullName"
                        {...register("fullName")}
                        error={errors.fullName?.message}
                    />
                </div>
                <div>
                    <InputTextHookForm
                        label={"Email"}
                        type="email"
                        name="email"
                        error={errors.email?.message}
                        {...register("email")}
                    />
                </div>
                <div>
                    <InputTextHookForm
                        label={"Mật khẩu"}
                        type="password"
                        name="password"
                        {...register("password")}
                        error={errors.password?.message}
                    />
                </div>

                <div>
                    <InputTextHookForm
                        label={"Nhập lại mật khẩu"}
                        type="password"
                        name="passwordConfirmation"
                        {...register("passwordConfirmation")}
                        error={errors.passwordConfirmation?.message}
                    />
                </div>

                <button type="submit">Đăng ký</button>
            </form>
        </div>
    );
};

export default Register2;
