import * as httpRequest from "@/utils/httpRequest";
import { Navigate } from "react-router-dom";

export const getCurrentUser = async () => {
    const response = await httpRequest.get("/auth/me");
    return response;
};

export const login = async (email, password) => {
    const response = await httpRequest.post("/auth/login", { email, password });
    httpRequest.setToken(response.access_token); // Lưu token sau khi đăng nhập
    return response;
};

export const login2 = async (data) => {
    const response = await httpRequest.post("/auth/login", data);
    httpRequest.setToken(response.access_token); // Lưu token sau khi đăng nhập
    return response;
};

export const logout = () => {
    httpRequest.setToken(null); // Xóa token khi đăng xuất
    Navigate("/login");
};

///auth/check-email?email=example@gmail.com
// email là key.
// example@gmail.com là value.
//query parameters (tham số truy vấn) trong URL của yêu cầu GET.
//params: { email } nghĩa là bạn đang gửi biến email dưới dạng query parameter trong URL.

// email là biến được truyền vào hàm checkEmail (ví dụ: "example@gmail.com").
// params: { email } là cách viết ngắn gọn của params: { email: email } (ES6 shorthand).

export const checkEmail = async (email) => {
    const response = await httpRequest.get("/auth/check-email", {
        params: {
            email,
        },
    });
    //response.exists   nếu là true đã tồn tại, false là email chưa tồn tại
    return response.exists;
};

export default {
    getCurrentUser,
    login,
    logout,
    login2,
    checkEmail,
};
