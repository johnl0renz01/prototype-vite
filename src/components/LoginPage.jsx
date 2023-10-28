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
import ForgotPasswordMessageModal from './ForgotPasswordMessageModal';
import ForgotPassword from './ForgotPassword';

import LoginPageSkeleton from './LoginPageSkeleton';

import LoadingSpinner from './LoadingSpinner';

import DataGenerator from './DataGenerator';

import StorageData from './StorageData';
import SecureStorageData from './SecureStorageData';

export default function LoginPage() {
  const navigate = useNavigate();

  function checkLogged() {
    var logged = JSON.parse(window.localStorage.getItem('LOGGED'));

    if (logged === null) logged = '';

    if (
      window.location.pathname == '/LoginPage' ||
      window.location.pathname == '/'
    ) {
      if (logged == 'TRUE') {
        window.removeEventListener('focus', checkLogged);
        window.location.reload(false);
      }
    }
  }

  useEffect(() => {
    document.title = 'Log-in';

    var logged = JSON.parse(window.localStorage.getItem('LOGGED'));
    if (logged === null) logged = '';

    //console.log(logged);

    if (logged == 'TRUE') {
      var accountType = StorageData.localStorageJSON('ACCOUNT_TYPE');
      if (accountType === null) accountType = '';
      //console.log('asdad');
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
      window.addEventListener('focus', checkLogged);
      sessionStorage.clear();
      window.localStorage.removeItem('SESSION_TEACHER_TABLE');
      window.localStorage.removeItem('SESSION_ACCEPT_FRACTION');
      window.localStorage.removeItem('UPDATE_REQUEST_STATE');
      window.localStorage.setItem('ACCOUNT_TYPE', JSON.stringify(''));
      window.localStorage.setItem('SESSION_EMAIL', JSON.stringify(''));
      window.localStorage.setItem('SESSION_USER', JSON.stringify(''));
      window.localStorage.setItem('LOGIN_TYPE', JSON.stringify('Student'));
      window.localStorage.setItem('SESSION_FULLNAME', JSON.stringify(''));

      window.localStorage.setItem('IS_CLOSED', false);
    }
  }, []);

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

  const [showLoading, setShowLoading] = useState(false);

  // FOR LOGIN

  const [accountValidation, setAccountValidation] = useState('');

  const [accType, setAccType] = useState('Student');
  var accountType = 'loginStudent';

  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem('LOGIN_TYPE'));
    if (data !== null) {
      setAccType(data);
    }
    accountType = 'login' + data;
    ////console.log("acctype: " + accountType);
    ////console.log(accountType == "loginStudent");

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
    var isForgot = JSON.parse(window.sessionStorage.getItem('FORGOT_PASSWORD'));
    console.log(isForgot);

    if (isForgot) {
      //console.log('TESTING IM HERE');
      var type = JSON.parse(window.sessionStorage.getItem('RESET_TYPE'));
      console.log(type);
      type = type.replace(/"/g, '');
      if (type == 'Email') {
        //console.log('EMIALSADAS');
        setShowModal2(true);
      } else if (type == 'Code') {
        //console.log('COEDED');
      }
    } else {
      setShowLoading(true);
      let isStudent = false;
      let isAdmin = false;

      let firstLogin = false;
      //console.log(accountType);
      ///STOPPED HERE COTINUE CONTINUE
      axios
        .post(
          `http://localhost:80/Prototype-Vite/my-project/api/${accountType}/save`,
          values
        )
        .then(function (response) {
          console.log(response.data);
          let message = response.data;
          if (typeof message === 'string') {
            message = message.replace(/"/g, '');
          }

          //console.log(message);
          if (message == 'setPassword') {
            firstLogin = true;
            setShowLoading(false);
            setNewPass(true);
          } else {
            //console.log(response.data);
            var currentData = JSON.stringify(response.data);
            setAccountValidation(currentData);
            ////console.log('CURRDATA:' + currentData);
            currentData = currentData.replace('{', '');
            currentData = currentData.replace('}', '');
            currentData = currentData.replace('"GivenName":', '');
            currentData = currentData.replace('"Email":', '');
            currentData = currentData.replace('"Password":', '');
            currentData = currentData.replace('"GroupType":', '');
            currentData = currentData.replace('"MiddleName":', '');
            currentData = currentData.replace('"LastName":', '');
            currentData = currentData.replace('"Section":', '');
            currentData = currentData.replace('"SubscriptionType":', '');

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
                  ////console.log(currentData.substring(firstIndex, endIndex));
                  userData.push(currentData.substring(firstIndex, endIndex));
                  isEnd = false;
                }
              }
            }

            ////console.log(currentData);
            if (currentData != '"Invalid"') {
              window.localStorage.setItem('LOGGED', JSON.stringify('TRUE'));

              if (currentData.includes(',')) {
                window.localStorage.setItem(
                  'SESSION_USER',
                  JSON.stringify(SecureStorageData.dataEncryption(userData[0]))
                );
                window.localStorage.setItem(
                  'SESSION_EMAIL',
                  JSON.stringify(SecureStorageData.dataEncryption(userData[1]))
                );
                /*
                window.localStorage.setItem(
                  'SESSION_SECTION_NAME',
                  JSON.stringify(userData[6])
                );
                */
                window.localStorage.setItem(
                  'SYSTEM_VERSION',
                  JSON.stringify(SecureStorageData.dataEncryption(userData[3]))
                );

                var sectionName = userData[6];
                sectionName = sectionName.replace(/"/g, '');
                sectionName = sectionName.replace(/ /g, '_');

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
                  JSON.stringify(SecureStorageData.dataEncryption(fullName))
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
                  JSON.stringify(SecureStorageData.dataEncryption(emailString))
                );

                isStudent = true;
              } else if (currentData != '""' && currentData != '[]') {
                currentData = currentData.replace(/"/g, '');
                window.localStorage.setItem(
                  'SESSION_USER',
                  JSON.stringify(SecureStorageData.dataEncryption(currentData))
                );
                window.localStorage.setItem(
                  'SESSION_EMAIL',
                  JSON.stringify('')
                );
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
                  ////console.log(response.data);
                  let currentData = JSON.stringify(response.data);
                  setAccountValidation(currentData);
                  ////console.log("CURRDATA:" + currentData);
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
                        ////console.log(currentData.substring(firstIndex, endIndex));
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
                    var email = StorageData.localStorageJSON('SESSION_EMAIL');

                    if (email === null) email = '';
                    ////console.log(email);
                    axios
                      .post(
                        `http://localhost:80/Prototype-Vite/my-project/api/validateLogin/${email}`,
                        values
                      )
                      .then(function (response) {
                        //console.log(response.data);
                        data = JSON.stringify(response.data);
                        data = data.replace(/"/g, '');
                        data = data.replace(/\\/g, '');
                        //console.log(data);
                        window.localStorage.setItem(
                          'ACCOUNT_TYPE',
                          JSON.stringify(SecureStorageData.dataEncryption(data))
                        );

                        if (data == 'Student') {
                          axios
                            .post(
                              `http://localhost:80/Prototype-Vite/my-project/api/getAdviserTable/${sectionName}`
                            )
                            .then(function (response) {
                              ////console.log(response.data);
                              if (response.data == 'No-Section') {
                                window.localStorage.setItem(
                                  'SESSION_TEACHER_TABLE',
                                  JSON.stringify(
                                    SecureStorageData.dataEncryption(
                                      'Not-Enrolled'
                                    )
                                  )
                                );
                              } else {
                                window.localStorage.setItem(
                                  'SESSION_TEACHER_TABLE',
                                  JSON.stringify(
                                    SecureStorageData.dataEncryption(
                                      response.data
                                    )
                                  )
                                );
                              }
                              window.localStorage.removeItem('LOGIN_STATUS');
                              setShowLoading(false);
                              navigate('/Homepage');
                            })
                            .catch(function (error) {
                              window.localStorage.removeItem('LOGIN_STATUS');
                              setShowLoading(false);
                            });
                        } else if (data == 'Teacher') {
                          window.localStorage.setItem(
                            'SUBSCRIPTION_TYPE',
                            JSON.stringify(
                              SecureStorageData.dataEncryption(userData[7])
                            )
                          );
                          window.localStorage.removeItem('LOGIN_STATUS');
                          var fullName =
                            StorageData.localStorageJSON('SESSION_FULLNAME');

                          if (fullName === null) fullName = '';
                          fullName = fullName.replace(/ /g, '_');
                          axios
                            .get(
                              `http://localhost:80/Prototype-Vite/my-project/api/teacherLoginSection/${fullName}`
                            )
                            .then(function (response) {
                              //console.log(response.data);
                              var section = response.data;

                              window.localStorage.setItem(
                                'CURRENT_SECTION',
                                JSON.stringify(
                                  SecureStorageData.dataEncryption(section)
                                )
                              );

                              window.localStorage.setItem('LINK_TAB', 0);
                              setShowLoading(false);

                              navigate('/HomePageTeacher');
                            })
                            .catch(function (error) {
                              setShowLoading(false);
                            });

                          //reloadPage();
                        }
                      })
                      .catch(function (error) {
                        setShowLoading(false);
                      });
                  } else if (isAdmin) {
                    window.localStorage.removeItem('LOGIN_STATUS');
                    var data = 'Admin';
                    window.localStorage.setItem(
                      'ACCOUNT_TYPE',
                      JSON.stringify(SecureStorageData.dataEncryption(data))
                    );
                    setShowLoading(false);
                    navigate('/HomePageAdmin');
                    //reloadPage();
                  }
                })
                .catch(function (error) {
                  setShowLoading(false);
                });
            } else {
              setShowLoading(false);
            }
          }

          if (!firstLogin) {
            actions.resetForm();
          }
        })
        .catch(function (error) {
          setShowLoading(false);
        });
    }

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

      emailReset: '',
      code: '',
    },
    //Page Validation Form
    validationSchema: loginSchema,
    onSubmit,
  });

  ////console.log(errors);

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
  const passwordElement = document.getElementById('pass');

  const showPassword = () => {
    if (passwordState) {
      setPasswordState(false);
      ReactDOM.findDOMNode(passwordElement).type = 'password';
    } else {
      setPasswordState(true);
      ReactDOM.findDOMNode(passwordElement).type = 'text';
    }
  };

  // SHOW NEW PASSWORD EYE (OPTIONAL)
  const [passwordState2, setPasswordState2] = useState(false);
  const passwordElement2 = document.getElementById('newPassword');

  const showNewPassword = () => {
    if (passwordState2) {
      setPasswordState2(false);
      ReactDOM.findDOMNode(passwordElement2).type = 'password';
    } else {
      setPasswordState2(true);
      ReactDOM.findDOMNode(passwordElement2).type = 'text';
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
    if (onlyLettersAndNumbers(value) && value.length >= 8) {
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
    setShowLoading(true);
    let passwordNew = values.newPassword;
    let email = values.email;
    if (values.validNew && values.validConfirm) {
      axios
        .post(
          `http://localhost:80/Prototype-Vite/my-project/api/setNewPassword/${email}@${passwordNew}`
        )
        .then(function (response) {
          setShowLoading(false);
          setShowModal(true);
        })
        .catch(function (error) {
          setShowLoading(false);
        });
    }
  };

  // PASSWORD SET MODAL
  const [showModal, setShowModal] = useState(false);
  const handleOnCloseModal = () => setShowModal(false);

  const [showModal2, setShowModal2] = useState(false);

  const handleOnContinueModal = () => {
    setShowModal2(true);
  };

  const handleOnCloseForgotModal = () => {
    setForgotPass(false);
    setResetType('Email');
    window.sessionStorage.setItem('FORGOT_PASSWORD', false);
  };

  const handleOnCloseModal2 = () => {
    setShowModal2(false);
    setForgotPass(false);
    setResetType('Email');
    window.sessionStorage.setItem('FORGOT_PASSWORD', false);
  };

  const [newPass, setNewPass] = useState(false);
  const [forgotPass, setForgotPass] = useState(false);

  const [resetType, setResetType] = useState('Email');

  useEffect(() => {
    window.sessionStorage.setItem('FORGOT_PASSWORD', false);
  }, []);

  //FOR SKELETON

  const [skeletonState, setSkeletonState] = useState(true);

  /*
 useEffect(() => {
   const onPageLoad = () => {
     setTimeout(hideNavbar, 1000);

     function hideNavbar() {
       setSkeletonState(false);
     }
   };
   if (document.readyState === 'complete') {
     onPageLoad();
   } else {
     window.addEventListener('load', onPageLoad, false);
     return () => window.removeEventListener('load', onPageLoad);
   }
 }, []);
 */

  return (
    <>
      {/** 
       * <DataGenerator />
     <div className={`${!skeletonState ? '' : ''}`}>
       <LoginPageSkeleton />
     </div>
     */}
      <div
        className={` flex items-center select-none
                     ${skeletonState ? '' : ''}`}
      >
        <div className="mx-auto w-full  grid place-items-center overflow-y-auto h-screen ">
          <div
            className="
           hdScreen:w-[30%] semihdScreen:w-[35%] laptopScreen:w-[40%] averageScreen:w-[42.5%] md:w-[45%] sm:w-[50%] xs:w-[60%] 
           hdScreen:scale-100 semihdScreen:scale-95 laptopScreen:scale-85 averageScreen:scale-80 xs:scale-80
         bg-white rounded-2xl shadow-md relative"
          >
            <div className="lg:pb-16 xs:pb-10  px-10 rounded-3xl">
              <div className="hdScreen:text-4xl semihdScreen:text-4xl laptopScreen:text-3xl  averageScreen:text-3xl  sm:text-2xl xs:text-xl text-gray-700 font-bold text-center">
                <i className=" fas fa-graduation-cap  hdScreen:text-[5rem] semihdScreen:text-[4.5rem] laptopScreen:text-[4rem] averageScreen:text-[3.75rem] sm:text-[2.5rem] xs:text-[2rem] lg:pt-6 xs:pt-2 pb-4"></i>
              </div>
              <hr />
              <div className="hdScreen:text-4xl semihdScreen:text-4xl laptopScreen:text-3xl  averageScreen:text-3xl sm:text-2xl xs:text-lg text-gray-700 font-bold text-center">
                <div className="averageScreen:pt-4 xs:pt-2 averageScreen:pb-2 select-none">
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

              <div className="averageScreen:p-1 rounded-xl lg:text-2xl xs:text-base grid place-items-center text-gray-400">
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
                  <div className="averageScreen:pt-4 xs:pt-2"></div>
                ) : forgotPass ? (
                  <div className="averageScreen:pt-4 xs:pt-2 w-full">
                    <p className="lg:text-lg text-center py-2 text-gray-800">
                      Select the type for password reset.
                    </p>
                    <div className="flex  ">
                      <button
                        onClick={() => {
                          setResetType('Email');
                          window.sessionStorage.setItem(
                            'RESET_TYPE',
                            JSON.stringify('Email')
                          );
                        }}
                        className={`grow text-base lg:px-4 xs:px-1 py-1 rounded-lg  border-2   transition duration-200 ${
                          resetType == 'Email'
                            ? 'bg-gray-500/80 text-white font-semibold border-gray-500/80'
                            : 'bg-gray-100 hover:bg-gray-500/80 text-gray-500  border-gray-300 hover:border-gray-500/80  hover:text-white'
                        }`}
                      >
                        Email
                      </button>
                      <button
                        onClick={() => {
                          setResetType('Code');
                          window.sessionStorage.setItem(
                            'RESET_TYPE',
                            JSON.stringify('Code')
                          );
                        }}
                        className={`grow text-base ml-4 lg:px-4 xs:px-1 rounded-lg border-2  transition duration-200 ${
                          resetType == 'Code'
                            ? 'bg-gray-500/80 text-white font-semibold border-gray-500/80'
                            : 'bg-gray-100 hover:bg-gray-500/80 text-gray-500  border-gray-300 hover:border-gray-500/80  hover:text-white'
                        }`}
                      >
                        Code
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
                            ? 'lastname.firstname@sfe.edu.ph'
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
                        id="pass"
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
                  <div className=" averageScreen:mt-8 averageScreen:mb-3 xs:mb-1 text-center w-full ">
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
                  <>
                    <ForgotPassword
                      onContinue={handleOnContinueModal}
                      onClose={handleOnCloseForgotModal}
                    />
                  </>
                ) : (
                  <></>
                )}

                <div
                  className={`w-full text-center ${newPass ? 'hidden' : ''}`}
                >
                  <a
                    id="link"
                    onClick={
                      forgotPass
                        ? () => {
                            setForgotPass(false);
                            window.sessionStorage.setItem(
                              'FORGOT_PASSWORD',
                              false
                            );
                          }
                        : () => {
                            setForgotPass(true);
                            window.sessionStorage.setItem(
                              'FORGOT_PASSWORD',
                              true
                            );
                            //console.log(SecureParseData.parseJSON(window.sessionStorage.getItem('FORGOT_PASSWORD')));
                          }
                    }
                    className={`no-underline cursor-pointer lg:text-lg sm:text-base xs:text-xs text-lime-800 hover:underline ${
                      accType == 'Student' ? 'visible' : 'invisible'
                    }`}
                  >
                    {forgotPass ? <>Back to login</> : <>Forgot Password?</>}
                  </a>
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
      <ForgotPasswordMessageModal
        onClose={handleOnCloseModal2}
        visible={showModal2}
      />
      <LoadingSpinner visible={showLoading} />
    </>
  );
}
