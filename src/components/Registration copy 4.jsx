import React, { Component } from 'react';
import { useFormik } from 'formik';
import { registrationSchema } from '../schemas';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import * as ReactDOM from 'react-dom';
import $, { uniqueSort } from 'jquery';

import * as XLSX from 'xlsx';

import {
  VscCheckAll,
  VscDebugBreakpointLog,
  VscPassFilled,
} from 'react-icons/vsc';

import {
  BsXCircleFill,
  BsPlus,
  BsSlashCircle,
  BsExclamationCircle,
} from 'react-icons/bs';
import { BsArrowCounterclockwise } from 'react-icons/bs';

import { GoChecklist } from 'react-icons/go';
import { HiPlusSmall } from 'react-icons/hi2';

import { HiPencilSquare } from 'react-icons/hi2';
import { BsArrowDownSquare } from 'react-icons/bs';

import RegistrationModal from './RegistrationModal';
import ViewErrorModal from './ViewErrorModal';
import IgnoreWarningModal from './IgnoreWarningModal';
import RegistrationBulkModal from './RegistrationBulkModal';

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
        //console.log(response.data);
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

      //For bulk register
      bulkGradeLevel: '',
      bulkSection: '',
      isValidSection: false,
      isDuplicateAccount: false,
      totalRows: 0,
      totalErrors: 0,
    },

    validationSchema: registrationSchema,
    onSubmit,
  });

  //FOR MODAL MESSAGE
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
    document.getElementById('upload').value = null;
  };

  const typeBulk = () => {
    handleReset();
    setRegisterType('Bulk');
  };

  var studentArr = [];

  //const [studentArray, setStudentArray] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [validationStatus, setValidationStatus] = useState([]);
  const [gradeNumber, setGradeNumber] = useState('');
  const [sectionString, setSectionString] = useState('');
  const [validSection, setValidSection] = useState(false);

  const [errorAccount, setErrorAccount] = useState([]);
  const [errorTally, setErrorTally] = useState(0);

  //const [emails, setEmails] = useState([]);
  const [duplicateAccount, setDuplicateAccount] = useState([]);

  const handleFileUpload = e => {
    //RESET VALUES
    window.sessionStorage.setItem('IS_ERROR_RESET_STATES', true);
    window.sessionStorage.setItem('IS_ERROR_RESET_STATES_IGNORE', true);
    setTimeout(setErrorTally(0), 1);
    setTimeout(setErrorAccount([]), 1);
    //setTimeout(setValidationStatus([]), 1);
    var temporary = [];
    var emails = [];
    var duplicates = [];
    var rowErrorMultiple = [];
    var rowErrorDuplicate = [];
    var errorsCount = 0;
    values.isDuplicateAccount = false;
    values.isValidSection = false;
    values.totalRows = 0;
    values.totalErrors = 0;
    values.bulkGradeLevel = '';
    values.bulkSection = '';

    window.sessionStorage.removeItem('IS_ERROR_SECTION_NAME');
    window.sessionStorage.removeItem('IS_ERROR_SECTION');
    window.sessionStorage.removeItem('IS_ERROR_ACCOUNT_MULTIPLE');
    window.sessionStorage.removeItem('IS_ERROR_MULTIPLE_ROW');
    window.sessionStorage.removeItem('IS_ERROR_ACCOUNT_DUPLICATE');
    window.sessionStorage.removeItem('IS_ERROR_DUPLICATE_ROW');
    window.sessionStorage.removeItem('IS_ERROR_ACCOUNT_MULTIPLE_IGNORE');
    window.sessionStorage.removeItem('IS_ERROR_ACCOUNT_DUPLICATE_IGNORE');

    setStudentList([]);
    setValidationStatus([]);
    setGradeNumber([]);
    setSectionString('');
    setValidSection(false);

    setErrorAccount([]);
    setErrorTally(0);

    setDuplicateAccount([]);

    setIgnored(false);
    //END OF RESET

    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = e => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      console.log(parsedData);
      temporary = parsedData;

      for (let i = 0; i < temporary.length; i++) {
        console.log(i);
        var currentData = JSON.stringify(temporary[i]);
        //console.log(currentData);
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

              //console.log('eI: ' + endIndex);

              if (isEnd) {
                //console.log(currentData.substring(firstIndex, endIndex));

                userData.push(currentData.substring(firstIndex, endIndex));
                isEnd = false;
                if (isNumber) {
                  firstIndex = i + 1;
                  isNumber = false;
                }

                isComma = false;
              }
            }
          }

          /////////////////

          console.log(userData);
          if (userData.length < 7) {
            //setValidationStatus(validation);
            setStudentList(parsedData);
            return;
          } else {
            //ADD TO TOTAL ROWS
            values.totalRows = values.totalRows + 1;

            if (i == 0) {
              var gradeLvl = userData[0];
              var sect = userData[1];
              sect = sect.toLowerCase().replace(/\b[a-z]/g, function (letter) {
                return letter.toUpperCase();
              });

              // CHECK GRADELEVEL - SECTION IF DUPLICATE
              setGradeNumber(gradeLvl);
              setSectionString(sect);

              values.bulkGradeLevel = gradeLvl;
              values.bulkSection = sect;

              console.log('ASDASDASDAS');
              var sectionValidate = sect.replace(/ /g, '_');
              console.log(sectionValidate);
              axios
                .get(
                  `http://localhost:80/Prototype-Vite/my-project/api/verifySection/${sectionValidate}`
                )
                .then(function (response) {
                  console.log(response.data);

                  var result = response.data;
                  if (result == 'unique') {
                    values.isValidSection = true;
                    window.sessionStorage.setItem('IS_ERROR_SECTION', false);
                    window.sessionStorage.removeItem('IS_ERROR_SECTION_NAME');
                    setValidSection(true);
                  } else {
                    values.isValidSection = false;
                    window.sessionStorage.setItem('IS_ERROR_SECTION', true);
                    window.sessionStorage.setItem(
                      'IS_ERROR_SECTION_NAME',
                      JSON.stringify(sect)
                    );
                    errorsCount++;
                    setErrorTally(errorsCount);
                    values.totalErrors = values.totalErrors + 1;
                  }
                  console.log(values.isValidSection);
                });
            }

            let fname = userData[2].replace(/ /g, '');
            let lname = userData[5].replace(/ /g, '');
            var email =
              lname.toLowerCase() + '.' + fname.toLowerCase() + '@sf.edu.ph';

            //for duplication within excel file
            for (let j = 0; j < emails.length; j++) {
              console.log(emails[j]);
              console.log(email);
              if (emails[j] == email) {
                if (duplicates.includes(email)) {
                  errorsCount++;
                  values.totalErrors = values.totalErrors + 1;
                } else {
                  errorsCount += 2;
                  values.totalErrors = values.totalErrors + 2;
                  duplicates.push(email);
                  window.sessionStorage.setItem(
                    'IS_ERROR_ACCOUNT_MULTIPLE',
                    true
                  );
                  window.sessionStorage.setItem(
                    'IS_ERROR_ACCOUNT_MULTIPLE_IGNORE',
                    true
                  );

                  var row = 'Row #' + (j + 1).toString();
                  rowErrorMultiple.push(row.toString());
                }

                setDuplicateAccount(oldArray => [
                  ...oldArray,
                  'row' + j.toString(),
                ]);
                setDuplicateAccount(oldArray => [
                  ...oldArray,
                  'row' + i.toString(),
                ]);

                setErrorTally(errorsCount);

                values.isDuplicateAccount = true;

                var row = 'Row #' + (i + 1).toString();
                rowErrorMultiple.push(row.toString());
                console.log('ROW MUL: ');
                console.log(rowErrorMultiple);

                let array = JSON.stringify(rowErrorMultiple);
                window.sessionStorage.setItem('IS_ERROR_MULTIPLE_ROW', array);
                break;
              }
            }

            console.log('set the email!!');
            emails.push(email);
            console.log(emails);
            //for duplication in accounts database
            axios
              .get(
                `http://localhost:80/Prototype-Vite/my-project/api/verifyEmailBulk/${email}@row${i}`
              )
              .then(function (response) {
                console.log(response.data);

                var result = response.data;
                //setValidationStatus(oldArray => [...oldArray, result]);

                if (result == 'unique') {
                } else {
                  errorsCount++;
                  setErrorTally(errorsCount);
                  values.totalErrors = values.totalErrors + 1;
                  setErrorAccount(oldArray => [...oldArray, result]);

                  var row = result.charAt(0).toUpperCase() + result.slice(1);
                  let number = parseInt(row.substring(3));
                  row = row.substring(0, 3) + ' #' + (number + 1);
                  rowErrorDuplicate.push(row.toString());
                  console.log('ROW DUP: ' + rowErrorDuplicate);
                  let array = JSON.stringify(rowErrorDuplicate);
                  window.sessionStorage.setItem(
                    'IS_ERROR_DUPLICATE_ROW',
                    array
                  );

                  window.sessionStorage.setItem(
                    'IS_ERROR_ACCOUNT_DUPLICATE',
                    true
                  );
                  window.sessionStorage.setItem(
                    'IS_ERROR_ACCOUNT_DUPLICATE_IGNORE',
                    true
                  );
                }
              });
          }
        }

        console.log(i + 1);
        if (i + 1 == temporary.length) {
          console.log(i);
          setStudentList(parsedData);
        }
      }
    };
    console.log(rowErrorMultiple);
    console.log(rowErrorDuplicate);

    /*
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
          });
      }
    }
    */
  };

  const bulkRegister = () => {
    setShowModal4(true);
    var grade_level = values.bulkGradeLevel;
    var section_name = values.bulkSection;

    //var child = document.getElementById('row1').childNodes[3];
    //console.log(child.nodeName);

    var table = document.getElementById('main_table');
    var tbodyRowCount = table.tBodies[0].rows.length;

    for (let i = 0; i < tbodyRowCount; i++) {
      let link = '';
      let rowID = 'row' + i.toString();
      for (let j = 1; j < 7; j++) {
        let index = j; // second element
        let child = document.getElementById(rowID).childNodes[index];

        let value = child.innerText;

        if (value == '[Account invalid for registration.]') {
          link = '';
          break;
        } else if (value == '[Account valid for registration.]') {
          break;
        }
        value = value.replace(/\(/g, '');
        value = value.replace(/\)/g, '');

        link = link + value;

        if (j < 5) {
          link = link + '@';
        }

        if (value == 'Teacher') {
          break;
        }
      }

      if (link != '') {
        link = link + '@' + grade_level + '@' + section_name;
        link = link.replace(/ /g, '_');
        console.log(link);

        axios
          .post(
            `http://localhost:80/Prototype-Vite/my-project/api/registerBulk/${link}`
          )
          .then(function (response) {
            console.log(response.data);
          });
      }
    }
  };

  useEffect(() => {}, []);

  const [ignored, setIgnored] = useState(false);

  //FOR MODAL ERROR
  const [showModal2, setShowModal2] = useState(false);
  const handleOnCloseModal2 = () => setShowModal2(false);

  //FOR MODAL IGNORE
  const [showModal3, setShowModal3] = useState(false);
  const handleOnCloseModal3 = () => setShowModal3(false);

  const handleOnContinueModal3 = () => {
    setIgnored(true);
    setShowModal3(false);
  };

  const ignoreWarning = () => {
    setShowModal3(true);
  };

  const showErrors = () => {
    setShowModal2(true);
  };

  //FOR BULK REGISTER MESSAGE
  const [showModal4, setShowModal4] = useState(false);
  const handleOnCloseModal4 = () => {
    //RESET
    window.sessionStorage.setItem('IS_ERROR_RESET_STATES', true);
    window.sessionStorage.setItem('IS_ERROR_RESET_STATES_IGNORE', true);
    setTimeout(setErrorTally(0), 1);
    setTimeout(setErrorAccount([]), 1);

    values.isDuplicateAccount = false;
    values.isValidSection = false;
    values.totalRows = 0;
    values.totalErrors = 0;
    values.bulkGradeLevel = '';
    values.bulkSection = '';

    window.sessionStorage.removeItem('IS_ERROR_SECTION_NAME');
    window.sessionStorage.removeItem('IS_ERROR_SECTION');
    window.sessionStorage.removeItem('IS_ERROR_ACCOUNT_MULTIPLE');
    window.sessionStorage.removeItem('IS_ERROR_MULTIPLE_ROW');
    window.sessionStorage.removeItem('IS_ERROR_ACCOUNT_DUPLICATE');
    window.sessionStorage.removeItem('IS_ERROR_DUPLICATE_ROW');
    window.sessionStorage.removeItem('IS_ERROR_ACCOUNT_MULTIPLE_IGNORE');
    window.sessionStorage.removeItem('IS_ERROR_ACCOUNT_DUPLICATE_IGNORE');

    setStudentList([]);
    setValidationStatus([]);
    setGradeNumber([]);
    setSectionString('');
    setValidSection(false);

    setErrorAccount([]);
    setErrorTally(0);

    setDuplicateAccount([]);

    setIgnored(false);

    setShowModal4(false);
    document.getElementById('single').click();
    document.getElementById('bulk').click();
  };

  console.log(errorTally);
  console.log(validationStatus);

  useEffect(() => {
    //setValidationStatus(validation);
  }, [studentList]);

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
                id="single"
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
                id="bulk"
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
                    className="relative lg:py-2 lg:px-4 sm:py-1.5 sm:px-2.5 xs:px-1 xs:py-1 text-white font-semibold  shadow-md rounded-xl bg-lime-600 hover:bg-lime-700  ease-in-out transition duration-300 transform drop-shadow-[0_3px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_3px_0px_rgba(0,0,0,0.6)]"
                    onClick={onSubmit}
                  >
                    <span className="pl-2 lg:text-xl sm:text-base xs:text-sm flex justify-center">
                      Register
                      <BsPlus className="lg:text-3xl" />
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
                <div
                  className={`ml-4 px-4  border-2  rounded-xl 
                ${
                  values.isValidSection
                    ? 'border-gray-400/60'
                    : 'text-red-500 border-red-500'
                }`}
                >
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

                <Link
                  role="button"
                  to="/files/Bulk_Registration-TEMPLATE.xlsx"
                  target="_blank"
                  download
                  className="rounded-xl bg-blue-500 hover:bg-blue-600 py-1 pl-5 pr-10 mr-5 text-white relative  shadow-sm  drop-shadow-[0_3px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_3px_0px_rgba(0,0,0,0.6)] "
                >
                  Template File
                  <span
                    className={` absolute  right-4 font-normal text-base flex justify-center
                  ${studentList.length > 0 ? 'top-[0.25rem]' : 'top-[0.2rem]'}`}
                  >
                    <BsArrowDownSquare className="ml-1 lg:mt-[0.2rem] lg:text-lg text-white" />
                  </span>
                </Link>
              </div>
            </div>

            <div className="md:mt-6 xs:mt-3 rounded-3xl shadow overflow-hidden bg-gradient-to-t from-gray-200 via-gray-100 to-white  ">
              {studentList.length > 0 && (
                <table className="w-full leading-normal ">
                  <thead className="sticky top-0 z-40 shadow-md border-b-2 border-gray-200 bg-gray-200 text-left uppercase tracking-wider md:text-base xs:text-xs font-bold text-gray-600">
                    <tr>
                      <th className="lg:pl-8 w-[6%] md:text-base sm:text-sm">
                        #
                      </th>
                      {Object.keys(studentList[0]).map((key, index) =>
                        index > 1 && index != 3 ? (
                          <th
                            key={key}
                            className={` py-3 md:text-base sm:text-sm
                            ${index == 2 ? 'w-[15%]' : ''} 
                            ${index == 4 ? 'w-[15%]' : ''}
                            ${index == 5 ? 'w-[16.75%]' : ''}
                            ${index == 6 ? 'w-[16%]' : ''}
                            `}
                          >
                            {key}
                          </th>
                        ) : (
                          <></>
                        )
                      )}
                      <th className="w-[19.5%] md:text-base sm:text-sm">
                        Status
                      </th>
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
                        <table
                          id="main_table"
                          className="min-w-full leading-normal -mt-[28px] relative"
                        >
                          <thead className="invisible text-left uppercase tracking-wider font-bold md:text-base xs:text-xs">
                            <tr>
                              <th className="lg:pl-8 w-[6%]">#</th>
                              {Object.keys(studentList[0]).map((key, index) =>
                                index > 1 && index != 3 ? (
                                  <th
                                    key={key}
                                    className={`${
                                      index == 2 ? 'w-[15.25%]' : ''
                                    } 
                                  ${index == 4 ? 'w-[15%]' : ''}
                                  ${index == 5 ? 'w-[17%]' : ''}
                                  ${index == 6 ? 'w-[16%]' : ''}
                                  ${index == 7 ? 'w-[10%]' : ''}`}
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
                                  id={`row${counter}`}
                                  key={counter}
                                  className={`odd:bg-white even:bg-slate-50/30 hover:bg-gray-100 hover:text-indigo-600 border-b border-gray-200 bg-white  text-gray-900 
                                  ${
                                    errorAccount[counter] == 'unique' ? '' : ''
                                  }`}
                                >
                                  <td className="lg:pl-8 md:text-base sm:text-sm py-[10px]">
                                    <div className="h-2">{counter + 1}</div>
                                  </td>
                                  {Object.values(row).map((value, index) =>
                                    index > 1 && index != 3 ? (
                                      <td
                                        name={value}
                                        key={index}
                                        className={`  md:text-base sm:text-sm py-[10px]
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

                                    {duplicateAccount.includes(
                                      'row' + counter.toString()
                                    ) ? (
                                      <div
                                        className={`flex ${
                                          ignored
                                            ? 'line-through text-gray-600'
                                            : ''
                                        }`}
                                      >
                                        <BsXCircleFill
                                          className={`mr-1 mt-1 lg:text-xl ${
                                            ignored
                                              ? 'text-gray-500'
                                              : 'text-red-500'
                                          } `}
                                        />
                                        <span
                                          className={` font-semibold ${
                                            ignored
                                              ? 'text-gray-600'
                                              : 'text-red-600'
                                          }`}
                                        >
                                          [Account invalid for registration.]
                                        </span>
                                      </div>
                                    ) : errorAccount.includes(
                                        'row' + counter.toString()
                                      ) ? (
                                      <div
                                        className={`flex ${
                                          ignored
                                            ? 'line-through text-gray-600'
                                            : ''
                                        }`}
                                      >
                                        <BsXCircleFill
                                          className={`mr-1 mt-1 lg:text-xl ${
                                            ignored
                                              ? 'text-gray-500'
                                              : 'text-red-500'
                                          } `}
                                        />
                                        <span
                                          className={` font-semibold ${
                                            ignored
                                              ? 'text-gray-600'
                                              : 'text-red-600'
                                          }`}
                                        >
                                          [Account invalid for registration.]
                                        </span>
                                      </div>
                                    ) : (
                                      <div className="flex ">
                                        <VscPassFilled className="mr-1 mt-0.5  lg:text-2xl text-lime-600" />

                                        <span className="text-lime-600 font-semibold">
                                          [Account valid for registration.]
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
                className={`w-full flex justify-between rounded-b-3xl border-2 border-gray-400/40 border-t-gray-400/10 bg-gray-200 py-2.5 pb-3.5 px-5  drop-shadow-[0_2px_2px_rgba(0,0,0,0.35)]
                ${studentList.length > 0 ? '' : 'hidden'}`}
              >
                <div className="mt-2 text-lg">
                  {errorTally > 1 ? (
                    <>
                      [{errorTally}] errors have been{' '}
                      {ignored ? <>ignored</> : <>found</>}.
                    </>
                  ) : errorTally > 0 ? (
                    <>
                      [{errorTally}] error has been{' '}
                      {ignored ? <>ignored</> : <>found</>}.
                    </>
                  ) : (
                    <>No errors found.</>
                  )}
                </div>
                <div>
                  <button
                    type="button"
                    className={`relative lg:py-1.5 lg:px-4 sm:py-1.5 sm:px-2.5 xs:px-1 xs:py-1 text-white font-normal  shadow-md rounded-xl bg-gray-500/90 hover:bg-gray-600  ease-in-out transition duration-300 drop-shadow-[0_3px_0px_rgba(0,0,0,0.55)] hover:drop-shadow-[0_3px_0px_rgba(0,0,0,0.75)]
                    ${
                      sectionString == ''
                        ? 'hidden'
                        : studentList.length == 0
                        ? 'hidden'
                        : ''
                    }`}
                    onClick={showErrors}
                  >
                    <span className="lg:text-lg sm:text-base xs:text-sm flex justify-center">
                      {errorTally > 1 ? <>View Errors</> : <>View Error</>}

                      <BsExclamationCircle className="lg:mt-[0.25rem] xs:mt-[0.1rem] lg:ml-2 xs:ml-1 lg:text-[1.2rem] xs:text-[1rem]" />
                    </span>
                  </button>
                  <button
                    type="button"
                    className={`ml-4 relative lg:py-1.5 lg:px-4 sm:py-1.5 sm:px-2.5 xs:px-1 xs:py-1 text-white font-normal   shadow-md rounded-xl bg-red-600/90 hover:bg-red-700  ease-in-out transition duration-300 drop-shadow-[0_3px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_3px_0px_rgba(0,0,0,0.6)]
                    ${
                      values.totalErrors == values.totalRows
                        ? 'hidden'
                        : ignored
                        ? 'hidden'
                        : errorTally > 0
                        ? validSection
                          ? ''
                          : 'hidden'
                        : validSection
                        ? ''
                        : 'hidden'
                    }`}
                    onClick={ignoreWarning}
                  >
                    <span className="lg:text-lg sm:text-base xs:text-sm flex justify-center">
                      {errorTally > 1 ? (
                        <>Ignore Warnings</>
                      ) : (
                        <>Ignore Warning</>
                      )}
                      <BsSlashCircle className="lg:mt-[0.25rem] xs:mt-[0.1rem] lg:ml-2 xs:ml-1 lg:text-[1.2rem] xs:text-[1rem]" />
                    </span>
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`ml-4 relative lg:py-1.5 lg:px-3 sm:py-1.5 sm:px-2.5 xs:px-1 xs:py-1 text-white font-semibold  shadow-md rounded-xl bg-lime-600 hover:bg-lime-700  ease-in-out transition duration-300 drop-shadow-[0_3px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_3px_0px_rgba(0,0,0,0.6)]
                    ${errorTally > 0 ? (ignored ? '' : 'hidden') : ''}
                    
                    ${
                      sectionString == ''
                        ? 'hidden'
                        : studentList.length == 0
                        ? 'hidden'
                        : ''
                    }
                   `}
                    onClick={
                      errorTally > 0
                        ? ignored
                          ? bulkRegister
                          : null
                        : bulkRegister
                    }
                  >
                    <span className="pl-2 lg:text-lg sm:text-base xs:text-sm flex justify-center">
                      Register
                      <BsPlus className=" lg:text-[1.8rem]" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RegistrationModal onClose={handleOnCloseModal} visible={showModal} />
      <ViewErrorModal onClose={handleOnCloseModal2} visible={showModal2} />
      <IgnoreWarningModal
        onClose={handleOnCloseModal3}
        visible={showModal3}
        onContinue={handleOnContinueModal3}
      />
      <RegistrationBulkModal
        onClose={handleOnCloseModal4}
        visible={showModal4}
      />
    </>
  );
}

export default Registration;
