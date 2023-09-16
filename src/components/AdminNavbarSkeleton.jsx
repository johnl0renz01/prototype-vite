import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

import { BsPersonExclamation } from 'react-icons/bs';

import { BsReceiptCutoff } from 'react-icons/bs';
import { BsPeople } from 'react-icons/bs';
import { BsPersonAdd } from 'react-icons/bs';
import { BsDoorOpen } from 'react-icons/bs';
import { BsReverseLayoutTextSidebarReverse } from 'react-icons/bs';
import { BsQuestionCircle } from 'react-icons/bs';

import { TfiShiftLeft } from 'react-icons/tfi';

export default function AdminNavbarSkeleton() {
  return (
    <>
      <div className={`overflow-y-auto`}>
        <div className="sm:flex xs:hidden lg:flex flex-col  text-gray-300/0 text-center  h-screen fixed z-[100] overflow-hidden bg-gray-200  before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50 before:animate-[shimmer_2s_infinite]">
          <div className="">
            <ul className="text-xs">
              <li
                id="logo"
                className="bg-gray-300/30 border-b-2 pt-4  border-black/5 mx-auto"
              >
                <i
                  className={`bg-gray-300 rounded-md fas fa-graduation-cap  lg:text-6xl xs:text-3xl mb-4 `}
                ></i>
              </li>
              <li
                className={`bg-gray-300/30  border-b-2 border-black/5 
                
               hdScreen:pb-1 hdScreen:pt-2 semihdScreen:pb-1 semihdScreen:pt-2 laptopScreen:pb-[0.2rem] laptopScreen:pt-1.5 averageScreen:pb-[0.18rem] averageScreen:pt-1.5 sm:pb-0.5 sm:pt-1 xs:pb-[0.1rem] xs:pt-0.5
                `}
              >
                <div className="relative text-center font-bold ">
                  <BsPeople className="bg-gray-300 rounded-full hdScreen:text-[2.2rem] semihdScreen:text-[2rem] laptopScreen:text-[1.6rem] averageScreen:text-[1.5rem] mx-auto" />
                  <span
                    className={`bg-gray-300 text-gray-300   rounded-md lg:text-base xs:text-xs font-poppins font-semibold lg:mx-4`}
                  >
                    Manage Accounts
                  </span>
                </div>
              </li>
              <li
                className={`bg-gray-300/30 border-b-2 border-black/5 
                hdScreen:pb-1 hdScreen:pt-2 semihdScreen:pb-1 semihdScreen:pt-2 laptopScreen:pb-[0.2rem] laptopScreen:pt-1.5 averageScreen:pb-[0.18rem] averageScreen:pt-1.5 sm:pb-0.5 sm:pt-1 xs:pb-[0.1rem] xs:pt-0.5
                `}
              >
                <div className="relative text-center  font-bold ">
                  <BsReceiptCutoff className="bg-gray-300 rounded-full hdScreen:text-[2.2rem] semihdScreen:text-[2rem] laptopScreen:text-[1.6rem] averageScreen:text-[1.5rem] mx-auto " />
                  <span
                    className={`bg-gray-300 text-gray-300   rounded-md lg:text-base xs:text-xs font-poppins font-semibold `}
                  >
                    Manage Sections
                  </span>
                </div>
              </li>
              <li
                className={`bg-gray-300/30 border-b-2 border-black/5 
                
                hdScreen:pb-1 hdScreen:pt-3 semihdScreen:pb-1 semihdScreen:pt-3 laptopScreen:pb-[0.2rem] laptopScreen:pt-1.5 averageScreen:pb-[0.18rem] averageScreen:pt-1.5 sm:pb-0.5 sm:pt-1 xs:pb-[0.1rem] xs:pt-0.5`}
              >
                <div className="relative text-center  font-bold ">
                  <BsPersonAdd className="bg-gray-300 rounded-full hdScreen:text-[2.2rem] semihdScreen:text-[2rem] laptopScreen:text-[1.6rem] averageScreen:text-[1.5rem] mx-auto " />
                  <span
                    className={`bg-gray-300 text-gray-300   rounded-md lg:text-base xs:text-xs font-poppins font-semibold`}
                  >
                    Register Account
                  </span>
                </div>
              </li>

              <li
                className={`bg-gray-300/30 border-b-2 border-black/5 
                hdScreen:pb-1 hdScreen:pt-3 semihdScreen:pb-1 semihdScreen:pt-3 laptopScreen:pb-[0.2rem] laptopScreen:pt-1.5 averageScreen:pb-[0.18rem] averageScreen:pt-1.5 sm:pb-0.5 sm:pt-1 xs:pb-[0.1rem] xs:pt-0.5`}
              >
                <div className="relative text-center  font-bold">
                  <BsPersonExclamation className="bg-gray-300 rounded-full hdScreen:text-[2.2rem] semihdScreen:text-[2rem] laptopScreen:text-[1.6rem] averageScreen:text-[1.5rem] mx-auto " />
                  <span
                    className={`bg-gray-300 text-gray-300   rounded-md lg:text-base xs:text-xs font-poppins font-semibold `}
                  >
                    User Requests
                  </span>
                </div>
              </li>
              <li
                className={`bg-gray-300/30 border-b-2 border-black/5 
                hdScreen:pb-1 hdScreen:pt-3 semihdScreen:pb-1 semihdScreen:pt-3 laptopScreen:pb-[0.2rem] laptopScreen:pt-1.5 averageScreen:pb-[0.18rem] averageScreen:pt-1.5 sm:pb-0.5 sm:pt-1 xs:pb-[0.1rem] xs:pt-0.5`}
              >
                <div className="relative text-center  font-bold">
                  <BsQuestionCircle className="scale-90 bg-gray-300 rounded-full hdScreen:text-[2.2rem] semihdScreen:text-[2rem] laptopScreen:text-[1.6rem] averageScreen:text-[1.5rem] mx-auto " />
                  <span
                    className={`bg-gray-300 text-gray-300   rounded-md lg:text-base xs:text-xs font-poppins font-semibold `}
                  >
                    Help
                  </span>
                </div>
              </li>
              <li
                className={`bg-gray-300/30 border-b-2 border-black/5 hover:bg-black/30  transition duration-300 hdScreen:pb-1 hdScreen:pt-3 semihdScreen:pb-1 semihdScreen:pt-3 laptopScreen:pb-[0.2rem] laptopScreen:pt-1.5 averageScreen:pb-[0.18rem] averageScreen:pt-1.5 sm:pb-0.5 sm:pt-1 xs:pb-[0.1rem] xs:pt-0.5
                `}
              >
                <div className="relative text-center  font-bold">
                  <BsDoorOpen className="bg-gray-300 rounded-full hdScreen:text-[2.2rem] semihdScreen:text-[2rem] laptopScreen:text-[1.6rem] averageScreen:text-[1.5rem] mx-auto " />
                  <span
                    className={`bg-gray-300 text-gray-300   rounded-md lg:text-base xs:text-xs font-poppins font-semibold `}
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
