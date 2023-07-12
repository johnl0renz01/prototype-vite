import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

import { useFormik } from 'formik';
import { editAccountSchema } from '../schemas';
import { editSectionSchema } from '../schemas';
import { addSectionSchema } from '../schemas';

import { VscCheckAll, VscPassFilled } from 'react-icons/vsc';

import { BsSlashCircle } from 'react-icons/bs';

import { MdClose } from 'react-icons/md';
import { VscQuestion } from 'react-icons/vsc';

const ContactAdminModal = ({ visible, onClose, onContinue }) => {
  const navigate = useNavigate();

  const [sectionDetails, setSectionDetails] = useState([]);

  const [editSectionName, setEditSectionName] = useState('');
  const [editAdviserName, setEditAdviserName] = useState('');
  const [editAdviserSurname, setEditAdviserSurname] = useState('');
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    var sectionName = JSON.parse(
      window.localStorage.getItem('CURRENT_SECTION_EDIT')
    );

    var editState = JSON.parse(
      window.localStorage.getItem('EDIT_SECTION_STATE')
    );

    if (editState == true) {
      window.localStorage.setItem('EDIT_SECTION_STATE', false);
      getSectionDetails(sectionName);
    }
  });

  function getSectionDetails(sectionName) {
    let sectionLink = sectionName.replace(/ /g, '_');
    sectionLink = sectionLink.replace(/"/g, ' ');

    axios
      .get(
        `http://localhost:80/Prototype-Vite/my-project/api/sectionDetails/${sectionLink}`
      )
      .then(function (response) {
        setSectionDetails(response.data);
        var result = Object.values(response.data);

        var keys = [];
        for (var k in result[0]) keys.push(result[0][k]);

        window.localStorage.setItem(
          'EDIT_SECTION_NAME',
          JSON.stringify(keys[2])
        );
        setEditSectionName(keys[2]);
        setEditAdviserName(keys[3]);
        setEditAdviserSurname(keys[4]);
        setEditTitle(keys[5]);
      });
  }

  //window.localStorage.setItem("");

  const onSubmit = (values, actions) => {
    console.log('SUBMITTED');
    axios
      .post(
        'http://localhost:80/Prototype-Vite/my-project/api/addSection/save',
        values
      )
      .then(function (response) {
        console.log(response.data);
      });
    //await new Promise((resolve) => setTimeout(resolve, 1));
  };

  const {
    values,
    handleBlur,
    isSubmitting,
    handleChange,
    handleSubmit,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      gradeLevel: '7',
      sectionName: '',
      adviserName: '',
      adviserSurname: '',
      title: '',
    },
    validationSchema: addSectionSchema,
    onSubmit,
  });

  const sectionNameChange = event => {
    const value = event.target.value;
    values.sectionName = value;
    setEditSectionName(value);
  };

  const adviserNameChange = event => {
    const value = event.target.value;
    values.adviserName = value;
    setEditAdviserName(value);
  };

  const adviserSurnameChange = event => {
    const value = event.target.value;
    values.adviserSurname = value;
    setEditAdviserSurname(value);
  };

  const titleChange = event => {
    const value = event.target.value;
    values.title = value;
    setEditTitle(value);
  };

  useEffect(() => {
    var editState = JSON.parse(
      window.localStorage.getItem('EDIT_SECTION_STATE')
    );
    if (editState == true) {
      window.localStorage.setItem('EDIT_SECTION_STATE', false);
      loadValues();
    }
  });

  function loadValues() {
    values.sectionName = editSectionName;
    values.adviserName = editAdviserName;
    values.adviserSurname = editAdviserSurname;
    values.title = editTitle;
  }

  const gradeLevelChange = event => {
    var value = event.target.value;
    console.log('value: ' + value);
    value = value.replace(/[A-za-z]/g, '');
    value = value.replace(/ /g, '');
    console.log('value: ' + value);
    values.gradeLevel = value;
    setGradeLevel(value);
  };

  const [navbarWidth, setNavbarWidth] = useState(0);
  const [logoHeight, setLogoHeight] = useState(0);

  useEffect(() => {
    document.body.style.backgroundImage =
      'linear-gradient(to top, #e2e2e2, #f1f1f1 , #ffffff)';

    window.addEventListener('resize', setWidth);
    setWidth();
  });

  function setWidth() {
    var width = window.localStorage.getItem('NAVBAR_TEACHER_WIDTH');
    setNavbarWidth(width);

    // Logo height
    var height = window.localStorage.getItem('NAVBAR_TEACHER_LOGO');
    setLogoHeight(height);
  }

  const handleOnClose = e => {
    if (e.target.id === 'mainContainer') onClose();
  };

  if (!visible) return null;

  return (
    <>
      <div
        id="mainContainer"
        onClick={handleOnClose}
        className={`fixed top-0 z-50 inset-0 bg-black bg-opacity-[0%] backdrop-blur-[4px] flex justify-center items-center "
        ${
          navbarWidth == 143
            ? 'w-[calc(100%-143px)] ml-[143px]'
            : navbarWidth == 95
            ? 'w-[calc(100%-95px)] ml-[95px]'
            : navbarWidth == 73
            ? 'w-[calc(100%-73px)] ml-[73px]'
            : navbarWidth == 39
            ? 'w-[calc(100%-39px)] ml-[39px]'
            : ''
        }`}
      >
        <div className="bg-white w-1/3 rounded lg:text-lg xs:text-xs shadow-md ">
          <div className="grid grid-cols-2 bg-gray-300 border-b-2 border-gray-300">
            <span className="lg:text-xl xs:text-lg ml-2 mt-0.5 text-black/60 font-semibold">
              {' '}
              Edit Section{' '}
            </span>
            <div className="text-right">
              <button
                onClick={onClose}
                className="bg-gray-400/70 p-2 inline-block hover:bg-red-600 transition duration-200 hover:text-white"
              >
                <MdClose />
              </button>
            </div>
          </div>
          <div className=" text-center text-gray-800">
            <form
              action=""
              className="overflow-hidden "
              autocomplete="off"
              onSubmit={onSubmit}
            >
              <div className=" lg:text-lg xs:text-xs relative py-6 pb-8 pr-16 pl-8 ">
                <div className="inline-flex w-full">
                  <label
                    htmlFor="gradeLevel"
                    className="inline-block pt-2 lg:pl-4 xs:pl-1  text-right"
                  >
                    Grade Level:{' '}
                  </label>

                  <select
                    onChange={gradeLevelChange}
                    name="gradeLevel"
                    id="gradeLevel"
                    className="p-1  px-2 mt-1 ml-3 lg:text-lg xs:text-xs border-2 w-32  focus:border-none rounded-md border-gray-500 focus:outline-teal-500 focus:ring-teal-500 shadow-sm shadow-[#808080]"
                  >
                    <option className="">Grade 7</option>
                  </select>
                </div>

                <div className="inline-flex w-full mt-8">
                  <label
                    htmlFor="sectionName"
                    className="inline-block pt-2 text-right"
                  >
                    Section Name:{' '}
                  </label>
                  <input
                    name="sectionName"
                    type="text"
                    placeholder="Enter Section Name"
                    className={`grow p-1  px-2 mt-1 ml-3 border-2 lg:text-lg xs:text-xs rounded-md border-gray-500 focus:outline-teal-500 focus:ring-teal-500 focus:border-none shadow-sm shadow-[#808080] ${
                      errors.sectionName && touched.sectionName
                        ? ' shadow-red-500 border-red-500 focus:border-red-500 border-3 border-solid'
                        : ''
                    }`}
                    value={editSectionName}
                    onChange={sectionNameChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errors.sectionName && touched.sectionName && (
                  <p className=" lg:text-base xs:text-xs text-red-500  absolute ml-[11rem] ">
                    {errors.sectionName}
                  </p>
                )}

                <div className="inline-flex w-full mt-8">
                  <label
                    htmlFor="adviserName"
                    className="inline-block pt-2  text-right"
                  >
                    Adviser Name:{' '}
                  </label>
                  <input
                    name="adviserName"
                    type="text"
                    placeholder="Enter Given Name"
                    className={`grow p-1  px-2 mt-1 ml-3 border-2 lg:text-lg xs:text-xs rounded-md border-gray-500 focus:outline-teal-500 focus:ring-teal-500 focus:border-none shadow-sm shadow-[#808080] ${
                      errors.adviserName && touched.adviserName
                        ? ' shadow-red-500 border-red-500 focus:border-red-500 border-3 border-solid'
                        : ''
                    }`}
                    value={editAdviserName}
                    onChange={adviserNameChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errors.adviserName && touched.adviserName && (
                  <p className=" lg:text-base xs:text-xs text-red-500  absolute ml-[11rem] ">
                    {errors.adviserName}
                  </p>
                )}
              </div>
              <div className="mx-auto text-center border-t-2 border-gray-300 py-3">
                <button
                  onClick={onClose}
                  className={`relative px-12 py-1.5  rounded-full font-semibold  transition duration-300 text-white bg-red-600 hover:bg-red-700 `}
                >
                  <span className="font-normal lg:text-base xs:text-xs flex justify-center">
                    Close
                  </span>
                </button>
                <button
                  onClick={onContinue}
                  type="submit"
                  className="relative ml-6 py-1.5 px-4 mr-1.5  rounded-full font-semibold  transition duration-300 text-white bg-lime-600 hover:bg-lime-700"
                >
                  <span className="font-normal  lg:text-base xs:text-xs flex justify-center">
                    Apply Changes
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactAdminModal;
