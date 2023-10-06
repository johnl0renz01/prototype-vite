import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

import EditSectionModal from './EditSectionModal';

import EquationSolver from './equationSolver';

import { BsTrash3 } from 'react-icons/bs';
import { HiPencilSquare } from 'react-icons/hi2';

import ImageModalAdmin from './ImageModalAdmin';

import HelpPageAdminSkeleton from './HelpPageAdminSkeleton';

export default function HelpPageAdmin() {
  document.body.style.overflow = 'visible';
  const navigate = useNavigate();

  useEffect(() => {
    setTabIndex();

    window.addEventListener('focus', setTabIndex);
    function setTabIndex() {
      window.localStorage.setItem('CURRENT_TAB_INDEX', 5);
    }
  }, []);

  useEffect(() => {
    var logged = JSON.parse(window.localStorage.getItem('LOGGED'));
    if (logged == 'FALSE') {
      window.localStorage.setItem('LOGIN_STATUS', JSON.stringify('Terminated'));
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
            window.localStorage.setItem(
              'LOGIN_STATUS',
              JSON.stringify('Terminated')
            );
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

  const [navbarWidth, setNavbarWidth] = useState(0);
  const [logoHeight, setLogoHeight] = useState(0);

  useEffect(() => {
    document.body.style.backgroundImage =
      'linear-gradient(to top, #e2e2e2, #f1f1f1 , #ffffff)';

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

  window.onload = function () {
    window.scrollTo(0, 0);
  };

  const [linkTab, setLinkTab] = useState(0);
  const [currentId, setCurrentId] = useState('');
  const [scrollPos, setScrollPos] = useState(0);

  function handleScroll() {
    setScrollPos(window.pageYOffset);
  }

  useEffect(() => {
    //console.log(scrollPos);
    var currentLink = JSON.parse(window.sessionStorage.getItem('LINK_TAB'));
    if (currentLink !== null) setLinkTab(currentLink);

    window.addEventListener('scroll', handleScroll);

    //MANAGE ACCOUNTS
    var manage_accounts_1 = document.getElementById('manage-accounts-1');
    var ma_1 = ReactDOM.findDOMNode(manage_accounts_1).offsetHeight;

    var manage_accounts_2 = document.getElementById('manage-accounts-2');
    var ma_2 = ReactDOM.findDOMNode(manage_accounts_2).offsetHeight;
    var ma_2 = ma_1 + ma_2;

    var manage_accounts_3 = document.getElementById('manage-accounts-3');
    var ma_3 = ReactDOM.findDOMNode(manage_accounts_3).offsetHeight;
    var ma_3 = ma_2 + ma_3;

    var manage_accounts_4 = document.getElementById('manage-accounts-4');
    var ma_4 = ReactDOM.findDOMNode(manage_accounts_4).offsetHeight;
    var ma_4 = ma_3 + ma_4;

    var manage_accounts_5 = document.getElementById('manage-accounts-4');
    var ma_5 = ReactDOM.findDOMNode(manage_accounts_5).offsetHeight;
    var ma_5 = ma_4 + ma_5;
    ////////////////////////////////////////////////////////////

    //MANAGE SECTIONS
    var manage_sections_1 = document.getElementById('manage-sections-1');
    var ms_1 = ReactDOM.findDOMNode(manage_sections_1).offsetHeight;

    var manage_sections_2 = document.getElementById('manage-sections-2');
    var ms_2 = ReactDOM.findDOMNode(manage_sections_2).offsetHeight;
    var ms_2 = ms_1 + ms_2;

    var manage_sections_3 = document.getElementById('manage-sections-3');
    var ms_3 = ReactDOM.findDOMNode(manage_sections_3).offsetHeight;
    var ms_3 = ms_2 + ms_3;

    var manage_sections_4 = document.getElementById('manage-sections-4');
    var ms_4 = ReactDOM.findDOMNode(manage_sections_4).offsetHeight;
    var ms_4 = ms_3 + ms_4;

    var manage_sections_5 = document.getElementById('manage-sections-4');
    var ms_5 = ReactDOM.findDOMNode(manage_sections_5).offsetHeight;
    var ms_5 = ms_4 + ms_5;

    ////////////////////////////////////////////////////////////

    //REGISTRATION || REGISTER ACCOUNT
    var register_account_1 = document.getElementById('register-account-1');
    var ra_1 = ReactDOM.findDOMNode(register_account_1).offsetHeight;

    var register_account_2 = document.getElementById('register-account-2');
    var ra_2 = ReactDOM.findDOMNode(register_account_2).offsetHeight;
    var ra_2 = ra_1 + ra_2;

    var register_account_3 = document.getElementById('register-account-3');
    var ra_3 = ReactDOM.findDOMNode(register_account_3).offsetHeight;
    var ra_3 = ra_2 + ra_3;

    ////////////////////////////////////////////////////////////

    //USER REQUESTS
    var user_requests_1 = document.getElementById('user-requests-1');
    var ur_1 = ReactDOM.findDOMNode(user_requests_1).offsetHeight;

    var user_requests_2 = document.getElementById('user-requests-2');
    var ur_2 = ReactDOM.findDOMNode(user_requests_2).offsetHeight;
    var ur_2 = ur_1 + ur_2;

    var user_requests_3 = document.getElementById('user-requests-3');
    var ur_3 = ReactDOM.findDOMNode(user_requests_3).offsetHeight;
    var ur_3 = ur_2 + ur_3;

    var user_requests_4 = document.getElementById('user-requests-4');
    var ur_4 = ReactDOM.findDOMNode(user_requests_4).offsetHeight;
    var ur_4 = ur_3 + ur_4;

    ////////////////////////////////////////////////////////////

    if (linkTab == 1) {
      if (scrollPos <= ma_1) setCurrentId('ma_1');
      else if (scrollPos > ma_1 && scrollPos <= ma_2) setCurrentId('ma_2');
      else if (scrollPos > ma_2 && scrollPos <= ma_3) setCurrentId('ma_3');
      else if (scrollPos > ma_3 && scrollPos <= ma_4) setCurrentId('ma_4');
      else if (scrollPos > ma_4 && scrollPos <= ma_5) setCurrentId('ma_5');
    } else if (linkTab == 2) {
      if (scrollPos <= ms_1) setCurrentId('ms_1');
      else if (scrollPos > ms_1 && scrollPos <= ms_2) setCurrentId('ms_2');
      else if (scrollPos > ms_2 && scrollPos <= ms_3) setCurrentId('ms_3');
      else if (scrollPos > ms_3 && scrollPos <= ms_4) setCurrentId('ms_4');
      else if (scrollPos > ms_4 && scrollPos <= ms_5) setCurrentId('ms_5');
    } else if (linkTab == 3) {
      if (scrollPos <= ra_1) setCurrentId('ra_1');
      else if (scrollPos > ra_1 && scrollPos <= ra_2) setCurrentId('ra_2');
      else if (scrollPos > ra_2 && scrollPos <= ra_3) setCurrentId('ra_3');
    } else if (linkTab == 4) {
      if (scrollPos <= ur_1) setCurrentId('ur_1');
      else if (scrollPos > ur_1 && scrollPos <= ur_2) setCurrentId('ur_2');
      else if (scrollPos > ur_2 && scrollPos <= ur_3) setCurrentId('ur_3');
      else if (scrollPos > ur_3 && scrollPos <= ur_4) setCurrentId('ur_4');
    } else {
      setCurrentId('');
    }

    // and so ....

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const [category, setCategory] = useState('');

  const reportCard = () => {
    setCategory('ReportCard');
  };

  const equationList = () => {
    setCategory('EquationList');
  };

  const createEquation = () => {
    setCategory('CreateEquation');
  };

  // MODAL IMAGE
  const [showModal, setShowModal] = useState(false);
  const handleOnCloseModal = () => setShowModal(false);

  const [choiceModal, setChoiceModal] = useState(false);

  const handleOnContinueModal = () => {
    setChoiceModal(true);
    setShowModal(false);
  };

  //hdScreen: semihdScreen: laptopScreen: averageScreen:
  function Home() {
    return (
      <div className={linkTab == 0 ? '' : 'hidden'}>
        <div id="about">
          <h1 className="inline-block hdScreen:text-3xl semihdScreen:text-2xl laptopScreen:text-xl averageScreen:text-lg sm:text-base xs:text-sm font-[800] text-slate-800/90 tracking-normal">
            Learn about the system
          </h1>
          <p className="hdScreen:text-xl semihdScreen:text-lg laptopScreen:text-lg averageScreen:text-base sm:text-sm xs:text-xs text-gray-600 pb-4">
            To start, select one of the topic in the right side of this page.
          </p>
        </div>
        <hr></hr>
        <div className="hdScreen:text-[1.1rem] semihdScreen:text-[1rem] laptopScreen:text-[0.95rem] averageScreen:text-[0.9rem] sm:text-sm xs:text-xs  text-gray-600 text-justify">
          <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
            In the right side you can choose the following:
          </p>
          <hr></hr>
          <br></br>
          <div className="hdScreen:leading-[1.9rem] semihdScreen:leading-[1.6rem] laptopScreen:leading-[1.5rem] averageScreen:leading-[1.5rem]">
            <a className="hdScreen:text-xl semihdScreen:text-lg laptopScreen:text-lg averageScreen:text-base sm:text-sm xs:text-xs font-bold pb-3">
              Manage Accounts{' '}
            </a>
            <div className="pl-3">
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold">Account list: </span>
                Access the branch to view a comprehensive records of registered
                user accounts. Obtain an overview of account details, including
                names, emails, and roles.
              </p>
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold">Search account: </span>
                This branch allows admin to search for specific account within
                the system. To perform targeted searches for specific user
                information. Use filters like names, roles, or email addresses
                to locate accounts efficiently.
              </p>
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold">Resetting password: </span>
                Assist users in resetting their passwords if forgotten. By
                clicking the reset password button, the reset request will
                appear which was made by the users.
              </p>
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold">Editing account: </span>
                Empower authorized personnel to edit account information
                seamlessly. Update user names, emails, roles, and other relevant
                details while maintaining data accuracy to avoid confusion among
                the users.
              </p>
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold">Deleting account: </span>
                This branch provide administrators with the capability to
                permanently delete user accounts from the system, ensuring a
                streamlined account management process.
              </p>
            </div>
          </div>
          {/*BREAK*/}
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          <hr></hr>
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          {/*BREAK*/}
          <div className="hdScreen:leading-[1.9rem] semihdScreen:leading-[1.6rem] laptopScreen:leading-[1.5rem] averageScreen:leading-[1.5rem]">
            <a className="hdScreen:text-xl semihdScreen:text-lg laptopScreen:text-lg averageScreen:text-base sm:text-sm xs:text-xs font-bold pb-3">
              Manage Sections{' '}
            </a>
            <div className="pl-3">
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold">Section list: </span>
                To gain insights into the various academic sections within the
                institution. Review details such as section names, associated
                teachers, and enrolled students.
              </p>
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold">Search section: </span>
                Employ the search section function to quickly locate specific
                sections based on parameters such as section names or assigned
                teachers.
              </p>
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold">Adding section: </span>
                Facilitate the addition of new academic sections to the system.
                Input section names, assign teachers, and set enrollment
                capacities through the Adding Section interface.
              </p>
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold">Editing section: </span>
                Enable administrators to make adjustments to existing section
                information. Modify section names, teacher assignments, and
                grade level efficiently.
              </p>
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold">Deleting section: </span>
                Perform the ability to remove academic sections from the system
                when they are no longer needed or relevant for future purposes.
              </p>
            </div>
          </div>
          {/*BREAK*/}
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          <hr></hr>
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          {/*BREAK*/}
          <div className="hdScreen:leading-[1.9rem] semihdScreen:leading-[1.6rem] laptopScreen:leading-[1.5rem] averageScreen:leading-[1.5rem]">
            <a className="hdScreen:text-xl semihdScreen:text-lg laptopScreen:text-lg averageScreen:text-base sm:text-sm xs:text-xs font-bold pb-3">
              Register Account{' '}
            </a>
            <div className="pl-3">
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold">Assigning role: </span>
                During the registration process, administrators have the
                authority to assign roles to new accounts, thereby defining
                their access rights and permissions within the system.
                Assignable roles may include students, and teachers.
              </p>
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold">Registration type: </span>
                Select the registration process according to user roles,
                indicating the appropriate registration type based on the
                current user. This encompasses single or bulk registration
                options, ensuring a fitting and simple registration experience.
              </p>
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold">Submit registration: </span>
                Initiate the account creation process by clicking the Register
                button. This user-friendly option guides potential users through
                the registration steps smoothly.
              </p>
            </div>
          </div>
          {/*BREAK*/}
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          <hr></hr>
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          {/*BREAK*/}
          <div className="hdScreen:leading-[1.9rem] semihdScreen:leading-[1.6rem] laptopScreen:leading-[1.5rem] averageScreen:leading-[1.5rem]">
            <a className="hdScreen:text-xl semihdScreen:text-lg laptopScreen:text-lg averageScreen:text-base sm:text-sm xs:text-xs font-bold pb-3">
              User Requests{' '}
            </a>
            <div className="pl-3">
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold">Request list: </span>
                Explore the request list to gain a comprehensive overview of
                user-generated support requests. Obtain information about the
                nature of inquiries, the status of request, the requester, and
                any important messages.
              </p>
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold">Search request: </span>
                To find specific user requests quickly, use the search request
                feature. Enter keywords, pick certain dates, request subjects,
                or roles to quickly get the relevant inquiries.
              </p>
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold">Viewing details: </span>
                Explore detailed user requests by clicking on individual
                entries. Examine the subject, content, and other details of each
                request to gain a comprehensive understanding.
              </p>
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold">Marking request: </span>
                to efficiently handle user interactions by designating requests
                as resolved or pending. This functionality aids in effectively
                monitoring the advancement of support or assistance inquiries
                and ensures a well-organized user support system.
              </p>
            </div>
          </div>
          <br></br>
          <br></br>
          <br></br>
        </div>

        {/*
                  <h1 className="inline-block text-3xl font-[800] text-slate-800/90 tracking-normal">
                    Configuring Variants
                  </h1>
                  <p className="text-xl text-gray-600 ">
                    Configuring which utility variants are enabled in your
                    project.
                  </p>
                  <br></br>
                  <hr></hr>
                  <p className="text-[1.1rem] leading-7  text-gray-600 ">
                    The variants section of your tailwind.config.js file is
                    where you control which variants should be enabled for each
                    core plugin:
                  </p>
                  */}
      </div>
    );
  }

  function ManageAccounts() {
    return (
      <div className={linkTab == 1 ? '' : 'hidden'}>
        <div id="manage-accounts">
          <h1 className="inline-block hdScreen:text-3xl semihdScreen:text-2xl laptopScreen:text-xl averageScreen:text-lg sm:text-base xs:text-sm font-[800] text-slate-800/90 tracking-normal">
            Manage Accounts
          </h1>
          <p className="hdScreen:text-xl semihdScreen:text-lg laptopScreen:text-lg averageScreen:text-sm sm:text-sm xs:text-xs text-gray-600 pb-4">
            Oversee user profiles, from viewing account lists to editing details
            and controlling access permissions.
          </p>
        </div>
        <hr></hr>
        <div className="hdScreen:text-[1.1rem] semihdScreen:text-[1rem] laptopScreen:text-[0.95rem] averageScreen:text-[0.9rem] sm:text-sm xs:text-xs  text-gray-600 text-justify">
          <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
            This topic outlines the functionalities to manage user accounts.
          </p>
          <hr></hr>
          <br></br>
          <div
            id="manage-accounts-1"
            className="hdScreen:leading-[1.9rem] semihdScreen:leading-[1.6rem] laptopScreen:leading-[1.5rem] averageScreen:leading-[1.5rem]"
          >
            <a
              id="account-list"
              className="scroll-element hdScreen:text-xl semihdScreen:text-lg laptopScreen:text-lg averageScreen:text-base sm:text-sm xs:text-xs font-bold pb-3"
            >
              Account list{' '}
            </a>
            <div className="pl-3">
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                The first page admin will see after clicking the manage accounts
                tab.
                <span className="text-gray-400">
                  {'\u00A0'}(The following information serves as an illustrative
                  example.)
                </span>
              </p>
              <img
                onClick={function () {
                  setShowModal(true),
                    window.sessionStorage.setItem(
                      'IMAGE_LINK_ADMIN',
                      JSON.stringify('manage-accounts-home')
                    );
                }}
                className=" cursor-pointer border-2 border-gray-300 my-3"
                src={require('../assets/admin_guide/manage-accounts-home.png')}
                alt=""
              />

              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                A comprehensive list of all accounts that have been registered
                within the system. This list not only displays pertinent
                information such as user names, email addresses, and designated
                roles, but it also offers convenient buttons that grant
                immediate access to essential functionalities.
                <br></br>
                <br></br>
                These functionalities encompass various actions that revolve
                around efficient management of user profiles and account-related
                tasks.
              </p>
            </div>
          </div>
          {/*BREAK*/}
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          <hr></hr>
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          {/*BREAK*/}
          <div
            id="manage-accounts-2"
            className="hdScreen:leading-[1.9rem] semihdScreen:leading-[1.6rem] laptopScreen:leading-[1.5rem] averageScreen:leading-[1.5rem]"
          >
            <a
              id="search-account"
              className="scroll-element hdScreen:text-xl semihdScreen:text-lg laptopScreen:text-lg averageScreen:text-base sm:text-sm xs:text-xs font-bold pb-3"
            >
              Search account{' '}
            </a>
            <div className="pl-3">
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                The search bar provides different approaches for locating
                accounts and fetching information, equipping users with multiple
                choices to pinpoint specific profiles and effortlessly access
                important data.
              </p>
              <img
                onClick={function () {
                  setShowModal(true),
                    window.sessionStorage.setItem(
                      'IMAGE_LINK_ADMIN',
                      JSON.stringify('search-bar')
                    );
                }}
                className="cursor-pointer border-2 border-gray-300 my-3"
                src={require('../assets/admin_guide/search-bar.png')}
                alt=""
              />
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                Administrators can search for details like the account's name,
                email, and role. The search initiates as the administrator
                starts typing; there's no requirement to press the "Enter" key
                separately.
                <br></br>
                <br></br>
                As an example below, filtering with the name of "John" will
                filter all in each category. The search bar is not case
                sensitive. <br></br>
                <span className="text-gray-400">
                  (You can type "john", "JOhn", "JOHn", "JOHN" and still get the
                  desired result.)
                </span>
              </p>
              <img
                onClick={function () {
                  setShowModal(true),
                    window.sessionStorage.setItem(
                      'IMAGE_LINK_ADMIN',
                      JSON.stringify('search-bar-result1')
                    );
                }}
                className="cursor-pointer border-2 border-gray-300 my-3"
                src={require('../assets/admin_guide/search-bar-result1.png')}
                alt=""
              />
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                The search yields two outcomes for "John Lorenz Naga Dela Cruz"
                and "John Moe Doe," displaying their email addresses and roles.
                <br></br>
                <br></br>
                <span className="text-gray-400">
                  Note: You can also filter the search using the section name.
                </span>
              </p>
            </div>
          </div>
          {/*BREAK*/}
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          <hr></hr>
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          {/*BREAK*/}

          <div
            id="manage-accounts-3"
            className="hdScreen:leading-[1.9rem] semihdScreen:leading-[1.6rem] laptopScreen:leading-[1.5rem] averageScreen:leading-[1.5rem]"
          >
            <a
              id="reset-password"
              className="scroll-element hdScreen:text-xl semihdScreen:text-lg laptopScreen:text-lg averageScreen:text-base sm:text-sm xs:text-xs font-bold pb-3"
            >
              Resetting password{' '}
            </a>
            <div className="pl-3">
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                Password resets are initiated by user requests, and this process
                unfolds in two stages. Initially, these requests surface in the
                "User Requests" section. Subsequently, they become visible
                within the "Manage Accounts" area, specifically under "Reset
                Password."
              </p>
              <img
                onClick={function () {
                  setShowModal(true),
                    window.sessionStorage.setItem(
                      'IMAGE_LINK_ADMIN',
                      JSON.stringify('reset-password-1')
                    );
                }}
                className="cursor-pointer border-2 border-gray-300 my-3"
                src={require('../assets/admin_guide/reset-password-1.png')}
                alt=""
              />
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                In this example, the request is made by the user.
                <br></br>
                <br></br>
                Below is the overview of all reset password request, it consist
                of two buttons which area "Reset" and "Remove". There
                administrator can choose which action to perform.
              </p>
              <img
                onClick={function () {
                  setShowModal(true),
                    window.sessionStorage.setItem(
                      'IMAGE_LINK_ADMIN',
                      JSON.stringify('reset-password-2')
                    );
                }}
                className="cursor-pointer border-2 border-gray-300 my-3"
                src={require('../assets/admin_guide/reset-password-2.png')}
                alt=""
              />
            </div>
          </div>
          {/*BREAK*/}
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          <hr></hr>
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          {/*BREAK*/}
          <div
            id="manage-accounts-4"
            className="hdScreen:leading-[1.9rem] semihdScreen:leading-[1.6rem] laptopScreen:leading-[1.5rem] averageScreen:leading-[1.5rem]"
          >
            <a
              id="edit-account"
              className="scroll-element hdScreen:text-xl semihdScreen:text-lg laptopScreen:text-lg averageScreen:text-base sm:text-sm xs:text-xs font-bold pb-3"
            >
              Editing account{' '}
            </a>
            <div className="pl-3">
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                By selecting "Edit" on the right-hand side, administrators can
                access an account's information. This comprehensive view enables
                them to modify various details, such as changing names,
                sections, email addresses, and other attributes, based to the
                specific type of account.
                <br></br>
                <br></br>
                After clicking the button, it shows the following information.
                <br></br>
              </p>

              <p className="text-gray-400">(Sample student's account.)</p>
              <img
                onClick={function () {
                  setShowModal(true),
                    window.sessionStorage.setItem(
                      'IMAGE_LINK_ADMIN',
                      JSON.stringify('edit-account-1')
                    );
                }}
                className="cursor-pointer border-2 border-gray-300 my-3 w-[70%]"
                src={require('../assets/admin_guide/edit-account-1.png')}
                alt=""
              />

              <p className="text-gray-400">(Sample teacher's account.)</p>
              <img
                onClick={function () {
                  setShowModal(true),
                    window.sessionStorage.setItem(
                      'IMAGE_LINK_ADMIN',
                      JSON.stringify('edit-account-2')
                    );
                }}
                className="cursor-pointer border-2 border-gray-300 my-3 w-[70%]"
                src={require('../assets/admin_guide/edit-account-2.png')}
                alt=""
              />
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                When administrator are done making changes, they will see the
                updated account information. They can then decide whether to
                save these changes or cancel them based on what they want to do.
              </p>
            </div>
          </div>
          {/*BREAK*/}
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          <hr></hr>
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          {/*BREAK*/}
          <div
            id="manage-accounts-5"
            className="hdScreen:leading-[1.9rem] semihdScreen:leading-[1.6rem] laptopScreen:leading-[1.5rem] averageScreen:leading-[1.5rem]"
          >
            <a
              id="delete-account"
              className="scroll-element hdScreen:text-xl semihdScreen:text-lg laptopScreen:text-lg averageScreen:text-base sm:text-sm xs:text-xs font-bold pb-3"
            >
              Deleting account{' '}
            </a>
            <div className="pl-3">
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                Administrators can easily remove accounts from the system if
                required. This feature allows them to maintain an organized and
                up-to-date user list. By having the ability to delete accounts,
                administrators ensure the accuracy and relevance of user
                information within the system.
                <br></br>
                <br></br>
                After clicking the button, it shows this modal.
              </p>
              <p className="text-gray-400">
                (Scenario 1 - Teacher's account delete)
              </p>
              <img
                onClick={function () {
                  setShowModal(true),
                    window.sessionStorage.setItem(
                      'IMAGE_LINK_ADMIN',
                      JSON.stringify('delete-account-1')
                    );
                }}
                className="cursor-pointer border-2 border-gray-300 my-3 w-[30%]"
                src={require('../assets/admin_guide/delete-account-1.png')}
                alt=""
              />

              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                In this illustration, within a teacher's account, a confirmation
                question appears beneath the account's email. This question
                offers the options to either proceed with deletion or cancel the
                action, providing a defense against unintended deletions.
                <br></br>
                <br></br>
              </p>
              <p className="text-gray-400">
                (Scenario 2 - Teacher's account delete)
              </p>
              <img
                onClick={function () {
                  setShowModal(true),
                    window.sessionStorage.setItem(
                      'IMAGE_LINK_ADMIN',
                      JSON.stringify('delete-account-2')
                    );
                }}
                className="cursor-pointer border-2 border-gray-300 my-3 w-[30%]"
                src={require('../assets/admin_guide/delete-account-2.png')}
                alt=""
              />
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                In this scenario, within a teacher's account, a warning message
                stating "This account handle sections" is displayed, followed by
                a confirmation prompt offering the choice to delete or cancel.
                This appears beneath the account's email, providing a
                precautionary step before proceeding with the deletion action.
                <br></br>
                <br></br>
              </p>
              <p className="text-gray-400">(Sample student's account delete)</p>
              <img
                onClick={function () {
                  setShowModal(true),
                    window.sessionStorage.setItem(
                      'IMAGE_LINK_ADMIN',
                      JSON.stringify('delete-account-3')
                    );
                }}
                className="cursor-pointer border-2 border-gray-300 my-3 w-[30%]"
                src={require('../assets/admin_guide/delete-account-3.png')}
                alt=""
              />
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                In this instance, within an student's account, a warning message
                indicating "This account have progress records" is shown.
                Subsequently, a confirmation inquiry for deletion or
                cancellation is presented beneath the account's email, offering
                a precautionary measure before taking further action.
                <br></br>
                <br></br>
                After making a decision, administrators can choose to either
                proceed with the deletion or cancel the action at their
                discretion.
              </p>
            </div>
          </div>
          <br></br>
          <br></br>
          <br></br>
        </div>
      </div>
    );
  }

  function ManageSections() {
    return (
      <div className={linkTab == 2 ? '' : 'hidden'}>
        <div id="manage-sections">
          <h1 className="inline-block hdScreen:text-3xl semihdScreen:text-2xl laptopScreen:text-xl averageScreen:text-lg sm:text-base xs:text-sm font-[800] text-slate-800/90 tracking-normal">
            Manage Sections
          </h1>
          <p className="hdScreen:text-xl semihdScreen:text-lg laptopScreen:text-lg averageScreen:text-sm sm:text-sm xs:text-xs text-gray-600 pb-4">
            Supervise academic sections, including tasks like checking section
            lists, modifying information, and managing access permissions.
          </p>
        </div>
        <hr></hr>
        <div className="hdScreen:text-[1.1rem] semihdScreen:text-[1rem] laptopScreen:text-[0.95rem] averageScreen:text-[0.9rem] sm:text-sm xs:text-xs  text-gray-600 text-justify">
          <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
            This topic outlines the functionalities to manage sections.
          </p>
          <hr></hr>
          <br></br>
          <div
            id="manage-sections-1"
            className="hdScreen:leading-[1.9rem] semihdScreen:leading-[1.6rem] laptopScreen:leading-[1.5rem] averageScreen:leading-[1.5rem]"
          >
            <a
              id="section-list"
              className="scroll-element hdScreen:text-xl semihdScreen:text-lg laptopScreen:text-lg averageScreen:text-base sm:text-sm xs:text-xs  font-bold pb-3"
            >
              Section list{' '}
            </a>
            <div className="pl-3">
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                The first page admin will see after clicking the manage sections
                tab.
                <span className="text-gray-400">
                  {'\u00A0'}(The following information serves as an illustrative
                  example.)
                </span>
              </p>
              <img
                onClick={function () {
                  setShowModal(true),
                    window.sessionStorage.setItem(
                      'IMAGE_LINK_ADMIN',
                      JSON.stringify('manage-sections-home')
                    );
                }}
                className=" cursor-pointer border-2 border-gray-300 my-3"
                src={require('../assets/admin_guide/manage-sections-home.png')}
                alt=""
              />

              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                Within this area, a comprehensive display of all sections within
                the system is provided, showcasing pertinent information such as
                the corresponding grade level, section name, and the teacher
                assigned.
                <br></br>
                <br></br>
                Furthermore, prominently featured are essential buttons
                including "Add Section", "Edit", and "Delete", offering
                convenient access to primary functions like section addition,
                modification, and removal.
                <br></br>
                <br></br>
                This arrangement ensures an intuitive approach to section
                management, simplifying the process of overseeing academic
                divisions effectively.
              </p>
            </div>
          </div>
          {/*BREAK*/}
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          <hr></hr>
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          {/*BREAK*/}
          <div
            id="manage-sections-2"
            className="hdScreen:leading-[1.9rem] semihdScreen:leading-[1.6rem] laptopScreen:leading-[1.5rem] averageScreen:leading-[1.5rem]"
          >
            <a
              id="search-section"
              className="scroll-element hdScreen:text-xl semihdScreen:text-lg laptopScreen:text-lg averageScreen:text-base sm:text-sm xs:text-xs font-bold pb-3"
            >
              Search section{' '}
            </a>
            <div className="pl-3">
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                The search bar provides flexibility in finding sections and
                getting details, giving users choices to quickly locate specific
                segments and access essential information effortlessly.
              </p>
              <img
                onClick={function () {
                  setShowModal(true),
                    window.sessionStorage.setItem(
                      'IMAGE_LINK_ADMIN',
                      JSON.stringify('search-bar2')
                    );
                }}
                className="cursor-pointer border-2 border-gray-300 my-3"
                src={require('../assets/admin_guide/search-bar2.png')}
                alt=""
              />
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                Administrators have the ability to search for information such
                as grade levels, section names, and assigned teachers. As
                administrators begin typing, the search is automatically
                triggered, eliminating the need to press the "Enter" key
                separately.
                <br></br>
                <br></br>
                As an example below, filtering with the letters "To" will filter
                all in each category. The search bar is not case sensitive.{' '}
                <br></br>
                <span className="text-gray-400">
                  (You can type in any case, and still get the desired result.)
                </span>
              </p>
              <img
                onClick={function () {
                  setShowModal(true),
                    window.sessionStorage.setItem(
                      'IMAGE_LINK_ADMIN',
                      JSON.stringify('search-bar2-result1')
                    );
                }}
                className="cursor-pointer border-2 border-gray-300 my-3"
                src={require('../assets/admin_guide/search-bar2-result1.png')}
                alt=""
              />
              The search produces two results indicating grade levels of 7 and
              section names including Aguinaldo, Bonifacio, and Jacinto, along
              with the respective assigned teachers.
            </div>
          </div>
          {/*BREAK*/}
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          <hr></hr>
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          {/*BREAK*/}
          <div
            id="manage-sections-3"
            className="hdScreen:leading-[1.9rem] semihdScreen:leading-[1.6rem] laptopScreen:leading-[1.5rem] averageScreen:leading-[1.5rem]"
          >
            <a
              id="add-section"
              className="scroll-element hdScreen:text-xl semihdScreen:text-lg laptopScreen:text-lg averageScreen:text-base sm:text-sm xs:text-xs font-bold pb-3"
            >
              Adding section{' '}
            </a>
            <div className="pl-3">
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                When administrators choose "Add Section", they can input details
                about a section. This comprehensive view enables them to input
                various information, such as grade levels, section names, and
                teacher assignments.
                <br></br>
                <br></br>
                After clicking the button, it shows the required forms.
                <br></br>
              </p>
              <img
                onClick={function () {
                  setShowModal(true),
                    window.sessionStorage.setItem(
                      'IMAGE_LINK_ADMIN',
                      JSON.stringify('add-section-1')
                    );
                }}
                className="cursor-pointer border-2 border-gray-300 my-3 w-[50%]"
                src={require('../assets/admin_guide/add-section-1.png')}
                alt=""
              />
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                After administrators complete their changes, they have the
                option to create the section or cancel them based on what they
                prefer.
              </p>
            </div>
          </div>
          {/*BREAK*/}
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          <hr></hr>
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          {/*BREAK*/}
          <div
            id="manage-sections-4"
            className="hdScreen:leading-[1.9rem] semihdScreen:leading-[1.6rem] laptopScreen:leading-[1.5rem] averageScreen:leading-[1.5rem]"
          >
            <a
              id="edit-section"
              className="scroll-element hdScreen:text-xl semihdScreen:text-lg laptopScreen:text-lg averageScreen:text-base sm:text-sm xs:text-xs font-bold pb-3"
            >
              Editing section{' '}
            </a>
            <div className="pl-3">
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                By clicking "Edit", administrators can enter a section's
                details. This thorough perspective allows them to adjust
                different attributes, like modifying grade levels, section
                names, and assigning teachers.
                <br></br>
                <br></br>
                After clicking the button, it shows the following information.
                <br></br>
              </p>
              <img
                onClick={function () {
                  setShowModal(true),
                    window.sessionStorage.setItem(
                      'IMAGE_LINK_ADMIN',
                      JSON.stringify('edit-section-1')
                    );
                }}
                className="cursor-pointer border-2 border-gray-300 my-3 w-[50%]"
                src={require('../assets/admin_guide/edit-section-1.png')}
                alt=""
              />
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                Once administrators finish making changes, they will observe the
                updated account details. At this point, they can choose either
                to save these alterations or cancel them according to their
                preferences.
              </p>
            </div>
          </div>
          {/*BREAK*/}
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          <hr></hr>
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          {/*BREAK*/}
          <div
            id="manage-sections-5"
            className="hdScreen:leading-[1.9rem] semihdScreen:leading-[1.6rem] laptopScreen:leading-[1.5rem] averageScreen:leading-[1.5rem]"
          >
            <a
              id="delete-section"
              className="scroll-element hdScreen:text-xl semihdScreen:text-lg laptopScreen:text-lg averageScreen:text-base sm:text-sm xs:text-xs font-bold pb-3"
            >
              Deleting section{' '}
            </a>
            <div className="pl-3">
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                Administrators have the capability to effortlessly eliminate
                sections from the system when necessary. This functionality
                assists them in upholding an orderly and current list of
                sections. With the ability to delete sections, administrators
                ensure the accuracy and relevance of section information within
                the system.
                <br></br>
                <br></br>
                After clicking the button, it shows this modal.
              </p>
              <p className="text-gray-400">(Scenario 1 - Section delete)</p>
              <img
                onClick={function () {
                  setShowModal(true),
                    window.sessionStorage.setItem(
                      'IMAGE_LINK_ADMIN',
                      JSON.stringify('delete-section-1')
                    );
                }}
                className="cursor-pointer border-2 border-gray-300 my-3 w-[30%]"
                src={require('../assets/admin_guide/delete-section-1.png')}
                alt=""
              />

              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                In this example for manage sections, a question appears under
                the section name asking if you want to delete it. Administrator
                can choose to delete it or cancel the action.
                <br></br>
                <br></br>
              </p>
              <p className="text-gray-400">(Scenario 2 - Section delete)</p>
              <img
                onClick={function () {
                  setShowModal(true),
                    window.sessionStorage.setItem(
                      'IMAGE_LINK_ADMIN',
                      JSON.stringify('delete-section-2')
                    );
                }}
                className="cursor-pointer border-2 border-gray-300 my-3 w-[30%]"
                src={require('../assets/admin_guide/delete-section-2.png')}
                alt=""
              />
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                In this situation, within a teacher's account, a cautionary
                message appears, saying "This section have students enrolled."
                Then it is required to select a deletion type, either delete for
                the section alone or along with students' accounts. This is
                followed by a confirmation prompt allowing the decision to
                delete or cancel, located under the section name.
              </p>
            </div>
          </div>

          <br></br>
          <br></br>
          <br></br>
        </div>

        {/*
                  <h1 className="inline-block text-3xl font-[800] text-slate-800/90 tracking-normal">
                    Configuring Variants
                  </h1>
                  <p className="text-xl text-gray-600 ">
                    Configuring which utility variants are enabled in your
                    project.
                  </p>
                  <br></br>
                  <hr></hr>
                  <p className="text-[1.1rem] leading-7  text-gray-600 ">
                    The variants section of your tailwind.config.js file is
                    where you control which variants should be enabled for each
                    core plugin:
                  </p>
                  */}
      </div>
    );
  }

  function Registration() {
    return (
      <div className={linkTab == 3 ? '' : 'hidden'}>
        <div id="register-account">
          <h1 className="inline-block hdScreen:text-3xl semihdScreen:text-2xl laptopScreen:text-xl averageScreen:text-lg sm:text-base xs:text-sm font-[800] text-slate-800/90 tracking-normal">
            Registration
          </h1>
          <p className="hdScreen:text-xl semihdScreen:text-lg laptopScreen:text-lg averageScreen:text-sm sm:text-sm xs:text-xs text-gray-600 pb-4">
            Process of filling-up the essential forms by providing all the
            necessary information as required.
          </p>
        </div>
        <hr></hr>
        <div className="hdScreen:text-[1.1rem] semihdScreen:text-[1rem] laptopScreen:text-[0.95rem] averageScreen:text-[0.9rem] sm:text-sm xs:text-xs  text-gray-600 text-justify">
          <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
            This topic outlines the procedure of registration.
          </p>
          <hr></hr>
          <br></br>
          <div
            id="register-account-1"
            className="hdScreen:leading-[1.9rem] semihdScreen:leading-[1.6rem] laptopScreen:leading-[1.5rem] averageScreen:leading-[1.5rem]"
          >
            <a
              id="assign-role"
              className="scroll-element hdScreen:text-xl semihdScreen:text-lg laptopScreen:text-lg averageScreen:text-base sm:text-sm xs:text-xs  font-bold pb-3"
            >
              Assigning role{' '}
            </a>
            <div className="pl-3">
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                The first page admin will see after clicking the register
                account tab.
                <span className="text-gray-400">
                  {'\u00A0'}(The following information will serve as an
                  illustrative example.)
                </span>
              </p>
              <img
                onClick={function () {
                  setShowModal(true),
                    window.sessionStorage.setItem(
                      'IMAGE_LINK_ADMIN',
                      JSON.stringify('register-account-home')
                    );
                }}
                className=" cursor-pointer border-2 border-gray-300 my-3 w-[50%]"
                src={require('../assets/admin_guide/register-account-home.png')}
                alt=""
              />

              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                At this point, administrators will proceed to choose the
                suitable role for the upcoming account creation. It's important
                to note that students and teachers each have distinct forms that
                must be completed with relevant details.
              </p>
            </div>
          </div>
          {/*BREAK*/}
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          <hr></hr>
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          {/*BREAK*/}
          <div
            id="register-account-2"
            className="hdScreen:leading-[1.9rem] semihdScreen:leading-[1.6rem] laptopScreen:leading-[1.5rem] averageScreen:leading-[1.5rem]"
          >
            <a
              id="registration-type"
              className="scroll-element hdScreen:text-xl semihdScreen:text-lg laptopScreen:text-lg averageScreen:text-base sm:text-sm xs:text-xs font-bold pb-3"
            >
              Registration type{' '}
            </a>
            <div className="pl-3">
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                Upon selecting the role, administrators then have the option to
                choose between two types of account registration: single type or
                bulk type. This decision enables administrators to tailor the
                registration process according to their specific needs.
                <br></br>
                <br></br>
                First the single type registration scenario and examine how this
                procedure is carried out and its visual representation.
              </p>
              <img
                onClick={function () {
                  setShowModal(true),
                    window.sessionStorage.setItem(
                      'IMAGE_LINK_ADMIN',
                      JSON.stringify('register-account-1')
                    );
                }}
                className="cursor-pointer border-2 border-gray-300 my-3"
                src={require('../assets/admin_guide/register-account-1.png')}
                alt=""
              />
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                This example shows the student account forms with message above
                stating "Fill-up required details".
                <br></br>
                <br></br>
                Next, consider a scenario involving bulk registration and
                explore how this process is executed and presented.
              </p>
              <img
                onClick={function () {
                  setShowModal(true),
                    window.sessionStorage.setItem(
                      'IMAGE_LINK_ADMIN',
                      JSON.stringify('register-account-2')
                    );
                }}
                className="cursor-pointer border-2 border-gray-300 my-3"
                src={require('../assets/admin_guide/register-account-2.png')}
                alt=""
              />
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                In the context of bulk registration, administrators are required
                to download a template file. Subsequently, teachers should
                fill-up the form within this template, and upon completion,
                administrators can upload the filled template by selecting the
                "Choose file" option.
                <br></br>
                <br></br>
                Administrators should be vigilant for any potential errors that
                may arise during the bulk registration process. It's essential
                to carefully monitor the procedure to ensure the accuracy of the
                newly added accounts.
              </p>
            </div>
          </div>
          {/*BREAK*/}
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          <hr></hr>
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          {/*BREAK*/}
          <div
            id="register-account-3"
            className="hdScreen:leading-[1.9rem] semihdScreen:leading-[1.6rem] laptopScreen:leading-[1.5rem] averageScreen:leading-[1.5rem]"
          >
            <a
              id="register"
              className="scroll-element hdScreen:text-xl semihdScreen:text-lg laptopScreen:text-lg averageScreen:text-base sm:text-sm xs:text-xs font-bold pb-3"
            >
              Submit registration{' '}
            </a>
            <div className="pl-3">
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                Upon concluding the form-filling or file-upload process,
                administrators can proceed to register the account. This step
                signifies the completion of the registration procedure, enabling
                administrators to formalize the addition of the new account
                within the system.
                <br></br>
                <br></br>
                <span className="text-gray-400">
                  {'\u00A0'}(Filled-up single type registration.)
                </span>
              </p>
              <img
                onClick={function () {
                  setShowModal(true),
                    window.sessionStorage.setItem(
                      'IMAGE_LINK_ADMIN',
                      JSON.stringify('register-submit-1')
                    );
                }}
                className="cursor-pointer border-2 border-gray-300 my-3 "
                src={require('../assets/admin_guide/register-submit-1.png')}
                alt=""
              />
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="text-gray-400">
                  {'\u00A0'}(File uploaded bulk type registration.)
                </span>
              </p>
              <img
                onClick={function () {
                  setShowModal(true),
                    window.sessionStorage.setItem(
                      'IMAGE_LINK_ADMIN',
                      JSON.stringify('register-submit-2')
                    );
                }}
                className="cursor-pointer border-2 border-gray-300 my-3 "
                src={require('../assets/admin_guide/register-submit-2.png')}
                alt=""
              />
            </div>
          </div>

          <br></br>
          <br></br>
          <br></br>
        </div>
      </div>
    );
  }

  function UserRequests() {
    return (
      <div className={linkTab == 4 ? '' : 'hidden'}>
        <div id="user-requests">
          <h1 className="inline-block hdScreen:text-3xl semihdScreen:text-2xl laptopScreen:text-xl averageScreen:text-lg sm:text-base xs:text-sm font-[800] text-slate-800/90 tracking-normal">
            User Requests
          </h1>
          <p className="hdScreen:text-xl semihdScreen:text-lg laptopScreen:text-lg averageScreen:text-sm sm:text-sm xs:text-xs text-gray-600 pb-4">
            Administer user inquiries, examine request specifics, and mark them
            as resolved or unresolved.
          </p>
        </div>
        <hr></hr>
        <div className="hdScreen:text-[1.1rem] semihdScreen:text-[1rem] laptopScreen:text-[0.95rem] averageScreen:text-[0.9rem] sm:text-sm xs:text-xs  text-gray-600 text-justify">
          <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
            This topic outlines the functionalities to handle user requests.
          </p>
          <hr></hr>
          <br></br>
          <div
            id="user-requests-1"
            className="hdScreen:leading-[1.9rem] semihdScreen:leading-[1.6rem] laptopScreen:leading-[1.5rem] averageScreen:leading-[1.5rem]"
          >
            <a
              id="request-list"
              className="scroll-element hdScreen:text-xl semihdScreen:text-lg laptopScreen:text-lg averageScreen:text-base sm:text-sm xs:text-xs  font-bold pb-3"
            >
              Request list{' '}
            </a>
            <div className="pl-3">
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                The first page admin will see after clicking the user requests
                tab.
                <span className="text-gray-400">
                  {'\u00A0'}(The following information serves as an illustrative
                  example.)
                </span>
              </p>
              <img
                onClick={function () {
                  setShowModal(true),
                    window.sessionStorage.setItem(
                      'IMAGE_LINK_ADMIN',
                      JSON.stringify('user-requests-home')
                    );
                }}
                className=" cursor-pointer border-2 border-gray-300 my-3"
                src={require('../assets/admin_guide/user-requests-home.png')}
                alt=""
              />

              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                The interface displays the count of ongoing requests, and search
                bar accompanied by distinct buttons such as view details and to
                mark it as solved. Positioned beneath is the request list, it
                contains request subjects, senders' email addresses and roles,
                followed by the dates indicating when the requests were received
                or sent by the users.
                <br></br>
                <br></br>
                This comprehensive arrangement ensures a comprehensive overview
                of the active inquiries and facilitates efficient management of
                user requests.
              </p>
            </div>
          </div>
          {/*BREAK*/}
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          <hr></hr>
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          {/*BREAK*/}
          <div
            id="user-requests-2"
            className="hdScreen:leading-[1.9rem] semihdScreen:leading-[1.6rem] laptopScreen:leading-[1.5rem] averageScreen:leading-[1.5rem]"
          >
            <a
              id="search-request"
              className="scroll-element hdScreen:text-xl semihdScreen:text-lg laptopScreen:text-lg averageScreen:text-base sm:text-sm xs:text-xs font-bold pb-3"
            >
              Search request{' '}
            </a>
            <div className="pl-3">
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                The search bar offers various ways to look for requests and get
                information, giving administrator different options to find
                specific details and easily access important data.
              </p>
              <img
                onClick={function () {
                  setShowModal(true),
                    window.sessionStorage.setItem(
                      'IMAGE_LINK_ADMIN',
                      JSON.stringify('search-bar3')
                    );
                }}
                className="cursor-pointer border-2 border-gray-300 my-3"
                src={require('../assets/admin_guide/search-bar3.png')}
                alt=""
              />
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                Administrators have the option to search for specific details
                like the request subject, sender's email, role, and when it was
                received. The search begins automatically as administrators
                start typing, eliminating the need to press the "Enter" key
                separately.
                <br></br>
                <br></br>
                As an example below, filtering date with "Aug 03" will filter
                all in each category. The search bar is not case sensitive.{' '}
                <br></br>
                <span className="text-gray-400">
                  (It can be typed as "Aug", "AUg", "AUG", and still get the
                  desired result.)
                </span>
              </p>
              <img
                onClick={function () {
                  setShowModal(true),
                    window.sessionStorage.setItem(
                      'IMAGE_LINK_ADMIN',
                      JSON.stringify('search-bar3-result1')
                    );
                }}
                className="cursor-pointer border-2 border-gray-300 my-3"
                src={require('../assets/admin_guide/search-bar3-result1.png')}
                alt=""
              />
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                The search provides just one outcome for August 3rd, 2023,
                showing the subject, sender's email, and role.
              </p>
            </div>
          </div>
          {/*BREAK*/}
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          <hr></hr>
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          {/*BREAK*/}
          <div
            id="user-requests-3"
            className="hdScreen:leading-[1.9rem] semihdScreen:leading-[1.6rem] laptopScreen:leading-[1.5rem] averageScreen:leading-[1.5rem]"
          >
            <a
              id="view-details"
              className="scroll-element hdScreen:text-xl semihdScreen:text-lg laptopScreen:text-lg averageScreen:text-base sm:text-sm xs:text-xs font-bold pb-3"
            >
              Viewing details{' '}
            </a>
            <div className="pl-3">
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                Opting for "View Details" allows administrators to access
                in-depth information about the request. This thorough
                perspective enables them to look for various details.
                <br></br>
                <br></br>
                After clicking the button, it shows following details.
              </p>
              <img
                onClick={function () {
                  setShowModal(true),
                    window.sessionStorage.setItem(
                      'IMAGE_LINK_ADMIN',
                      JSON.stringify('view-details-1')
                    );
                }}
                className="cursor-pointer border-2 border-gray-300 my-3 w-[40%]"
                src={require('../assets/admin_guide/view-details-1.png')}
                alt=""
              />
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                In this instance, the illustration presents a modal window of
                color red which means unsolved. Below this, the modal showcases
                the content, including the subject and the complete message of
                the request. <br></br>
                <br></br> The date is situated along the name of the sender,
                offering a comprehensive view of the request's key details and
                facilitating effective communication.
              </p>
            </div>
          </div>
          {/*BREAK*/}
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          <hr></hr>
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          {/*BREAK*/}
          <div
            id="user-requests-4"
            className="hdScreen:leading-[1.9rem] semihdScreen:leading-[1.6rem] laptopScreen:leading-[1.5rem] averageScreen:leading-[1.5rem]"
          >
            <a
              id="mark-request"
              className="scroll-element hdScreen:text-xl semihdScreen:text-lg laptopScreen:text-lg averageScreen:text-base sm:text-sm xs:text-xs font-bold pb-3"
            >
              Marking request{' '}
            </a>
            <div className="pl-3">
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                Upon resolving a user request, administrators have the option to
                interact with the red "unsolved" button. By ticking this button,
                it transitions into a green "solved" state, signifying
                successful resolution.
                <br></br>
                <br></br>
                <span className="text-gray-400">
                  {'\u00A0'}(Before marking as solved.)
                </span>
              </p>
              <img
                onClick={function () {
                  setShowModal(true),
                    window.sessionStorage.setItem(
                      'IMAGE_LINK_ADMIN',
                      JSON.stringify('mark-request-1')
                    );
                }}
                className="cursor-pointer border-2 border-gray-300 my-3 "
                src={require('../assets/admin_guide/mark-request-1.png')}
                alt=""
              />
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="text-gray-400">
                  {'\u00A0'}(After marking it as solved.)
                </span>
              </p>
              <img
                onClick={function () {
                  setShowModal(true),
                    window.sessionStorage.setItem(
                      'IMAGE_LINK_ADMIN',
                      JSON.stringify('mark-request-2')
                    );
                }}
                className="cursor-pointer border-2 border-gray-300 my-3 "
                src={require('../assets/admin_guide/mark-request-2.png')}
                alt=""
              />
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                Once marked as solved, the button becomes unclickable, providing
                a clear visual indication of the request's status and ensuring
                effective management of user inquiries.
              </p>
            </div>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </div>
      </div>
    );
  }

  //FOR SKELETON
  const [skeletonState, setSkeletonState] = useState(true);

  /*
  useEffect(() => {
    const onPageLoad = () => {
      setTimeout(hideNavbar, 1);

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
      {/*
      <div className={`${!skeletonState ? 'hidden' : ''}`}>
        <HelpPageAdminSkeleton />
      </div>
*/}
      <div
        className={`bg-gradient-to-t from-[#e2e2e2] via-[#f1f1f1] to-[#ffffff] h-full 
        ${
          navbarWidth == 193
            ? 'w-[calc(100%-193px)] ml-[193px]'
            : navbarWidth == 125
            ? 'w-[calc(100%-125px)] ml-[125px]'
            : navbarWidth == 90
            ? 'w-[calc(100%-90px)] ml-[90px]'
            : navbarWidth == 56
            ? 'w-[calc(100%-56px)] ml-[56px]'
            : navbarWidth == 176
            ? 'w-[calc(100%-176px)] ml-[176px]'
            : navbarWidth == 108
            ? 'w-[calc(100%-108px)] ml-[108px]'
            : navbarWidth == 73
            ? 'w-[calc(100%-73px)] ml-[73px]'
            : navbarWidth == 39
            ? 'w-[calc(100%-39px)] ml-[39px]'
            : ''
        } ${skeletonState ? '' : ''}`}
      >
        <section className="relative mx-auto p-8 w-full">
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
            System Guide
          </div>

          <div
            className=" py-3 hdScreen:px-10 semihdScreen:px-9 laptopScreen:px-8 averageScreen:px-7 sm:px-5 xs:px-2 mt-1.5 border-2 
                           
                            bg-white relative mx-auto w-full rounded-md "
          >
            <hr></hr>
            <div className="mt-2 flex relative ">
              <div className=" w-full hdScreen:pr-12 semihdScreen:pr-9 laptopScreen:pr-8 averageScreen:pr-7 sm:pr-5 xs:pr-2 border-r-2">
                {Home()}
                {ManageAccounts()}
                {ManageSections()}
                {Registration()}
                {UserRequests()}
              </div>

              <div className="hdScreen:w-[17.5%] semihdScreen:w-[20.5%] laptopScreen:w-[22.5%] averageScreen:w-[26%] ">
                <div className="overflow-y-auto style-4 sticky max-h-screen top-0 right-[5%] pb-10 hdScreen:pl-8 semihdScreen:pl-6 laptopScreen:pl-4 averageScreen:pl-4 sm:pl-2 xs:pl-1">
                  <div className="">
                    <div
                      onClick={e => {
                        setLinkTab(0),
                          window.sessionStorage.setItem('LINK_TAB', 0),
                          window.scrollTo({ top: 0, behavior: 'auto' });
                      }}
                      href="#about"
                      className={`cursor-pointer block py-1 font-bold hdScreen:text-[1.170rem] semihdScreen:text-[1.05rem] laptopScreen:text-[1.02rem] averageScreen:text-[0.85rem] sm:text-sm xs:text-xs  leading-[1.75rem]  hdScreen:mt-5 semihdScreen:mt-4 laptopScreen:mt-3 averageScreen:mt-2
                      ${
                        linkTab == 0
                          ? 'text-yellow-600 '
                          : 'text-slate-600 hover:text-slate-400'
                      }`}
                    >
                      Learn about the system
                    </div>
                    <ul className="marker:text-gray-500 text-slate-700 hdScreen:text-base hdScreen:leading-[1.4rem] semihdScreen:text-[0.9rem] semihdScreen:leading-[1.1rem] laptopScreen:text-sm laptopScreen:leading-[0.95rem] averageScreen:text-xs averageScreen:leading-[0.85rem] xs:text-xs leading-[0.6rem] hdScreen:mt-5 semihdScreen:mt-4 laptopScreen:mt-3 averageScreen:mt-2">
                      <hr></hr>
                      <br></br>
                      <li>
                        <a
                          onClick={e => {
                            setLinkTab(1),
                              window.sessionStorage.setItem('LINK_TAB', 1);
                          }}
                          href="#manage-accounts"
                          className={`block py-1 font-bold   ${
                            linkTab == 1
                              ? 'text-yellow-600 '
                              : 'text-slate-500 hover:text-slate-400'
                          }`}
                        >
                          Manage Accounts
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 list-disc">
                        <a
                          onClick={e => {
                            setLinkTab(1),
                              window.sessionStorage.setItem('LINK_TAB', 1);
                          }}
                          href="#account-list"
                          className={`group flex items-start py-1 
                          ${
                            currentId == 'ma_1'
                              ? 'text-yellow-600'
                              : 'text-slate-500 hover:text-slate-400'
                          }`}
                        >
                          Account list
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 list-disc">
                        <a
                          onClick={e => {
                            setLinkTab(1),
                              window.sessionStorage.setItem('LINK_TAB', 1);
                          }}
                          href="#search-account"
                          className={`group flex items-start py-1 
                          ${
                            currentId == 'ma_2'
                              ? 'text-yellow-600'
                              : 'text-slate-500 hover:text-slate-400'
                          }`}
                        >
                          Search account
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 list-disc">
                        <a
                          onClick={e => {
                            setLinkTab(1),
                              window.sessionStorage.setItem('LINK_TAB', 1);
                          }}
                          href="#reset-password"
                          className={`group flex items-start py-1 
                          ${
                            currentId == 'ma_3'
                              ? 'text-yellow-600'
                              : 'text-slate-500 hover:text-slate-400'
                          }`}
                        >
                          Resetting password
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 list-disc">
                        <a
                          onClick={e => {
                            setLinkTab(1),
                              window.sessionStorage.setItem('LINK_TAB', 1);
                          }}
                          href="#edit-account"
                          className={`group flex items-start py-1 
                          ${
                            currentId == 'ma_4'
                              ? 'text-yellow-600'
                              : 'text-slate-500 hover:text-slate-400'
                          }`}
                        >
                          Editing account
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 list-disc">
                        <a
                          onClick={e => {
                            setLinkTab(1),
                              window.sessionStorage.setItem('LINK_TAB', 1);
                          }}
                          href="#delete-account"
                          className={`group flex items-start py-1 
                          ${
                            currentId == 'ma_5'
                              ? 'text-yellow-600'
                              : 'text-slate-500 hover:text-slate-400'
                          }`}
                        >
                          Deleting account
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={e => {
                            setLinkTab(2),
                              window.sessionStorage.setItem('LINK_TAB', 2);
                          }}
                          href="#manage-sections"
                          className={`block py-1 font-bold
                          ${
                            linkTab == 2
                              ? 'text-yellow-600'
                              : 'text-slate-500 hover:text-slate-400'
                          }`}
                        >
                          Manage Sections
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 list-disc">
                        <a
                          onClick={e => {
                            setLinkTab(2),
                              window.sessionStorage.setItem('LINK_TAB', 2);
                          }}
                          href="#section-list"
                          className={`group flex items-start py-1 
                          ${
                            currentId == 'ms_1'
                              ? 'text-yellow-600'
                              : 'text-slate-500 hover:text-slate-400'
                          }`}
                        >
                          Section list
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 list-disc">
                        <a
                          onClick={e => {
                            setLinkTab(2),
                              window.sessionStorage.setItem('LINK_TAB', 2);
                          }}
                          href="#search-section"
                          className={`group flex items-start py-1 
                          ${
                            currentId == 'ms_2'
                              ? 'text-yellow-600'
                              : 'text-slate-500 hover:text-slate-400'
                          }`}
                        >
                          Search section
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 list-disc">
                        <a
                          onClick={e => {
                            setLinkTab(2),
                              window.sessionStorage.setItem('LINK_TAB', 2);
                          }}
                          href="#add-section"
                          className={`group flex items-start py-1 
                          ${
                            currentId == 'ms_3'
                              ? 'text-yellow-600'
                              : 'text-slate-500 hover:text-slate-400'
                          }`}
                        >
                          Adding section
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 list-disc">
                        <a
                          onClick={e => {
                            setLinkTab(2),
                              window.sessionStorage.setItem('LINK_TAB', 2);
                          }}
                          href="#edit-section"
                          className={`group flex items-start py-1 
                          ${
                            currentId == 'ms_4'
                              ? 'text-yellow-600'
                              : 'text-slate-500 hover:text-slate-400'
                          }`}
                        >
                          Editing section
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 list-disc">
                        <a
                          onClick={e => {
                            setLinkTab(2),
                              window.sessionStorage.setItem('LINK_TAB', 2);
                          }}
                          href="#delete-section"
                          className={`group flex items-start py-1 
                          ${
                            currentId == 'ms_5'
                              ? 'text-yellow-600'
                              : 'text-slate-500 hover:text-slate-400'
                          }`}
                        >
                          Deleting section
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={e => {
                            setLinkTab(3),
                              window.sessionStorage.setItem('LINK_TAB', 3);
                          }}
                          href="#register-account"
                          className={`block py-1 font-bold   ${
                            linkTab == 3
                              ? 'text-yellow-600 '
                              : 'text-slate-500 hover:text-slate-400'
                          }`}
                        >
                          Register Account
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 list-disc">
                        <a
                          onClick={e => {
                            setLinkTab(3),
                              window.sessionStorage.setItem('LINK_TAB', 3);
                          }}
                          href="#assign-role"
                          className={`group flex items-start py-1 
                        ${
                          currentId == 'ra_1'
                            ? 'text-yellow-600'
                            : 'text-slate-500 hover:text-slate-400'
                        }`}
                        >
                          Assigning role
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 list-disc">
                        <a
                          onClick={e => {
                            setLinkTab(3),
                              window.sessionStorage.setItem('LINK_TAB', 3);
                          }}
                          href="#registration-type"
                          className={`group flex items-start py-1 
                          ${
                            currentId == 'ra_2'
                              ? 'text-yellow-600'
                              : 'text-slate-500 hover:text-slate-400'
                          }`}
                        >
                          Registration type
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 list-disc">
                        <a
                          onClick={e => {
                            setLinkTab(3),
                              window.sessionStorage.setItem('LINK_TAB', 3);
                          }}
                          href="#register"
                          className={`group flex items-start py-1 
                          ${
                            currentId == 'ra_3'
                              ? 'text-yellow-600'
                              : 'text-slate-500 hover:text-slate-400'
                          }`}
                        >
                          Submit registration
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={e => {
                            setLinkTab(4),
                              window.sessionStorage.setItem('LINK_TAB', 4);
                          }}
                          href="#user-requests"
                          className={`block py-1 font-bold   ${
                            linkTab == 4
                              ? 'text-yellow-600 '
                              : 'text-slate-500 hover:text-slate-400'
                          }`}
                        >
                          User Requests
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 list-disc">
                        <a
                          onClick={e => {
                            setLinkTab(4),
                              window.sessionStorage.setItem('LINK_TAB', 4);
                          }}
                          href="#request-list"
                          className={`group flex items-start py-1 
                        ${
                          currentId == 'ur_1'
                            ? 'text-yellow-600'
                            : 'text-slate-500 hover:text-slate-400'
                        }`}
                        >
                          Request list
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 list-disc">
                        <a
                          onClick={e => {
                            setLinkTab(4),
                              window.sessionStorage.setItem('LINK_TAB', 4);
                          }}
                          href="#search-request"
                          className={`group flex items-start py-1 
                          ${
                            currentId == 'ur_2'
                              ? 'text-yellow-600'
                              : 'text-slate-500 hover:text-slate-400'
                          }`}
                        >
                          Search request
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 list-disc">
                        <a
                          onClick={e => {
                            setLinkTab(4),
                              window.sessionStorage.setItem('LINK_TAB', 4);
                          }}
                          href="#view-details"
                          className={`group flex items-start py-1 
                          ${
                            currentId == 'ur_3'
                              ? 'text-yellow-600'
                              : 'text-slate-500 hover:text-slate-400'
                          }`}
                        >
                          Viewing details
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 list-disc">
                        <a
                          onClick={e => {
                            setLinkTab(4),
                              window.sessionStorage.setItem('LINK_TAB', 4);
                          }}
                          href="#mark-request"
                          className={`group flex items-start py-1 
                          ${
                            currentId == 'ur_4'
                              ? 'text-yellow-600'
                              : 'text-slate-500 hover:text-slate-400'
                          }`}
                        >
                          Marking request
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <ImageModalAdmin
        onClose={handleOnCloseModal}
        visible={showModal}
        onContinue={handleOnContinueModal}
      />
    </>
  );
}
