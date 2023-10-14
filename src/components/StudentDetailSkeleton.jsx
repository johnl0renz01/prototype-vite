import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

import {
  BsCaretUpFill,
  BsArrowDownSquareFill,
  BsFileEarmarkArrowDownFill,
} from 'react-icons/bs';

import { BsClipboard2X } from 'react-icons/bs';

export default function StudentDetailSkeleton() {
  document.body.style.height = '100vh';

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

  // GO BACK FUNCTION
  const ClassListPage = () => {
    setTimeout(proceed, 1);
    function proceed() {
      navigate(-1);
    }
  };

  function session(sessiontype) {
    return (
      <>
        <div
          className={`grid lg:grid-cols-11 rounded-l-md xs:h-12 shadow  bg-gray-300  p-3 relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_2s_infinite]`}
        >
          <div className="lg:col-span-3">
            <p className="lg:text-[1.75rem] text-gray-100 font-medium leading-4 mt-1">
              <span className="bg-gray-200 text-gray-200 mr-2 rounded-md">
                {sessiontype}
              </span>
              <span className="lg:text-sm sm:text-sm xs:text-xs font-normal bg-gray-200 text-gray-200 rounded-md">
                Aug 03, 2023 - 07:22 PM
              </span>
            </p>
          </div>
          <div className="lg:col-span-6 text-right lg:-mt-0 xs:-mt-8">
            <span className="lg:text-lg sm:text-sm xs:text-xs font-normal bg-gray-200 text-gray-200 rounded-md">
              Score: 15/20
            </span>
          </div>
          <div className="lg:col-span-2 text-right lg:-mt-0  xs:-mt-3">
            <span className="lg:text-lg sm:text-sm xs:text-xs font-normal bg-gray-200 text-gray-200 rounded-md">
              Time: 01:56:04
            </span>
          </div>
        </div>
        <div className="border-t-2 border-t-white"></div>
      </>
    );
  }

  return (
    <>
      <div
        className={`bg-gradient-to-t from-[#e2e2e2] via-[#f1f1f1] to-[#ffffff] h-screen z-10 select-none overflow-y-auto
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
        }`}
      >
        <section className="relative mx-auto p-8 w-full">
          <div
            className={`flex md:-mt-0 xs:-mt-1 border-b-2 text-gray-600 lg:text-4xl font-bold
            ${
              logoHeight == 94.5
                ? 'max-h-[94.5px]'
                : logoHeight == 67.5
                ? 'max-h-[67.5px]'
                : ''
            }`}
          >
            <BsCaretUpFill
              onClick={ClassListPage}
              title="Go back"
              className="hidden cursor-pointer text-gray-100 bg-gray-400 averageScreen:border-4 xs:border-2 border-gray-400 averageScreen:mr-3 xs:mr-1 hover:text-white hover:bg-gray-600 hover:border-gray-600 rounded-full averageScreen:pb-1 xs:pb-0.5 rotate-[270deg] averageScreen:mt-3.5 averageScreen:text-[2.25rem] xs:mt-0.5 xs:text-[1.25rem]"
            />
            <span className="">Report Details</span>
          </div>
          <div className="p-4 overflow-hidden w-full ">
            <div className="grid xs:grid-cols-2">
              <div className="">
                <p className="-mt-0.5 hdScreen:text-3xl semihdScreen:text-3xl laptopScreen:text-3xl averageScreen:text-2.5xl xs:text-base text-gray-700  font-bold leading-4 mb-1">
                  <span className="bg-gray-300 text-gray-300 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_2s_infinite]">
                    John Lorenz N. Dela Cruz
                  </span>
                </p>
                <p className="mt-3 -mb-2 hdScreen:text-base semihdScreen:text-base laptopScreen:text-base averageScreen:text-base xs:text-xs text-gray-700 leading-4 averageScreen:pb-4 xs:pb-1">
                  <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_2s_infinite]">
                    delacruz.johnlorenz@sf.edu.ph
                  </span>
                </p>
                <p className="hdScreen:text-lg semihdScreen:text-base laptopScreen:text-base averageScreen:text-base xs:text-xs text-gray-700 font-medium leading-4 hdScreen:mb-3 semihdScreen:mb-2 laptopScreen:mb-1 averageScreen:mb-0.5">
                  <span className="bg-gray-300 text-gray-300 rounded-md mr-1 relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_2s_infinite]">
                    Answered Questions:{' '}
                  </span>
                  <span
                    id="correct"
                    className="font-normal bg-gray-200 text-gray-200 rounded-md"
                  >
                    161
                  </span>
                </p>
                <p className="hdScreen:text-lg semihdScreen:text-base laptopScreen:text-base averageScreen:text-base xs:text-xs text-gray-700 font-medium leading-4 hdScreen:mb-3 semihdScreen:mb-2 laptopScreen:mb-1 averageScreen:mb-0.5">
                  <span className="bg-gray-300 text-gray-300 rounded-md mr-1 relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_2s_infinite]">
                    Abandoned Questions:{' '}
                  </span>
                  <span
                    id="incorrect"
                    className="font-normal bg-gray-200 text-gray-200 rounded-md"
                  >
                    259
                  </span>
                </p>
                <p className="hdScreen:text-lg semihdScreen:text-base laptopScreen:text-base averageScreen:text-base xs:text-xs text-gray-700 font-medium leading-4 hdScreen:mb-3 semihdScreen:mb-2 laptopScreen:mb-1 averageScreen:mb-0.5">
                  <span className="bg-gray-300 text-gray-300 rounded-md mr-1 relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_2s_infinite]">
                    Accuracy Rate:{' '}
                  </span>
                  <span
                    id="accuracy"
                    className="font-normal bg-gray-200 text-gray-200 rounded-md"
                  >
                    99.99%
                  </span>
                </p>
              </div>
              <div className="grid grid-cols-3 text-center averageScreen:mb-2 ">
                <div>
                  <p className="hdScreen:text-2xl semihdScreen:text-xl laptopScreen:text-xl averageScreen:text-2xl sm:text-lg xs:text-base text-gray-700 font-medium leading-4 averageScreen:mb-5 xs:mb-1">
                    <span className="bg-gray-300 text-gray-300 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_2s_infinite]">
                      Easy
                    </span>
                  </p>
                  <div className="hdScreen:w-32 hdScreen:h-32 semihdScreen:w-[7.5rem] semihdScreen:h-[7.5rem]  laptopScreen:w-[7rem] laptopScreen:h-[7rem] averageScreen:w-[6.5rem] averageScreen:h-[6.5rem] xs:w-16 xs:h-16  bg-gray-300 rounded-full text-center flex items-center justify-center  mx-auto relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_2s_infinite]">
                    <span className="opacity-0 text-green-100 hdScreen:text-6xl semihdScreen:text-6xl laptopScreen:text-5xl averageScreen:text-5xl sm:text-2xl xs:text-xl">
                      10
                    </span>
                  </div>
                </div>
                <div>
                  <p className="hdScreen:text-2xl semihdScreen:text-xl laptopScreen:text-xl averageScreen:text-2xl sm:text-lg xs:text-base text-gray-700 font-medium leading-4 averageScreen:mb-5 xs:mb-1">
                    <span className="bg-gray-300 text-gray-300 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_2s_infinite]">
                      Average
                    </span>
                  </p>
                  <div className="hdScreen:w-32 hdScreen:h-32 semihdScreen:w-[7.5rem] semihdScreen:h-[7.5rem]  laptopScreen:w-[7rem] laptopScreen:h-[7rem] averageScreen:w-[6.5rem] averageScreen:h-[6.5rem] xs:w-16 xs:h-16 bg-gray-300  rounded-full text-center flex items-center justify-center   mx-auto relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_2s_infinite]">
                    <span className="opacity-0 text-yellow-100 hdScreen:text-6xl semihdScreen:text-6xl laptopScreen:text-5xl averageScreen:text-5xl sm:text-2xl xs:text-xl">
                      10
                    </span>
                  </div>
                </div>
                <div>
                  <p className="hdScreen:text-2xl semihdScreen:text-xl laptopScreen:text-xl averageScreen:text-2xl sm:text-lg xs:text-base text-gray-700 font-medium leading-4 averageScreen:mb-5 xs:mb-1">
                    <span className="bg-gray-300 text-gray-300 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_2s_infinite]">
                      Difficult
                    </span>
                  </p>
                  <div className="hdScreen:w-32 hdScreen:h-32 semihdScreen:w-[7.5rem] semihdScreen:h-[7.5rem]  laptopScreen:w-[7rem] laptopScreen:h-[7rem] averageScreen:w-[6.5rem] averageScreen:h-[6.5rem] xs:w-16 xs:h-16 bg-gray-300  rounded-full text-center flex items-center justify-center    mx-auto relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_2s_infinite]">
                    <span className="opacity-0 text-red-100 hdScreen:text-6xl semihdScreen:text-6xl laptopScreen:text-5xl averageScreen:text-5xl sm:text-2xl xs:text-xl">
                      10
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <hr></hr>

            <p className="mt-3 -mb-1 hdScreen:text-4xl semihdScreen:text-3xl laptopScreen:text-2xl averageScreen:text-2xl sm:text-2xl text-gray-700 font-semibold leading-4 hdScreen:mb-7 semihdScreen:mb-5 laptopScreen:mb-3 averageScreen:mb-2">
              <span className="bg-gray-300 text-gray-300 rounded-md">
                History
              </span>
            </p>
            <div
              id="history"
              className="overflow-auto bg-gray-200/80 rounded-md mx-3 mt-2 hdScreen:min-h-[32rem] hdScreen:max-h-[32rem] semihdScreen:min-h-[24rem] semihdScreen:max-h-[24rem] laptopScreen:min-h-[15.7rem] laptopScreen:max-h-[15.7rem] averageScreen:min-h-[14rem] averageScreen:max-h-[14rem] xs:min-h-[14rem] xs:max-h-[14rem] style-2 "
            >
              {session('Easy')}
              {session('Easy')}
              {session('Average')}
              {session('Difficult')}
              {session('Easy')}
              {session('Easy')}
              {session('Average')}
              {session('Difficult')}
              {session('Easy')}
              {session('Easy')}
              {session('Average')}
              {session('Difficult')}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
