import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdClose } from 'react-icons/md';
import { VscInfo } from 'react-icons/vsc';

import EndSession from './EndSession';
import ClearStorage from './ClearStorage';

export default function LogoutWarning() {
  const navigate = useNavigate();
  const [accType, setAccType] = useState('');

  document.addEventListener('mouseover', checkLoginStatus);

  function checkLoginStatus() {
    var status = JSON.parse(window.localStorage.getItem('LOGIN_STATUS'));
    if (status === null) status = '';

    var email = JSON.parse(window.localStorage.getItem('SESSION_EMAIL'));
    if (email === null) email = '';

    if (email != '') {
      setAccType(status);
      checkLoginState();
      checkLoginStateDelay();

      if (status != '') {
      }
    }
  }

  useEffect(() => {
    var status = JSON.parse(window.localStorage.getItem('LOGIN_STATUS'));
    if (status === null) status = '';

    var email = JSON.parse(window.localStorage.getItem('SESSION_EMAIL'));
    if (email === null) email = '';

    if (email != '') {
      setAccType(status);
      checkLoginState();
      checkLoginStateDelay();

      if (status != '') {
      }
    }
  });

  useEffect(() => {
    var status = JSON.parse(window.localStorage.getItem('LOGIN_STATUS'));
    if (status === null) status = '';

    var email = JSON.parse(window.localStorage.getItem('SESSION_EMAIL'));
    if (email === null) email = '';

    if (email != '') {
      setAccType(status);
    }
  }, []);

  function checkLoginState() {
    var status = JSON.parse(window.localStorage.getItem('LOGIN_STATUS'));
    if (status === null) {
      status = '';
    } else {
      status = status.replace(/"/g, '');
    }
    setAccType(status);
  }

  function checkLoginStateDelay() {
    setTimeout(function () {
      var status = JSON.parse(window.localStorage.getItem('LOGIN_STATUS'));
      if (status === null) {
        status = '';
        setAccType(status);
      } else {
        status = status.replace(/"/g, '');
        var account = JSON.parse(window.localStorage.getItem('ACCOUNT_TYPE'));
        if (account == 'Student') {
          EndSession.recordData();

          setAccType(status);
        } else {
          setAccType(status);
        }
      }
    }, 1);
  }

  const clearData = () => {
    var account = JSON.parse(window.localStorage.getItem('ACCOUNT_TYPE'));
    if (account == 'Student') {
      ClearStorage.clearData();
      window.localStorage.setItem('SESSION_USER', JSON.stringify(''));
      window.localStorage.setItem('SESSION_EMAIL', JSON.stringify(''));
      window.localStorage.setItem('SESSION_ID', JSON.stringify(''));
      window.localStorage.removeItem('SESSION_ID');
      window.localStorage.removeItem('TIME_SPENT');
    }
  };

  const closeLogoutWarning = () => {
    window.localStorage.removeItem('SESSION_USER_LOGS');
    window.localStorage.removeItem('DIFFICULTY_TYPE');
    window.localStorage.removeItem('LOGIN_STATUS');
    window.localStorage.removeItem('UNIQUE_ID');
    setAccType('');
    navigate('/LoginPage');
  };

  return (
    <>
      <div
        id="mainContainer"
        className={`fixed top-0 inset-0 z-[999] bg-black bg-opacity-50 backdrop-blur-[1.5px]  justify-center items-center 
                  ${accType == 'Terminated' ? 'flex' : 'hidden'}`}
      >
        <div className="bg-white  rounded text-lg  hdScreen:scale-100 semihdScreen:scale-95 laptopScreen:scale-90 averageScreen:scale-90 md:scale-85 sm:scale-80 xs:scale-75">
          <div className="grid grid-cols-2 bg-gray-400 b">
            <VscInfo className="text-[1.85rem] ml-1 mt-0.5 text-black/60" />
            <div className="text-right">
              <button
                onClick={closeLogoutWarning}
                className="bg-red-500 p-2 inline-block hover:bg-red-600 hover:text-white"
              >
                <MdClose />
              </button>
            </div>
          </div>
          <div className="">
            <div className="p-4 text-center">
              Account has been logged-in to a different device or browser
              <br />
              or this account has been modified by the administrator.
              <br></br>
              <span className="text-gray-500">
                (The active session will be terminated.)
              </span>
            </div>
            <div className="mx-auto text-center border-t-2 border-gray-300 py-3 ">
              <button
                onMouseEnter={clearData}
                onClick={closeLogoutWarning}
                className="bg-gray-400/60 h-8 w-20 tracking-wide inline-block rounded-lg hover:bg-gray-400 hover:text-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
