import React, { Component } from 'react';
import { useFormik } from 'formik';
import { registrationSchema } from '../schemas';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

import * as XLSX from 'xlsx';

import { VscCheckAll, VscPassFilled } from 'react-icons/vsc';

import { BsXCircleFill } from 'react-icons/bs';
import { BsArrowCounterclockwise } from 'react-icons/bs';

import { GoChecklist } from 'react-icons/go';
import { HiPlusSmall } from 'react-icons/hi2';

import { HiPencilSquare } from 'react-icons/hi2';
import { BsArrowDownSquare } from 'react-icons/bs';

import RegistrationModal from './RegistrationModal';

function Registration() {
  document.body.style.height = '100vh';
  const navigate = useNavigate();

  useEffect(() => {
    setTabIndex();

    window.addEventListener('focus', setTabIndex);
    function setTabIndex() {
      window.localStorage.setItem('CURRENT_TAB_INDEX', 3);
    }
  }, []);

  useEffect(() => {
    var logged = JSON.parse(window.localStorage.getItem('LOGGED'));
    if (logged == 'FALSE') {
      navigate('/LoginPage');
    } else {
      var closed = JSON.parse(window.localStorage.getItem('IS_CLOSED'));
      if (closed) {
        var unique = JSON.parse(window.localStorage.getItem('UNIQUE_ID'));
        axios
          .post(
            `http://localhost:80/Prototype-Vite/my-project/api/logout/${unique}`
          )
          .then(function (response) {
            window.localStorage.setItem('LOGGED', JSON.stringify('FALSE'));
            navigate('/LoginPage');
          });
      }
    }

    var account = JSON.parse(window.localStorage.getItem('ACCOUNT_TYPE'));
    if (account == 'Teacher') {
      navigate('/HomePageTeacher');
    } else if (account == 'Student') {
      navigate('/Homepage');
    }
  });

  //END END END END END END END END END END END END

  const [sectionData, setSectionData] = useState([]);

  function getSections() {
    axios
      .get('http://localhost:80/Prototype-Vite/my-project/api/sectionList/')
      .then(function (response) {
        console.log(response.data);
        setSectionData(response.data);
      });
  }

  useEffect(() => {
    getSections();
    setEmail('@sf.edu.ph');
  }, []);

  const onSubmit = async (values, actions) => {
    console.log('SUBMITTED');
    if (!values.isDuplicate) {
      axios
        .post(
          'http://localhost:80/Prototype-Vite/my-project/api/registerAccount/save',
          values
        )
        .then(function (response) {
          console.log(response.data);
          setShowModal(true);
          resetValues();

          function resetValues() {
            values.firstName = '';
            values.middleName = '';
            values.lastName = '';
            values.email = '';
            values.password = 'default';
            setEmail('@sf.edu.ph');
            setFirstName('');
            setLastName('');

            if (values.role == 'Student') {
              values.sex = 'Male';
              values.section = '';
              values.groupType = 'Facial Group';
              values.gradeLevel = 'Grade 7';
            }
          }
          //window.location.reload(false);
        });

      await new Promise(resolve => setTimeout(resolve, 1));
    }

    //actions.resetForm();

    //ADDITIONAL RESET
    /*
    setBirthday("");
    setAge("");
    setFirstName("");
    setLastName("");
    setEmail("");
    values.age = "";
    values.firstName = "";
    values.lastName = "";
    */
  };

  const [currentAge, setAge] = useState('');

  function getAge(dateString) {
    var string = dateString.replace(/[\-]/gi, '/');
    var today = new Date();
    var birthDate = new Date(string);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    setAge(age.toString());
    setTimeout(setValue, 100);
    function setValue() {
      values.age = age;
      handleChange.age;
      document.getElementById('age').focus();
      setTimeout(document.getElementById('age').blur(), 1);
    }

    console.log(values.age);
  }

  const [birthday, setBirthday] = useState('');

  const dateChange = event => {
    const value = event.target.value;
    values.birthDay = value;
    setBirthday(value);
    getAge(values.birthDay);
    handleChange.age;
  };

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  var fName = '';
  var lName = '';
  var tempEmail = '';

  const [duplicateState, setDuplicateState] = useState(false);
  const [validState, setValidState] = useState(false);

  const firstNameChange = event => {
    const value = event.target.value;
    var emailValue = value.replace(/\s/g, '');
    emailValue = emailValue.toLowerCase();

    values.firstName = value;
    handleChange.firstName;

    setFirstName(emailValue);
    fName = emailValue;

    if (lastName != '') {
      setEmail(lastName + '.' + emailValue + '@sf.edu.ph');
      tempEmail = lastName + '.' + emailValue + '@sf.edu.ph';
    } else {
      if (firstName === '') {
        setEmail('@sf.edu.ph');
        tempEmail = '';
      } else {
        setEmail(emailValue + '@sf.edu.ph');
        tempEmail = emailValue + '@sf.edu.ph';
      }
    }

    values.email = tempEmail;
    handleChange.email;

    //UPDATE INSTANTLY
    document.getElementById('firstName').focus();
    document.getElementById('firstName').blur();
    document.getElementById('email').focus();
    document.getElementById('email').blur();
    document.getElementById('firstName').focus();

    axios
      .get(
        `http://localhost:80/Prototype-Vite/my-project/api/verifyEmail/${tempEmail}`
      )
      .then(function (response) {
        console.log(response.data);
        if (response.data === 'duplicate') {
          setDuplicateState(true);
          values.isDuplicate = true;
        } else {
          setDuplicateState(false);
          values.isDuplicate = false;
        }
      });
  };

  const lastNameChange = event => {
    const value = event.target.value;
    var emailValue = value.replace(/\s/g, '');
    emailValue = emailValue.toLowerCase();

    values.lastName = value;
    handleChange.lastName;

    setLastName(emailValue);
    lName = emailValue;

    if (firstName != '') {
      setEmail(emailValue + '.' + firstName + '@sf.edu.ph');
      tempEmail = emailValue + '.' + firstName + '@sf.edu.ph';
    } else {
      if (lastName === '') {
        setEmail('@sf.edu.ph');
        tempEmail = '';
      } else {
        setEmail(emailValue + '@sf.edu.ph');
        tempEmail = emailValue + '@sf.edu.ph';
      }
    }

    values.email = tempEmail;
    handleChange.email;

    //UPDATE INSTANTLY
    document.getElementById('lastName').focus();
    document.getElementById('lastName').blur();
    document.getElementById('email').focus();
    document.getElementById('email').blur();
    document.getElementById('lastName').focus();

    axios
      .get(
        `http://localhost:80/Prototype-Vite/my-project/api/verifyEmail/${tempEmail}`
      )
      .then(function (response) {
        console.log(response.data);
        if (response.data === 'duplicate') {
          setDuplicateState(true);
          values.isDuplicate = true;
        } else {
          setDuplicateState(false);
          values.isDuplicate = false;
        }
      });
  };

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
      firstName: '',
      middleName: '',
      lastName: '',
      //birthDay: '',
      //age: '',

      sex: 'Male',
      section: '',
      groupType: 'Facial Group',
      gradeLevel: 'Grade 7',
      email: '',
      password: 'default',
      //confirmPassword: '',
      role: '',
      isDuplicate: false,
    },

    validationSchema: registrationSchema,
    onSubmit,
  });

  //FOR MODAL
  const [showModal, setShowModal] = useState(false);
  const handleOnCloseModal = () => setShowModal(false);

  const [navbarWidth, setNavbarWidth] = useState(0);
  const [logoHeight, setLogoHeight] = useState(0);

  useEffect(() => {
    document.body.style.backgroundImage =
      'linear-gradient(to top, #e2e2e2, #f1f1f1 , #ffffff)';

    window.addEventListener('load', setWidth);
    window.addEventListener('resize', setWidth);
    window.addEventListener('focus', setWidth);
    window.addEventListener('click', setWidthDelay);
    setWidth();
  });

  function setWidthDelay() {
    setTimeout(function () {
      var width = window.sessionStorage.getItem('NAVBAR_ADMIN_WIDTH');
      setNavbarWidth(width);

      // Logo height
      var height = window.sessionStorage.getItem('NAVBAR_ADMIN_LOGO');
      setLogoHeight(height);
    }, 1);
  }

  function setWidth() {
    var width = window.sessionStorage.getItem('NAVBAR_ADMIN_WIDTH');
    setNavbarWidth(width);

    // Logo height
    var height = window.sessionStorage.getItem('NAVBAR_ADMIN_LOGO');
    setLogoHeight(height);
  }

  const [accountRole, setAccountRole] = useState('');
  const [registerType, setRegisterType] = useState('');

  function resetValues() {
    values.firstName = '';
    values.middleName = '';
    values.lastName = '';

    values.sex = 'Male';
    values.section = '';
    values.groupType = 'Facial Group';
    values.gradeLevel = 'Grade 7';
    values.email = '';
    values.role = '';
    values.password = 'default';

    setEmail('@sf.edu.ph');
    setFirstName('');
    setLastName('');
    setDuplicateState(false);
  }

  const roleStudent = () => {
    handleReset();
    resetValues();

    setAccountRole('Student');
    values.role = 'Student';
  };

  const roleTeacher = () => {
    handleReset();
    resetValues();
    values.sex = '';
    values.section = '';
    values.groupType = '';
    values.gradeLevel = '';
    setAccountRole('Teacher');
    values.role = 'Teacher';
  };

  const typeSingle = () => {
    handleReset();
    setRegisterType('Single');
    setStudentList([]);
    setValidationStatus([]);
    setGradeNumber('');
    setSectionString('');
    validation = [];
    document.getElementById('upload').value = null;
  };

  const typeBulk = () => {
    handleReset();
    setRegisterType('Bulk');
  };

  var studentArr = [];
  var validation = [];
  //const [studentArray, setStudentArray] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [validationStatus, setValidationStatus] = useState([]);
  const [gradeNumber, setGradeNumber] = useState('');
  const [sectionString, setSectionString] = useState('');

  const handleFileUpload = e => {
    var temporary = [];

    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = e => {
      const studentList = e.target.result;
      const workbook = XLSX.read(studentList, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      console.log(parsedData);

      temporary = parsedData;

      for (let i = 0; i < temporary.length; i++) {
        convertArray(i);
        if (i + 1 == temporary.length) {
          setStudentList(parsedData);
        }
      }
    };
    function convertArray(index) {
      var currentData = JSON.stringify(temporary[index]);
      console.log(currentData);
      if (currentData !== null && currentData !== undefined) {
        currentData = currentData.replace('{', '');
        currentData = currentData.replace('}', '');
        currentData = currentData.replace('"Grade Level":', '');
        currentData = currentData.replace('"Section":', '');
        currentData = currentData.replace('"__EMPTY_1":', '');
        currentData = currentData.replace('"Given Name":', '');
        currentData = currentData.replace('"Middle Name":', '');
        currentData = currentData.replace('"Last Name":', '');
        currentData = currentData.replace('"Gender":', '');
        currentData = currentData.replace('"Role":', '');

        var userData = [];
        convertStringToArray();
        function convertStringToArray() {
          let firstIndex = 0;
          let endIndex = 0;
          let isComma = false;
          let isNumber = false;
          for (let i = 0; i < currentData.length; i++) {
            let isEnd = false;

            //console.log(currentData[i]);

            if (i == 0) {
              if (currentData[i] !== '"') {
                isNumber = true;
              }
            }

            if (isComma) {
              if (currentData[i] != '"') {
                if (currentData[i - 1] == ',') {
                  isNumber = true;
                  isComma = false;
                }
              }
            }

            if (currentData[i] == ',') {
              firstIndex = 0;
              endIndex = 0;
              isComma = true;
              continue;
            }

            if (currentData[i] == '"') {
              if (isNumber) {
                endIndex = i - 1;
                isEnd = true;
              } else {
                if (firstIndex == 0) {
                  firstIndex = i + 1;
                } else {
                  endIndex = i;
                  isEnd = true;
                }
              }
            }
            if (isEnd) {
              //console.log(currentData.substring(firstIndex, endIndex));

              userData.push(currentData.substring(firstIndex, endIndex));
              isEnd = false;
              isNumber = false;
              isComma = false;
            }
          }
        }

        console.log(userData);
        if (userData.length < 7) {
          return;
        }

        var gradeLvl = userData[0];
        var sect = userData[1];
        sect = sect.toLowerCase().replace(/\b[a-z]/g, function (letter) {
          return letter.toUpperCase();
        });
        setGradeNumber(gradeLvl);
        setSectionString(sect);

        var email =
          userData[4].toLowerCase() +
          '.' +
          userData[1].toLowerCase() +
          '@sf.edu.ph';

        console.log(email);
        axios
          .get(
            `http://localhost:80/Prototype-Vite/my-project/api/verifyEmail/${email}`
          )
          .then(function (response) {
            console.log(response.data);

            var result = response.data;
            if (result == 'unique') {
              validation.push('unique');
            } else {
              validation.push('duplicate');
            }
            console.log(validation);
            setValidationStatus(validation);
          });
      }
    }
  };

  /*
  console.log(studentList);
  console.log('SL::1');
  console.log(studentList[1]);
  console.log('SL::4');
  console.log(studentList[4]);
*/
  return (
    <>
      <div
        className={`bg-gradient-to-t from-[#e2e2e2] via-[#f1f1f1] to-[#ffffff] h-screen   
        ${
          navbarWidth == 176
            ? 'w-[calc(100%-176px)] ml-[176px]'
            : navbarWidth == 108
            ? 'w-[calc(100%-108px)] ml-[108px]'
            : navbarWidth == 73
            ? 'w-[calc(100%-73px)] ml-[73px]'
            : navbarWidth == 39
            ? 'w-[calc(100%-39px)] ml-[39px]'
            : ''
        }`}
      >
        <div className="relative mx-auto p-8 w-full text-gray-700">
          <div
            className={`md:-mt-0 xs:-mt-1 border-b-2 text-gray-600 lg:text-4xl font-bold
          ${
            logoHeight == 78.5
              ? 'max-h-[78.5px]'
              : logoHeight == 40.5
              ? 'max-h-[40.5px]'
              : 'max-h-[78.5px]'
          }`}
          >
            Registration
          </div>

          <div className=" inline-flex lg:px-6 hdScreen:py-6 semihdScreen:py-4 laptopScreen:pb-3 averageScreen:pb-3 xs:p-3">
            <p className="mt-[0.55rem] pr-2 lg:text-xl xs:text-base">Role:</p>
            <div className="flex mt-[0.7rem] lg:text-lg xs:text-xs px-2">
              <button
                onClick={registerType == 'Bulk' ? null : roleStudent}
                className={`lg:px-2 xs:px-1 rounded-lg lg:w-24 transition duration-200 ${
                  registerType == 'Bulk'
                    ? 'bg-gray-300/90 text-gray-400'
                    : accountRole == 'Student'
                    ? 'bg-gray-500 text-white font-semibold'
                    : 'bg-gray-300 hover:bg-gray-400 text-gray-600 hover:text-gray-900'
                }`}
                {...(registerType == 'Bulk'
                  ? { disabled: true }
                  : { disabled: false })}
              >
                Student
              </button>
              <button
                onClick={registerType == 'Bulk' ? null : roleTeacher}
                className={` ml-4  lg:px-2 xs:px-1 rounded-lg lg:w-24 transition duration-200 ${
                  registerType == 'Bulk'
                    ? 'bg-gray-300/90 text-gray-400'
                    : accountRole == 'Teacher'
                    ? 'bg-gray-500 text-white font-semibold'
                    : 'bg-gray-300 hover:bg-gray-400 text-gray-600 hover:text-gray-900'
                }`}
                {...(registerType == 'Bulk'
                  ? { disabled: true }
                  : { disabled: false })}
              >
                Teacher
              </button>
            </div>

            <p className="border-l-2 border-gray-400 ml-6 pl-6 mt-[0.55rem] pr-2 lg:text-xl xs:text-base">
              Registration Type:
            </p>
            <div className="flex mt-[0.7rem] lg:text-lg xs:text-xs px-2">
              <button
                onClick={typeSingle}
                className={` lg:px-2 xs:px-1 rounded-lg lg:w-24  transition duration-200 ${
                  registerType == 'Single'
                    ? 'bg-gray-500 text-white font-semibold'
                    : 'bg-gray-300 hover:bg-gray-400 text-gray-600 hover:text-gray-900'
                }`}
              >
                Single
              </button>
              <button
                onClick={typeBulk}
                className={` ml-4 lg:px-2 xs:px-1 rounded-lg lg:w-24  transition duration-200 ${
                  registerType == 'Bulk'
                    ? 'bg-gray-500 text-white font-semibold'
                    : 'bg-gray-300 hover:bg-gray-400 text-gray-600 hover:text-gray-900'
                }`}
              >
                Bulk
              </button>
            </div>
          </div>

          <div
            className={`${
              accountRole != ''
                ? registerType == 'Single'
                  ? 'visible'
                  : 'hidden'
                : 'hidden'
            }`}
          >
            <hr></hr>
            <div className="w-full  mt-4  lg:text-2xl xs-text-lg text-gray-700 grid place-items-center  ">
              <h1>
                &#40;{' '}
                {accountRole == 'Student'
                  ? 'Student Account'
                  : 'Teacher Account'}{' '}
                &#41;
              </h1>
              <h1 className="mt-2 text-gray-500 text-xl italic">
                - Fill-up required details -
              </h1>
            </div>

            <form
              onSubmit={handleSubmit}
              action=""
              className="overflow-hidden"
              autoComplete="off"
            >
              <main className="hdScreen:pt-10 semihdScreen:pt-9 laptopScreen:pt-8 averageScreen:pt-6 pb-12 pr-12 min-w-fit hdScreen:text-lg semihdScreen:text-lg laptopScreen:text-base averageScreen:text-base xs:text-xs   overflow-hidden">
                <div className="grid grid-cols-3 gap-x-3 ">
                  {/*FirstName Input*/}
                  <div>
                    <div className="inline-flex w-full">
                      <label
                        htmlFor="firstName"
                        className="inline-block mt-2 pr-2 text-right lg:w-[136px]"
                      >
                        Given Name:{' '}
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text "
                        placeholder="Enter Given Name "
                        autoComplete="new-password"
                        className={` grow py-2 lg:px-2 border-2 rounded-md border-gray-500 focus:outline-teal-500 relative focus:ring-teal-500 shadow-sm  shadow-[#808080] ${
                          errors.firstName && touched.firstName
                            ? 'shadow-red-500  border-red-500 focus:border-red-500 border-3 border-solid'
                            : ''
                        }`}
                        value={values.firstName}
                        onChange={firstNameChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {errors.firstName && touched.firstName && (
                      <p className="text-red-500 absolute lg:ml-[136px] xs:ml-[43px]">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  {/*MiddleName Input*/}
                  <div>
                    <div className="inline-flex w-full">
                      <label
                        htmlFor="middleName"
                        className="inline-block pt-2 pr-2 text-right lg:w-[120px]"
                      >
                        Middle Name:{' '}
                      </label>
                      <input
                        name="middleName"
                        type="text "
                        placeholder="Enter Middle Name"
                        autoComplete="new-password"
                        className={`grow py-2 lg:px-2 border-2  rounded-md relative border-gray-500 focus:outline-teal-500 focus:ring-teal-500 shadow-sm  shadow-[#808080]`}
                        value={values.middleName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>

                  {/*LastName Input*/}
                  <div>
                    <div className="inline-flex w-full">
                      <label
                        htmlFor="lastName"
                        className="inline-block pt-2 pr-2 text-right lg:w-[7rem]"
                      >
                        {' '}
                        Last Name:{' '}
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text "
                        placeholder="Enter Last Name"
                        autoComplete="new-password"
                        className={`grow py-2 lg:px-2 border-2 relative rounded-md border-gray-500 focus:outline-teal-500 focus:ring-teal-500 w-52 shadow-sm shadow-[#808080] ${
                          errors.lastName && touched.lastName
                            ? ' shadow-red-500 border-red-500 focus:border-red-500 border-3 border-solid'
                            : ''
                        } `}
                        value={values.lastName}
                        onChange={lastNameChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {errors.lastName && touched.lastName && (
                      <p className="text-red-500  absolute lg:ml-[7rem] xs:ml-[44px] ">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div
                  className={` grid-cols-3 gap-x-3 mt-8 ${
                    accountRole == 'Teacher' ? 'hidden' : 'grid'
                  }`}
                >
                  {/*Birthday Input*/}
                  <div className="hidden">
                    <div className="inline-flex w-full">
                      <label
                        htmlFor="birthDay"
                        className="inline-block pt-2 pr-2 text-right lg:w-[136px]"
                      >
                        Birth date:{' '}
                      </label>
                      <input
                        id="birthDay"
                        name="birthDay"
                        type="date"
                        autoComplete="new-password"
                        className="grow py-2 lg:px-2 border-2  focus:border-none rounded-md border-gray-500 focus:outline-teal-500 focus:ring-teal-500 shadow-sm shadow-[#808080]"
                        onChange={dateChange}
                        onBlur={handleBlur}
                        value={birthday}
                        min="2000-01-01"
                        max="2013-12-31"
                      />
                    </div>
                  </div>

                  {/*Age Input*/}
                  <div className="hidden">
                    <div className="inline-flex w-full">
                      <label
                        htmlFor="age"
                        className="inline-block pt-2 pr-2 text-right lg:w-[120px]"
                      >
                        Age:{' '}
                      </label>
                      <input
                        readOnly
                        id="age"
                        name="age"
                        type="text"
                        placeholder="Set birthday"
                        autoComplete="new-password"
                        className={`py-2 lg:px-2 border-2 w-[9rem] rounded-md focus:border-none border-gray-500 focus:outline-teal-500 focus:ring-teal-500 relative shadow-sm shadow-[#808080] ${
                          errors.age && touched.age
                            ? ' shadow-red-500 border-red-500 focus:border-red-500 border-3 border-solid'
                            : ''
                        }`}
                        value={currentAge}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {errors.age && touched.age && (
                      <p className="text-red-500  absolute ml-[120px] ">
                        {errors.age}
                      </p>
                    )}
                  </div>

                  {/*Gender Input*/}
                  <div>
                    <div className="inline-flex w-full ">
                      <label
                        htmlFor="sex"
                        className="inline-block pt-2 pr-2 text-right lg:w-[136px]"
                      >
                        Gender:{' '}
                      </label>
                      <div className="mt-2.5">
                        <input
                          name="sex"
                          type="radio"
                          className=""
                          value="Male"
                          checked={values.sex === 'Male'}
                          onChange={handleChange}
                        />{' '}
                        Male
                        <input
                          name="sex"
                          type="radio"
                          className="ml-4"
                          value="Female"
                          checked={values.sex === 'Female'}
                          onChange={handleChange}
                        />{' '}
                        Female
                      </div>
                    </div>
                    {touched.sex ||
                      (errors.sex && (
                        <p className="text-red-500 absolute ml-[7rem]">
                          {errors.sex}
                        </p>
                      ))}
                  </div>

                  {/*Group Type Input*/}
                  <div className="col-span-2">
                    <div className="inline-flex w-full">
                      <label
                        htmlFor="groupType"
                        className="inline-block pt-2 pr-2 text-right lg:w-[120px]"
                      >
                        Group Type:{' '}
                      </label>
                      <div className="mt-2.5">
                        <input
                          name="groupType"
                          type="radio"
                          className=""
                          value="Facial Group"
                          checked={values.groupType === 'Facial Group'}
                          onChange={handleChange}
                        />{' '}
                        Facial Group
                        <input
                          name="groupType"
                          type="radio"
                          className="ml-4"
                          value="Non-Facial Group"
                          checked={values.groupType === 'Non-Facial Group'}
                          onChange={handleChange}
                        />{' '}
                        Non-Facial Group
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={` grid-cols-3 gap-x-3 mt-8 ${
                    accountRole == 'Teacher' ? 'hidden' : 'grid'
                  }`}
                >
                  {/*GradeLevel Input*/}
                  <div>
                    <div className="inline-flex w-full">
                      <label
                        htmlFor="gradeLevel"
                        className="inline-block pt-2 pr-2 text-right lg:w-[136px]"
                      >
                        Grade Level:{' '}
                      </label>
                      <select
                        value={values.gradeLevel}
                        onChange={handleChange}
                        name="gradeLevel"
                        id="gradeLevel"
                        className="py-2 lg:px-2 border-2 focus:border-none rounded-md border-gray-500 focus:outline-teal-500 focus:ring-teal-500 shadow-sm shadow-[#808080]"
                      >
                        <option className="" defaultValue={values.gradeLevel}>
                          Grade 7
                        </option>
                      </select>
                    </div>
                  </div>

                  {/*Section Input*/}
                  <div>
                    <div className="inline-flex w-full">
                      <label
                        htmlFor="section"
                        className="inline-block pt-2 pr-2 text-right lg:w-[120px]"
                      >
                        Section:
                      </label>
                      <select
                        value={values.section}
                        onChange={handleChange}
                        name="section"
                        className="py-2 lg:px-2 border-2 focus:border-none rounded-md border-gray-500 focus:outline-teal-500 focus:ring-teal-500 shadow-sm shadow-[#808080] "
                      >
                        {sectionData.map((section, index) => (
                          <option key={index} className="">
                            {section.SectionName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-x-3 mt-8">
                  <div className="col-span-2">
                    {/*Email Input*/}
                    <div className="inline-flex w-full">
                      <label
                        htmlFor="email"
                        className="inline-block pt-2 pr-2 text-right lg:w-[136px]"
                      >
                        Email:{' '}
                      </label>
                      <input
                        readOnly
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="off"
                        placeholder="lastname.firstname@school.edu.ph"
                        className={`grow py-2 lg:px-2 border-2 rounded-md border-gray-500 focus:outline-teal-500 focus:ring-teal-500 shadow-sm shadow-[#808080] ${
                          errors.email && touched.email
                            ? ' shadow-red-500 border-red-500 focus:border-red-500 border-3 border-solid'
                            : ''
                        } ${
                          duplicateState
                            ? 'shadow-red-500 border-red-500 focus:border-red-500 border-3 border-solid'
                            : ''
                        }`}
                        value={email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {errors.email && touched.email && (
                      <p className="text-red-500  absolute lg:ml-[136px]  xs:ml-[43px]">
                        {errors.email}
                      </p>
                    )}
                    {duplicateState ? (
                      <p className="text-red-500  absolute lg:ml-[136px]  xs:ml-[43px]">
                        * This email is already taken.
                      </p>
                    ) : (
                      ''
                    )}
                  </div>
                </div>

                <div className="hidden grid grid-cols-3 gap-x-3 mt-8">
                  {/*Password Input*/}
                  <div>
                    <div className="inline-flex w-full">
                      <label
                        htmlFor="password"
                        className="inline-block pt-3.5 pr-2 text-right lg:w-[136px]"
                      >
                        Password:{' '}
                      </label>
                      <input
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        placeholder="Enter Password"
                        className={`grow py-2 lg:px-2 py-[14.5px] border-2  rounded-md border-gray-500 focus:outline-teal-500 focus:ring-teal-500 focus:border-none relative shadow-sm shadow-[#808080] ${
                          errors.password && touched.password
                            ? ' shadow-red-500 border-red-500 focus:border-red-500 border-3 border-solid'
                            : ''
                        }`}
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {errors.password && touched.password && (
                      <p className="text-red-500  absolute ml-[136px] ">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/*Confirm  Password Input*/}
                  <div className="col-span-1">
                    <div className="inline-flex w-full">
                      <label
                        htmlFor="confirmPassword"
                        className="inline-block pt-2 pr-2 text-right lg:w-[7rem]"
                      >
                        Confirm Password:{' '}
                      </label>
                      <input
                        name="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        placeholder="Confirm Password"
                        className={`grow py-2 lg:px-2 border-2  rounded-md border-gray-500 focus:outline-teal-500 focus:ring-teal-500 focus:border-none shadow-sm shadow-[#808080] ${
                          errors.confirmPassword && touched.confirmPassword
                            ? ' shadow-red-500 border-red-500 focus:border-red-500 border-3 border-solid'
                            : ''
                        }`}
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {errors.confirmPassword && touched.confirmPassword && (
                      <p className="text-red-500  absolute ml-28 ">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>

                <div className=" absolute lg:right-20 sm:right-20 xs:right-6 mt-16 ">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative lg:py-3 lg:px-5 sm:py-1.5 sm:px-2.5 xs:px-1 xs:py-1 text-white font-semibold  shadow-md rounded-xl bg-lime-600 hover:bg-lime-700  ease-in-out transition duration-300 transform drop-shadow-[0_3px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_3px_0px_rgba(0,0,0,0.6)]"
                    onClick={onSubmit}
                  >
                    <span className="pl-2 lg:text-xl sm:text-base xs:text-sm flex justify-center">
                      Register
                      <HiPencilSquare className="lg:ml-2 sm:ml-1 xs:ml-0.5 lg:mt-0.5 sm:mt-1 xs:mt-1 lg:text-2xl" />
                    </span>
                  </button>
                </div>
              </main>
            </form>
          </div>

          {/**BULK */}
          <div className={`${registerType == 'Bulk' ? 'visible' : 'hidden'}`}>
            <hr></hr>
            <div className="ml-6 md:mt-6 xs:mt-3 flex justify-between">
              <div
                className={`text-xl font-normal italic
              ${studentList.length > 0 ? 'hidden' : ''}`}
              >
                [Download & open template file → Fill-up details → Choose file →
                Open.]
              </div>
              <div
                className={`select-none flex text-2xl font-bold -mt-2.5 text-gray-600/90
              ${studentList.length > 0 ? '' : 'hidden'}`}
              >
                <div className="px-4  border-2 border-gray-400/60 rounded-xl">
                  {`Grade: ${gradeNumber}`}
                </div>
                <div className="ml-4 px-4  border-2 border-gray-400/60 rounded-xl">
                  {`Section: ${sectionString}`}
                </div>
              </div>
              <div className="-mt-1  flex ">
                <div className="mt-0.5 mr-20">
                  <label className="text-lg ">
                    Upload .xlsx file:{'\u00A0'}
                  </label>
                  <input
                    id="upload"
                    className=""
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileUpload}
                  />
                </div>
                <button className="rounded-xl bg-blue-500 py-1 pl-5 pr-10 mr-5 text-white relative">
                  Template File
                  <span
                    className={` absolute  right-4 font-normal text-base flex justify-center
                  ${studentList.length > 0 ? 'top-[0.25rem]' : 'top-[0.2rem]'}`}
                  >
                    <BsArrowDownSquare className="ml-1 lg:mt-[0.2rem] lg:text-lg text-white" />
                  </span>
                </button>
              </div>
            </div>

            <div className="md:mt-6 xs:mt-3 rounded-3xl shadow overflow-hidden bg-gradient-to-t from-gray-200 via-gray-100 to-white  ">
              {studentList.length > 0 && (
                <table className="w-full leading-normal ">
                  <thead className="sticky top-0 z-40 shadow-md border-b-2 border-gray-200 bg-gray-200 text-left uppercase tracking-wider md:text-base xs:text-xs font-bold text-gray-600">
                    <tr>
                      {Object.keys(studentList[0]).map((key, index) =>
                        index > 1 && index != 3 ? (
                          <th
                            key={key}
                            className={`lg:pl-8 py-3 md:text-base sm:text-sm
                            ${index == 2 ? 'w-[15%]' : ''} 
                            ${index == 4 ? 'w-[15%]' : ''}
                            ${index == 5 ? 'w-[20%]' : ''}
                            ${index == 6 ? 'w-[17.5%]' : ''}
                            `}
                          >
                            {key}
                          </th>
                        ) : (
                          <></>
                        )
                      )}
                      <th className=""></th>
                    </tr>
                  </thead>
                </table>
              )}
              <div
                className={`hdScreen:min-h-[calc(100vh-50vh)] hdScreen:max-h-[calc(100vh-50vh)] 
                            semihdScreen:min-h-[calc(100vh-45vh)] semihdScreen:max-h-[calc(100vh-45vh)]
                            laptopScreen:min-h-[calc(100vh-43vh)] laptopScreen:max-h-[calc(100vh-43vh)]
                            averageScreen:min-h-[calc(100vh-47.5vh)] averageScreen:max-h-[calc(100vh-47.5vh)]
                            bg-white relative overflow-y-scroll style-2 mx-auto w-full 
                            ${
                              studentList.length > 0
                                ? 'rounded-t-md'
                                : 'rounded-md'
                            }`}
              >
                <div className="">
                  <div className="">
                    <div className="inline-block min-w-full rounded-lg ">
                      {studentList.length > 0 && (
                        <table className="min-w-full leading-normal -mt-[28px] relative">
                          <thead className="invisible text-left uppercase tracking-wider font-bold md:text-base xs:text-xs">
                            <tr>
                              {Object.keys(studentList[0]).map((key, index) =>
                                index > 1 && index != 3 ? (
                                  <th
                                    key={key}
                                    className={`${
                                      index == 2 ? 'w-[15.25%]' : ''
                                    } 
                                  ${index == 4 ? 'w-[15%]' : ''}
                                  ${index == 5 ? 'w-[20.25%]' : ''}
                                  ${index == 6 ? 'w-[17.5%]' : ''}
                                  ${index == 7 ? 'w-[12.5%]' : ''}`}
                                  >
                                    {key}
                                  </th>
                                ) : (
                                  <></>
                                )
                              )}
                            </tr>
                          </thead>

                          <tbody className="relative ">
                            {studentList.map((row, counter) =>
                              row.Role != ' ' ? (
                                <tr
                                  key={counter}
                                  className={`odd:bg-white even:bg-slate-50/30 hover:bg-gray-100 hover:text-indigo-600 border-b border-gray-200 bg-white  text-gray-900 
                                  ${
                                    validationStatus[counter] == 'unique'
                                      ? ''
                                      : ''
                                  }`}
                                >
                                  {Object.values(row).map((value, index) =>
                                    index > 1 && index != 3 ? (
                                      <td
                                        key={index}
                                        className={`lg:pl-8  md:text-base sm:text-sm py-[10px]
                                        `}
                                      >
                                        <div className="h-2"></div>
                                        {value == '(Optional)' ? (
                                          <span className="font-light text-gray-400">
                                            (Blank)
                                          </span>
                                        ) : (
                                          value
                                        )}
                                      </td>
                                    ) : (
                                      <></>
                                    )
                                  )}

                                  <td
                                    className={`lg:pl-8  md:text-base sm:text-sm py-[10px]
                                        `}
                                  >
                                    <div className="h-2"></div>

                                    {validationStatus[counter] == 'unique' ? (
                                      <div className="flex">
                                        <VscPassFilled className="mr-1 mt-0.5  lg:text-2xl text-lime-600" />

                                        <span className="text-lime-600 font-semibold">
                                          [Account valid for registration.]
                                        </span>
                                      </div>
                                    ) : (
                                      <div className="flex">
                                        <BsXCircleFill className="mr-1 mt-1 lg:text-xl text-red-500" />
                                        <span className="text-red-600 font-semibold">
                                          [Account invalid for registration.]
                                        </span>
                                      </div>
                                    )}
                                  </td>
                                </tr>
                              ) : (
                                <></>
                              )
                            )}
                          </tbody>
                        </table>
                      )}

                      <div className="w-full bg-white"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`w-full flex justify-between rounded-b-3xl border-2 border-gray-400/40 border-t-gray-400/10 bg-gray-200 py-3 pb-4 px-5  drop-shadow-[0_2px_2px_rgba(0,0,0,0.35)]
                ${studentList.length > 0 ? '' : 'hidden'}`}
              >
                <div>No errors found.</div>
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative lg:py-2 lg:px-6 sm:py-1.5 sm:px-2.5 xs:px-1 xs:py-1 text-white font-semibold  shadow-md rounded-xl bg-lime-600 hover:bg-lime-700  ease-in-out transition duration-300 drop-shadow-[0_3px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_3px_0px_rgba(0,0,0,0.6)]"
                    onClick={onSubmit}
                  >
                    <span className="lg:text-lg sm:text-base xs:text-sm flex justify-center">
                      View Errors
                    </span>
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="ml-4 relative lg:py-2 lg:px-6 sm:py-1.5 sm:px-2.5 xs:px-1 xs:py-1 text-white font-semibold  shadow-md rounded-xl bg-lime-600 hover:bg-lime-700  ease-in-out transition duration-300 drop-shadow-[0_3px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_3px_0px_rgba(0,0,0,0.6)]"
                    onClick={onSubmit}
                  >
                    <span className="lg:text-lg sm:text-base xs:text-sm flex justify-center">
                      Register (Ignore Warnings)
                    </span>
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="ml-4 relative lg:py-2 lg:px-4 sm:py-1.5 sm:px-2.5 xs:px-1 xs:py-1 text-white font-semibold  shadow-md rounded-xl bg-lime-600 hover:bg-lime-700  ease-in-out transition duration-300 drop-shadow-[0_3px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_3px_0px_rgba(0,0,0,0.6)]"
                    onClick={onSubmit}
                  >
                    <span className="pl-2 lg:text-lg sm:text-base xs:text-sm flex justify-center">
                      Register
                      <HiPencilSquare className="lg:ml-1  sm:ml-1 xs:ml-0.5 lg:mt-1 sm:mt-1 xs:mt-1 lg:text-xl" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RegistrationModal onClose={handleOnCloseModal} visible={showModal} />
    </>
  );
}

export default Registration;
