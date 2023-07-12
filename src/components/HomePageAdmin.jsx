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
import { BsSlashCircle } from 'react-icons/bs';
import { BsTrash3 } from 'react-icons/bs';

import { GoChecklist } from 'react-icons/go';
import { HiPlusSmall } from 'react-icons/hi2';

import { VscEyeClosed } from 'react-icons/vsc';
import { VscEye } from 'react-icons/vsc';

import { HiPencilSquare } from 'react-icons/hi2';

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
  BsArrowCounterclockwise,
  BsEnvelopeExclamation,
} from 'react-icons/bs';

import { GoLightBulb } from 'react-icons/go';

import { RxClipboard, RxPerson, RxBarChart, RxLockOpen1 } from 'react-icons/rx';

import {
  CiViewList,
  CiEdit,
  CiViewTable,
  CiUnlock,
  CiServer,
  CiMail,
} from 'react-icons/ci';
import { FiEdit2 } from 'react-icons/fi';
import {
  LiaLightbulb,
  LiaAlignLeftSolid,
  LiaQuestionCircle,
  LiaSitemapSolid,
  LiaServerSolid,
  LiaElementor,
  LiaUserEditSolid,
  LiaEnvelope,
} from 'react-icons/lia';

import { SlOrganization } from 'react-icons/sl';

import { RiLoopRightFill } from 'react-icons/ri';

import { TfiViewListAlt } from 'react-icons/tfi';

export default function HomePageAdmin() {
  const navigate = useNavigate();

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

  const tab1 = () => {
    window.localStorage.setItem('CURRENT_TAB_INDEX', 1);
    navigate('/ManageAccount');
  };

  const tab2 = () => {
    window.localStorage.setItem('CURRENT_TAB_INDEX', 2);
    navigate('/ManageSection');
  };

  const tab3 = () => {
    window.localStorage.setItem('CURRENT_TAB_INDEX', 3);
    navigate('/Registration');
  };

  const tab4 = () => {
    window.localStorage.setItem('CURRENT_TAB_INDEX', 4);
    navigate('/ResetPassword');
  };

  const tab5 = () => {
    window.localStorage.setItem('CURRENT_TAB_INDEX', 5);
    navigate('/UserRequest');
  };

  const tab6 = () => {
    window.localStorage.setItem('CURRENT_TAB_INDEX', 6);
    navigate('/HelpPageAdmin');
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
            Overview
          </div>
          <div className="py-1.5"></div>
          <div className="grid grid-cols-3 grid-rows-2 gap-6 text-center">
            <div
              onClick={tab1}
              className="overflow-hidden h-[calc(100vh-67.5vh)] grid grid-rows-2 shadow-sm border-3 rounded-lg bg-white hover:bg-gray-100 cursor-pointer transition duration-200"
            >
              <div className="relative flex text-[#dac238]">
                <div className="flex mx-auto mt-auto hdScreen:-mb-8 semihdScreen:-mb-4 laptopScreen:-mb-2 averageScreen:-mb-0 xs:-mb-0">
                  <img
                    className="hdScreen:h-[105px] semihdScreen:h-[95px] laptopScreen:h-[85px] averageScreen:h-[80px] xs:h-[50px] w-full"
                    src={require('../assets/images/home_admin/ManageAccounts.png')}
                  ></img>
                </div>
              </div>
              <div className="hdScreen:pt-16 semihdScreen:pt-10 laptopScreen:pt-8 averageScreen:pt-6 xs:pt-2">
                <span className="font-semibold hdScreen:text-lg semihdScreen:text-lg laptopScreen:text-base averageScreen:text-base xs:text-sm text-gray-700">
                  Manage Accounts
                </span>
                <p className="hdScreen:text-base semihdScreen:text-base laptopScreen:text-sm averageScreen:text-sm xs:text-xs">
                  Administer the registered accounts.
                </p>
              </div>
            </div>
            <div
              onClick={tab2}
              className="overflow-hidden h-[calc(100vh-67.5vh)] grid grid-rows-2 shadow-sm border-3 rounded-lg bg-white hover:bg-gray-100 cursor-pointer transition duration-200"
            >
              <div className="relative flex text-[#dac238]">
                <div className="flex mx-auto mt-auto hdScreen:-mb-8 semihdScreen:-mb-4 laptopScreen:-mb-2 averageScreen:-mb-0 xs:-mb-0">
                  <img
                    className="hdScreen:h-[105px] semihdScreen:h-[95px] laptopScreen:h-[85px] averageScreen:h-[80px] xs:h-[50px] w-full"
                    src={require('../assets/images/home_admin/ManageSections.png')}
                  ></img>
                </div>
              </div>
              <div className="hdScreen:pt-16 semihdScreen:pt-10 laptopScreen:pt-8 averageScreen:pt-6 xs:pt-2">
                <span className="font-semibold hdScreen:text-lg semihdScreen:text-lg laptopScreen:text-base averageScreen:text-base xs:text-sm text-gray-700">
                  Manage Sections
                </span>
                <p className="hdScreen:text-base semihdScreen:text-base laptopScreen:text-sm averageScreen:text-sm xs:text-xs">
                  Appoint teachers in sections respectively.
                </p>
              </div>
            </div>
            <div
              onClick={tab3}
              className="overflow-hidden h-[calc(100vh-67.5vh)] grid grid-rows-2 shadow-sm border-3 border-b-2 rounded-lg bg-white hover:bg-gray-100 cursor-pointer transition duration-200"
            >
              <div className="relative flex text-[#dac238]">
                <div className="flex mx-auto mt-auto hdScreen:-mb-8 semihdScreen:-mb-4 laptopScreen:-mb-2 averageScreen:-mb-0 xs:-mb-0">
                  <img
                    className="hdScreen:h-[105px] semihdScreen:h-[95px] laptopScreen:h-[85px] averageScreen:h-[80px] xs:h-[50px] w-full"
                    src={require('../assets/images/home_admin/RegisterAccount.png')}
                  ></img>
                </div>
              </div>
              <div className="hdScreen:pt-16 semihdScreen:pt-10 laptopScreen:pt-8 averageScreen:pt-6 xs:pt-2">
                <span className="font-semibold hdScreen:text-lg semihdScreen:text-lg laptopScreen:text-base averageScreen:text-base xs:text-sm text-gray-700">
                  Register Account
                </span>
                <p className="hdScreen:text-base semihdScreen:text-base laptopScreen:text-sm averageScreen:text-sm xs:text-xs">
                  Incorporate students and teachers into the system.
                </p>
              </div>
            </div>
            <div
              onClick={tab4}
              className="overflow-hidden h-[calc(100vh-67.5vh)] grid grid-rows-2 shadow-sm border-3 rounded-lg bg-white hover:bg-gray-100 cursor-pointer transition duration-200"
            >
              <div className="relative flex text-[#dac238]">
                <div className="flex mx-auto mt-auto hdScreen:-mb-8 semihdScreen:-mb-4 laptopScreen:-mb-2 averageScreen:-mb-0 xs:-mb-0">
                  <img
                    className="hdScreen:h-[105px] semihdScreen:h-[95px] laptopScreen:h-[85px] averageScreen:h-[80px] xs:h-[50px] w-full"
                    src={require('../assets/images/home_admin/ResetPassword.png')}
                  ></img>
                </div>
              </div>
              <div className="hdScreen:pt-16 semihdScreen:pt-10 laptopScreen:pt-8 averageScreen:pt-6 xs:pt-2">
                <span className="font-semibold hdScreen:text-lg semihdScreen:text-lg laptopScreen:text-base averageScreen:text-base xs:text-sm text-gray-700">
                  Reset Password
                </span>
                <p className="hdScreen:text-base semihdScreen:text-base laptopScreen:text-sm averageScreen:text-sm xs:text-xs">
                  Reset account's password by request.
                </p>
              </div>
            </div>
            <div
              onClick={tab5}
              className="overflow-hidden h-[calc(100vh-67.5vh)] grid grid-rows-2 shadow-sm border-3 rounded-lg bg-white hover:bg-gray-100 cursor-pointer transition duration-200"
            >
              <div className="relative flex text-[#dac238]">
                <div className="flex mx-auto mt-auto hdScreen:-mb-10 semihdScreen:-mb-6 laptopScreen:-mb-4 averageScreen:-mb-1 xs:-mb-0">
                  <img
                    className="hdScreen:h-[105px] semihdScreen:h-[95px] laptopScreen:h-[85px] averageScreen:h-[80px] xs:h-[50px] w-full"
                    src={require('../assets/images/home_admin/UserRequests.png')}
                  ></img>
                </div>
              </div>
              <div className="hdScreen:pt-16 semihdScreen:pt-10 laptopScreen:pt-8 averageScreen:pt-6 xs:pt-2">
                <span className="font-semibold hdScreen:text-lg semihdScreen:text-lg laptopScreen:text-base averageScreen:text-base xs:text-sm text-gray-700">
                  User Requests
                </span>
                <p className="hdScreen:text-base semihdScreen:text-base laptopScreen:text-sm averageScreen:text-sm xs:text-xs">
                  View the requests of users.
                </p>
              </div>
            </div>
            <div
              onClick={tab6}
              className="overflow-hidden h-[calc(100vh-67.5vh)] grid grid-rows-2 shadow-sm border-3 rounded-lg bg-white hover:bg-gray-100 cursor-pointer transition duration-200"
            >
              <div className="hdScreen:pl-9 semihdScreen:pl-8 laptopScreen:pl-7 averageScreen:pl-7 xs:pl-4 relative flex text-lime-600">
                <div className="flex mx-auto mt-auto hdScreen:-mb-8 semihdScreen:-mb-4 laptopScreen:-mb-2 averageScreen:-mb-0 xs:-mb-0">
                  <img
                    className="hdScreen:h-[105px] semihdScreen:h-[95px] laptopScreen:h-[85px] averageScreen:h-[80px] xs:h-[50px] w-full"
                    src={require('../assets/images/home_admin/HelpAdmin.png')}
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