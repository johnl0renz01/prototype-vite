import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import {
  BsEye,
  BsDashCircle,
  BsCheckCircle,
  BsTelephone,
} from 'react-icons/bs';
import { BsGearFill, BsClipboard2X, BsEnvelopePlus } from 'react-icons/bs';

import MyRequestSkeleton from './MyRequestSkeleton';

import LoadingSpinner from './LoadingSpinner';

import ViewDetailModal from './ViewDetailModal';
import ViewDetailMessageModal from './ViewDetailMessageModal';

import ContactAdminModal from './ContactAdminModal';
import ContactAdminMessageModal from './ContactAdminMessageModal';

import StorageData from './StorageData';
import SecureStorageData from './SecureStorageData';

export default function MyRequest() {
  const navigate = useNavigate();

  useEffect(() => {
    setTabIndex();

    window.addEventListener('focus', setTabIndex);
    function setTabIndex() {
      window.localStorage.setItem('CURRENT_TAB_INDEX', 4);
    }
  }, []);

  useEffect(() => {
    document.title = 'My Requests';

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
  const [emptyState, setEmptyState] = useState(false);

  const [requests, setRequests] = useState([]);
  const [counter, setCounter] = useState(0);

  var inputText = '';

  useEffect(() => {
    getRequests();
  }, []);

  function getRequests() {
    var email = StorageData.localStorageJSON('SESSION_EMAIL');

    setSkeletonState(true);
    axios
      .get(
        `http://localhost:80/Prototype-Vite/my-project/api/myRequestList/${email}`
      )
      .then(function (response) {
        if (response.data.length < 1) {
          setEmptyState(true);
        }
        console.log(response.data);
        setRequests(response.data);
        setTimeout(hideNavbar, 1);

        function hideNavbar() {
          setSkeletonState(false);
        }
      })
      .catch(function (error) {
        setSkeletonState(false);
      });
  }

  function updateTable() {
    setTableLoader(true);
    var email = StorageData.localStorageJSON('SESSION_EMAIL');
    getRequests2();

    function getRequests2() {
      axios
        .get(
          `http://localhost:80/Prototype-Vite/my-project/api/myRequestList/${email}`
        )
        .then(function (response) {
          console.log(response.data);
          setRequests(response.data);
          setTableLoader(false);
        })
        .catch(function (error) {
          setTableLoader(false);
        });
    }
  }

  function updateTableNotification() {
    var email = StorageData.localStorageJSON('SESSION_EMAIL');
    axios
      .get(
        `http://localhost:80/Prototype-Vite/my-project/api/myRequestList/${email}`
      )
      .then(function (response) {
        setRequests(response.data);
      })
      .catch(function (error) {});
  }

  window.addEventListener('mouseover', updateRequests);

  function updateRequests() {
    var updateState = JSON.parse(
      window.localStorage.getItem('UPDATE_REQUEST_STATE')
    );
    if (updateState === null) updateState = false;

    if (updateState == true) {
      window.localStorage.setItem('UPDATE_REQUEST_STATE', false);
      updateTableNotification();
    }
  }

  function updateNotification() {
    var email = StorageData.localStorageJSON('SESSION_EMAIL');
    axios
      .get(
        `http://localhost:80/Prototype-Vite/my-project/api/myRequestList/${email}`
      )
      .then(function (response) {
        console.log(response.data);
        setRequests(response.data);
      })
      .catch(function (error) {});
  }

  const viewMode = e => {
    window.localStorage.setItem('UPDATE_NOTIFICATION_STATE', true);
    let requestID = e.target.name;
    window.sessionStorage.setItem(
      'CURRENT_VIEW_DETAIL',
      JSON.stringify(SecureStorageData.dataEncryption(requestID))
    );
    window.sessionStorage.setItem('VIEW_DETAIL_STATE', true);
    setShowModal(true);

    let role = StorageData.localStorageJSON('ACCOUNT_TYPE');
    axios
      .post(
        `http://localhost:80/Prototype-Vite/my-project/api/requestSeen/${requestID}@${role}`
      )
      .then(function (response) {
        console.log(response.data);
        updateNotification();
      })
      .catch(function (error) {});
  };

  // MODAL VIEW
  const [showModal, setShowModal] = useState(false);
  const handleOnCloseModal = () => setShowModal(false);

  const handleOnContinueModal = () => {
    setShowMessageModal(true);
    updateTable();
  };

  // MODAL VIEW MESSAGE

  const [showMessageModal, setShowMessageModal] = useState(false);
  const handleOnCloseMessageModal = () => {
    for (var i = 1; i < 99999; i++) window.clearInterval(i);
    setShowModal(false);
    setShowMessageModal(false);
  };

  const contactAdmin = () => {
    setShowModal2(true);
  };

  // MODAL CONTACT ADMIN
  const [showModal2, setShowModal2] = useState(false);
  const handleOnCloseModal2 = () => setShowModal2(false);

  const handleOnContinueModal2 = () => {
    updateTable();
    setShowModal3(true);
  };

  // MODAL CONTACT ADMIN MESSAGE
  const [showModal3, setShowModal3] = useState(false);
  const handleOnCloseModal3 = () => {
    for (var i = 1; i < 99999; i++) window.clearInterval(i);
    setShowModal2(false);
    setShowModal3(false);
  };

  const handleOnContinueModal3 = () => {
    setShowModal3(false);
  };

  const handleChange = event => {
    setTableLoader(true);
    //console.log('HEYEHEY');
    const name = event.target.name;
    const value = event.target.value;
    inputText = { [name]: value };

    for (let i = 0; i < highestTimeoutId; i++) {
      clearTimeout(i);
    }
    var email = StorageData.localStorageJSON('SESSION_EMAIL');

    setTimeout(() => {
      axios
        .post(
          `http://localhost:80/Prototype-Vite/my-project/api/myRequestList/${email}`,
          inputText
        )
        .then(function (response) {
          //console.log(response.data);
          setRequests(response.data);
          setTableLoader(false);
        });
    }, 1000);
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

  //FOR SKELETON
  const [skeletonState, setSkeletonState] = useState(true);

  return (
    <>
      <div className={`${!skeletonState ? 'hidden' : ''}`}>
        <MyRequestSkeleton />
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
            <div className="overflow-hidden py-1 pr-2">
              <div className="inline-flex w-full m-1   rounded-2xl lg:text-lg sm:text-sm xs:text-xs ">
                <div className="grow mr-5 flex bg-gray-200 shadow-sm shadow-gray-600 py-1 items-center text-left rounded-2xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-4 lg:h-10 lg:w-10  xs:h-5 xs:w-10  lg:scale-100 md-scale:80 sm-scale:60 text-gray-400"
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
                <button
                  onClick={contactAdmin}
                  type="button"
                  className="relative hdScreen:w-[19rem] semihdScreen:w-[16.5rem] laptopScreen:w-[15.5rem] averageScreen:w-[15rem]  md:w-[14rem] sm:w-[10rem] xs:w-[8rem] lg:py-3 lg:px-5 sm:py-1.5 sm:px-2.5 xs:px-1 xs:py-1 text-white font-semibold  shadow-md rounded-2xl bg-lime-600 hover:bg-lime-700  ease-in-out transition duration-300 transform drop-shadow-[0_3px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_3px_0px_rgba(0,0,0,0.6)]"
                >
                  <span className="md:pl-2 lg:text-xl sm:text-base xs:text-sm flex justify-center">
                    New Request
                    <BsEnvelopePlus className=" md:block xs:hidden lg:ml-2 sm:ml-1 xs:ml-0.5 lg:mt-0.5 sm:mt-1 xs:mt-1 lg:text-2xl" />
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="md:mt-6 xs:mt-3 rounded-3xl overflow-hidden bg-gradient-to-t from-gray-200 via-gray-100 to-white  ">
            <table className="w-full leading-normal ">
              <thead className="sticky top-0 z-40 shadow-md border-b-2 border-gray-200 bg-gray-200 text-left uppercase tracking-wider lg:text-base md:text-sm xs:text-xs font-bold text-gray-600">
                <tr>
                  <th className="lg:pl-8 w-[26.85%] py-3 lg:text-base md:text-sm sm:text-xs">
                    <div className="lg:pl-0 sm:pl-3  xs:pl-3">Subject</div>
                  </th>
                  <th className="w-[26.25%] py-3 lg:text-base md:text-sm sm:text-xs ">
                    Recipient
                  </th>
                  <th className="w-[19.85%] py-3 lg:text-base md:text-sm sm:text-xs ">
                    Updated on
                  </th>
                  <th className="">
                    <div className="invisible ">
                      <input
                        type="button"
                        value="View Details"
                        className="cursor-pointer py-[0.2rem]  md:px-4 md:w-auto xs:w-20 text-gray-700 hover:text-white  shadow-md rounded-md font-semibold  transition duration-500 border-gray-400 border-2  hover:bg-gray-500 hover:border-gray-500 lg:text-base"
                      ></input>
                    </div>
                  </th>
                  <th className="">
                    <div className="text-right invisible">
                      <>
                        <button
                          disabled
                          className="relative py-[0.2rem]  md:px-3 md:w-auto xs:w-16 shadow-md rounded-md font-semibold  text-white bg-lime-600 drop-shadow-[0_2px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_2px_0px_rgba(0,0,0,0.6)]"
                        >
                          <span className="font-semibold md:pl-3 lg:text-base flex justify-center items-center">
                            Solved
                            <BsCheckCircle className="md:block xs:hidden md:ml-4  lg:text-base" />
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
                            xs:min-h-[calc(100vh-47.5vh)] xs:max-h-[calc(100vh-47.5vh)]
                            bg-white relative overflow-y-scroll style-2 mx-auto w-full rounded-md"
            >
              <div
                className={`-mt-4 absolute flex-col items-center justify-center h-full w-full hdScreen:scale-100 semihdScreen:scale-90 laptopScreen:scale-85 averageScreen:scale-80 md:scale-75 sm:scale-70 xs:scale-60
                 ${tableLoader ? 'flex' : 'hidden'}`}
              >
                <div className="loader border-8 border-[#89ce1a]"></div>
                <p className="pt-2 hdScreen:text-lg semihdScreen:text-lg laptopScreen:text-base averageScreen:text-base sm:text-sm xs:text-xs">
                  Fetching Data...
                </p>
              </div>

              <div className={`${tableLoader ? 'hidden' : ''}`}>
                {requests.length > 0 ? (
                  <div className="">
                    <div className="inline-block min-w-full rounded-lg ">
                      <table className="min-w-full leading-normal -mt-[28px] relative">
                        <thead className="invisible text-left uppercase tracking-wider font-bold lg:text-base md:text-sm xs:text-xs">
                          <tr>
                            <th className="lg:pl-8 w-[27%]  lg:text-base md:text-sm sm:text-xs  ">
                              Subject
                            </th>
                            <th className="w-[26.5%]   lg:text-base md:text-sm sm:text-xs ">
                              Recipient
                            </th>
                            <th className="w-[20%] lg:text-base md:text-sm sm:text-xs ">
                              Updated on
                            </th>
                            <th className=""></th>
                            <th className="w-[10%]"></th>
                            <th className="w-[0.25%]"></th>
                          </tr>
                        </thead>

                        <tbody className="relative ">
                          {requests.map((currentRequest, index) => (
                            <tr
                              key={index}
                              className="odd:bg-white even:bg-slate-50/30  border-b border-gray-200 bg-white hover:bg-gray-100 text-gray-900 hover:text-indigo-600  "
                            >
                              <td className="hdScreen:w-[320px] semihdScreen:w-[240px] laptopScreen:w-[190px] averageScreen:w-[130px] sm:w-[90px] xs:w-[50px] relative overflow-hidden flex items-center lg:text-base md:text-sm xs:text-xs lg:px-5 py-[10px] whitespace-nowrap">
                                <div className="flex-shrink-0  h-10 mr-3 break-all "></div>
                                <p className="  lg:text-base md:text-sm xs:text-xs ">
                                  {`${currentRequest.Subject}`}
                                </p>
                              </td>
                              <td className="lg:text-base md:text-sm xs:text-xs break-all">
                                <div>
                                  <p>Administrator</p>
                                </div>
                              </td>
                              <td className="lg:text-base md:text-sm xs:text-xs ">
                                <p>{currentRequest.Timestamp}</p>
                              </td>
                              <td className="text-right lg:text-base md:text-sm xs:text-xs whitespace-no-wrap ">
                                <div className="relative ">
                                  <input
                                    onClick={viewMode}
                                    name={currentRequest.RequestID}
                                    type="button"
                                    value="View Details"
                                    className="cursor-pointer py-[0.2rem]  md:px-4 md:w-auto xs:w-20 text-gray-700 hover:text-white  shadow-md rounded-md font-semibold  transition duration-500 border-gray-400 border-2  hover:bg-gray-500 hover:border-gray-500 lg:text-base"
                                  ></input>
                                  <span
                                    className={`select-none z-10 absolute sm:-right-2 xs:-right-2.5 averageScreen:top-1.5 sm:top-[0.2rem] xs:top-0.5 pr-2 pt-0.5 w-5 h-5 font-semibold rounded-full bg-black text-xs text-white averageScreen:scale-100 sm:scale-70 xs:scale-60
                                              ${
                                                currentRequest.ReadUser ==
                                                'FALSE'
                                                  ? ''
                                                  : 'hidden'
                                              }`}
                                  >
                                    !
                                  </span>
                                </div>
                              </td>
                              <td className="text-right hdScreen:pr-6 semihdScreen:pr-1 laptopScreen:pr-0.5 averageScreen:pr-0 lg:text-base md:text-sm xs:text-xs">
                                {currentRequest.Status == 'SOLVED' ? (
                                  <>
                                    <button
                                      disabled
                                      className="relative py-[0.2rem]  md:px-3 md:w-auto xs:w-16 shadow-md rounded-md font-semibold  text-white bg-lime-600 drop-shadow-[0_2px_0px_rgba(0,0,0,0.45)] "
                                    >
                                      <span className="font-semibold md:pl-3 lg:text-base flex justify-center items-center">
                                        Solved
                                        <BsCheckCircle className="md:block xs:hidden md:ml-4  lg:text-base" />
                                      </span>
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <div className="relative ">
                                      <input
                                        type="submit"
                                        value="Unsolved"
                                        className=" py-[0.2rem]  md:pl-4 md:pr-[2.15rem] md:w-auto xs:w-16 shadow-md rounded-md font-semibold  transition duration-500 text-white bg-red-500  drop-shadow-[0_2px_0px_rgba(0,0,0,0.45)] "
                                      ></input>
                                      <span className="md:block xs:hidden absolute top-[0.25rem] right-3 font-normal flex justify-center ">
                                        <BsDashCircle className="ml-1 md:mt-[0.1rem] lg:text-base text-white" />
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
                ) : (
                  <>
                    <div className="text-gray-700 text-center -mt-4 absolute flex flex-col items-center justify-center h-full w-full hdScreen:scale-100 semihdScreen:scale-90 laptopScreen:scale-85 averageScreen:scale-80 md:scale-75 sm:scale-70 xs:scale-60">
                      <BsClipboard2X className="w-full text-[4rem]" />
                      <p className="py-2 font-semibold semihdScreen:text-xl sm:text-lg xs:text-base">
                        {emptyState ? (
                          <>No request(s) found.</>
                        ) : (
                          <>No matches found</>
                        )}
                      </p>
                      <p className="sm:text-lg xs:text-sm">
                        {emptyState ? (
                          <>The list is empty.</>
                        ) : (
                          <>
                            Try checking if there's a typographical error
                            <br></br>in your query.{' '}
                          </>
                        )}
                      </p>
                    </div>
                  </>
                )}
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
      <ViewDetailMessageModal
        onClose={handleOnCloseMessageModal}
        visible={showMessageModal}
      />

      <ContactAdminModal
        onClose={handleOnCloseModal2}
        visible={showModal2}
        onContinue={handleOnContinueModal2}
      />
      <ContactAdminMessageModal
        onClose={handleOnCloseModal3}
        visible={showModal3}
      />

      <LoadingSpinner visible={showLoading} />
    </>
  );
}
