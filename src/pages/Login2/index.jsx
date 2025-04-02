import InputTextHookForm from "@/components/InputText/InputTextHookForm";
// import config from "@/config";
// import useQuery from "@/hooks/useQuery";
// import httpRequest from "@/utils/httpRequest";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchema from "@/utils/schema/loginSchema";
import { useEffect } from "react";
import authService from "@/services/authService";
// import { useNavigate } from "react-router-dom";

const Login2 = () => {
    // const navigate = useNavigate();
    // const query = useQuery();

    //resolver: Là cầu đổi chuyển đổi giúp React Hook Form sử dụng thư viện validation bên ngoài (Yup)
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        //call API
        const response = await authService.login2(data);
        console.log(response);

        reset();
    };

    const emailValue = watch("email");

    useEffect(() => {
        console.log(emailValue);
    }, [emailValue]);

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

                {/* {errors.email && (
                    <p style={{ color: "red" }}>{errors.email.message}</p>
                )} */}
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
