import InputTextHookForm from "@/components/InputText/InputTextHookForm";
import authService from "@/services/authService";
import profileSchema from "@/utils/schema/profileSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Profile = () => {
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error_s, setError_s] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

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
                const [profileResponse, currentUserData] = await Promise.all([
                    authService.getUserProfile(username),
                    authService.getCurrentUser().catch(() => null),
                ]);

                let profileData = profileResponse.data || profileResponse;

                console.log("Profile Data: ", profileData);
                console.log("Current User Data: ", currentUserData);
                setUser(profileData);
                setCurrentUser(currentUserData);
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
            setIsEditing(false);
            toast.success("Cập nhật thông tin thành công!");
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

    const fullName = ` ${user.firstName} ${user.lastName}`;
    const isOwnProfile = currentUser && currentUser.data.id === user.id;
    console.log("isOwnProfile:", isOwnProfile);
    console.log("currentUser:", currentUser);
    console.log("user:", user);
    return (
        <div>
            <h2>Thông tin cá nhân</h2>
            {isOwnProfile && !isEditing && (
                <button onClick={() => setIsEditing(true)}>Chỉnh sửa</button>
            )}

            {isEditing ? (
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
                    <button type="button" onClick={() => setIsEditing(false)}>
                        Hủy
                    </button>
                </form>
            ) : (
                <div
                    style={{
                        border: "1px solid #ccc",
                        padding: "20px",
                        borderRadius: "5px",
                    }}
                >
                    <p>
                        <strong>Họ và tên:</strong> {fullName}
                    </p>
                    <p>
                        <strong>Tên người dùng:</strong> {user.username}
                    </p>
                    <p>
                        <strong>Email: </strong> {user.email}
                    </p>
                    <p>
                        <strong>Trạng thái xác minh: </strong>
                        {user.emailVerifiedAt
                            ? "Tài khoản đã được xác minh"
                            : "Tài khoản chưa xác minh"}
                    </p>
                    <p>
                        <strong>Tuổi: </strong> {user.age ?? "Chưa cập nhật"}
                    </p>
                    <p>
                        <strong>Giới tính:</strong>{" "}
                        {user.gender || "Chưa cập nhật"}
                    </p>
                    <p>
                        <strong>Số điện thoại:</strong>{" "}
                        {user.phone || "Chưa cập nhật"}
                    </p>
                    <p>
                        <strong>Ngày sinh:</strong>{" "}
                        {user.birthDate ?? "Chưa cập nhật"}
                    </p>
                    <p>
                        <strong>Ảnh đại diện:</strong>{" "}
                        {user.image ? (
                            <img
                                src={user.image}
                                alt="Avatar"
                                style={{ width: "100px" }}
                            />
                        ) : (
                            "Chưa cập nhật"
                        )}
                    </p>
                    <p>
                        <strong>Ngày tạo tài khoản:</strong>{" "}
                        {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default Profile;
