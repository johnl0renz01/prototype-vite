import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

import { HiOutlineArrowLeftOnRectangle } from 'react-icons/hi2';
import { HiChevronDoubleRight } from 'react-icons/hi2';
import { HiArrowUturnRight } from 'react-icons/hi2';

import { BsChevronBarRight } from 'react-icons/bs';

import { BsFillPersonLinesFill } from 'react-icons/bs';
import { BsPersonPlusFill } from 'react-icons/bs';
import { BsPersonExclamation } from 'react-icons/bs';
import { BsGear } from 'react-icons/bs';
//import { IconName } from "react-icons/fa";

import EquationSolver from './equationSolver';
import FileUploadForm from './FileUploadForm.jsx';

import { useFormik } from 'formik';
import { editAccountSchema } from '../schemas';
import { editSectionSchema } from '../schemas';
import { addSectionSchema } from '../schemas';

import { MdClose } from 'react-icons/md';
import { VscCheckAll, VscPassFilled } from 'react-icons/vsc';

import { BsXCircleFill } from 'react-icons/bs';
import { BsX } from 'react-icons/bs';
import { BsArrowCounterclockwise } from 'react-icons/bs';
import { BsSlashCircle } from 'react-icons/bs';
import { BsTrash3 } from 'react-icons/bs';

import { GoChecklist } from 'react-icons/go';
import { HiPlusSmall } from 'react-icons/hi2';

import { BsReceiptCutoff } from 'react-icons/bs';
import { BsPeople } from 'react-icons/bs';
import { BsPersonAdd } from 'react-icons/bs';
import { BsPersonGear } from 'react-icons/bs';
import { BsDoorOpen } from 'react-icons/bs';
import { BsReverseLayoutTextSidebarReverse } from 'react-icons/bs';
import { BsQuestionCircle } from 'react-icons/bs';

import { TfiShiftLeft } from 'react-icons/tfi';

import { VscEyeClosed } from 'react-icons/vsc';
import { VscEye } from 'react-icons/vsc';

import { HiPencilSquare } from 'react-icons/hi2';

import Registration from './Registration';

import AdminNavbarSkeleton from './AdminNavbarSkeleton';

import ViewDetailModal from './ViewDetailModal';
import ViewDetailMessageModal from './ViewDetailMessageModal';

import LoadingSpinner from './LoadingSpinner';

import StorageData from './StorageData';
import SecureStorageData from './SecureStorageData';

export default function AdminNavbar() {
  const [showLoading, setShowLoading] = useState(false);

  const navigate = useNavigate();

  const [tabHighlight, setTabHighlight] = useState(0);

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
    window.addEventListener('resize', calculateWidthAdmin);
    calculateWidthAdmin();
    getCurrentTab();
  });

  function calculateWidthAdmin() {
    var divElement1 = document.getElementById('adminNavbar');
    var widthValue1 = ReactDOM.findDOMNode(divElement1).offsetWidth;
    if (widthValue1 == 168) {
      widthValue1 += 8;
    } else if (widthValue1 == 185) {
      widthValue1 += 8;
    } else if (widthValue1 == 119) {
      widthValue1 += 6;
    } else if (widthValue1 == 104) {
      widthValue1 += 4;
    } else if (widthValue1 == 102) {
      widthValue1 += 6;
    }

    window.sessionStorage.setItem('NAVBAR_ADMIN_WIDTH', widthValue1);
    //console.log(widthValue1);

    //Calculate height logo
    var divElement2 = document.getElementById('logo');
    var heightValue1 = ReactDOM.findDOMNode(divElement2).offsetHeight;
    heightValue1 += 2.5;
    window.sessionStorage.setItem('NAVBAR_ADMIN_LOGO', heightValue1);

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
      } else if (highlight == 6) {
        setTabHighlight(6);
      } else if (highlight == 7) {
        setTabHighlight(7);
      }
    }
  }

  const tab1 = () => {
    window.localStorage.setItem('CURRENT_TAB_INDEX', 1);
    getCurrentTab();
    navigate('/ManageAccount');
  };

  const tab2 = () => {
    window.localStorage.setItem('CURRENT_TAB_INDEX', 2);
    getCurrentTab();
    navigate('/ManageSection');
  };

  const tab3 = () => {
    window.localStorage.setItem('CURRENT_TAB_INDEX', 3);
    getCurrentTab();
    navigate('/Registration');
  };

  /*
  const tab4 = () => {
    window.localStorage.setItem('CURRENT_TAB_INDEX', 4);
    getCurrentTab();
    navigate('/ResetPassword');
  };
  */

  const tab4 = () => {
    window.localStorage.setItem('CURRENT_TAB_INDEX', 4);
    getCurrentTab();
    navigate('/UserRequest');
  };

  const tab5 = () => {
    window.localStorage.setItem('CURRENT_TAB_INDEX', 5);
    getCurrentTab();
    navigate('/HelpPageAdmin');
  };

  const homePage = () => {
    window.localStorage.removeItem('CURRENT_TAB_INDEX');
    setTabHighlight(0);
    navigate('/HomePageAdmin');
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
        if (account == 'Admin') {
          setLogoutState(false);
        } else {
          setLogoutState(true);
        }
      } else {
        if (terminated === null) {
          setLogoutState(true);
        }
      }
    } else {
      setLogoutState(true);
    }
  });

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
          'linear-gradient(to top, #9ee622, #b1eb52, #ccf779)';
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
    calculateWidthAdmin();
    window.blur();
  };

  //FOR SKELETON

  const [skeletonState, setSkeletonState] = useState(true);

  useEffect(() => {
    var logged = JSON.parse(window.localStorage.getItem('LOGGED'));
    if (logged === null) logged = '';

    var account = StorageData.localStorageJSON('ACCOUNT_TYPE');
    if (account === null) account = '';

    if (logged == 'TRUE') {
      if (account != 'Admin') {
        setSkeletonState(false);
      }
    } else {
      setSkeletonState(false);
    }
  }, []);

  // This will run one time after the component mounts

  /*
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
    axios
      .get(
        `http://localhost:80/Prototype-Vite/my-project/api/requestNotificationAdmin/`
      )
      .then(function (response) {
        window.localStorage.setItem('UPDATE_REQUEST_STATE', true);
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

  return (
    <>
      {/** 
      <div className={`${!skeletonState ? 'hidden' : ''}`}>
        <AdminNavbarSkeleton />
      </div>
      */}
      <div
        className={`${accType == 'Admin' ? 'visible' : 'hidden'} ${
          logoutState == true ? 'hidden' : ''
        }`}
      >
        <div className="absolute z-[50] averageScreen:right-0 sm:-right-3 xs:-right-3 averageScreen:mt-1 sm:-mt-4 xs:-mt-2 ">
          <li className="flex items-center">
            <ul className="p-8">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="averageScreen:scale-100 sm:scale-60 xs:scale-50 inline-flex w-full justify-center rounded-md  sm:p-6 xs:p-4 lg:mt-0 md:mt-0 sm:mt-0 xs:mt-0.5  bg-gray-200/40 hover:bg-gray-200  lg:text-xl md:text-xl sm:text-sm xs:text-xs font-normal text-gray-700   focus:outline-none  focus:ring-offset-gray-200">
                    <p className="flex">
                      <span
                        title="Notifications"
                        className={` fa fa-bell  w-7 h-7 lg:text-3xl md:text-2xl  xs:text-lg averageScreen:-ml-3 sm:-ml-2 -mt-3
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
                                        ? 'bg-gray-100 text-gray-900 border-b-2 border-b-black/20'
                                        : 'text-gray-700 border-b-2 border-b-black/20 ',
                                      `block px-2 py-2 text-sm text-left bg-white hover:bg-gray-200
                                      `
                                    )}
                                  >
                                    <p className=" px-1 w-[14rem]  semihdScreen:text-base laptopScreen:text-sm averageScreen:text-sm xs:text-xs">
                                      {currentRequest.New == 'TRUE' ? (
                                        <>
                                          There is a new request from{' '}
                                          <span className="font-semibold">
                                            {currentRequest.Name} (
                                            {currentRequest.Role})
                                          </span>
                                          <br />
                                          <span className="text-xs font-normal">
                                            {currentRequest.Timestamp}
                                          </span>
                                        </>
                                      ) : (
                                        <>
                                          <span className="font-semibold">
                                            {currentRequest.Name} (
                                            {currentRequest.Role})
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
                                        </>
                                      )}
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
          id="adminNavbar"
          className="sm:flex xs:hidden md:flex lg:flex flex-col bg-gradient-to-b from-[#d6d135] via-[#cebc46] to-[#ddc236] text-center  h-screen fixed z-50 drop-shadow-[0_0px_5px_rgba(0,0,0,0.30)] overflow-y-auto"
        >
          <div className="">
            <ul className="text-xs">
              <li
                title="Overview"
                onClick={homePage}
                id="logo"
                className="cursor-pointer border-b-2 pt-4 text-white border-black/5 mx-auto"
              >
                <i
                  className={`fas fa-graduation-cap  lg:text-6xl xs:text-3xl mb-4 ${
                    sidebarMode == 'Minimized'
                      ? ''
                      : 'hover:scale-115 transition duration-200'
                  }`}
                ></i>
              </li>
              <li
                title="Manage Accounts"
                onClick={tab1}
                className={`cursor-pointer  border-b-2 border-black/5 ${
                  tabHighlight == 1
                    ? 'bg-white/[75%] text-yellow-700 '
                    : 'hover:bg-black/30 text-white transition duration-300'
                }
                
                ${
                  sidebarMode == 'Minimized'
                    ? 'pb-2.5 pt-2'
                    : 'hdScreen:pb-1 hdScreen:pt-2 semihdScreen:pb-1 semihdScreen:pt-2 laptopScreen:pb-[0.2rem] laptopScreen:pt-1.5 averageScreen:pb-[0.18rem] averageScreen:pt-1.5 sm:pb-0.5 sm:pt-1 xs:pb-[0.1rem] xs:pt-0.5'
                }`}
              >
                <div className="relative text-center font-bold">
                  <BsPeople className="hdScreen:text-[2.2rem] semihdScreen:text-[2rem] laptopScreen:text-[1.6rem] averageScreen:text-[1.5rem] mx-auto -mb-1" />
                  <span
                    className={`lg:text-base xs:text-xs font-poppins font-semibold lg:px-4 ${
                      sidebarMode == 'Minimized' ? 'hidden' : ''
                    }`}
                  >
                    Manage Accounts
                  </span>
                </div>
              </li>
              <li
                title="Manage Sections"
                onClick={tab2}
                className={`cursor-pointer border-b-2 border-black/5 ${
                  tabHighlight == 2
                    ? 'bg-white/[75%] text-yellow-700'
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
                  <BsReceiptCutoff className="hdScreen:text-[2.2rem] semihdScreen:text-[2rem] laptopScreen:text-[1.6rem] averageScreen:text-[1.5rem] mx-auto -mb-0.5" />
                  <span
                    className={`lg:text-base xs:text-xs font-poppins font-semibold lg:px-2 ${
                      sidebarMode == 'Minimized' ? 'hidden' : ''
                    }`}
                  >
                    Manage Sections
                  </span>
                </div>
              </li>
              <li
                title="Register Account"
                onClick={tab3}
                className={`cursor-pointer border-b-2 border-black/5 ${
                  tabHighlight == 3
                    ? 'bg-white/[75%] text-yellow-700'
                    : 'hover:bg-black/30 text-white transition duration-300'
                }
                
                ${
                  sidebarMode == 'Minimized'
                    ? 'pb-2.5 pt-2'
                    : 'hdScreen:pb-1 hdScreen:pt-3 semihdScreen:pb-1 semihdScreen:pt-3 laptopScreen:pb-[0.2rem] laptopScreen:pt-1.5 averageScreen:pb-[0.18rem] averageScreen:pt-1.5 sm:pb-0.5 sm:pt-1 xs:pb-[0.1rem] xs:pt-0.5'
                }`}
              >
                <div className="relative text-center  font-bold ">
                  <BsPersonAdd className="hdScreen:text-[2.2rem] semihdScreen:text-[2rem] laptopScreen:text-[1.6rem] averageScreen:text-[1.5rem] mx-auto " />
                  <span
                    className={`lg:text-base xs:text-xs font-poppins font-semibold lg:px-2 ${
                      sidebarMode == 'Minimized' ? 'hidden' : ''
                    }`}
                  >
                    Register Account
                  </span>
                </div>
              </li>
              <li
                title="User Requests"
                onClick={tab4}
                className={`cursor-pointer border-b-2 border-black/5 ${
                  tabHighlight == 4
                    ? 'bg-white/[75%] text-yellow-700'
                    : 'hover:bg-black/30 text-white transition duration-300'
                }
                ${
                  sidebarMode == 'Minimized'
                    ? 'pb-2.5 pt-2'
                    : 'hdScreen:pb-1 hdScreen:pt-3 semihdScreen:pb-1 semihdScreen:pt-3 laptopScreen:pb-[0.2rem] laptopScreen:pt-1.5 averageScreen:pb-[0.18rem] averageScreen:pt-1.5 sm:pb-0.5 sm:pt-1 xs:pb-[0.1rem] xs:pt-0.5'
                }`}
              >
                <div className="relative text-center  font-bold">
                  <BsPersonExclamation className="hdScreen:text-[2.2rem] semihdScreen:text-[2rem] laptopScreen:text-[1.6rem] averageScreen:text-[1.5rem] mx-auto " />
                  <span
                    className={`lg:text-base xs:text-xs font-poppins font-semibold lg:px-2 ${
                      sidebarMode == 'Minimized' ? 'hidden' : ''
                    }`}
                  >
                    User Requests
                  </span>
                </div>
              </li>
              <li
                title="Help"
                onClick={tab5}
                className={`cursor-pointer border-b-2 border-black/5 ${
                  tabHighlight == 5
                    ? 'bg-white/[75%] text-yellow-700'
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
              onClick={adjustSidebar}
              {...(sidebarMode == 'Minimized'
                ? {
                    title: 'Expand the sidebar.',
                  }
                : { title: 'Collapse the sidebar' })}
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
      <LoadingSpinner visible={showLoading} />
    </>
  );
}
