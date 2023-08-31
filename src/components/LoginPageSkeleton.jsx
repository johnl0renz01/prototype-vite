import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

import { useFormik } from 'formik';
import { loginSchema } from '../schemas';

import { VscEyeClosed } from 'react-icons/vsc';
import { VscEye } from 'react-icons/vsc';

import { VscCheckAll, VscPassFilled } from 'react-icons/vsc';

import { BsXCircleFill } from 'react-icons/bs';

import SetPasswordMessageModal from './SetPasswordMessageModal';

export default function LoginPageSkeleton() {
  const navigate = useNavigate();

  /*
  document.body.style.height = '100vh';

  document.body.style.backgroundImage =
    'linear-gradient(to top, #a8a8a8 , #c4c4c4, #e0e0e0)';

  useEffect(() => {
    document.body.style.backgroundImage =
      'linear-gradient(to top, #a8a8a8 , #c4c4c4, #e0e0e0)';

    window.addEventListener('load', changeBG);

    function changeBG() {
      document.body.style.backgroundImage =
        'linear-gradient(to top, #a8a8a8 , #c4c4c4, #e0e0e0)';
    }
  }, []);

  useEffect(() => {
    document.body.style.backgroundImage =
      'linear-gradient(to top, #a8a8a8 , #c4c4c4, #e0e0e0)';

    window.addEventListener('focus', changeBG);
    window.addEventListener('load', changeBG);
    window.addEventListener('click', changeBG);
  });

  function changeBG() {
    document.body.style.backgroundImage =
      'linear-gradient(to top, #a8a8a8 , #c4c4c4, #e0e0e0)';
  }
  */

  //END END END END END END END END END END END END

  return (
    <>
      <div className="hdScreen:h-[calc(100vh-27.5vh)] semihdScreen:h-[calc(100vh-27.5vh)] laptopScreen:h-[calc(100vh-20vh)] averageScreen:h-[calc(100vh-17.5vh)] flex items-center select-none">
        <div className="mx-auto w-full  grid place-items-center">
          <div
            className="mt-16 
            hdScreen:w-[30%] semihdScreen:w-[35%] laptopScreen:w-[40%] averageScreen:w-[42.5%] 
            hdScreen:scale-100 semihdScreen:scale-95 laptopScreen:scale-85 averageScreen:scale-80
          bg-gray-100 rounded-2xl shadow-md relative  overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]"
          >
            <div className="lg:pb-16 xs:pb-10  px-10 rounded-3xl">
              <div className="hdScreen:text-4xl semihdScreen:text-4xl laptopScreen:text-3xl  averageScreen:text-3xl  sm:text-2xl xs:text-xl text-gray-700 font-bold text-center lg:pt-10 xs:pt-4 pb-4">
                <i className="bg-gray-300 text-gray-300 rounded-md fas fa-graduation-cap  hdScreen:text-[5rem] semihdScreen:text-[4.5rem] laptopScreen:text-[4rem] averageScreen:text-[3.75rem]"></i>
              </div>
              <hr />
              <div className="hdScreen:text-4xl semihdScreen:text-4xl laptopScreen:text-3xl  averageScreen:text-3xl sm:text-2xl xs:text-lg text-gray-700 font-bold text-center">
                <div className="pt-4 pb-2 select-none">
                  <span className="bg-gray-300 text-gray-300 rounded-md">
                    Account Login
                  </span>
                </div>
              </div>

              <div className="p-1 rounded-xl lg:text-2xl xs:text-base grid place-items-center text-gray-400">
                <h1 className="select-none">
                  <span className="bg-gray-200 text-gray-200 rounded-md">
                    ( Log-in to your account )
                  </span>
                </h1>

                <div className="mt-12"></div>
              </div>

              <div className="">
                <form className={``}>
                  {/* Email Input */}

                  <div className="text-left">
                    <div className="">
                      <div className="inline-flex ">
                        <label
                          className={`ml-1 pl-0.5 mr-2 lg:text-lg sm:text-base xs:text-xs mt-1.5 font-semibold`}
                        >
                          <span className="bg-gray-300 text-gray-300 rounded-md">
                            Email
                          </span>
                        </label>
                        <div className="mt-2"></div>
                      </div>

                      <input
                        className={`bg-gray-200 rounded-xl w-full lg:text-lg sm:text-base xs:text-xs text-gray-700 px-4  py-1.5 `}
                        type="email"
                        name="email"
                        autoComplete="off"
                        /* Formik email validation Section  */

                        disabled
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="my-1 text-left h-20">
                    <div className="relative">
                      <div className="inline-flex ">
                        <label
                          htmlFor="password"
                          className="mr-2 lg:text-lg sm:text-base xs:text-xs mt-1.5 ml-1 font-semibold"
                        >
                          <span className="bg-gray-300 text-gray-300 rounded-md">
                            Password:
                          </span>
                        </label>

                        <div className="mt-2"></div>
                      </div>
                      <input
                        id="password"
                        className={` bg-gray-200 rounded-xl w-full lg:text-lg sm:text-base xs:text-xs text-gray-700 px-4 pr-10 py-1.5 mr-3 `}
                        type="password"
                        name="password"
                        autoComplete="off"
                        /* Formik password validation Section */

                        disabled
                      />

                      <VscEye className="bg-gray-300 text-gray-300 rounded-md absolute right-4 lg:top-[2.8rem] sm:top-[2.6rem] xs:top-[2.2rem] lg:text-xl sm:text-base xs:text-xs " />
                    </div>
                  </div>

                  {/* Login Button */}
                  <div className=" mt-8 mb-3 text-center w-full ">
                    <button
                      disabled
                      type="submit"
                      className="bg-gray-300 text-gray-300 shadow rounded-2xl w-1/2 py-2 lg:lg:text-lg sm:text-base xs:text-xs sm:text-md font-semibold  "
                    >
                      <span className="lg:text-xl sm:text-base xs:text-xs font-semibold">
                        LOG-IN
                      </span>
                    </button>
                  </div>
                </form>
                {/* Set New Password */}

                <div className={`w-full text-center `}>
                  <span
                    className={`  lg:text-lg sm:text-base xs:text-xs bg-gray-200 text-gray-200 hover:underline rounded-md`}
                  >
                    Forgot Password?
                  </span>
                </div>
                <div className="">
                  <button
                    disabled
                    type="button"
                    className={`absolute bottom-0 right-0 px-2 rounded-br-2xl opacity-0 lg:text-sm xs:text-xs  `}
                  >
                    Are you an admin?
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
