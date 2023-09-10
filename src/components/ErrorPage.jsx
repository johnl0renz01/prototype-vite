import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import * as ReactDOM from 'react-dom';

export default function ErrorPage() {
  const [imageLink, setImageLink] = useState('error-1');
  const [currentAccount, setCurrentAccount] = useState('Teacher');

  document.body.style.backgroundImage =
    'linear-gradient(to top, #e2e2e2, #f1f1f1 , #ffffff)';

  const navigate = useNavigate();

  useEffect(() => {
    setTabIndex();

    window.addEventListener('focus', setTabIndex);
    function setTabIndex() {
      window.localStorage.setItem('CURRENT_TAB_INDEX', 0);
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
    if (account == 'Student') {
      navigate('/Homepage');
    } else if (account == 'Teacher') {
      setImageLink('error-1');
      setCurrentAccount('Teacher');
    } else if (account == 'Admin') {
      setImageLink('error-2');
      setCurrentAccount('Admin');
    }
  });

  const [accessReportCard, setAccessReportCard] = useState(false);

  const [navbarWidth, setNavbarWidth] = useState(0);
  const [logoHeight, setLogoHeight] = useState(0);

  useEffect(() => {
    const data = window.localStorage.getItem('CURRENT_SECTION');
    if (data !== null) setAccessReportCard(true);

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
      if (width > 10) setNavbarWidth(width);

      // Logo height
      var height = window.sessionStorage.getItem('NAVBAR_TEACHER_LOGO');
      if (height > 10) setLogoHeight(height);

      var width2 = window.sessionStorage.getItem('NAVBAR_ADMIN_WIDTH');
      if (width2 > 10) setNavbarWidth(width2);

      // Logo height
      var height2 = window.sessionStorage.getItem('NAVBAR_ADMIN_LOGO');
      if (height2 > 10) setLogoHeight(height2);
    }, 1);
  }

  function setWidth() {
    var width = window.sessionStorage.getItem('NAVBAR_TEACHER_WIDTH');
    if (width > 10) setNavbarWidth(width);

    // Logo height
    var height = window.sessionStorage.getItem('NAVBAR_TEACHER_LOGO');
    if (height > 10) setLogoHeight(height);

    var width2 = window.sessionStorage.getItem('NAVBAR_ADMIN_WIDTH');
    if (width2 > 10) setNavbarWidth(width2);

    // Logo height
    var height2 = window.sessionStorage.getItem('NAVBAR_ADMIN_LOGO');
    if (height2 > 10) setLogoHeight(height2);
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
        }
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
        }
        `}
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
            }
            
            ${
              logoHeight == 78.5
                ? 'max-h-[78.5px]'
                : logoHeight == 40.5
                ? 'max-h-[40.5px]'
                : 'max-h-[78.5px]'
            }
            `}
          >
            Page Unavailable
          </div>
          <div className="py-1.5"></div>
          <div className="hdScreen:mt-5 semihdScreen:mt-5 laptopScreen:mt-3 averageScreen:mt-2 ">
            <div className="flex items-center">
              <div className=" font-poppins hdScreen:px-10 semihdScreen:px-8 laptopScreen:px-6 averageScreen:px-5 hdScreen:py-10  semihdScreen:py-3 laptopScreen:py-2 averageScreen:py-0">
                <h1 className="hdScreen:text-3xl semihdScreen:text-2xl laptopScreen:text-xl averageScreen:text-lg font-bold">
                  Oops... It seems like there's nothing on this page!
                </h1>
                <br></br>
                <h2 className="hdScreen:text-lg semihdScreen:text-base laptopScreen:text-base averageScreen:text-sm  text-justify">
                  We regret to inform you that the page you are attempting to
                  access cannot be located at the moment. We understand that
                  this might be disappointing and apologize for any
                  inconvenience it may cause. In order to assist you further, we
                  kindly suggest considering the following options:
                </h2>
                <br></br>
                <ol className="text-justify hdScreen:text-base semihdScreen:text-base laptopScreen:text-sm averageScreen:text-xs">
                  <li className="flex pl-4 pb-2">
                    <span className="font-bold pr-3">1. </span>
                    <p className="inline-block">
                      <span className="font-semibold">
                        Double-check the URL:
                      </span>{' '}
                      Please make sure that the web address you entered is
                      correct and free of any typographical errors.
                    </p>
                  </li>
                  <li className="flex pl-4 pb-2">
                    <span className="font-bold pr-2 ">2.</span>
                    <p className="inline-block">
                      <span className="font-semibold">
                        Return to the Homepage:
                      </span>{' '}
                      To continue exploring our website, you can click on the
                      "Go back to home page" button, which will redirect you to
                      the main page where you can access various sections and
                      content.
                    </p>
                  </li>
                  <li className="flex pl-4 pb-2">
                    <span className="font-bold pr-2">3.</span>
                    <p className="inline-block">
                      <span className="font-semibold">Contact Support:</span> If
                      you believe this is an error or have any questions, feel
                      free to reach out to our support team. They are available
                      to assist you in resolving any issues you may encounter.
                    </p>
                  </li>
                </ol>
                <div className="flex justify-center hdScreen:mt-10 semihdScreen:mt-5 laptopScreen:mt-4 averageScreen:mt-3">
                  <button
                    onClick={
                      currentAccount == 'Teacher'
                        ? () => navigate('/HomePageTeacher')
                        : currentAccount == 'Admin'
                        ? () => navigate('/HomePageAdmin')
                        : () => navigate('/HomePageTeacher')
                    }
                    type="button"
                    className={`relative hdScreen:text-lg semihdScreen:text-base laptopScreen:text-base averageScreen:text-sm lg:py-2 lg:px-4 sm:py-1.5 sm:px-2.5 xs:px-1 xs:py-1 text-white font-semibold  shadow-md rounded-xl   ease-in-out transition duration-300 drop-shadow-[0_3px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_3px_0px_rgba(0,0,0,0.6)]
                    ${
                      currentAccount == 'Teacher'
                        ? 'bg-lime-600 hover:bg-lime-700'
                        : currentAccount == 'Admin'
                        ? 'bg-[#c4aa28] hover:bg-[#9f8817]'
                        : 'bg-lime-600 hover:bg-lime-700'
                    }
                   `}
                  >
                    Go back to home page
                  </button>
                </div>
              </div>
              <img
                className="-mb-1 w-[40%] h-[40%] hdScreen:mr-[12rem] semihdScreen:mr-[7rem] laptopScreen:mr-[5rem] averageScreen:mr-[1rem]"
                src={require(`../assets/error_page/${imageLink}.png`)}
                alt=""
              ></img>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
