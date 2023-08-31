import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

import EquationSolver from './equationSolver';

import { BsTrash3 } from 'react-icons/bs';
import { HiPencilSquare } from 'react-icons/hi2';
import ImageModalTeacher from './ImageModalTeacher';
import CreateEquation from './CreateEquation';

export default function HelpPageTeacherSkeleton() {
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
                Report Cards{' '}
              </span>
            </a>
            <div className="pl-3">
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold bg-gray-300 text-gray-300 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite] mr-1">
                  Class List:{' '}
                </span>
                <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                  Provides a comprehensive overview of all students enrolled
                  within a particular section, presenting essential details such
                  as the student's name, gender, and assigned group type.
                  Additionally, the section houses the main buttons,
                  facilitating easy access to essential functions and actions
                  related to managing student records and academic data.
                </span>
              </p>
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold bg-gray-300 text-gray-300 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite] mr-1">
                  Search Student:{' '}
                </span>
                <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                  This branch allows users to search for specific students
                  within the system. They can search by student name, group
                  type, or other relevant information. The search feature should
                  be intuitive and efficient, providing quick access to student
                  information.
                </span>
              </p>
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold bg-gray-300 text-gray-300 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite] mr-1">
                  Changing Section:{' '}
                </span>
                <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                  Teachers can modify which section or class to view. This
                  branch enables teacher to see different classes or sections
                  they handle.{' '}
                </span>
              </p>
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold bg-gray-300 text-gray-300 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite] mr-1">
                  Check Student's Progress:{' '}
                </span>{' '}
                <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                  This branch provides a comprehensive overview of a student's
                  academic progress. It should display information such as their
                  scores, session history, basic information, and any additional
                  relevant data. The system should allow users to easily track a
                  student's performance over time.{' '}
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
                Equation List
              </span>
            </a>
            <div className="pl-3">
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold bg-gray-300 text-gray-300 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite] mr-1">
                  Changing Difficulty:{' '}
                </span>
                <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                  This branch enables authorized users to adjust the difficulty
                  level of existing equations. The system should support
                  categorization of equations based on difficulty levels, making
                  it easy to update and manage the equation difficulty settings.
                </span>
              </p>
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold bg-gray-300 text-gray-300 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite] mr-1">
                  Removing Equation:{' '}
                </span>
                <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                  {' '}
                  Users with appropriate permissions can remove equations from
                  the equation list. This branch should include confirmation
                  prompts to avoid accidental deletions. Additionally, any
                  related data or references to the equation should be properly
                  handled to maintain data integrity.
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
                Create Equation
              </span>
            </a>
            <div className="pl-3">
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold bg-gray-300 text-gray-300 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite] mr-1">
                  Validating Equation:{' '}
                </span>
                <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                  Before adding an equation to the system, this branch validates
                  the equation for correctness and adherence to specific rules
                  or formats. The system should ensure that the equation is
                  appropriate and error-free before proceeding to the next step.{' '}
                </span>
              </p>
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold bg-gray-300 text-gray-300 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite] mr-1">
                  Selecting Difficulty:{' '}
                </span>
                <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                  In this step, users can assign a difficulty level before
                  creating an equation. The system should provide a
                  user-friendly interface for selecting from predefined
                  difficulty options or adding custom difficulty categories.
                </span>
              </p>
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold bg-gray-300 text-gray-300 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite] mr-1">
                  Adding Equation:{' '}
                </span>
                <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                  Once the equation is validated and a difficulty level is
                  assigned, the equation is added to the equation list. Users
                  should receive confirmation of successful addition and be able
                  to view the equation in the appropriate difficulty category.
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
        className={`bg-gradient-to-t from-[#e2e2e2] via-[#f1f1f1] to-[#ffffff]  z-10 select-none
        ${
          navbarWidth == 143
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
        <section className="relative mx-auto p-8 w-full">
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
            <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
              System Guide
            </span>
          </div>

          <div
            className=" py-3 hdScreen:px-10 semihdScreen:px-9 laptopScreen:px-8 averageScreen:px-7 sm:px-5 xs:px-2 mt-1.5 border-2 
                           
                            bg-white  mx-auto w-full rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite] "
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
                      className={`block py-1 font-bold hdScreen:text-[1.170rem] semihdScreen:text-[1.05rem] laptopScreen:text-[1.02rem] averageScreen:text-[0.85rem] sm:text-sm xs:text-xs  leading-[1.75rem]  hdScreen:mt-5 semihdScreen:mt-4 laptopScreen:mt-3 averageScreen:mt-2
       `}
                    >
                      <span className="bg-gray-300 text-gray-300 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                        Learn about the system
                      </span>
                    </div>
                    <ul className="marker:text-gray-500 text-slate-700 hdScreen:text-base semihdScreen:text-[0.925rem] semihdScreen:leading-[1.5rem] laptopScreen:text-sm averageScreen:text-xs xs:text-xs leading-6 hdScreen:mt-5 semihdScreen:mt-4 laptopScreen:mt-3 averageScreen:mt-2">
                      <hr></hr>
                      <br></br>
                      <li>
                        <a className={`block py-1 font-bold   `}>
                          <span className="bg-gray-300 text-gray-300 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite]">
                            Report Cards
                          </span>
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 ">
                        <a
                          className={`group flex items-start py-1
                          `}
                        >
                          <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite] ">
                            Class List
                          </span>
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 ">
                        <a
                          className={`group flex items-start py-1 
                          `}
                        >
                          <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite] ">
                            Search student
                          </span>
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4">
                        <a
                          className={`group flex items-start py-1 
                         `}
                        >
                          <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite] ">
                            Changing Section
                          </span>
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 ">
                        <a
                          className={`group flex items-start py-1 
                          `}
                        >
                          <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite] ">
                            Check student's progress
                          </span>
                        </a>
                      </li>
                      <li>
                        <a
                          className={`block py-1 font-bold
                          `}
                        >
                          <span className="bg-gray-300 text-gray-300 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite] ">
                            Equation List
                          </span>
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 ">
                        <a
                          className={`group flex items-start py-1 
                          `}
                        >
                          <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite] ">
                            Changing difficulty
                          </span>
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4">
                        <a
                          className={`group flex items-start py-1 
                          `}
                        >
                          <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite] ">
                            Removing equation
                          </span>
                        </a>
                      </li>
                      <li>
                        <a className={`block py-1 font-bold   `}>
                          <span className="bg-gray-300 text-gray-300 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite] ">
                            Create Equation
                          </span>
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 ">
                        <a
                          className={`group flex items-start py-1 
                        `}
                        >
                          <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite] ">
                            Validating equation
                          </span>
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 ">
                        <a
                          className={`group flex items-start py-1 
                          `}
                        >
                          <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite] ">
                            Selecting difficulty
                          </span>
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 ">
                        <a
                          className={`group flex items-start py-1 
                          `}
                        >
                          <span className="bg-gray-200 text-gray-200 rounded-md relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50  before:animate-[shimmer_1.5s_infinite] ">
                            Adding equation
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
