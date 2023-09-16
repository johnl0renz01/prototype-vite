import React, { Component } from 'react';
import { json, useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

import { BsFillPersonVcardFill } from 'react-icons/bs';
import { BsJournalText } from 'react-icons/bs';
import { BsJournalPlus } from 'react-icons/bs';
import { BsQuestionCircle } from 'react-icons/bs';
import { BsDoorOpen, BsTelephone } from 'react-icons/bs';
import { TfiShiftLeft } from 'react-icons/tfi';

export default function TeacherNavbarSkeleton() {
  const navigate = useNavigate();

  return (
    <>
      <div className={`overflow-y-auto`}>
        <div className="sm:flex xs:hidden lg:flex flex-col  text-gray-300/0 text-center  h-screen fixed z-[100] overflow-hidden bg-gray-200  before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50 before:animate-[shimmer_2s_infinite]">
          <div className="">
            <ul className="text-xs">
              <li
                id="logo"
                className=" border-b-2 pt-4 bg-gray-300/30 border-black/5 mx-auto"
              >
                <i
                  className={`bg-gray-300 rounded-md fas fa-graduation-cap  lg:text-6xl xs:text-3xl mb-4`}
                ></i>
              </li>
              <li className="bg-gray-300/30 border-b-2 border-black/5 hdScreen:pb-1 hdScreen:pt-2 semihdScreen:pb-1 semihdScreen:pt-2 laptopScreen:pb-[0.2rem] laptopScreen:pt-1.5 averageScreen:pb-[0.18rem] averageScreen:pt-1.5 sm:pb-0.5 sm:pt-1 xs:pb-[0.1rem] xs:pt-0.5">
                <div className="relative text-center font-bold">
                  <BsFillPersonVcardFill className="bg-gray-300 rounded-full hdScreen:text-[2.2rem] semihdScreen:text-[2rem] laptopScreen:text-[1.6rem] averageScreen:text-[1.5rem] mx-auto " />
                  <span
                    className={`bg-gray-300 text-gray-300 rounded-md lg:text-base xs:text-xs font-poppins font-semibold lg:mx-4 xs:mx-2
                    `}
                  >
                    Report Cards
                  </span>
                </div>
              </li>
              <li className="bg-gray-300/30 border-b-2 border-black/5 hdScreen:pb-1 hdScreen:pt-2 semihdScreen:pb-1 semihdScreen:pt-2 laptopScreen:pb-[0.2rem] laptopScreen:pt-1.5 averageScreen:pb-[0.18rem] averageScreen:pt-1.5 sm:pb-0.5 sm:pt-1 xs:pb-[0.1rem] xs:pt-0.5">
                <div className="relative text-center  font-bold ">
                  <BsJournalText className="bg-gray-300 rounded-full hdScreen:text-[2.2rem] semihdScreen:text-[2rem] laptopScreen:text-[1.6rem] averageScreen:text-[1.5rem] mx-auto " />
                  <span
                    className={`bg-gray-300 text-gray-300 rounded-md lg:text-base xs:text-xs font-poppins font-semibold xs:mx-2  `}
                  >
                    Equation List
                  </span>
                </div>
              </li>
              <li className="bg-gray-300/30 border-b-2 border-black/5 hdScreen:pb-1 hdScreen:pt-3 semihdScreen:pb-1 semihdScreen:pt-3 laptopScreen:pb-[0.2rem] laptopScreen:pt-1.5 averageScreen:pb-[0.18rem] averageScreen:pt-1.5 sm:pb-0.5 sm:pt-1 xs:pb-[0.1rem] xs:pt-0.5">
                <div className="relative text-center  font-bold ">
                  <BsJournalPlus className="bg-gray-300 rounded-full hdScreen:text-[2.2rem] semihdScreen:text-[2rem] laptopScreen:text-[1.6rem] averageScreen:text-[1.5rem] mx-auto " />
                  <span
                    className={`bg-gray-300 text-gray-300 rounded-md lg:text-base xs:text-xs font-poppins font-semibold xs:mx-2 `}
                  >
                    Create Equation
                  </span>
                </div>
              </li>
              <li className="bg-gray-300/30 border-b-2 border-black/5 hdScreen:pb-1 hdScreen:pt-3 semihdScreen:pb-1 semihdScreen:pt-3 laptopScreen:pb-[0.2rem] laptopScreen:pt-1.5 averageScreen:pb-[0.18rem] averageScreen:pt-1.5 sm:pb-0.5 sm:pt-1 xs:pb-[0.1rem] xs:pt-0.5">
                <div className="relative text-center  font-bold">
                  <BsQuestionCircle className="bg-gray-300 rounded-full hdScreen:text-[2.2rem] semihdScreen:text-[2rem] laptopScreen:text-[1.6rem] averageScreen:text-[1.5rem] mx-auto " />
                  <span
                    className={`bg-gray-300 text-gray-300 rounded-md lg:text-base xs:text-xs font-poppins font-semibold xs:mx-2  `}
                  >
                    Help
                  </span>
                </div>
              </li>
              <li className="bg-gray-300/30 border-b-2 border-black/5 hdScreen:pb-1 hdScreen:pt-3 semihdScreen:pb-1 semihdScreen:pt-3 laptopScreen:pb-[0.2rem] laptopScreen:pt-1.5 averageScreen:pb-[0.18rem] averageScreen:pt-1.5 sm:pb-0.5 sm:pt-1 xs:pb-[0.1rem] xs:pt-0.5">
                <div className="relative text-center  font-bold">
                  <BsTelephone className="bg-gray-300 rounded-full hdScreen:text-[1.8rem] semihdScreen:text-[1.7rem] laptopScreen:text-[1.4rem] averageScreen:text-[1.3rem] mx-auto " />
                  <span
                    className={`bg-gray-300 text-gray-300 rounded-md lg:text-base xs:text-xs font-poppins font-semibold xs:mx-2  `}
                  >
                    Contact Admin
                  </span>
                </div>
              </li>
              <li className="bg-gray-300/30 border-b-2 border-black/5 hdScreen:pb-1 hdScreen:pt-3 semihdScreen:pb-1 semihdScreen:pt-3 laptopScreen:pb-[0.2rem] laptopScreen:pt-1.5 averageScreen:pb-[0.18rem] averageScreen:pt-1.5 sm:pb-0.5 sm:pt-1 xs:pb-[0.1rem] xs:pt-0.5">
                <div className="relative text-center  font-bold">
                  <BsDoorOpen className="bg-gray-300 rounded-full hdScreen:text-[2.2rem] semihdScreen:text-[2rem] laptopScreen:text-[1.6rem] averageScreen:text-[1.5rem] mx-auto " />
                  <span
                    className={`bg-gray-300 text-gray-300 rounded-md lg:text-base xs:text-xs font-poppins font-semibold xs:mx-2  `}
                  >
                    Log-out
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex mt-auto justify-center">
            <div className="">
              <div
                className={`relative text-center font-bold transition duration-200`}
              >
                <TfiShiftLeft className="hdScreen:text-[2.2rem] semihdScreen:text-[2rem] laptopScreen:text-[1.6rem] averageScreen:text-[1.5rem] mx-auto " />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
