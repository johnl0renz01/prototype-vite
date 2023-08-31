import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

import { BsCaretUpFill } from 'react-icons/bs';

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

  function session(sessiontype) {
    return (
      <>
        <div
          className={`grid lg:grid-cols-11 rounded-l-md xs:h-12 shadow  bg-gray-300  p-3 relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]`}
        >
          <div className="lg:col-span-3">
            <p className="lg:text-[1.75rem] text-gray-100 font-medium leading-4 mt-1">
              <span className="bg-gray-200 text-gray-200 mr-2 rounded-md">
                {sessiontype}
              </span>
              <span className="lg:text-sm sm:text-xs font-normal bg-gray-200 text-gray-200 rounded-md">
                Aug 03, 2023 - 07:22 PM
              </span>
            </p>
          </div>
          <div className="lg:col-span-6 text-right lg:-mt-0 xs:-mt-8">
            <span className="lg:text-lg  font-normal bg-gray-200 text-gray-200 rounded-md">
              Score: 15/20
            </span>
          </div>
          <div className="lg:col-span-2 text-right lg:-mt-0  xs:-mt-3">
            <span className="lg:text-lg  font-normal bg-gray-200 text-gray-200 rounded-md">
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
        className={`bg-gradient-to-t from-[#e2e2e2] via-[#f1f1f1] to-[#ffffff] h-screen z-10 select-none
        ${
          navbarWidth == 143
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
              title="Go back"
              className=" text-gray-300 bg-gray-300 border-4 border-gray-300 mr-3  rounded-full pb-1 rotate-[270deg] mt-3.5 text-[2.25rem] relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]"
            />
            <div className="mt-0.5">
              <span className="bg-gray-200 text-gray-200 rounded-md">
                Report Details
              </span>
            </div>
          </div>
          <div className="p-4 overflow-hidden w-full ">
            <div className="grid sm:grid-cols-1 lg:grid-cols-2">
              <div className="">
                <p className="-mt-0.5 hdScreen:text-3xl semihdScreen:text-3xl laptopScreen:text-3xl averageScreen:text-2.5xl xs:text-base text-gray-700  font-bold leading-4 mb-1">
                  <span className="bg-gray-300 text-gray-300 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                    John Lorenz N. Dela Cruz
                  </span>
                </p>
                <p className="mt-3 -mb-2 hdScreen:text-base semihdScreen:text-base laptopScreen:text-base averageScreen:text-base xs:text-xs text-gray-700 leading-4">
                  <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                    delacruz.johnlorenz@sf.edu.ph
                  </span>
                </p>

                <br></br>
                <p className="hdScreen:text-lg semihdScreen:text-base laptopScreen:text-base averageScreen:text-base xs:text-xs text-gray-700 font-medium leading-4 hdScreen:mb-3 semihdScreen:mb-2 laptopScreen:mb-1 averageScreen:mb-0.5">
                  <span className="bg-gray-300 text-gray-300 rounded-md mr-1 relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                    Answered Equations:{' '}
                  </span>
                  <span
                    id="correct"
                    className="font-normal bg-gray-200 text-gray-200 rounded-md"
                  >
                    161
                  </span>
                </p>
                <p className="hdScreen:text-lg semihdScreen:text-base laptopScreen:text-base averageScreen:text-base xs:text-xs text-gray-700 font-medium leading-4 hdScreen:mb-3 semihdScreen:mb-2 laptopScreen:mb-1 averageScreen:mb-0.5">
                  <span className="bg-gray-300 text-gray-300 rounded-md mr-1 relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                    Abandoned Equations:{' '}
                  </span>
                  <span
                    id="incorrect"
                    className="font-normal bg-gray-200 text-gray-200 rounded-md"
                  >
                    259
                  </span>
                </p>
                <p className="hdScreen:text-lg semihdScreen:text-base laptopScreen:text-base averageScreen:text-base xs:text-xs text-gray-700 font-medium leading-4 hdScreen:mb-3 semihdScreen:mb-2 laptopScreen:mb-1 averageScreen:mb-0.5">
                  <span className="bg-gray-300 text-gray-300 rounded-md mr-1 relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
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
              <div className="grid grid-cols-3 text-center mb-2">
                <div>
                  <p className="hdScreen:text-2xl semihdScreen:text-xl laptopScreen:text-xl averageScreen:text-2xl sm:text-xl xs:text-base text-gray-700 font-medium leading-4 mb-5">
                    <span className="bg-gray-300 text-gray-300 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                      Easy
                    </span>
                  </p>
                  <div className="hdScreen:w-32 hdScreen:h-32 semihdScreen:w-[7.5rem] semihdScreen:h-[7.5rem]  laptopScreen:w-[7rem] laptopScreen:h-[7rem] averageScreen:w-[6.5rem] averageScreen:h-[6.5rem] sm:w-24 sm:h-24 bg-gray-300 rounded-full text-center hdScreen:py-12 semihdScreen:py-10 laptopScreen:py-9 averageScreen:py-8  mx-auto relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                    <span className="opacity-0 text-green-100 hdScreen:text-6xl semihdScreen:text-6xl laptopScreen:text-5xl averageScreen:text-5xl sm:text-4xl xs:text-2xl">
                      10
                    </span>
                  </div>
                </div>
                <div>
                  <p className="hdScreen:text-2xl semihdScreen:text-xl laptopScreen:text-xl averageScreen:text-2xl sm:text-xl xs:text-base text-gray-700 font-medium leading-4 mb-5">
                    <span className="bg-gray-300 text-gray-300 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                      Average
                    </span>
                  </p>
                  <div className="hdScreen:w-32 hdScreen:h-32 semihdScreen:w-[7.5rem] semihdScreen:h-[7.5rem]  laptopScreen:w-[7rem] laptopScreen:h-[7rem] averageScreen:w-[6.5rem] averageScreen:h-[6.5rem] sm:w-24 sm:h-24 bg-gray-300  rounded-full text-center hdScreen:py-12 semihdScreen:py-10 laptopScreen:py-9 averageScreen:py-8   mx-auto relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                    <span className="opacity-0 text-yellow-100 hdScreen:text-6xl semihdScreen:text-6xl laptopScreen:text-5xl averageScreen:text-5xl sm:text-4xl xs:text-2xl">
                      10
                    </span>
                  </div>
                </div>
                <div>
                  <p className="hdScreen:text-2xl semihdScreen:text-xl laptopScreen:text-xl averageScreen:text-2xl sm:text-xl xs:text-base text-gray-700 font-medium leading-4 mb-5">
                    <span className="bg-gray-300 text-gray-300 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                      Difficult
                    </span>
                  </p>
                  <div className="hdScreen:w-32 hdScreen:h-32 semihdScreen:w-[7.5rem] semihdScreen:h-[7.5rem]  laptopScreen:w-[7rem] laptopScreen:h-[7rem] averageScreen:w-[6.5rem] averageScreen:h-[6.5rem] sm:w-24 sm:h-24 bg-gray-300  rounded-full text-center hdScreen:py-12 semihdScreen:py-10 laptopScreen:py-9 averageScreen:py-8    mx-auto relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                    <span className="opacity-0 text-red-100 hdScreen:text-6xl semihdScreen:text-6xl laptopScreen:text-5xl averageScreen:text-5xl sm:text-4xl xs:text-2xl">
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
              className="overflow-auto bg-gray-200/80 rounded-md mx-3 mt-2 hdScreen:min-h-[32rem] hdScreen:max-h-[32rem] semihdScreen:min-h-[24rem] semihdScreen:max-h-[24rem] laptopScreen:min-h-[15.7rem] laptopScreen:max-h-[15.7rem] averageScreen:min-h-[14rem] averageScreen:max-h-[14rem] style-2 "
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
