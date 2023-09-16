import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

import { BsCaretUpFill, BsStickies } from 'react-icons/bs';
import { VscEye } from 'react-icons/vsc';

import ChangeSectionModal from './ChangeSectionModal';

export default function ClassListSkeleton() {
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

  function sampleRow(name, gender, grouptype) {
    return (
      <tr className="odd:bg-gray-100/30 even:bg-gray-200/30 border-b border-gray-200  text-gray-200 relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_2s_infinite]">
        <td className="flex items-center lg:text-base md:text-sm xs:text-xs  pl-5 py-[10px]  whitespace-no-wrap ">
          <div className="flex-shrink-0 w-10 h-10 mr-3">
            <div className="bg-gray-200 rounded-full">
              <img
                className="opacity-0 border-2 border-gray-300 rounded-full"
                src={require('../assets/avatar/avatar-male.png')}
                alt=""
              />
            </div>
          </div>
          <p className="lg:pl-2 lg:text-base md:text-sm xs:text-xs  ">
            <span className="bg-gray-200 rounded-md">{name}</span>
          </p>
        </td>

        <td className="lg:text-base md:text-sm xs:text-xs  ">
          <p>
            <span className="bg-gray-200 rounded-md">{gender}</span>
          </p>
        </td>
        <td className="lg:text-base md:text-sm xs:text-xs ">
          <p>
            <span className="bg-gray-200 rounded-md">{grouptype}</span>
          </p>
        </td>
        <td className="lg:pr-10 text-right lg:text-base md:text-sm xs:text-xs ">
          <a>
            <button
              disabled
              className="lg:text-base md:text-sm xs:text-xs  md:w-36 sm:w-28 xs:w-20 text-gray-300 bg-gray-300  py-2 rounded-xl shadow relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_2s_infinite]"
            >
              <p className="md:pr-2">See details</p>
              <VscEye className="md:block xs:hidden opacity-0 absolute md:right-3 xs:right-1 top-1/3" />
            </button>
          </a>
        </td>
      </tr>
    );
  }

  return (
    <>
      <div
        className={` bg-gradient-to-t from-[#e2e2e2] via-[#f1f1f1] to-[#ffffff] h-screen z-10 select-none overflow-y-auto
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
            className={` md:-mt-0 xs:-mt-1 border-b-2 text-gray-600 lg:text-4xl font-bold
            ${
              logoHeight == 94.5
                ? 'max-h-[94.5px]'
                : logoHeight == 67.5
                ? 'max-h-[67.5px]'
                : ''
            }`}
          >
            <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_2s_infinite]">
              7 - Aguinaldo
            </span>
          </div>
          <div className="mt-1.5">
            <div className="overflow-hidden hdScreen:py-1 semihdScreen:py-1 laptopScreen:py-0 averageScreen:py-0 pr-2">
              <div className="inline-flex w-full m-1   rounded-2xl lg:text-lg xs:text-xs ">
                <div className="grow mr-5 flex bg-gray-200 shadow py-1 items-center text-left rounded-2xl relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_2s_infinite]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-4 lg:h-10 lg:w-10 xs:h-5 xs:w-10 lg:scale-100 md-scale:80 sm-scale:60 text-gray-300 bg-gray-300 rounded-full "
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    disabled
                    className="bg-gray-200 text-gray-200 outline-none ml-3 block w-full "
                    type="text"
                    name="searchQuery"
                    id="searchQuery"
                    autoComplete="off"
                  />
                </div>
                <button
                  disabled
                  type="button"
                  className="bg-gray-300  hdScreen:w-[14.5rem] semihdScreen:w-[14.5rem] laptopScreen:w-[14.5rem] averageScreen:w-[14.5rem] hdScreen:py-3 semihdScreen:py-2 laptopScreen:py-0 averageScreen:py-0 lg:px-5 sm:py-1.5 sm:px-2.5 xs:px-1 xs:py-1 text-white font-semibold  shadow rounded-2xl relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_2s_infinite] "
                >
                  <span className="md:pl-2 text-gray-300 hdScreen:text-xl semihdScreen:text-xl laptopScreen:text-lg averageScreen:text-lg sm:text-base xs:text-sm flex justify-center items-center">
                    Change Section
                    <BsStickies className="md:block xs:hidden opacity-0 lg:ml-2 sm:ml-1 xs:ml-0.5  lg:text-xl sm:text-sm xs:text-xs rotate-[180deg] -scale-x-100 " />
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="hdScreen:mt-6 semihdScreen:mt-5 laptopScreen:mt-3 averageScreen:mt-2 xs:mt-3 rounded-3xl overflow-hidden ">
            <table className="w-full leading-normal ">
              <thead className=" top-0 z-40 shadow border-b-2 border-gray-200/0 bg-gray-200 text-left uppercase tracking-wider lg:text-base md:text-sm xs:text-xs  font-bold text-gray-200 relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_2s_infinite]">
                <tr>
                  <th className="lg:pl-20 w-[32.5%] py-3 ">Student Name</th>

                  <th className="w-[22%] py-3 ">Gender</th>
                  <th className="lg:py-3 ">Group Type</th>
                  <th className="lg:pl-[200px] md:pl-[110px] xs:pl-[80px] md py-3 select-none "></th>
                </tr>
              </thead>
            </table>
            <div
              className="hdScreen:min-h-[calc(100vh-40vh)] hdScreen:max-h-[calc(100vh-40vh)] 
                            semihdScreen:min-h-[calc(100vh-45vh)] semihdScreen:max-h-[calc(100vh-45vh)]
                            laptopScreen:min-h-[calc(100vh-43vh)] laptopScreen:max-h-[calc(100vh-43vh)]
                            averageScreen:min-h-[calc(100vh-50vh)] averageScreen:max-h-[calc(100vh-50vh)]
                            xs:min-h-[calc(100vh-50vh)] xs:max-h-[calc(100vh-50vh)]
                            bg-white relative overflow-y-scroll style-2 mx-auto w-full rounded-md "
            >
              <div className="overflow-hidden">
                <div className="">
                  <div className="inline-block min-w-full shadow rounded-lg ">
                    <table className="min-w-full leading-normal -mt-[28px]">
                      <thead className="invisible lg:text-base md:text-sm xs:text-xs ">
                        <tr>
                          <th className="lg:pl-20 w-[32.75%]">Student Name</th>

                          <th className="w-[22.2%] ">Gender</th>
                          <th className="">Group Type</th>
                          <th className="lg:pl-16 select-none "></th>
                        </tr>
                      </thead>
                      <tbody className="">
                        {sampleRow(
                          'John Lorenz N. Dela Cruz',
                          'Male',
                          'Facial Group'
                        )}
                        {sampleRow(
                          'John Lorenz N. Dela Cruz',
                          'Female',
                          'Non Facial Group'
                        )}
                        {sampleRow(
                          'John Lorenz N. Dela Cruz',
                          'Male',
                          'Facial Group'
                        )}
                        {sampleRow(
                          'John Lorenz N. Dela Cruz',
                          'Female',
                          'Non Facial Group'
                        )}
                        {sampleRow(
                          'John Lorenz N. Dela Cruz',
                          'Male',
                          'Facial Group'
                        )}
                        {sampleRow(
                          'John Lorenz N. Dela Cruz',
                          'Female',
                          'Non Facial Group'
                        )}
                        {sampleRow(
                          'John Lorenz N. Dela Cruz',
                          'Male',
                          'Facial Group'
                        )}
                        {sampleRow(
                          'John Lorenz N. Dela Cruz',
                          'Female',
                          'Non Facial Group'
                        )}
                        {sampleRow(
                          'John Lorenz N. Dela Cruz',
                          'Male',
                          'Facial Group'
                        )}
                        {sampleRow(
                          'John Lorenz N. Dela Cruz',
                          'Male',
                          'Facial Group'
                        )}
                        {sampleRow(
                          'John Lorenz N. Dela Cruz',
                          'Male',
                          'Facial Group'
                        )}
                      </tbody>
                    </table>
                    <div className="w-full bg-white"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
