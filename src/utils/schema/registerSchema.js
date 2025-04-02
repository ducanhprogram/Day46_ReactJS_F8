// import authService from "@/services/authService";
import * as yup from "yup";
const registerSchema = yup
    .object({
        fullName: yup
            .string()
            .required("Họ và tên là bắt buộc")
            .min(2, "Họ và tên phải có ít nhất 2 ký tự"),
        email: yup
            .string()
            .required("Trường này là bắt buộc")
            .email("Email không đúng định dạng"),
        // .test("email", "Email đã được sử dụng...", async (value) => {
        //value là dữ liệu mà người dùng nhập vào ô input email trong form của bạn.

        //Nếu exists = true (email đã tồn tại) → !exists = false → Báo lỗi "Email đã được sử dụng...".
        //     const exists = await authService.checkEmail(value);
        //     return !exists;
        // }),
        password: yup
            .string()
            .required("Mật khẩu là bắt buốc")
            .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
        passwordConfirmation: yup
            .string()
            .required("Nhập lại mật khẩu là bắt buộc")
            .oneOf([yup.ref("password"), null], "Mật khẩu nhập lại không khớp"),

        // passwordConfirmation: yup
        //     .string()
        //     .required()
        //     .test(
        //         "passwordConfirmation",
        //         "Mật khẩu nhập lại không khớp",
        //         (value, context) => {
        //             return value === context.parent.password;
        //         }
        //     ),
    })
    .required();

export default registerSchema;

// https://api01.f8team.dev/api/auth/check-email?email=vinhnx@gmail.com
