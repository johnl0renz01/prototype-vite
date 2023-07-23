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

export default function Login() {
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

  const navigate = useNavigate();

  //FOR LINKS/NAVBAR/BREADCRUMBS
  const [pageList, setPageList] = useState([]);
  const [pageLink, setPageLink] = useState([]);

  useEffect(() => {
    window.localStorage.removeItem('SESSION_ID');
    window.localStorage.removeItem('ACCOUNT_TYPE');
    window.localStorage.removeItem('CURRENT_TAB_INDEX');
  }, []);

  useEffect(() => {
    window.localStorage.setItem('NAVBAR_PAGE', JSON.stringify(pageList));
  }, [pageList]);

  useEffect(() => {
    window.localStorage.setItem('NAVBAR_PAGE_LINK', JSON.stringify(pageLink));
  }, [pageLink]);

  //RESET SESSION VARIABLES
  useEffect(() => {
    window.localStorage.setItem('SESSION_EMAIL', JSON.stringify(''));
    window.localStorage.setItem('SESSION_USER', JSON.stringify(''));
    window.localStorage.setItem('SESSION_ID', JSON.stringify(''));
    window.localStorage.setItem('LOGIN_TYPE', JSON.stringify('Student'));
  }, []);

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
    //console.log(accountType);
    let isStudent = false;
    let isAdmin = false;
    axios
      .post(
        `http://localhost:80/Prototype-Vite/my-project/api/${accountType}/save`,
        values
      )
      .then(function (response) {
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
        }

        if (isStudent) {
          var data = '';
          var email = JSON.parse(window.localStorage.getItem('SESSION_EMAIL'));
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
              window.localStorage.setItem('ACCOUNT_TYPE', JSON.stringify(data));

              if (data == 'Student') {
                navigate('/Homepage');
              } else if (data == 'Teacher') {
                navigate('/HomePageTeacher');
                //reloadPage();
              }
            });
        } else if (isAdmin) {
          var data = 'Admin';
          window.localStorage.setItem('ACCOUNT_TYPE', JSON.stringify(data));
          navigate('/HomePageAdmin');
          //reloadPage();
        }
      });

    await new Promise(resolve => setTimeout(resolve, 1));
    actions.resetForm();
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
    errors,
    touched,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
      username: '',
    },
    //Page Validation Form
    validationSchema: loginSchema,
    onSubmit,
  });
  //console.log(errors);

  const changeAccountType = () => {
    setAccountValidation('');
    if (accountType == 'loginAdmin') {
      values.email = '';
      touched.email = false;

      accountType = 'loginStudent';
      window.localStorage.setItem('LOGIN_TYPE', JSON.stringify('Student'));
      setAccType('Student');
    } else {
      values.username = '';
      touched.username = false;

      accountType = 'loginAdmin';
      window.localStorage.setItem('LOGIN_TYPE', JSON.stringify('Admin'));
      setAccType('Admin');
    }
    touched.password = false;
    values.password = '';
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

  return (
    <>
      <div className="h-[calc(100vh-27.5vh)] flex items-center ">
        <div className="mx-auto w-full  grid place-items-center">
          <div
            className="mt-16 
            hdScreen:w-[30%] semihdScreen:w-[35%] laptopScreen:w-[40%] averageScreen:w-[42.5%] 
            hdScreen:scale-100 semihdScreen:scale-95 laptopScreen:scale-85 averageScreen:scale-80
          bg-white rounded-2xl shadow-md relative"
          >
            <div className="lg:pb-16 xs:pb-10  px-10 rounded-3xl">
              <div className="lg:text-4xl  sm:text-2xl xs:text-xl text-gray-700 font-bold text-center">
                <i className=" fas fa-graduation-cap  lg:text-[5rem] lg:pt-10 xs:pt-4 pb-4"></i>
              </div>
              <hr />
              <div className="lg:text-4xl sm:text-2xl xs:text-lg text-gray-700 font-bold text-center">
                <div className="pt-4 pb-2 select-none">
                  {accType == 'Student' ? 'Account Login' : 'Admin Login'}
                </div>
              </div>

              <div className="p-1 rounded-xl lg:text-2xl xs:text-base grid place-items-center text-gray-400">
                <h1 className="select-none">(Log-in to your account)</h1>
                <p className="select-none text-red-500 text-center lg:text-lg sm:text-sm xs:text-xs pt-6 ">
                  {accType == 'Student'
                    ? accountValidation == '"Invalid"'
                      ? 'Invalid email or password. Please try again.'
                      : '\u00A0'
                    : accountValidation == '"Invalid"'
                    ? 'Invalid username or password. Please try again.'
                    : '\u00A0'}
                </p>
              </div>

              <div className="">
                <form onSubmit={handleSubmit} className="">
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
                            ? 'lastname.firstname@sanfrancisco.edu.ph'
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
                        LOG-IN{' '}
                      </span>
                    </button>
                  </div>
                  <div className="w-full text-center">
                    <span
                      className={` cursor-pointer lg:text-lg sm:text-base xs:text-xs text-lime-800 hover:underline ${
                        accType == 'Student' ? 'visible' : 'invisible'
                      }`}
                    >
                      Forgot Password?
                    </span>
                  </div>
                  <div className="">
                    <button
                      onClick={function () {
                        changeAccountType();
                      }}
                      type="button"
                      className="absolute bottom-0 right-0 px-2 rounded-br-2xl text-gray-500 lg:text-sm xs:text-xs opacity-0 hover:opacity-100"
                    >
                      {accType == 'Student' ? 'Admin' : 'School'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
