import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

import { useFormik } from 'formik';
import { loginSchema } from '../schemas';

import { VscEyeClosed } from 'react-icons/vsc';
import { VscEye } from 'react-icons/vsc';

import { VscCheckAll, VscPassFilled } from 'react-icons/vsc';

import { BsXCircleFill } from 'react-icons/bs';

import SetPasswordMessageModal from './SetPasswordMessageModal';

export default function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    var logged = JSON.parse(window.localStorage.getItem('LOGGED'));
    if (logged === null) logged = '';
    console.log(logged);

    if (logged == 'TRUE') {
      var accountType = JSON.parse(window.localStorage.getItem('ACCOUNT_TYPE'));
      if (accountType === null) accountType = '';
      console.log('asdad');
      if (accountType !== null) {
        if (accountType == 'Teacher') {
          navigate('/HomePageTeacher');
        } else if (accountType == 'Student') {
          navigate('/Homepage');
        } else if (accountType == 'Admin') {
          navigate('/HomePageAdmin');
        }
      }
    } else {
      sessionStorage.clear();
      window.localStorage.setItem('ACCOUNT_TYPE', JSON.stringify(''));
      window.localStorage.setItem('SESSION_EMAIL', JSON.stringify(''));
      window.localStorage.setItem('SESSION_USER', JSON.stringify(''));
      window.localStorage.setItem('LOGIN_TYPE', JSON.stringify('Student'));
      window.localStorage.setItem('SESSION_FULLNAME', JSON.stringify(''));

      window.localStorage.setItem('IS_CLOSED', false);
    }
  }, []);

  document.body.style.height = '100vh';
  document.body.style.backgroundImage =
    'linear-gradient(to top, #bef264, #d9f99d , #ccf779)';

  useEffect(() => {
    document.body.style.backgroundImage =
      'linear-gradient(to top, #bef264, #d9f99d , #ccf779)';

    window.addEventListener('load', changeBG);

    function changeBG() {
      document.body.style.backgroundImage =
        'linear-gradient(to top, #bef264, #d9f99d , #ccf779)';
    }
  }, []);

  useEffect(() => {
    document.body.style.backgroundImage =
      'linear-gradient(to top, #bef264, #d9f99d , #ccf779)';

    window.addEventListener('focus', changeBG);
    window.addEventListener('load', changeBG);
    window.addEventListener('click', changeBG);
  });

  function changeBG() {
    document.body.style.backgroundImage =
      'linear-gradient(to top, #bef264, #d9f99d , #ccf779)';
  }

  //END END END END END END END END END END END END

  // FOR LOGIN

  const [accountValidation, setAccountValidation] = useState('');

  const [accType, setAccType] = useState('Student');
  var accountType = 'loginStudent';

  useEffect(() => {
    const data = window.localStorage.getItem('LOGIN_TYPE');
    if (data !== null) setAccType(JSON.parse(data));
    accountType = 'login' + JSON.parse(data);
    //console.log("acctype: " + accountType);
    //console.log(accountType == "loginStudent");

    checkData();
    function checkData() {
      if (accountType == 'loginStudent') {
        values.username = 'randomstring';
      } else {
        values.email = 'randomstring@random';
      }
    }
  });

  const onSubmit = async (values, actions) => {
    console.log(accountType);
    let isStudent = false;
    let isAdmin = false;

    let firstLogin = false;
    axios
      .post(
        `http://localhost:80/Prototype-Vite/my-project/api/${accountType}/save`,
        values
      )
      .then(function (response) {
        let message = response.data;
        if (typeof message === 'string') {
          message = message.replace(/"/g, '');
        }

        console.log(message);
        if (message == 'setPassword') {
          firstLogin = true;
          setNewPass(true);
        } else {
          console.log(response.data);
          var currentData = JSON.stringify(response.data);
          setAccountValidation(currentData);
          //console.log("CURRDATA:" + currentData);
          currentData = currentData.replace('{', '');
          currentData = currentData.replace('}', '');
          currentData = currentData.replace('"GivenName":', '');
          currentData = currentData.replace('"Email":', '');
          currentData = currentData.replace('"Password":', '');
          currentData = currentData.replace('"GroupType":', '');
          currentData = currentData.replace('"MiddleName":', '');
          currentData = currentData.replace('"LastName":', '');

          var userData = [];
          convertStringToArray();
          function convertStringToArray() {
            let firstIndex = 0;
            let endIndex = 0;
            for (let i = 0; i < currentData.length; i++) {
              let isEnd = false;
              if (currentData[i] == ',') {
                firstIndex = 0;
                endIndex = 0;
                continue;
              }

              if (currentData[i] == '"') {
                if (firstIndex == 0) {
                  firstIndex = i + 1;
                } else {
                  endIndex = i;
                  isEnd = true;
                }
              }
              if (isEnd) {
                //console.log(currentData.substring(firstIndex, endIndex));
                userData.push(currentData.substring(firstIndex, endIndex));
                isEnd = false;
              }
            }
          }

          console.log(currentData);
          if (currentData != '"Invalid"') {
            window.localStorage.setItem('LOGGED', JSON.stringify('TRUE'));

            if (currentData.includes(',')) {
              window.localStorage.setItem(
                'SESSION_USER',
                JSON.stringify(userData[0])
              );
              window.localStorage.setItem(
                'SESSION_EMAIL',
                JSON.stringify(userData[1])
              );

              window.localStorage.setItem(
                'SYSTEM_VERSION',
                JSON.stringify(userData[3])
              );

              var firstName = JSON.stringify(userData[0]);
              firstName = firstName.replace(/"/g, '');

              var middleName = JSON.stringify(userData[4]);
              middleName = middleName.replace(/"/g, '');

              var lastName = JSON.stringify(userData[5]);
              lastName = lastName.replace(/"/g, '');

              var fullName = '';
              if (middleName != '') {
                fullName = firstName + ' ' + middleName + ' ' + lastName;
              } else {
                fullName = firstName + ' ' + lastName;
              }

              window.localStorage.setItem(
                'SESSION_FULLNAME',
                JSON.stringify(fullName)
              );

              //window.alert(fullName);

              var emailString = userData[1];
              for (let i = 0; i < emailString.length; i++) {
                if (emailString[i].match(/[\@]/)) {
                  emailString = emailString.substring(0, i);
                  emailString = emailString.replace('.', '_');
                  break;
                }
              }
              window.localStorage.setItem(
                'SESSION_USER_LOGS',
                JSON.stringify(emailString)
              );

              isStudent = true;
            } else if (currentData != '""' && currentData != '[]') {
              currentData = currentData.replace(/"/g, '');
              window.localStorage.setItem(
                'SESSION_USER',
                JSON.stringify(currentData)
              );
              window.localStorage.setItem('SESSION_EMAIL', JSON.stringify(''));
              isAdmin = true;
            }

            //IS CLOSED
            window.localStorage.setItem('IS_CLOSED', false);

            axios
              .post(
                `http://localhost:80/Prototype-Vite/my-project/api/loginSession/save`,
                values
              )
              .then(function (response) {
                console.log(response.data);
                let currentData = JSON.stringify(response.data);
                setAccountValidation(currentData);
                //console.log("CURRDATA:" + currentData);
                currentData = currentData.replace('{', '');
                currentData = currentData.replace('}', '');
                currentData = currentData.replace('"UniqueID":', '');

                let userData = [];
                convertStringToArray();
                function convertStringToArray() {
                  let firstIndex = 0;
                  let endIndex = 0;
                  for (let i = 0; i < currentData.length; i++) {
                    let isEnd = false;
                    if (currentData[i] == ',') {
                      firstIndex = 0;
                      endIndex = 0;
                      continue;
                    }

                    if (currentData[i] == '"') {
                      if (firstIndex == 0) {
                        firstIndex = i + 1;
                      } else {
                        endIndex = i;
                        isEnd = true;
                      }
                    }
                    if (isEnd) {
                      //console.log(currentData.substring(firstIndex, endIndex));
                      userData.push(
                        currentData.substring(firstIndex, endIndex)
                      );
                      isEnd = false;
                    }
                  }
                }
                window.localStorage.setItem(
                  'UNIQUE_ID',
                  JSON.stringify(userData[0])
                );

                if (isStudent) {
                  var data = '';
                  var email = JSON.parse(
                    window.localStorage.getItem('SESSION_EMAIL')
                  );
                  if (email === null) email = '';
                  console.log(email);
                  axios
                    .post(
                      `http://localhost:80/Prototype-Vite/my-project/api/validateLogin/${email}`,
                      values
                    )
                    .then(function (response) {
                      console.log(response.data);
                      data = JSON.stringify(response.data);
                      data = data.replace(/"/g, '');
                      data = data.replace(/\\/g, '');
                      console.log(data);
                      window.localStorage.setItem(
                        'ACCOUNT_TYPE',
                        JSON.stringify(data)
                      );

                      if (data == 'Student') {
                        navigate('/Homepage');
                      } else if (data == 'Teacher') {
                        var fullName = JSON.parse(
                          window.localStorage.getItem('SESSION_FULLNAME')
                        );
                        if (fullName === null) fullName = '';
                        fullName = fullName.replace(/ /g, '_');
                        axios
                          .get(
                            `http://localhost:80/Prototype-Vite/my-project/api/teacherLoginSection/${fullName}`
                          )
                          .then(function (response) {
                            console.log(response.data);
                            var section = response.data;
                            window.localStorage.setItem(
                              'CURRENT_SECTION',
                              JSON.stringify(section)
                            );
                            window.localStorage.setItem('LINK_TAB', 0);
                            navigate('/HomePageTeacher');
                          });

                        //reloadPage();
                      }
                    });
                } else if (isAdmin) {
                  var data = 'Admin';
                  window.localStorage.setItem(
                    'ACCOUNT_TYPE',
                    JSON.stringify(data)
                  );
                  navigate('/HomePageAdmin');
                  //reloadPage();
                }
              });
          }
        }

        if (!firstLogin) {
          actions.resetForm();
        }
      });
    await new Promise(resolve => setTimeout(resolve, 1));
  };

  function reloadPage() {
    setTimeout(function () {
      window.location.reload(false);
    }, 180);
  }

  const {
    values,
    handleBlur,
    isSubmitting,
    handleChange,
    handleSubmit,
    handleReset,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
      username: '',

      newPassword: 'default',
      confirmPassword: 'default',

      validNew: false,
      validConfirm: false,
    },
    //Page Validation Form
    validationSchema: loginSchema,
    onSubmit,
  });

  //console.log(errors);

  const changeAccountType = () => {
    handleReset();
    setAccountValidation('');
    if (accountType == 'loginAdmin') {
      values.email = '';
      touched.email = false;

      accountType = 'loginStudent';
      window.localStorage.setItem('LOGIN_TYPE', JSON.stringify('Student'));
      setAccType('Student');
      values.username = 'random';
    } else {
      values.username = '';
      touched.username = false;

      accountType = 'loginAdmin';
      window.localStorage.setItem('LOGIN_TYPE', JSON.stringify('Admin'));
      setAccType('Admin');
      values.email = 'randomstring@random';
    }
    touched.password = false;
    values.password = '';
    values.newPassword = 'default';
    values.confirmPassword = 'default';
  };

  const [passwordState, setPasswordState] = useState(false);
  const passwordElement = document.getElementById('password');

  const showPassword = () => {
    if (passwordState) {
      setPasswordState(false);
      ReactDOM.findDOMNode(passwordElement).type = 'password';
    } else {
      setPasswordState(true);
      ReactDOM.findDOMNode(passwordElement).type = 'text';
    }
  };

  // SET NEW PASSWORD

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordValidation, setPasswordValidation] = useState(true);
  const [validNewPass, setValidNewPass] = useState(true);
  const [validConfirmPass, setValidConfirmPass] = useState(true);

  function onlyLettersAndNumbers(str) {
    return Boolean(str.match(/^[A-Za-z0-9]*$/));
  }

  const newPasswordChange = event => {
    const value = event.target.value;
    if (onlyLettersAndNumbers(value)) {
      setValidNewPass(true);
      values.validNew = true;
    } else {
      setValidNewPass(false);
      values.validNew = false;
    }

    if (value == '') {
      setValidNewPass(true);
      values.validNew = false;
    }

    values.newPassword = value;
    setNewPassword(value);
    handleChange.newPassword;
    handleChange.validNew;

    if (value == values.confirmPassword) {
      setValidConfirmPass(true);
      values.validConfirm = true;
    } else {
      setValidConfirmPass(false);
      values.validConfirm = false;
    }
    handleChange.validConfirm;

    //UPDATE INSTANTLY
    document.getElementById('newPassword').focus();
    document.getElementById('newPassword').blur();
    document.getElementById('newPassword').focus();
  };

  const confirmPasswordChange = event => {
    const value = event.target.value;
    if (value == values.newPassword) {
      setValidConfirmPass(true);
      values.validConfirm = true;
    } else {
      setValidConfirmPass(false);
      values.validConfirm = false;
    }

    values.confirmPassword = value;
    setConfirmPassword(value);
    handleChange.confirmPassword;
    handleChange.validConfirm;

    //UPDATE INSTANTLY
    document.getElementById('confirmPassword').focus();
    document.getElementById('confirmPassword').blur();
    document.getElementById('confirmPassword').focus();
  };

  const submitNewPassword = () => {
    let passwordNew = values.newPassword;
    let email = values.email;
    if (values.validNew && values.validConfirm) {
      axios
        .post(
          `http://localhost:80/Prototype-Vite/my-project/api/setNewPassword/${email}@${passwordNew}`
        )
        .then(function (response) {
          setShowModal(true);
        });
    }
  };

  // PASSWORD SET MODAL
  const [showModal, setShowModal] = useState(false);
  const handleOnCloseModal = () => setShowModal(false);

  const [newPass, setNewPass] = useState(false);
  const [forgotPass, setForgotPass] = useState(false);
  const [accountFor, setAccountFor] = useState('Student');

  return (
    <>
      <div className="hdScreen:h-[calc(100vh-27.5vh)] semihdScreen:h-[calc(100vh-27.5vh)] laptopScreen:h-[calc(100vh-20vh)] averageScreen:h-[calc(100vh-17.5vh)] flex items-center ">
        <div className="mx-auto w-full  grid place-items-center">
          <div
            className="mt-16 
            hdScreen:w-[30%] semihdScreen:w-[35%] laptopScreen:w-[40%] averageScreen:w-[42.5%] 
            hdScreen:scale-100 semihdScreen:scale-95 laptopScreen:scale-85 averageScreen:scale-80
          bg-white rounded-2xl shadow-md relative"
          >
            <div className="lg:pb-16 xs:pb-10  px-10 rounded-3xl">
              <div className="hdScreen:text-4xl semihdScreen:text-4xl laptopScreen:text-3xl  averageScreen:text-3xl  sm:text-2xl xs:text-xl text-gray-700 font-bold text-center">
                <i className=" fas fa-graduation-cap  hdScreen:text-[5rem] semihdScreen:text-[4.5rem] laptopScreen:text-[4rem] averageScreen:text-[3.75rem] lg:pt-10 xs:pt-4 pb-4"></i>
              </div>
              <hr />
              <div className="hdScreen:text-4xl semihdScreen:text-4xl laptopScreen:text-3xl  averageScreen:text-3xl sm:text-2xl xs:text-lg text-gray-700 font-bold text-center">
                <div className="pt-4 pb-2 select-none">
                  {newPass ? (
                    <>Set New Password</>
                  ) : forgotPass ? (
                    <>Forgot Password</>
                  ) : (
                    <>
                      {accType == 'Student' ? 'Account Login' : 'Admin Login'}
                    </>
                  )}
                </div>
              </div>

              <div className="p-1 rounded-xl lg:text-2xl xs:text-base grid place-items-center text-gray-400">
                <h1 className="select-none">
                  (
                  {newPass ? (
                    <>Fill-up required details</>
                  ) : forgotPass ? (
                    <>Fill-up required details</>
                  ) : (
                    <>Log-in to your account</>
                  )}
                  )
                </h1>

                {newPass ? (
                  <div className="pt-4"></div>
                ) : forgotPass ? (
                  <div className="pt-4 w-full">
                    <p className="lg:text-lg text-center py-2 text-gray-800">
                      Select the account type for password reset.
                    </p>
                    <div className="flex  ">
                      <button
                        onClick={e => setAccountFor('Student')}
                        className={`grow text-base lg:px-4 xs:px-1 py-1 rounded-lg  border-2   transition duration-200 ${
                          accountFor == 'Student'
                            ? 'bg-gray-500/80 text-white font-semibold border-gray-500/80'
                            : 'bg-gray-100 hover:bg-gray-500/80 text-gray-500  border-gray-300 hover:border-gray-500/80  hover:text-white'
                        }`}
                      >
                        Student
                      </button>
                      <button
                        onClick={e => setAccountFor('Teacher')}
                        className={`grow text-base ml-4 lg:px-4 xs:px-1 rounded-lg border-2  transition duration-200 ${
                          accountFor == 'Teacher'
                            ? 'bg-gray-500/80 text-white font-semibold border-gray-500/80'
                            : 'bg-gray-100 hover:bg-gray-500/80 text-gray-500  border-gray-300 hover:border-gray-500/80  hover:text-white'
                        }`}
                      >
                        Teacher
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="select-none text-red-500 text-center lg:text-lg sm:text-sm xs:text-xs pt-6 ">
                    {accType == 'Student'
                      ? accountValidation == '"Invalid"'
                        ? 'Invalid email or password. Please try again.'
                        : '\u00A0'
                      : accountValidation == '"Invalid"'
                      ? 'Invalid username or password. Please try again.'
                      : '\u00A0'}
                  </p>
                )}
              </div>

              <div className="">
                <form
                  onSubmit={handleSubmit}
                  className={`${
                    newPass ? 'hidden' : forgotPass ? 'hidden' : ''
                  }`}
                >
                  {/* Email Input */}

                  <div className="text-left">
                    <div className="">
                      <div className="inline-flex ">
                        <label
                          className={`mr-2 lg:text-lg sm:text-base xs:text-xs mt-1.5 font-semibold ${
                            accType == 'Student' ? 'ml-1 pl-0.5' : 'ml-1 pl-0.5'
                          }`}
                          htmlFor={accType == 'Student' ? 'email' : 'username'}
                        >
                          {accType == 'Student' ? 'Email:' : 'Username:'}
                        </label>
                        <div className="mt-2">
                          {accType == 'Student'
                            ? errors.email &&
                              touched.email && (
                                <p className="text-red-500 flex-w lg:text-base xs:text-xs">
                                  {errors.email}
                                </p>
                              )
                            : errors.username &&
                              touched.username && (
                                <p className="text-red-500 flex-w lg:text-base xs:text-xs">
                                  {errors.username}
                                </p>
                              )}
                        </div>
                      </div>

                      <input
                        onFocus={function () {
                          setAccountValidation('');
                        }}
                        className={`bg-[#e0e0e0] rounded-xl w-full lg:text-lg sm:text-base xs:text-xs text-gray-700 px-4  py-1.5   ${
                          accType == 'Student'
                            ? errors.email && touched.email
                              ? ' border-red-500 focus:border-red-500 border-2 border-solid'
                              : ''
                            : errors.username && touched.username
                            ? ' border-red-500 focus:border-red-500 border-2 border-solid'
                            : ''
                        }`}
                        type={accType == 'Student' ? 'email' : 'text'}
                        name={accType == 'Student' ? 'email' : 'username'}
                        placeholder={
                          accType == 'Student'
                            ? 'lastname.firstname@sf.edu.ph'
                            : 'Enter your username'
                        }
                        autoComplete="off"
                        /* Formik email validation Section  */

                        value={
                          accType == 'Student' ? values.email : values.username
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="my-1 text-left h-20">
                    <div className="relative">
                      <div className="inline-flex ">
                        <label
                          htmlFor="password"
                          className="mr-2 lg:text-lg sm:text-base xs:text-xs mt-1.5 ml-1 font-semibold"
                        >
                          {' '}
                          Password:{' '}
                        </label>

                        <div className="mt-2">
                          {errors.password && touched.password && (
                            <p className="text-red-500 flex-w lg:text-base xs:text-xs">
                              {errors.password}
                            </p>
                          )}
                        </div>
                      </div>
                      <input
                        id="password"
                        onFocus={function () {
                          setAccountValidation('');
                        }}
                        className={` bg-[#e0e0e0] rounded-xl w-full lg:text-lg sm:text-base xs:text-xs text-gray-700 px-4 pr-10 py-1.5 mr-3 ${
                          errors.password && touched.password
                            ? ' border-red-500 focus:border-red-500 border-2 border-solid'
                            : ''
                        } `}
                        type="password"
                        name="password"
                        placeholder="Input password"
                        autoComplete="off"
                        /* Formik password validation Section */

                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {passwordState ? (
                        <VscEye
                          onClick={showPassword}
                          className="text-gray-500 cursor-pointer absolute right-4 lg:top-[2.8rem] sm:top-[2.6rem] xs:top-[2.2rem] lg:text-xl sm:text-base xs:text-xs hover:text-black"
                        />
                      ) : (
                        <VscEyeClosed
                          onClick={showPassword}
                          className="text-gray-500 cursor-pointer absolute right-4 lg:top-[2.8rem] sm:top-[2.6rem]  xs:top-[2.2rem] lg:text-xl sm:text-base xs:text-xs hover:text-black"
                        />
                      )}
                    </div>
                  </div>

                  {/* Login Button */}
                  <div className=" mt-8 mb-3 text-center w-full ">
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="bg-lime-600 rounded-2xl w-1/2 py-2 lg:lg:text-lg sm:text-base xs:text-xs sm:text-md font-semibold hover:bg-lime-700 text-white ease-in-out transition duration-200 transform drop-shadow-[0_3px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_3px_0px_rgba(0,0,0,0.6)]"
                    >
                      <span className="lg:text-xl sm:text-base xs:text-xs font-semibold">
                        LOG-IN
                      </span>
                    </button>
                  </div>
                </form>
                {/* Set New Password */}
                {newPass ? (
                  <div className="mt-2">
                    <div className="border-2 border-gray-400 p-4 pb-6 rounded-xl">
                      <p className="text-justify">
                        The password must be at least 8 characters long, and it
                        must not contain any special characters or spaces.
                      </p>
                      {/* New Password Input */}
                      <div className="my-1 text-left h-20">
                        <div className="relative">
                          <div className="inline-flex ">
                            <label
                              htmlFor="newPassword"
                              className="mr-2 lg:text-lg sm:text-base xs:text-xs mt-1.5 ml-1 font-semibold"
                            >
                              {' '}
                              New Password:{' '}
                            </label>

                            <div className="mt-2">
                              {errors.newPassword && touched.newPassword ? (
                                <p className="text-red-500 flex-w lg:text-base xs:text-xs">
                                  {errors.newPassword}
                                </p>
                              ) : newPassword == '' ? (
                                <></>
                              ) : validNewPass ? (
                                <div className="text-lime-600 flex lg:text-base xs:text-xs">
                                  <VscPassFilled className="mt-1.5 mr-1 lg:text-sm text-lime-600" />
                                  Valid
                                </div>
                              ) : (
                                <div className="text-red-500 flex lg:text-base xs:text-xs">
                                  <BsXCircleFill className="mt-1.5 mr-1 lg:text-sm text-red-500" />
                                  Invalid
                                </div>
                              )}
                            </div>
                          </div>
                          <input
                            onFocus={function () {
                              setPasswordValidation(true);
                            }}
                            id="newPassword"
                            className={` bg-[#e0e0e0] rounded-xl w-full lg:text-lg sm:text-base xs:text-xs text-gray-700 px-4 pr-10 py-1.5 mr-3 ${
                              errors.newPassword && touched.newPassword
                                ? ' border-red-500 focus:border-red-500 border-2 border-solid'
                                : ''
                            } `}
                            type="password"
                            name="newPassword"
                            placeholder="Input password"
                            autoComplete="off"
                            /* Formik password validation Section */

                            value={newPassword}
                            onChange={newPasswordChange}
                            onBlur={handleBlur}
                          />
                        </div>
                      </div>
                      {/* Confirm Password Input */}
                      <div className="my-1 text-left h-20">
                        <div className="relative">
                          <div className="inline-flex ">
                            <label
                              htmlFor="confirmPassword"
                              className="mr-2 lg:text-lg sm:text-base xs:text-xs mt-1.5 ml-1 font-semibold"
                            >
                              {' '}
                              Confirm Password:{' '}
                            </label>

                            <div className="mt-2">
                              {errors.confirmPassword &&
                              touched.confirmPassword ? (
                                <p className="text-red-500 flex-w lg:text-base xs:text-xs">
                                  {errors.confirmPassword}
                                </p>
                              ) : confirmPassword == '' ? (
                                <></>
                              ) : validConfirmPass ? (
                                <div className="text-lime-600 flex lg:text-base xs:text-xs">
                                  <VscPassFilled className="mt-1.5 mr-1 lg:text-sm text-lime-600" />
                                  Matched
                                </div>
                              ) : (
                                <div className="text-red-500 flex lg:text-base xs:text-xs">
                                  <BsXCircleFill className="mt-1.5 mr-1 lg:text-sm text-red-500" />
                                  Not matched
                                </div>
                              )}
                            </div>
                          </div>
                          <input
                            onFocus={function () {
                              setPasswordValidation(true);
                            }}
                            className={` bg-[#e0e0e0] rounded-xl w-full lg:text-lg sm:text-base xs:text-xs text-gray-700 px-4 pr-10 py-1.5 mr-3 ${
                              errors.confirmPassword && touched.confirmPassword
                                ? ' border-red-500 focus:border-red-500 border-2 border-solid'
                                : ''
                            } `}
                            id="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            autoComplete="off"
                            /* Formik password validation Section */

                            value={confirmPassword}
                            onChange={confirmPasswordChange}
                            onBlur={handleBlur}
                          />
                        </div>
                      </div>
                    </div>

                    <div className=" mt-7 text-center w-full ">
                      <button
                        onClick={submitNewPassword}
                        className="bg-lime-600 rounded-2xl w-1/2 py-2 lg:lg:text-lg sm:text-base xs:text-xs sm:text-md font-semibold hover:bg-lime-700 text-white ease-in-out transition duration-200 transform drop-shadow-[0_3px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_3px_0px_rgba(0,0,0,0.6)]"
                      >
                        <span className="lg:text-xl sm:text-base xs:text-xs font-semibold">
                          SUBMIT
                        </span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <></>
                )}

                {forgotPass ? (
                  <div className="mt-2">
                    <div className="border-2 border-gray-400 p-4 pb-6 rounded-xl">
                      <p>
                        To request a password reset as a student, please enter
                        your email address below. After that, click on submit.
                      </p>
                      <input
                        className={`mt-2 bg-[#e0e0e0] rounded-xl w-full lg:text-lg sm:text-base xs:text-xs text-gray-700 px-4  py-1.5   
                          `}
                        type="email"
                        placeholder="lastname.firstname@sf.edu.ph"
                        autoComplete="off"
                      />
                    </div>

                    <div className=" mt-4 mb-3 text-center w-full ">
                      <button
                        disabled={isSubmitting}
                        type="submit"
                        className="bg-lime-600 rounded-2xl w-1/2 py-2 lg:lg:text-lg sm:text-base xs:text-xs sm:text-md font-semibold hover:bg-lime-700 text-white ease-in-out transition duration-200 transform drop-shadow-[0_3px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_3px_0px_rgba(0,0,0,0.6)]"
                      >
                        <span className="lg:text-xl sm:text-base xs:text-xs font-semibold">
                          SUBMIT
                        </span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <></>
                )}

                <div
                  className={`w-full text-center ${newPass ? 'hidden' : ''}`}
                >
                  <span
                    onClick={
                      forgotPass
                        ? e => setForgotPass(false)
                        : e => setForgotPass(true)
                    }
                    className={` cursor-pointer lg:text-lg sm:text-base xs:text-xs text-lime-800 hover:underline ${
                      accType == 'Student' ? 'visible' : 'invisible'
                    }`}
                  >
                    {forgotPass ? <>Back to login</> : <>Forgot Password?</>}
                  </span>
                </div>
                <div className="">
                  <button
                    onClick={function () {
                      changeAccountType();
                    }}
                    type="button"
                    className={`absolute bottom-0 right-0 px-2 rounded-br-2xl text-gray-500 lg:text-sm xs:text-xs  ${
                      newPass ? 'invisible' : forgotPass ? 'invisible' : ''
                    }`}
                  >
                    {accType == 'Student'
                      ? 'Are you an admin?'
                      : 'Go back to default.'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SetPasswordMessageModal
        onClose={handleOnCloseModal}
        visible={showModal}
      />
    </>
  );
}
