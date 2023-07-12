import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

export default function StudentDetail() {
  document.body.style.height = '100vh';
  const navigate = useNavigate();

  //FOR LINKS/NAVBAR/BREADCRUMBS
  const [pageList, setPageList] = useState([]);
  const [pageLink, setPageLink] = useState([]);

  useEffect(() => {
    let page = ['Home', 'Section List', 'Class List', 'Student Detail'];
    let link = [
      '/AdminHomepage',
      '/SectionList',
      '/ClassList',
      '/StudentDetail',
    ];
    setPageList(page);
    setPageLink(link);
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

  return (
    <>
      <div className="my-10 lg:scale-100 md:scale-95 w-9/12 mx-auto lg:fixed top-1/1 left-0 right-0 place-items-center  p-6 rounded-10xl border-l-12 border-b-12 border-yellow-700 bg-mainBGBrown border-r-12 border-r-brTwo shadow-2xl shadow-yellow-400">
        <div className="overflow-hidden rounded-8xl bg-gradient-to-t from-gray-200 via-white to-white shadow-xl border-r-12 border-t-12 border-yellow-700 border-l-12 border-l-brTwo shadow-yellow-700 w-full h-full p-12 ">
          <div className="grid sm:grid-cols-1 lg:grid-cols-2">
            <div className="">
              {accountDetail.map(account => (
                <>
                  <p className="lg:text-4xl sm:text-2xl text-black font-bold leading-4 mb-5">
                    {account.GivenName +
                      ' ' +
                      account.MiddleName[0] +
                      '.' +
                      ' ' +
                      account.LastName}
                  </p>
                  <p className="lg:text-xl sm:text-md text-gray-800 leading-4">
                    {account.Email}
                  </p>
                </>
              ))}
              <br></br>
              <p className="lg:text-xl sm:text-md text-black font-medium leading-4 mb-3">
                Answered Equations:{' '}
                <span id="correct" className="font-normal">
                  18
                </span>
              </p>
              <p className="lg:text-xl sm:text-md text-black font-medium leading-4 mb-3">
                Unanswered Equations:{' '}
                <span id="incorrect" className="font-normal">
                  23
                </span>
              </p>
              <p className="lg:text-xl sm:text-md text-black font-medium leading-4 mb-3">
                Accuracy Rate:{' '}
                <span id="accuracy" className="font-normal"></span>
              </p>
            </div>
            <div className="grid grid-cols-3 text-center">
              <div>
                <p className="lg:text-3xl sm:text-xl text-black font-medium leading-4 mb-5">
                  Easy
                </p>
                <div className="lg:w-32 lg:h-32 sm:w-24 sm:h-24 bg-green-500 rounded-full text-center py-5 shadow-lg shadow-green-300 mx-auto ">
                  <span className="text-green-100 lg:text-6xl sm:text-4xl">
                    102
                  </span>
                </div>
              </div>
              <div>
                <p className="lg:text-3xl sm:text-xl text-black font-medium leading-4 mb-5">
                  Average
                </p>
                <div className="lg:w-32 lg:h-32 sm:w-24 sm:h-24 bg-yellow-500 rounded-full  text-center py-5 shadow-lg shadow-yellow-300 mx-auto">
                  <span className="text-yellow-100 lg:text-6xl sm:text-4xl">
                    2
                  </span>
                </div>
              </div>
              <div>
                <p className="lg:text-3xl sm:text-xl text-black font-medium leading-4 mb-5">
                  Difficult
                </p>
                <div className="lg:w-32 lg:h-32 sm:w-24 sm:h-24 bg-red-500 rounded-full  text-center py-5 shadow-lg shadow-red-300 mx-auto">
                  <span className="text-red-100 lg:text-6xl sm:text-4xl">
                    2
                  </span>
                </div>
              </div>
            </div>
          </div>
          <br></br>
          <hr></hr>
          <br></br>
          <p className="lg:text-4xl sm:text-2xl text-black font-semibold leading-4 mb-7">
            History
          </p>
          <div className="px-5 py-2">
            {accountHistory.map(history => (
              <>
                <div className="grid lg:grid-cols-11 rounded shadow relative bg-green-500 p-3 ">
                  <div className="lg:col-span-2">
                    <p className="lg:text-3xl text-green-100 font-medium leading-4 mt-1">
                      {history.SessionType}
                      <span className="lg:text-sm sm:text-xs underline text-white font-normal ">
                        {history.TimeStamp}
                      </span>
                      <span className="lg:text-sm sm:text-xs  text-white font-normal ">
                        {'\u00A0'} - 2:40 AM
                      </span>
                    </p>
                  </div>
                  <div className="lg:col-span-7 text-right">
                    <span className="lg:text-xl text-white font-normal">
                      Score: {history.Score + '/10'}
                    </span>
                  </div>
                  <div className="lg:col-span-2 text-right">
                    <span className="lg:text-xl text-white font-normal">
                      Time: {history.TimeSpent}
                    </span>
                  </div>
                </div>
                <hr></hr>
                <hr></hr>
              </>
            ))}

            <div className="grid lg:grid-cols-11 rounded shadow relative bg-green-500 p-3">
              <div className="lg:col-span-2">
                <p className="lg:text-3xl text-green-100 font-medium leading-4">
                  Easy{' '}
                  <span className="lg:text-sm sm:text-xs underline text-white font-normal">
                    May 21, 2023
                  </span>
                </p>
              </div>
              <div className="lg:col-span-7 text-right">
                <span className="lg:text-xl text-white font-normal">
                  Score: 10/10
                </span>
              </div>
              <div className="lg:col-span-2 text-right">
                <span className="lg:text-xl text-white font-normal">
                  Time: 00:15:02
                </span>
              </div>
            </div>
            <hr></hr>
            <hr></hr>
            <div className="grid lg:grid-cols-11 rounded shadow relative bg-yellow-500 p-3">
              <div className="lg:col-span-2">
                <p className="lg:text-3xl text-yellow-100 font-medium leading-4">
                  Average{' '}
                  <span className="lg:text-sm sm:text-xs underline text-white font-normal">
                    May 19, 2023
                  </span>
                </p>
              </div>
              <div className="lg:col-span-7 text-right">
                <span className="lg:text-xl text-white font-normal">
                  Score: 10/10
                </span>
              </div>
              <div className="lg:col-span-2 text-right">
                <span className="lg:text-xl text-white font-normal">
                  Time: 00:25:42
                </span>
              </div>
            </div>
            <hr></hr>
            <hr></hr>
            <div className="grid lg:grid-cols-11 rounded shadow relative bg-red-500 p-3">
              <div className="lg:col-span-2">
                <p className="lg:text-3xl text-red-100 font-medium leading-4">
                  Difficult{' '}
                  <span className="lg:text-sm sm:text-xs underline text-white font-normal">
                    May 17, 2023
                  </span>
                </p>
              </div>
              <div className="lg:col-span-7 text-right">
                <span className="lg:text-xl text-white font-normal">
                  Score: 9/10
                </span>
              </div>
              <div className="lg:col-span-2 text-right">
                <span className="lg:text-xl text-white font-normal">
                  Time: 00:34:11
                </span>
              </div>
            </div>
            <hr></hr>
            <hr></hr>
            <div className="grid lg:grid-cols-11 rounded shadow relative bg-red-500 p-3">
              <div className="lg:col-span-2">
                <p className="lg:text-3xl text-red-100 font-medium leading-4">
                  Difficult{' '}
                  <span className="lg:text-sm sm:text-xs underline text-white font-normal">
                    May 14, 2023
                  </span>
                </p>
              </div>
              <div className="lg:col-span-7 text-right">
                <span className="lg:text-xl text-white font-normal">
                  Score: 7/10
                </span>
              </div>
              <div className="lg:col-span-2 text-right">
                <span className="lg:text-xl text-white font-normal">
                  Time: 00:37:46
                </span>
              </div>
            </div>
            <hr></hr>
            <hr></hr>
            <div className="grid lg:grid-cols-11 rounded shadow relative bg-yellow-500 p-3">
              <div className="lg:col-span-2">
                <p className="lg:text-3xl text-yellow-100 font-medium leading-4">
                  Average{' '}
                  <span className="lg:text-sm sm:text-xs underline text-white font-normal">
                    May 12, 2023
                  </span>
                </p>
              </div>
              <div className="lg:col-span-7 text-right">
                <span className="lg:text-xl text-white font-normal">
                  Score: 9/10
                </span>
              </div>
              <div className="lg:col-span-2 text-right">
                <span className="lg:text-xl text-white font-normal">
                  Time: 00:28:34
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
