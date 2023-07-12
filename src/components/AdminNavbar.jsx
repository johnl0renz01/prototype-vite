import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

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

export default function AdminNavbar() {
  const navigate = useNavigate();

  const [tabHighlight, setTabHighlight] = useState(0);
  const [accType, setAccType] = useState('');

  useEffect(() => {
    var account = JSON.parse(window.localStorage.getItem('ACCOUNT_TYPE'));
    setAccType(account);
    window.addEventListener('resize', calculateWidthAdmin);
    calculateWidthAdmin();
    getCurrentTab();
  });

  function calculateWidthAdmin() {
    var divElement1 = document.getElementById('adminNavbar');
    var widthValue1 = ReactDOM.findDOMNode(divElement1).offsetWidth;

    window.localStorage.setItem('NAVBAR_ADMIN_WIDTH', widthValue1);
    console.log(widthValue1);

    //Calculate height logo
    var divElement2 = document.getElementById('logo');
    var heightValue1 = ReactDOM.findDOMNode(divElement2).offsetHeight;
    heightValue1 += 2.5;
    window.localStorage.setItem('NAVBAR_ADMIN_LOGO', heightValue1);
  }

  function getCurrentTab() {
    let highlight = JSON.parse(
      window.localStorage.getItem('CURRENT_TAB_INDEX')
    );
    if (highlight == null || highlight == undefined) {
    } else {
      if (highlight == 1) {
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

  const tab4 = () => {
    window.localStorage.setItem('CURRENT_TAB_INDEX', 4);
    getCurrentTab();
    navigate('/ResetPassword');
  };

  const tab5 = () => {
    window.localStorage.setItem('CURRENT_TAB_INDEX', 5);
    getCurrentTab();
    navigate('/UserRequest');
  };

  const tab6 = () => {
    window.localStorage.setItem('CURRENT_TAB_INDEX', 6);
    getCurrentTab();
    navigate('/HelpPageAdmin');
  };

  const homePage = () => {
    window.localStorage.removeItem('CURRENT_TAB_INDEX');
    setTabHighlight(0);
    navigate('/HomePageAdmin');
  };

  const [logoutState, setLogoutState] = useState(false);

  const logout = () => {
    setLogoutState(true);
    window.localStorage.removeItem('CURRENT_TAB_INDEX');
    setTabHighlight(0);
    navigate('/LoginPage');
    document.body.style.backgroundImage =
      'linear-gradient(to top, #bef264, #d9f99d , #ccf779)';
    window.location.reload(false);
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

  return (
    <>
      <div
        className={`${accType == 'Admin' ? 'visible' : 'hidden'} ${
          logoutState == true ? 'hidden' : ''
        }`}
      >
        <div
          id="adminNavbar"
          className="sm:flex xs:hidden lg:flex flex-col bg-gradient-to-b from-[#d6d135] via-[#cebc46] to-[#ddc236] text-center  h-screen fixed z-50 drop-shadow-[0_0px_5px_rgba(0,0,0,0.30)]"
        >
          <div className="">
            <ul className="">
              <li
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
                onClick={tab1}
                className={`cursor-pointer  border-b-2 border-black/5 ${
                  tabHighlight == 1
                    ? 'bg-white/[75%] text-yellow-700 '
                    : 'hover:bg-black/30 text-white transition duration-300'
                }
                
                ${sidebarMode == 'Minimized' ? 'pb-2.5 pt-2' : 'pb-1 pt-2'}`}
              >
                <div className="relative text-center font-bold">
                  <BsPeople className="lg:text-[2.2rem] mx-auto -mb-1" />
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
                onClick={tab2}
                className={`cursor-pointer border-b-2 border-black/5 ${
                  tabHighlight == 2
                    ? 'bg-white/[75%] text-yellow-700'
                    : 'hover:bg-black/30 text-white transition duration-300'
                }
                ${sidebarMode == 'Minimized' ? 'pb-2.5 pt-2' : 'pb-1 pt-2'}
                `}
              >
                <div className="relative text-center  font-bold ">
                  <BsReceiptCutoff className="lg:text-[2.2rem] mx-auto -mb-0.5" />
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
                onClick={tab3}
                className={`cursor-pointer border-b-2 border-black/5 ${
                  tabHighlight == 3
                    ? 'bg-white/[75%] text-yellow-700'
                    : 'hover:bg-black/30 text-white transition duration-300'
                }
                
                ${sidebarMode == 'Minimized' ? 'pb-2.5 pt-2' : 'pb-1 pt-3'}`}
              >
                <div className="relative text-center  font-bold ">
                  <BsPersonAdd className="lg:text-[2.2rem] mx-auto " />
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
                onClick={tab4}
                className={`cursor-pointer border-b-2 border-black/5 ${
                  tabHighlight == 4
                    ? 'bg-white/[75%] text-yellow-700'
                    : 'hover:bg-black/30 text-white transition duration-300'
                }
                
                ${sidebarMode == 'Minimized' ? 'pb-2.5 pt-2' : 'pb-1 pt-3'}
                `}
              >
                <div className="relative text-center  font-bold">
                  <BsPersonGear className="lg:text-[2.2rem] mx-auto" />
                  <span
                    className={`lg:text-base xs:text-xs font-poppins font-semibold lg:px-2 ${
                      sidebarMode == 'Minimized' ? 'hidden' : ''
                    }`}
                  >
                    Reset Password
                  </span>
                </div>
              </li>
              <li
                onClick={tab5}
                className={`cursor-pointer border-b-2 border-black/5 ${
                  tabHighlight == 5
                    ? 'bg-white/[75%] text-yellow-700'
                    : 'hover:bg-black/30 text-white transition duration-300'
                }
                ${sidebarMode == 'Minimized' ? 'pb-2.5 pt-2' : 'pb-1 pt-3'}`}
              >
                <div className="relative text-center  font-bold">
                  <BsPersonExclamation className="lg:text-[2.2rem] mx-auto " />
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
                onClick={tab6}
                className={`cursor-pointer border-b-2 border-black/5 ${
                  tabHighlight == 6
                    ? 'bg-white/[75%] text-yellow-700'
                    : 'hover:bg-black/30 text-white transition duration-300'
                }
                ${sidebarMode == 'Minimized' ? 'pb-2.5 pt-2' : 'pb-1 pt-3'}`}
              >
                <div className="relative text-center  font-bold">
                  <BsQuestionCircle className="lg:text-[2.2rem] mx-auto " />
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
                onClick={logout}
                className={`cursor-pointer border-b-2 border-black/5 hover:bg-black/30 text-white transition duration-300 ${
                  sidebarMode == 'Minimized' ? 'pb-2.5 pt-2' : 'pb-1 pt-3'
                }
                `}
              >
                <div className="relative text-center  font-bold">
                  <BsDoorOpen className="lg:text-[2.2rem] mx-auto " />
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
                <TfiShiftLeft className="lg:text-[2.2rem] mx-auto " />
              </div>
              {/* 
              <div className="flex justify-center  font-bold">
                <TfiShiftLeft className="lg:text-[2.2rem]" />
                <span className="lg:text-base xs:text-xs font-poppins font-semibold lg:mt-1.5 lg:pl-0.5 lg:pr-3">
                  Minimize
                </span>
              </div>
              */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
