import * as httpRequest from "@/utils/httpRequest";

export const getCurrentUser = async () => {
    const response = await httpRequest.get("/auth/me");
    return response;
};

export const login = async (email, password) => {
    const response = await httpRequest.post("/auth/login", { email, password });
    httpRequest.setToken(response.data.access_token); // Lưu token sau khi đăng nhập
    return response;
};

export const login2 = async (data) => {
    const response = await httpRequest.post("/auth/login", data);
    httpRequest.setToken(response.data.access_token); // Lưu token sau khi đăng nhập
    return response;
};

export const logout = async () => {
    try {
        const token = localStorage.getItem("token");
        if (token) {
            httpRequest.setToken(token); // Đảm bảo token được set trước khi gọi API
            const response = await httpRequest.post("/auth/logout");
            return response;
        }
    } catch (error) {
        console.error("Logout error:", error);
        throw error;
    }
};
///auth/check-email?email=example@gmail.com
// email là key.
// example@gmail.com là value.
//query parameters (tham số truy vấn) trong URL của yêu cầu GET.
//params: { email } nghĩa là bạn đang gửi biến email dưới dạng query parameter trong URL.

// email là biến được truyền vào hàm checkEmail (ví dụ: "example@gmail.com").
// params: { email } là cách viết ngắn gọn của params: { email: email } (ES6 shorthand).

// /auth/check-email?email=abc@gmail.com&exclude_id=1 sẽ trả về { exists: false } dù email abc@gmail.com đã tồn tại và có id là 1.
export const checkEmail = async (email, excludeId = null) => {
    const response = await httpRequest.get("/auth/check-email", {
        params: {
            email,
            exclude_id: excludeId,
        },
    });
    //response.exists   nếu là true đã tồn tại, false là email chưa tồn tại
    return response.exists;
};

export const checkPhone = async (phone, excludeId = null) => {
    const response = await httpRequest.get("/auth/check-phone", {
        params: {
            phone,
            exclude_id: excludeId,
        },
    });
    return response.exists;
};

export const checkUsername = async (username, excludeId = null) => {
    const response = await httpRequest.get("/auth/check-username", {
        params: { username, exclude_id: excludeId },
    });
    return response.exists;
};

export const getUserProfile = async (username) => {
    const response = await httpRequest.get(`/users/${username}`);
    return response;
};

export const updateUserProfile = async (username, data) => {
    const response = await httpRequest.put(`/users/${username}`, data);
    console.log(response);
    return response;
};

export default {
    getCurrentUser,
    login,
    logout,
    login2,
    checkEmail,
    getUserProfile,
    checkPhone,
    checkUsername,
    updateUserProfile,
};
