import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  username: yup.string().required('* Username Required'),
  email: yup
    .string()
    .email('* Please enter a valid email')
    .required('* Email Required'),
  password: yup.string().required('* Password Required'),
  newPassword: yup.string().required('* Required Field'),
  confirmPassword: yup.string().required('* Required Field'),
});

export const registrationSchema = yup.object().shape({
  firstName: yup.string().required('* Required Field'),
  lastName: yup.string().required('* Required Field'),
  /*
  email: yup
    .string()
    .email('* Please enter a valid Email')
    .required('* Email Required'),
    */
  //age: yup.string().required('* Age Required'),
  //age: yup.number().positive().integer().required("* Age Required"),

  //password: yup
  //  .string()
  //  .min(6, '* Must be 6 characters or more')

  /* DIFFERENT
    .matches(/[a-z]+/, "* One lowercase character")
    .matches(/[A-Z]+/, "* One uppercase character")
    .matches(/[@$!%*#?&]+/, "* One special character")
    .matches(/\d+/, "* One number")
    */

  // .required('* Password Required'),
  // confirmPassword: yup
  // .string()
  // .oneOf([yup.ref('password'), null], '* Password must match'),
  //sex: yup.string().required('* Gender is Required'),
});

export const editAccountModalSchema = yup.object().shape({
  firstName: yup.string().required('* Required Field'),
  lastName: yup.string().required('* Required Field'),
  /*
  email: yup
    .string()
    .email('* Please enter a valid Email')
    .required('* Email Required'),
    */
});

export const editAccountSchema = yup.object().shape({
  email: yup
    .string()
    .email('(Please enter a valid email)')
    .required('(Email Required)'),
  password: yup.string().required('(Password Required)'),
});

export const editSectionSchema = yup.object().shape({
  editSectionName: yup.string().required('* Section Name is Required'),
  editAdviserName: yup.string().required('* Adviser Name is Required'),
  editAdviserSurname: yup.string().required('* Adviser Surname is Required'),
  editTitle: yup.string().required('* Title is Required'),
});

export const addSectionSchema = yup.object().shape({
  sectionName: yup.string().required('* Required Field'),
  adviserName: yup.string().required('* Select an Adviser'),
});

export const contactAdminSchema = yup.object().shape({
  subject: yup.string().required('* Please fill out this field.'),
  message: yup.string().required('* Please fill out this field.'),
});
