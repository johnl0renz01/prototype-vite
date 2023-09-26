import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

import EditSectionModal from './EditSectionModal';

import EquationSolver from './equationSolver';

import { BsGearFill } from 'react-icons/bs';
import { BsTrash3, BsClipboardPlus } from 'react-icons/bs';
import { HiPencilSquare } from 'react-icons/hi2';

export default function ManageSectionSkeleton() {
  useEffect(() => {
    window.addEventListener('focus', setWidth);
  }, []);

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

  function sampleRow(gradelevel, sectionname, teacher, code) {
    return (
      <tr className="odd:bg-gray-100/30 even:bg-gray-200/30 border-b border-gray-200  text-gray-200 relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_2s_infinite]">
        <td className="flex items-center lg:text-base md:text-sm xs:text-xs lg:px-5 py-[10px]  whitespace-no-wrap ">
          <div className="flex-shrink-0  h-10 mr-3 break-all "></div>
          <p className="  lg:text-base md:text-sm xs:text-xs ">
            <span className="bg-gray-200 rounded-md">{gradelevel}</span>
          </p>
        </td>
        <td className="lg:text-base md:text-sm xs:text-xs break-all">
          <div>
            <p>
              <span className="bg-gray-200 rounded-md">{sectionname}</span>
            </p>
          </div>
        </td>
        <td className="lg:text-base md:text-sm xs:text-xs">
          <p>
            <span className="bg-gray-200 rounded-md">{teacher}</span>
          </p>
        </td>
        <td className="lg:text-base md:text-sm xs:text-xs">
          <p>
            <span className="bg-gray-200 rounded-md">{code}</span>
          </p>
        </td>
        <td className="text-right lg:text-base md:text-sm xs:text-xs">
          <div className="relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_2s_infinite]">
            <input
              disabled
              value="Edit"
              type="submit"
              className="bg-gray-300 text-gray-300 py-[0.2rem] md:pl-4 md:pr-[2.15rem] md:w-24 xs:w-14  shadow-md rounded-md font-normal  "
            ></input>
            <span className="md:block xs:hidden opacity-0 absolute top-[0.25rem] right-5 font-normal text-base flex justify-center">
              <HiPencilSquare className="ml-1 lg:mt-[0.2rem] lg:text-lg text-white" />
            </span>
          </div>
        </td>
        <td className="text-right hdScreen:pr-6 semihdScreen:pr-1 laptopScreen:pr-0.5 averageScreen:pr-0 lg:text-base md:text-sm xs:text-xs">
          <div className="relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_2s_infinite] ">
            <input
              disabled
              type="submit"
              className="bg-gray-300 text-gray-300 py-[0.2rem]  md:pl-4 md:pr-[2.15rem] md:w-24 xs:w-14 shadow-md rounded-md font-semibold  "
            ></input>
            <span className="md:block xs:hidden opacity-0 absolute top-[0.25rem] right-3 font-normal flex justify-center">
              <BsTrash3 className="ml-1 lg:mt-[0.2rem] lg:text-base text-white" />
            </span>
          </div>
        </td>
        <td></td>
      </tr>
    );
  }

  return (
    <>
      <div
        className={`bg-gradient-to-t from-[#e2e2e2] via-[#f1f1f1] to-[#ffffff] h-screen z-10 select-none   overflow-y-auto
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
            Sections
          </div>

          <div className="mt-1.5">
            <div className="overflow-hidden hdScreen:py-1 semihdScreen:py-1 laptopScreen:py-0 averageScreen:py-0 pr-2">
              <div className="inline-flex w-full m-1   rounded-2xl lg:text-lg sm:text-sm xs:text-xs ">
                <div className="grow mr-5 flex bg-gray-200 shadow py-1 items-center text-left rounded-2xl relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_2s_infinite]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-4 lg:h-10 lg:w-10  xs:h-5 xs:w-10  lg:scale-100 md-scale:80 sm-scale:60 text-gray-300 bg-gray-300 rounded-full"
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
                    className="bg-gray-200  outline-none ml-2 block w-full lg:text-lg sm:text-sm xs:text-xs  font-normal"
                    type="text"
                    name="searchQuery"
                    id="searchQuery"
                    autoComplete="off"
                    disabled
                  />
                </div>
                <button
                  disabled
                  type="button"
                  className="bg-gray-300 text-gray-300 hdScreen:w-[19rem] semihdScreen:w-[16.5rem] laptopScreen:w-[15.5rem] averageScreen:w-[15rem] md:w-[14rem] sm:w-[10rem] xs:w-[8rem] lg:py-3 lg:px-5 sm:py-1.5 sm:px-2.5 xs:px-1 xs:py-1 font-semibold  shadow rounded-2xl relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_2s_infinite]"
                >
                  <span className="md:pl-2 text-gray-300 lg:text-xl sm:text-base xs:text-sm flex justify-center">
                    Add Section
                    <BsClipboardPlus className="md:block xs:hidden lg:ml-2 sm:ml-1 xs:ml-0.5 lg:mt-0.5 sm:mt-1 xs:mt-1 lg:text-2xl" />
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="md:mt-6 xs:mt-3 rounded-3xl overflow-hidden bg-gradient-to-t from-gray-200 via-gray-100 to-white  ">
            <table className="w-full leading-normal ">
              <thead className=" top-0 z-40 shadow-md border-b-2 border-gray-200/0 bg-gray-200 text-gray-200 text-left uppercase tracking-wider lg:text-base md:text-sm xs:text-xs font-bold relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_2s_infinite]">
                <tr>
                  <th className="lg:pl-8 w-[17.25%] py-3 lg:text-base md:text-sm sm:text-xs">
                    <div className="lg:pl-0 sm:pl-3  xs:pl-3">Grade Level</div>
                  </th>
                  <th className="w-[19.85%] py-3 lg:text-base md:text-sm sm:text-xs ">
                    Section Name
                  </th>
                  <th className="w-[25%] py-3 lg:text-base md:text-sm sm:text-xs ">
                    Assigned Teacher
                  </th>
                  <th className="w-[26%] py-3 lg:text-base md:text-sm sm:text-xs ">
                    Reset Code
                  </th>
                  <th className="w-[5%]">
                    <div className="invisible">
                      <input
                        type="submit"
                        value="Edit"
                        className="cursor-pointer py-[0.2rem] md:pl-4 md:pr-[2.15rem] md:w-24 xs:w-14   shadow-md rounded-md font-normal  transition duration-300 text-white bg-blue-500/90 hover:bg-blue-600 lg:text-base drop-shadow-[0_2px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_2px_0px_rgba(0,0,0,0.6)]"
                      ></input>
                      <span className="md:block xs:hidden absolute top-[0.25rem] right-5 font-normal text-base flex justify-center">
                        <HiPencilSquare className="ml-1 lg:mt-[0.2rem] lg:text-lg text-white" />
                      </span>
                    </div>
                  </th>
                  <th className="w-[11%]">
                    <div className="invisible ">
                      <input
                        type="submit"
                        value="Delete"
                        className=" cursor-pointer py-[0.2rem]  md:pl-4 md:pr-[2.15rem] md:w-24 xs:w-14 shadow-md rounded-md font-semibold  transition duration-500 text-white bg-red-500 hover:bg-red-700 drop-shadow-[0_2px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_2px_0px_rgba(0,0,0,0.6)]"
                      ></input>
                      <span className="md:block xs:hidden absolute top-[0.25rem] right-3 font-normal flex justify-center">
                        <BsTrash3 className="ml-1 lg:mt-[0.2rem] lg:text-base text-white" />
                      </span>
                    </div>
                  </th>
                  <th className="w-[1%] "></th>
                </tr>
              </thead>
            </table>

            <div
              className="hdScreen:min-h-[calc(100vh-40vh)] hdScreen:max-h-[calc(100vh-40vh)] 
                            semihdScreen:min-h-[calc(100vh-45vh)] semihdScreen:max-h-[calc(100vh-45vh)]
                            laptopScreen:min-h-[calc(100vh-52.5vh)] laptopScreen:max-h-[calc(100vh-52.5vh)]
                            averageScreen:min-h-[calc(100vh-55vh)] averageScreen:max-h-[calc(100vh-55vh)]
                            xs:min-h-[calc(100vh-55vh)] xs:max-h-[calc(100vh-55vh)]
                            bg-white relative overflow-y-scroll style-2 mx-auto w-full rounded-md"
            >
              <div className="overflow-hidden">
                <div className="">
                  <div className="inline-block min-w-full rounded-lg ">
                    <table className="min-w-full leading-normal -mt-[28px]">
                      <thead className="invisible text-left uppercase tracking-wider font-bold lg:text-base md:text-sm xs:text-xs">
                        <tr>
                          <th className="lg:pl-8 w-[17.25%]  lg:text-base md:text-sm sm:text-xs  ">
                            Grade Level
                          </th>
                          <th className="w-[20%]   lg:text-base md:text-sm sm:text-xs ">
                            Section Name
                          </th>
                          <th className="w-[25%] lg:text-base md:text-sm sm:text-xs ">
                            Assigned Teacher
                          </th>
                          <th className="w-[22%]  lg:text-base md:text-sm sm:text-xs ">
                            Reset Code
                          </th>
                          <th className="hdScreen:w-[7.5%] lg:w-[5%] "></th>
                          <th className="hdScreen:w-[9%] lg:w-[10%] "></th>
                          <th className="hdScreen:w-[0.5%] lg:w-[1%]"></th>
                        </tr>
                      </thead>

                      <tbody className=" ">
                        {sampleRow(
                          'Grade 7',
                          'Batumbakalan',
                          'John Lorenz Dela Cruz',
                          'QQQQQQQQ'
                        )}
                        {sampleRow(
                          'Grade 7',
                          'Batumbakalan',
                          'John Lorenz Dela Cruz',
                          'QQQQQQQQ'
                        )}
                        {sampleRow(
                          'Grade 7',
                          'Batumbakalan',
                          'John Lorenz Dela Cruz',
                          'QQQQQQQQ'
                        )}
                        {sampleRow(
                          'Grade 7',
                          'Batumbakalan',
                          'John Lorenz Dela Cruz',
                          'QQQQQQQQ'
                        )}
                        {sampleRow(
                          'Grade 7',
                          'Batumbakalan',
                          'John Lorenz Dela Cruz',
                          'QQQQQQQQ'
                        )}
                        {sampleRow(
                          'Grade 7',
                          'Batumbakalan',
                          'John Lorenz Dela Cruz',
                          'QQQQQQQQ'
                        )}
                        {sampleRow(
                          'Grade 7',
                          'Batumbakalan',
                          'John Lorenz Dela Cruz',
                          'QQQQQQQQ'
                        )}
                        {sampleRow(
                          'Grade 7',
                          'Batumbakalan',
                          'John Lorenz Dela Cruz',
                          'QQQQQQQQ'
                        )}
                        {sampleRow(
                          'Grade 7',
                          'Batumbakalan',
                          'John Lorenz Dela Cruz',
                          'QQQQQQQQ'
                        )}
                        {sampleRow(
                          'Grade 7',
                          'Batumbakalan',
                          'John Lorenz Dela Cruz',
                          'QQQQQQQQ'
                        )}
                        {sampleRow(
                          'Grade 7',
                          'Batumbakalan',
                          'John Lorenz Dela Cruz',
                          'QQQQQQQQ'
                        )}
                        {sampleRow(
                          'Grade 7',
                          'Batumbakalan',
                          'John Lorenz Dela Cruz',
                          'QQQQQQQQ'
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
