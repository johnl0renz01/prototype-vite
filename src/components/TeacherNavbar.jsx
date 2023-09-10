import React, { Component } from 'react';
import { json, useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

import { BsPersonPlusFill } from 'react-icons/bs';
import { BsFillPersonVcardFill } from 'react-icons/bs';
import { BsGearFill } from 'react-icons/bs';
//import { IconName } from "react-icons/fa";

import EquationSolver from './equationSolver';
import FileUploadForm from './FileUploadForm.jsx';

import { useFormik } from 'formik';
import { editAccountSchema } from '../schemas';
import { editSectionSchema } from '../schemas';
import { addSectionSchema } from '../schemas';

import { MdClose } from 'react-icons/md';
import { VscCheckAll, VscPassFilled } from 'react-icons/vsc';

import { BsJournalText } from 'react-icons/bs';
import { BsJournalPlus } from 'react-icons/bs';
import { BsQuestionCircle } from 'react-icons/bs';
import { BsDoorOpen, BsTelephone } from 'react-icons/bs';
import { TfiShiftLeft } from 'react-icons/tfi';

import Registration from './Registration';
import ContactAdminModal from './ContactAdminModal';
import ContactAdminMessageModal from './ContactAdminMessageModal';

import TeacherNavbarSkeleton from './TeacherNavbarSkeleton';

export default function TeacherNavbar() {
  const navigate = useNavigate();

  /*
  document.onload = function () {
    var account = JSON.parse(window.localStorage.getItem('ACCOUNT_TYPE'));
    if (account === null) account 
    setAccType(account);
  };
  */

  const [tabHighlight, setTabHighlight] = useState(0);
  const [accessReportCard, setAccessReportCard] = useState(false);

  useEffect(() => {
    window.addEventListener('focus', setTabDelay);

    window.localStorage.removeItem('SESSION_FEEDBACK');
    window.localStorage.removeItem('EXPRESSION_HAPPY');
    window.localStorage.removeItem('EXPRESSION_SAD');
    window.localStorage.removeItem('EXPRESSION_ANGRY');
    window.localStorage.removeItem('EXPRESSION_SURPRISED');
    window.localStorage.removeItem('SESSION_SCORE');
    window.localStorage.removeItem('TIMER');
  }, []);

  useEffect(() => {
    setTab();
    setTabDelay();
  });

  function setTabDelay() {
    setTimeout(set, 1);
    function set() {
      setTabHighlight(0);
      var currentTab = JSON.parse(
        window.localStorage.getItem('CURRENT_TAB_INDEX')
      );
      if (currentTab !== null) setTabHighlight(currentTab);
      getCurrentTab();
    }
  }

  function setTab() {
    setTabHighlight(0);
    var currentTab = JSON.parse(
      window.localStorage.getItem('CURRENT_TAB_INDEX')
    );
    if (currentTab !== null) setTabHighlight(currentTab);
    getCurrentTab();
  }

  useEffect(() => {
    window.addEventListener('resize', calculateWidth);
    calculateWidth();

    var data = JSON.parse(window.localStorage.getItem('CURRENT_SECTION'));
    if (data !== null && data !== false) {
      setAccessReportCard(true);
    }
  });

  function calculateWidth() {
    var divElement1 = document.getElementById('teacherNavbar');
    var widthValue1 = ReactDOM.findDOMNode(divElement1).offsetWidth;

    if (widthValue1 == 139) {
      widthValue1 += 4;
    } else if (widthValue1 == 92) {
      widthValue1 += 3;
    } else if (widthValue1 == 156) {
      widthValue1 += 4;
    } else if (widthValue1 == 109) {
      widthValue1 += 3;
    }

    window.sessionStorage.setItem('NAVBAR_TEACHER_WIDTH', widthValue1);
    //console.log(widthValue1);

    //Calculate height logo
    var divElement2 = document.getElementById('logo');
    var heightValue1 = ReactDOM.findDOMNode(divElement2).offsetHeight;
    heightValue1 += 2.5;
    window.sessionStorage.setItem('NAVBAR_TEACHER_LOGO', heightValue1);
    //console.log(heightValue1);

    console.log(widthValue1);
    console.log(heightValue1);
  }

  function getCurrentTab() {
    let highlight = JSON.parse(
      window.localStorage.getItem('CURRENT_TAB_INDEX')
    );
    if (highlight === null || highlight === undefined) {
      setTabHighlight(0);
    } else {
      if (highlight == 0) {
        setTabHighlight(0);
      } else if (highlight == 1) {
        setTabHighlight(1);
      } else if (highlight == 2) {
        setTabHighlight(2);
      } else if (highlight == 3) {
        setTabHighlight(3);
      } else if (highlight == 4) {
        setTabHighlight(4);
      } else if (highlight == 5) {
        setTabHighlight(5);
      }
    }
  }

  const tab1 = () => {
    window.localStorage.setItem('CURRENT_TAB_INDEX', 1);
    getCurrentTab();
    navigate('/ClassList');
  };

  const tab2 = () => {
    window.localStorage.setItem('CURRENT_TAB_INDEX', 2);
    getCurrentTab();
    navigate('/EquationList');
  };

  const tab3 = () => {
    window.localStorage.setItem('CURRENT_TAB_INDEX', 3);
    getCurrentTab();
    navigate('/CreateEquation');
  };

  const tab4 = () => {
    window.localStorage.setItem('CURRENT_TAB_INDEX', 4);

    getCurrentTab();
    navigate('/HelpPageTeacher');
  };

  const [accType, setAccType] = useState('');
  useEffect(() => {
    var account = JSON.parse(window.localStorage.getItem('ACCOUNT_TYPE'));
    if (account === null) account = '';
    setAccType(account);

    var logged = JSON.parse(window.localStorage.getItem('LOGGED'));
    if (logged === null) logged = '';
    if (logged !== null) {
      if (logged == 'TRUE') {
        if (account == 'Teacher') {
          setLogoutState(false);
        } else {
          setLogoutState(true);
        }
      } else {
        setLogoutState(true);
      }
    }
  });

  const [logoutState, setLogoutState] = useState(false);

  const logout = () => {
    setLogoutState(true);
    window.localStorage.removeItem('CURRENT_TAB_INDEX');

    var unique = JSON.parse(window.localStorage.getItem('UNIQUE_ID'));
    if (unique === null) unique = '';
    axios
      .post(
        `http://localhost:80/Prototype-Vite/my-project/api/logout/${unique}`
      )
      .then(function (response) {
        localStorage.clear();
        window.localStorage.setItem('LOGGED', JSON.stringify('FALSE'));
        setTabHighlight(0);
        navigate('/LoginPage');
        document.body.style.backgroundImage =
          'linear-gradient(to top, #bef264, #d9f99d , #ccf779)';
      });
  };

  const [sidebarMode, setSidebarMode] = useState('Maximized');

  const adjustSidebar = () => {
    if (sidebarMode == 'Maximized') {
      setSidebarMode('Minimized');
    } else {
      setSidebarMode('Maximized');
    }
    calculateWidth();
  };

  const overview = () => {
    window.localStorage.removeItem('CURRENT_TAB_INDEX');
    setTabHighlight(0);
    navigate('/HomePageTeacher');
  };

  const contactAdmin = () => {
    setShowModal(true);
  };

  // MODAL CONTACT ADMIN
  const [showModal, setShowModal] = useState(false);
  const handleOnCloseModal = () => setShowModal(false);

  const [choiceModal, setChoiceModal] = useState(false);

  const handleOnContinueModal = () => {
    setShowModal(false);
    setShowModal2(true);
  };

  // MODAL CONTACT ADMIN MESSAGE
  const [showModal2, setShowModal2] = useState(false);
  const handleOnCloseModal2 = () => setShowModal2(false);

  const handleOnContinueModal2 = () => {
    setShowModal2(false);
  };

  //FOR SKELETON

  const [skeletonState, setSkeletonState] = useState(true);

  useEffect(() => {
    var logged = JSON.parse(window.localStorage.getItem('LOGGED'));
    if (logged === null) logged = '';

    var account = JSON.parse(window.localStorage.getItem('ACCOUNT_TYPE'));
    if (account === null) account = '';

    if (logged == 'TRUE') {
      if (account != 'Teacher') {
        setSkeletonState(false);
      }
    } else {
      setSkeletonState(false);
    }
  }, []);

  // This will run one time after the component mounts
  useEffect(() => {
    // callback function to call when event triggers
    const onPageLoad = () => {
      setTimeout(hideNavbar, 1);

      function hideNavbar() {
        setSkeletonState(false);
      }
      // do something else
    };

    // Check if the page has already loaded
    if (document.readyState === 'complete') {
      onPageLoad();
    } else {
      window.addEventListener('load', onPageLoad, false);
      // Remove the event listener when component unmounts
      return () => window.removeEventListener('load', onPageLoad);
    }
  }, []);

  return (
    <>
      <div className={`${!skeletonState ? 'hidden' : ''}`}>
        <TeacherNavbarSkeleton />
      </div>

      <div
        className={`${accType == 'Teacher' ? 'visible' : 'hidden'} ${
          logoutState == true ? 'hidden' : ''
        }
        
        `}
      >
        <div
          id="teacherNavbar"
          className="sm:flex xs:hidden md:flex lg:flex flex-col bg-gradient-to-b from-[#95cd35] via-[#9ec15c] to-[#a8c05f] text-center  h-screen fixed z-50 drop-shadow-[0_0px_5px_rgba(0,0,0,0.30)] overflow-y-auto"
        >
          <div className="">
            <ul className="text-xs">
              <li
                id="logo"
                className=" border-b-2 pt-4 text-white border-black/5 mx-auto"
              >
                <i
                  onClick={overview}
                  className={`cursor-pointer fas fa-graduation-cap  lg:text-6xl xs:text-3xl mb-4 ${
                    sidebarMode == 'Minimized'
                      ? ''
                      : 'hover:scale-115 transition duration-200'
                  }`}
                ></i>
              </li>
              <li
                onClick={tab1}
                className={`cursor-pointer  border-b-2 border-black/5 ${
                  tabHighlight == 1
                    ? 'bg-white/[75%] text-lime-700 '
                    : 'hover:bg-black/30 text-white transition duration-300'
                }
                
                ${
                  sidebarMode == 'Minimized'
                    ? 'pb-2.5 pt-2'
                    : 'hdScreen:pb-1 hdScreen:pt-2 semihdScreen:pb-1 semihdScreen:pt-2 laptopScreen:pb-[0.2rem] laptopScreen:pt-1.5 averageScreen:pb-[0.18rem] averageScreen:pt-1.5 sm:pb-0.5 sm:pt-1 xs:pb-[0.1rem] xs:pt-0.5'
                }
                
                ${accessReportCard ? '' : 'hidden'}`}
              >
                <div className="relative text-center font-bold">
                  <BsFillPersonVcardFill className="hdScreen:text-[2.2rem] semihdScreen:text-[2rem] laptopScreen:text-[1.6rem] averageScreen:text-[1.5rem] mx-auto -mb-1" />
                  <span
                    className={`lg:text-base xs:text-xs font-poppins font-semibold lg:px-4 ${
                      sidebarMode == 'Minimized' ? 'hidden' : ''
                    }`}
                  >
                    Report Cards
                  </span>
                </div>
              </li>
              <li
                onClick={tab2}
                className={`cursor-pointer border-b-2 border-black/5 ${
                  tabHighlight == 2
                    ? 'bg-white/[75%] text-lime-700'
                    : 'hover:bg-black/30 text-white transition duration-300'
                }
                ${
                  sidebarMode == 'Minimized'
                    ? 'pb-2.5 pt-2'
                    : 'hdScreen:pb-1 hdScreen:pt-2 semihdScreen:pb-1 semihdScreen:pt-2 laptopScreen:pb-[0.2rem] laptopScreen:pt-1.5 averageScreen:pb-[0.18rem] averageScreen:pt-1.5 sm:pb-0.5 sm:pt-1 xs:pb-[0.1rem] xs:pt-0.5'
                }
                `}
              >
                <div className="relative text-center  font-bold ">
                  <BsJournalText className="hdScreen:text-[2.2rem] semihdScreen:text-[2rem] laptopScreen:text-[1.6rem] averageScreen:text-[1.5rem] mx-auto -mb-0.5" />
                  <span
                    className={`lg:text-base xs:text-xs font-poppins font-semibold lg:px-2 ${
                      sidebarMode == 'Minimized' ? 'hidden' : ''
                    }`}
                  >
                    Equation List
                  </span>
                </div>
              </li>
              <li
                onClick={tab3}
                className={`cursor-pointer border-b-2 border-black/5 ${
                  tabHighlight == 3
                    ? 'bg-white/[75%] text-lime-700'
                    : 'hover:bg-black/30 text-white transition duration-300'
                }
                
                ${
                  sidebarMode == 'Minimized'
                    ? 'pb-2.5 pt-2'
                    : 'hdScreen:pb-1 hdScreen:pt-3 semihdScreen:pb-1 semihdScreen:pt-3 laptopScreen:pb-[0.2rem] laptopScreen:pt-1.5 averageScreen:pb-[0.18rem] averageScreen:pt-1.5 sm:pb-0.5 sm:pt-1 xs:pb-[0.1rem] xs:pt-0.5'
                }`}
              >
                <div className="relative text-center  font-bold ">
                  <BsJournalPlus className="hdScreen:text-[2.2rem] semihdScreen:text-[2rem] laptopScreen:text-[1.6rem] averageScreen:text-[1.5rem] mx-auto " />
                  <span
                    className={`lg:text-base xs:text-xs font-poppins font-semibold lg:px-2 ${
                      sidebarMode == 'Minimized' ? 'hidden' : ''
                    }`}
                  >
                    Create Equation
                  </span>
                </div>
              </li>
              <li
                onClick={tab4}
                className={`cursor-pointer border-b-2 border-black/5 ${
                  tabHighlight == 4
                    ? 'bg-white/[75%] text-lime-700'
                    : 'hover:bg-black/30 text-white transition duration-300'
                }
                ${
                  sidebarMode == 'Minimized'
                    ? 'pb-2.5 pt-2'
                    : 'hdScreen:pb-1 hdScreen:pt-3 semihdScreen:pb-1 semihdScreen:pt-3 laptopScreen:pb-[0.2rem] laptopScreen:pt-1.5 averageScreen:pb-[0.18rem] averageScreen:pt-1.5 sm:pb-0.5 sm:pt-1 xs:pb-[0.1rem] xs:pt-0.5'
                }`}
              >
                <div className="relative text-center  font-bold">
                  <BsQuestionCircle className="hdScreen:text-[2.2rem] semihdScreen:text-[2rem] laptopScreen:text-[1.6rem] averageScreen:text-[1.5rem] mx-auto " />
                  <span
                    className={`lg:text-base xs:text-xs font-poppins font-semibold lg:px-2 ${
                      sidebarMode == 'Minimized' ? 'hidden' : ''
                    }`}
                  >
                    Help
                  </span>
                </div>
              </li>
              <li
                onClick={contactAdmin}
                className={`cursor-pointer border-b-2 border-black/5 hover:bg-black/30 text-white transition duration-300
                ${
                  sidebarMode == 'Minimized'
                    ? 'pb-2.5 pt-2'
                    : 'hdScreen:pb-1 hdScreen:pt-3 semihdScreen:pb-1 semihdScreen:pt-3 laptopScreen:pb-[0.2rem] laptopScreen:pt-1.5 averageScreen:pb-[0.18rem] averageScreen:pt-1.5 sm:pb-0.5 sm:pt-1 xs:pb-[0.1rem] xs:pt-0.5'
                }`}
              >
                <div className="relative text-center  font-bold">
                  <BsTelephone className="hdScreen:text-[1.8rem] semihdScreen:text-[1.7rem] laptopScreen:text-[1.4rem] averageScreen:text-[1.3rem] mx-auto " />
                  <span
                    className={`lg:text-base xs:text-xs font-poppins font-semibold lg:px-2 ${
                      sidebarMode == 'Minimized' ? 'hidden' : ''
                    }`}
                  >
                    Contact Admin
                  </span>
                </div>
              </li>
              <li
                onClick={logout}
                className={`cursor-pointer border-b-2 border-black/5 hover:bg-black/30 text-white transition duration-300 ${
                  sidebarMode == 'Minimized'
                    ? 'pb-2.5 pt-2'
                    : 'hdScreen:pb-1 hdScreen:pt-3 semihdScreen:pb-1 semihdScreen:pt-3 laptopScreen:pb-[0.2rem] laptopScreen:pt-1.5 averageScreen:pb-[0.18rem] averageScreen:pt-1.5 sm:pb-0.5 sm:pt-1 xs:pb-[0.1rem] xs:pt-0.5'
                }
                `}
              >
                <div className="relative text-center  font-bold">
                  <BsDoorOpen className="hdScreen:text-[2.2rem] semihdScreen:text-[2rem] laptopScreen:text-[1.6rem] averageScreen:text-[1.5rem] mx-auto " />
                  <span
                    className={`lg:text-base xs:text-xs font-poppins font-semibold lg:px-2 ${
                      sidebarMode == 'Minimized' ? 'hidden' : ''
                    }`}
                  >
                    Log-out
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex mt-auto justify-center">
            <div
              onClick={adjustSidebar}
              title="Minimize the sidebar"
              className={`w-full cursor-pointer border-black/5 py-3 hover:bg-black/30 text-white transition duration-300
                `}
            >
              <div
                className={`relative text-center font-bold transition duration-200 ${
                  sidebarMode == 'Minimized' ? 'scale-x-[-1]' : ''
                }`}
              >
                <TfiShiftLeft className="hdScreen:text-[2.2rem] semihdScreen:text-[2rem] laptopScreen:text-[1.6rem] averageScreen:text-[1.5rem] mx-auto " />
              </div>
              {/* 
              <div className="flex justify-center  font-bold">
                <TfiShiftLeft className="hdScreen:text-[2.2rem] semihdScreen:text-[2rem] laptopScreen:text-[1.6rem] averageScreen:text-[1.5rem]" />
                <span className="lg:text-base xs:text-xs font-poppins font-semibold lg:mt-1.5 lg:pl-0.5 lg:pr-3">
                  Minimize
                </span>
              </div>
              */}
            </div>
          </div>
        </div>
      </div>
      <ContactAdminModal
        onClose={handleOnCloseModal}
        visible={showModal}
        onContinue={handleOnContinueModal}
      />
      <ContactAdminMessageModal
        onClose={handleOnCloseModal2}
        visible={showModal2}
        onContinue={handleOnContinueModal2}
      />
    </>
  );
}
