import * as yup from "yup";
const loginSchema = yup
    .object({
        email: yup
            .string()
            .email("Vui lòng nhập đúng định dạng email")
            .required("Trường này là bắt buộc"),
        password: yup
            .string()
            .required("Trường này là bắt buộc")
            .min(8, "Mật khẩu cần ít nhất 8 ký tự"),
    })
    .required();

export default loginSchema;
