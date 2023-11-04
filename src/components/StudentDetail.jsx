import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

import { FaArrowRightToBracket } from 'react-icons/fa6';

import { mkConfig, generateCsv, download } from 'export-to-csv';

import {
  BsCaretUpFill,
  BsArrowDownSquareFill,
  BsFileEarmarkArrowDownFill,
} from 'react-icons/bs';

import StudentDetailSkeleton from './StudentDetailSkeleton';

import { BsClipboard2X } from 'react-icons/bs';
import LoadingSpinner from './LoadingSpinner';

import StorageData from './StorageData';
import SecureStorageData from './SecureStorageData';

export default function StudentDetail() {
  document.body.style.height = '100vh';
  const navigate = useNavigate();

  useEffect(() => {
    setTabIndex();

    window.addEventListener('focus', setTabIndex);
    function setTabIndex() {
      window.localStorage.setItem('CURRENT_TAB_INDEX', 1);
    }
  }, []);

  useEffect(() => {
    var data1 = StorageData.localStorageRAW('CURRENT_SECTION');
    if (data1 === null) navigate('/HomePageTeacher');

    var data2 = StorageData.sessionStorageRAW('CURRENT_ACCOUNT');
    if (data2 === null) navigate('/ClassList');

    var data3 = StorageData.sessionStorageRAW('CURRENT_EMAIL');
    if (data3 === null) navigate('/ClassList');

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
    } else if (account == 'Student') {
      navigate('/Homepage');
    } else if (account == '' || account === null || account === undefined) {
      navigate('/LoginPage');
    }
  });

  const [showLoading, setShowLoading] = useState(false);
  const [tableLoader, setTableLoader] = useState(false);
  var highestTimeoutId = setTimeout(';');

  var currentAccount = '';
  var currentEmail = '';

  useEffect(() => {
    const data1 = StorageData.sessionStorageRAW('CURRENT_EMAIL');
    const data2 = StorageData.sessionStorageRAW('CURRENT_ACCOUNT');
    if (data1 !== null) currentEmail = JSON.parse(data1);
    if (data2 !== null) currentAccount = JSON.parse(data2);
  }, []);

  const [accountDetail, setAccountDetail] = useState([]);
  const [accountHistory, setAccountHistory] = useState([]);
  const [tallyEasy, countEasy] = useState();
  const [tallyAverage, countAverage] = useState();
  const [tallyDifficult, countDifficult] = useState();

  const [totalUnanswered, setTotalUnanswered] = useState();
  const [totalAnswered, setTotalAnswered] = useState();
  const [accuracyRate, setAccuracy] = useState();

  function getAccountDetail() {
    setSkeletonState(true);
    axios
      .get(
        `http://localhost:80/Prototype-Vite/my-project/api/studentDetail/${currentEmail}`
      )
      .then(function (response) {
        console.log(response.data);
        setAccountDetail(response.data);

        var result = Object.values(response.data);

        var keys = [];
        for (var k in result[0]) keys.push(result[0][k]);

        var firstName = keys[1];
        document.title = keys[3] + '-' + firstName[0] + ' : Report Card';

        setSkeletonState(false);
        setTableLoader(true);
        axios
          .get(
            `http://localhost:80/Prototype-Vite/my-project/api/studentHistory/${currentAccount}`
          )
          .then(function (response) {
            console.log(response.data);
            setAccountHistory(response.data);
            setTableLoader(false);
          })
          .catch(function (error) {
            setTableLoader(false);
          });
      });
  }

  useEffect(() => {
    getAccountDetail();
  }, []);

  useEffect(() => {
    countSessions();
  });

  function countSessions() {
    let easy = 0;
    let average = 0;
    let difficult = 0;
    let totalScore = 0;
    let totalAnswered = 0;
    let totalAbandoned = 0;
    let totalQuestions = 0;
    let accuracy = 0;

    accountHistory.map(function (history) {
      if (history.SessionType === 'Easy') {
        easy++;
      } else if (history.SessionType === 'Average') {
        average++;
      } else if (history.SessionType === 'Difficult') {
        difficult++;
      }
      // Each session have 20 questions or might change depends.
      totalAnswered += parseInt(history.Answered);
      totalAbandoned += parseInt(history.Abandoned);
      totalScore += parseInt(history.Score);
    });
    totalQuestions = totalAnswered + totalAbandoned;

    accuracy = (totalAnswered / totalQuestions) * 100;
    //totalAbandoned = totalAbandoned - totalScore;
    accuracy = Math.round(accuracy * 100 + Number.EPSILON) / 100;
    setAccuracy(accuracy);
    countEasy(easy);
    countAverage(average);
    countDifficult(difficult);
    setTotalAnswered(totalAnswered);
    setTotalUnanswered(totalAbandoned);
    //console.log(easy);
    //console.log(average);
    //console.log(difficult);
  }

  // GO BACK FUNCTION
  const ClassListPage = () => {
    setTimeout(proceed, 1);
    function proceed() {
      navigate(-1);
    }
  };

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

  // Converts your Array<Object> to a CsvOutput string based on the configs

  const exportAll = e => {
    //var sessionID = e.currentTarget.id;
    var account = StorageData.sessionStorageJSON('CURRENT_ACCOUNT');
    var sessionDatabase = account;

    var csvConfig = mkConfig({
      useKeysAsHeaders: true,
      filename: account + ' - (ALL LOGS)',
    });

    setShowLoading(true);
    axios
      .post(
        `http://localhost:80/Prototype-Vite/my-project/api/exportAll/${sessionDatabase}`
      )
      .then(function (response) {
        console.log(response.data);
        const csv = generateCsv(csvConfig)(response.data);
        download(csvConfig)(csv);

        setShowLoading(false);
      })
      .catch(function (error) {
        setShowLoading(false);
      });
  };

  const exportRow = e => {
    var sessionID = e.currentTarget.id;
    var account = StorageData.sessionStorageJSON('CURRENT_ACCOUNT');
    var sessionDatabase = account + sessionID;

    var equationType = document.getElementById('type' + sessionID).textContent;
    equationType = equationType.replace(/:/g, ';');
    var csvConfig = mkConfig({
      useKeysAsHeaders: true,
      filename: account + ' - (' + equationType + ')',
    });

    setShowLoading(true);
    axios
      .post(
        `http://localhost:80/Prototype-Vite/my-project/api/exportRow/${sessionDatabase}`
      )
      .then(function (response) {
        const csv = generateCsv(csvConfig)(response.data);
        download(csvConfig)(csv);

        setShowLoading(false);
      })
      .catch(function (error) {
        setShowLoading(false);
      });
  };

  //FOR SKELETON
  const [skeletonState, setSkeletonState] = useState(true);

  return (
    <>
      <div className={`${!skeletonState ? 'hidden' : ''}`}>
        <StudentDetailSkeleton />
      </div>
      <div
        className={`bg-gradient-to-t from-[#e2e2e2] via-[#f1f1f1] to-[#ffffff] h-screen overflow-y-auto 
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
            className={`flex md:-mt-0 xs:-mt-1 border-b-2 text-gray-600 lg:text-4xl font-bold
            ${
              logoHeight == 94.5
                ? 'max-h-[94.5px]'
                : logoHeight == 67.5
                ? 'max-h-[67.5px]'
                : ''
            }`}
          >
            <BsCaretUpFill
              onClick={ClassListPage}
              title="Go back"
              className="hidden cursor-pointer text-gray-100 bg-gray-400 averageScreen:border-4 xs:border-2 border-gray-400 averageScreen:mr-3 xs:mr-1 hover:text-white hover:bg-gray-600 hover:border-gray-600 rounded-full averageScreen:pb-1 xs:pb-0.5 rotate-[270deg] averageScreen:mt-3.5 averageScreen:text-[2.25rem] xs:mt-0.5 xs:text-[1.25rem]"
            />
            <span className="">Report Details</span>
          </div>
          <div className="p-4 overflow-hidden w-full ">
            <div className="grid xs:grid-cols-2">
              <div className="">
                {accountDetail.map((account, index) => (
                  <div key={index}>
                    <p className="hdScreen:text-3xl semihdScreen:text-3xl laptopScreen:text-3xl averageScreen:text-2.5xl xs:text-base text-gray-700  font-bold leading-4 mb-1">
                      {account.MiddleName != '' ? (
                        <>
                          {account.GivenName +
                            ' ' +
                            account.MiddleName[0] +
                            '.' +
                            ' ' +
                            account.LastName}
                        </>
                      ) : (
                        <>{account.GivenName + ' ' + account.LastName}</>
                      )}
                    </p>
                    <p className="hdScreen:text-base semihdScreen:text-base laptopScreen:text-base averageScreen:text-base xs:text-xs text-gray-700 leading-4 averageScreen:pb-4 xs:pb-1">
                      {account.Email}
                    </p>
                  </div>
                ))}

                <p className="hdScreen:text-lg semihdScreen:text-base laptopScreen:text-base averageScreen:text-base xs:text-xs text-gray-700 font-medium leading-4 hdScreen:mb-3 semihdScreen:mb-2 laptopScreen:mb-1 averageScreen:mb-0.5">
                  Answered Questions:{' '}
                  <span id="correct" className="font-normal">
                    {totalAnswered}
                  </span>
                </p>
                <p className="hdScreen:text-lg semihdScreen:text-base laptopScreen:text-base averageScreen:text-base xs:text-xs text-gray-700 font-medium leading-4 hdScreen:mb-3 semihdScreen:mb-2 laptopScreen:mb-1 averageScreen:mb-0.5">
                  Abandoned Questions:{' '}
                  <span id="incorrect" className="font-normal">
                    {totalUnanswered}
                  </span>
                </p>
                <p className="hdScreen:text-lg semihdScreen:text-base laptopScreen:text-base averageScreen:text-base xs:text-xs text-gray-700 font-medium leading-4 hdScreen:mb-3 semihdScreen:mb-2 laptopScreen:mb-1 averageScreen:mb-0.5">
                  Accuracy Rate:{' '}
                  <span id="accuracy" className="font-normal">
                    {accuracyRate + '%'}
                  </span>
                </p>
              </div>
              <div className="grid grid-cols-3 text-center averageScreen:mb-2 ">
                <div>
                  <p className="hdScreen:text-2xl semihdScreen:text-xl laptopScreen:text-xl averageScreen:text-2xl sm:text-lg xs:text-base text-gray-700 font-medium leading-4 averageScreen:mb-5 xs:mb-1">
                    Easy
                  </p>
                  <div className="hdScreen:w-32 hdScreen:h-32 semihdScreen:w-[7.5rem] semihdScreen:h-[7.5rem]  laptopScreen:w-[7rem] laptopScreen:h-[7rem] averageScreen:w-[6.5rem] averageScreen:h-[6.5rem] xs:w-16 xs:h-16 bg-green-500 rounded-full text-center flex items-center justify-center  mx-auto ">
                    <span className="text-green-100 hdScreen:text-6xl semihdScreen:text-6xl laptopScreen:text-5xl averageScreen:text-5xl sm:text-2xl xs:text-xl">
                      {tallyEasy}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="hdScreen:text-2xl semihdScreen:text-xl laptopScreen:text-xl averageScreen:text-2xl sm:text-lg xs:text-base text-gray-700 font-medium leading-4 averageScreen:mb-5 xs:mb-1">
                    Average
                  </p>
                  <div className="hdScreen:w-32 hdScreen:h-32 semihdScreen:w-[7.5rem] semihdScreen:h-[7.5rem]  laptopScreen:w-[7rem] laptopScreen:h-[7rem] averageScreen:w-[6.5rem] averageScreen:h-[6.5rem] xs:w-16 xs:h-16 bg-yellow-500 rounded-full text-center flex items-center justify-center mx-auto">
                    <span className="text-yellow-100 hdScreen:text-6xl semihdScreen:text-6xl laptopScreen:text-5xl averageScreen:text-5xl sm:text-2xl xs:text-xl">
                      {tallyAverage}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="hdScreen:text-2xl semihdScreen:text-xl laptopScreen:text-xl averageScreen:text-2xl sm:text-lg xs:text-base text-gray-700 font-medium leading-4 averageScreen:mb-5 xs:mb-1">
                    Difficult
                  </p>
                  <div className="hdScreen:w-32 hdScreen:h-32 semihdScreen:w-[7.5rem] semihdScreen:h-[7.5rem]  laptopScreen:w-[7rem] laptopScreen:h-[7rem] averageScreen:w-[6.5rem] averageScreen:h-[6.5rem] xs:w-16 xs:h-16 bg-red-500 rounded-full text-center flex items-center justify-center mx-auto">
                    <span className="text-red-100 hdScreen:text-6xl semihdScreen:text-6xl laptopScreen:text-5xl averageScreen:text-5xl sm:text-2xl xs:text-xl">
                      {tallyDifficult}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <hr></hr>

            <div className="flex items-center justify-between">
              <p className="mt-2  hdScreen:text-4xl semihdScreen:text-3xl laptopScreen:text-2xl averageScreen:text-2xl sm:text-2xl text-gray-700 font-semibold leading-4 hdScreen:mb-7 semihdScreen:mb-5 laptopScreen:mb-3 averageScreen:mb-2">
                History
              </p>
              {accountHistory.length > 0 ? (
                <button
                  onClick={exportAll}
                  className=" mr-3 lg:px-7 semihdScreen:py-2 lg:py-1 xs:px-3 xs:py-1 lg:mt-0 xs:mt-1  flex items-center bg-blue-500/90 hover:bg-blue-600 rounded-md whitespace-nowrap overflow-hidden lg:text-lg md:text-base sm:text-sm xs:text-xs text-white hover:text-white font-semibold"
                >
                  Export All
                  <FaArrowRightToBracket className="rotate-90 ml-2" />
                </button>
              ) : (
                <></>
              )}
            </div>
            <div
              id="history"
              className="overflow-auto relative bg-gray-300/50 rounded-md mx-3 mt-2 hdScreen:min-h-[32rem] hdScreen:max-h-[32rem] semihdScreen:min-h-[24rem] semihdScreen:max-h-[24rem] laptopScreen:min-h-[15.7rem] laptopScreen:max-h-[15.7rem] averageScreen:min-h-[14rem] averageScreen:max-h-[14rem] xs:min-h-[14rem] xs:max-h-[14rem] style-2 "
            >
              <div
                className={`-mt-4 absolute flex-col items-center justify-center h-full w-full hdScreen:scale-100 semihdScreen:scale-90 laptopScreen:scale-85 averageScreen:scale-80 md:scale-75 sm:scale-70 xs:scale-60
                 ${tableLoader ? 'flex' : 'hidden'}`}
              >
                <div className="loader border-8 border-[#89ce1a]"></div>
                <p className="pt-2 hdScreen:text-lg semihdScreen:text-lg laptopScreen:text-base averageScreen:text-base sm:text-sm xs:text-xs ">
                  Fetching Data...
                </p>
              </div>

              <div className={`${tableLoader ? 'hidden' : ''}`}>
                {accountHistory.length > 0 ? (
                  <div>
                    {accountHistory.map((history, index) => (
                      <div key={index}>
                        <div
                          className={`grid lg:grid-cols-12 xs:grid-cols-4 rounded-l-md xs:h-12 averageScreen:-mt-0 xs:-mt-0 shadow relative hover:bg-opacity-50 p-3  ${
                            history.SessionType === 'Easy'
                              ? 'bg-green-500'
                              : history.SessionType === 'Average'
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                          }`}
                        >
                          <div className="lg:col-span-3">
                            <p
                              id={'type' + history.SessionID}
                              className="lg:text-[1.75rem] text-gray-100 font-medium leading-4 mt-1"
                            >
                              {history.SessionType}
                              <span className="lg:text-sm sm:text-xs xs:text-xs text-white font-normal ">
                                {'\u00A0\u00A0' + history.TimeStamp}
                              </span>
                            </p>
                          </div>
                          <div className="laptopScreen:col-span-6 averageScreen:col-span-5 text-right lg:-mt-0 xs:-mt-0">
                            <span className="lg:text-lg sm:text-sm xs:text-xs text-white font-normal">
                              Score: {history.Score + '/20'}
                            </span>
                          </div>
                          <div className="lg:col-span-2 averageScreen:text-center xs:text-right lg:-mt-0  xs:-mt-0">
                            <span className="lg:text-lg sm:text-sm xs:text-xs text-white font-normal">
                              Time: {history.TimeSpent}
                            </span>
                          </div>
                          <div className="laptopScreen:col-span-1 averageScreen:col-span-2 lg:block text-right averageScreen:ml-0 sm:ml-8 xs:ml-4">
                            <div
                              id={history.SessionID}
                              onClick={exportRow}
                              className={`div-button pt-0.5 pb-1 sm:mt-0 xs:mt-1 cursor-pointer flex items-center justify-center border-2   rounded-md whitespace-nowrap overflow-hidden lg:text-base sm:text-sm xs:text-xs text-gray-200 hover:text-white font-semibold
                              ${
                                history.SessionType === 'Easy'
                                  ? 'bg-green-600 border-green-600/50 '
                                  : history.SessionType === 'Average'
                                  ? 'bg-yellow-600 border-yellow-600/50 '
                                  : 'bg-red-600 border-red-600/50'
                              }
                              `}
                            >
                              <span className="">Export</span>
                              <BsFileEarmarkArrowDownFill className="averageScreen:ml-2 xs:ml-1   " />
                            </div>
                          </div>
                        </div>
                        <hr></hr>
                        <hr></hr>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="text-gray-700 text-center -mt-4 absolute flex flex-col items-center justify-center h-full w-full hdScreen:scale-100 semihdScreen:scale-90 laptopScreen:scale-85 averageScreen:scale-80 md:scale-75 sm:scale-70 xs:scale-60">
                      <BsClipboard2X className="w-full text-[4rem]" />
                      <p className="py-2 font-semibold semihdScreen:text-xl sm:text-lg xs:text-base">
                        No session history
                      </p>
                      <p className="sm:text-lg xs:text-sm">
                        This account haven't start any sessions.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      <LoadingSpinner visible={showLoading} />
    </>
  );
}
