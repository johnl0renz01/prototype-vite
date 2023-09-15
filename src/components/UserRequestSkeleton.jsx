import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

import ViewDetailModal from './ViewDetailModal';

import { BsEye, BsDashCircle, BsCheckCircle } from 'react-icons/bs';

export default function UserRequestSkeleton() {
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

  function sampleRow(subject, from, role, date) {
    return (
      <tr className="odd:bg-gray-100/30 even:bg-gray-200/30 border-b border-gray-200  text-gray-200 relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_.5s_infinite]">
        <td className="hdScreen:w-[320px] semihdScreen:w-[240px] laptopScreen:w-[190px] averageScreen:w-[130px] sm:w-[90px] xs:w-[50px] relative overflow-hidden flex items-center lg:text-base md:text-sm xs:text-xs lg:px-5 py-[10px] whitespace-nowrap">
          <div className="flex-shrink-0  h-10 mr-3 break-all "></div>
          <p className="  lg:text-base md:text-sm xs:text-xs ">
            <span className="bg-gray-200 text-gray-200 rounded-md">
              {subject}
            </span>
          </p>
        </td>
        <td className="lg:text-base md:text-sm xs:text-xs break-all">
          <div>
            <p>
              <span className="bg-gray-200 text-gray-200 rounded-md">
                {from}
              </span>
            </p>
          </div>
        </td>
        <td className="lg:text-base md:text-sm xs:text-xs ">
          <p>
            <span className="bg-gray-200 text-gray-200 rounded-md">{role}</span>
          </p>
        </td>
        <td className="lg:text-base md:text-sm xs:text-xs ">
          <p>
            <span className="bg-gray-200 text-gray-200 rounded-md">{date}</span>
          </p>
        </td>
        <td className="text-right lg:text-base md:text-sm xs:text-xs whitespace-no-wrap ">
          <div className="relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_.5s_infinite]">
            <input
              disabled
              type="button"
              value="View Details"
              className="py-[0.2rem]  md:px-4 md:w-auto xs:w-20 bg-gray-300 text-gray-300  shadow rounded-md font-semibold   lg:text-base"
            ></input>
          </div>
        </td>
        <td className="text-right hdScreen:pr-6 semihdScreen:pr-1 laptopScreen:pr-0.5 averageScreen:pr-0 lg:text-base md:text-sm xs:text-xs">
          <button
            disabled
            className="bg-gray-300  py-[0.2rem]  md:px-3 md:w-auto xs:w-16 shadow-md rounded-md font-semibold  relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_.5s_infinite]"
          >
            <span className="text-gray-300 font-semibold md:pl-3 lg:text-base flex justify-center items-center">
              Solved
              <BsCheckCircle className="md:block xs:hidden ml-4  lg:text-base" />
            </span>
          </button>
        </td>
        <td></td>
      </tr>
    );
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
            <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_.5s_infinite]">
              Request(s)
            </span>
          </div>

          <div className="mt-1.5">
            <div className="overflow-hidden hdScreen:py-1 semihdScreen:py-1 laptopScreen:py-0 averageScreen:py-0 pr-2">
              <div className="inline-flex w-full m-1   rounded-2xl lg:text-lg sm:text-sm xs:text-xs ">
                <div className="md:mr-5 xs:mr-2 text-gray-700 mt-1.5 lg:text-lg sm:text-sm xs:text-xs font-semibold tracking-wide pl-2">
                  <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_.5s_infinite]">
                    There are currently [1] unsolved request.
                  </span>
                </div>
                <div className="grow flex bg-gray-200 shadow  items-center text-left rounded-2xl relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_.5s_infinite]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-4 lg:h-10 lg:w-10 xs:h-5 xs:w-10 lg:scale-80 md-scale:80 sm-scale:60 text-gray-300 bg-gray-300 rounded-full"
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
                    className="bg-gray-200 outline-none ml-2 block w-full lg:text-lg sm:text-sm xs:text-xs  font-normal"
                    type="text"
                    name="searchQuery"
                    id="searchQuery"
                    autoComplete="off"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="md:mt-6 xs:mt-3 rounded-3xl overflow-hidden bg-gradient-to-t from-gray-200 via-gray-100 to-white  ">
            <table className="w-full leading-normal ">
              <thead className="sticky top-0 z-40 shadow-md border-b-2 border-gray-200 bg-gray-200 text-left uppercase tracking-wider lg:text-base md:text-sm xs:text-xs font-bold text-gray-200">
                <tr>
                  <th className="lg:pl-8 w-[19.85%] py-3 lg:text-base md:text-sm sm:text-xs">
                    <div className="lg:pl-0 sm:pl-3  xs:pl-3">Subject</div>
                  </th>
                  <th className="w-[27.25%] py-3 lg:text-base md:text-sm sm:text-xs ">
                    From
                  </th>
                  <th className="w-[12.4%] py-3 lg:text-base md:text-sm sm:text-xs ">
                    Role
                  </th>
                  <th className="w-[19.85%] py-3 lg:text-base md:text-sm sm:text-xs ">
                    Received on
                  </th>
                  <th className="">
                    <input
                      type="button"
                      value="View Details"
                      className="invisible cursor-pointer py-[0.2rem] md:px-4 md:w-auto xs:w-20 text-gray-700 hover:text-white  shadow-md rounded-full font-semibold  transition duration-500 border-gray-400 border-2  hover:bg-gray-500 hover:border-gray-500 lg:text-base"
                    ></input>
                  </th>
                  <th className="">
                    <div className="text-right invisible">
                      <>
                        <button
                          type="button"
                          className="relative py-[0.2rem]  md:px-3 md:w-auto xs:w-16  shadow-md rounded-full font-semibold  transition duration-500 text-white bg-red-500 hover:bg-red-700 drop-shadow-[0_2px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_2px_0px_rgba(0,0,0,0.6)]"
                        >
                          <span className="font-normal md:pl-3 lg:text-base flex justify-center">
                            Solved
                            <BsDashCircle className="md:block xs:hidden ml-1 lg:mt-[0.25rem] lg:text-base" />
                          </span>
                        </button>
                      </>
                    </div>
                  </th>
                  <th className="w-[1.5%]"></th>
                </tr>
              </thead>
            </table>

            <div
              className="hdScreen:min-h-[calc(100vh-40vh)] hdScreen:max-h-[calc(100vh-40vh)] 
                            semihdScreen:min-h-[calc(100vh-45vh)] semihdScreen:max-h-[calc(100vh-45vh)]
                            laptopScreen:min-h-[calc(100vh-43vh)] laptopScreen:max-h-[calc(100vh-43vh)]
                            averageScreen:min-h-[calc(100vh-47.5vh)] averageScreen:max-h-[calc(100vh-47.5vh)]
                            xs:min-h-[calc(100vh-47.5vh)] xs:max-h-[calc(100vh-47.5vh)]
                            bg-white relative overflow-y-scroll style-2 mx-auto w-full rounded-md"
            >
              <div className="">
                <div className="">
                  <div className="inline-block min-w-full rounded-lg ">
                    <table className="min-w-full leading-normal -mt-[28px] relative">
                      <thead className="invisible text-left uppercase tracking-wider font-bold lg:text-base md:text-sm xs:text-xs">
                        <tr>
                          <th className="lg:pl-8 w-[20%]  lg:text-base md:text-sm sm:text-xs  ">
                            Subject
                          </th>
                          <th className="w-[27.5%]   lg:text-base md:text-sm sm:text-xs ">
                            From
                          </th>
                          <th className="w-[12.5%]  lg:text-base md:text-sm sm:text-xs ">
                            Role
                          </th>
                          <th className="w-[20%] lg:text-base md:text-sm sm:text-xs ">
                            Received on
                          </th>
                          <th className=""></th>
                          <th className="w-[10%]"></th>
                          <th className="w-[0.25%]"></th>
                        </tr>
                      </thead>

                      <tbody className="relative ">
                        {sampleRow(
                          'Testing again testing',
                          'delacruz.johnlorenz@sf.edu.ph',
                          'Teacher',
                          'Aug 02, 2023 - 08:03 PM'
                        )}
                        {sampleRow(
                          'Testing again testing',
                          'delacruz.johnlorenz@sf.edu.ph',
                          'Teacher',
                          'Aug 02, 2023 - 08:03 PM'
                        )}
                        {sampleRow(
                          'Testing again testing',
                          'delacruz.johnlorenz@sf.edu.ph',
                          'Teacher',
                          'Aug 02, 2023 - 08:03 PM'
                        )}
                        {sampleRow(
                          'Testing again testing',
                          'delacruz.johnlorenz@sf.edu.ph',
                          'Teacher',
                          'Aug 02, 2023 - 08:03 PM'
                        )}
                        {sampleRow(
                          'Testing again testing',
                          'delacruz.johnlorenz@sf.edu.ph',
                          'Teacher',
                          'Aug 02, 2023 - 08:03 PM'
                        )}
                        {sampleRow(
                          'Testing again testing',
                          'delacruz.johnlorenz@sf.edu.ph',
                          'Teacher',
                          'Aug 02, 2023 - 08:03 PM'
                        )}
                        {sampleRow(
                          'Testing again testing',
                          'delacruz.johnlorenz@sf.edu.ph',
                          'Teacher',
                          'Aug 02, 2023 - 08:03 PM'
                        )}
                        {sampleRow(
                          'Testing again testing',
                          'delacruz.johnlorenz@sf.edu.ph',
                          'Teacher',
                          'Aug 02, 2023 - 08:03 PM'
                        )}
                        {sampleRow(
                          'Testing again testing',
                          'delacruz.johnlorenz@sf.edu.ph',
                          'Teacher',
                          'Aug 02, 2023 - 08:03 PM'
                        )}
                        {sampleRow(
                          'Testing again testing',
                          'delacruz.johnlorenz@sf.edu.ph',
                          'Teacher',
                          'Aug 02, 2023 - 08:03 PM'
                        )}
                        {sampleRow(
                          'Testing again testing',
                          'delacruz.johnlorenz@sf.edu.ph',
                          'Teacher',
                          'Aug 02, 2023 - 08:03 PM'
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
