import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

import EditSectionModal from './EditSectionModal';

import EquationSolver from './equationSolver';

import { BsTrash3 } from 'react-icons/bs';
import { HiPencilSquare } from 'react-icons/hi2';

export default function ManageAccounts() {
  const navigate = useNavigate();

  const [accounts, setAccounts] = useState([]);

  var inputText = '';

  useEffect(() => {
    getAccounts();
  }, []);

  function getAccounts() {
    axios
      .get(`http://localhost:80/Prototype-Vite/my-project/api/accountList/`)
      .then(function (response) {
        console.log(response.data);
        setAccounts(response.data);
      });
  }

  const editMode = e => {
    let sectionName = e.target.name;
    window.localStorage.setItem(
      'CURRENT_SECTION_EDIT',
      JSON.stringify(sectionName)
    );
    window.localStorage.setItem('EDIT_SECTION_STATE', true);
    setShowModal(true);
  };

  const handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    inputText = { [name]: value };

    axios
      .post(
        `http://localhost:80/Prototype-Vite/my-project/api/accountList/`,
        inputText
      )
      .then(function (response) {
        setAccounts(response.data);
      });
  };

  // MODAL EDIT
  const [showModal, setShowModal] = useState(false);
  const handleOnCloseModal = () => setShowModal(false);

  const [choiceModal, setChoiceModal] = useState(false);

  const handleOnContinueModal = () => {
    setChoiceModal(true);
    setShowModal(false);
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
      var width = window.localStorage.getItem('NAVBAR_ADMIN_WIDTH');
      setNavbarWidth(width);

      // Logo height
      var height = window.localStorage.getItem('NAVBAR_ADMIN_LOGO');
      setLogoHeight(height);
    }, 1);
  }

  function setWidth() {
    var width = window.localStorage.getItem('NAVBAR_ADMIN_WIDTH');
    setNavbarWidth(width);

    // Logo height
    var height = window.localStorage.getItem('NAVBAR_ADMIN_LOGO');
    setLogoHeight(height);
  }

  return (
    <>
      <div
        className={`bg-gradient-to-t from-[#e2e2e2] via-[#f1f1f1] to-[#ffffff] h-screen   
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
        }`}
      >
        <section className="relative mx-auto p-8 w-full">
          <div
            className={`md:-mt-0 xs:-mt-1 border-b-2 text-gray-600 lg:text-4xl font-bold
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
            <div className="overflow-hidden py-1 pr-2">
              <div className="w-full m-1 overflow-hidden shadow-sm shadow-gray-600 rounded-2xl lg:text-lg sm:text-sm xs:text-xs">
                <div className="flex bg-gray-200 py-1 items-center text-left rounded-2xl">
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
                    className="bg-gray-200  outline-none ml-2 block w-full lg:text-lg sm:text-sm xs:text-xs font-normal"
                    type="text"
                    name="searchQuery"
                    id="searchQuery"
                    onChange={handleChange}
                    placeholder="&nbsp;Search Account..."
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="md:mt-6 xs:mt-3 rounded-3xl overflow-hidden bg-gradient-to-t from-gray-200 via-gray-100 to-white  ">
            <table className="w-full leading-normal ">
              <thead className="sticky top-0 z-40 shadow-md border-b-2 border-gray-200 bg-gray-200 text-left uppercase tracking-wider md:text-base xs:text-xs font-bold text-gray-600">
                <tr>
                  <th className="lg:pl-8 w-[32.5%] py-3 md:text-base sm:text-sm ">
                    <div className="lg:pl-0 sm:pl-3  xs:pl-3">Name</div>
                  </th>
                  <th className=" w-[39.65%] py-3 md:text-base sm:text-xs ">
                    Email
                  </th>
                  <th className="w-[7%] py-3 md:text-base sm:text-xs ">Role</th>
                  <th className="w-[9%] py-3 "></th>
                  <th className="w-[9%] py-3  "></th>
                  <th className="w-[7%] "></th>
                </tr>
              </thead>
            </table>

            <div className="min-h-[calc(100vh-40vh)] bg-white max-h-[calc(100vh-40vh)] relative overflow-y-scroll style-2 mx-auto w-full rounded-md">
              <div className="">
                <div className="">
                  <div className="inline-block min-w-full rounded-lg ">
                    <table className="min-w-full leading-normal -mt-[28px]">
                      <thead className="invisible text-left uppercase tracking-wider font-bold md:text-base xs:text-xs">
                        <tr>
                          <th className="lg:pl-8 w-[32.5%] md:text-base sm:text-sm   whitespace-no-wrap">
                            Name
                          </th>
                          <th className="w-[39.5%]    md:text-base sm:text-sm ">
                            Email
                          </th>
                          <th className="w-[7%]  md:text-base sm:text-sm ">
                            Role
                          </th>
                          <th className="w-[10%] "></th>
                          <th className="w-[10%] "></th>
                        </tr>
                      </thead>

                      <tbody className=" ">
                        {accounts.map((currentAccount, index) => (
                          <tr
                            key={index}
                            className="border-b border-gray-200 bg-white hover:bg-gray-100 text-gray-900 hover:text-indigo-600"
                          >
                            <td className="flex items-center md:text-base xs:text-xs lg:px-5 py-[10px]  whitespace-no-wrap ">
                              <div className="flex-shrink-0  h-10 mr-3 break-all "></div>
                              <p className="  md:text-base xs:text-xs ">
                                {`${currentAccount.GivenName} ${currentAccount.MiddleName} ${currentAccount.LastName}`}
                              </p>
                            </td>
                            <td className="md:text-base xs:text-xs break-all">
                              <div>
                                <p>{currentAccount.Email}</p>
                              </div>
                            </td>
                            <td className="md:text-base xs:text-xs">
                              <p>{`${currentAccount.Role}`}</p>
                            </td>
                            <td className="text-right md:text-base xs:text-xs">
                              <div className="relative">
                                <input
                                  onClick={editMode}
                                  name={currentAccount.SectionName}
                                  type="submit"
                                  value="Edit"
                                  className="cursor-pointer py-[0.2rem]  pl-4 pr-[2.15rem]   shadow-md rounded-full font-normal  transition duration-300 text-white bg-blue-500/90 hover:bg-blue-600 lg:text-base drop-shadow-[0_2px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_2px_0px_rgba(0,0,0,0.6)]"
                                ></input>
                                <span className=" absolute top-[0.25rem] right-3 font-normal text-base flex justify-center">
                                  <HiPencilSquare className="ml-1 lg:mt-[0.2rem] lg:text-lg text-white" />
                                </span>
                              </div>
                            </td>
                            <td className="text-center md:text-base xs:text-xs">
                              <div className="">
                                {accounts.includes(
                                  currentAccount.SectionName
                                ) ? (
                                  <>
                                    <button
                                      disabled
                                      className="relative py-[0.2rem]  px-4 shadow-md rounded-full font-semibold  text-gray-300 bg-gray-400 drop-shadow-[0_2px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_2px_0px_rgba(0,0,0,0.6)]"
                                      title="You can only delete an empty section."
                                    >
                                      <span className="font-normal pl-2 text-base flex justify-center">
                                        Delete
                                        <BsTrash3 className="ml-1 lg:mt-[0.25rem]  lg:text-base" />
                                      </span>
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      type="submit"
                                      className="relative py-[0.2rem]  px-4 shadow-md rounded-full font-semibold  transition duration-500 text-white bg-red-500 hover:bg-red-700 drop-shadow-[0_2px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_2px_0px_rgba(0,0,0,0.6)]"
                                    >
                                      <span className="font-normal pl-2 lg:text-base flex justify-center">
                                        Delete
                                        <BsTrash3 className="ml-1 mt-[0.25rem] lg:text-base" />
                                      </span>
                                    </button>
                                  </>
                                )}
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
        </section>
      </div>
      <EditSectionModal
        onClose={handleOnCloseModal}
        visible={showModal}
        onContinue={handleOnContinueModal}
      />
    </>
  );
}
