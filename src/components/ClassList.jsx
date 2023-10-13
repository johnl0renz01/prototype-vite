import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

import { BsCaretUpFill, BsStickies } from 'react-icons/bs';
import { VscEye } from 'react-icons/vsc';

import ChangeSectionModal from './ChangeSectionModal';
import ClassListSkeleton from './ClassListSkeleton';

import { BsClipboard2X } from 'react-icons/bs';
import LoadingSpinner from './LoadingSpinner';

import StorageData from './StorageData';
import SecureStorageData from './SecureStorageData';

export default function ClassList() {
  const navigate = useNavigate();

  useEffect(() => {
    setTabIndex();

    window.addEventListener('focus', setTabIndex);
    function setTabIndex() {
      window.localStorage.setItem('CURRENT_TAB_INDEX', 1);
    }
  }, []);

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
    } else if (account == 'Student') {
      navigate('/Homepage');
    } else if (account == '' || account === null || account === undefined) {
      navigate('/LoginPage');
    }
  });

  const [showLoading, setShowLoading] = useState(false);
  const [tableLoader, setTableLoader] = useState(false);
  var highestTimeoutId = setTimeout(';');

  var currentSection = '';

  useEffect(() => {
    var data = StorageData.localStorageJSON('CURRENT_SECTION');
    if (data === null || data === false) {
      navigate('/HomePageTeacher');
    } else {
      var data2 = StorageData.sessionStorageRAW('CURRENT_SECTION');
      console.log(data2);
      if (data2 === null) {
        data = data.replace(/"/g, '');
        window.sessionStorage.setItem(
          'CURRENT_SECTION',
          JSON.stringify(SecureStorageData.dataEncryption(data))
        );
        currentSection = data;
        currentSection = currentSection.replace(/ /g, '_');
        getCurrentSection();
      } else {
        data2 = data2.replace(/"/g, '');
        currentSection = data2;
        currentSection = currentSection.replace(/ /g, '_');
        getCurrentSection();
      }
    }
  }, []);

  const [classList, setClassList] = useState([]);
  const [sectionList, setCurrentSection] = useState([]);

  const [emptyState, setEmptyState] = useState(false);

  function getCurrentSection() {
    const data = StorageData.sessionStorageRAW('CURRENT_SECTION');
    if (data !== null) currentSection = JSON.parse(data);
    currentSection = currentSection.replace(/ /g, '_');
    axios
      .get(
        `http://localhost:80/Prototype-Vite/my-project/api/sectionAdviser/${currentSection}`
      )
      .then(function (response) {
        //console.log(response.data);
        setCurrentSection(response.data);

        getClassList();
        function getClassList() {
          setSkeletonState(true);
          axios
            .get(
              `http://localhost:80/Prototype-Vite/my-project/api/classList/${currentSection}`
            )
            .then(function (response) {
              if (response.data.length < 1) {
                setEmptyState(true);
              }
              //console.log(response.data);

              setClassList(response.data);
              setSkeletonState(false);
            })
            .catch(function (error) {
              setSkeletonState(false);
            });
        }
      })
      .catch(function (error) {
        setSkeletonState(false);
      });
  }

  var inputText = '';

  const handleChange = event => {
    const data = StorageData.sessionStorageRAW('CURRENT_SECTION');
    if (data !== null) currentSection = JSON.parse(data);
    currentSection = currentSection.replace(/ /g, '_');
    setTableLoader(true);
    const name = event.target.name;
    const value = event.target.value;
    inputText = { [name]: value };

    for (let i = 0; i < highestTimeoutId; i++) {
      clearTimeout(i);
    }

    setTimeout(() => {
      axios
        .post(
          `http://localhost:80/Prototype-Vite/my-project/api/classList/${currentSection}`,
          inputText
        )
        .then(function (response) {
          //console.log(response.data);
          setClassList(response.data);
          setTableLoader(false);
        })
        .catch(function (error) {
          setTableLoader(false);
        });
    }, 1000);
  };

  var currentAccount = '';

  const setCurrentAccount = () => {
    window.sessionStorage.setItem(
      'CURRENT_EMAIL',
      JSON.stringify(SecureStorageData.dataEncryption(currentAccount))
    );
    for (let i = 0; i < currentAccount.length; i++) {
      if (currentAccount[i].match(/[\@]/)) {
        currentAccount = currentAccount.substring(0, i);
        currentAccount = currentAccount.replace('.', '_');
        break;
      }
    }
    //console.log(currentAccount);
    window.sessionStorage.setItem(
      'CURRENT_ACCOUNT',
      JSON.stringify(SecureStorageData.dataEncryption(currentAccount))
    );
  };

  const StudentDetailPage = () => {
    setTimeout(proceed, 1);

    function proceed() {
      navigate('/StudentDetail');
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

  // MODAL CHANGE SECTION
  const [showModal, setShowModal] = useState(false);
  const handleOnCloseModal = () => setShowModal(false);

  const handleOnContinueModal = () => {
    setShowModal(false);
    const data = StorageData.sessionStorageRAW('CURRENT_SECTION');
    if (data !== null) currentSection = JSON.parse(data);
    currentSection = currentSection.replace(/ /g, '_');
    getCurrentSection();
  };

  const changeSection = () => {
    setShowModal(true);
  };

  //FOR SKELETON
  const [skeletonState, setSkeletonState] = useState(true);

  /*
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

  */

  return (
    <>
      <div className={`${!skeletonState ? 'hidden' : ''}`}>
        <ClassListSkeleton />
      </div>
      <div
        className={` bg-gradient-to-t from-[#e2e2e2] via-[#f1f1f1] to-[#ffffff] h-screen overflow-y-auto
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
        <section id="container" className="relative mx-auto p-8 w-full">
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
            <span className="">
              {sectionList.map((section, key) => (
                <span
                  key={key}
                >{`${section.GradeLevel} - ${section.SectionName}`}</span>
              ))}
            </span>
          </div>
          <div className="mt-1.5">
            <div className="overflow-hidden hdScreen:py-1 semihdScreen:py-1 laptopScreen:py-0 averageScreen:py-0 pr-2">
              <div className="inline-flex w-full m-1   rounded-2xl lg:text-lg xs:text-xs">
                <div className="grow mr-5 flex bg-gray-200 shadow-sm shadow-gray-600 py-1 items-center text-left rounded-2xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-4 lg:h-10 lg:w-10   xs:h-5 xs:w-10 lg:scale-100 md-scale:80 sm-scale:60 text-gray-400"
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
                    className="bg-gray-200  outline-none ml-3 block w-full"
                    type="text"
                    name="searchQuery"
                    id="searchQuery"
                    onChange={handleChange}
                    placeholder="&nbsp;Search People..."
                    autoComplete="off"
                  />
                </div>
                <button
                  onClick={changeSection}
                  type="button"
                  className="relative hdScreen:w-[14.5rem] semihdScreen:w-[14.5rem] laptopScreen:w-[14.5rem] averageScreen:w-[14.5rem] hdScreen:py-3 semihdScreen:py-2 laptopScreen:py-0 averageScreen:py-0 lg:px-5 sm:py-1.5 sm:px-2.5 xs:px-1 xs:py-1 text-white font-semibold  shadow-md rounded-2xl bg-orange-500 hover:bg-orange-600/90 hover:-translate-y-0.5 ease-in-out transition duration-300 transform drop-shadow-[0_3px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_3px_0px_rgba(0,0,0,0.6)]"
                >
                  <span className="md:pl-2 hdScreen:text-xl semihdScreen:text-xl laptopScreen:text-lg averageScreen:text-lg sm:text-base xs:text-sm flex justify-center items-center">
                    Change Section
                    <BsStickies className="md:block xs:hidden lg:ml-2 sm:ml-1 xs:ml-0.5  lg:text-xl sm:text-sm xs:text-xs rotate-[180deg] -scale-x-100 " />
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="hdScreen:mt-6 semihdScreen:mt-5 laptopScreen:mt-3 averageScreen:mt-2 xs:mt-3 rounded-3xl overflow-hidden bg-gradient-to-t from-gray-200 via-gray-100 to-white  ">
            <table className="w-full leading-normal ">
              <thead className="sticky top-0 z-40 shadow-md border-b-2 border-gray-200 bg-gray-200 text-left uppercase tracking-wider lg:text-base md:text-sm xs:text-xs  font-bold text-gray-600">
                <tr>
                  <th className="lg:pl-20 pl-6 w-[32.5%] py-3 ">
                    Student Name
                  </th>

                  <th className="w-[22%] py-3 ">Gender</th>
                  <th className="lg:py-3 ">Group Type</th>
                  <th className="lg:pl-[200px] md:pl-[110px] xs:pl-[80px] md py-3 select-none "></th>
                </tr>
              </thead>
            </table>
            <div
              className="hdScreen:min-h-[calc(100vh-40vh)] hdScreen:max-h-[calc(100vh-40vh)] 
                            semihdScreen:min-h-[calc(100vh-45vh)] semihdScreen:max-h-[calc(100vh-45vh)]
                            laptopScreen:min-h-[calc(100vh-43vh)] laptopScreen:max-h-[calc(100vh-43vh)]
                            averageScreen:min-h-[calc(100vh-50vh)] averageScreen:max-h-[calc(100vh-50vh)]
                            xs:min-h-[calc(100vh-50vh)] xs:max-h-[calc(100vh-50vh)]
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
                {classList.length > 0 ? (
                  <div className="">
                    <div className="inline-block min-w-full shadow rounded-lg ">
                      <table className="min-w-full leading-normal -mt-[28px]">
                        <thead className="invisible lg:text-base md:text-sm xs:text-xs ">
                          <tr>
                            <th className="lg:pl-20 w-[32.75%]">
                              Student Name
                            </th>

                            <th className="w-[22.2%] ">Gender</th>
                            <th className="">Group Type</th>
                            <th className="lg:pl-16 select-none "></th>
                          </tr>
                        </thead>
                        <tbody className=" ">
                          {classList.map((account, key) => (
                            <tr
                              key={key}
                              className="odd:bg-white even:bg-slate-50/30 border-b border-gray-200 bg-white hover:bg-gray-100 text-gray-900 hover:text-indigo-600"
                            >
                              <td className="flex items-center lg:text-base md:text-sm xs:text-xs  pl-5 py-[10px]  whitespace-no-wrap">
                                <div className="flex-shrink-0 w-10 h-10 mr-3">
                                  {account.Gender == 'Male' ? (
                                    <img
                                      className="border-2 border-gray-300 rounded-full"
                                      src={require('../assets/avatar/avatar-male.png')}
                                      alt=""
                                    />
                                  ) : (
                                    <img
                                      className="border-2 border-gray-300 rounded-full"
                                      src={require('../assets/avatar/avatar-female.png')}
                                      alt=""
                                    />
                                  )}
                                </div>
                                <p className="lg:pl-2 lg:text-base md:text-sm xs:text-xs ">
                                  {account.GivenName + ' ' + account.LastName}
                                </p>
                              </td>

                              <td className="lg:text-base md:text-sm xs:text-xs ">
                                <p>{account.Gender}</p>
                              </td>
                              <td className="lg:text-base md:text-sm xs:text-xs ">
                                <p>{account.GroupType}</p>
                              </td>
                              <td className="lg:pr-10  text-right lg:text-base md:text-sm xs:text-xs ">
                                <a
                                  onClick={function () {
                                    currentAccount = account.Email;
                                    setCurrentAccount();
                                    setTimeout(StudentDetailPage, 1);
                                  }}
                                >
                                  <button className="relative lg:text-base md:text-sm xs:text-xs  md:w-36 sm:w-28 xs:w-20 text-gray-700 hover:text-white   font-semibold  transition duration-500 border-gray-400 border-2  hover:bg-gray-500 hover:border-gray-500 py-2 rounded-xl shadow-md">
                                    <p className="md:pr-2">View details</p>
                                    <VscEye className="md:block xs:hidden absolute md:right-3 xs:right-1 top-1/3" />
                                  </button>
                                </a>
                              </td>
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
                          <>No students found</>
                        ) : (
                          <>No matches found</>
                        )}
                      </p>
                      <p className="sm:text-lg xs:text-sm">
                        {emptyState ? (
                          <>This section is empty.</>
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
      <ChangeSectionModal
        onClose={handleOnCloseModal}
        visible={showModal}
        onContinue={handleOnContinueModal}
      />
      <LoadingSpinner visible={showLoading} />
    </>
  );
}
