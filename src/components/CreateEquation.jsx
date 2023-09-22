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

import CreateEquationSkeleton from './CreateEquationSkeleton';
import CreateEquationMessageModal from './CreateEquationMessageModal';

import { BsClipboard2X } from 'react-icons/bs';
import LoadingSpinner from './LoadingSpinner';

export default function CreateEquation() {
  const navigate = useNavigate();

  const [equationList, setEquationList] = useState([]);

  function getEquations() {
    axios
      .get(`https://pia-sfe.online/api/getEquationList/`)
      .then(function (response) {
        setEquationList(response.data);
      });
  }

  useEffect(() => {
    getEquations();

    setTabIndex();

    window.addEventListener('focus', setTabIndex);
    function setTabIndex() {
      window.localStorage.setItem('CURRENT_TAB_INDEX', 3);
    }
  }, []);

  useEffect(() => {
    var logged = JSON.parse(window.localStorage.getItem('LOGGED'));
    if (logged == 'FALSE') {
      window.localStorage.setItem('LOGIN_STATUS', JSON.stringify('Terminated'));

      var email = JSON.parse(window.localStorage.getItem('SESSION_EMAIL'));
      if (email === null) email = '';

      if (email == '') {
        navigate('/LoginPage');
      }
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

  const [showLoading, setShowLoading] = useState(false);
  const [tableLoader, setTableLoader] = useState(false);
  var highestTimeoutId = setTimeout(';');

  const [equationString, setEquationString] = useState('');
  const [equationResult, setEquationResult] = useState('');
  const [equationSteps, setEquationSteps] = useState([]);
  const [difficulty, setDifficulty] = useState('');
  const [choice, setChoice] = useState('');

  const [isDuplicate, setDuplicateState] = useState(false);
  const [isValid, setValidState] = useState(false);
  const [isSolved, setSolvedState] = useState(false);

  const [showSteps, setStepsState] = useState(false);

  const [equationLink, setEquationLink] = useState('');

  var fixedEquationString = '';
  var fixedEquationSteps = [];
  var steps = [];

  const inputChange = event => {
    document.getElementById('validation_result').style.visibility = 'hidden';
    setValidState(false);
    setSolvedState(false);
    setStepsState(false);
    setDifficulty('');
    setChoice('');
    setEquationString(event.target.value);
    //const name = event.target.name;
    //const value = event.target.value;
    //setInputs((values) => ({ ...values, [name]: value }));
  };

  const validateEquation = () => {
    setShowLoading(true);
    let equationLink = equationString.replace(/ /g, '');

    equationLink = formatGivenEquation(equationLink);

    function formatGivenEquation(currentEquation) {
      let firstIndex = 0;
      let fixedString = '';
      let equalSignIndex = 0;
      for (let j = 1; j <= currentEquation.length; j++) {
        if (currentEquation.length === j) {
          fixedString = fixedString.concat(
            [currentEquation.slice(firstIndex, j)].join('')
          );
          break;
        }
        if (currentEquation[j].match(/[\-]/)) {
          if (j - 1 === equalSignIndex) {
            continue;
          }
        }

        if (currentEquation[j].match(/[\-\+\*\/\=]/)) {
          fixedString = fixedString.concat(
            [
              currentEquation.slice(firstIndex, j),
              ' ',
              currentEquation[j],
              ' ',
            ].join('')
          );
          firstIndex = j + 1;
        }

        if (currentEquation[j].match(/[\=]/)) {
          equalSignIndex = j;
        }
      }
      return fixedString;
    }
    console.log(equationLink);
    equationLink = equationLink.replace(/ /g, '_');

    axios
      .post(`https://pia-sfe.online/api/verifyEquation/${equationLink}`)
      .then(function (response) {
        console.log(response.data);
        document.getElementById('validation_result').style.visibility =
          'visible';
        setEquationResult(equationString);
        if (response.data === 'duplicate') {
          setShowLoading(false);
          setDuplicateState(true);
          setValidState(false);
        } else {
          setDuplicateState(false);
          if (equationString.trim() != '') {
            EquationSolver.setEquation(equationString);
            let answer = EquationSolver.getEquationAnswer();
            console.log(answer);
            if (answer == 'solved') {
              setSolvedState(true);
              setValidState(false);
            } else if (answer != 'invalid') {
              setValidState(true);
              steps = EquationSolver.getEquationSteps();

              // SET PROPER SPACING
              for (let i = 0; i < steps.length; i++) {
                let currentEquation = steps[i];
                let firstIndex = 0;
                let fixedString = '';
                let equalSignIndex = 0;

                formatEquation(currentEquation);
                function formatEquation(currentEquation) {
                  for (let j = 1; j <= currentEquation.length; j++) {
                    if (currentEquation.length === j) {
                      fixedString = fixedString.concat(
                        [currentEquation.slice(firstIndex, j)].join('')
                      );
                      break;
                    }
                    if (currentEquation[j].match(/[\-]/)) {
                      if (j - 1 === equalSignIndex) {
                        continue;
                      }
                    }

                    if (currentEquation[j].match(/[\-\+\*\/\=]/)) {
                      fixedString = fixedString.concat(
                        [
                          currentEquation.slice(firstIndex, j),
                          ' ',
                          currentEquation[j],
                          ' ',
                        ].join('')
                      );
                      firstIndex = j + 1;
                    }

                    if (currentEquation[j].match(/[\=]/)) {
                      equalSignIndex = j;
                    }
                  }
                }

                fixedEquationSteps.push(fixedString);

                if (i == 0) {
                  fixedEquationString = equationString.trim();
                  fixedEquationString = fixedEquationString.replace(/ /g, '');
                  fixedString = '';
                  firstIndex = 0;
                  equalSignIndex = 0;

                  formatEquation(fixedEquationString);
                  fixedEquationString = fixedString;
                  fixedEquationString = fixedEquationString.replace(/ /g, '_');

                  console.log('ASDSADAS: ' + fixedEquationString);
                  setEquationLink(fixedEquationString);
                }
              }
            }
            setEquationSteps(fixedEquationSteps);
          }
          setShowLoading(false);
        }
      });
  };

  const resetEquation = () => {
    document.getElementById('validation_result').style.visibility = 'hidden';
    setValidState(false);
    setSolvedState(false);
    setStepsState(false);
    setDifficulty('');
    setChoice('');
    setEquationString('');
  };

  const optionEasy = () => {
    setDifficulty('Easy');
    setChoice('Easy');
    setStepsState(true);
  };

  const optionAverage = () => {
    setDifficulty('Average');
    setChoice('Average');
    setStepsState(true);
  };

  const optionDifficult = () => {
    setDifficulty('Difficult');
    setChoice('Difficult');
    setStepsState(true);
  };

  const addEquation = () => {
    setShowLoading(true);
    var equationDetails = difficulty + '@' + equationLink;
    console.log(equationDetails);
    axios
      .post(`https://pia-sfe.online/api/addEquation/${equationDetails}`)
      .then(function (response) {
        setShowLoading(false);
        resetEquation();
        console.log(response.data);
        setShowModal(true);
        /*
        setEquationAddState(true);
        setTimeout(resetState, 3000);
        function resetState() {
          setEquationAddState(false);
        }
        */
      })
      .catch(function (error) {
        setShowLoading(false);
      });
  };

  const [equationAdded, setEquationAddState] = useState(false);

  // MODAL CREATED EQUATION
  const [showModal, setShowModal] = useState(false);
  const handleOnCloseModal = () => setShowModal(false);

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

  //FOR SKELETON
  const [skeletonState, setSkeletonState] = useState(true);

  /*
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
  */

  return (
    <>
      {/*
      <div className={`${!skeletonState ? 'hidden' : ''}`}>
        <CreateEquationSkeleton />
      </div>
    */}
      <div
        className={`bg-gradient-to-t from-[#e2e2e2] via-[#f1f1f1] to-[#ffffff] h-full overflow-y-auto
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
      } ${skeletonState ? '' : ''}`}
      >
        <div
          className={`bg-gradient-to-t from-[#e2e2e2] via-[#f1f1f1] to-[#ffffff] h-screen`}
        >
          <section id="container" className=" relative mx-auto p-8 w-full">
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
              id="create_question"
              className="flex flex-col 
              hdScreen:min-h-[calc(100vh-12.5vh)] hdScreen:max-h-[calc(100vh-12.5vh)]  
              semihdScreen:min-h-[calc(100vh-17.5vh)] semihdScreen:max-h-[calc(100vh-17.5vh)]  
              laptopScreen:min-h-[calc(100vh-22.5vh)] laptopScreen:max-h-[calc(100vh-22.5vh)]  
              averageScreen:min-h-[calc(100vh-27.5vh)] averageScreen:max-h-[calc(100vh-27.5vh)] 
              xs:min-h-[calc(100vh-27.5vh)] xs:max-h-[calc(100vh-27.5vh)] 

              lg:text-lg xs:text-sm p-4 text-gray-700"
            >
              <div className="font-semibold">Enter the equation:</div>
              <div className="flex mt-0.5">
                <input
                  autoComplete="off"
                  name="input"
                  value={equationString}
                  onChange={inputChange}
                  type="text"
                  className="w-full grow  p-1 px-2 border-2 rounded-md border-gray-400 focus:outline-teal-500 relative focus:ring-teal-500   shadow-[#808080]"
                ></input>
                <button
                  onClick={equationString != '' ? validateEquation : undefined}
                  className={`ml-6 py-1.5 lg:w-36 px-4 shadow-md rounded-md transition duration-300 drop-shadow-[0_3px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_3px_0px_rgba(0,0,0,0.6)] ${
                    equationString != ''
                      ? ' text-white  bg-yellow-600 hover:bg-yellow-700'
                      : ' cursor-default text-gray-300  bg-gray-400 '
                  }`}
                >
                  <span className="pl-1 lg:text-xl xs:text-xs flex justify-center items-center">
                    Validate
                    <GoChecklist className="ml-2  lg:text-2xl" />
                  </span>
                </button>
              </div>
              <div className="text-gray-500 lg:text-lg xs:text-xs mt-1">
                (Click "Validate" to check if the equation could be solved by
                the algorithm.)
              </div>

              <div
                id="validation_result"
                className={` invisible transition duration-500 select-none ${
                  equationString.length >= 30 ? '' : 'flex'
                }`}
              >
                <div>
                  <div className="">
                    <p className=" my-2 border-2  border-gray-300 shadow-md p-1 px-2 inline-block rounded-xl">
                      {equationResult}
                    </p>
                  </div>
                </div>

                <div className="flex ">
                  {isValid ? (
                    equationString.length >= 30 ? (
                      <VscPassFilled className="ml-3 mt-1.5  lg:text-2xl text-lime-600" />
                    ) : (
                      <VscPassFilled className="ml-3 mt-[1.10rem] lg:text-2xl text-lime-600" />
                    )
                  ) : equationString.length >= 30 ? (
                    <BsXCircleFill className="ml-3 mt-1.5 lg:text-2xl text-red-500" />
                  ) : (
                    <BsXCircleFill className="ml-3 mt-[1.10rem] lg:text-2xl text-red-500" />
                  )}
                  <p
                    className={`lg:text-lg xs:text-xs  font-semibold border-gray-300 inline-block p-1 px-2 rounded-xl ${
                      equationString.length >= 30
                        ? isValid
                          ? 'text-lime-600'
                          : 'text-red-600'
                        : isValid
                        ? 'text-lime-600 mt-3'
                        : 'text-red-600 mt-3'
                    }`}
                  >
                    {...isDuplicate
                      ? 'Invalid: (This equation already exist in the equation list.)'
                      : isSolved
                      ? 'Invalid: (This equation is already solved)'
                      : isValid
                      ? 'Valid: (This equation could be solved by the algorithm)'
                      : 'Invalid: (This equation is unable to solve by the algorithm)'}
                  </p>
                </div>
              </div>

              <div
                className={`hdScreen:mt-4 semihdScreen:mt-2 laptopScreen:mt-2 averageScreen:mt-2 lg:text-xl font-semibold  transition select-none ${
                  isValid ? 'opacity-100  duration-[1500ms]' : 'opacity-0'
                }`}
              >
                What is the difficulty level of this equation?
                <div className="mt-2 text-lg flex">
                  <button
                    onClick={isValid ? optionEasy : undefined}
                    className={`hdScreen:py-1.5 semihdScreen:py-1.5 laptopScreen:py-1 averageScreen:py-1 md:px-10 xs:px-5  shadow-md rounded-xl  transition duration-300 ${
                      isValid
                        ? choice == 'Easy'
                          ? 'bg-gray-700  text-gray-200'
                          : 'bg-gray-400 hover:bg-gray-600 text-white'
                        : choice == 'Easy'
                        ? 'bg-gray-700  text-gray-200 cursor-default'
                        : 'bg-gray-400 hover:bg-gray-600 text-white cursor-default'
                    }`}
                  >
                    <span className="lg:text-lg xs:text-sm">Easy</span>
                  </button>
                  <button
                    onClick={isValid ? optionAverage : undefined}
                    className={`ml-6 hdScreen:py-1.5 semihdScreen:py-1.5 laptopScreen:py-1 averageScreen:py-1  md:px-10 xs:px-5  shadow-md rounded-xl  transition duration-300 ${
                      isValid
                        ? choice == 'Average'
                          ? 'bg-gray-700  text-gray-200'
                          : 'bg-gray-400 hover:bg-gray-600 text-white'
                        : choice == 'Average'
                        ? 'bg-gray-700  text-gray-200 cursor-default'
                        : 'bg-gray-400 hover:bg-gray-600 text-white cursor-default'
                    }`}
                  >
                    <span className="lg:text-lg xs:text-sm">Average</span>
                  </button>
                  <button
                    onClick={isValid ? optionDifficult : undefined}
                    className={`ml-6 hdScreen:py-1.5 semihdScreen:py-1.5 laptopScreen:py-1 averageScreen:py-1  md:px-10 xs:px-5  shadow-md rounded-xl  transition duration-300 ${
                      isValid
                        ? choice == 'Difficult'
                          ? 'bg-gray-700  text-gray-200'
                          : 'bg-gray-400 hover:bg-gray-600 text-white'
                        : choice == 'Difficult'
                        ? 'bg-gray-700  text-gray-200 cursor-default'
                        : 'bg-gray-400 hover:bg-gray-600 text-white cursor-default'
                    }`}
                  >
                    <span className="lg:text-lg xs:text-sm">Difficult</span>
                  </button>
                </div>
              </div>
              <div
                className={`flex  hdScreen:mt-6 semihdScreen:mt-6 laptopScreen:mt-4 averageScreen:mt-4 xs:mt-4 shadow-md transition  select-none ${
                  showSteps ? 'opacity-100  duration-[1500ms]' : 'opacity-0'
                }`}
              >
                <div className="">
                  <div className="bg-gray-400 px-2 py-1 transition duration-300">
                    Steps to solve:
                  </div>
                  {equationSteps.map((step, index) =>
                    index % 2 == 0 ? (
                      <div className="bg-gray-200 px-2 py-1">{step}</div>
                    ) : (
                      <div className="bg-gray-300 px-2 py-1">{step}</div>
                    )
                  )}
                </div>
                <div className="grow border-l-2 border-gray-500/80">
                  <div className="bg-gray-400 px-2 py-1">Explanation:</div>
                  {equationSteps.length === 1 ? (
                    <>
                      <div className="bg-gray-200 px-2 py-1">
                        The equation is solved. Dividing constant by the
                        coefficient.{' '}
                      </div>
                    </>
                  ) : equationSteps.length === 2 ? (
                    <>
                      <div className="bg-gray-200 px-2 py-1">
                        Simplify both expression.{' '}
                      </div>
                      <div className="bg-gray-300 px-2 py-1">
                        The equation is solved. Dividing constant by the
                        coefficient.{' '}
                      </div>
                    </>
                  ) : equationSteps.length === 3 ? (
                    <>
                      <div className="bg-gray-200 px-2 py-1">
                        Arrange expressions. Variables in the left side and
                        constant in the right side.{' '}
                      </div>
                      <div className="bg-gray-300 px-2 py-1">
                        Simplify both remaining expression.{' '}
                      </div>
                      <div className="bg-gray-200 px-2 py-1">
                        The equation is solved. Dividing constant by the
                        coefficient.{' '}
                      </div>
                    </>
                  ) : equationSteps.length === 4 ? (
                    <>
                      <div className="bg-gray-200 px-2 py-1">
                        Arithmetic operations performed in both variables and
                        constant.{' '}
                      </div>
                      <div className="bg-gray-300 px-2 py-1">
                        Arrange expressions. Variables in the left side and
                        constant in the right side.{' '}
                      </div>
                      <div className="bg-gray-200 px-2 py-1">
                        Simplify both remaining expression.{' '}
                      </div>
                      <div className="bg-gray-300 px-2 py-1">
                        The equation is solved. Dividing constant by the
                        coefficient.{' '}
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              <div
                className={`flex  mt-auto justify-end pt-4
              ${skeletonState ? 'hidden' : ''}`}
              >
                <button
                  onClick={showSteps ? resetEquation : undefined}
                  className={`ml-6 py-1.5 pb-2 px-4 shadow-md rounded-md  transition duration-300 drop-shadow-[0_3px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_3px_0px_rgba(0,0,0,0.6)] ${
                    showSteps
                      ? 'text-white bg-red-600 hover:bg-red-700'
                      : 'cursor-default text-gray-300 bg-gray-400'
                  }`}
                >
                  <span className="pl-1 lg:text-xl xs:text-sm flex justify-center items-center">
                    Reset
                    <BsArrowCounterclockwise className="ml-2 lg:text-xl xs:text-xs -rotate-45" />
                  </span>
                </button>
                <button
                  onClick={showSteps ? addEquation : undefined}
                  className={` ml-6 py-1.5 pb-2 px-3 shadow-md rounded-md  transition duration-300 drop-shadow-[0_3px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_3px_0px_rgba(0,0,0,0.6)] ${
                    showSteps
                      ? 'text-white bg-lime-600 hover:bg-lime-700'
                      : 'cursor-default text-gray-300 bg-gray-400'
                  }`}
                >
                  <span className="pl-2 lg:text-xl xs:text-sm flex justify-center items-center">
                    Add Equation
                    <HiPlusSmall className="ml-1 lg:text-2xl xs:text-base" />
                  </span>
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
      <CreateEquationMessageModal
        onClose={handleOnCloseModal}
        visible={showModal}
      />
      <LoadingSpinner visible={showLoading} />
    </>
  );
}
