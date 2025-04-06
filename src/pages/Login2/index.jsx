import InputTextHookForm from "@/components/InputText/InputTextHookForm";
// import config from "@/config";
// import useQuery from "@/hooks/useQuery";
// import httpRequest from "@/utils/httpRequest";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchema from "@/utils/schema/loginSchema";

import authService from "@/services/authService";
import { useNavigate } from "react-router-dom";
import useQuery from "@/hooks/useQuery";
import config from "@/config";

const Login2 = () => {
    const navigate = useNavigate();
    const query = useQuery();

    //resolver: Là cầu đổi chuyển đổi giúp React Hook Form sử dụng thư viện validation bên ngoài (Yup)
    const {
        register,
        handleSubmit,
        setError,

        trigger,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        const isValid = await trigger();

        if (!isValid) {
            return;
        }
        //call API
        try {
            const response = await authService.login2(data);
            // console.log(response);
            // console.log("Đăng nhập thành công: ", response);

            if (response.status === "success" && response.data.access_token) {
                alert("Đăng nhập thành công");
                const continuePath =
                    query.get("continue") || config.routes.home;
                navigate(continuePath);
            }

            throw new Error("Đăng nhập không thành công");
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data.message) {
                const data = error.response.data;

                console.log(data);
                // Xử lý lỗi từ API
                if (data.message) {
                    setError("password", {
                        type: "manual",
                        message: "Email hoặc mật khẩu không đúng!",
                    });
                }
            } else {
                setError("email", {
                    type: "manual",
                    message: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
                });
            }
        }
    };

    return (
        <div
            style={{ maxWidth: "400px", margin: "50px auto", padding: "20px" }}
        >
            <h2>Đăng nhập</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputTextHookForm
                    label={"Email"}
                    type="email"
                    name="email"
                    error={errors.email?.message}
                    {...register("email")}
                />

                <InputTextHookForm
                    label={"Mật khẩu"}
                    type="password"
                    name="password"
                    error={errors.password?.message}
                    {...register("password")}
                />

                <button>Đăng nhập</button>
            </form>
        </div>
    );
};

export default Login2;
