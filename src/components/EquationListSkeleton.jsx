import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

import { VscEye } from 'react-icons/vsc';
import { BsClipboard2X, BsGearFill } from 'react-icons/bs';

export default function EquationList() {
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

  function equation(string) {
    return (
      <div className="border-b-2 flex justify-center  bg-gray-100/80 py-1 relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_2s_infinite]">
        <p className="mx-4">
          <span className="bg-gray-200 text-gray-200 rounded-md">{string}</span>
        </p>
        <input
          disabled
          className="absolute right-0 mt-0.5 bg-gray-300 mr-1 rounded-full w-6 h-6 "
          title="Remove Equation"
        ></input>
      </div>
    );
  }

  return (
    <>
      <div
        className={`bg-gradient-to-t from-[#e2e2e2] via-[#f1f1f1] to-[#ffffff] h-screen select-none overflow-y-auto 
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
        <section id="container" className="relative mx-auto p-8 w-full">
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
            Equation List
          </div>
          <div className="flex items-center justify-between text-gray-700 mt-1.5 lg:text-lg sm:text-base xs:text-xs font-semibold tracking-wide pl-2 ">
            <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_2s_infinite]">
              The following are current custom equations created. Drag and drop
              the equation to change its difficulty.
            </span>
            <button
              type="button"
              className="relative hdScreen:w-[17rem] semihdScreen:w-[16.5rem] laptopScreen:w-[16rem] averageScreen:w-[20rem] md:w-[20rem] sm:w-[20rem] xs:w-[16rem]  lg:py-2 lg:px-5 sm:py-1.5 sm:px-2.5 xs:px-1 xs:py-1  font-semibold  shadow-md rounded-2xl   bg-gray-300 text-gray-300   overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_2s_infinite]"
            >
              <span className="text-gray-300 md:pl-2 lg:text-xl sm:text-base xs:text-sm flex justify-center">
                Equation Settings
                <BsGearFill className="md:block xs:hidden  lg:ml-2 sm:ml-1 xs:ml-0.5 lg:mt-0.5 sm:mt-1 xs:mt-1 lg:text-2xl" />
              </span>
            </button>
          </div>

          <div
            className="hdScreen:min-h-[calc(100vh-30vh)] hdScreen:max-h-[calc(100vh-30vh)] 
                  semihdScreen:min-h-[calc(100vh-30vh)] semihdScreen:max-h-[calc(100vh-30vh)]
                  laptopScreen:min-h-[calc(100vh-40vh)] laptopScreen:max-h-[calc(100vh-40vh)]
                  averageScreen:min-h-[calc(100vh-45vh)] averageScreen:max-h-[calc(100vh-45vh)]
                  sm:min-h-[calc(100vh-45vh)] sm:max-h-[calc(100vh-45vh)]
                  xs:min-h-[calc(100vh-45vh)] xs:max-h-[calc(100vh-45vh)]
                  bg-gray-200 mt-4 py-1 grid grid-cols-3 text-center lg:text-xl md:text-base sm:text-sm xs:text-xs  w-full  relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_2s_infinite]"
          >
            <div className="">
              <div className="py-1  font-semibold rounded-tl-xl shadow-md">
                <span className="bg-gray-200 text-gray-200 rounded-md">
                  EASY
                </span>
              </div>
              <div className="bg-white pt-0.5 lg:text-base md:text-sm xs:text-xs  h-full style-3 overflow-y-scroll   shadow-md">
                {equation('2x + 3x = 5x')}
                {equation('2x + 3x = 5x')}
                {equation('2x + 3x = 5x')}
                {equation('2x + 3x = 5x')}
                {equation('2x + 3x = 5x')}
                {equation('2x + 3x = 5x')}
                {equation('2x + 3x = 5x')}
                {equation('2x + 3x = 5x')}
                {equation('2x + 3x = 5x')}
                {equation('2x + 3x = 5x')}
                {equation('2x + 3x = 5x')}
                {equation('2x + 3x = 5x')}
                {equation('2x + 3x = 5x')}
                {equation('2x + 3x = 5x')}
                {equation('2x + 3x = 5x')}
                {equation('2x + 3x = 5x')}
                {equation('2x + 3x = 5x')}
                {equation('2x + 3x = 5x')}
                {equation('2x + 3x = 5x')}
                {equation('2x + 3x = 5x')}
                {equation('2x + 3x = 5x')}
              </div>
            </div>
            <div className="">
              <div className="py-1  font-semibold -ml-1.5 shadow-md">
                <span className="bg-gray-200 text-gray-200 rounded-md">
                  AVERAGE
                </span>
              </div>
              <div className="bg-white pt-0.5 h-full lg:text-base md:text-sm xs:text-xs  style-3 overflow-y-scroll    shadow-md">
                {equation('2x + 3x = 5x + 3x')} {equation('2x + 3x = 5x + 3x')}{' '}
                {equation('2x + 3x = 5x + 3x')} {equation('2x + 3x = 5x + 3x')}{' '}
                {equation('2x + 3x = 5x + 3x')} {equation('2x + 3x = 5x + 3x')}{' '}
                {equation('2x + 3x = 5x + 3x')} {equation('2x + 3x = 5x + 3x')}{' '}
                {equation('2x + 3x = 5x + 3x')} {equation('2x + 3x = 5x + 3x')}{' '}
                {equation('2x + 3x = 5x + 3x')} {equation('2x + 3x = 5x + 3x')}{' '}
                {equation('2x + 3x = 5x + 3x')} {equation('2x + 3x = 5x + 3x')}{' '}
                {equation('2x + 3x = 5x + 3x')} {equation('2x + 3x = 5x + 3x')}{' '}
                {equation('2x + 3x = 5x + 3x')} {equation('2x + 3x = 5x + 3x')}{' '}
                {equation('2x + 3x = 5x + 3x')} {equation('2x + 3x = 5x + 3x')}{' '}
                {equation('2x + 3x = 5x + 3x')} {equation('2x + 3x = 5x + 3x')}{' '}
                {equation('2x + 3x = 5x + 3x')} {equation('2x + 3x = 5x + 3x')}
              </div>
            </div>
            <div className="">
              <div className="py-1 font-semibold -ml-1.5 rounded-tr-xl shadow-md">
                <span className="bg-gray-200 text-gray-200 rounded-md">
                  DIFFICULT
                </span>
              </div>
              <div className="bg-white pt-0.5 h-full lg:text-base md:text-sm xs:text-xs  style-3 overflow-y-scroll  shadow-md">
                {equation('2x + 3x = 5x + 3x + 4x + 4x')}
                {equation('2x + 3x = 5x + 3x + 4x + 4x')}
                {equation('2x + 3x = 5x + 3x + 4x + 4x')}
                {equation('2x + 3x = 5x + 3x + 4x + 4x')}
                {equation('2x + 3x = 5x + 3x + 4x + 4x')}
                {equation('2x + 3x = 5x + 3x + 4x + 4x')}
                {equation('2x + 3x = 5x + 3x + 4x + 4x')}
                {equation('2x + 3x = 5x + 3x + 4x + 4x')}
                {equation('2x + 3x = 5x + 3x + 4x + 4x')}
                {equation('2x + 3x = 5x + 3x + 4x + 4x')}
                {equation('2x + 3x = 5x + 3x + 4x + 4x')}
                {equation('2x + 3x = 5x + 3x + 4x + 4x')}
                {equation('2x + 3x = 5x + 3x + 4x + 4x')}
                {equation('2x + 3x = 5x + 3x + 4x + 4x')}
                {equation('2x + 3x = 5x + 3x + 4x + 4x')}
                {equation('2x + 3x = 5x + 3x + 4x + 4x')}
                {equation('2x + 3x = 5x + 3x + 4x + 4x')}
                {equation('2x + 3x = 5x + 3x + 4x + 4x')}
                {equation('2x + 3x = 5x + 3x + 4x + 4x')}
                {equation('2x + 3x = 5x + 3x + 4x + 4x')}
                {equation('2x + 3x = 5x + 3x + 4x + 4x')}
                {equation('2x + 3x = 5x + 3x + 4x + 4x')}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
