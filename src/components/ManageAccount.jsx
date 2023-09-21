import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

import EditSectionModal from './EditSectionModal';

import EquationSolver from './equationSolver';

import { BsGearFill, BsClipboard2X } from 'react-icons/bs';
import { BsTrash3 } from 'react-icons/bs';
import { HiPencilSquare } from 'react-icons/hi2';

import ResetPasswordModal from './ResetPasswordModal';
import ResetPasswordMessageModal from './ResetPasswordMessageModal';
import RemoveResetMessageModal from './RemoveResetMessageModal';

import EditAccountModal from './EditAccountModal';
import EditAccountMessageModal from './EditAccountMessageModal';

import DeleteAccountModal from './DeleteAccountModal';
import DeleteAccountMessageModal from './DeleteAccountMessageModal';

import ManageAccountSkeleton from './ManageAccountSkeleton';

import LoadingSpinner from './LoadingSpinner';

export default function ManageAccount() {
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

      var email = JSON.parse(window.localStorage.getItem('SESSION_EMAIL'));
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

    var account = JSON.parse(window.localStorage.getItem('ACCOUNT_TYPE'));
    if (account == 'Teacher') {
      navigate('/HomePageTeacher');
    } else if (account == 'Student') {
      navigate('/Homepage');
    }
  });

  const [accounts, setAccounts] = useState([]);

  var inputText = '';

  useEffect(() => {
    getAccounts();
  }, []);

  function getAccounts() {
    setSkeletonState(true);
    axios
      .get(`http://localhost:80/Prototype-Vite/my-project/api/accountList/`)
      .then(function (response) {
        //console.log(response.data);
        setAccounts(response.data);
        setTimeout(hideNavbar, 1);

        function hideNavbar() {
          setSkeletonState(false);
        }
      });
  }

  function updateTable() {
    setTableLoader(true);
    axios
      .get(`http://localhost:80/Prototype-Vite/my-project/api/accountList/`)
      .then(function (response) {
        //console.log(response.data);
        setAccounts(response.data);
        setTableLoader(false);
      });
  }

  const [showLoading, setShowLoading] = useState(false);

  const editMode = e => {
    let accountEmail = e.target.name;
    window.sessionStorage.setItem(
      'CURRENT_ACCOUNT_EDIT',
      JSON.stringify(accountEmail)
    );
    window.sessionStorage.setItem('EDIT_ACCOUNT_STATE', true);
    window.sessionStorage.setItem('IS_VALID_FORM', true);
    setShowModal(true);
  };

  const deleteAccount = e => {
    setShowLoading(true);
    let accountEmail = e.target.name;
    window.sessionStorage.setItem(
      'CURRENT_ACCOUNT_DELETE',
      JSON.stringify(accountEmail)
    );
    axios
      .get(
        `http://localhost:80/Prototype-Vite/my-project/api/accountType/${accountEmail}`
      )
      .then(function (response) {
        //console.log(response.data);
        var result = response.data;
        window.sessionStorage.setItem(
          'DELETE_ACCOUNT_TYPE',
          JSON.stringify(result)
        );
        if (result == 'Teacher') {
          axios
            .get(
              `http://localhost:80/Prototype-Vite/my-project/api/getSectionAssigned/${accountEmail}`
            )
            .then(function (response) {
              setShowLoading(false);
              var assignStatus = response.data;
              window.sessionStorage.setItem(
                'TEACHER_ASSIGN_STATUS',
                JSON.stringify(assignStatus)
              );
              setShowDeleteModal(true);
            })
            .catch(function (error) {
              setShowLoading(false);
            });
        } else {
          setShowLoading(false);
          setShowDeleteModal(true);
        }
      })
      .catch(function (error) {
        setShowLoading(false);
      });
  };

  const [tableLoader, setTableLoader] = useState(false);
  var highestTimeoutId = setTimeout(';');

  const handleChange = event => {
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
          `http://localhost:80/Prototype-Vite/my-project/api/accountList/`,
          inputText
        )
        .then(function (response) {
          //console.log(response.data);
          setAccounts(response.data);
          setTableLoader(false);
        });
    }, 1000);
  };

  // MODAL EDIT
  const [showModal, setShowModal] = useState(false);
  const handleOnCloseModal = () => setShowModal(false);

  const handleOnContinueModal = () => {
    setShowModal(false);
    setShowMessageModal(true);
  };

  // MODAL EDIT MESSAGE
  const [showMessageModal, setShowMessageModal] = useState(false);
  const handleOnCloseMessageModal = () => {
    setShowMessageModal(false);
    updateTable();
  };

  // MODAL DELETE
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleOnCloseDeleteModal = () => setShowDeleteModal(false);

  const handleOnContinueDeleteModal = () => {
    setShowLoading(true);
    let accountEmail = JSON.parse(
      window.sessionStorage.getItem('CURRENT_ACCOUNT_DELETE')
    );
    axios
      .post(
        `http://localhost:80/Prototype-Vite/my-project/api/removeAccount/${accountEmail}`
      )
      .then(function (response) {
        setShowLoading(false);
        //console.log(response.data);
        setShowDeleteModal(false);
        setShowDeleteMessageModal(true);
      })
      .catch(function (error) {
        setShowLoading(false);
      });
  };

  // MODAL DELETE MESSAGE
  const [showDeleteMessageModal, setShowDeleteMessageModal] = useState(false);
  const handleOnCloseDeleteMessageModal = () => {
    setShowDeleteMessageModal(false);
    updateTable();
  };

  // MODAL RESET PASSWORD
  const [showResetModal, setShowResetModal] = useState(false);
  const handleOnCloseResetModal = () => setShowResetModal(false);

  const handleOnContinueResetModal = () => {
    var option = JSON.parse(window.sessionStorage.getItem('REQUEST_OPTION'));
    if (option !== null) option = option.replace(/"/g, '');

    console.log(option);
    if (option == 'Reset') {
      setShowResetMessageModal(true);
    } else if (option == 'Remove') {
      setShowResetMessageModal2(true);
    }
  };

  // MODAL RESET PASSWORD MESSAGE
  const [showResetMessageModal, setShowResetMessageModal] = useState(false);
  const handleOnCloseResetMessageModal = () => {
    setShowResetMessageModal(false);
  };

  // MODAL REMOVE RESET MESSAGE
  const [showResetMessageModal2, setShowResetMessageModal2] = useState(false);
  const handleOnCloseResetMessageModal2 = () => {
    setShowResetMessageModal2(false);
  };

  useEffect(() => {
    window.addEventListener('focus', setWidth);
  }, []);

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
      var width = window.sessionStorage.getItem('NAVBAR_ADMIN_WIDTH');
      setNavbarWidth(width);

      // Logo height
      var height = window.sessionStorage.getItem('NAVBAR_ADMIN_LOGO');
      setLogoHeight(height);
    }, 1);
  }

  function setWidth() {
    var width = window.sessionStorage.getItem('NAVBAR_ADMIN_WIDTH');
    setNavbarWidth(width);

    // Logo height
    var height = window.sessionStorage.getItem('NAVBAR_ADMIN_LOGO');
    setLogoHeight(height);
  }

  //FOR SKELETON
  const [skeletonState, setSkeletonState] = useState(true);

  return (
    <>
      <div className={`${!skeletonState ? 'hidden' : ''}`}>
        <ManageAccountSkeleton />
      </div>
      <div
        className={`bg-gradient-to-t from-[#e2e2e2] via-[#f1f1f1] to-[#ffffff] h-screen  overflow-y-auto 
        ${
          navbarWidth == 193
            ? 'w-[calc(100%-193px)] ml-[193px]'
            : navbarWidth == 125
            ? 'w-[calc(100%-125px)] ml-[125px]'
            : navbarWidth == 90
            ? 'w-[calc(100%-90px)] ml-[90px]'
            : navbarWidth == 56
            ? 'w-[calc(100%-56px)] ml-[56px]'
            : navbarWidth == 176
            ? 'w-[calc(100%-176px)] ml-[176px]'
            : navbarWidth == 108
            ? 'w-[calc(100%-108px)] ml-[108px]'
            : navbarWidth == 73
            ? 'w-[calc(100%-73px)] ml-[73px]'
            : navbarWidth == 39
            ? 'w-[calc(100%-39px)] ml-[39px]'
            : ''
        } ${skeletonState ? 'hidden' : ''}`}
      >
        <section className="relative mx-auto p-8 w-full">
          <div
            className={`md:-mt-0 xs:-mt-1 border-b-2 text-gray-600 lg:text-4xl  font-bold
          ${
            logoHeight == 78.5
              ? 'max-h-[78.5px]'
              : logoHeight == 40.5
              ? 'max-h-[40.5px]'
              : 'max-h-[78.5px]'
          }`}
          >
            Accounts
          </div>

          <div className="mt-1.5">
            <div className="overflow-hidden hdScreen:py-1 semihdScreen:py-1 laptopScreen:py-0 averageScreen:py-0 pr-2">
              <div className="inline-flex w-full m-1   rounded-2xl lg:text-lg sm:text-sm xs:text-xs ">
                <div className="grow mr-5 flex bg-gray-200 shadow-sm shadow-gray-600 py-1 items-center text-left rounded-2xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-4 lg:h-10 lg:w-10  xs:h-5 xs:w-10 lg:scale-100 md-scale:80 sm-scale:60 text-gray-400"
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
                    placeholder="&nbsp;Search Account..."
                    autoComplete="off"
                  />
                </div>
                <button
                  onClick={e => setShowResetModal(true)}
                  type="button"
                  className="relative hdScreen:w-[19rem] semihdScreen:w-[16.5rem] laptopScreen:w-[15.5rem] averageScreen:w-[15rem] md:w-[14rem] sm:w-[10rem] xs:w-[8rem]  lg:py-3 lg:px-5 sm:py-1.5 sm:px-2.5 xs:px-1 xs:py-1 text-white font-semibold  shadow-md rounded-2xl bg-gray-500/70 hover:bg-gray-600/70  ease-in-out transition duration-300 transform drop-shadow-[0_3px_0px_rgba(0,0,0,0.2)] hover:drop-shadow-[0_3px_0px_rgba(0,0,0,0.35)]"
                >
                  <span className="md:pl-2 lg:text-xl sm:text-base xs:text-sm flex justify-center">
                    Reset Password
                    <BsGearFill className="md:block xs:hidden  lg:ml-2 sm:ml-1 xs:ml-0.5 lg:mt-0.5 sm:mt-1 xs:mt-1 lg:text-2xl" />
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="md:mt-6 xs:mt-3 rounded-3xl overflow-hidden bg-gradient-to-t from-gray-200 via-gray-100 to-white  ">
            <table className="w-full leading-normal ">
              <thead className="sticky top-0 z-40 shadow-md border-b-2 border-gray-200 bg-gray-200 text-left uppercase tracking-wider lg:text-base md:text-sm xs:text-xs font-bold text-gray-600">
                <tr>
                  <th className="lg:pl-8 w-[32.6%] py-3 lg:text-base md:text-sm sm:text-xs ">
                    <div className="lg:pl-0 sm:pl-3  xs:pl-3">Name</div>
                  </th>
                  <th className=" w-[35.7%] py-3 lg:text-base md:text-sm sm:text-xs ">
                    Email
                  </th>
                  <th className="w-[14%] py-3 lg:text-base md:text-sm sm:text-xs ">
                    Role
                  </th>

                  <th className="w-[5%]">
                    <div className="invisible">
                      <input
                        type="submit"
                        value="Edit"
                        className="cursor-pointer py-[0.2rem] md:pl-4 md:pr-[2.15rem] md:w-24 xs:w-14    shadow-md rounded-md font-normal  transition duration-300 text-white bg-blue-500/90 hover:bg-blue-600 lg:text-base drop-shadow-[0_2px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_2px_0px_rgba(0,0,0,0.6)]"
                      ></input>
                      <span className=" absolute top-[0.25rem] right-5 font-normal text-base flex justify-center">
                        <HiPencilSquare className="md:block xs:hidden  ml-1 lg:mt-[0.2rem] lg:text-lg text-white" />
                      </span>
                    </div>
                  </th>
                  <th className="w-[11%]">
                    <div className="invisible ">
                      <input
                        type="submit"
                        value="Delete"
                        className=" cursor-pointer py-[0.2rem]  md:pl-4 md:pr-[2.15rem] md:w-24 xs:w-14   shadow-md rounded-md font-semibold  transition duration-500 text-white bg-red-500 hover:bg-red-700 drop-shadow-[0_2px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_2px_0px_rgba(0,0,0,0.6)]"
                      ></input>
                      <span className=" absolute top-[0.25rem] right-3 font-normal flex justify-center items-center">
                        <BsTrash3 className="md:block xs:hidden ml-1 lg:mt-[0.2rem] lg:text-base text-white" />
                      </span>
                    </div>
                  </th>
                  <th className="w-[1%] "></th>
                </tr>
              </thead>
            </table>

            <div
              className="hdScreen:min-h-[calc(100vh-40vh)] hdScreen:max-h-[calc(100vh-40vh)] 
                            semihdScreen:min-h-[calc(100vh-45vh)] semihdScreen:max-h-[calc(100vh-45vh)]
                            laptopScreen:min-h-[calc(100vh-52.5vh)] laptopScreen:max-h-[calc(100vh-52.5vh)]
                            averageScreen:min-h-[calc(100vh-55vh)] averageScreen:max-h-[calc(100vh-55vh)]
                            xs:min-h-[calc(100vh-55vh)] xs:max-h-[calc(100vh-55vh)]
                            bg-white relative overflow-y-scroll style-2 mx-auto w-full rounded-md"
            >
              <div
                className={` -mt-4 absolute flex-col items-center justify-center h-full w-full hdScreen:scale-100 semihdScreen:scale-90 laptopScreen:scale-85 averageScreen:scale-80 md:scale-75 sm:scale-70 xs:scale-60
                 ${tableLoader ? 'flex' : 'hidden'}`}
              >
                <div className="loader border-8 border-[#e2c209]"></div>
                <p className="pt-2 hdScreen:text-lg semihdScreen:text-lg laptopScreen:text-base averageScreen:text-base sm:text-sm xs:text-xs">
                  Fetching Data...
                </p>
              </div>

              <div className={`${tableLoader ? 'hidden' : ''}`}>
                {accounts.length > 0 ? (
                  <div className="">
                    <div className="inline-block min-w-full rounded-lg ">
                      <table className="min-w-full leading-normal -mt-[28px]">
                        <thead className="invisible text-left uppercase tracking-wider font-bold lg:text-base md:text-sm xs:text-xs">
                          <tr>
                            <th className="lg:pl-8 w-[32.5%] lg:text-base md:text-sm sm:text-sm   whitespace-no-wrap">
                              Name
                            </th>
                            <th className="w-[35.5%]    lg:text-base md:text-sm sm:text-sm ">
                              Email
                            </th>
                            <th className="w-[14%]  lg:text-base md:text-sm sm:text-sm ">
                              Role
                            </th>
                            <th className="hdScreen:w-[7.5%] lg:w-[5%] "></th>
                            <th className="hdScreen:w-[9%] lg:w-[10%] "></th>
                            <th className="hdScreen:w-[0.5%] lg:w-[1%]"></th>
                          </tr>
                        </thead>

                        <tbody className=" ">
                          {accounts.map((currentAccount, index) => (
                            <tr
                              key={index}
                              className="odd:bg-white even:bg-slate-50/30 border-b border-gray-200 bg-white hover:bg-gray-100 text-gray-900 hover:text-indigo-600"
                            >
                              <td className="flex items-center lg:text-base md:text-sm xs:text-xs lg:px-5 py-[10px]  whitespace-no-wrap ">
                                <div className="flex-shrink-0  h-10 mr-3 break-all "></div>
                                <p className="  lg:text-base md:text-sm xs:text-xs ">
                                  {`${currentAccount.GivenName} ${currentAccount.MiddleName} ${currentAccount.LastName}`}
                                </p>
                              </td>
                              <td className="lg:text-base md:text-sm xs:text-xs break-all">
                                <div>
                                  <p>{currentAccount.Email}</p>
                                </div>
                              </td>
                              <td className="lg:text-base md:text-sm xs:text-xs">
                                <p>{`${currentAccount.Role}`}</p>
                              </td>
                              <td className="text-right lg:text-base md:text-sm xs:text-xs">
                                <div className="relative">
                                  <input
                                    onClick={editMode}
                                    name={currentAccount.Email}
                                    type="submit"
                                    value="Edit"
                                    className="cursor-pointer py-[0.2rem] md:pl-4 md:pr-[2.15rem] md:w-24 xs:w-14    shadow-md rounded-md font-normal  transition duration-300 text-white bg-blue-500/90 hover:bg-blue-600 lg:text-base drop-shadow-[0_2px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_2px_0px_rgba(0,0,0,0.6)]"
                                  ></input>
                                  <span className="md:block xs:hidden absolute top-[0.25rem] right-5 font-normal text-base flex justify-center">
                                    <HiPencilSquare className="  ml-1 lg:mt-[0.2rem] lg:text-lg text-white" />
                                  </span>
                                </div>
                              </td>
                              <td className="text-right hdScreen:pr-6 semihdScreen:pr-1 laptopScreen:pr-0.5 averageScreen:pr-0 lg:text-base md:text-sm xs:text-xs">
                                <div className="relative ">
                                  <input
                                    onClick={deleteAccount}
                                    name={currentAccount.Email}
                                    type="submit"
                                    value="Delete"
                                    className=" cursor-pointer py-[0.2rem]  md:pl-4 md:pr-[2.15rem] md:w-24 xs:w-14   shadow-md rounded-md font-semibold  transition duration-500 text-white bg-red-500 hover:bg-red-700 drop-shadow-[0_2px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_2px_0px_rgba(0,0,0,0.6)]"
                                  ></input>
                                  <span className="md:block xs:hidden absolute top-[0.25rem] right-3 font-normal flex justify-center items-center">
                                    <BsTrash3 className=" ml-1 lg:mt-[0.2rem] lg:text-base text-white" />
                                  </span>
                                </div>
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
                        No matches found.
                      </p>
                      <p className="sm:text-lg xs:text-sm">
                        Try checking if there's a typographical error
                        <br></br>in your query.{' '}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      <EditAccountModal
        onClose={handleOnCloseModal}
        visible={showModal}
        onContinue={handleOnContinueModal}
      />

      <EditAccountMessageModal
        onClose={handleOnCloseMessageModal}
        visible={showMessageModal}
      />

      <DeleteAccountModal
        onClose={handleOnCloseDeleteModal}
        visible={showDeleteModal}
        onContinue={handleOnContinueDeleteModal}
      />

      <DeleteAccountMessageModal
        onClose={handleOnCloseDeleteMessageModal}
        visible={showDeleteMessageModal}
      />

      <ResetPasswordModal
        onClose={handleOnCloseResetModal}
        visible={showResetModal}
        onContinue={handleOnContinueResetModal}
      />

      <ResetPasswordMessageModal
        onClose={handleOnCloseResetMessageModal}
        visible={showResetMessageModal}
      />

      <RemoveResetMessageModal
        onClose={handleOnCloseResetMessageModal2}
        visible={showResetMessageModal2}
      />

      <LoadingSpinner visible={showLoading} />
    </>
  );
}
