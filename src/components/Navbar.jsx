import React from 'react';
import { FaGraduationCap } from 'react-icons/fa';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as ReactDOM from 'react-dom';

import NavbarModal from './NavbarModal';
import Initiation from './Initiation';
import EndSession from './EndSession';
import ClearStorage from './ClearStorage';

import { HiOutlineArrowLeftOnRectangle } from 'react-icons/hi2';
import { HiChevronDoubleRight } from 'react-icons/hi2';
import { HiArrowUturnRight } from 'react-icons/hi2';

import {
  BsChevronBarRight,
  BsGearFill,
  BsGear,
  BsPersonCircle,
  BsPerson,
  BsInboxes,
} from 'react-icons/bs';

import LoadingSpinner from './LoadingSpinner';

import StorageData from './StorageData';
import SecureStorageData from './SecureStorageData';

import ChangePasswordModal from './ChangePasswordModal';
import ChangePasswordMessageModal from './ChangePasswordMessageModal';

import ManageSubscription from './ManageSubscription';
import ManageSubscriptionConfirm from './ManageSubscriptionConfirm';
import ManageSubscriptionMessage from './ManageSubscriptionMessage';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Navbar() {
  const [showLoading, setShowLoading] = useState(false);

  const navigate = useNavigate();

  //SET HOMEPAGE AS FIRST LINK
  useEffect(() => {
    var navbar = JSON.parse(window.localStorage.getItem('NAVBAR_PAGE'));
    console.log(navbar);
    if (
      navbar === null ||
      navbar === undefined ||
      navbar == [] ||
      navbar == '[]'
    ) {
      Initiation.initiatePage();
    }
    // FOR MANAGE SUBSCRIPTION
    window.sessionStorage.removeItem('UPLOADED');
  }, []);

  //FOR LINKS/NAVBAR/BREADCRUMBS
  const [pageList, setPageList] = useState([]);
  const [pageLink, setPageLink] = useState([]);
  const [currentUser, setCurrentUser] = useState('');

  const length = pageList.length;

  // ADDED ARRAY NAME INSIDE use effect, empty array means run only once
  useEffect(() => {
    const data = window.localStorage.getItem('NAVBAR_PAGE');
    if (data !== null) setPageList(JSON.parse(data));
    // UPDATE DATA ON BODY HOVER
    document.body.addEventListener('mouseover', updateData);
  }, []);

  useEffect(() => {
    const data = window.localStorage.getItem('NAVBAR_PAGE_LINK');
    if (data !== null) setPageLink(JSON.parse(data));
  }, []);

  useEffect(() => {
    const data = StorageData.localStorageRAW('SESSION_USER');

    if (data !== null) setCurrentUser(JSON.parse(data));
  }, []);

  // UPDATE DATA ON HOVER asdasd
  function updateData() {
    const page = window.localStorage.getItem('NAVBAR_PAGE');
    if (page !== null) setPageList(JSON.parse(page));
    const link = window.localStorage.getItem('NAVBAR_PAGE_LINK');
    if (link !== null) setPageLink(JSON.parse(link));
    var user = StorageData.localStorageRAW('SESSION_USER');

    if (user !== null) setCurrentUser(JSON.parse(user));
  }

  const Login = () => {
    let page = ['Home', 'Login'];
    let link = ['/Homepage', '/Login'];
    setPageList(page);
    setPageLink(link);

    window.localStorage.setItem('NAVBAR_PAGE', JSON.stringify(pageList));
    window.localStorage.setItem('NAVBAR_PAGE_LINK', JSON.stringify(pageLink));
    navigate('/Login');
  };

  const Homepage = () => {
    let page = ['Home'];
    let link = ['/Homepage'];
    setPageList(page);
    setPageLink(link);

    window.localStorage.setItem('NAVBAR_PAGE', JSON.stringify(pageList));
    window.localStorage.setItem('NAVBAR_PAGE_LINK', JSON.stringify(pageLink));
    setTimeout(proceed, 1);

    function proceed() {
      navigate('/Homepage');
    }
  };

  const AdminHomepage = () => {
    let page = ['Home'];
    let link = ['/AdminHomepage'];
    setPageList(page);
    setPageLink(link);

    window.localStorage.setItem('NAVBAR_PAGE', JSON.stringify(pageList));
    window.localStorage.setItem('NAVBAR_PAGE_LINK', JSON.stringify(pageLink));
    setTimeout(proceed, 1);

    function proceed() {
      navigate('/AdminHomepage');
    }
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
        if (account == 'Student') {
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
    var accountName = StorageData.localStorageJSON('SESSION_FULLNAME');
    if (accountName !== null) {
      setSessionName(accountName);
    }
  });

  const [sessionName, setSessionName] = useState('');

  const [logoutState, setLogoutState] = useState(false);

  const signOut = () => {
    setShowLoading(true);
    if (
      StorageData.localStorageRAW('SESSION_ID') != '""' &&
      StorageData.localStorageRAW('SESSION_ID') != null
    ) {
      setShowLoading(false);
      setShowModal(true);
    } else {
      window.localStorage.setItem('SESSION_USER', JSON.stringify(''));
      window.localStorage.setItem('SESSION_EMAIL', JSON.stringify(''));
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
          window.localStorage.removeItem('LOGIN_STATUS');
          window.localStorage.removeItem('UNIQUE_ID');
          window.localStorage.setItem('LOGGED', JSON.stringify('FALSE'));
          navigate('/LoginPage');
          document.body.style.backgroundImage =
            'linear-gradient(to top, #bef264, #d9f99d , #ccf779)';
        })
        .catch(function (error) {
          setShowLoading(false);
        });
    }
  };

  const [showModal, setShowModal] = useState(false);
  const handleOnCloseModal = () => setShowModal(false);

  const [choiceModal, setChoiceModal] = useState(false);

  const handleOnContinueModal = () => {
    window.localStorage.setItem('QUESTION_STATUS', JSON.stringify('ABANDONED'));

    //CHECK IF STUDENT TRIED TO ANSWER THE CURRENT QUESTION
    if (
      StorageData.localStorageRAW('EXPRESSION_SEQUENCE') != null &&
      StorageData.localStorageRAW('EXPRESSION_SEQUENCE') != ''
    ) {
      //INCREASE ABANDON TALLY
      var data = StorageData.localStorageRAW('QUESTION_ABANDONED');
      if (data == null || data == undefined || data == '0') {
        data = '0';
      }

      data = parseInt(data);
      data++;
      window.localStorage.setItem(
        'QUESTION_ABANDONED',
        SecureStorageData.dataEncryption(data)
      );
    }

    setShowLoading(true);
    EndSession.recordData();
    ClearStorage.clearData();
    window.localStorage.removeItem('EXPRESSION_SEQUENCE');
    setChoiceModal(true);
    setShowModal(false);
    window.localStorage.setItem('SESSION_USER', JSON.stringify(''));
    window.localStorage.setItem('SESSION_EMAIL', JSON.stringify(''));
    window.localStorage.setItem('SESSION_ID', JSON.stringify(''));

    var unique = JSON.parse(window.localStorage.getItem('UNIQUE_ID'));
    if (unique === null) unique = '';

    axios
      .post(
        `http://localhost:80/Prototype-Vite/my-project/api/logout/${unique}`
      )
      .then(function (response) {
        setShowLoading(false);
        setLogoutState(true);
        window.localStorage.removeItem('LOGIN_STATUS');
        window.localStorage.removeItem('UNIQUE_ID');
        window.localStorage.setItem('LOGGED', JSON.stringify('FALSE'));
        navigate('/LoginPage');
        document.body.style.backgroundImage =
          'linear-gradient(to top, #bef264, #d9f99d , #ccf779)';
      })
      .catch(function (error) {
        setShowLoading(false);
      });
  };

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
    setShowModal4(true);
  };

  //CHECK CHOOSE SUBSCRIPTION

  useEffect(() => {
    var account = StorageData.localStorageJSON('ACCOUNT_TYPE');
    if (account !== null) {
      if (account == 'Student') {
        var plan = StorageData.sessionStorageJSON('PLAN');
        if (plan !== null) {
          if (plan == 'SUBSCRIBE-STUDENT-1') {
            setShowModal4(true);
          } else if (plan == 'EXTEND') {
            setShowModal4(true);
          } else {
            window.sessionStorage.removeItem('PLAN');
          }
        } else {
          window.sessionStorage.removeItem('PLAN');
        }
      }
    }
  }, []);

  // MODAL MANAGE SUBSCRIPTION CONFIRMATION
  const [showModal4, setShowModal4] = useState(false);
  const handleOnCloseModal4 = () => {
    window.sessionStorage.removeItem('PLAN');
    setShowModal4(false);
  };

  const handleOnContinueModal4 = () => {
    window.sessionStorage.removeItem('PLAN');
    setShowModal4(false);
    setShowMessageModal4(true);
  };

  const [showMessageModal4, setShowMessageModal4] = useState(false);

  const handleOnContinueMessageModal4 = () => {};

  const handleOnCloseMessageModal4 = () => {
    for (var i = 1; i < 99999; i++) window.clearInterval(i);
    window.sessionStorage.removeItem('PLAN');
    setShowMessageModal4(false);
  };

  const [currentSection, setCurrentSection] = useState('');

  useEffect(() => {
    var section = StorageData.localStorageJSON('SESSION_SECTION_NAME');
    if (section !== null) {
      setCurrentSection(section);
    }
  }, []);

  return (
    <>
      <div
        id="studentNavbar"
        onMouseEnter={() => updateData()}
        className={`sticky top-0 z-50 pt-1 visible lg:h-12  md:h-12 sm:h-10 xs:h-10 w-full  grid-cols-3 bg-white py-0.5 shadow-md shadow-lime-500/80 ${
          accType == 'Student' ? 'grid' : 'hidden'
        } ${logoutState == true ? 'hidden' : ''}`}
      >
        <div className=" p-1 pl-2 overflow-hidden font-sans ">
          {pageLink.map((page, index) =>
            //check if first
            index === 0 ? (
              page.match('/Homepage') ? (
                <a key={index} onClick={Homepage} className="cursor-pointer">
                  <i className="fas fa-graduation-cap pr-2 lg:text-2xl md:text-2xl sm:text-sm  xs:text-xs"></i>
                  <span className="lg:text-xl md:text-xl sm:text-sm  xs:text-xs">
                    Personal Instructing Agent
                  </span>
                </a>
              ) : (
                <a
                  key={index}
                  onClick={AdminHomepage}
                  className="cursor-pointer"
                >
                  <i className="fas fa-graduation-cap pr-2 lg:text-2xl md:text-xl sm:text-sm  xs:text-xs"></i>
                  <span className="lg:text-xl md:text-xl sm:text-sm  xs:text-xs">
                    Personal Instructing Agent
                  </span>
                </a>
              )
            ) : (
              <div key={index}></div>
            )
          )}
        </div>

        <div className="lg:py-1.5 lg:mt-0 md:mt-0.5 sm:mt-0.5 xs:mt-2  sm:py-1 text-center select-none">
          {pageList.map((page, index) =>
            length === index + 1 ? (
              // last one
              <p
                key={index}
                id="current_page"
                className="font-sans lg:text-xl md:text-xl sm:text-sm  xs:text-xs"
              >
                {page}
              </p>
            ) : (
              <div key={index}></div>
            )
          )}
        </div>

        <div className="absolute right-0 -mt-3">
          <li className="flex items-center">
            <ul className="p-4">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button
                    onClick={function () {
                      currentUser == '' || currentUser === null
                        ? navigate('/LoginPage')
                        : '';
                    }}
                    className="inline-flex w-full justify-center rounded-md  lg:mt-0 md:mt-0 sm:mt-0 xs:mt-0.5 bg-white px-3 py-1.5 lg:text-xl md:text-xl sm:text-sm xs:text-xs font-normal text-gray-700  hover:bg-gray-100 focus:outline-none  focus:ring-offset-gray-200"
                  >
                    {currentUser != '' && currentUser !== null ? (
                      StorageData.localStorageRAW('SESSION_ID') != '""' &&
                      StorageData.localStorageRAW('SESSION_ID') != null ? (
                        pageList.includes('Whiteboard') == false ? (
                          <>
                            <span className="bell fa fa-bell w-7 h-7 lg:text-xl md:text-xl  xs:text-xs mr-3 hdScreen:mt-1 semihdScreen:mt-1 laptopScreen:mt-[0.50rem] averageScreen:mt-[0.40rem]"></span>
                            <>{currentUser}</>
                          </>
                        ) : (
                          <>{currentUser}</>
                        )
                      ) : (
                        <>{currentUser}</>
                      )
                    ) : (
                      <p className="flex">
                        {' '}
                        <HiOutlineArrowLeftOnRectangle className="lg:text-2xl md:text-2xl sm:text-sm  xs:text-xs -ml-3 mt-[0.32rem]" />
                        <span className="ml-1 mt-[0.1rem]">Login</span>
                      </p>
                    )}

                    <ChevronDownIcon
                      className={` ${
                        currentUser == '' || currentUser === null
                          ? 'invisible aria-disabled:'
                          : 'visible h-5 w-5 ml-2 lg:mt-1.5 md:1.5 sm:mt-0.5'
                      }`}
                      aria-hidden="true"
                    ></ChevronDownIcon>
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
                    className={` absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
                      currentUser == '' || currentUser === null
                        ? 'invisible'
                        : 'visible'
                    }`}
                  >
                    <div className="py-1 ">
                      {StorageData.localStorageRAW('SESSION_ID') != '""' &&
                      StorageData.localStorageRAW('SESSION_ID') != null ? (
                        pageList.includes('Whiteboard') == false ? (
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={function () {
                                  navigate('/Whiteboard');
                                }}
                                className={classNames(
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700 border-b-2 border-b-gray-200/80 ',
                                  'block px-4 py-2 text-sm'
                                )}
                              >
                                <p className="flex px-1 min-w-[8.2rem]">
                                  {' '}
                                  <BsChevronBarRight className="lg:text-2xl md:text-2xl sm:text-sm  xs:text-xs -ml-2" />
                                  <span className="ml-1.5 mt-[0.1rem]">
                                    Continue Session
                                  </span>
                                </p>
                              </button>
                            )}
                          </Menu.Item>
                        ) : (
                          <></>
                        )
                      ) : (
                        ''
                      )}
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
                              <span className="ml-1.5 mt-[0.1rem]  min-w-[3.5rem]">
                                Change Password
                              </span>
                            </p>
                          </button>
                        )}
                      </Menu.Item>
                      {currentSection == 'SUBSCRIBED-STUDENTS' ? (
                        <>
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
                                  <BsInboxes className="lg:text-2xl md:text-2xl sm:text-sm xs:text-xs -ml-2" />
                                  <span className="ml-1.5 mt-[0.1rem]  min-w-[3.5rem]">
                                    Manage Subscription
                                  </span>
                                </p>
                              </button>
                            )}
                          </Menu.Item>
                        </>
                      ) : (
                        <></>
                      )}
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={signOut}
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900 '
                                : 'text-gray-700',
                              'block w-full px-4 py-2 text-left text-sm'
                            )}
                          >
                            <p className="flex px-1">
                              {' '}
                              <HiOutlineArrowLeftOnRectangle className="lg:text-2xl md:text-2xl sm:text-sm xs:text-xs -ml-2 rotate-180" />
                              <span className="ml-1.5 mt-[0.1rem]  min-w-[3.5rem]">
                                Sign out
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

        <div className="absolute z-10 top-0 left-0 right-0 mx-auto  text-center  w-1/2">
          <div className="inline-flex  hover:pt-10 mt-0.5 opacity-0 hover:opacity-100  ">
            <ul className="lg:text-base md:text-base sm:text-sm xs:text-xs shadow-sm shadow-lime-500 mt-2 pb-1 px-4 z-0 bg-white border-t-2 border-t-gray-300">
              {pageList.map((page, index) =>
                length === index + 1 ? (
                  // last one
                  <li key={index} className="inline-block">
                    <a className="no-underline text-[#799012] font-medium select-none">
                      {page}
                    </a>
                  </li>
                ) : (
                  <div key={index} className="inline-block">
                    <li className="inline-block">
                      <a
                        onClick={() => {
                          navigate(pageLink[index]);
                          updateData;
                        }}
                        className="cursor-pointer no-underline text-gray-500 hover:text-gray-800 hover:underline"
                      >
                        {page}
                      </a>
                    </li>
                    <span className="mx-1 text-[#656565] text-xl">-</span>
                  </div>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
      <div
        onMouseEnter={() => updateData()}
        className="absolute h-screen -z-50 bg-gray-200"
      ></div>
      <NavbarModal
        onClose={handleOnCloseModal}
        visible={showModal}
        onContinue={handleOnContinueModal}
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

      <ManageSubscriptionConfirm
        onClose={handleOnCloseModal4}
        visible={showModal4}
        onContinue={handleOnContinueModal4}
      />

      <ManageSubscriptionMessage
        onContinue={handleOnContinueMessageModal4}
        visible={showMessageModal4}
        onClose={handleOnCloseMessageModal4}
      />

      <LoadingSpinner visible={showLoading} />
    </>
  );
}

export default Navbar;
