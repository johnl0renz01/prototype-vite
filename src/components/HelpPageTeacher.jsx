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

import HelpPageTeacherSkeleton from './HelpPageTeacherSkeleton';

export default function HelpPageTeacher() {
  document.body.style.overflow = 'visible';

  useEffect(() => {
    setTabIndex();

    window.addEventListener('focus', setTabIndex);
    function setTabIndex() {
      window.localStorage.setItem('CURRENT_TAB_INDEX', 4);
    }
    //document.getElementById('mainHeader').focus();
  }, []);

  useEffect(() => {
    var logged = JSON.parse(window.localStorage.getItem('LOGGED'));
    if (logged == 'FALSE') {
      window.localStorage.setItem('LOGIN_STATUS', JSON.stringify('Terminated'));
    } else {
      var closed = JSON.parse(window.localStorage.getItem('IS_CLOSED'));
      if (closed) {
        var unique = JSON.parse(window.localStorage.getItem('UNIQUE_ID'));
        axios
          .post(`https://pia-sfe.online/api/logout/${unique}`)
          .then(function (response) {
            window.localStorage.setItem('LOGGED', JSON.stringify('FALSE'));
            window.localStorage.setItem(
              'LOGIN_STATUS',
              JSON.stringify('Terminated')
            );
          });
      }
    }

    var account = JSON.parse(window.localStorage.getItem('ACCOUNT_TYPE'));
    if (account == 'Admin') {
      navigate('/HomePageAdmin');
    } else if (account == 'Student') {
      navigate('/Homepage');
    }
  });

  window.onload = function () {
    window.scrollTo(0, 0);
  };

  const [linkTab, setLinkTab] = useState(0);
  const [currentId, setCurrentId] = useState('');
  const [scrollPos, setScrollPos] = useState(0);

  function handleScroll() {
    setScrollPos(window.pageYOffset);
  }

  useEffect(() => {
    //console.log(scrollPos);
    var currentLink = JSON.parse(window.sessionStorage.getItem('LINK_TAB'));
    if (currentLink !== null) setLinkTab(currentLink);

    window.addEventListener('scroll', handleScroll);

    //REPORT CARDS
    var report_cards_1 = document.getElementById('report-cards-1');
    var rc_1 = ReactDOM.findDOMNode(report_cards_1).offsetHeight;

    var report_cards_2 = document.getElementById('report-cards-2');
    var rc_2 = ReactDOM.findDOMNode(report_cards_2).offsetHeight;
    var rc_2 = rc_1 + rc_2;

    var report_cards_3 = document.getElementById('report-cards-3');
    var rc_3 = ReactDOM.findDOMNode(report_cards_3).offsetHeight;
    var rc_3 = rc_2 + rc_3;

    var report_cards_4 = document.getElementById('report-cards-4');
    var rc_4 = ReactDOM.findDOMNode(report_cards_4).offsetHeight;
    var rc_4 = rc_3 + rc_4;
    console.log(rc_4);
    ////////////////////////////////////////////////////////////

    //EQUATION LIST
    var equation_list_1 = document.getElementById('equation-list-1');
    var el_1 = ReactDOM.findDOMNode(equation_list_1).offsetHeight;

    var equation_list_2 = document.getElementById('equation-list-2');
    var el_2 = ReactDOM.findDOMNode(equation_list_2).offsetHeight;
    var el_2 = el_1 + el_2;

    ////////////////////////////////////////////////////////////

    //CREATE EQUATION
    var create_equation_1 = document.getElementById('create-equation-1');
    var ce_1 = ReactDOM.findDOMNode(create_equation_1).offsetHeight;

    var create_equation_2 = document.getElementById('create-equation-2');
    var ce_2 = ReactDOM.findDOMNode(create_equation_2).offsetHeight;
    var ce_2 = ce_1 + ce_2;

    var create_equation_3 = document.getElementById('create-equation-2');
    var ce_3 = ReactDOM.findDOMNode(create_equation_2).offsetHeight;
    var ce_3 = ce_2 + ce_3;

    ////////////////////////////////////////////////////////////

    if (linkTab == 1) {
      if (scrollPos <= rc_1) setCurrentId('rc_1');
      else if (scrollPos > rc_1 && scrollPos <= rc_2) setCurrentId('rc_2');
      else if (scrollPos > rc_2 && scrollPos <= rc_3) setCurrentId('rc_3');
      else if (scrollPos > rc_3 && scrollPos <= rc_4) setCurrentId('rc_4');
    } else if (linkTab == 2) {
      if (scrollPos <= el_1) setCurrentId('el_1');
      else if (scrollPos > el_1 && scrollPos <= el_2) setCurrentId('el_2');
    } else if (linkTab == 3) {
      if (scrollPos <= ce_1) setCurrentId('ce_1');
      else if (scrollPos > ce_1 && scrollPos <= ce_2) setCurrentId('ce_2');
      else if (scrollPos > ce_2 && scrollPos <= ce_3) setCurrentId('ce_3');
    } else {
      setCurrentId('');
    }

    // and so ....

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const navigate = useNavigate();

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

  const [category, setCategory] = useState('');

  const reportCard = () => {
    setCategory('ReportCard');
  };

  const equationList = () => {
    setCategory('EquationList');
  };

  const createEquation = () => {
    setCategory('CreateEquation');
  };

  // MODAL IMAGE
  const [showModal, setShowModal] = useState(false);
  const handleOnCloseModal = () => setShowModal(false);

  const [choiceModal, setChoiceModal] = useState(false);

  const handleOnContinueModal = () => {
    setChoiceModal(true);
    setShowModal(false);
  };

  //hdScreen: semihdScreen: laptopScreen: averageScreen:
  function Home() {
    return (
      <div className={`${linkTab == 0 ? '' : 'hidden'}`}>
        <div id="about">
          <h1 className="inline-block hdScreen:text-3xl semihdScreen:text-2xl laptopScreen:text-xl averageScreen:text-lg sm:text-base xs:text-sm font-[800] text-slate-800/90 tracking-normal">
            Learn about the system
          </h1>
          <p className="hdScreen:text-xl semihdScreen:text-lg laptopScreen:text-lg averageScreen:text-base sm:text-sm xs:text-xs text-gray-600 pb-4">
            To start, select one of the topic in the right side of this page.
          </p>
        </div>
        <hr></hr>
        <div className="hdScreen:text-[1.1rem] semihdScreen:text-[1rem] laptopScreen:text-[0.95rem] averageScreen:text-[0.9rem] sm:text-sm xs:text-xs  text-gray-600 text-justify">
          <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
            In the right side you can choose the following:
          </p>
          <hr></hr>
          <br></br>
          <div className="hdScreen:leading-[1.9rem] semihdScreen:leading-[1.6rem] laptopScreen:leading-[1.5rem] averageScreen:leading-[1.5rem]">
            <a className="hdScreen:text-xl semihdScreen:text-lg laptopScreen:text-lg averageScreen:text-base sm:text-sm xs:text-xs font-bold pb-3">
              Report Cards{' '}
            </a>
            <div className="pl-3">
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold">Class List: </span>
                Provides a comprehensive overview of all students enrolled
                within a particular section, presenting essential details such
                as the student's name, gender, and assigned group type.
                Additionally, the section houses the main buttons, facilitating
                easy access to essential functions and actions related to
                managing student records and academic data.
              </p>
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold">Search Students: </span>
                This branch allows tea to search for specific students within
                the system. They can search by student name, group type, or
                other relevant information. The search feature should be
                intuitive and efficient, providing quick access to student
                information.
              </p>
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold">Changing Section: </span>
                Teachers can modify which section or class to view. This branch
                enables teacher to see different classes or sections they
                handle.
              </p>
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold">
                  Check Student's Progress:{' '}
                </span>
                This branch provides a comprehensive overview of a student's
                academic progress. It should display information such as their
                scores, session history, basic information, and any additional
                relevant data. The system should allow teachers to easily track
                a student's performance over time.
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
              Equation List{' '}
            </a>
            <div className="pl-3">
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold">Changing Difficulty: </span>
                This branch enables authorized teachers to adjust the difficulty
                level of existing equations. The system should support
                categorization of equations based on difficulty levels, making
                it easy to update and manage the equation difficulty settings.
              </p>
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold">Removing Equation: </span>
                Teachers with appropriate permissions can remove equations from
                the equation list. This branch should include confirmation
                prompts to avoid accidental deletions. Additionally, any related
                data or references to the equation should be properly handled to
                maintain data integrity.
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
              Create Equation{' '}
            </a>
            <div className="pl-3">
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold">Validating Equation: </span>
                Before adding an equation to the system, this branch validates
                the equation for correctness and adherence to specific rules or
                formats. The system should ensure that the equation is
                appropriate and error-free before proceeding to the next step.
              </p>
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold">Selecting Difficulty: </span>
                In this step, teachers can assign a difficulty level before
                creating an equation. The system should provide a user-friendly
                interface for selecting from predefined difficulty options or
                adding custom difficulty categories.
              </p>
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                <span className="font-semibold">Adding Equation: </span>
                Once the equation is validated and a difficulty level is
                assigned, the equation is added to the equation list. Teachers
                should receive confirmation of successful addition and be able
                to view the equation in the appropriate difficulty category.
              </p>
            </div>
          </div>
          <br></br>
          <br></br>
          <br></br>
        </div>

        {/*
                  <h1 className="inline-block text-3xl font-[800] text-slate-800/90 tracking-normal">
                    Configuring Variants
                  </h1>
                  <p className="text-xl text-gray-600 ">
                    Configuring which utility variants are enabled in your
                    project.
                  </p>
                  <br></br>
                  <hr></hr>
                  <p className="text-[1.1rem] leading-7  text-gray-600 ">
                    The variants section of your tailwind.config.js file is
                    where you control which variants should be enabled for each
                    core plugin:
                  </p>
                  */}
      </div>
    );
  }

  function ReportCards() {
    return (
      <div className={`${linkTab == 1 ? '' : 'hidden'} `}>
        <div id="report-cards">
          <h1 className="inline-block hdScreen:text-3xl semihdScreen:text-2xl laptopScreen:text-xl averageScreen:text-lg sm:text-base xs:text-sm font-[800] text-slate-800/90 tracking-normal">
            Report Cards
          </h1>
          <p className="hdScreen:text-xl semihdScreen:text-lg laptopScreen:text-lg averageScreen:text-sm sm:text-sm xs:text-xs text-gray-600 pb-4">
            Summary of a student's academic performance and progress over a
            specific period.
          </p>
        </div>
        <hr></hr>
        <div className="hdScreen:text-[1.1rem] semihdScreen:text-[1rem] laptopScreen:text-[0.95rem] averageScreen:text-[0.9rem] sm:text-sm xs:text-xs  text-gray-600 text-justify">
          <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
            This topic outlines the steps to navigate and access students'
            report cards.
          </p>
          <hr></hr>
          <br></br>
          <div
            id="report-cards-1"
            className="hdScreen:leading-[1.9rem] semihdScreen:leading-[1.6rem] laptopScreen:leading-[1.5rem] averageScreen:leading-[1.5rem]"
          >
            <a
              id="class-list"
              className="scroll-element hdScreen:text-xl semihdScreen:text-lg laptopScreen:text-lg averageScreen:text-base sm:text-sm xs:text-xs font-bold pb-3"
            >
              Class list{' '}
            </a>
            <div className="">
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                The first page teacher will see after clicking the report cards
                tab.
                <span className="text-gray-400">
                  {'\u00A0'}(The following information serves as an illustrative
                  example.)
                </span>
              </p>
              <img
                onClick={function () {
                  setShowModal(true),
                    window.sessionStorage.setItem(
                      'IMAGE_LINK_TEACHER',
                      JSON.stringify('report-card-home')
                    );
                }}
                className=" cursor-pointer border-2 border-gray-300 my-3"
                src={require('../assets/teacher_guide/report-card-home.png')}
                alt=""
              />

              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                The system gives a complete overview of all students in a
                particular section, showing important details like their names,
                genders, and assigned group types. Additionally, the section has
                easy-to-use buttons for the access of student records and
                academic information.
                <br></br>
                <br></br>
                These essential details are important for both present and
                future research endeavors, as they provide valuable information
                for conducting comprehensive studies and analyses.
              </p>
            </div>
          </div>
          {/*BREAK*/}
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          <hr></hr>
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          {/*BREAK*/}
          <div
            id="report-cards-2"
            className="hdScreen:leading-[1.9rem] semihdScreen:leading-[1.6rem] laptopScreen:leading-[1.5rem] averageScreen:leading-[1.5rem]"
          >
            <a
              id="search-student"
              className="scroll-element hdScreen:text-xl semihdScreen:text-lg laptopScreen:text-lg averageScreen:text-base sm:text-sm xs:text-xs font-bold pb-3"
            >
              Search student{' '}
            </a>
            <div className="">
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                The search bar offers various methods to look up students and
                retrieve information, providing teachers with multiple options
                to find specific students and access relevant data easily.
              </p>
              <img
                onClick={function () {
                  setShowModal(true),
                    window.sessionStorage.setItem(
                      'IMAGE_LINK_TEACHER',
                      JSON.stringify('search-bar')
                    );
                }}
                className="cursor-pointer border-2 border-gray-300 my-3"
                src={require('../assets/teacher_guide/search-bar.png')}
                alt=""
              />
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                Teacher can search information such as the student's name,
                gender, and group type. There is no need to press the "Enter
                key", it automatically search when the teacher start typing.
                <br></br>
                <br></br>
                As an example below, typing the word "Male" will filter all in
                each category. The search bar is not case sensitive. <br></br>
                <span className="text-gray-400">
                  (You can type "male", "MAle", "MALe", "MALE" and still get the
                  desired result.)
                </span>
              </p>
              <img
                onClick={function () {
                  setShowModal(true),
                    window.sessionStorage.setItem(
                      'IMAGE_LINK_TEACHER',
                      JSON.stringify('search-bar-result1')
                    );
                }}
                className="cursor-pointer border-2 border-gray-300 my-3"
                src={require('../assets/teacher_guide/search-bar-result1.png')}
                alt=""
              />
            </div>
          </div>
          {/*BREAK*/}
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          <hr></hr>
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          {/*BREAK*/}

          <div
            id="report-cards-3"
            className="hdScreen:leading-[1.9rem] semihdScreen:leading-[1.6rem] laptopScreen:leading-[1.5rem] averageScreen:leading-[1.5rem]"
          >
            <a
              id="change-section"
              className="scroll-element hdScreen:text-xl semihdScreen:text-lg laptopScreen:text-lg averageScreen:text-base sm:text-sm xs:text-xs font-bold pb-3"
            >
              Changing section{' '}
            </a>
            <div className="pl-3">
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                This helps the teachers with multiple sections to change class
                list easily based on different factors. By clicking the "Change
                Section" a list will appear.
              </p>
              <img
                onClick={function () {
                  setShowModal(true),
                    window.sessionStorage.setItem(
                      'IMAGE_LINK_TEACHER',
                      JSON.stringify('change-section')
                    );
                }}
                className="cursor-pointer border-2 border-gray-300 my-3"
                src={require('../assets/teacher_guide/change-section.png')}
                alt=""
              />
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                In this example, there are two (2) sections that the teacher
                handle. The grayed out button is the current section selected.
                Clicking the "Select Section" would immediately update section
                and the class list.
                <br></br>
                <br></br>
                Below is the result, it consist of three (3) students which is
                also indicated in the list before.
              </p>
              <img
                onClick={function () {
                  setShowModal(true),
                    window.sessionStorage.setItem(
                      'IMAGE_LINK_TEACHER',
                      JSON.stringify('change-section-result')
                    );
                }}
                className="cursor-pointer border-2 border-gray-300 my-3"
                src={require('../assets/teacher_guide/change-section-result.png')}
                alt=""
              />
            </div>
          </div>
          {/*BREAK*/}
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          <hr></hr>
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          {/*BREAK*/}
          <div
            id="report-cards-4"
            className="hdScreen:leading-[1.9rem] semihdScreen:leading-[1.6rem] laptopScreen:leading-[1.5rem] averageScreen:leading-[1.5rem]"
          >
            <a
              id="check-progress"
              className="scroll-element hdScreen:text-xl semihdScreen:text-lg laptopScreen:text-lg averageScreen:text-base sm:text-sm xs:text-xs font-bold pb-3"
            >
              Check Student's progress{' '}
            </a>
            <div className="pl-3">
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                The teacher could see student report card information by
                clicking "See details" in the right side. It gives a complete
                view of student's overall performance and key data.
                <br></br>
                <br></br>
                After clicking the button, it shows all the information.
              </p>
              <img
                onClick={function () {
                  setShowModal(true),
                    window.sessionStorage.setItem(
                      'IMAGE_LINK_TEACHER',
                      JSON.stringify('report-details')
                    );
                }}
                className="cursor-pointer border-2 border-gray-300 my-3"
                src={require('../assets/teacher_guide/report-details.png')}
                alt=""
              />
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                The report provides a comprehensive overview of the student's
                full name, email, and their interaction with equations,
                including those answered and abandoned, along with the accuracy
                rate.
                <br></br>
                <br></br>
                On the right side, there are circles representing the total
                completed sessions, each associated with its respective
                difficulty level. Underneath, the history section displays
                timestamps of completed sessions, the student's scores, and the
                time spent on each session.
              </p>
            </div>
          </div>
          <br></br>
          <br></br>
          <br></br>
        </div>

        {/*
                  <h1 className="inline-block text-3xl font-[800] text-slate-800/90 tracking-normal">
                    Configuring Variants
                  </h1>
                  <p className="text-xl text-gray-600 ">
                    Configuring which utility variants are enabled in your
                    project.
                  </p>
                  <br></br>
                  <hr></hr>
                  <p className="text-[1.1rem] leading-7  text-gray-600 ">
                    The variants section of your tailwind.config.js file is
                    where you control which variants should be enabled for each
                    core plugin:
                  </p>
                  */}
      </div>
    );
  }

  function EquationList() {
    return (
      <div className={`${linkTab == 2 ? '' : 'hidden'}`}>
        <div id="equation-list">
          <h1 className="inline-block hdScreen:text-3xl semihdScreen:text-2xl laptopScreen:text-xl averageScreen:text-lg sm:text-base xs:text-sm font-[800] text-slate-800/90 tracking-normal">
            Equation List
          </h1>
          <p className="hdScreen:text-xl semihdScreen:text-lg laptopScreen:text-lg averageScreen:text-sm sm:text-sm xs:text-xs text-gray-600 pb-4">
            List of teacher-created math problems for the student.
          </p>
        </div>
        <hr></hr>
        <div className="hdScreen:text-[1.1rem] semihdScreen:text-[1rem] laptopScreen:text-[0.95rem] averageScreen:text-[0.9rem] sm:text-sm xs:text-xs  text-gray-600 text-justify">
          <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
            This topic consists of equations created by the teacher for students
            to solve and practice, covering various difficulty levels.
          </p>
          <hr></hr>
          <br></br>
          <div
            id="equation-list-1"
            className="hdScreen:leading-[1.9rem] semihdScreen:leading-[1.6rem] laptopScreen:leading-[1.5rem] averageScreen:leading-[1.5rem]"
          >
            <a
              id="change-difficulty"
              className="scroll-element hdScreen:text-xl semihdScreen:text-lg laptopScreen:text-lg averageScreen:text-base sm:text-sm xs:text-xs  font-bold pb-3"
            >
              Changing difficulty{' '}
            </a>
            <div className="">
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                The first page teacher will see after clicking the equation list
                tab.
                <span className="text-gray-400">
                  {'\u00A0'}(The following information serves as an illustrative
                  example.)
                </span>
              </p>

              <img
                onClick={function () {
                  setShowModal(true),
                    window.sessionStorage.setItem(
                      'IMAGE_LINK_TEACHER',
                      JSON.stringify('equation-list-home')
                    );
                }}
                className="cursor-pointer border-2 border-gray-300 my-3"
                src={require('../assets/teacher_guide/equation-list-home.png')}
                alt=""
              />

              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                As per the instruction, the teacher can change the difficulty of
                a specific equation by dragging its rectangular area to another
                difficulty level, indicated by the appearance of a draggable
                hand cursor. When hovered, the equation will be highlighted for
                an easy navigation.
              </p>
              <img
                onClick={function () {
                  setShowModal(true),
                    window.sessionStorage.setItem(
                      'IMAGE_LINK_TEACHER',
                      JSON.stringify('equation-list-change-1')
                    );
                }}
                className="cursor-pointer border-2 border-gray-300 my-3 w-[50%]"
                src={require('../assets/teacher_guide/equation-list-change-1.png')}
                alt=""
              />
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                Consider the equation "3 + 3x = 4x" as an illustration. To
                increase its difficulty from easy to average, simply drag the
                equation over the average difficulty section, and the change
                will be instantly reflected on the page. Also, the equations are
                sorted based on their length.
              </p>
              <img
                onClick={function () {
                  setShowModal(true),
                    window.sessionStorage.setItem(
                      'IMAGE_LINK_TEACHER',
                      JSON.stringify('equation-list-change-2')
                    );
                }}
                className="cursor-pointer border-2 border-gray-300 my-3"
                src={require('../assets/teacher_guide/equation-list-change-2.png')}
                alt=""
              />
            </div>
          </div>
          {/*BREAK*/}
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          <hr></hr>
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          {/*BREAK*/}
          <div
            id="equation-list-2"
            className="hdScreen:leading-[1.9rem] semihdScreen:leading-[1.6rem] laptopScreen:leading-[1.5rem] averageScreen:leading-[1.5rem]"
          >
            <a
              id="remove-equation"
              className="scroll-element hdScreen:text-xl semihdScreen:text-lg laptopScreen:text-lg averageScreen:text-base sm:text-sm xs:text-xs font-bold pb-3"
            >
              Removing equation{' '}
            </a>
            <div className="">
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                If the teacher wants to remove the equation, just click the "x"
                button on the right side of the equation.
                <br></br>
                <br></br>
                After clicking on the delete button, a confirmation message box
                will appear, presenting the teacher with two options: either to
                cancel the deletion process or to proceed with deleting the
                equation. The teacher can make their choice by selecting the
                appropriate option in the message box.
              </p>
              <img
                onClick={function () {
                  setShowModal(true),
                    window.sessionStorage.setItem(
                      'IMAGE_LINK_TEACHER',
                      JSON.stringify('delete-equation-1')
                    );
                }}
                className="cursor-pointer border-2 border-gray-300 my-3  w-[35%]"
                src={require('../assets/teacher_guide/delete-equation-1.png')}
                alt=""
              />
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                Upon the teacher's action of deleting the equation, a
                confirmation message will promptly appear, notifying them of the
                successful deletion. This message serves as a confirmation of
                the removal action and ensures that the equation has been
                effectively removed from the equation list.
              </p>
              <img
                onClick={function () {
                  setShowModal(true),
                    window.sessionStorage.setItem(
                      'IMAGE_LINK_TEACHER',
                      JSON.stringify('delete-equation-2')
                    );
                }}
                className="cursor-pointer border-2 border-gray-300 my-3 w-[35%]"
                src={require('../assets/teacher_guide/delete-equation-2.png')}
                alt=""
              />
            </div>
          </div>

          <br></br>
          <br></br>
          <br></br>
        </div>

        {/*
                  <h1 className="inline-block text-3xl font-[800] text-slate-800/90 tracking-normal">
                    Configuring Variants
                  </h1>
                  <p className="text-xl text-gray-600 ">
                    Configuring which utility variants are enabled in your
                    project.
                  </p>
                  <br></br>
                  <hr></hr>
                  <p className="text-[1.1rem] leading-7  text-gray-600 ">
                    The variants section of your tailwind.config.js file is
                    where you control which variants should be enabled for each
                    core plugin:
                  </p>
                  */}
      </div>
    );
  }

  function CreateEquation() {
    return (
      <div className={`${linkTab == 3 ? '' : 'hidden'}`}>
        <div id="create-equation">
          <h1 className="inline-block hdScreen:text-3xl semihdScreen:text-2xl laptopScreen:text-xl averageScreen:text-lg sm:text-base xs:text-sm font-[800] text-slate-800/90 tracking-normal">
            Create Equation
          </h1>
          <p className="hdScreen:text-xl semihdScreen:text-lg laptopScreen:text-lg averageScreen:text-sm sm:text-sm xs:text-xs text-gray-600 pb-4">
            Step-by-step guide to generate custom math equations, validate, set
            difficulty, and add to the list for students.
          </p>
        </div>
        <hr></hr>
        <div className="hdScreen:text-[1.1rem] semihdScreen:text-[1rem] laptopScreen:text-[0.95rem] averageScreen:text-[0.9rem] sm:text-sm xs:text-xs  text-gray-600 text-justify">
          <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
            The topic provides a detailed steps in creating a custom equations.
          </p>
          <hr></hr>
          <br></br>
          <div
            id="create-equation-1"
            className="hdScreen:leading-[1.9rem] semihdScreen:leading-[1.6rem] laptopScreen:leading-[1.5rem] averageScreen:leading-[1.5rem]"
          >
            <a
              id="validate-equation"
              className="scroll-element hdScreen:text-xl semihdScreen:text-lg laptopScreen:text-lg averageScreen:text-base sm:text-sm xs:text-xs font-bold pb-3"
            >
              Validating equation{' '}
            </a>
            <div className="">
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                The first page teacher will see after clicking the create
                equation tab.
                <br></br>
                <br></br>
                Equation validation is a critical process where the system
                checks the correctness, syntax, and mathematical validity of
                input equations. It ensures consistency in variables, adherence
                to format requirements, and provides meaningful error messages
                for any detected issues, maintaining accuracy and reliability
                for the system.
              </p>
              <img
                onClick={function () {
                  setShowModal(true),
                    window.sessionStorage.setItem(
                      'IMAGE_LINK_TEACHER',
                      JSON.stringify('create-equation-home')
                    );
                }}
                className="cursor-pointer border-2 border-gray-300 my-3"
                src={require('../assets/teacher_guide/create-equation-home.png')}
                alt=""
              />

              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                Once the teacher enters the equation, they can proceed by
                clicking the "validate" button. Upon doing so, a message will
                appear below, confirming that the equation is valid and meets
                the necessary requirements. This verification step ensures that
                only accurate and acceptable equations are accepted into the
                system.
              </p>
              <p className="font-semibold hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                If the equation is <span className="text-red-500">invalid</span>
                , this would appear.
              </p>
              <img
                onClick={function () {
                  setShowModal(true),
                    window.sessionStorage.setItem(
                      'IMAGE_LINK_TEACHER',
                      JSON.stringify('validate-equation-error')
                    );
                }}
                className="cursor-pointer border-2 border-gray-300 my-3 w-[60%]"
                src={require('../assets/teacher_guide/validate-equation-error.png')}
                alt=""
              />
              <p className="font-semibold hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                Below, a <span className="text-lime-600">valid</span> equation
                would have a message like this.
              </p>
              <img
                onClick={function () {
                  setShowModal(true),
                    window.sessionStorage.setItem(
                      'IMAGE_LINK_TEACHER',
                      JSON.stringify('validate-equation')
                    );
                }}
                className="cursor-pointer border-2 border-gray-300 my-3 w-[60%]"
                src={require('../assets/teacher_guide/validate-equation.png')}
                alt=""
              />
            </div>
          </div>
          {/*BREAK*/}
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          <hr></hr>
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          {/*BREAK*/}
          <div
            id="create-equation-2"
            className="hdScreen:leading-[1.9rem] semihdScreen:leading-[1.6rem] laptopScreen:leading-[1.5rem] averageScreen:leading-[1.5rem]"
          >
            <a
              id="select-difficulty"
              className="scroll-element hdScreen:text-xl semihdScreen:text-lg laptopScreen:text-lg averageScreen:text-base sm:text-sm xs:text-xs font-bold pb-3"
            >
              Selecting difficulty{' '}
            </a>
            <div className="">
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                After confirming the equation is valid, the teacher can choose
                its difficulty level. They will have three options to select
                from, which allows them to pick the equation's complexity to
                match the students' abilities and learning requirements.
              </p>
              <img
                onClick={function () {
                  setShowModal(true),
                    window.sessionStorage.setItem(
                      'IMAGE_LINK_TEACHER',
                      JSON.stringify('select-difficulty')
                    );
                }}
                className="cursor-pointer border-2 border-gray-300 my-3"
                src={require('../assets/teacher_guide/select-difficulty.png')}
                alt=""
              />
            </div>
          </div>
          {/*BREAK*/}
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          <hr></hr>
          <div className="hdScreen:my-10 semihdScreen:my-8 laptopScreen:my-7 averageScreen:my-6 sm:my-4 xs:my-2"></div>
          {/*BREAK*/}

          <div
            id="create-equation-3"
            className="hdScreen:leading-[1.9rem] semihdScreen:leading-[1.6rem] laptopScreen:leading-[1.5rem] averageScreen:leading-[1.5rem]"
          >
            <a
              id="adding-equation"
              className="scroll-element hdScreen:text-xl semihdScreen:text-lg laptopScreen:text-lg averageScreen:text-base sm:text-sm xs:text-xs font-bold pb-3"
            >
              Adding equation{' '}
            </a>
            <div className="pl-3">
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                Once the teacher selects the difficulty level for the equation,
                the system will initiate the step-by-step solving process. The
                system will provide a detailed explanation of how it solves the
                given equation, guiding the students through each stage of the
                solution, helping them understand the mathematical concepts and
                methods applied to arrive at the final answer.
              </p>
              <img
                onClick={function () {
                  setShowModal(true),
                    window.sessionStorage.setItem(
                      'IMAGE_LINK_TEACHER',
                      JSON.stringify('adding-equation')
                    );
                }}
                className="cursor-pointer border-2 border-gray-300 my-3"
                src={require('../assets/teacher_guide/adding-equation.png')}
                alt=""
              />
              <p className="hdScreen:py-2 semihdScreen:py-2 laptopScreen:py-1.5 averageScreen:py-1 sm:py-1 xs:py-0.5">
                After all the previous steps are completed, the teacher has the
                option to add the equation to the equation list. By doing so,
                students will have the opportunity to access and solve the
                equation on their own, further promoting their engagement and
                practice with the mathematical concept presented. This process
                encourages active learning and empowers students to explore and
                reinforce their problem-solving skills.
              </p>
              <img
                onClick={function () {
                  setShowModal(true),
                    window.sessionStorage.setItem(
                      'IMAGE_LINK_TEACHER',
                      JSON.stringify('adding-equation-1')
                    );
                }}
                className="cursor-pointer border-2 border-gray-300 my-3"
                src={require('../assets/teacher_guide/adding-equation-1.png')}
                alt=""
              />
            </div>
          </div>

          <br></br>
          <br></br>
          <br></br>
        </div>
      </div>
    );
  }

  //FOR SKELETON
  const [skeletonState, setSkeletonState] = useState(true);

  useEffect(() => {
    const onPageLoad = () => {
      setTimeout(hideNavbar, 1);

      function hideNavbar() {
        setSkeletonState(false);
      }
    };
    if (document.readyState === 'complete') {
      onPageLoad();
    } else {
      window.addEventListener('load', onPageLoad, false);
      return () => window.removeEventListener('load', onPageLoad);
    }
  }, []);

  return (
    <>
      <div className={`${!skeletonState ? 'hidden' : ''}`}>
        <HelpPageTeacherSkeleton />
      </div>
      <div
        className={`bg-gradient-to-t from-[#e2e2e2] via-[#f1f1f1] to-[#ffffff] h-full
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
        } ${skeletonState ? 'hidden' : ''}`}
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
            System Guide
          </div>

          <div
            className=" py-3 hdScreen:px-10 semihdScreen:px-9 laptopScreen:px-8 averageScreen:px-7 sm:px-5 xs:px-2 mt-1.5 border-2 
                           
                            bg-white relative mx-auto w-full rounded-md "
          >
            <hr></hr>
            <div className="mt-2 flex relative ">
              <div className=" w-full hdScreen:pr-12 semihdScreen:pr-9 laptopScreen:pr-8 averageScreen:pr-7 sm:pr-5 xs:pr-2 border-r-2">
                {Home()}
                {ReportCards()}
                {EquationList()}
                {CreateEquation()}
              </div>

              <div className="hdScreen:w-[17.5%] semihdScreen:w-[20.5%] laptopScreen:w-[22.5%] averageScreen:w-[26%] ">
                <div className="overflow-y-auto style-4 sticky max-h-screen top-0 right-[5%] pb-10 hdScreen:pl-8 semihdScreen:pl-6 laptopScreen:pl-4 averageScreen:pl-3 sm:pl-2 xs:pl-1">
                  <div className="">
                    <div
                      onClick={e => {
                        setLinkTab(0),
                          window.sessionStorage.setItem('LINK_TAB', 0),
                          window.scrollTo({ top: 0, behavior: 'auto' });
                      }}
                      href="#about"
                      className={`cursor-pointer block py-1 font-bold hdScreen:text-[1.170rem] semihdScreen:text-[1.05rem] laptopScreen:text-[1.02rem] averageScreen:text-[0.85rem] sm:text-sm xs:text-xs  leading-[1.75rem]  hdScreen:mt-5 semihdScreen:mt-4 laptopScreen:mt-3 averageScreen:mt-2
                      ${
                        linkTab == 0
                          ? 'text-lime-600 '
                          : 'text-slate-600 hover:text-slate-400'
                      }`}
                    >
                      Learn about the system
                    </div>
                    <ul className="marker:text-gray-500 text-slate-700 hdScreen:text-base semihdScreen:text-[0.925rem] semihdScreen:leading-[1.5rem] laptopScreen:text-sm averageScreen:text-xs xs:text-xs leading-6 hdScreen:mt-5 semihdScreen:mt-4 laptopScreen:mt-3 averageScreen:mt-2">
                      <hr></hr>
                      <br></br>
                      <li>
                        <a
                          onClick={e => {
                            setLinkTab(1),
                              window.sessionStorage.setItem('LINK_TAB', 1);
                          }}
                          href="#report-cards"
                          className={`block py-1 font-bold   ${
                            linkTab == 1
                              ? 'text-lime-600 '
                              : 'text-slate-500 hover:text-slate-400'
                          }`}
                        >
                          Report Cards
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 list-disc">
                        <a
                          onClick={e => {
                            setLinkTab(1),
                              window.sessionStorage.setItem('LINK_TAB', 1);
                          }}
                          href="#class-list"
                          className={`group flex items-start py-1 
                          ${
                            currentId == 'rc_1'
                              ? 'text-lime-600'
                              : 'text-slate-500 hover:text-slate-400'
                          }`}
                        >
                          Class list
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 list-disc">
                        <a
                          onClick={e => {
                            setLinkTab(1),
                              window.sessionStorage.setItem('LINK_TAB', 1);
                          }}
                          href="#search-student"
                          className={`group flex items-start py-1 
                          ${
                            currentId == 'rc_2'
                              ? 'text-lime-600'
                              : 'text-slate-500 hover:text-slate-400'
                          }`}
                        >
                          Search student
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 list-disc">
                        <a
                          onClick={e => {
                            setLinkTab(1),
                              window.sessionStorage.setItem('LINK_TAB', 1);
                          }}
                          href="#change-section"
                          className={`group flex items-start py-1 
                          ${
                            currentId == 'rc_3'
                              ? 'text-lime-600'
                              : 'text-slate-500 hover:text-slate-400'
                          }`}
                        >
                          Changing section
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 list-disc">
                        <a
                          onClick={e => {
                            setLinkTab(1),
                              window.sessionStorage.setItem('LINK_TAB', 1);
                          }}
                          href="#check-progress"
                          className={`group flex items-start py-1 
                          ${
                            currentId == 'rc_4'
                              ? 'text-lime-600'
                              : 'text-slate-500 hover:text-slate-400'
                          }`}
                        >
                          Check student's progress
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={e => {
                            setLinkTab(2),
                              window.sessionStorage.setItem('LINK_TAB', 2);
                          }}
                          href="#equation-list"
                          className={`block py-1 font-bold
                          ${
                            linkTab == 2
                              ? 'text-lime-600'
                              : 'text-slate-500 hover:text-slate-400'
                          }`}
                        >
                          Equation List
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 list-disc">
                        <a
                          onClick={e => {
                            setLinkTab(2),
                              window.sessionStorage.setItem('LINK_TAB', 2);
                          }}
                          href="#change-difficulty"
                          className={`group flex items-start py-1 
                          ${
                            currentId == 'el_1'
                              ? 'text-lime-600'
                              : 'text-slate-500 hover:text-slate-400'
                          }`}
                        >
                          Changing difficulty
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 list-disc">
                        <a
                          onClick={e => {
                            setLinkTab(2),
                              window.sessionStorage.setItem('LINK_TAB', 2);
                          }}
                          href="#remove-equation"
                          className={`group flex items-start py-1 
                          ${
                            currentId == 'el_2'
                              ? 'text-lime-600'
                              : 'text-slate-500 hover:text-slate-400'
                          }`}
                        >
                          Removing equation
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={e => {
                            setLinkTab(3),
                              window.sessionStorage.setItem('LINK_TAB', 3);
                          }}
                          href="#create-equation"
                          className={`block py-1 font-bold   ${
                            linkTab == 3
                              ? 'text-lime-600 '
                              : 'text-slate-500 hover:text-slate-400'
                          }`}
                        >
                          Create Equation
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 list-disc">
                        <a
                          onClick={e => {
                            setLinkTab(3),
                              window.sessionStorage.setItem('LINK_TAB', 3);
                          }}
                          href="#validate-equation"
                          className={`group flex items-start py-1 
                        ${
                          currentId == 'ce_1'
                            ? 'text-lime-600'
                            : 'text-slate-500 hover:text-slate-400'
                        }`}
                        >
                          Validating equation
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 list-disc">
                        <a
                          onClick={e => {
                            setLinkTab(3),
                              window.sessionStorage.setItem('LINK_TAB', 3);
                          }}
                          href="#select-difficulty"
                          className={`group flex items-start py-1 
                          ${
                            currentId == 'ce_2'
                              ? 'text-lime-600'
                              : 'text-slate-500 hover:text-slate-400'
                          }`}
                        >
                          Selecting difficulty
                        </a>
                      </li>
                      <li className="lg:ml-8 xs:ml-4 list-disc">
                        <a
                          onClick={e => {
                            setLinkTab(3),
                              window.sessionStorage.setItem('LINK_TAB', 3);
                          }}
                          href="#adding-equation"
                          className={`group flex items-start py-1 
                          ${
                            currentId == 'ce_3'
                              ? 'text-lime-600'
                              : 'text-slate-500 hover:text-slate-400'
                          }`}
                        >
                          Adding equation
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
      <ImageModalTeacher
        onClose={handleOnCloseModal}
        visible={showModal}
        onContinue={handleOnContinueModal}
      />
    </>
  );
}
