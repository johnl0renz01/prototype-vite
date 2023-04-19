import * as yup from "yup";

export const loginSchema = yup.object().shape({
  username: yup.string().required("* Username Required"),
  email: yup
    .string()
    .email("* Please enter a valid email")
    .required("* Email Required"),
  password: yup.string().required("* Password Required"),
});

export const registrationSchema = yup.object().shape({
  firstName: yup.string().required("* First Name Required"),
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

export const editAccountSchema = yup.object().shape({
  email: yup
    .string()
    .email("(Please enter a valid email)")
    .required("(Email Required)"),
  password: yup.string().required("(Password Required)"),
});

export const addSectionSchema = yup.object().shape({
  sectionName: yup.string().required("* Section Name is Required"),
  adviserName: yup.string().required("* Adviser Name is Required"),
  sex: yup.string().required("* Gender is Required"),
});
