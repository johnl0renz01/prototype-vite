import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email Required"),
  password: yup.string().required("Password required"),
});

export const registrationSchema = yup.object().shape({
  firstName: yup.string().required("* First Name Required"),
  middleName: yup.string().required("* Middle Name Required"),
  lastName: yup.string().required("* Last Name Required"),
  email: yup
    .string()
    .email("* Please enter a valid Email")
    .required("* Email Required"),
  age: yup.string().required("* Age Required"),
  //age: yup.number().positive().integer().required("* Age Required"),
  password: yup
    .string()
    .min(6, "* Must be 6 characters or more")
    /*
    .matches(/[a-z]+/, "* One lowercase character")
    .matches(/[A-Z]+/, "* One uppercase character")
    .matches(/[@$!%*#?&]+/, "* One special character")
    .matches(/\d+/, "* One number")
    */
    .required("* Password Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "* Password must match"),
  sex: yup.string().required("* Gender is Required"),
});
