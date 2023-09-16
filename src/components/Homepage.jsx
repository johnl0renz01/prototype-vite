import React, { Component } from 'react';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

import EquationSolver from './equationSolver';

import LoadingStudent from './LoadingStudent';

export default function Homepage() {
  document.body.style.backgroundImage =
    'linear-gradient(to top, #bef264, #d9f99d , #ccf779)';

  const navigate = useNavigate();

  useEffect(() => {
    var logged = JSON.parse(window.localStorage.getItem('LOGGED'));
    if (logged == 'FALSE') {
      window.localStorage.setItem('LOGIN_STATUS', JSON.stringify('Terminated'));
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
    } else if (account == 'Teacher') {
      navigate('/HomePageTeacher');
    }
  });
  //FOR LINKS/NAVBAR/BREADCRUMBS
  const [pageList, setPageList] = useState([]);
  const [pageLink, setPageLink] = useState([]);
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    setPage();
    window.addEventListener('focus', setPage);
    function setPage() {
      let page = ['Home'];
      let link = ['/Homepage'];
      setPageList(page);
      setPageLink(link);
      window.localStorage.setItem('NAVBAR_PAGE', JSON.stringify(pageList));
      window.localStorage.setItem('NAVBAR_PAGE_LINK', JSON.stringify(pageLink));
    }

    document.body.style.backgroundImage =
      'linear-gradient(to top, #bef264, #d9f99d , #ccf779)';
  }, []);

  useEffect(() => {
    window.localStorage.setItem('NAVBAR_PAGE', JSON.stringify(pageList));
  }, [pageList]);

  useEffect(() => {
    window.localStorage.setItem('NAVBAR_PAGE_LINK', JSON.stringify(pageLink));
  }, [pageLink]);

  useEffect(() => {
    const data = window.localStorage.getItem('SESSION_USER');
    if (data != '' && data != '""' && data != undefined) {
      setCurrentUser(true);
    } else {
      setCurrentUser(false);
    }
  });

  //END END END END END END END END END END END END

  const DifficultyPage = () => {
    let page = ['Home', 'Difficulty'];
    let link = ['/Homepage', '/Difficulty'];
    setPageList(page);
    setPageLink(link);

    window.localStorage.setItem('NAVBAR_PAGE', JSON.stringify(pageList));
    window.localStorage.setItem('NAVBAR_PAGE_LINK', JSON.stringify(pageLink));
    setTimeout(proceed, 1);

    function proceed() {
      navigate('/Difficulty');
    }
  };

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
        className={`hdScreen:scale-95 semihdScreen:scale-95 laptopScreen:scale-85 averageScreen:scale-85 hdScreen:-mt-0 semihdScreen:-mt-2 laptopScreen:-mt-6 averageScreen:-mt-8  flex justify-center items-start averageScreen:h-full xs:h-screen overflow-y-auto 
                          ${skeletonState ? 'hidden' : ''}`}
      >
        <div className=" w-10/12 averageScreen:min-h-[calc(100vh-6rem)] flex items-center justify-center">
          <div className="bg-white border-l-12 border-b-12 border-gray-600/60 border-r-12 border-r-gray-300/80 px-2 py-2 rounded-6xl shadow-2xl shadow-yellow-400 ">
            <div className=" mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-4 lg:px-8 lg:py-20 ">
              <div className="lg:flex w-full overflow-hidden bg-white rounded-6xl sm:mx-auto">
                <div className="grow select-none">
                  <img
                    src={require('../assets/images/home_pic.png')}
                    alt=""
                    className="object-contain w-full lg:h-full"
                  />
                </div>
                <div className="grid p-8 bg-white  lg:pl-10 lg:w-3/4">
                  <div>
                    <p className="mb-3 inline-block text-xs lg:font-semibold sm:font-semibold tracking-wider uppercase rounded-full">
                      Let's learn Linear Equations!
                    </p>
                    <h5 className="mb-5 lg:text-4xl sm:text-2xl xs:text-sm pr-10 font-bold leading-none ">
                      PERSONAL INSTRUCTING AGENT
                    </h5>
                    <p className="text-gray-800 text-justify lg:text-base sm:text-sm xs:text-xs">
                      <span className="font-bold ">
                        {' '}
                        Personal Instructing Agents (PIA){' '}
                      </span>{' '}
                      are human-like computer characters that aim to guide and
                      support students in learning their academic lessons.
                    </p>
                  </div>
                  <div className="flex mx-auto  ">
                    <button
                      onClick={currentUser ? DifficultyPage : undefined}
                      className={`sm:mt-4 xs:mt-4 inline-flex items-center justify-center lg:text-xl sm:text-base xs:text-sm rounded-full lg:h-12 sm:h-10 xs:h-8 lg:px-28 sm:px-10 xs:px-8 font-medium tracking-wide shadow-md    
                      ${
                        !currentUser
                          ? 'aria-disabled: text-gray-100 bg-gray-500/50 cursor-help '
                          : 'text-white bg-yellow-600 hover:bg-yellow-700 focus:shadow-outline focus:outline-none hover:-translate-y-0.5 ease-in-out transition duration-200 transform drop-shadow-[0_3px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_3px_0px_rgba(0,0,0,0.6)]'
                      }`}
                      {...(!currentUser
                        ? {
                            title: 'Log-in to your account to start.',
                          }
                        : {})}
                    >
                      Start
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
