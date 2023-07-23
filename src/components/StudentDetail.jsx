import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

import { BsCaretUpFill } from 'react-icons/bs';

export default function StudentDetail() {
  document.body.style.height = '100vh';
  const navigate = useNavigate();

  //FOR LINKS/NAVBAR/BREADCRUMBS
  const [pageList, setPageList] = useState([]);
  const [pageLink, setPageLink] = useState([]);

  useEffect(() => {
    setPage();

    window.addEventListener('focus', setPage);
    function setPage() {
      let page = ['Home', 'Section List', 'Class List', 'Student Details'];
      let link = [
        '/AdminHomepage',
        '/SectionList',
        '/ClassList',
        '/StudentDetail',
      ];
      setPageList(page);
      setPageLink(link);
      window.localStorage.setItem('NAVBAR_PAGE', JSON.stringify(pageList));
      window.localStorage.setItem('NAVBAR_PAGE_LINK', JSON.stringify(pageLink));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('NAVBAR_PAGE', JSON.stringify(pageList));
  }, [pageList]);

  useEffect(() => {
    window.localStorage.setItem('NAVBAR_PAGE_LINK', JSON.stringify(pageLink));
  }, [pageLink]);

  var currentAccount = '';
  var currentEmail = '';

  useEffect(() => {
    const data1 = window.localStorage.getItem('CURRENT_EMAIL');
    const data2 = window.localStorage.getItem('CURRENT_ACCOUNT');
    currentEmail = JSON.parse(data1);
    currentAccount = JSON.parse(data2);
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
    axios
      .get(
        `http://localhost:80/Prototype-Vite/my-project/api/studentDetail/${currentEmail}`
      )
      .then(function (response) {
        console.log(response.data);
        setAccountDetail(response.data);
      });

    axios
      .get(
        `http://localhost:80/Prototype-Vite/my-project/api/studentHistory/${currentAccount}`
      )
      .then(function (response) {
        console.log(response.data);
        setAccountHistory(response.data);
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
    let totalSkip = 0;
    let accuracy = 0;

    accountHistory.map(function (history) {
      if (history.SessionType === 'Easy') {
        easy++;
        console.log('YAHOO!');
      } else if (history.SessionType === 'Average') {
        average++;
      } else if (history.SessionType === 'Difficult') {
        difficult++;
      }
      // Each session have 10 questions or might change depends.
      totalSkip += 20;
      totalScore += history.Score;
    });
    accuracy = (totalScore / totalSkip) * 100;
    totalSkip = totalSkip - totalScore;
    accuracy = Math.round(accuracy * 100 + Number.EPSILON) / 100;
    setAccuracy(accuracy);
    countEasy(easy);
    countAverage(average);
    countDifficult(difficult);
    setTotalAnswered(totalScore);
    setTotalUnanswered(totalSkip);
    //console.log(easy);
    //console.log(average);
    //console.log(difficult);
  }

  // GO BACK FUNCTION
  const ClassListPage = () => {
    setTimeout(proceed, 1);
    function proceed() {
      navigate('/ClassList');
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
      var width = window.localStorage.getItem('NAVBAR_TEACHER_WIDTH');
      setNavbarWidth(width);

      // Logo height
      var height = window.localStorage.getItem('NAVBAR_TEACHER_LOGO');
      setLogoHeight(height);
    }, 1);
  }

  function setWidth() {
    var width = window.localStorage.getItem('NAVBAR_TEACHER_WIDTH');
    setNavbarWidth(width);

    // Logo height
    var height = window.localStorage.getItem('NAVBAR_TEACHER_LOGO');
    setLogoHeight(height);
  }

  return (
    <>
      <div
        className={`bg-gradient-to-t from-[#e2e2e2] via-[#f1f1f1] to-[#ffffff] h-screen 
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
              className="cursor-pointer text-gray-100 bg-gray-400 border-4 border-gray-400 mr-3 hover:text-white hover:bg-gray-600 hover:border-gray-600 rounded-full pb-1 rotate-[270deg] mt-3.5 text-[2.25rem]"
            />
            <span className="">Report Details</span>
          </div>
          <div className="p-4 overflow-hidden w-full ">
            <div className="grid sm:grid-cols-1 lg:grid-cols-2">
              <div className="">
                {accountDetail.map(account => (
                  <>
                    <p className="hdScreen:text-3xl semihdScreen:text-3xl laptopScreen:text-2xl averageScreen:text-2xl xs:text-base text-gray-700  font-bold leading-4 mb-1">
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
                    <p className="hdScreen:text-base semihdScreen:text-base laptopScreen:text-sm averageScreen:text-sm xs:text-xs text-gray-700 leading-4">
                      {account.Email}
                    </p>
                  </>
                ))}
                <br></br>
                <p className="hdScreen:text-lg semihdScreen:text-base laptopScreen:text-base averageScreen:text-base xs:text-xs text-gray-700 font-medium leading-4 hdScreen:mb-3 semihdScreen:mb-2 laptopScreen:mb-1 averageScreen:mb-0.5">
                  Answered Equations:{' '}
                  <span id="correct" className="font-normal">
                    {totalAnswered}
                  </span>
                </p>
                <p className="hdScreen:text-lg semihdScreen:text-base laptopScreen:text-base averageScreen:text-base xs:text-xs text-gray-700 font-medium leading-4 hdScreen:mb-3 semihdScreen:mb-2 laptopScreen:mb-1 averageScreen:mb-0.5">
                  Abandoned Equations:{' '}
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
              <div className="grid grid-cols-3 text-center mb-2">
                <div>
                  <p className="hdScreen:text-2xl semihdScreen:text-xl laptopScreen:text-xl averageScreen:text-2xl sm:text-xl xs:text-base text-gray-700 font-medium leading-4 mb-5">
                    Easy
                  </p>
                  <div className="hdScreen:w-32 hdScreen:h-32 semihdScreen:w-[7.5rem] semihdScreen:h-[7.5rem]  laptopScreen:w-[7rem] laptopScreen:h-[7rem] averageScreen:w-[6.5rem] averageScreen:h-[6.5rem] sm:w-24 sm:h-24 bg-green-500 rounded-full text-center hdScreen:py-12 semihdScreen:py-10 laptopScreen:py-9 averageScreen:py-8  mx-auto ">
                    <span className="text-green-100 hdScreen:text-6xl semihdScreen:text-6xl laptopScreen:text-5xl averageScreen:text-5xl sm:text-4xl xs:text-2xl">
                      {tallyEasy}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="hdScreen:text-2xl semihdScreen:text-xl laptopScreen:text-xl averageScreen:text-2xl sm:text-xl xs:text-base text-gray-700 font-medium leading-4 mb-5">
                    Average
                  </p>
                  <div className="hdScreen:w-32 hdScreen:h-32 semihdScreen:w-[7.5rem] semihdScreen:h-[7.5rem]  laptopScreen:w-[7rem] laptopScreen:h-[7rem] averageScreen:w-[6.5rem] averageScreen:h-[6.5rem] sm:w-24 sm:h-24 bg-yellow-500 rounded-full text-center hdScreen:py-12 semihdScreen:py-10 laptopScreen:py-9 averageScreen:py-8   mx-auto">
                    <span className="text-yellow-100 hdScreen:text-6xl semihdScreen:text-6xl laptopScreen:text-5xl averageScreen:text-5xl sm:text-4xl xs:text-2xl">
                      {tallyAverage}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="hdScreen:text-2xl semihdScreen:text-xl laptopScreen:text-xl averageScreen:text-2xl sm:text-xl xs:text-base text-gray-700 font-medium leading-4 mb-5">
                    Difficult
                  </p>
                  <div className="hdScreen:w-32 hdScreen:h-32 semihdScreen:w-[7.5rem] semihdScreen:h-[7.5rem]  laptopScreen:w-[7rem] laptopScreen:h-[7rem] averageScreen:w-[6.5rem] averageScreen:h-[6.5rem] sm:w-24 sm:h-24 bg-red-500 rounded-full text-center hdScreen:py-12 semihdScreen:py-10 laptopScreen:py-9 averageScreen:py-8    mx-auto">
                    <span className="text-red-100 hdScreen:text-6xl semihdScreen:text-6xl laptopScreen:text-5xl averageScreen:text-5xl sm:text-4xl xs:text-2xl">
                      {tallyDifficult}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <hr></hr>

            <p className="mt-2 hdScreen:text-4xl semihdScreen:text-3xl laptopScreen:text-2xl averageScreen:text-2xl sm:text-2xl text-gray-700 font-semibold leading-4 hdScreen:mb-7 semihdScreen:mb-5 laptopScreen:mb-3 averageScreen:mb-2">
              History
            </p>
            <div
              id="history"
              className="overflow-auto bg-gray-300/80 rounded-md mx-3 mt-2 hdScreen:min-h-[32rem] hdScreen:max-h-[32rem] semihdScreen:min-h-[24rem] semihdScreen:max-h-[24rem] laptopScreen:min-h-[20rem] laptopScreen:max-h-[20rem] averageScreen:min-h-[18rem] averageScreen:max-h-[18rem] style-2 "
            >
              {accountHistory.map(history => (
                <>
                  <div
                    className={`grid lg:grid-cols-11 rounded-l-md xs:h-12 shadow relative  p-3  ${
                      history.SessionType === 'Easy'
                        ? 'bg-green-500'
                        : history.SessionType === 'Average'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                  >
                    <div className="lg:col-span-3">
                      <p className="lg:text-[1.75rem] text-gray-100 font-medium leading-4 mt-1">
                        {history.SessionType}
                        <span className="lg:text-sm sm:text-xs text-white font-normal ">
                          {'\u00A0\u00A0' + history.TimeStamp}
                        </span>
                      </p>
                    </div>
                    <div className="lg:col-span-6 text-right lg:-mt-0 xs:-mt-8">
                      <span className="lg:text-lg text-white font-normal">
                        Score: {history.Score + '/20'}
                      </span>
                    </div>
                    <div className="lg:col-span-2 text-right lg:-mt-0  xs:-mt-3">
                      <span className="lg:text-lg text-white font-normal">
                        Time: {history.TimeSpent}
                      </span>
                    </div>
                  </div>
                  <hr></hr>
                  <hr></hr>
                </>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
