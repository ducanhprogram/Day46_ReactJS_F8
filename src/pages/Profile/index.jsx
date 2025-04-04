import authService from "@/services/authService";
import profileSchema from "@/utils/schema/profileSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

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
        resolver: yupResolver(profileSchema),
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileData, currentUserData] = await Promise.all([
                    authService.getUserProfile(username),
                    authService.getCurrentUser(),
                ]);
                setUser(profileData.user);
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
        });
    });
    return (
        <div>
            <h2>Thông tin cá nhân</h2>
            <div
                style={{
                    border: "1px solid #ccc",
                    padding: "20px",
                    borderRadius: "5px",
                }}
            >
                <p>
                    <strong>Họ và tên:</strong>
                    {fullName}
                </p>
                <p>
                    <strong>Tên người dùng:</strong>
                    {user.username}
                </p>

                <p>
                    <strong>Email: </strong>
                    {user.email}
                </p>

                <p>
                    <strong>Trạng thái xác minh: </strong>
                    {user.emailVerifiedAt
                        ? "Tài khoản đã được xác minh"
                        : "Tài khoản chưa xác minh"}
                </p>

                <p>
                    <strong>Tuổi: </strong>
                    {user.age ?? "Chưa cập nhật"}
                </p>

                <p>
                    <strong>Giới tính:</strong> {user.gender || "Chưa cập nhật"}
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
        </div>
    );
};

export default Profile;
