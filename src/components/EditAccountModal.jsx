import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import { useFormik } from 'formik';
import { editAccountModalSchema } from '../schemas';
import { MdClose } from 'react-icons/md';

import LoadingSpinner from './LoadingSpinner';

const EditAccountModal = ({ visible, onClose, onContinue }) => {
  const [showLoading, setShowLoading] = useState(false);

  const [accountRole, setAccountRole] = useState('');
  const navigate = useNavigate();

  const [sectionData, setSectionData] = useState([]);

  function getSections() {
    axios
      .get('https://pia-sfe.online/api/sectionList/')
      .then(function (response) {
        //console.log(response.data);
        setSectionData(response.data);
      });
  }

  useEffect(() => {
    getSections();
    setEmail('@sf.edu.ph');
  }, []);

  const [middleName, setMiddleName] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [gender, setGender] = useState('');
  const [groupType, setGroupType] = useState('');
  const [section, setSection] = useState('');
  const [originalEmail, setOriginalEmail] = useState('');

  useEffect(() => {
    var accountName = JSON.parse(
      window.sessionStorage.getItem('CURRENT_ACCOUNT_EDIT')
    );

    var editState = JSON.parse(
      window.sessionStorage.getItem('EDIT_ACCOUNT_STATE')
    );
    //console.log(editState);

    if (editState == true) {
      window.sessionStorage.setItem('EDIT_ACCOUNT_STATE', false);
      getAccountDetails(accountName);
      setShowLoading(true);
      //loadValues();
    }
  });

  function getAccountDetails(accountName) {
    let accountLink = accountName.replace(/ /g, '_');
    accountLink = accountName.replace(/"/g, ' ');
    //console.log('ACCOUNT LINK', accountLink);

    axios
      .get(`https://pia-sfe.online/api/accountDetails/${accountLink}`)
      .then(function (response) {
        //console.log(response.data);
        var result = Object.values(response.data);

        var keys = [];
        for (var k in result[0]) keys.push(result[0][k]);

        window.sessionStorage.setItem(
          'EDIT_ACCOUNT_NAME',
          JSON.stringify(keys[10])
        );

        function setValues() {
          let fName = keys[1];
          fName = fName.replace(/\s/g, '');
          fName = fName.toLowerCase();

          let lName = keys[3];
          lName = lName.replace(/\s/g, '');
          lName = lName.toLowerCase();

          setFirstName(fName);
          setMiddleName(keys[2]);
          setLastName(lName);
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
        setShowLoading(false);
      });
  }

  const onSubmit = async (values, actions) => {
    //console.log('SUBMITTED');
    var validForm = JSON.parse(window.sessionStorage.getItem('IS_VALID_FORM'));
    if (validForm && validForm !== null) {
      setShowLoading(true);
      axios
        .post(`https://pia-sfe.online/api/editAccount/${originalEmail}`, values)
        .then(function (response) {
          //console.log(response.data);
          //window.location.reload(false);
          //window.localStorage.setItem('SESSION_EMAIL',JSON.stringify(values.email));
          setShowLoading(false);
          onContinue();
        })
        .catch(function (error) {
          setShowLoading(false);
        });

      await new Promise(resolve => setTimeout(resolve, 1));
    }
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
    //console.log('ASDJASDJAS');

    values.firstName = firstName;
    values.middleName = middleName;
    values.lastName = lastName;
    values.sex = gender;
    values.section = section;
    values.groupType = groupType;
    values.gradeLevel = gradeLevel;
    values.email = email;

    //console.log(values.gradeLevel);
    //console.log(values.groupType);
  }

  const handleOnClose = e => {
    if (e.target.id === 'mainContainer')
      handleReset(), resetValues(), onClose();
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

    //console.log(values.age);
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

    var currentEmail = JSON.parse(
      window.sessionStorage.getItem('EDIT_ACCOUNT_NAME')
    );
    if (tempEmail != currentEmail) {
      window.sessionStorage.setItem('IS_VALID_FORM', false);
      axios
        .get(`https://pia-sfe.online/api/verifyEmail/${tempEmail}`)
        .then(function (response) {
          //console.log(response.data);
          if (response.data === 'duplicate') {
            setDuplicateState(true);
            window.sessionStorage.setItem('IS_VALID_FORM', false);
          } else {
            setDuplicateState(false);
            window.sessionStorage.setItem('IS_VALID_FORM', true);
          }
        });
    }
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

    var currentEmail = JSON.parse(
      window.sessionStorage.getItem('EDIT_ACCOUNT_NAME')
    );
    if (tempEmail != currentEmail) {
      window.sessionStorage.setItem('IS_VALID_FORM', false);
      axios
        .get(`https://pia-sfe.online/api/verifyEmail/${tempEmail}`)
        .then(function (response) {
          //console.log(response.data);
          if (response.data === 'duplicate') {
            setDuplicateState(true);
            window.sessionStorage.setItem('IS_VALID_FORM', false);
          } else {
            setDuplicateState(false);
            window.sessionStorage.setItem('IS_VALID_FORM', true);
          }
        });
    }
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
      sex: '',
      section: '',
      groupType: '',
      gradeLevel: '',
      email: '',
      //password: '',
      //confirmPassword: '',
      isDuplicate: false,
    },
    validationSchema: editAccountModalSchema,
    onSubmit,
  });

  const [registerType, setRegisterType] = useState('');

  function resetValues() {
    setDuplicateState(false);
  }

  if (!visible) return null;

  return (
    <>
      <div
        id="mainContainer"
        onClick={handleOnClose}
        className={`fixed top-0 z-50 inset-0 bg-black bg-opacity-50 backdrop-blur-[1.5px] flex justify-center items-center "
        ${showLoading ? 'invisible' : ''}`}
      >
        <div className="bg-white hdScreen:scale-100 semihdScreen:scale-90 laptopScreen:scale-85 averageScreen:scale-80 md:scale-80 sm:scale-80 xs:scale-75 rounded lg:text-lg md:text-base sm:text-sm xs:text-xs shadow-md ">
          <div className="grid grid-cols-2 bg-gray-300">
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
              <main className="py-12 pr-12 min-w-fit lg:text-lg md:text-base sm:text-sm xs:text-xs   overflow-hidden">
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
                        className="py-2 lg:px-2 border-2 focus:border-none rounded-md border-gray-500 focus:outline-teal-500 focus:ring-teal-500 shadow-sm shadow-[#808080]"
                      >
                        <option className="hdScreen:text-lg semihdScreen:text-base laptopScreen:text-base averageScreen:text-base">
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
                          <option
                            key={index}
                            className="hdScreen:text-lg semihdScreen:text-base laptopScreen:text-base averageScreen:text-base"

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
                        }
                        ${
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
                  </div>
                  {duplicateState ? (
                    <p className="text-red-500  -ml-[9rem] mt-2">
                      * This email is already taken.
                    </p>
                  ) : (
                    ''
                  )}
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
                  className={`relative px-12 py-1.5  rounded-lg font-semibold  transition duration-300 text-white bg-red-600 hover:bg-red-700 `}
                >
                  <span className="font-normal lg:text-lg md:text-base sm:text-sm xs:text-xs flex justify-center">
                    Cancel
                  </span>
                </button>
                <button
                  onClick={function () {
                    onSubmit;
                  }}
                  type="submit"
                  className="relative ml-6 py-1.5 px-4 mr-1.5  rounded-lg font-semibold  transition duration-300 text-white bg-lime-600 hover:bg-lime-700"
                >
                  <span className="font-normal  lg:text-lg md:text-base sm:text-sm xs:text-xs flex justify-center">
                    Apply Changes
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <LoadingSpinner visible={showLoading} />
    </>
  );
};

export default EditAccountModal;
