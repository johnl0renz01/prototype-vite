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

export default function AccountList() {
  const navigate = useNavigate();

  const [section, setSection] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [imageUrlList, setImageUrlList] = useState([]);
  const [imageTypeList, setImageTypeList] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);

  var inputText = '';

  useEffect(() => {
    getManageSection();
    getAccounts();
  }, []);

  function getManageSection() {
    axios
      .get(`http://localhost:80/Prototype-Vite/my-project/api/sectionList/`)
      .then(function (response) {
        setSection(response.data);
        let result = Object.values(response.data);

        let items = [];
        let keys = [];
        for (let i = 0; i < result.length; i++) {
          for (let k in result[i]) keys.push(result[i][k]);
        }

        for (let i = 6; i <= keys.length; i += 7) {
          // GET IMAGE STRING 6th index (including id)
          items.push(keys[i]);
        }

        var imgName = [];
        var imgType = [];

        for (let i = 0; i < items.length; i++) {
          let string = items[i];
          for (let j = 0; j < string.length; j++) {
            if (string[j] == '.') {
              imgName.push(string.substring(0, j));
              imgType.push(string.substring(j + 1));
              break;
            }
          }
        }
        console.log(imgName);
        console.log(imgType);

        setImageUrlList(imgName);
        setImageTypeList(imgType);
      });
  }

  function getAccounts() {
    axios
      .get(
        `http://localhost:80/Prototype-Vite/my-project/api/getAccountSection/`
      )
      .then(function (response) {
        let responseData = response.data;
        var newArray = [];
        for (let i = 0; i < responseData.length; i++) {
          var tempArray = [];
          var result = Object.keys(responseData[i]).map(key => [
            key,
            responseData[i][key],
          ]);

          for (let j = 0; j < result.length; j++) {
            tempArray.push(result[j][1]);
          }
          console.log(tempArray);

          let data = JSON.stringify(tempArray[0]);
          data = data.replace(/"/g, '');

          newArray.push(data);
        }

        console.log(newArray);
        setAccounts(newArray);
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
        `http://localhost:80/Prototype-Vite/my-project/api/sectionList/`,
        inputText
      )
      .then(function (response) {
        setSection(response.data);
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
    setWidth();
  }, []);

  function setWidth() {
    var width = window.localStorage.getItem('NAVBAR_TEACHER_WIDTH');
    setNavbarWidth(width);

    // Logo height
    var height = window.localStorage.getItem('NAVBAR_TEACHER_LOGO');
    setLogoHeight(height);
  }

  return (
    <>
      <div
        className={`bg-gradient-to-t from-[#e2e2e2] via-[#f1f1f1] to-[#ffffff] h-screen   
      ${
        navbarWidth == 176
          ? 'w-[calc(100%-176px)] ml-[176px]'
          : navbarWidth == 168
          ? 'w-[calc(100%-168px)] ml-[168px]'
          : navbarWidth == 108
          ? 'w-[calc(100%-108px)] ml-[108px]'
          : navbarWidth == 95
          ? 'w-[calc(100%-95px)] ml-[95px]'
          : 'w-[calc(100%-176px)] ml-[176px]'
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
            Sections
          </div>

          <div className="mt-3 w-full grid grid-cols-6 text-xl text-center font-semibold border-t-2 border-gray-400">
            <div className="p-3 pb-5 border-b-2 border-l-2 border-gray-400">
              Grade Level
            </div>
            <div className="p-3 pb-5 border-l-2 border-b-2 border-gray-400">
              Section Name
            </div>
            <div className="p-3 pb-5 border-l-2 border-b-2 border-gray-400 col-span-2">
              Adviser Name
            </div>
            <div className="relative px-2 border-l-2 border-b-2 border-r-2 border-gray-400 col-span-2 w-full">
              <div className="absolute top-1 overflow-hidden py-1 px-2 w-full pr-8">
                <div className="w-full m-1 overflow-hidden shadow-sm shadow-gray-600 rounded-2xl text-lg">
                  <div className="flex bg-gray-200 py-1 items-center text-left rounded-2xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-4 h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <input
                      className="bg-gray-200  outline-none ml-2 block w-full text-lg font-normal"
                      type="text"
                      name="searchQuery"
                      id="searchQuery"
                      onChange={handleChange}
                      placeholder="&nbsp;Search Section..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="min-h-[44rem] max-h-[44rem] overflow-y-scroll style-3">
            {section.map((currentSection, index) => (
              <>
                <div className="border-b-2 hover:bg-gray-200 py-1.5">
                  <div className="w-full grid grid-cols-6 text-xl text-center place-items-center ">
                    <div className="px-2  w-full h-full grid place-items-center ">
                      Grade {currentSection.GradeLevel}
                    </div>
                    <div className="px-2 w-full h-full grid place-items-center">
                      {currentSection.SectionName}
                    </div>
                    <div className="px-2  w-full h-full grid place-items-center col-span-2">
                      {`${currentSection.AdviserName} ${currentSection.AdviserSurname}`}
                    </div>
                    <div className="relative">
                      <input
                        onClick={editMode}
                        name={currentSection.SectionName}
                        type="submit"
                        value="Edit"
                        className="cursor-pointer py-[0.2rem]  pl-4 pr-[2.15rem]   shadow-md rounded-full font-normal  transition duration-300 text-white bg-blue-500/90 hover:bg-blue-600 lg:text-base drop-shadow-[0_2px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_2px_0px_rgba(0,0,0,0.6)]"
                      ></input>
                      <span className=" absolute top-[0.25rem] right-3 font-normal text-base flex justify-center">
                        <HiPencilSquare className="ml-1 mt-[0.2rem] lg:text-lg text-white" />
                      </span>
                    </div>

                    <div className="mr-16">
                      {accounts.includes(currentSection.SectionName) ? (
                        <>
                          <button
                            disabled
                            className="relative py-[0.2rem]  px-4 shadow-md rounded-full font-semibold  text-gray-300 bg-gray-400 drop-shadow-[0_2px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_2px_0px_rgba(0,0,0,0.6)]"
                            title="You can only delete an empty section."
                          >
                            <span className="font-normal pl-2 text-base flex justify-center">
                              Delete
                              <BsTrash3 className="ml-1 mt-[0.25rem] lg:text-base" />
                            </span>
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="submit"
                            className="relative py-[0.2rem]  px-4 shadow-md rounded-full font-semibold  transition duration-500 text-white bg-red-500 hover:bg-red-700 drop-shadow-[0_2px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_2px_0px_rgba(0,0,0,0.6)]"
                          >
                            <span className="font-normal pl-2 text-base flex justify-center">
                              Delete
                              <BsTrash3 className="ml-1 mt-[0.25rem] lg:text-base" />
                            </span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ))}
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
