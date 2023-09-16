import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

import EquationSolver from './equationSolver';

import { VscCheckAll, VscPassFilled } from 'react-icons/vsc';

import { BsXCircleFill } from 'react-icons/bs';
import { BsArrowCounterclockwise } from 'react-icons/bs';

import { GoChecklist } from 'react-icons/go';
import { HiPlusSmall } from 'react-icons/hi2';
import CreateEquationMessageModal from './CreateEquationMessageModal';

export default function CreateEquationSkeleton() {
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

  return (
    <>
      <div
        className={`bg-gradient-to-t from-[#e2e2e2] via-[#f1f1f1] to-[#ffffff] h-full z-10 select-none overflow-y-auto
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
        <div
          className={`bg-gradient-to-t from-[#e2e2e2] via-[#f1f1f1] to-[#ffffff] h-screen `}
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
              Create Equation
            </div>
            <div
              className={`absolute invisible left-0 right-0 top-0 bottom-0 w-full flex flex-col justify-center items-center bg-gradient-to-t from-[#e2e2e2] via-[#f1f1f1] to-[#ffffff] h-screen z-50 
                `}
            >
              <div className="lg:text-4xl sm:text-2xl font-bold text-center">
                <div className="mb-5 select-none">
                  Equation Successfully Added
                </div>
              </div>

              <div className="p-1  rounded-xl lg:text-2xl  grid place-items-center text-gray-400 select-none">
                <h1 className="select-none">
                  (Move to the equation list tab to see.)
                </h1>
              </div>
            </div>
            <div
              id="create_question"
              className="flex flex-col 
              hdScreen:min-h-[calc(100vh-12.5vh)] hdScreen:max-h-[calc(100vh-12.5vh)]  
              semihdScreen:min-h-[calc(100vh-17.5vh)] semihdScreen:max-h-[calc(100vh-17.5vh)]  
              laptopScreen:min-h-[calc(100vh-22.5vh)] laptopScreen:max-h-[calc(100vh-22.5vh)]  
              averageScreen:min-h-[calc(100vh-27.5vh)] averageScreen:max-h-[calc(100vh-27.5vh)] 
              xs:min-h-[calc(100vh-27.5vh)] xs:max-h-[calc(100vh-27.5vh)] 
              
              lg:text-lg xs:text-sm p-4 text-gray-700"
            >
              <div className="font-semibold">
                <span className="bg-gray-200 text-gray-200 rounded-md">
                  Enter the equation:
                </span>
              </div>
              <div className="flex mt-0.5">
                <input
                  autoComplete="off"
                  name="input"
                  type="text"
                  disabled
                  className="w-full grow  p-1 px-2 border-2 rounded-md bg-gray-200  shadow"
                ></input>
                <button
                  className={`ml-6 cursor-default bg-gray-300 text-gray-300  py-1.5 lg:w-36 px-4 shadow rounded-md  
                    `}
                >
                  <span className=" pl-1 lg:text-xl xs:text-xs flex justify-center items-center">
                    Validate
                    <GoChecklist className="opacity-0 ml-2 lg:text-2xl" />
                  </span>
                </button>
              </div>
              <div className="text-gray-500 lg:text-lg xs:text-xs mt-1">
                <span className="bg-gray-200 text-gray-200">
                  (Click "Validate" to check if the equation could be solved by
                  the algorithm.)
                </span>
              </div>
              <div className="flex  mt-auto justify-end pt-4">
                <button
                  className={`cursor-default text-gray-300 bg-gray-300 ml-6 py-1.5 pb-2 px-4 shadow-md rounded-md
                `}
                >
                  <span className="pl-1 lg:text-xl xs:text-sm flex justify-center items-center">
                    Reset
                    <BsArrowCounterclockwise className="ml-2  lg:text-xl xs:text-xs -rotate-45" />
                  </span>
                </button>
                <button
                  className={` cursor-default text-gray-300 bg-gray-300 ml-6 py-1.5 pb-2 px-3 shadow rounded-md
                `}
                >
                  <span className="pl-2 lg:text-xl xs:text-sm flex justify-center items-center">
                    Add Equation
                    <HiPlusSmall className="ml-1  lg:text-2xl xs:text-base" />
                  </span>
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
