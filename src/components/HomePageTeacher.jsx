import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
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

import { BsXCircleFill } from 'react-icons/bs';
import { BsX } from 'react-icons/bs';
import { BsArrowCounterclockwise } from 'react-icons/bs';
import { BsSlashCircle } from 'react-icons/bs';
import { BsTrash3 } from 'react-icons/bs';

import { GoChecklist } from 'react-icons/go';
import { HiPlusSmall } from 'react-icons/hi2';

import { BsFillPersonFill } from 'react-icons/bs';

import { BsJournalPlus } from 'react-icons/bs';
import { BsPersonGear } from 'react-icons/bs';
import { BsClipboardPlus } from 'react-icons/bs';
import { BsReverseLayoutTextSidebarReverse } from 'react-icons/bs';
import { BsClipboardX } from 'react-icons/bs';

import { VscEyeClosed } from 'react-icons/vsc';
import { VscEye } from 'react-icons/vsc';

import { IoStatsChartOutline } from 'react-icons/io5';

import {
  BsFilePersonFill,
  BsGraphUp,
  BsCardHeading,
  BsCardText,
  BsJournalText,
  BsJournal,
  BsLayoutWtf,
  BsLayoutThreeColumns,
  BsPersonBoundingBox,
  BsViewList,
  BsUsbC,
  BsViewStacked,
  BsWallet,
  BsWindowStack,
  BsBarChart,
  BsTextLeft,
  BsFillQuestionCircleFill,
  BsPersonSquare,
  BsLightbulb,
} from 'react-icons/bs';

import { GoNumber } from 'react-icons/go';

import { RxClipboard, RxPerson, RxBarChart } from 'react-icons/rx';

import { CiViewList, CiEdit, CiViewTable } from 'react-icons/ci';
import { FiEdit2 } from 'react-icons/fi';
import {
  LiaLightbulb,
  LiaAlignLeftSolid,
  LiaQuestionCircle,
  LiaElementor,
} from 'react-icons/lia';

import Registration from './Registration';

import HomePageTeacherSkeleton from './HomePageTeacherSkeleton';
import StorageData from './StorageData';
import SecureStorageData from './SecureStorageData';

export default function HomePageTeacher() {
  document.body.style.backgroundImage =
    'linear-gradient(to top, #e2e2e2, #f1f1f1 , #ffffff)';

  const navigate = useNavigate();

  useEffect(() => {
    window.localStorage.setItem('UPDATE_NOTIFICATION_STATE', true);
    setTabIndex();

    window.addEventListener('focus', setTabIndex);
    function setTabIndex() {
      window.localStorage.setItem('CURRENT_TAB_INDEX', 0);
    }
  }, []);

  useEffect(() => {
    var logged = JSON.parse(window.localStorage.getItem('LOGGED'));
    if (logged == 'FALSE') {
      window.localStorage.setItem('LOGIN_STATUS', JSON.stringify('Terminated'));

      var email = StorageData.localStorageJSON('SESSION_EMAIL');
      if (email === null) email = '';

      if (email == '') {
        navigate('/LoginPage');
      }
    } else {
      var closed = JSON.parse(window.localStorage.getItem('IS_CLOSED'));
      if (closed) {
        var unique = JSON.parse(window.localStorage.getItem('UNIQUE_ID'));
        axios
          .post(`https://pia-sfe.online/api/logout/${unique}`)
          .then(function (response) {
            window.localStorage.setItem('LOGGED', JSON.stringify('FALSE'));
            window.localStorage.setItem(
              'LOGIN_STATUS',
              JSON.stringify('Terminated')
            );
          });
      }
    }

    var account = StorageData.localStorageJSON('ACCOUNT_TYPE');
    if (account == 'Admin') {
      navigate('/HomePageAdmin');
    } else if (account == 'Student') {
      navigate('/Homepage');
    } else if (account == '' || account === null || account === undefined) {
      navigate('/LoginPage');
    }
  });

  const [accessReportCard, setAccessReportCard] = useState(false);

  const [navbarWidth, setNavbarWidth] = useState(0);
  const [logoHeight, setLogoHeight] = useState(0);

  useEffect(() => {
    const data = StorageData.localStorageJSON('CURRENT_SECTION');
    if (data !== null && data !== false) setAccessReportCard(true);

    document.body.style.backgroundImage =
      'linear-gradient(to top, #e2e2e2, #f1f1f1 , #ffffff)';

    window.addEventListener('resize', setWidth);
    window.addEventListener('focus', setWidth);
    window.addEventListener('click', setWidthDelay);
    setWidth();
  });

  function setWidthDelay() {
    setTimeout(function () {
      var width = window.sessionStorage.getItem('NAVBAR_TEACHER_WIDTH');
      setNavbarWidth(width);

      // Logo height
      var height = window.sessionStorage.getItem('NAVBAR_TEACHER_LOGO');
      setLogoHeight(height);
    }, 1);
  }

  function setWidth() {
    var width = window.sessionStorage.getItem('NAVBAR_TEACHER_WIDTH');
    setNavbarWidth(width);

    // Logo height
    var height = window.sessionStorage.getItem('NAVBAR_TEACHER_LOGO');
    setLogoHeight(height);
  }

  const tab1 = () => {
    window.localStorage.setItem('CURRENT_TAB_INDEX', 1);
    navigate('/ClassList');
  };

  const tab2 = () => {
    window.localStorage.setItem('CURRENT_TAB_INDEX', 2);
    navigate('/EquationList');
  };

  const tab3 = () => {
    window.localStorage.setItem('CURRENT_TAB_INDEX', 3);
    navigate('/CreateEquation');
  };

  const tab4 = () => {
    window.localStorage.setItem('CURRENT_TAB_INDEX', 4);
    navigate('/MyRequest');
  };

  const tab5 = () => {
    window.localStorage.setItem('CURRENT_TAB_INDEX', 5);
    navigate('/HelpPageTeacher');
  };

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
        <HomePageTeacherSkeleton />
      </div>
    */}
      <div
        className={`bg-gradient-to-t from-[#e2e2e2] via-[#f1f1f1] to-[#ffffff] h-screen overflow-y-auto   
        ${
          navbarWidth == 160
            ? 'w-[calc(100%-160px)] ml-[160px]'
            : navbarWidth == 112
            ? 'w-[calc(100%-112px)] ml-[112px]'
            : navbarWidth == 90
            ? 'w-[calc(100%-90px)] ml-[90px]'
            : navbarWidth == 56
            ? 'w-[calc(100%-56px)] ml-[56px]'
            : navbarWidth == 143
            ? 'w-[calc(100%-143px)] ml-[143px]'
            : navbarWidth == 95
            ? 'w-[calc(100%-95px)] ml-[95px]'
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
              logoHeight == 94.5
                ? 'max-h-[94.5px]'
                : logoHeight == 67.5
                ? 'max-h-[67.5px]'
                : ''
            }`}
          >
            Overview
          </div>
          <div className="py-1.5"></div>
          <div
            className={`grid  grid-rows-2 gap-6 text-center 
                        ${accessReportCard ? 'grid-cols-3' : 'grid-cols-2'}`}
          >
            <div
              onClick={tab1}
              className={`overflow-hidden h-[calc(100vh-67.5vh)]  grid-rows-2 shadow-sm border-3 rounded-lg bg-white hover:bg-gray-100 cursor-pointer transition duration-200
              ${accessReportCard ? 'grid' : 'hidden'}`}
            >
              <div className="relative flex text-lime-600">
                <div className="flex mx-auto mt-auto hdScreen:-mb-8 semihdScreen:-mb-4 laptopScreen:-mb-2 averageScreen:-mb-0 xs:-mb-0">
                  <img
                    className="hdScreen:h-[105px] semihdScreen:h-[95px] laptopScreen:h-[85px] averageScreen:h-[80px] sm:h-[50px] xs:h-[40px] w-full"
                    src={require('../assets/images/home_teacher/ReportCards.png')}
                  ></img>
                </div>
              </div>
              <div className="hdScreen:pt-16 semihdScreen:pt-10 laptopScreen:pt-8 averageScreen:pt-6 xs:pt-2 ">
                <span className="font-semibold hdScreen:text-lg semihdScreen:text-lg laptopScreen:text-base averageScreen:text-base xs:text-sm text-gray-700">
                  Report Cards
                </span>
                <p className="hdScreen:text-base semihdScreen:text-base laptopScreen:text-sm averageScreen:text-sm xs:text-xs">
                  Check the students' performance.
                </p>
              </div>
            </div>
            <div
              onClick={tab2}
              className="overflow-hidden h-[calc(100vh-67.5vh)] grid grid-rows-2 shadow-sm border-3 rounded-lg bg-white hover:bg-gray-100 cursor-pointer transition duration-200"
            >
              <div className="relative flex text-lime-600">
                <div className="flex mx-auto mt-auto hdScreen:-mb-8 semihdScreen:-mb-4 laptopScreen:-mb-2 averageScreen:-mb-0 xs:-mb-0">
                  <img
                    className="hdScreen:h-[105px] semihdScreen:h-[95px] laptopScreen:h-[85px] averageScreen:h-[80px] sm:h-[50px] xs:h-[40px] w-full"
                    src={require('../assets/images/home_teacher/EquationList.png')}
                  ></img>
                </div>
              </div>
              <div className="hdScreen:pt-16 semihdScreen:pt-10 laptopScreen:pt-8 averageScreen:pt-6 xs:pt-2">
                <span className="font-semibold hdScreen:text-lg semihdScreen:text-lg laptopScreen:text-base averageScreen:text-base xs:text-sm text-gray-700">
                  Equation List
                </span>
                <p className="hdScreen:text-base semihdScreen:text-base laptopScreen:text-sm averageScreen:text-sm xs:text-xs">
                  List of created equations.
                </p>
              </div>
            </div>
            <div
              onClick={tab3}
              className="overflow-hidden h-[calc(100vh-67.5vh)] grid grid-rows-2 shadow-sm border-3 border-b-2 rounded-lg bg-white hover:bg-gray-100 cursor-pointer transition duration-200"
            >
              <div className="relative flex text-lime-600">
                <div className="flex mx-auto mt-auto hdScreen:-mb-8 semihdScreen:-mb-4 laptopScreen:-mb-2 averageScreen:-mb-0 xs:-mb-0">
                  <img
                    className="hdScreen:h-[105px] semihdScreen:h-[95px] laptopScreen:h-[85px] averageScreen:h-[80px] sm:h-[50px] xs:h-[40px] w-full"
                    src={require('../assets/images/home_teacher/CreateEquation.png')}
                  ></img>
                </div>
              </div>
              <div className="hdScreen:pt-16 semihdScreen:pt-10 laptopScreen:pt-8 averageScreen:pt-6 xs:pt-2">
                <span className="font-semibold hdScreen:text-lg semihdScreen:text-lg laptopScreen:text-base averageScreen:text-base xs:text-sm text-gray-700">
                  Create Equation
                </span>
                <p className="hdScreen:text-base semihdScreen:text-base laptopScreen:text-sm averageScreen:text-sm xs:text-xs">
                  Formulate an equation for students.
                </p>
              </div>
            </div>
            <div
              onClick={tab4}
              className="overflow-hidden h-[calc(100vh-67.5vh)] grid grid-rows-2 shadow-sm border-3 rounded-lg bg-white hover:bg-gray-100 cursor-pointer transition duration-200"
            >
              <div className="relative flex text-lime-600">
                <div className="flex mx-auto mt-auto hdScreen:-mb-10 semihdScreen:-mb-6 laptopScreen:-mb-4 averageScreen:-mb-1 xs:-mb-0">
                  <img
                    className="hdScreen:h-[105px] semihdScreen:h-[95px] laptopScreen:h-[85px] averageScreen:h-[80px] sm:h-[50px] xs:h-[35px] w-full"
                    src={require('../assets/images/home_teacher/MyRequests.png')}
                  ></img>
                </div>
              </div>
              <div className="hdScreen:pt-16 semihdScreen:pt-10 laptopScreen:pt-8 averageScreen:pt-6 xs:pt-2">
                <span className="font-semibold hdScreen:text-lg semihdScreen:text-lg laptopScreen:text-base averageScreen:text-base xs:text-sm text-gray-700">
                  My Requests
                </span>
                <p className="hdScreen:text-base semihdScreen:text-base laptopScreen:text-sm averageScreen:text-sm xs:text-xs">
                  View all your requests.
                </p>
              </div>
            </div>
            <div
              onClick={tab5}
              className="overflow-hidden h-[calc(100vh-67.5vh)] grid grid-rows-2 shadow-sm border-3 rounded-lg bg-white hover:bg-gray-100 cursor-pointer transition duration-200"
            >
              <div className="hdScreen:pl-11 semihdScreen:pl-10 laptopScreen:pl-9 averageScreen:pl-5  relative flex text-lime-600">
                <div className="flex mx-auto mt-auto hdScreen:-mb-8 semihdScreen:-mb-4 laptopScreen:-mb-2 averageScreen:-mb-0 xs:-mb-0">
                  <img
                    className="hdScreen:h-[105px] semihdScreen:h-[95px] laptopScreen:h-[85px] averageScreen:h-[80px] sm:h-[50px] xs:h-[40px] w-full"
                    src={require('../assets/images/home_teacher/HelpTeacher.png')}
                  ></img>
                </div>
              </div>
              <div className="hdScreen:pt-16 semihdScreen:pt-10 laptopScreen:pt-8 averageScreen:pt-6 xs:pt-2">
                <span className="font-semibold hdScreen:text-lg semihdScreen:text-lg laptopScreen:text-base averageScreen:text-base xs:text-sm text-gray-700">
                  Help
                </span>
                <p className="hdScreen:text-base semihdScreen:text-base laptopScreen:text-sm averageScreen:text-sm xs:text-xs">
                  To learn about the system.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
