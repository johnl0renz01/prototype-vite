import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import { MdClose } from 'react-icons/md';
import { VscInfo } from 'react-icons/vsc';

import LoadingSpinner from './LoadingSpinner';

const ResetPasswordModal = ({ visible, onClose, onContinue }) => {
  const [showLoading, setShowLoading] = useState(false);
  const navigate = useNavigate();

  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    getAccounts();
  }, []);

  function getAccounts() {
    setShowLoading(true);
    axios
      .get(
        `http://localhost:80/Prototype-Vite/my-project/api/resetPasswordList/`
      )
      .then(function (response) {
        setShowLoading(false);
        console.log(response.data);
        setAccounts(response.data);
      })
      .catch(function (error) {
        setShowLoading(false);
      });
  }

  const handleOnClose = e => {
    if (e.target.id === 'mainContainer') onClose();
  };

  const resetPass = e => {
    setShowLoading(true);
    window.sessionStorage.setItem('REQUEST_OPTION', JSON.stringify('Reset'));

    let accountEmail = e.target.name;
    axios
      .post(
        `http://localhost:80/Prototype-Vite/my-project/api/resetPassword/${accountEmail}`
      )
      .then(function (response) {
        setShowLoading(false);
        getAccounts();
        onContinue();
      })
      .catch(function (error) {
        setShowLoading(false);
      });
  };

  const removeRequest = e => {
    setShowLoading(true);
    window.sessionStorage.setItem('REQUEST_OPTION', JSON.stringify('Remove'));

    let accountEmail = e.target.name;
    axios
      .post(
        `http://localhost:80/Prototype-Vite/my-project/api/resetPassword/${accountEmail}`
      )
      .then(function (response) {
        setShowLoading(false);
        getAccounts();
        //onContinue();
      })
      .catch(function (error) {
        setShowLoading(false);
      });
  };

  if (!visible) return null;

  return (
    <>
      <div
        id="mainContainer"
        onClick={handleOnClose}
        className={`fixed top-0 z-50 inset-0 bg-black bg-opacity-50 backdrop-blur-[1.5px] flex justify-center items-center "
                  ${showLoading ? 'invisible' : ''}`}
      >
        {accounts.length > 0 ? (
          <div className="bg-white hdScreen:w-[50%] semihdScreen:w-[65%] laptopScreen:w-[65%] averageScreen:w-[65%] hdScreen:scale-100 semihdScreen:scale-95 laptopScreen:scale-90 averageScreen:scale-90 rounded lg:text-lg xs:text-xs shadow-md ">
            <div className="overflow-hidden  ">
              <table className="w-full leading-normal ">
                <thead className="sticky top-0 z-40 shadow-md border-b-2 border-gray-200 bg-gray-200 text-left uppercase tracking-wider md:text-base xs:text-xs font-bold text-gray-600">
                  <tr>
                    <th className="lg:pl-8 w-[40%]  md:text-base sm:text-sm ">
                      <div className="lg:pl-0 sm:pl-3  xs:pl-3">Name</div>
                    </th>
                    <th className="w-[9.5%]  md:text-base sm:text-xs ">
                      Email
                    </th>

                    <th className="w-[24%] "></th>
                    <th className="w-[24%] "></th>
                    <th className="w-[0%]">
                      <button
                        onClick={onClose}
                        className="bg-gray-400/70 p-2 inline-block hover:bg-red-600 transition duration-200 hover:text-white"
                      >
                        <MdClose />
                      </button>
                    </th>
                  </tr>
                </thead>
              </table>

              <div className=" relative overflow-y-scroll style-2 mx-auto w-full rounded-md">
                <div className="">
                  <div className="">
                    <div className="inline-block min-w-full rounded-lg ">
                      <table className="min-w-full leading-normal -mt-[28px]">
                        <thead className="invisible text-left uppercase tracking-wider font-bold md:text-base xs:text-xs">
                          <tr>
                            <th className="lg:pl-8 w-[40%] md:text-base sm:text-sm   whitespace-no-wrap">
                              Name
                            </th>
                            <th className="w-[10%]  md:text-base sm:text-sm ">
                              Email
                            </th>
                            <th></th>
                            <th className="w-[0.5%] mr-4"></th>
                          </tr>
                        </thead>

                        <tbody className=" ">
                          {accounts.map((currentAccount, index) => (
                            <tr
                              key={index}
                              className="odd:bg-white even:bg-slate-50/30 border-b border-gray-200 bg-white hover:bg-gray-100 text-gray-900 hover:text-indigo-600"
                            >
                              <td className="flex items-center md:text-base xs:text-xs lg:px-5 py-[10px]  whitespace-no-wrap ">
                                <div className="flex-shrink-0  h-10 mr-3 break-all "></div>
                                <p className="  md:text-base xs:text-xs ">
                                  {currentAccount.Name}
                                </p>
                              </td>
                              <td className="md:text-base xs:text-xs">
                                <p>{currentAccount.Email}</p>
                              </td>
                              <td className="text-right md:text-base xs:text-xs pr-2">
                                <div className="relative">
                                  <input
                                    onClick={resetPass}
                                    name={currentAccount.Email}
                                    type="submit"
                                    value="Reset"
                                    className={`cursor-pointer py-[0.35rem]  px-4 text-red-600 hover:text-white  shadow-md rounded-md font-semibold  transition duration-300 border-red-500 border-2  hover:bg-red-600 hover:border-red-600 lg:text-base
                                              `}
                                  ></input>
                                </div>
                              </td>
                              <td className="text-right md:text-base xs:text-xs pr-2">
                                <div className="relative">
                                  <input
                                    onClick={removeRequest}
                                    name={currentAccount.Email}
                                    type="submit"
                                    value="Remove"
                                    className={`cursor-pointer py-[0.35rem]  px-4  shadow-md rounded-md font-normal  transition duration-300 text-white bg-red-600 hover:bg-red-800  lg:text-base drop-shadow-[0_2px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_2px_0px_rgba(0,0,0,0.6)]
                                              `}
                                  ></input>
                                </div>
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
          </div>
        ) : (
          <>
            <div className="bg-white  rounded text-lg hdScreen:scale-100 semihdScreen:scale-95 laptopScreen:scale-90 averageScreen:scale-90 md:scale-85 sm:scale-80 xs:scale-75 first-letter:  ">
              <div className="grid grid-cols-2 bg-gray-400 ">
                <VscInfo className="text-[1.85rem] ml-1 mt-0.5 text-black/60" />
                <div className="text-right">
                  <button
                    onClick={onClose}
                    className="transition duration-200 p-2 inline-block hover:bg-red-600 hover:text-white"
                  >
                    <MdClose />
                  </button>
                </div>
              </div>
              <div className="">
                <div className="p-4 ">
                  There are currently no reset request(s).
                </div>
                <div className="mx-auto text-center border-t-2 border-gray-300 py-3 ">
                  <button
                    onClick={onClose}
                    className="bg-gray-400/60 h-8 w-20  transition duration-200 tracking-wide inline-block rounded-lg hover:bg-gray-400 hover:text-gray-100"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <LoadingSpinner visible={showLoading} />
    </>
  );
};

export default ResetPasswordModal;
