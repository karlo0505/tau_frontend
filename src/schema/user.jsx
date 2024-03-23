import * as yup from "yup";

export const userSchema = yup.object().shape({
    password: yup.string().required("Password is  required"),
    email: yup.string().required("Email address is required").email("Must be valid email address").trim(),
});