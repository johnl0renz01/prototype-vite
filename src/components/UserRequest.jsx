import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

import EditSectionModal from './EditSectionModal';

import EquationSolver from './equationSolver';

import { BsEye, BsDashCircle, BsCheckCircle } from 'react-icons/bs';
import { HiPencilSquare } from 'react-icons/hi2';

export default function UserRequest() {
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
            Request(s)
          </div>

          <div className="mt-1.5 lg:text-lg sm:text-base xs:text-xs font-semibold tracking-wide pl-2">
            There are currently no requests.
          </div>

          <div className="md:mt-6 xs:mt-3 rounded-3xl overflow-hidden bg-gradient-to-t from-gray-200 via-gray-100 to-white  ">
            <table className="w-full leading-normal ">
              <thead className="sticky top-0 z-40 shadow-md border-b-2 border-gray-200 bg-gray-200 text-left uppercase tracking-wider md:text-base xs:text-xs font-bold text-gray-600">
                <tr>
                  <th className="lg:pl-8 w-[32.5%] py-3 md:text-base sm:text-sm ">
                    <div className="lg:pl-0 sm:pl-3  xs:pl-3">Subject</div>
                  </th>
                  <th className=" w-[27.3%] py-3 md:text-base sm:text-xs ">
                    From
                  </th>
                  <th className="w-[10%] py-3 md:text-base sm:text-xs ">
                    Role
                  </th>
                  <th className="w-[20%] py-3 "></th>
                  <th className="w-[12.5%] py-3  "></th>
                  <th className="w-[7%] "></th>
                </tr>
              </thead>
            </table>

            <div className="min-h-[calc(100vh-35vh)] bg-white max-h-[calc(100vh-35vh)] relative overflow-y-scroll style-2 mx-auto w-full rounded-md">
              <div className="">
                <div className="">
                  <div className="inline-block min-w-full rounded-lg ">
                    <table className="min-w-full leading-normal -mt-[28px]">
                      <thead className="invisible text-left uppercase tracking-wider font-bold md:text-base xs:text-xs">
                        <tr>
                          <th className="lg:pl-8 w-[32.5%] md:text-base sm:text-sm   whitespace-no-wrap">
                            Name
                          </th>
                          <th className="w-[27.5%]    md:text-base sm:text-sm ">
                            From
                          </th>
                          <th className="w-[10%]  md:text-base sm:text-sm ">
                            Role
                          </th>
                          <th className="w-[20%] "></th>
                          <th className="w-[12.5%] "></th>
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
                            <td className="md:text-base xs:text-xs ">
                              <p>{`${currentAccount.Role}`}</p>
                            </td>
                            <td className="text-right md:text-base xs:text-xs whitespace-no-wrap ">
                              <div className="relative">
                                <button
                                  type="submit"
                                  className="relative py-[0.2rem]  px-4 shadow-md rounded-full font-semibold  transition duration-500 text-gray-700 border-gray-400 border-2 hover:text-white hover:bg-gray-500 hover:border-gray-500 "
                                >
                                  <span className="font-normal pl-2 lg:text-base flex justify-center">
                                    View Details
                                    <BsEye className="ml-1 lg:mt-[0.4rem] xs:mt-[0.75rem] lg:text-sm" />
                                  </span>
                                </button>
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
                                      <span className="font-normal pl-2 lg:text-base flex justify-center">
                                        Solved
                                        <BsCheckCircle className="ml-1 lg:mt-[0.25rem] lg:text-base" />
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
                                        Unsolved
                                        <BsDashCircle className="ml-1 lg:mt-[0.25rem] lg:text-base" />
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