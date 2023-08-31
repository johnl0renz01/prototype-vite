import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

export default function HomePageAdminSkeleton() {
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

  return (
    <>
      <div
        className={`bg-gradient-to-t from-[#e2e2e2] via-[#f1f1f1] to-[#ffffff] h-screen z-10 select-none  
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
            <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
              Overview
            </span>
          </div>
          <div className="py-1.5"></div>
          <div className="grid grid-cols-3 grid-rows-2 gap-6 text-center">
            <div className="overflow-hidden h-[calc(100vh-67.5vh)] grid grid-rows-2 shadow-sm border-3 rounded-lg bg-gray-200  transition duration-200 relative before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
              <div className="relative flex text-[#dac238]">
                <div className="flex mx-auto mt-auto hdScreen:-mb-8 semihdScreen:-mb-4 laptopScreen:-mb-2 averageScreen:-mb-0 xs:-mb-0">
                  <div className="bg-gray-300 rounded-md overflow-hidden relative before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                    <img
                      className="opacity-0 hdScreen:h-[105px] semihdScreen:h-[95px] laptopScreen:h-[85px] averageScreen:h-[80px] xs:h-[50px] w-full"
                      src={require('../assets/images/home_admin/ManageAccounts.png')}
                    ></img>
                  </div>
                </div>
              </div>
              <div className="hdScreen:pt-16 semihdScreen:pt-10 laptopScreen:pt-8 averageScreen:pt-6 xs:pt-2">
                <span className="bg-gray-300 text-gray-300 rounded-md font-semibold hdScreen:text-lg semihdScreen:text-lg laptopScreen:text-base averageScreen:text-base xs:text-sm ">
                  Manage Accounts
                </span>
                <p className="hdScreen:text-base semihdScreen:text-base laptopScreen:text-sm averageScreen:text-sm xs:text-xs">
                  <span className="bg-gray-300 text-gray-300 rounded-md">
                    Administer the registered accounts.
                  </span>
                </p>
              </div>
            </div>
            <div className="overflow-hidden h-[calc(100vh-67.5vh)] grid grid-rows-2 shadow-sm border-3 rounded-lg bg-gray-200  transition duration-200 relative before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
              <div className="relative flex text-[#dac238]">
                <div className="flex mx-auto mt-auto hdScreen:-mb-8 semihdScreen:-mb-4 laptopScreen:-mb-2 averageScreen:-mb-0 xs:-mb-0">
                  <div className="bg-gray-300 rounded-md overflow-hidden relative before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                    <img
                      className="opacity-0 hdScreen:h-[105px] semihdScreen:h-[95px] laptopScreen:h-[85px] averageScreen:h-[80px] xs:h-[50px] w-full"
                      src={require('../assets/images/home_admin/ManageSections.png')}
                    ></img>
                  </div>
                </div>
              </div>
              <div className="hdScreen:pt-16 semihdScreen:pt-10 laptopScreen:pt-8 averageScreen:pt-6 xs:pt-2">
                <span className="bg-gray-300 text-gray-300 rounded-md font-semibold hdScreen:text-lg semihdScreen:text-lg laptopScreen:text-base averageScreen:text-base xs:text-sm ">
                  Manage Sections
                </span>
                <p className="hdScreen:text-base semihdScreen:text-base laptopScreen:text-sm averageScreen:text-sm xs:text-xs">
                  <span className="bg-gray-300 text-gray-300 rounded-md">
                    Appoint teachers in sections respectively.
                  </span>
                </p>
              </div>
            </div>
            <div className="overflow-hidden h-[calc(100vh-67.5vh)] grid grid-rows-2 shadow-sm border-3 border-b-2 rounded-lg bg-gray-200  transition duration-200 relative before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
              <div className="relative flex text-[#dac238]">
                <div className="flex mx-auto mt-auto hdScreen:-mb-8 semihdScreen:-mb-4 laptopScreen:-mb-2 averageScreen:-mb-0 xs:-mb-0">
                  <div className="bg-gray-300 rounded-md overflow-hidden relative before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                    <img
                      className="opacity-0 hdScreen:h-[105px] semihdScreen:h-[95px] laptopScreen:h-[85px] averageScreen:h-[80px] xs:h-[50px] w-full"
                      src={require('../assets/images/home_admin/RegisterAccount.png')}
                    ></img>
                  </div>
                </div>
              </div>
              <div className="hdScreen:pt-16 semihdScreen:pt-10 laptopScreen:pt-8 averageScreen:pt-6 xs:pt-2">
                <span className="bg-gray-300 text-gray-300 rounded-md font-semibold hdScreen:text-lg semihdScreen:text-lg laptopScreen:text-base averageScreen:text-base xs:text-sm ">
                  Register Account
                </span>
                <p className="hdScreen:text-base semihdScreen:text-base laptopScreen:text-sm averageScreen:text-sm xs:text-xs">
                  <span className="bg-gray-300 text-gray-300 rounded-md">
                    Incorporate students and teachers into the system.
                  </span>
                </p>
              </div>
            </div>
            <div className="overflow-hidden h-[calc(100vh-67.5vh)] grid grid-rows-2 shadow-sm border-3 rounded-lg bg-gray-200  transition duration-200 relative before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
              <div className="relative flex text-[#dac238]">
                <div className="flex mx-auto mt-auto hdScreen:-mb-8 semihdScreen:-mb-4 laptopScreen:-mb-2 averageScreen:-mb-0 xs:-mb-0">
                  <div className="bg-gray-300 rounded-md overflow-hidden relative before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                    <img
                      className="opacity-0 hdScreen:h-[105px] semihdScreen:h-[95px] laptopScreen:h-[85px] averageScreen:h-[80px] xs:h-[50px] w-full"
                      src={require('../assets/images/home_admin/ResetPassword.png')}
                    ></img>
                  </div>
                </div>
              </div>
              <div className="hdScreen:pt-16 semihdScreen:pt-10 laptopScreen:pt-8 averageScreen:pt-6 xs:pt-2">
                <span className="bg-gray-300 text-gray-300 rounded-md font-semibold hdScreen:text-lg semihdScreen:text-lg laptopScreen:text-base averageScreen:text-base xs:text-sm ">
                  Reset Password
                </span>
                <p className="hdScreen:text-base semihdScreen:text-base laptopScreen:text-sm averageScreen:text-sm xs:text-xs">
                  <span className="bg-gray-300 text-gray-300 rounded-md">
                    Reset account's password by request.
                  </span>
                </p>
              </div>
            </div>
            <div className="overflow-hidden h-[calc(100vh-67.5vh)] grid grid-rows-2 shadow-sm border-3 rounded-lg bg-gray-200  transition duration-200 relative before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
              <div className="relative flex text-[#dac238]">
                <div className="flex mx-auto mt-auto hdScreen:-mb-10 semihdScreen:-mb-6 laptopScreen:-mb-4 averageScreen:-mb-1 xs:-mb-0">
                  <div className="bg-gray-300 rounded-md overflow-hidden relative before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                    <img
                      className="opacity-0 hdScreen:h-[105px] semihdScreen:h-[95px] laptopScreen:h-[85px] averageScreen:h-[80px] xs:h-[50px] w-full"
                      src={require('../assets/images/home_admin/UserRequests.png')}
                    ></img>
                  </div>
                </div>
              </div>
              <div className="hdScreen:pt-16 semihdScreen:pt-10 laptopScreen:pt-8 averageScreen:pt-6 xs:pt-2">
                <span className="bg-gray-300 text-gray-300 rounded-md font-semibold hdScreen:text-lg semihdScreen:text-lg laptopScreen:text-base averageScreen:text-base xs:text-sm ">
                  User Requests
                </span>
                <p className="hdScreen:text-base semihdScreen:text-base laptopScreen:text-sm averageScreen:text-sm xs:text-xs">
                  <span className="bg-gray-300 text-gray-300 rounded-md">
                    View the requests of users.
                  </span>
                </p>
              </div>
            </div>
            <div className="overflow-hidden h-[calc(100vh-67.5vh)] grid grid-rows-2 shadow-sm border-3 rounded-lg bg-gray-200  transition duration-200 relative before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
              <div className="hdScreen:pl-9 semihdScreen:pl-8 laptopScreen:pl-7 averageScreen:pl-7 xs:pl-4 relative flex text-lime-600">
                <div className="flex mx-auto mt-auto hdScreen:-mb-8 semihdScreen:-mb-4 laptopScreen:-mb-2 averageScreen:-mb-0 xs:-mb-0">
                  <div className="bg-gray-300 rounded-md overflow-hidden relative before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                    <img
                      className="opacity-0 hdScreen:h-[105px] semihdScreen:h-[95px] laptopScreen:h-[85px] averageScreen:h-[80px] xs:h-[50px] w-full"
                      src={require('../assets/images/home_admin/HelpAdmin.png')}
                    ></img>
                  </div>
                </div>
              </div>
              <div className="hdScreen:pt-16 semihdScreen:pt-10 laptopScreen:pt-8 averageScreen:pt-6 xs:pt-2">
                <span className="bg-gray-300 text-gray-300 rounded-md font-semibold hdScreen:text-lg semihdScreen:text-lg laptopScreen:text-base averageScreen:text-base xs:text-sm ">
                  Help
                </span>
                <p className="hdScreen:text-base semihdScreen:text-base laptopScreen:text-sm averageScreen:text-sm xs:text-xs">
                  <span className="bg-gray-300 text-gray-300 rounded-md">
                    To learn about the system.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
