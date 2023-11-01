import React, { Component } from 'react';
import { json, useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

import {
  BsPersonPlusFill,
  BsPersonFill,
  BsGear,
  BsArchive,
  BsBoxSeam,
  BsInboxes,
} from 'react-icons/bs';
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

import { BsJournalText, BsEnvelope } from 'react-icons/bs';
import { BsJournalPlus } from 'react-icons/bs';
import { BsQuestionCircle } from 'react-icons/bs';
import { BsDoorOpen, BsTelephone } from 'react-icons/bs';
import { TfiShiftLeft } from 'react-icons/tfi';

import Registration from './Registration';

import TeacherNavbarSkeleton from './TeacherNavbarSkeleton';

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

import ViewDetailModal from './ViewDetailModal';
import ViewDetailMessageModal from './ViewDetailMessageModal';
import LoadingSpinner from './LoadingSpinner';

import StorageData from './StorageData';
import SecureStorageData from './SecureStorageData';

import ChangePasswordModal from './ChangePasswordModal';
import ChangePasswordMessageModal from './ChangePasswordMessageModal';

import ManageSubscription from './ManageSubscription';

export default function TeacherNavbar() {
  const [showLoading, setShowLoading] = useState(false);
  const [tableLoader, setTableLoader] = useState(false);
  var highestTimeoutId = setTimeout(';');

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

    var account = StorageData.localStorageJSON('ACCOUNT_TYPE');
    if (account != 'Student') {
      window.localStorage.removeItem('SESSION_FEEDBACK');
      window.localStorage.removeItem('EXPRESSION_HAPPY');
      window.localStorage.removeItem('EXPRESSION_SAD');
      window.localStorage.removeItem('EXPRESSION_ANGRY');
      window.localStorage.removeItem('EXPRESSION_SURPRISED');
      window.localStorage.removeItem('SESSION_SCORE');
      window.localStorage.removeItem('TIMER');
    }
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

    var data = StorageData.localStorageJSON('CURRENT_SECTION');
    if (data !== null && data !== false) {
      setAccessReportCard(true);
    } else {
      setAccessReportCard(false);
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

    //console.log(widthValue1);
    //console.log(heightValue1);
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
    navigate('/MyRequest');
  };

  const tab5 = () => {
    window.localStorage.setItem('CURRENT_TAB_INDEX', 5);

    getCurrentTab();
    navigate('/HelpPageTeacher');
  };

  const [accType, setAccType] = useState('');
  useEffect(() => {
    var account = StorageData.localStorageJSON('ACCOUNT_TYPE');
    if (account === null) account = '';
    setAccType(account);

    var logged = JSON.parse(window.localStorage.getItem('LOGGED'));
    if (logged === null) logged = '';
    if (logged !== null) {
      var terminated = JSON.parse(window.localStorage.getItem('LOGIN_STATUS'));
      if (logged == 'TRUE') {
        if (account == 'Teacher') {
          setLogoutState(false);
        } else {
          setLogoutState(true);
        }
      } else {
        if (terminated === null) {
          setLogoutState(true);
        }
      }
    }

    var accountName = StorageData.localStorageJSON('SESSION_FULLNAME');
    if (accountName !== null) {
      setSessionName(accountName);
    }
  });

  const [sessionName, setSessionName] = useState('');

  const [logoutState, setLogoutState] = useState(false);

  const logout = () => {
    setShowLoading(true);

    window.localStorage.removeItem('CURRENT_TAB_INDEX');

    var unique = JSON.parse(window.localStorage.getItem('UNIQUE_ID'));
    if (unique === null) unique = '';
    axios
      .post(
        `http://localhost:80/Prototype-Vite/my-project/api/logout/${unique}`
      )
      .then(function (response) {
        setShowLoading(false);
        setLogoutState(true);
        localStorage.clear();
        window.localStorage.setItem('LOGGED', JSON.stringify('FALSE'));
        setTabHighlight(0);
        navigate('/LoginPage');
        document.body.style.backgroundImage =
          'linear-gradient(to top, #bef264, #d9f99d , #ccf779)';
      })
      .catch(function (error) {
        setShowLoading(false);
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

  //FOR SKELETON

  const [skeletonState, setSkeletonState] = useState(true);

  useEffect(() => {
    var logged = JSON.parse(window.localStorage.getItem('LOGGED'));
    if (logged === null) logged = '';

    var account = StorageData.localStorageJSON('ACCOUNT_TYPE');
    if (account === null) account = '';

    if (logged == 'TRUE') {
      if (account != 'Teacher') {
        setSkeletonState(false);
      }
    } else {
      setSkeletonState(false);
    }
  }, []);

  /*
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
  */

  /// FOR NOTIFICATIONS
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  window.addEventListener('mouseleave', getRequests);
  window.addEventListener('enter', getRequests);
  window.addEventListener('mouseover', updateNotifs);

  function updateNotifs() {
    var updateState = JSON.parse(
      window.localStorage.getItem('UPDATE_NOTIFICATION_STATE')
    );
    if (updateState === null) updateState = false;

    if (updateState == true) {
      window.localStorage.setItem('UPDATE_NOTIFICATION_STATE', false);
      getRequests();
    }
  }

  useEffect(() => {
    getRequests();
  }, []);

  const [requests, setRequests] = useState([]);

  function getRequests() {
    let email = StorageData.localStorageJSON('SESSION_EMAIL');
    axios
      .get(
        `http://localhost:80/Prototype-Vite/my-project/api/requestNotificationUser/${email}`
      )
      .then(function (response) {
        setRequests(response.data);
      })
      .catch(function (error) {});
  }

  const viewMode = e => {
    let requestID = e.currentTarget.name;

    window.sessionStorage.setItem(
      'CURRENT_VIEW_DETAIL',
      JSON.stringify(SecureStorageData.dataEncryption(requestID))
    );
    window.sessionStorage.setItem('VIEW_DETAIL_STATE', true);
    setShowModal(true);

    let role = StorageData.localStorageJSON('ACCOUNT_TYPE');
    axios
      .post(
        `http://localhost:80/Prototype-Vite/my-project/api/requestSeen/${requestID}@${role}`
      )
      .then(function (response) {
        getRequests();
      })
      .catch(function (error) {});
  };

  // MODAL VIEW
  const [showModal, setShowModal] = useState(false);
  const handleOnCloseModal = () => setShowModal(false);

  const handleOnContinueModal = () => {
    setShowModal(false);
    setShowMessageModal(true);
  };

  // MODAL VIEW MESSAGE

  const [showMessageModal, setShowMessageModal] = useState(false);
  const handleOnCloseMessageModal = () => setShowMessageModal(false);

  // MODAL CHANGE
  const [showModal2, setShowModal2] = useState(false);
  const handleOnCloseModal2 = () => setShowModal2(false);

  const handleOnContinueModal2 = () => {
    setShowModal2(false);
    setShowMessageModal2(true);
  };

  // MODAL CHANGE MESSAGE

  const [showMessageModal2, setShowMessageModal2] = useState(false);
  const handleOnCloseMessageModal2 = () => setShowMessageModal2(false);

  // MODAL MANAGE SUBSCRIPTION
  const [showModal3, setShowModal3] = useState(false);
  const handleOnCloseModal3 = () => setShowModal3(false);

  const handleOnContinueModal3 = () => {
    setShowModal3(false);
  };
  return (
    <>
      {/** 
      <div className={`${!skeletonState ? 'hidden' : ''}`}>
        <TeacherNavbarSkeleton />
      </div>
*/}
      <div
        className={`${accType == 'Teacher' ? 'visible' : 'hidden'} ${
          logoutState == true ? 'hidden' : ''
        }
        
        `}
      >
        <div className="absolute z-[50] right-0 averageScreen:mt-1 sm:-mt-4 xs:-mt-2 ">
          <li className="flex items-center lg:p-8 xs:p-8 lg:gap-x-2 xs:gap-x-0">
            <ul className="">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="averageScreen:scale-100 sm:scale-60 xs:scale-50 inline-flex w-full justify-center rounded-md  sm:p-6 xs:p-4 lg:mt-0 md:mt-0 sm:mt-0 xs:mt-0.5  bg-gray-200/40 hover:bg-gray-200  lg:text-xl md:text-xl sm:text-sm xs:text-xs font-normal text-gray-700   focus:outline-none  focus:ring-offset-gray-200">
                    <p className="flex">
                      <span
                        title="Notifications"
                        className={` fa fa-bell  w-7 h-7 lg:text-3xl md:text-2xl  xs:text-lg averageScreen:-ml-3 sm:-ml-2 -mt-3 sm:pt-0 xs:pt-1
                                  ${
                                    requests.length > 0 ? 'bell' : 'steady-bell'
                                  }`}
                      ></span>
                      {requests.length > 0 ? (
                        <span className="rounded-full w-5 h-5 bg-red-500 absolute -right-2 top-0 text-white font-leagueSpartan  text-sm leading-6 ">
                          {requests.length}
                        </span>
                      ) : (
                        <></>
                      )}
                    </p>
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items
                    className={` absolute right-0 z-10 averageScreen:mt-2 sm:-mt-1.5 xs:-mt-1  origin-top-right rounded-md bg-white shadow-lg border-2 border-black/20 ring-1 ring-black ring-opacity-5 focus:outline-none 
                     
                    }`}
                  >
                    <div className="py-1 overflow-y-auto max-h-[70vh]">
                      {requests.length > 0 ? (
                        <>
                          {requests.map((currentRequest, index) => (
                            <>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={viewMode}
                                    name={currentRequest.RequestID}
                                    id={currentRequest.RequestID}
                                    className={classNames(
                                      active
                                        ? 'bg-gray-100 text-gray-900 '
                                        : 'text-gray-700 border-b-2 border-b-black/20 ',
                                      `block px-2 py-2 text-sm text-left bg-white hover:bg-gray-200
                                      `
                                    )}
                                  >
                                    <p className=" px-1 w-[14rem]  semihdScreen:text-base laptopScreen:text-sm averageScreen:text-sm xs:text-xs">
                                      <span className="font-semibold">
                                        Administrator
                                      </span>{' '}
                                      has replied to the request "
                                      <span className="font-semibold">
                                        {currentRequest.Subject}
                                      </span>
                                      "
                                      <br />
                                      <span className="text-xs font-normal">
                                        {currentRequest.Timestamp}
                                      </span>
                                    </p>
                                  </button>
                                )}
                              </Menu.Item>
                            </>
                          ))}
                        </>
                      ) : (
                        <>
                          <Menu.Item>
                            <button
                              onClick={null}
                              disabled
                              className={
                                'cursor-default block w-full px-4 py-2 text-left text-sm '
                              }
                            >
                              <p className="whitespace-nowrap semihdScreen:text-base laptopScreen:text-sm averageScreen:text-sm xs:text-xs">
                                There are no new notification(s).
                              </p>
                            </button>
                          </Menu.Item>
                        </>
                      )}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </ul>

            <ul className="">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="sm:p-[0.45rem] xs:p-1.5 cursor-pointer rounded-md text-gray-400 bg-gray-200/40 hover:bg-gray-200">
                    <BsPersonFill className="lg:w-9 lg:h-9 sm:h-auto sm:w-auto xs:h-2.5 xs:w-2.5"></BsPersonFill>
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items
                    className={` absolute right-0 z-10 averageScreen:mt-2 sm:mt-1 xs:mt-0.5  origin-top-right rounded-md bg-white shadow-lg border-2 border-black/20 ring-1 ring-black ring-opacity-5 focus:outline-none 
                     
                    }`}
                  >
                    <div className="py-1 overflow-y-auto max-h-[70vh] ">
                      <Menu.Item>
                        <div className=" select-none text-gray-700 border-b-2 border-b-gray-300 block w-full px-2 py-2 text-left text-sm whitespace-nowrap ">
                          <p className="flex px-1">
                            {' '}
                            <span className="font-semibold  mt-[0.1rem]  min-w-[3.5rem] semihdScreen:text-lg laptopScreen:text-base averageScreen:text-base xs:text-sm lg:mt-0 md:mt-1  xs:-mt-0.5">
                              {sessionName}
                            </span>
                          </p>
                        </div>
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => setShowModal2(true)}
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900 '
                                : 'text-gray-700 border-b-2 border-b-gray-200/80',
                              'block w-full px-4 py-2 text-left text-sm whitespace-nowrap '
                            )}
                          >
                            <p className="flex px-1">
                              {' '}
                              <BsGear className="lg:text-2xl md:text-2xl sm:text-sm  xs:text-xs -ml-2" />
                              <span className="ml-1.5 mt-[0.1rem]  min-w-[3.5rem] semihdScreen:text-base laptopScreen:text-sm averageScreen:text-sm xs:text-xs lg:mt-0 md:mt-1  xs:-mt-0.5">
                                Change Password
                              </span>
                            </p>
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => setShowModal3(true)}
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900 '
                                : 'text-gray-700 border-b-2 border-b-gray-200/80',
                              'block w-full px-4 py-2 text-left text-sm whitespace-nowrap '
                            )}
                          >
                            <p className="flex px-1">
                              {' '}
                              <BsInboxes className="lg:text-2xl md:text-2xl sm:text-sm  xs:text-xs -ml-2" />
                              <span className="ml-1.5 mt-[0.1rem]  min-w-[3.5rem] semihdScreen:text-base laptopScreen:text-sm averageScreen:text-sm xs:text-xs lg:mt-0 md:mt-1  xs:-mt-0.5">
                                Manage Subscription
                              </span>
                            </p>
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </ul>
          </li>
        </div>
        {/**WILL CAUSE SPEED ISSUES */}
        <div
          onMouseEnter={e => {
            getRequests();
            window.localStorage.setItem('UPDATE_REQUEST_STATE', true);
          }}
          onMouseLeave={e => {
            getRequests;
            window.localStorage.setItem('UPDATE_REQUEST_STATE', true);
          }}
          id="teacherNavbar"
          className="sm:flex xs:hidden md:flex lg:flex flex-col bg-gradient-to-b from-[#95cd35] via-[#9ec15c] to-[#a8c05f] text-center  h-screen fixed z-50 drop-shadow-[0_0px_5px_rgba(0,0,0,0.30)] overflow-y-auto"
        >
          <div className="">
            <ul className="text-xs">
              <li
                title="Overview"
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
                title="Report Cards"
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
                title="Equation List"
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
                title="Create Equation"
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
                title="My Requests"
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
                  <BsEnvelope className="hdScreen:text-[1.8rem] semihdScreen:text-[1.7rem] laptopScreen:text-[1.4rem] averageScreen:text-[1.3rem] mx-auto " />
                  <span
                    className={`lg:text-base xs:text-xs font-poppins font-semibold lg:px-2 ${
                      sidebarMode == 'Minimized' ? 'hidden' : ''
                    }`}
                  >
                    My Requests
                  </span>
                </div>
              </li>
              <li
                title="Help"
                onClick={tab5}
                className={`cursor-pointer border-b-2 border-black/5 ${
                  tabHighlight == 5
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
                title="Log-out"
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
              {...(sidebarMode == 'Minimized'
                ? {
                    title: 'Expand the sidebar.',
                  }
                : { title: 'Collapse the sidebar' })}
              onClick={adjustSidebar}
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
      <ViewDetailModal
        onClose={handleOnCloseModal}
        visible={showModal}
        onContinue={handleOnContinueModal}
      />
      <ViewDetailMessageModal
        onClose={handleOnCloseMessageModal}
        visible={showMessageModal}
      />

      <ChangePasswordModal
        onClose={handleOnCloseModal2}
        visible={showModal2}
        onContinue={handleOnContinueModal2}
      />
      <ChangePasswordMessageModal
        onClose={handleOnCloseMessageModal2}
        visible={showMessageModal2}
      />

      <ManageSubscription
        onClose={handleOnCloseModal3}
        visible={showModal3}
        onContinue={handleOnContinueModal3}
      />

      <LoadingSpinner visible={showLoading} />
    </>
  );
}
