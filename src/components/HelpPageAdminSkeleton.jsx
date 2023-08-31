import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

export default function HelpPageAdminSkeleton() {
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

  //hdScreen: semihdScreen: laptopScreen: averageScreen:
  function Home() {
    return (
      <div>
        <div id="about">
          <h1 className="inline-block hdScreen:text-3xl semihdScreen:text-2xl laptopScreen:text-xl averageScreen:text-lg sm:text-base xs:text-sm font-[800] text-slate-800/90 tracking-normal">
            <span className="bg-gray-300 text-gray-300 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
              Learn about the system
            </span>
          </h1>
          <p className="mt-1 hdScreen:text-xl semihdScreen:text-lg laptopScreen:text-lg averageScreen:text-base sm:text-sm xs:text-xs text-gray-600 pb-4">
            <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
              To start, select one of the topic in the right side of this page.
            </span>
          </p>
        </div>
        <hr></hr>
        <div className="hdScreen:text-[1.1rem] semihdScreen:text-[1rem] laptopScreen:text-[0.95rem] averageScreen:text-[0.9rem] sm:text-sm xs:text-xs  text-gray-600 text-justify">
          <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
            <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
              In the right side you can choose the following:
            </span>
          </p>
          <hr></hr>
          <br></br>
          <div className="hdScreen:leading-[1.9rem] semihdScreen:leading-[1.6rem] laptopScreen:leading-[1.5rem] averageScreen:leading-[1.5rem]">
            <a className="hdScreen:text-xl semihdScreen:text-lg laptopScreen:text-lg averageScreen:text-base sm:text-sm xs:text-xs font-bold pb-3">
              <span className="bg-gray-300 text-gray-300 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                Manage Accounts{' '}
              </span>
            </a>
            <div className="pl-3">
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold bg-gray-300 text-gray-300 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite] mr-1">
                  Account list:{' '}
                </span>
                <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                  Access the branch to view a comprehensive records of
                  registered user accounts. Obtain an overview of account
                  details, including names, emails, and roles.
                </span>
              </p>
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold bg-gray-300 text-gray-300 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite] mr-1">
                  Search account:{' '}
                </span>
                <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                  This branch allows admin to search for specific account within
                  the system. To perform targeted searches for specific user
                  information. Use filters like names, roles, or email addresses
                  to locate accounts efficiently.
                </span>
              </p>
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold bg-gray-300 text-gray-300 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite] mr-1">
                  Resetting password:{' '}
                </span>
                <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                  Assist users in resetting their passwords if forgotten. By
                  clicking the reset password button, the reset request will
                  appear which was made by the users.
                </span>
              </p>
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold bg-gray-300 text-gray-300 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite] mr-1">
                  Editing account:{' '}
                </span>
                <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                  Empower authorized personnel to edit account information
                  seamlessly. Update user names, emails, roles, and other
                  relevant details while maintaining data accuracy to avoid
                  confusion among the users.
                </span>
              </p>
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold bg-gray-300 text-gray-300 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite] mr-1">
                  Deleting account:{' '}
                </span>
                <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                  This branch provide administrators with the capability to
                  permanently delete user accounts from the system, ensuring a
                  streamlined account management process.
                </span>
              </p>
            </div>
          </div>
          {/*BREAK*/}
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          <hr></hr>
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          {/*BREAK*/}
          <div className="hdScreen:leading-[1.9rem] semihdScreen:leading-[1.6rem] laptopScreen:leading-[1.5rem] averageScreen:leading-[1.5rem]">
            <a className="hdScreen:text-xl semihdScreen:text-lg laptopScreen:text-lg averageScreen:text-base sm:text-sm xs:text-xs font-bold pb-3">
              <span className="bg-gray-300 text-gray-300 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                Manage Sections{' '}
              </span>
            </a>
            <div className="pl-3">
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold bg-gray-300 text-gray-300 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite] mr-1">
                  Section list:{' '}
                </span>
                <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                  To gain insights into the various academic sections within the
                  institution. Review details such as section names, associated
                  teachers, and enrolled students.
                </span>
              </p>
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold bg-gray-300 text-gray-300 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite] mr-1">
                  Search section:{' '}
                </span>
                <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                  Employ the search section function to quickly locate specific
                  sections based on parameters such as section names or assigned
                  teachers.
                </span>
              </p>
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold bg-gray-300 text-gray-300 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite] mr-1">
                  Adding section:{' '}
                </span>
                <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                  Facilitate the addition of new academic sections to the
                  system. Input section names, assign teachers, and set
                  enrollment capacities through the Adding Section interface.
                </span>
              </p>
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold bg-gray-300 text-gray-300 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite] mr-1">
                  Editing section:{' '}
                </span>
                <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                  Enable administrators to make adjustments to existing section
                  information. Modify section names, teacher assignments, and
                  grade level efficiently.
                </span>
              </p>
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold bg-gray-300 text-gray-300 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite] mr-1">
                  Deleting section:{' '}
                </span>
                <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                  Perform the ability to remove academic sections from the
                  system when they are no longer needed or relevant for future
                  purposes.
                </span>
              </p>
            </div>
          </div>
          {/*BREAK*/}
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          <hr></hr>
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          {/*BREAK*/}
          <div className="hdScreen:leading-[1.9rem] semihdScreen:leading-[1.6rem] laptopScreen:leading-[1.5rem] averageScreen:leading-[1.5rem]">
            <a className="hdScreen:text-xl semihdScreen:text-lg laptopScreen:text-lg averageScreen:text-base sm:text-sm xs:text-xs font-bold pb-3">
              <span className="bg-gray-300 text-gray-300 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                Register Account{' '}
              </span>
            </a>
            <div className="pl-3">
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold bg-gray-300 text-gray-300 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite] mr-1">
                  Assigning role:{' '}
                </span>
                <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                  During the registration process, administrators have the
                  authority to assign roles to new accounts, thereby defining
                  their access rights and permissions within the system.
                  Assignable roles may include students, and teachers.
                </span>
              </p>
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold bg-gray-300 text-gray-300 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite] mr-1">
                  Registration type:{' '}
                </span>
                <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                  Select the registration process according to user roles,
                  indicating the appropriate registration type based on the
                  current user. This encompasses single or bulk registration
                  options, ensuring a fitting and simple registration
                  experience.
                </span>
              </p>
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold bg-gray-300 text-gray-300 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite] mr-1">
                  Submit registration:{' '}
                </span>
                <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                  Initiate the account creation process by clicking the Register
                  button. This user-friendly option guides potential users
                  through the registration steps smoothly.
                </span>
              </p>
            </div>
          </div>
          {/*BREAK*/}
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          <hr></hr>
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          {/*BREAK*/}
          <div className="hdScreen:leading-[1.9rem] semihdScreen:leading-[1.6rem] laptopScreen:leading-[1.5rem] averageScreen:leading-[1.5rem]">
            <a className="hdScreen:text-xl semihdScreen:text-lg laptopScreen:text-lg averageScreen:text-base sm:text-sm xs:text-xs font-bold pb-3">
              <span className="bg-gray-300 text-gray-300 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                User Requests{' '}
              </span>
            </a>
            <div className="pl-3">
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold bg-gray-300 text-gray-300 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite] mr-1">
                  Request list:{' '}
                </span>
                <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                  Explore the request list to gain a comprehensive overview of
                  user-generated support requests. Obtain information about the
                  nature of inquiries, the status of request, the requester, and
                  any important messages.
                </span>
              </p>
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold bg-gray-300 text-gray-300 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite] mr-1">
                  Search request:{' '}
                </span>
                <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                  To find specific user requests quickly, use the search request
                  feature. Enter keywords, pick certain dates, request subjects,
                  or roles to quickly get the relevant inquiries.
                </span>
              </p>
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold bg-gray-300 text-gray-300 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite] mr-1">
                  Viewing details:{' '}
                </span>
                <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                  Explore detailed user requests by clicking on individual
                  entries. Examine the subject, content, and other details of
                  each request to gain a comprehensive understanding.
                </span>
              </p>
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold bg-gray-300 text-gray-300 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite] mr-1">
                  Marking request:{' '}
                </span>
                <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                  to efficiently handle user interactions by designating
                  requests as resolved or pending. This functionality aids in
                  effectively monitoring the advancement of support or
                  assistance inquiries and ensures a well-organized user support
                  system.
                </span>
              </p>
            </div>
          </div>
          <br></br>
          <br></br>
          <br></br>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={`bg-gradient-to-t from-[#e2e2e2] via-[#f1f1f1] to-[#ffffff] h-full z-10 select-none
        ${
          navbarWidth == 176
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
            <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
              System Guide
            </span>
          </div>

          <div
            className=" py-3 hdScreen:px-10 semihdScreen:px-9 laptopScreen:px-8 averageScreen:px-7 sm:px-5 xs:px-2 mt-1.5 border-2 
                           
                            bg-white  mx-auto w-full rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]"
          >
            <hr></hr>
            <div className="mt-2 flex relative ">
              <div className=" w-full hdScreen:pr-12 semihdScreen:pr-9 laptopScreen:pr-8 averageScreen:pr-7 sm:pr-5 xs:pr-2 border-r-2">
                {Home()}
              </div>

              <div className="hdScreen:w-[17.5%] semihdScreen:w-[20.5%] laptopScreen:w-[22.5%] averageScreen:w-[26%] ">
                <div className="sticky top-10 right-[5%]  hdScreen:pl-8 semihdScreen:pl-6 laptopScreen:pl-4 averageScreen:pl-3 sm:pl-2 xs:pl-1">
                  <div className="">
                    <div
                      className={` block py-1 font-bold hdScreen:text-[1.170rem] semihdScreen:text-[1.05rem] laptopScreen:text-[1.02rem] averageScreen:text-[0.85rem] sm:text-sm xs:text-xs  leading-[1.75rem]  hdScreen:mt-5 semihdScreen:mt-4 laptopScreen:mt-3 averageScreen:mt-2
                      `}
                    >
                      <span className="bg-gray-300 text-gray-300 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                        Learn about the system
                      </span>
                    </div>
                    <ul className="marker:text-gray-500 text-slate-700 hdScreen:text-base hdScreen:leading-[1.4rem] semihdScreen:text-[0.9rem] semihdScreen:leading-[1.1rem] laptopScreen:text-sm laptopScreen:leading-[0.95rem] averageScreen:text-xs averageScreen:leading-[0.85rem] xs:text-xs leading-[0.6rem] hdScreen:mt-5 semihdScreen:mt-4 laptopScreen:mt-3 averageScreen:mt-2">
                      <hr></hr>
                      <br></br>
                      <li>
                        <a className={`block py-1 font-bold   `}>
                          <span className="bg-gray-300 text-gray-300 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                            Manage Accounts
                          </span>
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 ">
                        <a
                          className={`group flex items-start py-1 
                          `}
                        >
                          <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                            Account list
                          </span>
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 ">
                        <a
                          className={`group flex items-start py-1 
                          `}
                        >
                          <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                            Search account
                          </span>
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 ">
                        <a
                          className={`group flex items-start py-1 
                          `}
                        >
                          <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                            Resetting password
                          </span>
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 ">
                        <a
                          className={`group flex items-start py-1 
                          `}
                        >
                          <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                            Editing account
                          </span>
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 ">
                        <a
                          className={`group flex items-start py-1 
                         `}
                        >
                          <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                            Deleting account
                          </span>
                        </a>
                      </li>
                      <li>
                        <a
                          className={`block py-1 font-bold
                         `}
                        >
                          <span className="bg-gray-300 text-gray-300 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                            Manage Sections
                          </span>
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 ">
                        <a
                          className={`group flex items-start py-1 
                          `}
                        >
                          <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                            Section list
                          </span>
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 ">
                        <a
                          className={`group flex items-start py-1 
                         `}
                        >
                          <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                            Search section
                          </span>
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 ">
                        <a
                          className={`group flex items-start py-1 
                          `}
                        >
                          <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                            Adding section
                          </span>
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 ">
                        <a
                          className={`group flex items-start py-1 
                          `}
                        >
                          <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                            Editing section
                          </span>
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 ">
                        <a
                          className={`group flex items-start py-1 
                          `}
                        ></a>
                      </li>
                      <li>
                        <a className={`block py-1 font-bold  `}>
                          <span className="bg-gray-300 text-gray-300 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                            Register Account
                          </span>
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 ">
                        <a
                          className={`group flex items-start py-1 
                       `}
                        >
                          <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                            Assigning role
                          </span>
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 ">
                        <a
                          className={`group flex items-start py-1 
                          `}
                        >
                          <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                            Registration type
                          </span>
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 ">
                        <a
                          className={`group flex items-start py-1 
                          `}
                        >
                          <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                            Submit registration
                          </span>
                        </a>
                      </li>
                      <li>
                        <a className={`block py-1 font-bold   `}>
                          <span className="bg-gray-300 text-gray-300 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                            User Requests
                          </span>
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 ">
                        <a
                          className={`group flex items-start py-1 
                       `}
                        >
                          <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                            Request list
                          </span>
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 ">
                        <a
                          className={`group flex items-start py-1 
                          `}
                        >
                          <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                            Search request
                          </span>
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 ">
                        <a
                          className={`group flex items-start py-1 
                          `}
                        >
                          <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                            Viewing details
                          </span>
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 ">
                        <a
                          className={`group flex items-start py-1 
                         `}
                        >
                          <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                            Marking request
                          </span>
                        </a>
                      </li>
                    </ul>
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
