import React, { Component } from 'react';
import { useFormik } from 'formik';
import { registrationSchema } from '../schemas';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import * as ReactDOM from 'react-dom';
import $, { uniqueSort } from 'jquery';

export default function RegistrationSkeleton() {
  document.body.style.height = '100vh';

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

  return (
    <>
      <div
        className={`bg-gradient-to-t from-[#e2e2e2] via-[#f1f1f1] to-[#ffffff] h-screen z-10 select-none overflow-y-auto  
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
            <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_.5s_infinite]">
              Registration
            </span>
          </div>

          <div className=" inline-flex lg:px-6 hdScreen:py-5 semihdScreen:py-3 laptopScreen:pb-3 averageScreen:pb-2 sm:pb-1 xs:pb-0.5">
            <p className="mt-[0.7rem] pr-2 lg:text-xl xs:text-base">
              <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_.5s_infinite]">
                Role:
              </span>
            </p>
            <div className="flex mt-[0.7rem] lg:text-lg xs:text-xs px-2">
              <button
                className={`cursor-default bg-gray-300 text-gray-300 lg:px-2 sm:px-2 xs:px-1 rounded-lg lg:w-24 relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_.5s_infinite]`}
              >
                Student
              </button>
              <button
                className={`cursor-default bg-gray-300 text-gray-300  ml-4  lg:px-2 xs:px-1 rounded-lg lg:w-24 relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_.5s_infinite] `}
              >
                Teacher
              </button>
            </div>

            <p className="border-l-2 border-gray-400 ml-6 pl-6 mt-[0.7rem] pr-2 lg:text-xl xs:text-base">
              <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_.5s_infinite]">
                Registration Type:
              </span>
            </p>
            <div className="flex mt-[0.7rem] lg:text-lg xs:text-xs px-2">
              <button
                className={`cursor-default bg-gray-300 text-gray-300  lg:px-2 sm:px-2 xs:px-1 rounded-lg lg:w-24 relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_.5s_infinite] `}
              >
                Single
              </button>
              <button
                className={`cursor-default bg-gray-300 text-gray-300  ml-4 lg:px-2 xs:px-1 rounded-lg lg:w-24 relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_.5s_infinite] `}
              >
                Bulk
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
