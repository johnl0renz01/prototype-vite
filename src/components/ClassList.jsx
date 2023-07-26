import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

import { BsCaretUpFill, BsStickies } from 'react-icons/bs';
import { VscEye } from 'react-icons/vsc';

import ChangeSectionModal from './ChangeSectionModal';

export default function ClassList() {
  const navigate = useNavigate();

  //FOR LINKS/NAVBAR/BREADCRUMBS
  const [pageList, setPageList] = useState([]);
  const [pageLink, setPageLink] = useState([]);

  useEffect(() => {
    const data = window.localStorage.getItem('CURRENT_SECTION');
    if (data === null) navigate('/HomePageTeacher');

    setPage();

    window.addEventListener('focus', setPage);
    function setPage() {
      let page = ['Home', 'Section List', 'Class List'];
      let link = ['/AdminHomepage', '/SectionList', '/ClassList'];
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

  var currentSection = '';

  useEffect(() => {
    const data = window.localStorage.getItem('CURRENT_SECTION');
    currentSection = JSON.parse(data);
    currentSection = currentSection.replace(/ /g, '_');
  });

  const [classList, setClassList] = useState([]);
  const [sectionList, setCurrentSection] = useState([]);

  function getClassList() {
    axios
      .get(
        `http://localhost:80/Prototype-Vite/my-project/api/classList/${currentSection}`
      )
      .then(function (response) {
        console.log(response.data);
        setClassList(response.data);
      });
  }

  function getCurrentSection() {
    axios
      .get(
        `http://localhost:80/Prototype-Vite/my-project/api/sectionAdviser/${currentSection}`
      )
      .then(function (response) {
        console.log(response.data);
        setCurrentSection(response.data);
      });
  }

  useEffect(() => {
    getClassList();
    getCurrentSection();
  }, []);

  var inputText = '';

  const handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    inputText = { [name]: value };

    axios
      .post(
        `http://localhost:80/Prototype-Vite/my-project/api/classList/${currentSection}`,
        inputText
      )
      .then(function (response) {
        console.log(response.data);
        setClassList(response.data);
      });
  };

  var currentAccount = '';

  const setCurrentAccount = () => {
    window.localStorage.setItem(
      'CURRENT_EMAIL',
      JSON.stringify(currentAccount)
    );
    for (let i = 0; i < currentAccount.length; i++) {
      if (currentAccount[i].match(/[\@]/)) {
        currentAccount = currentAccount.substring(0, i);
        currentAccount = currentAccount.replace('.', '_');
        break;
      }
    }
    console.log(currentAccount);
    window.localStorage.setItem(
      'CURRENT_ACCOUNT',
      JSON.stringify(currentAccount)
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

  //GO BACK FUNCTION
  const SectionListPage = () => {
    setTimeout(proceed, 1);

    function proceed() {
      navigate('/SectionList');
    }
  };

  // MODAL EDIT
  const [showModal, setShowModal] = useState(false);
  const handleOnCloseModal = () => setShowModal(false);

  const [choiceModal, setChoiceModal] = useState(false);

  const handleOnContinueModal = () => {
    setChoiceModal(true);
    setShowModal(false);
  };

  const changeSection = () => {
    setShowModal(true);
  };

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
              {sectionList.map(section => (
                <>{`${section.GradeLevel} - ${section.SectionName}`}</>
              ))}
            </span>
          </div>
          <div className="mt-1.5">
            {/*
            <div className="float-left py-2 ">
              <div className="w-full flex items-center justify-between px-5">
                <div className="rounded-2xl  first-letter:rounded-2xl bg-gray-200 px-5 shadow-sm shadow-gray-600 flex items-center  font-bold">
                  <div className="flex">
                    <h2 className=" text-gray-500  lg:text-3xl font-semibold ">
                      {sectionList.map((section) => (
                        <>{`${section.GradeLevel} - ${section.SectionName}`}</>
                      ))}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            */}

            {/*
            <div className="float-left py-2  ">
              <div className="inline-flex items-center justify-between px-5">
                <div className="w-full rounded-2xl first-letter:rounded-2xl bg-gray-200 px-5 shadow-sm shadow-gray-600 flex items-center font-bold">
                  <div className="relative "></div>
                  <h2 className=" text-gray-500 stroke-cyan-500 lg:text-3xl font-semibold ">
                    {sectionList.map((section) => (
                      <>{`${section.AdviserTitle}. ${section.AdviserName} ${section.AdviserSurname}`}</>
                    ))}
                  </h2>
                </div>
              </div>
            </div>
            */}

            <div className="overflow-hidden hdScreen:py-1 semihdScreen:py-1 laptopScreen:py-0 averageScreen:py-0 pr-2">
              <div className="inline-flex w-full m-1   rounded-2xl lg:text-lg xs:text-xs">
                <div className="grow mr-5 flex bg-gray-200 shadow-sm shadow-gray-600 py-1 items-center text-left rounded-2xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-4 md:h-10 md:w-10 xs:h-5 xs:w-10 lg:scale-100 md-scale:80 sm-scale:60 text-gray-400"
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
                  className="relative hdScreen:w-[14.5rem] semihdScreen:w-[14.5rem] laptopScreen:w-[14.5rem] averageScreen:w-[14.5rem] hdScreen:py-3 semihdScreen:py-2 laptopScreen:py-0 averageScreen:py-0 lg:px-5 sm:py-1.5 sm:px-2.5 xs:px-1 xs:py-1 text-white font-semibold  shadow-md rounded-full bg-orange-500 hover:bg-orange-600/90 hover:-translate-y-0.5 ease-in-out transition duration-300 transform drop-shadow-[0_3px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_3px_0px_rgba(0,0,0,0.6)]"
                >
                  <span className="pl-2 lg:text-xl sm:text-base xs:text-sm flex justify-center">
                    Change Section
                    <BsStickies className="lg:ml-2 sm:ml-1 xs:ml-0.5 lg:mt-1 sm:mt-1.5 xs:mt-1 lg:text-xl sm:text-sm xs:text-xs rotate-[180deg] -scale-x-100 " />
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="hdScreen:mt-6 semihdScreen:mt-5 laptopScreen:mt-3 averageScreen:mt-2 xs:mt-3 rounded-3xl overflow-hidden bg-gradient-to-t from-gray-200 via-gray-100 to-white  ">
            <table className="w-full leading-normal ">
              <thead className="sticky top-0 z-40 shadow-md border-b-2 border-gray-200 bg-gray-200 text-left uppercase tracking-wider md:text-base xs:text-xs font-bold text-gray-600">
                <tr>
                  <th className="lg:pl-20 w-[32.5%] py-3 ">Student Name</th>

                  <th className="w-[22%] py-3 ">Gender</th>
                  <th className="lg:py-3 ">Group Type</th>
                  <th className="lg:pl-[200px] md:pl-[110px] xs:pl-[80px] md py-3 select-none "></th>
                </tr>
              </thead>
            </table>
            <div
              className="hdScreen:min-h-[calc(100vh-40vh)] hdScreen:max-h-[calc(100vh-40vh)] 
                            semihdScreen:min-h-[calc(100vh-45vh)] semihdScreen:max-h-[calc(100vh-45vh)]
                            laptopScreen:min-h-[calc(100vh-47.5vh)] laptopScreen:max-h-[calc(100vh-47.5vh)]
                            averageScreen:min-h-[calc(100vh-50vh)] averageScreen:max-h-[calc(100vh-50vh)]
                            bg-white relative overflow-y-scroll style-2 mx-auto w-full rounded-md"
            >
              <div className="">
                <div className="">
                  <div className="inline-block min-w-full shadow rounded-lg ">
                    <table className="min-w-full leading-normal -mt-[28px]">
                      <thead className="invisible md:text-base xs:text-xs">
                        <tr>
                          <th className="lg:pl-20 w-[32.75%]">Student Name</th>

                          <th className="w-[22.2%] ">Gender</th>
                          <th className="">Group Type</th>
                          <th className="lg:pl-16 select-none "></th>
                        </tr>
                      </thead>
                      <tbody className=" ">
                        {classList.map((account, key) => (
                          <tr
                            key={key}
                            className="border-b border-gray-200 bg-white hover:bg-gray-100 text-gray-900 hover:text-indigo-600"
                          >
                            <td className="flex items-center md:text-base xs:text-xs pl-5 py-[10px]  whitespace-no-wrap">
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
                              <p className="lg:pl-2 md:text-base xs:text-xs">
                                {account.GivenName + ' ' + account.LastName}
                              </p>
                            </td>

                            <td className="md:text-base xs:text-xs">
                              <p>{account.Gender}</p>
                            </td>
                            <td className="md:text-base xs:text-xs">
                              <p>{account.GroupType}</p>
                            </td>
                            <td className="lg:pr-10 text-right md:text-base xs:text-xs">
                              <a
                                onClick={function () {
                                  currentAccount = account.Email;
                                  setCurrentAccount();
                                  setTimeout(StudentDetailPage, 1);
                                }}
                              >
                                <button className="relative md:text-base xs:text-xs md:w-36 xs:w-20 text-white bg-lime-600 hover:bg-lime-700 py-2 rounded-xl shadow-md drop-shadow-[0_3px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_3px_0px_rgba(0,0,0,0.6)]">
                                  <p className="pr-2">See details</p>
                                  <VscEye className="absolute md:right-3 xs:right-1 top-1/3" />
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
    </>
  );
}
