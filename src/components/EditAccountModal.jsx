import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

import { useFormik } from 'formik';
import { editAccountModalSchema } from '../schemas';

import { VscCheckAll, VscPassFilled } from 'react-icons/vsc';

import { BsSlashCircle } from 'react-icons/bs';

import { MdClose } from 'react-icons/md';
import { VscQuestion } from 'react-icons/vsc';

const EditAccountModal = ({ visible, onClose, onContinue }) => {
  const [accountRole, setAccountRole] = useState('');
  const navigate = useNavigate();

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
  }, []);

  const [middleName, setMiddleName] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [gender, setGender] = useState('');
  const [groupType, setGroupType] = useState('');
  const [section, setSection] = useState('');
  const [originalEmail, setOriginalEmail] = useState('');

  useEffect(() => {
    var accountName = JSON.parse(
      window.localStorage.getItem('CURRENT_ACCOUNT_EDIT')
    );

    var editState = JSON.parse(
      window.localStorage.getItem('EDIT_ACCOUNT_STATE')
    );
    console.log(editState);

    if (editState == true) {
      window.localStorage.setItem('EDIT_ACCOUNT_STATE', false);
      getAccountDetails(accountName);
      //loadValues();
    }
  });

  function getAccountDetails(accountName) {
    let accountLink = accountName.replace(/ /g, '_');
    accountLink = accountName.replace(/"/g, ' ');
    console.log('ACCOUNT LINK', accountLink);

    axios
      .get(
        `http://localhost:80/Prototype-Vite/my-project/api/accountDetails/${accountLink}`
      )
      .then(function (response) {
        console.log(response.data);
        var result = Object.values(response.data);

        var keys = [];
        for (var k in result[0]) keys.push(result[0][k]);

        window.localStorage.setItem(
          'EDIT_ACCOUNT_NAME',
          JSON.stringify(keys[10])
        );

        function setValues() {
          setFirstName(keys[1]);
          setMiddleName(keys[2]);
          setLastName(keys[3]);
          setGender(keys[6]);
          setGradeLevel(keys[7]);
          setSection(keys[8]);
          setGroupType(keys[9]);
          setEmail(keys[10]);
          setOriginalEmail(keys[10]);
          setAccountRole(keys[12]);

          values.firstName = keys[1];
          values.middleName = keys[2];
          values.lastName = keys[3];
          values.sex = keys[6];
          values.gradeLevel = keys[7];
          values.section = keys[8];
          values.groupType = keys[9];
          values.email = keys[10];
        }

        setValues();
      });
  }

  const onSubmit = async (values, actions) => {
    console.log('SUBMITTED');
    axios
      .post(
        `http://localhost:80/Prototype-Vite/my-project/api/editAccount/${originalEmail}`,
        values
      )
      .then(function (response) {
        console.log(response.data);
        //window.location.reload(false);
      });
    window.localStorage.setItem('SESSION_EMAIL', JSON.stringify(values.email));
    await new Promise(resolve => setTimeout(resolve, 1));
    window.alert('Changes have been applied successfully.');
    window.location.reload(false);
  };

  const middleNameChange = event => {
    const value = event.target.value;
    values.middleName = value;
    setMiddleName(value);
  };

  const gradeLevelChange = event => {
    const value = event.target.value;
    values.gradeLevel = value;
    setGradeLevel(value);
  };

  const genderChange = event => {
    const value = event.target.value;
    values.sex = value;
    setGender(value);
  };

  const sectionChange = event => {
    const value = event.target.value;
    values.section = value;
    setSection(value);
  };

  const groupTypeChange = event => {
    const value = event.target.value;
    values.groupType = value;
    setGroupType(value);
  };

  function loadValues() {
    console.log('ASDJASDJAS');

    values.firstName = firstName;
    values.middleName = middleName;
    values.lastName = lastName;
    values.sex = gender;
    values.section = section;
    values.groupType = groupType;
    values.gradeLevel = gradeLevel;
    values.email = email;

    console.log(values.gradeLevel);
    console.log(values.groupType);
  }

  const [navbarWidth, setNavbarWidth] = useState(0);
  const [logoHeight, setLogoHeight] = useState(0);

  useEffect(() => {
    document.body.style.backgroundImage =
      'linear-gradient(to top, #e2e2e2, #f1f1f1 , #ffffff)';

    window.addEventListener('resize', setWidth);
    setWidth();
  });

  function setWidth() {
    var width = window.localStorage.getItem('NAVBAR_TEACHER_WIDTH');
    setNavbarWidth(width);

    // Logo height
    var height = window.localStorage.getItem('NAVBAR_TEACHER_LOGO');
    setLogoHeight(height);
  }

  const handleOnClose = e => {
    if (e.target.id === 'mainContainer') onClose();
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

  const firstNameChange = event => {
    setFirstName(event.target.value);

    const value = event.target.value;
    var emailValue = value.replace(/\s/g, '');
    emailValue = emailValue.toLowerCase();

    values.firstName = value;
    handleChange.firstName;

    fName = emailValue;

    if (lastName != '') {
      var tempLastName = lastName;
      tempLastName = tempLastName.replace(/\s/g, '');
      tempLastName = tempLastName.toLowerCase();

      setEmail(tempLastName + '.' + emailValue + '@sanfrancisco.edu.ph');
      tempEmail = tempLastName + '.' + emailValue + '@sanfrancisco.edu.ph';
    } else {
      if (firstName === '') {
        setEmail('');
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
  };

  const lastNameChange = event => {
    setLastName(event.target.value);

    const value = event.target.value;
    var emailValue = value.replace(/\s/g, '');
    emailValue = emailValue.toLowerCase();

    values.lastName = value;
    handleChange.lastName;

    lName = emailValue;

    if (firstName != '') {
      var tempFirstName = firstName;
      tempFirstName = tempFirstName.replace(/\s/g, '');
      tempFirstName = tempFirstName.toLowerCase();

      setEmail(emailValue + '.' + tempFirstName + '@sanfrancisco.edu.ph');
      tempEmail = emailValue + '.' + tempFirstName + '@sanfrancisco.edu.ph';
    } else {
      if (lastName === '') {
        setEmail('');
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
  };

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
      firstName: '',
      middleName: '',
      lastName: '',
      //birthDay: '',
      //age: '',
      sex: '',
      section: '',
      groupType: '',
      gradeLevel: '',
      email: '',
      //password: '',
      //confirmPassword: '',
    },
    validationSchema: editAccountModalSchema,
    onSubmit,
  });

  const [registerType, setRegisterType] = useState('');

  function resetValues() {
    values.firstName = '';
    values.middleName = '';
    values.lastName = '';
    values.sex = '';
    values.section = '';
    values.groupType = '';
    values.gradeLevel = '';
    values.email = '';
    setEmail(' ');
  }

  if (!visible) return null;

  return (
    <>
      <div
        id="mainContainer"
        onClick={handleOnClose}
        className={`fixed top-0 z-50 inset-0 bg-black bg-opacity-[0%] backdrop-blur-[4px] flex justify-center items-center "
        ${
          navbarWidth == 176
            ? 'w-[calc(100%-176px)] ml-[176px]'
            : navbarWidth == 168
            ? 'w-[calc(100%-168px)] ml-[168px]'
            : navbarWidth == 108
            ? 'w-[calc(100%-108px)] ml-[108px]'
            : navbarWidth == 95
            ? 'w-[calc(100%-95px)] ml-[95px]'
            : 'w-[calc(100%-176px)] ml-[176px]'
        }`}
      >
        <div className="bg-white  rounded lg:text-lg xs:text-xs shadow-md ">
          <div className="grid grid-cols-2 bg-gray-300 border-b-2 border-gray-300">
            <span className="lg:text-xl xs:text-lg ml-2 mt-0.5 text-black/60 font-semibold">
              {' '}
              Edit Account{' '}
            </span>
            <div className="text-right">
              <button
                onClick={onClose}
                className="bg-gray-400/70 p-2 inline-block hover:bg-red-600 transition duration-200 hover:text-white"
              >
                <MdClose />
              </button>
            </div>
          </div>
          <div className=" text-center text-gray-800">
            <form
              onSubmit={handleSubmit}
              action=""
              className="overflow-hidden"
              autoComplete="off"
            >
              <main className="py-12 pr-12 min-w-fit lg:text-lg xs:text-xs   overflow-hidden">
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
                        value={firstName}
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
                        value={lastName}
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
                  <div>
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
                        className="py-2 lg:px-2 border-2 w-32  focus:border-none rounded-md border-gray-500 focus:outline-teal-500 focus:ring-teal-500 shadow-sm shadow-[#808080]"
                      >
                        <option className="">Grade 7</option>
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
                          <option
                            key={index}
                            className=""

                            /* {...(section == section.SectionName
                              ? { selected }
                              : {})}
                              */
                          >
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
              </main>
              <div className="mx-auto text-center border-t-2 border-gray-300 py-3">
                <button
                  onClick={onClose}
                  className={`relative px-12 py-1.5  rounded-full font-semibold  transition duration-300 text-white bg-red-600 hover:bg-red-700 `}
                >
                  <span className="font-normal lg:text-lg xs:text-xs flex justify-center">
                    Close
                  </span>
                </button>
                <button
                  onClick={function () {
                    onSubmit;
                  }}
                  type="submit"
                  className="relative ml-6 py-1.5 px-4 mr-1.5  rounded-full font-semibold  transition duration-300 text-white bg-lime-600 hover:bg-lime-700"
                >
                  <span className="font-normal  lg:text-lg xs:text-xs flex justify-center">
                    Apply Changes
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditAccountModal;
