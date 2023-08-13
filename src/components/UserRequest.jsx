import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

import ViewDetailModal from './ViewDetailModal';

import EquationSolver from './equationSolver';

import { BsEye, BsDashCircle, BsCheckCircle } from 'react-icons/bs';
import { HiPencilSquare } from 'react-icons/hi2';

export default function UserRequest() {
  const navigate = useNavigate();

  useEffect(() => {
    setTabIndex();

    window.addEventListener('focus', setTabIndex);
    function setTabIndex() {
      window.localStorage.setItem('CURRENT_TAB_INDEX', 4);
    }
  }, []);

  useEffect(() => {
    var logged = JSON.parse(window.localStorage.getItem('LOGGED'));
    if (logged == 'FALSE') {
      navigate('/LoginPage');
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
            navigate('/LoginPage');
          });
      }
    }

    var account = JSON.parse(window.localStorage.getItem('ACCOUNT_TYPE'));
    if (account == 'Teacher') {
      navigate('/HomePageTeacher');
    } else if (account == 'Student') {
      navigate('/Homepage');
    }
  });

  const [requests, setRequests] = useState([]);
  const [counter, setCounter] = useState(0);

  var inputText = '';

  useEffect(() => {
    getRequests();
    getRequestTotal();
  }, []);

  function getRequests() {
    axios
      .get(`http://localhost:80/Prototype-Vite/my-project/api/requestList/`)
      .then(function (response) {
        console.log(response.data);
        setRequests(response.data);
      });
  }

  function getRequestTotal() {
    axios
      .get(`http://localhost:80/Prototype-Vite/my-project/api/requestTotal/`)
      .then(function (response) {
        var total = response.data;
        total = parseInt(total);
        setCounter(total);
      });
  }

  const viewMode = e => {
    let requestID = e.target.name;
    window.sessionStorage.setItem(
      'CURRENT_VIEW_DETAIL',
      JSON.stringify(requestID)
    );
    window.sessionStorage.setItem('VIEW_DETAIL_STATE', true);
    setShowModal(true);
  };

  // MODAL VIEW
  const [showModal, setShowModal] = useState(false);
  const handleOnCloseModal = () => setShowModal(false);

  const [choiceModal, setChoiceModal] = useState(false);

  const handleOnContinueModal = () => {
    setChoiceModal(true);
    setShowModal(false);
  };

  const solved = e => {
    let requestID = e.target.name;
    console.log(requestID);
    axios
      .post(
        `http://localhost:80/Prototype-Vite/my-project/api/requestSolved/${requestID}`
      )
      .then(function (response) {
        console.log(response.data);
        getRequests();
        getRequestTotal();
      });
  };

  const handleChange = event => {
    //console.log('HEYEHEY');
    const name = event.target.name;
    const value = event.target.value;
    inputText = { [name]: value };

    axios
      .post(
        `http://localhost:80/Prototype-Vite/my-project/api/requestList/`,
        inputText
      )
      .then(function (response) {
        //console.log(response.data);
        setRequests(response.data);
      });
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

  return (
    <>
      <div
        className={`bg-gradient-to-t from-[#e2e2e2] via-[#f1f1f1] to-[#ffffff] h-screen   
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
            Request(s)
          </div>

          <div className="mt-1.5">
            <div className="overflow-hidden hdScreen:py-1 semihdScreen:py-1 laptopScreen:py-0 averageScreen:py-0 pr-2">
              <div className="inline-flex w-full m-1   rounded-2xl lg:text-lg sm:text-sm xs:text-xs ">
                <div className="mr-5 text-gray-700 mt-1.5 lg:text-lg sm:text-base xs:text-xs font-semibold tracking-wide pl-2">
                  There are currently {counter > 0 ? <>[{counter}]</> : <>no</>}{' '}
                  requests.
                </div>
                <div className="grow flex bg-gray-200 shadow-sm shadow-gray-600  items-center text-left rounded-2xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-4 md:h-10 md:w-10 xs:h-5 xs:w-10 lg:scale-80 md-scale:80 sm-scale:60 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    className="bg-gray-200  outline-none ml-2 block w-full lg:text-lg sm:text-sm xs:text-xs  font-normal"
                    type="text"
                    name="searchQuery"
                    id="searchQuery"
                    onChange={handleChange}
                    placeholder="&nbsp;Search Request..."
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="md:mt-6 xs:mt-3 rounded-3xl overflow-hidden bg-gradient-to-t from-gray-200 via-gray-100 to-white  ">
            <table className="w-full leading-normal ">
              <thead className="sticky top-0 z-40 shadow-md border-b-2 border-gray-200 bg-gray-200 text-left uppercase tracking-wider md:text-base xs:text-xs font-bold text-gray-600">
                <tr>
                  <th className="lg:pl-8 w-[19.85%] py-3 md:text-base sm:text-sm">
                    <div className="lg:pl-0 sm:pl-3  xs:pl-3">Subject</div>
                  </th>
                  <th className="w-[27.25%] py-3 md:text-base sm:text-sm ">
                    From
                  </th>
                  <th className="w-[12.4%] py-3 md:text-base sm:text-sm ">
                    Role
                  </th>
                  <th className="w-[19.85%] py-3 md:text-base sm:text-sm ">
                    Received on
                  </th>
                  <th className="">
                    <input
                      type="button"
                      value="View Details"
                      className="invisible cursor-pointer py-[0.2rem]  px-4 text-gray-700 hover:text-white  shadow-md rounded-full font-semibold  transition duration-500 border-gray-400 border-2  hover:bg-gray-500 hover:border-gray-500 lg:text-base"
                    ></input>
                  </th>
                  <th className="">
                    <div className="text-right invisible">
                      <>
                        <button
                          type="button"
                          className="relative py-[0.2rem]  px-2 shadow-md rounded-full font-semibold  transition duration-500 text-white bg-red-500 hover:bg-red-700 drop-shadow-[0_2px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_2px_0px_rgba(0,0,0,0.6)]"
                        >
                          <span className="font-normal pl-2 lg:text-base flex justify-center">
                            Unsolved
                            <BsDashCircle className="ml-1 lg:mt-[0.25rem] lg:text-base" />
                          </span>
                        </button>
                      </>
                    </div>
                  </th>
                  <th className="w-[1.5%]"></th>
                </tr>
              </thead>
            </table>

            <div
              className="hdScreen:min-h-[calc(100vh-40vh)] hdScreen:max-h-[calc(100vh-40vh)] 
                            semihdScreen:min-h-[calc(100vh-45vh)] semihdScreen:max-h-[calc(100vh-45vh)]
                            laptopScreen:min-h-[calc(100vh-43vh)] laptopScreen:max-h-[calc(100vh-43vh)]
                            averageScreen:min-h-[calc(100vh-47.5vh)] averageScreen:max-h-[calc(100vh-47.5vh)]
                            bg-white relative overflow-y-scroll style-2 mx-auto w-full rounded-md"
            >
              <div className="">
                <div className="">
                  <div className="inline-block min-w-full rounded-lg ">
                    <table className="min-w-full leading-normal -mt-[28px] relative">
                      <thead className="invisible text-left uppercase tracking-wider font-bold md:text-base xs:text-xs">
                        <tr>
                          <th className="lg:pl-8 w-[20%]  md:text-base sm:text-sm  ">
                            Subject
                          </th>
                          <th className="w-[27.5%]   md:text-base sm:text-sm ">
                            From
                          </th>
                          <th className="w-[12.5%]  md:text-base sm:text-sm ">
                            Role
                          </th>
                          <th className="w-[20%] md:text-base sm:text-sm "></th>
                          <th className=""></th>
                          <th className="w-[10%]"></th>
                          <th className="w-[0.25%]"></th>
                        </tr>
                      </thead>

                      <tbody className="relative ">
                        {requests.map((currentRequest, index) => (
                          <tr
                            key={index}
                            className="odd:bg-white even:bg-slate-50/30 border-b border-gray-200 bg-white hover:bg-gray-100 text-gray-900 hover:text-indigo-600  "
                          >
                            <td className="hdScreen:w-[320px] semihdScreen:w-[240px] laptopScreen:w-[190px] averageScreen:w-[130px] sm:w-[90px] xs:w-[50px] relative overflow-hidden flex items-center md:text-base xs:text-xs lg:px-5 py-[10px] whitespace-nowrap">
                              <div className="flex-shrink-0  h-10 mr-3 break-all "></div>
                              <p className="  md:text-base xs:text-xs ">
                                {`${currentRequest.Subject}`}
                              </p>
                            </td>
                            <td className="md:text-base xs:text-xs break-all">
                              <div>
                                <p>{currentRequest.Email}</p>
                              </div>
                            </td>
                            <td className="md:text-base xs:text-xs ">
                              <p>{currentRequest.Role}</p>
                            </td>
                            <td className="md:text-base xs:text-xs ">
                              <p>{currentRequest.Timestamp}</p>
                            </td>
                            <td className="text-right md:text-base xs:text-xs whitespace-no-wrap ">
                              <div className="relative ">
                                <input
                                  onClick={viewMode}
                                  name={currentRequest.RequestID}
                                  type="button"
                                  value="View Details"
                                  className="cursor-pointer py-[0.2rem]  px-4 text-gray-700 hover:text-white  shadow-md rounded-full font-semibold  transition duration-500 border-gray-400 border-2  hover:bg-gray-500 hover:border-gray-500 lg:text-base"
                                ></input>
                              </div>
                            </td>
                            <td className="text-right hdScreen:pr-6 semihdScreen:pr-1 laptopScreen:pr-0.5 averageScreen:pr-0 md:text-base xs:text-xs">
                              {currentRequest.Status == 'SOLVED' ? (
                                <>
                                  <button
                                    disabled
                                    className="relative py-[0.2rem]  px-3 shadow-md rounded-full font-semibold  text-white bg-lime-600 drop-shadow-[0_2px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_2px_0px_rgba(0,0,0,0.6)]"
                                  >
                                    <span className="font-semibold pl-3 lg:text-base flex justify-center">
                                      Solved
                                      <BsCheckCircle className="ml-4 lg:mt-[0.3rem] lg:text-base" />
                                    </span>
                                  </button>
                                </>
                              ) : (
                                <>
                                  <div className="relative ">
                                    <input
                                      onClick={solved}
                                      name={currentRequest.RequestID}
                                      type="submit"
                                      value="Unsolved"
                                      className=" cursor-pointer py-[0.2rem]  pl-4 pr-[2.15rem] shadow-md rounded-full font-semibold  transition duration-500 text-white bg-red-500 hover:bg-red-700 drop-shadow-[0_2px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_2px_0px_rgba(0,0,0,0.6)]"
                                    ></input>
                                    <span className=" absolute top-[0.25rem] right-3 font-normal flex justify-center">
                                      <BsDashCircle className="ml-1 lg:mt-[0.2rem] lg:text-base text-white" />
                                    </span>
                                  </div>
                                </>
                              )}
                            </td>
                            <td></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="w-full bg-white"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <ViewDetailModal
        onClose={handleOnCloseModal}
        visible={showModal}
        onContinue={handleOnContinueModal}
      />
    </>
  );
}
