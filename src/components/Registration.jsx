import React, { Component } from 'react';
import { useFormik } from 'formik';
import { registrationSchema } from '../schemas';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

import { HiPencilSquare } from 'react-icons/hi2';

import RegistrationModal from './RegistrationModal';

function Registration() {
  document.body.style.height = '100vh';
  const navigate = useNavigate();

  const [pageList, setPageList] = useState([]);
  const [pageLink, setPageLink] = useState([]);

  useEffect(() => {
    setPage();
    window.addEventListener('focus', setPage);
    function setPage() {
      let page = ['Home', 'Registration'];
      let link = ['/AdminHomepage', '/Registration'];
      setPageList(page);
      setPageLink(link);
      window.localStorage.setItem('NAVBAR_PAGE', JSON.stringify(pageList));
      window.localStorage.setItem('NAVBAR_PAGE_LINK', JSON.stringify(pageLink));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('NAVBAR_PAGE', JSON.stringify(pageList));
  }, [pageList]);

  useEffect(() => {
    window.localStorage.setItem('NAVBAR_PAGE_LINK', JSON.stringify(pageLink));
  }, [pageLink]);

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
    setEmail('@sanfrancisco.edu.ph');
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
            setEmail('@sanfrancisco.edu.ph');
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
      setEmail(lastName + '.' + emailValue + '@sanfrancisco.edu.ph');
      tempEmail = lastName + '.' + emailValue + '@sanfrancisco.edu.ph';
    } else {
      if (firstName === '') {
        setEmail('@sanfrancisco.edu.ph');
        tempEmail = '';
      } else {
        setEmail(emailValue + '@sanfrancisco.edu.ph');
        tempEmail = emailValue + '@sanfrancisco.edu.ph';
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
      .post(
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
      setEmail(emailValue + '.' + firstName + '@sanfrancisco.edu.ph');
      tempEmail = emailValue + '.' + firstName + '@sanfrancisco.edu.ph';
    } else {
      if (lastName === '') {
        setEmail('@sanfrancisco.edu.ph');
        tempEmail = '';
      } else {
        setEmail(emailValue + '@sanfrancisco.edu.ph');
        tempEmail = emailValue + '@sanfrancisco.edu.ph';
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
      .post(
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
      var width = window.localStorage.getItem('NAVBAR_ADMIN_WIDTH');
      setNavbarWidth(width);

      // Logo height
      var height = window.localStorage.getItem('NAVBAR_ADMIN_LOGO');
      setLogoHeight(height);
    }, 1);
  }

  function setWidth() {
    var width = window.localStorage.getItem('NAVBAR_ADMIN_WIDTH');
    setNavbarWidth(width);

    // Logo height
    var height = window.localStorage.getItem('NAVBAR_ADMIN_LOGO');
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

    setEmail('@sanfrancisco.edu.ph');
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
  };

  const typeBulk = () => {
    handleReset();
    setRegisterType('Bulk');
  };

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
        <div className="relative mx-auto p-8 w-full">
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

          <div className="inline-flex lg:px-6 hdScreen:py-6 semihdScreen:py-4 laptopScreen:pb-3 averageScreen:pb-3 xs:p-3">
            <p className="mt-[0.55rem] pr-2 lg:text-xl xs:text-base">Role:</p>
            <div className="flex mt-[0.7rem] lg:text-lg xs:text-xs px-2">
              <button
                onClick={roleStudent}
                className={`lg:px-2 xs:px-1 rounded-lg lg:w-24 transition duration-200 ${
                  accountRole == 'Student'
                    ? 'bg-gray-500 text-white font-semibold'
                    : 'bg-gray-300 hover:bg-gray-400 text-gray-600 hover:text-gray-900'
                }`}
              >
                Student
              </button>
              <button
                onClick={roleTeacher}
                className={` ml-4  lg:px-2 xs:px-1 rounded-lg lg:w-24 transition duration-200 ${
                  accountRole == 'Teacher'
                    ? 'bg-gray-500 text-white font-semibold'
                    : 'bg-gray-300 hover:bg-gray-400 text-gray-600 hover:text-gray-900'
                }`}
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
                className={` lg:px-2 xs:px-1 rounded-lg lg:w-24 hover:bg-gray-400 transition duration-200 ${
                  registerType == 'Single'
                    ? 'bg-gray-500 text-white font-semibold'
                    : 'bg-gray-300 hover:bg-gray-400 text-gray-600 hover:text-gray-900'
                }`}
              >
                Single
              </button>
              <button
                onClick={typeBulk}
                className={` ml-4 lg:px-2 xs:px-1 rounded-lg lg:w-24 hover:bg-gray-400 transition duration-200 ${
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
            <div className="w-full  mt-4  lg:text-2xl xs-text-lg text-black grid place-items-center  ">
              <h1>
                &#40;{' '}
                {accountRole == 'Student'
                  ? 'Student Account'
                  : 'Teacher Account'}{' '}
                &#41;
              </h1>
            </div>

            <form
              onSubmit={handleSubmit}
              action=""
              className="overflow-hidden"
              autoComplete="off"
            >
              <main className="hdScreen:pt-12 semihdScreen:pt-10 laptopScreen:pt-8 averageScreen:pt-6 pb-12 pr-12 min-w-fit hdScreen:text-lg semihdScreen:text-lg laptopScreen:text-base averageScreen:text-base xs:text-xs   overflow-hidden">
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
                        className="py-2 lg:px-2 border-2 w-32  focus:border-none rounded-md border-gray-500 focus:outline-teal-500 focus:ring-teal-500 shadow-sm shadow-[#808080]"
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
                        className="py-2 lg:px-2 border-2 w-32 focus:border-none rounded-md border-gray-500 focus:outline-teal-500 focus:ring-teal-500 shadow-sm shadow-[#808080] "
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
                    className="relative lg:py-3 lg:px-5 sm:py-1.5 sm:px-2.5 xs:px-1 xs:py-1 text-white font-semibold  shadow-md rounded-full bg-lime-600 hover:bg-lime-700 hover:-translate-y-0.5 ease-in-out transition duration-300 transform drop-shadow-[0_3px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_3px_0px_rgba(0,0,0,0.6)]"
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
        </div>
      </div>
      <RegistrationModal onClose={handleOnCloseModal} visible={showModal} />
    </>
  );
}

export default Registration;
