import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

import { Formik, useFormik } from 'formik';
import { editAccountSchema } from '../schemas';
import { editSectionSchema } from '../schemas';
import { contactAdminSchema } from '../schemas';

import { VscCheckAll, VscPassFilled } from 'react-icons/vsc';

import { BsSlashCircle } from 'react-icons/bs';
import { BsFillSendFill } from 'react-icons/bs';

import { MdClose } from 'react-icons/md';
import { VscQuestion } from 'react-icons/vsc';

import StorageData from './StorageData';
import SecureStorageData from './SecureStorageData';

const IgnoreWarningModal = ({ visible, onClose, onContinue }) => {
  const navigate = useNavigate();

  const [accountDuplicateRows, setAccountDuplicateRows] = useState([]);
  const [accountMultipleRows, setAccountMultipleRows] = useState([]);

  const [length, setLength] = useState(0);

  useEffect(() => {
    var resetStates = StorageData.sessionStorageRAW(
      'IS_ERROR_RESET_STATES_IGNORE'
    );
    if (resetStates !== null) {
      setAccountDuplicateRows([]);
      setAccountMultipleRows([]);
      setLength(0);
      window.sessionStorage.removeItem('IS_ERROR_RESET_STATES_IGNORE');
    }

    var accDuplicateRows = StorageData.sessionStorageRAW(
      'IS_ERROR_DUPLICATE_ROW'
    );

    console.log(accDuplicateRows);

    var accMultipleRows = StorageData.sessionStorageRAW(
      'IS_ERROR_MULTIPLE_ROW'
    );

    console.log(accMultipleRows);

    var accDuplicate = StorageData.sessionStorageJSON(
      'IS_ERROR_ACCOUNT_DUPLICATE_IGNORE'
    );

    if (accDuplicate !== null && accDuplicate == true) {
      window.sessionStorage.setItem(
        'IS_ERROR_ACCOUNT_DUPLICATE_IGNORE',
        SecureStorageData.dataEncryption(false)
      );

      if (accDuplicateRows !== null) {
        var data1 = [];

        var currentData = accDuplicateRows;

        currentData = currentData.replace(/\[/g, '');
        currentData = currentData.replace(/\]/g, '');

        let firstIndex = 0;
        let endIndex = 0;
        for (let i = 0; i < currentData.length; i++) {
          let isEnd = false;
          if (currentData[i] == ',') {
            firstIndex = 0;
            endIndex = 0;
            continue;
          }

          if (currentData[i] == '"') {
            if (firstIndex == 0) {
              firstIndex = i + 1;
            } else {
              endIndex = i;
              isEnd = true;
            }
          }
          if (isEnd) {
            //console.log(currentData.substring(firstIndex, endIndex));
            data1.push(currentData.substring(firstIndex, endIndex));
            isEnd = false;
          }
        }

        console.log(data1);
        setAccountDuplicateRows(data1);
      }
    }

    var accMultiple = StorageData.sessionStorageJSON(
      'IS_ERROR_ACCOUNT_MULTIPLE_IGNORE'
    );

    if (accMultiple !== null && accMultiple == true) {
      window.sessionStorage.setItem(
        'IS_ERROR_ACCOUNT_MULTIPLE_IGNORE',
        SecureStorageData.dataEncryption(false)
      );

      if (accMultipleRows !== null) {
        var data2 = [];

        var currentData = accMultipleRows;

        currentData = currentData.replace(/\[/g, '');
        currentData = currentData.replace(/\]/g, '');

        let firstIndex = 0;
        let endIndex = 0;
        for (let i = 0; i < currentData.length; i++) {
          let isEnd = false;
          if (currentData[i] == ',') {
            firstIndex = 0;
            endIndex = 0;
            continue;
          }

          if (currentData[i] == '"') {
            if (firstIndex == 0) {
              firstIndex = i + 1;
            } else {
              endIndex = i;
              isEnd = true;
            }
          }
          if (isEnd) {
            //console.log(currentData.substring(firstIndex, endIndex));
            data2.push(currentData.substring(firstIndex, endIndex));
            isEnd = false;
          }
        }

        console.log(data2);
        setLength(data2.length);
        setAccountMultipleRows(data2);
      }
    }
  });

  //window.localStorage.setItem("");
  const handleOnClose = e => {
    if (e.target.id === 'mainContainer') onClose();
  };

  if (!visible) return null;

  return (
    <>
      <div
        id="mainContainer"
        onClick={handleOnClose}
        className={`fixed top-0 z-50 inset-0 bg-black bg-opacity-50 backdrop-blur-[1.5px] flex justify-center items-center "
        `}
      >
        <div className="bg-white rounded lg:text-lg xs:text-xs shadow-md  ">
          <div className="grid grid-cols-2 bg-gray-400 ">
            <span className="lg:text-xl xs:text-lg  mt-0.5 text-black/60 font-semibold">
              <VscQuestion className="text-[1.85rem] ml-1 mt-0.5 text-black/60" />
            </span>
            <div className="text-right">
              <button
                onClick={onClose}
                className="transition duration-200 p-2 inline-block hover:bg-red-600 hover:text-white"
              >
                <MdClose />
              </button>
            </div>
          </div>
          <div className=" text-center text-gray-800">
            <div className="overflow-y-auto lg:text-lg xs:text-xs relative lg:py-1 lg:pb-6 xs:pb-3 lg:px-8 xs:px-2 ">
              <div className="mt-4 text-center">
                <p className="text-xl font-semibold ">
                  Do you really want to ignore warning(s) for:
                </p>{' '}
                <p className="text-gray-500 text-lg font-normal">
                  {accountDuplicateRows.map(account =>
                    length > 0 ? (
                      <span key={account}>
                        [{account}]<span>,{'\u00A0'}</span>
                      </span>
                    ) : (
                      <span key={account}>[{account}]</span>
                    )
                  )}
                  {accountMultipleRows.map((account, index) =>
                    length === index + 1 ? (
                      <span key={account}>[{account}]</span>
                    ) : (
                      <span key={account}>
                        [{account}]<span>,{'\u00A0'}</span>
                      </span>
                    )
                  )}
                  ?
                </p>
              </div>

              {/**
              {accountDuplicate ? (
                accountDuplicateRows.map(account => (
                  <div className="flex flex-col">
                    <div className="flex  mt-4 ">
                      <div className="font-semibold text-red-600">
                        Error:{'\u00A0'}
                      </div>
                      <div className="text-justify rounded-md border-2 border-red-600  w-full shadow-sm shadow-red-400 px-2">
                        In <span className="font-semibold">{account}</span>. The
                        email generated for that account already exist.{' '}
                      </div>
                    </div>
                    <div className="flex  ">
                      <div className="font-semibold text-red-600 invisible">
                        Error:{'\u00A0'}
                      </div>
                      <div className="text-orange-600  text-base text-center">
                        (Delete the existing account or ignore the warning.)
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <></>
              )}

              {accountMultiple ? (
                <div className="flex flex-col">
                  <div className="flex  mt-4 ">
                    <div className="font-semibold text-red-600">
                      Error:{'\u00A0'}
                    </div>
                    <div className="text-justify rounded-md border-2 border-red-600  w-full shadow-sm shadow-red-400 px-2">
                      <span className="font-semibold">
                        {accountMultipleRows.map((account, index) =>
                          length === index + 1 ? (
                            <>{account}</>
                          ) : (
                            <>
                              {account}
                              <span className="font-normal">,{'\u00A0'}</span>
                            </>
                          )
                        )}
                      </span>
                      . Have the same email generated.{' '}
                    </div>
                  </div>
                  <div className="flex  ">
                    <div className="font-semibold text-red-600 invisible">
                      Error:{'\u00A0'}
                    </div>
                    <div className="text-orange-600  text-base text-center">
                      (Remove the row of duplicated names or ignore the
                      warning.)
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
               */}
            </div>
            <div className="mx-auto text-center  border-t-2 border-gray-300 py-3">
              <button
                onClick={onClose}
                className="transition duration-200 mx-2 text-white tracking-wide bg-gray-500/90 h-9 w-28 inline-block rounded-lg hover:bg-gray-600 hover:text-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={onContinue}
                className="transition duration-200 mx-2 text-white tracking-wide bg-red-600/90 h-9 w-28 inline-block rounded-lg hover:bg-red-700 hover:text-gray-200"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IgnoreWarningModal;
