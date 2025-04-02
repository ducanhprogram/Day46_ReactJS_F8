import axios from "axios";
import { Navigate } from "react-router-dom";

//baseURL: Đường dẫn gốc của API

// httpRequest.request() trả về một Promise. Promise này sẽ:
// Resolve với dữ liệu từ server nếu yêu cầu thành công (truy cập qua .then()).
// Reject với lỗi nếu yêu cầu thất bại (xử lý qua .catch()).

const httpRequest = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

//config: Là đối tượng tùy chọn chứa các cầu hình bổ sung: headers, params, timeout, responseType, auth...

//data: Là dữ liệu bạn muốn gửi đi (thường là một object JSON), chỉ áp dụng cho các phương thức như POST, PUT, PATCH.

const send = async (method, url, data, config) => {
    const response = await httpRequest.request({
        method,
        url,
        data,
        ...config,
    });

    if (response.status >= 200 && response.status < 400) {
        return response.data;
    }

    //Handle errors
};
export const get = (url, config) => {
    return send("get", url, null, config);
};

export const post = (url, data, config) => {
    return send("post", url, data, config);
};

export const put = (url, data, config) => {
    return send("put", url, data, config);
};

export const patch = (url, data, config) => {
    return send("patch", url, data, config);
};

export const del = (url, config) => {
    return send("delete", url, null, config);
};

export const setToken = (token) => {
    if (token) {
        localStorage.setItem("token", token);
        httpRequest.defaults.headers["Authorization"] = `Bearer ${token}`;
    } else {
        localStorage.removeItem("token");
        delete httpRequest.defaults.headers["Authorization"];
    }
};

httpRequest.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            setToken(null); // Xóa token khi bị lỗi 401
            Navigate("/login"); // Chuyển hướng về login
        }
        return Promise.reject(error);
    }
);

export default {
    get,
    post,
    put,
    patch,
    del,
    setToken,
};
