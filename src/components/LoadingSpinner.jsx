import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { VscInfo } from 'react-icons/vsc';

const LoadingSpinner = ({ visible }) => {
  if (!visible) return null;

  const [acc, setAccType] = useState('');

  useEffect(() => {
    var account = JSON.parse(window.localStorage.getItem('ACCOUNT_TYPE'));
    if (account !== null) {
      checkAccountType(account);
    }
  });

  function checkAccountType(account) {
    if (account == 'Teacher') {
      setAccType('Teacher');
    } else if (account == 'Admin') {
      setAccType('Admin');
    }
  }
  return (
    <>
      <div
        id="mainContainer"
        className="fixed top-0 inset-0 z-[10000] bg-black bg-opacity-50 backdrop-blur-[1.5px] flex justify-center items-center "
      >
        <div
          className={`loader
        ${
          acc == 'Admin'
            ? 'border-8 border-[#e2c209]'
            : acc == 'Teacher'
            ? 'border-8 border-[#89ce1a]'
            : ''
        }`}
        ></div>
      </div>
    </>
  );
};

export default LoadingSpinner;
