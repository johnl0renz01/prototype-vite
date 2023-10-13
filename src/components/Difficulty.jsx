import React, { Component } from 'react';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

import QuestionList from './questionList';
import EquationSolver from './equationSolver';

import EquationGeneratorEasy from './equationsEasy';
import EquationGeneratorAverage from './equationsAverage';
import EquationGeneratorDifficult from './equationsDifficult';

import DifficultyModal from './DifficultyModal';
import EndSession from './EndSession';
import ClearStorage from './ClearStorage';

import LoadingStudent from './LoadingStudent';

import LoadingSpinner from './LoadingSpinner';

import StorageData from './StorageData';
import SecureStorageData from './SecureStorageData';

export default function DifficultyPage() {
  document.body.style.height = '100vh';
  const navigate = useNavigate();

  useEffect(() => {
    var logged = JSON.parse(window.localStorage.getItem('LOGGED'));
    if (logged == 'FALSE') {
      window.localStorage.setItem('LOGIN_STATUS', JSON.stringify('Terminated'));

      var email = StorageData.localStorageJSON('SESSION_EMAIL');
      if (email === null) email = '';

      if (email == '') {
        navigate('/LoginPage');
      }
    } else {
      var closed = JSON.parse(window.localStorage.getItem('IS_CLOSED'));
      if (closed) {
        var unique = JSON.parse(window.localStorage.getItem('UNIQUE_ID'));
        axios
          .post(
            `http://localhost:80/Prototype-Vite/my-project/api/logout/${unique}`
          )
          .then(function (response) {
            window.localStorage.setItem('LOGGED', JSON.stringify('FALSE'));
            window.localStorage.setItem(
              'LOGIN_STATUS',
              JSON.stringify('Terminated')
            );
          });
      }
    }

    var account = StorageData.localStorageJSON('ACCOUNT_TYPE');

    if (account == 'Admin') {
      navigate('/HomePageAdmin');
    } else if (account == 'Teacher') {
      navigate('/HomePageTeacher');
    } else if (account == '' || account === null || account === undefined) {
      navigate('/LoginPage');
    }

    var status = StorageData.localStorageJSON('SESSION_TEACHER_TABLE');
    if (status !== null) {
      if (status == 'Not-Enrolled') {
        navigate('/Homepage');
      }
    } else {
      navigate('/Homepage');
    }
  });

  const [showLoading, setShowLoading] = useState(false);

  //FOR LINKS/NAVBAR/BREADCRUMBS
  const [pageList, setPageList] = useState([]);
  const [pageLink, setPageLink] = useState([]);

  useEffect(() => {
    setPage();

    window.addEventListener('focus', setPage);
    function setPage() {
      let page = ['Home', 'Difficulty'];
      let link = ['/Homepage', '/Difficulty'];
      setPageList(page);
      setPageLink(link);
      window.localStorage.setItem('NAVBAR_PAGE', JSON.stringify(pageList));
      window.localStorage.setItem('NAVBAR_PAGE_LINK', JSON.stringify(pageLink));
    }

    //NEXTA SDSADASDASDAS
    window.removeEventListener('popstate', event => {
      if (
        confirm('Are you sure you want to save this thing into the database?')
      ) {
        // Save it!
        console.log('Thing was saved to the database.');
      } else {
        // Do nothing!
        console.log('Thing was not saved to the database.');
      }
    });

    window.removeEventListener('beforeunload', function (e) {
      // Cancel the event
      e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
      // Chrome requires returnValue to be set
      e.returnValue = '';
    });

    document.body.style.backgroundImage =
      'linear-gradient(to top, #bef264, #d9f99d , #ccf779)';
  }, []);

  useEffect(() => {
    window.localStorage.setItem('NAVBAR_PAGE', JSON.stringify(pageList));
  }, [pageList]);

  useEffect(() => {
    window.localStorage.setItem('NAVBAR_PAGE_LINK', JSON.stringify(pageLink));
  }, [pageLink]);

  //END END END END END END END END END END END END

  function WhiteboardPage() {
    let page = ['Home', 'Difficulty', 'Whiteboard'];
    let link = ['/Homepage', '/Difficulty', '/Whiteboard'];
    setPageList(page);
    setPageLink(link);

    window.localStorage.setItem('NAVBAR_PAGE', JSON.stringify(pageList));
    window.localStorage.setItem('NAVBAR_PAGE_LINK', JSON.stringify(pageLink));
    setTimeout(proceed, 1);

    function proceed() {
      setShowLoading(false);
      navigate('/Whiteboard');
    }
  }

  //FOR QUESTIONS
  const [rawList, setRawList] = useState('');
  const [questionArray, setQuestionArray] = useState([]);
  const [questionList, setQuestions] = useState([]);
  const [result, setResult] = useState([]);

  useEffect(() => {
    const data = StorageData.localStorageRAW('QUESTION_LIST');

    if (data !== null) setQuestions(JSON.parse(data));
  }, []);

  const [option, setOption] = useState('');
  const [diffType, setDiffType] = useState('');
  const [picked, isPicked] = useState(false);

  //var difficultyType = "";
  var equationList = [];
  var option_1 = document.getElementById('option_1');
  var option_2 = document.getElementById('option_2');
  var option_3 = document.getElementById('option_3');

  const easyType = () => {
    setShowLoading(true);
    var tableSettings = StorageData.localStorageJSON('SESSION_TEACHER_TABLE');

    var tableEquations = tableSettings + '_equation_list';
    tableSettings = tableSettings + '_equation_settings';

    axios
      .get(
        `http://localhost:80/Prototype-Vite/my-project/api/equationSettingsDetails/${tableSettings}`
      )
      .then(function (response) {
        var result = Object.values(response.data);
        var keys = [];
        for (var k in result[0]) keys.push(result[0][k]);

        equationList = EquationGeneratorEasy.getEquationList(
          20,
          tableEquations,
          parseInt(keys[1]),
          keys[2],
          parseInt(keys[4]),
          parseInt(keys[5]),
          keys[6]
        );

        if (keys[3] == 'TRUE') {
          window.localStorage.setItem(
            'SESSION_ACCEPT_FRACTION',
            SecureStorageData.dataEncryption(true)
          );
        } else {
          window.localStorage.removeItem('SESSION_ACCEPT_FRACTION');
        }

        setQuestions(equationList);
        setOption('easy');
        setDiffType('Easy');
        isPicked(true);
        resetCheck();
        ReactDOM.findDOMNode(option_1).style.visibility = 'visible';

        setShowLoading(false);
      })
      .catch(function (error) {
        setShowLoading(false);
      });
  };

  const averageType = () => {
    setShowLoading(true);
    var tableSettings = StorageData.localStorageJSON('SESSION_TEACHER_TABLE');

    var tableEquations = tableSettings + '_equation_list';
    tableSettings = tableSettings + '_equation_settings';

    axios
      .get(
        `http://localhost:80/Prototype-Vite/my-project/api/equationSettingsDetails/${tableSettings}`
      )
      .then(function (response) {
        var result = Object.values(response.data);
        var keys = [];
        for (var k in result[0]) keys.push(result[0][k]);

        equationList = EquationGeneratorAverage.getEquationList(
          20,
          tableEquations,
          parseInt(keys[1]),
          keys[2],
          parseInt(keys[4]),
          parseInt(keys[5]),
          keys[6]
        );

        if (keys[3] == 'TRUE') {
          window.localStorage.setItem(
            'SESSION_ACCEPT_FRACTION',
            SecureStorageData.dataEncryption(true)
          );
        } else {
          window.localStorage.removeItem('SESSION_ACCEPT_FRACTION');
        }

        setQuestions(equationList);
        setOption('average');
        setDiffType('Average');
        isPicked(true);
        resetCheck();
        ReactDOM.findDOMNode(option_2).style.visibility = 'visible';

        setShowLoading(false);
      })
      .catch(function (error) {
        setShowLoading(false);
      });
  };

  const difficultType = () => {
    setShowLoading(true);
    var tableSettings = StorageData.localStorageJSON('SESSION_TEACHER_TABLE');

    var tableEquations = tableSettings + '_equation_list';
    tableSettings = tableSettings + '_equation_settings';

    axios
      .get(
        `http://localhost:80/Prototype-Vite/my-project/api/equationSettingsDetails/${tableSettings}`
      )
      .then(function (response) {
        var result = Object.values(response.data);
        var keys = [];
        for (var k in result[0]) keys.push(result[0][k]);

        equationList = EquationGeneratorDifficult.getEquationList(
          20,
          tableEquations,
          parseInt(keys[1]),
          keys[2],
          parseInt(keys[4]),
          parseInt(keys[5]),
          keys[6]
        );

        if (keys[3] == 'TRUE') {
          window.localStorage.setItem(
            'SESSION_ACCEPT_FRACTION',
            SecureStorageData.dataEncryption(true)
          );
        } else {
          window.localStorage.removeItem('SESSION_ACCEPT_FRACTION');
        }

        setQuestions(equationList);
        setOption('difficult');
        setDiffType('Difficult');
        isPicked(true);
        resetCheck();
        ReactDOM.findDOMNode(option_3).style.visibility = 'visible';

        setShowLoading(false);
      })
      .catch(function (error) {
        setShowLoading(false);
      });
  };

  function resetCheck() {
    ReactDOM.findDOMNode(option_1).style.visibility = 'hidden';
    ReactDOM.findDOMNode(option_2).style.visibility = 'hidden';
    ReactDOM.findDOMNode(option_3).style.visibility = 'hidden';
  }

  //FOR MODAL
  const [showModal, setShowModal] = useState(false);
  const handleOnCloseModal = () => setShowModal(false);

  const [choiceModal, setChoiceModal] = useState(false);

  const handleOnContinueModal = () => {
    window.localStorage.removeItem('EXPRESSION_SEQUENCE');
    window.localStorage.setItem('QUESTION_STATUS', JSON.stringify('ABANDONED'));
    EndSession.recordData();
    ClearStorage.clearData();
    setShowLoading(true);
    setChoiceModal(true);
    setShowModal(false);
    window.localStorage.setItem(
      'QUESTION_LIST',
      JSON.stringify(SecureStorageData.dataEncryption(questionList))
    );
    window.localStorage.setItem(
      'QUESTION_INDEX',
      SecureStorageData.dataEncryption('0')
    );
    var userLogs = StorageData.localStorageRAW('SESSION_USER_LOGS');

    userLogs = userLogs + '@' + option;
    userLogs = userLogs.replace(/"/g, '');

    window.localStorage.setItem(
      'SESSION_SCORE',
      SecureStorageData.dataEncryption(0)
    );
    axios
      .post(
        `http://localhost:80/Prototype-Vite/my-project/api/selectDifficulty/${userLogs}`
      )
      .then(function (response) {
        window.localStorage.setItem(
          'SESSION_ID',
          JSON.stringify(SecureStorageData.dataEncryption(response.data))
        );
        window.sessionStorage.setItem(
          'CURRENT_SESSION_ID',
          JSON.stringify(SecureStorageData.dataEncryption(response.data))
        );

        window.localStorage.setItem(
          'DIFFICULTY_TYPE',
          JSON.stringify(SecureStorageData.dataEncryption(diffType))
        );

        //CREATE USER SESSION TABLE
        var sessionID = response.data;
        var userDatabase = StorageData.localStorageRAW('SESSION_USER_LOGS');

        userDatabase = userDatabase.replace(/"/g, '');
        axios
          .post(
            `http://localhost:80/Prototype-Vite/my-project/api/studentSessionCreate/${userDatabase}@${sessionID}`
          )
          .then(function (response) {
            console.log(response.data);
            WhiteboardPage();
          })
          .catch(function (error) {
            setShowLoading(false);
          });
      })
      .catch(function (error) {
        setShowLoading(false);
      });
  };

  const pickDifficulty = () => {
    window.localStorage.removeItem('EXPRESSION_SEQUENCE');
    setChoiceModal(false);
    var sessionID = '';
    try {
      sessionID = StorageData.localStorageRAW('SESSION_ID');
    } catch {
      window.localStorage.setItem('SESSION_ID', '');
    }

    if (sessionID == '""' || sessionID == null || sessionID == undefined) {
      setShowLoading(true);
      window.localStorage.setItem(
        'SESSION_SCORE',
        SecureStorageData.dataEncryption(0)
      );
      window.localStorage.setItem(
        'QUESTION_LIST',
        JSON.stringify(SecureStorageData.dataEncryption(questionList))
      );
      window.localStorage.setItem(
        'QUESTION_INDEX',
        SecureStorageData.dataEncryption('0')
      );
      var userLogs = StorageData.localStorageRAW('SESSION_USER_LOGS');

      userLogs = userLogs + '@' + option;
      userLogs = userLogs.replace(/"/g, '');
      axios
        .post(
          `http://localhost:80/Prototype-Vite/my-project/api/selectDifficulty/${userLogs}`
        )
        .then(function (response) {
          window.localStorage.setItem(
            'SESSION_ID',
            JSON.stringify(SecureStorageData.dataEncryption(response.data))
          );
          window.sessionStorage.setItem(
            'CURRENT_SESSION_ID',
            JSON.stringify(SecureStorageData.dataEncryption(response.data))
          );

          window.localStorage.setItem(
            'DIFFICULTY_TYPE',
            JSON.stringify(SecureStorageData.dataEncryption(diffType))
          );
          window.localStorage.removeItem('SESSION_FEEDBACK');

          //CREATE USER SESSION TABLE
          var sessionID = response.data;
          var userDatabase = StorageData.localStorageRAW('SESSION_USER_LOGS');

          userDatabase = userDatabase.replace(/"/g, '');
          axios
            .post(
              `http://localhost:80/Prototype-Vite/my-project/api/studentSessionCreate/${userDatabase}@${sessionID}`
            )
            .then(function (response) {
              console.log(response.data);
              WhiteboardPage();
            })
            .catch(function (error) {
              setShowLoading(false);
            });
        })
        .catch(function (error) {
          setShowLoading(false);
        });
    } else {
      setShowModal(true);
    }
  };

  const [easyEquations, setEasyEquations] = useState([
    '2x - 2 = 1',
    '3x = -4',
    '9x + 13 = -4x',
    '23x - 72 = 36',
    '4 - x = 6x',
  ]);

  const [averageEquations, setAverageEquations] = useState([
    '16x + 3 = 3x - 2',
    '23x + 2 = 13x - 26',
    '5x - 2 = 2x + 9',
    '32x - 11 = 16 + 47x',
    '75x - 42 + 25x = 6x',
  ]);
  const [difficultEquations, setDifficultEquations] = useState([
    '2(3x - 5) = 3(4x + 2)',
    '4(2x - 1) = 2(3x - 8)',
    '7(x - 1) = -5(x + 5)',
    '10x + 5(2x-3) = 42x',
    '8(3x + 6) = 3(2 - 32x)',
  ]);

  //FOR SKELETON
  const [skeletonState, setSkeletonState] = useState(true);

  useEffect(() => {
    const onPageLoad = () => {
      setTimeout(hideNavbar, 500);

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
        <LoadingStudent />
      </div>
      <section
        className={` averageScreen:h-full xs:h-screen overflow-y-auto
                          ${skeletonState ? 'hidden' : ''}`}
      >
        {/* <input type="text" value={result} className="w-full"></input>*/}
        <div className="hdScreen:scale-[100%] semihdScreen:scale-[90%] laptopScreen:scale-[77.5%] averageScreen:scale-[75%] hdScreen:-mt-6 semihdScreen:-mt-8 laptopScreen:-mt-12 averageScreen:-mt-16 mx-auto lg:w-full averageScreen:min-h-[calc(100vh-5.5rem)]  flex items-center justify-center   select-none ">
          <div className="">
            <div className="  pt-10 rounded-6xl  border-l-12 border-b-12 border-gray-600/60 bg-gradient-to-t from-gray-200 via-white to-white border-r-12 border-r-gray-300/80 shadow-2xl shadow-yellow-400 overflow-hidden">
              <div className="px-10   rounded-4xl  mx-auto ">
                <div className="grid grid-rows-3 mx-auto sm:text-center  ">
                  <p className=" lg:text-4xl md:text-3xl sm:text-xl xs:text-lg font-semibold leading-none text-center ">
                    Select the session difficulty level
                  </p>
                </div>
                <div className="w-full grid gap-x-[1rem] lg:grid-cols-3 -mt-12 select-none">
                  <button
                    name="easy"
                    onClick={easyType}
                    className={` w-full transform transition duration-500 hover:scale-95  ${
                      option == 'easy' ? 'scale-95 ' : 'scale-90'
                    }`}
                  >
                    <div className="relative h-12 w-20 m-auto bg-gray-400 rounded-tl-full rounded-tr-full border-l-4 border-l-gray-500 border-r-4 border-r-gray-300"></div>
                    <div className="relative -mt-9 h-9 w-12 pl-1 border-r-4 border-gray-500 m-auto bg-white rounded-tl-full rounded-tr-full "></div>

                    <div className="relative -mt-10">
                      <div className="relative rounded-5xl bg-gray-600 w-7/12 h-14 mx-auto mt-6 z-10 border-l-6 border-b-6 border-gray-700/80 border-r-6 border-r-gray-500 overflow-hidden"></div>
                      <div
                        className={`relative  hover:shadow-xl transform transition duration-500 hover:text-green-500 hover:shadow-green-400 -mt-10 bg-mainBGBrown rounded-4xl border-l-8 border-b-8 border-yellow-700 border-r-8 border-r-brTwo shadow-md  pl-8 pr-8 py-6 pb-12 ${
                          option == 'easy'
                            ? 'shadow-xl shadow-green-500 text-green-500'
                            : ' shadow-yellow-900/90 text-gray-700'
                        }`}
                      >
                        <div className=" border-l-4 border-b-4 border-gray-600/60 border-r-4 border-r-gray-300/80 shadow-md shadow-yellow-800 ">
                          <div className="bg-white border-b-2 border-black/70   pt-6 pb-2">
                            <p className=" lg:text-3xl md:text-3xl sm:text-lg  xs:text-base left-0 right-0 font-bold leading-none text-center text-white">
                              EASY
                            </p>
                            <p className="absolute lg:text-3xl md:text-3xl sm:text-lg  xs:text-base z-10 left-0 right-0 lg:top-[47px] md:top-[47px] sm:top-[47.5px] xs:top-[47.5px] font-bold leading-none  text-center">
                              EASY
                            </p>
                            <p className="absolute lg:text-3xl md:text-3xl sm:text-lg  xs:text-base pt-0.5 text-gray-800/60 left-0 right-0 lg:top-[47px] md:top-[47px] sm:top-[47.5px] xs:top-[47px] font-bold leading-none  text-center">
                              EASY
                            </p>
                          </div>
                          <div className="text-black/80">
                            {easyEquations.map((string, index) => ({
                              ...(string.length <= 22 ? (
                                <div
                                  key={index}
                                  className="bg-white grid grid-cols-4 text-left border-b-2 border-black/70 "
                                >
                                  <div className="rounded-full border-3  border-black/80 h-9 w-9 m-auto text-center lg:text-lg md:text-lg font-semibold">
                                    {index + 1}
                                  </div>
                                  <div className="col-span-3">
                                    <p className="w-full  rounded lg:text-1.5xl md:text-1.5xl sm:text-base  py-3">
                                      {string}
                                      {'\u00A0'}
                                      {'\u00A0'}
                                      {'\u00A0'}
                                      {'\u00A0'}
                                      {'\u00A0'}
                                      {'\u00A0'}
                                      {'\u00A0'}
                                      {'\u00A0'}
                                      {'\u00A0'}
                                      {'\u00A0'}
                                      {'\u00A0'}
                                      {'\u00A0'}
                                      {'\u00A0'}
                                      {'\u00A0'}
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                <div
                                  key={index}
                                  className="bg-white grid grid-cols-4 text-left border-b-2 border-black/70"
                                >
                                  <div className="rounded-full border-3  border-black/80 h-9 w-9 m-auto text-center lg:text-lg md:text-lg font-semibold">
                                    {index + 1}
                                  </div>
                                  <div className="col-span-3">
                                    <p className="w-full  rounded lg:text-1.5xl md:text-1.5xl sm:text-base  py-3">
                                      {string}
                                    </p>
                                  </div>
                                </div>
                              )),
                            }))}
                          </div>
                          <div className="bg-white py-4"></div>
                        </div>
                      </div>
                    </div>
                    <div
                      id="option_1"
                      className="invisible absolute w-24 h-24 -right-4 -bottom-4 border-white/70 border-6 rounded-full bg-gray-300 z-10 overflow-hidden "
                    >
                      <div className="mx-auto pt-4  bg-green-500 h-full">
                        <svg
                          className="mx-auto h-14 w-14 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {' '}
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    </div>
                  </button>
                  {/*  </form> */}

                  {/*<!--Average-->*/}

                  <button
                    name="average"
                    onClick={averageType}
                    className={` w-full transform transition duration-500 hover:scale-95  ${
                      option == 'average' ? 'scale-95' : 'scale-90'
                    }`}
                  >
                    <div className="relative h-12 w-20 m-auto bg-gray-400 rounded-tl-full rounded-tr-full border-l-4 border-l-gray-500 border-r-4 border-r-gray-300"></div>
                    <div className="relative -mt-9 h-9 w-12 pl-1 border-r-4 border-gray-500 m-auto bg-white rounded-tl-full rounded-tr-full "></div>

                    <div className="relative -mt-10">
                      <div className="relative rounded-5xl bg-gray-600 w-7/12 h-14 mx-auto mt-6 z-10 border-l-6 border-b-6 border-gray-700/80 border-r-6 border-r-gray-500 overflow-hidden"></div>
                      <div
                        className={`relative -mt-10 transform transition duration-500 hover:shadow-xl hover:text-yellow-500 hover:shadow-yellow-400 bg-mainBGBrown rounded-4xl border-l-8 border-b-8 border-yellow-700 border-r-8 border-r-brTwo shadow-md pl-8 pr-8 py-6 pb-12 ${
                          option == 'average'
                            ? 'shadow-xl shadow-yellow-500 text-yellow-500'
                            : ' shadow-yellow-900/90 text-gray-700'
                        }`}
                      >
                        <div className="border-l-4 border-b-4 border-gray-600/60 border-r-4 border-r-gray-300/80 shadow-md shadow-yellow-800">
                          <div className="bg-white border-b-2 border-black/70 py-4">
                            <p className=" lg:text-3xl md:text-3xl sm:text-lg  xs:text-base left-0 right-0 font-bold leading-none  text-center text-white">
                              AVERAGE
                            </p>
                            <p className="absolute lg:text-3xl md:text-3xl sm:text-lg  xs:text-base z-10 left-0 right-0 lg:top-[47px] md:top-[47px] sm:top-[47.5px] xs:top-[47.5px]  font-bold leading-none text-center">
                              AVERAGE
                            </p>
                            <p className="absolute lg:text-3xl md:text-3xl sm:text-lg  xs:text-base pt-0.5 text-gray-800/60 left-0 right-0 lg:top-[47px] md:top-[47px] sm:top-[47.5px] xs:top-[47px]  text-xl font-bold leading-none text-center">
                              AVERAGE
                            </p>
                          </div>
                          <div className="text-black/80">
                            {averageEquations.map((string, index) => ({
                              ...(string.length <= 22 ? (
                                <div
                                  key={index}
                                  className="bg-white grid grid-cols-4 text-left border-b-2 border-black/70"
                                >
                                  <div className="rounded-full border-3  border-black/80 h-9 w-9 m-auto text-center lg:text-lg md:text-lg font-semibold">
                                    {index + 1}
                                  </div>
                                  <div className="col-span-3">
                                    <p className="w-full  rounded lg:text-1.5xl md:text-1.5xl sm:text-base  py-3">
                                      {string}
                                      {'\u00A0'}
                                      {'\u00A0'}
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                <div
                                  key={index}
                                  className="bg-white grid grid-cols-4 text-left border-b-2 border-black/70"
                                >
                                  <div className="rounded-full border-3  border-black/80 h-9 w-9 m-auto text-center lg:text-lg md:text-lg font-semibold">
                                    {index + 1}
                                  </div>
                                  <div className="col-span-3">
                                    <p className="w-full  rounded lg:text-1.5xl  md:text-1.5xl sm:text-base  py-3">
                                      {string}
                                    </p>
                                  </div>
                                </div>
                              )),
                            }))}
                          </div>
                          <div className="bg-white py-4"></div>
                        </div>
                      </div>
                    </div>
                    <div
                      id="option_2"
                      className="invisible absolute w-24 h-24 -right-4 -bottom-4 border-white/70 border-6 rounded-full bg-gray-300 z-10 overflow-hidden"
                    >
                      <div className="m-auto pt-4 bg-yellow-500 h-full">
                        <svg
                          className="mx-auto h-14 w-14 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {' '}
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    </div>
                  </button>

                  {/*<!--DIFFICULT-->*/}

                  <button
                    name="difficult"
                    onClick={difficultType}
                    className={`w-full transform transition duration-500 hover:scale-95  ${
                      option == 'difficult' ? 'scale-95 ' : 'scale-90'
                    }`}
                  >
                    <div className="relative h-12 w-20 m-auto bg-gray-400 rounded-tl-full rounded-tr-full border-l-4 border-l-gray-500 border-r-4 border-r-gray-300"></div>
                    <div className="relative -mt-9 h-9 w-12 pl-1 border-r-4 border-gray-500 m-auto bg-white rounded-tl-full rounded-tr-full "></div>

                    <div className="relative -mt-10">
                      <div className="relative rounded-5xl bg-gray-600 w-7/12 h-14 mx-auto mt-6 z-10 border-l-6 border-b-6 border-gray-700/80 border-r-6 border-r-gray-500 overflow-hidden"></div>
                      <div
                        className={`relative -mt-10  transform transition duration-500 hover:shadow-xl hover:text-red-500 hover:shadow-red-500 bg-mainBGBrown rounded-4xl border-l-8 border-b-8 border-yellow-700 border-r-8 border-r-brTwo shadow-md  pl-8 pr-8 py-6 pb-12 ${
                          option == 'difficult'
                            ? 'shadow-xl shadow-red-500 text-red-500'
                            : ' shadow-yellow-900/90 text-gray-700'
                        }`}
                      >
                        <div className="border-l-4 border-b-4 border-gray-600/60 border-r-4 border-r-gray-300/80 shadow-md shadow-yellow-800 ">
                          <div className="bg-white border-b-2 border-black/70 py-4">
                            <p className="lg:text-3xl md:text-3xl sm:text-lg  xs:text-base left-0 right-0 font-bold leading-none text-center text-white">
                              DIFFICULT
                            </p>
                            <p className="absolute lg:text-3xl md:text-3xl sm:text-lg  xs:text-base z-10 left-0 right-0 lg:top-[47px] md:top-[47px] sm:top-[47.5px] xs:top-[47.5px]  font-bold leading-none text-center">
                              DIFFICULT
                            </p>
                            <p className="absolute lg:text-3xl md:text-3xl sm:text-lg  xs:text-base pt-0.5 text-gray-800/60 left-0 right-0 lg:top-[47px] md:top-[47px] sm:top-[47.5px] xs:top-[47px]  text-xl font-bold leading-none text-center">
                              DIFFICULT
                            </p>
                          </div>
                          <div className="text-black/80">
                            <div className="bg-white grid grid-cols-4 text-left border-b-2 border-black/70">
                              <div className="rounded-full border-3 border-black/80 h-9 w-9 m-auto text-center lg:text-lg md:text-lg font-semibold">
                                1
                              </div>
                              <div className="col-span-3">
                                <p className="w-full  rounded lg:text-1.5xl  md:text-1.5xl sm:text-base py-3">
                                  2(3x - 5) = 3(4x + 2)
                                </p>
                              </div>
                            </div>
                            <div className="bg-white grid grid-cols-4 text-left border-b-2 border-black/70">
                              <div className="rounded-full border-3 border-black/80  h-9 w-9 m-auto text-center text-lg font-semibold">
                                2
                              </div>
                              <div className="col-span-3">
                                <p className="w-full  rounded lg:text-1.5xl  md:text-1.5xl sm:text-base  py-3">
                                  4(2x - 1) = 2(3x - 8)
                                </p>
                              </div>
                            </div>
                            <div className="bg-white grid grid-cols-4 text-left border-b-2 border-black/70">
                              <div className="rounded-full border-3 border-black/80  h-9 w-9 m-auto text-center text-lg font-semibold">
                                3
                              </div>
                              <div className="col-span-3">
                                <p className="w-full  rounded lg:text-1.5xl  md:text-1.5xl sm:text-base  py-3">
                                  7(x - 1) = -5(x + 5)
                                </p>
                              </div>
                            </div>
                            <div className="bg-white grid grid-cols-4 text-left border-b-2 border-black/70">
                              <div className="rounded-full border-3 border-black/80  h-9 w-9 m-auto text-center text-lg font-semibold">
                                4
                              </div>
                              <div className="col-span-3">
                                <p className="w-full  rounded lg:text-1.5xl  md:text-1.5xl sm:text-base  py-3">
                                  10x + 5(2x-3) = 42x
                                </p>
                              </div>
                            </div>
                            <div className="bg-white grid grid-cols-4 text-left border-b-2 border-black/70">
                              <div className="rounded-full border-3 border-black/80  h-9 w-9 m-auto text-center text-lg font-semibold">
                                5
                              </div>
                              <div className="col-span-3">
                                <p className="w-full  rounded lg:text-1.5xl  md:text-1.5xl sm:text-base  py-3">
                                  8(3x + 6) = 3(2 - 32x)
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="bg-white py-4"></div>
                        </div>
                      </div>
                    </div>
                    <div
                      id="option_3"
                      className="invisible absolute w-24 h-24 -right-4 -bottom-4 border-white/70 border-6 rounded-full bg-gray-300 z-10 overflow-hidden"
                    >
                      <div className="m-auto pt-4 bg-red-500 h-full">
                        <svg
                          className="mx-auto h-14 w-14 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {' '}
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    </div>
                  </button>
                </div>
                <div className="w-full mx-auto text-center pt-8 pb-10">
                  <button
                    onClick={picked ? pickDifficulty : undefined}
                    className={`inline-flex items-center justify-center lg:text-xl md:text-xl sm:text-lg xs:text-base rounded-full h-12 lg:w-52 md:w-40 sm:w-36 xs:w-24 font-medium tracking-wide  shadow-md   
                      ${
                        !picked
                          ? 'aria-disabled: text-gray-100 bg-gray-500/50 cursor-help'
                          : 'text-white bg-lime-600 hover:bg-lime-700 focus:shadow-outline focus:outline-none hover:-translate-y-0.5 ease-in-out transition duration-200 transform drop-shadow-[0_3px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_3px_0px_rgba(0,0,0,0.6)]'
                      }`}
                    {...(!picked
                      ? {
                          title:
                            'Select difficulty first in order to continue.',
                        }
                      : {})}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <DifficultyModal
        onClose={handleOnCloseModal}
        visible={showModal}
        onContinue={handleOnContinueModal}
      />
      <LoadingSpinner visible={showLoading} />
    </>
  );
}
