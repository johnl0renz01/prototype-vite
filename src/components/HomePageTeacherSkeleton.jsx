import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

export default function HomePageTeacherSkeleton() {
  const [accessReportCard, setAccessReportCard] = useState(false);

  const [navbarWidth, setNavbarWidth] = useState(0);
  const [logoHeight, setLogoHeight] = useState(0);

  useEffect(() => {
    const data = window.localStorage.getItem('CURRENT_SECTION');
    if (data !== null) setAccessReportCard(true);

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

  return (
    <>
      <div
        className={`select-none bg-gradient-to-t from-[#e2e2e2] via-[#f1f1f1] to-[#ffffff] h-screen z-10 overflow-y-auto 
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
        <section className="relative mx-auto p-8 w-full ">
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
            <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_2s_infinite]">
              Overview
            </span>
          </div>
          <div className="py-1.5"></div>
          <div className="grid grid-cols-2 grid-rows-2 gap-6 text-center">
            <div
              className={`overflow-hidden h-[calc(100vh-67.5vh)]  grid-rows-2 shadow-sm border-3 rounded-lg bg-gray-200  transition duration-200 relative before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_2s_infinite]
              ${accessReportCard ? 'grid' : 'hidden'}`}
            >
              <div className="relative flex text-lime-600">
                <div className="flex mx-auto mt-auto hdScreen:-mb-8 semihdScreen:-mb-4 laptopScreen:-mb-2 averageScreen:-mb-0 xs:-mb-0">
                  <div className="bg-gray-300 rounded-md overflow-hidden relative before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_2s_infinite]">
                    <img
                      className="opacity-0  hdScreen:h-[105px] semihdScreen:h-[95px] laptopScreen:h-[85px] averageScreen:h-[80px] sm:h-[50px] xs:h-[40px] w-full"
                      src={require('../assets/images/home_teacher/ReportCards.png')}
                    ></img>
                  </div>
                </div>
              </div>
              <div className="hdScreen:pt-16 semihdScreen:pt-10 laptopScreen:pt-8 averageScreen:pt-6 xs:pt-2">
                <span className="bg-gray-300 text-gray-300 rounded-md font-semibold hdScreen:text-lg semihdScreen:text-lg laptopScreen:text-base averageScreen:text-base xs:text-sm ">
                  Report Cards
                </span>
                <p className="hdScreen:text-base semihdScreen:text-base laptopScreen:text-sm averageScreen:text-sm xs:text-xs">
                  <span className="bg-gray-300 text-gray-300 rounded-md">
                    Check the students' performance.
                  </span>
                </p>
              </div>
            </div>
            <div className="overflow-hidden h-[calc(100vh-67.5vh)] grid grid-rows-2 shadow-sm border-3 rounded-lg bg-gray-200  transition duration-200  relative before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_2s_infinite]">
              <div className="relative flex text-lime-600">
                <div className="flex mx-auto mt-auto hdScreen:-mb-8 semihdScreen:-mb-4 laptopScreen:-mb-2 averageScreen:-mb-0 xs:-mb-0">
                  <div className="bg-gray-300 rounded-md overflow-hidden relative before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_2s_infinite]">
                    <img
                      className="opacity-0 hdScreen:h-[105px] semihdScreen:h-[95px] laptopScreen:h-[85px] averageScreen:h-[80px] sm:h-[50px] xs:h-[40px] w-full"
                      src={require('../assets/images/home_teacher/EquationList.png')}
                    ></img>
                  </div>
                </div>
              </div>
              <div className="hdScreen:pt-16 semihdScreen:pt-10 laptopScreen:pt-8 averageScreen:pt-6 xs:pt-2">
                <span className="bg-gray-300 text-gray-300 rounded-md font-semibold hdScreen:text-lg semihdScreen:text-lg laptopScreen:text-base averageScreen:text-base xs:text-sm ">
                  Equation List
                </span>
                <p className="hdScreen:text-base semihdScreen:text-base laptopScreen:text-sm averageScreen:text-sm xs:text-xs">
                  <span className="bg-gray-300 text-gray-300 rounded-md">
                    List of created equations.
                  </span>
                </p>
              </div>
            </div>
            <div className="overflow-hidden h-[calc(100vh-67.5vh)] grid grid-rows-2 shadow-sm border-3 border-b-2 rounded-lg bg-gray-200  transition duration-200  relative before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_2s_infinite]">
              <div className="relative flex text-lime-600">
                <div className="flex mx-auto mt-auto hdScreen:-mb-8 semihdScreen:-mb-4 laptopScreen:-mb-2 averageScreen:-mb-0 xs:-mb-0">
                  <div className="bg-gray-300 rounded-md overflow-hidden relative before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_2s_infinite]">
                    <img
                      className="opacity-0 hdScreen:h-[105px] semihdScreen:h-[95px] laptopScreen:h-[85px] averageScreen:h-[80px] sm:h-[50px] xs:h-[40px] w-full"
                      src={require('../assets/images/home_teacher/CreateEquation.png')}
                    ></img>
                  </div>
                </div>
              </div>
              <div className="hdScreen:pt-16 semihdScreen:pt-10 laptopScreen:pt-8 averageScreen:pt-6 xs:pt-2">
                <span className="bg-gray-300 text-gray-300 rounded-md font-semibold hdScreen:text-lg semihdScreen:text-lg laptopScreen:text-base averageScreen:text-base xs:text-sm ">
                  Create Equation
                </span>
                <p className="hdScreen:text-base semihdScreen:text-base laptopScreen:text-sm averageScreen:text-sm xs:text-xs">
                  <span className="bg-gray-300 text-gray-300 rounded-md">
                    Formulate an equation for students.
                  </span>
                </p>
              </div>
            </div>
            <div className="overflow-hidden h-[calc(100vh-67.5vh)] grid grid-rows-2 shadow-sm border-3 rounded-lg bg-gray-200  transition duration-200  relative before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_2s_infinite]">
              <div className="  relative flex text-lime-600">
                <div className="flex mx-auto mt-auto hdScreen:-mb-8 semihdScreen:-mb-4 laptopScreen:-mb-2 averageScreen:-mb-0 xs:-mb-0">
                  <div className="bg-gray-300 rounded-md overflow-hidden relative before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_2s_infinite]">
                    <img
                      className="opacity-0 hdScreen:h-[105px] semihdScreen:h-[95px] laptopScreen:h-[85px] averageScreen:h-[80px] sm:h-[50px] xs:h-[40px] w-full"
                      src={require('../assets/images/home_teacher/HelpTeacher.png')}
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
