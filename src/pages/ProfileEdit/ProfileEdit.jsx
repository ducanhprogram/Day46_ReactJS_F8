// src/components/ProfileEdit.jsx
import InputTextHookForm from "@/components/InputText/InputTextHookForm";
import authService from "@/services/authService";
import profileSchema from "@/utils/schema/profileSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const ProfileEdit = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error_s, setError_s] = useState(null);

    const {
        register,
        handleSubmit,
        watch,
        setError,
        clearErrors,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            username: "",
            age: null,
            gender: "",
            birthDate: null,
        },
        resolver: yupResolver(profileSchema),
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profileResponse = await authService.getUserProfile(
                    username
                );
                let profileData = profileResponse.data || profileResponse;
                setUser(profileData);
                reset(profileData);
                setLoading(false);
            } catch (error) {
                setError_s(error.message);
                setLoading(false);
            }
        };
        fetchData();
    }, [username, reset]);

    const emailValue = watch("email");
    const phoneValue = watch("phone");
    const usernameValue = watch("username");

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (emailValue && emailValue !== user?.email) {
                const exists = await authService.checkEmail(
                    emailValue,
                    user?.id
                );
                if (exists) {
                    setError("email", {
                        type: "manual",
                        message: "Email đã tồn tại",
                    });
                } else {
                    clearErrors("email");
                }
            }

            if (phoneValue && phoneValue !== user?.phone) {
                const exists = await authService.checkPhone(
                    phoneValue,
                    user?.id
                );
                if (exists) {
                    setError("phone", {
                        type: "manual",
                        message: "Số điện thoại đã tồn tại",
                    });
                } else {
                    clearErrors("phone");
                }
            }

            if (usernameValue && usernameValue !== user?.username) {
                const exists = await authService.checkUsername(
                    usernameValue,
                    user?.id
                );
                if (exists) {
                    setError("username", {
                        type: "manual",
                        message: "Username đã tồn tại",
                    });
                } else {
                    clearErrors("username");
                }
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [
        emailValue,
        phoneValue,
        usernameValue,
        clearErrors,
        setError,
        user?.email,
        user?.id,
        user?.username,
        user?.phone,
    ]);

    const onSubmit = async (data) => {
        try {
            if (data.birthDate) {
                const date = new Date(data.birthDate);
                const month = date.getMonth() + 1;
                data.birthDate = `${date.getFullYear()}-${month}-${date.getDate()}`;
            }
            const payload = Object.fromEntries(
                Object.entries(data).filter(([_, value]) => {
                    return (
                        value !== null && value !== "" && value !== undefined
                    );
                })
            );

            const updatedUser = await authService.updateUserProfile(
                username,
                payload
            );
            const updatedData = updatedUser.data || updatedUser;
            setUser(updatedData);
            toast.success("Cập nhật thông tin thành công!", {
                onClose: () => navigate(`/profile/${username}`), // Chuyển hướng sau khi toast đóng
            });
        } catch (error) {
            toast.error(error.message || "Có lỗi xảy ra, vui lòng thử lại");
        }
    };

    if (loading) return <div style={{ textAlign: "center" }}>Loading...</div>;
    if (error_s) return <div style={{ textAlign: "center" }}>{error_s}</div>;
    if (!user)
        return (
            <div style={{ textAlign: "center" }}>
                Không có dữ liệu người dùng
            </div>
        );

    return (
        <div>
            <h2>Chỉnh sửa thông tin cá nhân</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputTextHookForm
                    label="Họ"
                    name="firstName"
                    error={errors.firstName?.message}
                    {...register("firstName")}
                />
                <InputTextHookForm
                    label="Tên"
                    name="lastName"
                    error={errors.lastName?.message}
                    {...register("lastName")}
                />

                <InputTextHookForm
                    label="Email"
                    name="email"
                    type="email"
                    error={errors.email?.message}
                    {...register("email")}
                />

                <InputTextHookForm
                    label="Số điện thoại"
                    name="phone"
                    type="tel"
                    error={errors.phone?.message}
                    {...register("phone")}
                />

                <InputTextHookForm
                    label="Username"
                    name="username"
                    error={errors.username?.message}
                    {...register("username")}
                />

                <InputTextHookForm
                    label="Tuổi"
                    name="age"
                    type="number"
                    error={errors.age?.message}
                    {...register("age")}
                />

                <div>
                    <label>Giới tính:</label>
                    <select {...register("gender")}>
                        <option value="">Chọn giới tính</option>
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                    </select>
                    {errors.gender && <p>{errors.gender.message}</p>}
                </div>

                <InputTextHookForm
                    label="Ngày sinh"
                    name="birthDate"
                    type="date"
                    error={errors.birthDate?.message}
                    {...register("birthDate")}
                />
                <button type="submit">Lưu</button>
                <button
                    type="button"
                    onClick={() => navigate(`/profile/${username}`)}
                >
                    Hủy
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default ProfileEdit;
