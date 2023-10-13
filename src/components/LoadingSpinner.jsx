import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { VscInfo } from 'react-icons/vsc';

import StorageData from './StorageData';
import SecureStorageData from './SecureStorageData';

const LoadingSpinner = ({ visible }) => {
  if (!visible) return null;

  const [acc, setAccType] = useState('');
  const [loginPage, setLoginPage] = useState(false);

  useEffect(() => {
    var logged = StorageData.localStorageJSON('SESSION_USER');
    if (logged === null || logged == '') {
      setLoginPage(true);
    } else {
      setLoginPage(false);
    }

    var account = StorageData.localStorageJSON('ACCOUNT_TYPE');
    if (account !== null) {
      checkAccountType(account);
    }
  });

  function checkAccountType(account) {
    if (account == 'Teacher') {
      setAccType('Teacher');
    } else if (account == 'Admin') {
      setAccType('Admin');
    } else {
      setAccType('Student');
    }
  }
  return (
    <>
      <div
        id="mainContainer"
        className={`fixed   top-0 inset-0 z-[10000] bg-black  flex justify-center items-center 
                  ${
                    loginPage
                      ? 'bg-opacity-10 rounded-2xl backdrop-blur-[1.5px]'
                      : 'bg-opacity-50 backdrop-blur-[1.5px]'
                  }`}
      >
        <div
          className={`loader
        ${
          acc == 'Admin'
            ? 'border-8 border-[#e2c209]'
            : acc == 'Teacher'
            ? 'border-8 border-[#89ce1a]'
            : acc == 'Student'
            ? 'border-8 border-[#bef264]'
            : ''
        }`}
        ></div>
      </div>
    </>
  );
};

export default LoadingSpinner;
