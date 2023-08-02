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

const CreateSectionModal = ({ visible, onClose, onContinue }) => {
  const navigate = useNavigate();

  const [adviserData, setAdviserData] = useState([]);

  function getAdvisers() {
    axios
      .get('http://localhost:80/Prototype-Vite/my-project/api/adviserList/')
      .then(function (response) {
        console.log(response.data);
        setAdviserData(response.data);
      });
  }

  useEffect(() => {
    getAdvisers();
  }, []);

  //window.localStorage.setItem("");

  const onSubmit = (values, actions) => {
    console.log('SUBMITTED');
    if (!values.isDuplicate) {
      axios
        .post(
          `http://localhost:80/Prototype-Vite/my-project/api/addSection/save`,
          values
        )
        .then(function (response) {
          console.log(response.data);
          onContinue();
        });
      //await new Promise((resolve) => setTimeout(resolve, 1));
    }
  };
  const [duplicateState, setDuplicateState] = useState(false);

  const sectionNameChange = event => {
    const value = event.target.value;
    values.sectionName = value;
    handleChange.sectionName;

    console.log(values.sectionName);

    //UPDATE INSTANTLY
    document.getElementById('sectionName').focus();
    document.getElementById('sectionName').blur();
    document.getElementById('sectionName').focus();

    axios
      .post(
        `http://localhost:80/Prototype-Vite/my-project/api/verifySection/${values.sectionName}`
      )
      .then(function (response) {
        console.log(response.data);
        if (response.data === 'duplicate') {
          setDuplicateState(true);
          values.isDuplicate = true;
        } else {
          setDuplicateState(false);
          values.isDuplicate = false;
        }
      });
  };

  const {
    values,
    handleBlur,
    isSubmitting,
    handleChange,
    handleSubmit,
    handleReset,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      gradeLevel: '7',
      sectionName: '',
      adviserName: '',
      isDuplicate: false,
    },
    validationSchema: addSectionSchema,
    onSubmit,
  });

  const gradeLevelChange = event => {
    var value = event.target.value;
    console.log('value: ' + value);
    value = value.replace(/[A-za-z]/g, '');
    value = value.replace(/ /g, '');
    console.log('value: ' + value);
    values.gradeLevel = value;
    handleChange.gradeLevel;
    setGradeLevel(value);
  };

  const handleOnClose = e => {
    if (e.target.id === 'mainContainer') handleReset(), onClose();
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
        <div className="bg-white hdScreen:w-1/3 semihdScreen:w-[40%] laptopScreen:w-[45%] averageScreen:w-[45%] hdScreen:scale-100 semihdScreen:scale-95 laptopScreen:scale-90 averageScreen:scale-90 rounded lg:text-lg xs:text-xs shadow-md ">
          <div className="grid grid-cols-2 bg-gray-300 ">
            <span className="lg:text-xl xs:text-lg ml-2 mt-0.5 text-black/60 font-semibold">
              {' '}
              Create Section{' '}
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
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <div className=" lg:text-lg xs:text-xs relative py-6 pb-10 pr-16 pl-8 ">
                <div className="inline-flex w-full">
                  <label
                    htmlFor="gradeLevel"
                    className="inline-block pt-2 lg:pl-4 xs:pl-1  text-right"
                  >
                    Grade Level:{' '}
                  </label>

                  <select
                    value={values.gradeLevel}
                    onChange={gradeLevelChange}
                    name="gradeLevel"
                    id="gradeLevel"
                    className="p-1  px-2 mt-1 ml-3 lg:text-lg xs:text-xs border-2 w-32  focus:border-none rounded-md border-gray-500 focus:outline-teal-500 focus:ring-teal-500 shadow-sm shadow-[#808080]"
                  >
                    <option className="hdScreen:text-lg semihdScreen:text-base laptopScreen:text-base averageScreen:text-base">
                      Grade 7
                    </option>
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
                    value={values.sectionName}
                    onChange={sectionNameChange}
                    onBlur={handleBlur}
                    name="sectionName"
                    id="sectionName"
                    type="text"
                    autoComplete="off"
                    placeholder="Enter Section Name"
                    className={`grow p-1  px-2 mt-1 ml-3 border-2 lg:text-lg xs:text-xs rounded-md border-gray-500 focus:outline-teal-500 focus:ring-teal-500 focus:border-none shadow-sm shadow-[#808080] ${
                      errors.sectionName && touched.sectionName
                        ? ' shadow-red-500 border-red-500 focus:border-red-500 border-3 border-solid'
                        : ''
                    }
                    ${
                      duplicateState
                        ? 'shadow-red-500 border-red-500 focus:border-red-500 border-3 border-solid'
                        : ''
                    }`}
                  />
                </div>
                {errors.sectionName && touched.sectionName && (
                  <p className=" lg:text-base xs:text-xs text-red-500 absolute ml-[8rem]">
                    {errors.sectionName}
                  </p>
                )}

                {duplicateState ? (
                  <p className="lg:text-base xs:text-xs text-red-500 absolute ml-[8rem]">
                    * This section name already exist.
                  </p>
                ) : (
                  ''
                )}

                <div className="inline-flex w-full mt-8">
                  <label
                    htmlFor="adviserName"
                    className="inline-block pt-2 lg:pl-[3.25rem] xs:pl-1 text-right"
                  >
                    Adviser:{' '}
                  </label>
                  <select
                    value={values.adviserName}
                    onChange={handleChange}
                    name="adviserName"
                    id="adviserName"
                    className={`p-1  px-2 mt-1 ml-3 lg:text-lg xs:text-xs border-2 w-full  focus:border-none rounded-md border-gray-500 focus:outline-teal-500 focus:ring-teal-500 shadow-sm shadow-[#808080]
                    ${
                      errors.adviserName && touched.adviserName
                        ? ' shadow-red-500 border-red-500 focus:border-red-500 border-3 border-solid'
                        : ''
                    }`}
                  >
                    <option selected value="">
                      {' '}
                    </option>
                    {adviserData.map((adviser, index) => (
                      <option
                        key={index}
                        className="hdScreen:text-lg semihdScreen:text-base laptopScreen:text-base averageScreen:text-base"
                        /*{...(adviser.SectionName == values.adviserName
                          ? { selected }
                          : {})}
                          */
                      >
                        {`${adviser.GivenName} ${adviser.MiddleName} ${adviser.LastName}`}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.adviserName && touched.adviserName && (
                  <p className=" lg:text-base xs:text-xs text-red-500  absolute ml-[8rem] ">
                    {errors.adviserName}
                  </p>
                )}
              </div>
              <div className="mx-auto text-center border-t-2 border-gray-300 py-3">
                <button
                  onClick={onClose}
                  className={`relative px-12 py-1.5  rounded-lg font-semibold  transition duration-300 text-white bg-red-600 hover:bg-red-700 `}
                >
                  <span className="font-normal lg:text-lg xs:text-xs flex justify-center">
                    Cancel
                  </span>
                </button>
                <button
                  onClick={onSubmit}
                  type="submit"
                  className="relative ml-6 py-1.5 px-12  rounded-lg font-semibold  transition duration-300 text-white bg-lime-600 hover:bg-lime-700"
                >
                  <span className="font-normal  lg:text-lg xs:text-xs flex justify-center">
                    Create
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

export default CreateSectionModal;
