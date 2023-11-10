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

import LoadingSpinner from './LoadingSpinner';

import StorageData from './StorageData';
import SecureStorageData from './SecureStorageData';

const CreateSectionModal = ({ visible, onClose, onContinue }) => {
  const [showLoading, setShowLoading] = useState(false);
  const navigate = useNavigate();

  const [adviserData, setAdviserData] = useState([]);

  function getAdvisers() {
    setShowLoading(true);
    axios
      .get('http://localhost:80/Prototype-Vite/my-project/api/adviserList/')
      .then(function (response) {
        console.log(response.data);
        setShowLoading(false);
        setAdviserData(response.data);
      })
      .catch(function (error) {
        setShowLoading(false);
      });
  }

  useEffect(() => {
    getAdvisers();
  }, []);

  //window.localStorage.setItem("");

  const onSubmit = (values, actions) => {
    console.log('SUBMITTED');
    var validForm = StorageData.sessionStorageJSON('IS_VALID_FORM');
    if (validForm && validForm !== null) {
      setShowLoading(true);
      axios
        .post(
          `http://localhost:80/Prototype-Vite/my-project/api/addSection/save`,
          values
        )
        .then(function (response) {
          console.log(response.data);
          setShowLoading(false);
          onContinue();
          handleReset();
        })
        .catch(function (error) {
          setShowLoading(false);
        });
      //await new Promise((resolve) => setTimeout(resolve, 1));
    }
  };
  const [duplicateState, setDuplicateState] = useState(false);

  const sectionNameChange = event => {
    window.sessionStorage.setItem(
      'IS_VALID_FORM',
      SecureStorageData.dataEncryption(false)
    );
    const value = event.target.value;
    values.sectionName = value;

    handleChange.sectionName;

    var valueString = value.replace(/ /g, '_');

    //UPDATE INSTANTLY
    document.getElementById('sectionName').focus();
    document.getElementById('sectionName').blur();
    document.getElementById('sectionName').focus();

    axios
      .get(
        `http://localhost:80/Prototype-Vite/my-project/api/verifySection/${valueString}`
      )
      .then(function (response) {
        console.log(response.data);
        if (response.data === 'duplicate') {
          setDuplicateState(true);
          window.sessionStorage.setItem(
            'IS_VALID_FORM',
            SecureStorageData.dataEncryption(false)
          );
        } else {
          setDuplicateState(false);
          window.sessionStorage.setItem(
            'IS_VALID_FORM',
            SecureStorageData.dataEncryption(true)
          );
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
                ${showLoading ? 'invisible' : ''}`}
      >
        <div className="bg-white hdScreen:w-1/3 semihdScreen:w-[40%] laptopScreen:w-[45%] averageScreen:w-[45%] md:w-[50%] sm:w-[65%] xs:w-[70%] hdScreen:scale-100 semihdScreen:scale-90 laptopScreen:scale-85 averageScreen:scale-80 md:scale-80 sm:scale-80 xs:scale-75 rounded lg:text-lg md:text-base sm:text-sm xs:text-xs shadow-md ">
          <div className="grid grid-cols-2 bg-gray-300 ">
            <span className="lg:text-xl xs:text-lg ml-2 flex items-center text-black/60 font-semibold">
              {' '}
              Create Section{' '}
            </span>
            <div className="text-right">
              <button
                onClick={onClose}
                className=" p-3 inline-block hover:bg-red-600 transition duration-200 hover:text-white"
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
              <div className=" lg:text-lg md:text-base sm:text-sm xs:text-xs relative py-6 pb-10 pr-16 pl-8 ">
                <div className="inline-flex w-full">
                  <label
                    htmlFor="gradeLevel"
                    className="inline-block pt-2 lg:pl-4 xs:pl-1  text-right"
                  >
                    Grade Level:{' '}
                  </label>

                  <select
                    value={values.gradeLevel}
                    onChange={handleChange}
                    name="gradeLevel"
                    id="gradeLevel"
                    className="p-1  px-2 mt-1 ml-3 lg:text-lg md:text-base sm:text-sm xs:text-xs border-[1px] w-32   rounded-md border-gray-500 focus:outline-teal-500 focus:ring-teal-500 shadow-[#808080]"
                  >
                    <option
                      value="7"
                      className="hdScreen:text-lg semihdScreen:text-base laptopScreen:text-base averageScreen:text-base"
                    >
                      Grade 7
                    </option>
                    <option
                      value="8"
                      className="hdScreen:text-lg semihdScreen:text-base laptopScreen:text-base averageScreen:text-base"
                    >
                      Grade 8
                    </option>
                    <option
                      value="9"
                      className="hdScreen:text-lg semihdScreen:text-base laptopScreen:text-base averageScreen:text-base"
                    >
                      Grade 9
                    </option>
                    <option
                      value="10"
                      className="hdScreen:text-lg semihdScreen:text-base laptopScreen:text-base averageScreen:text-base"
                    >
                      Grade 10
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
                    className={`grow p-1  px-2 mt-1 ml-3 border-[1px] lg:text-lg md:text-base sm:text-sm xs:text-xs rounded-md border-gray-500 focus:outline-teal-500 focus:ring-teal-500   shadow-[#808080] ${
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
                    className="inline-block pt-2 lg:pl-[3.25rem] xs:pl-8 text-right"
                  >
                    Teacher:{' '}
                  </label>
                  <select
                    value={values.adviserName}
                    onChange={handleChange}
                    name="adviserName"
                    id="adviserName"
                    className={`p-1  px-2 mt-1 ml-3 lg:text-lg md:text-base sm:text-sm xs:text-xs border-[1px] w-full   rounded-md border-gray-500 focus:outline-teal-500 focus:ring-teal-500  shadow-[#808080]
                    ${
                      errors.adviserName && touched.adviserName
                        ? ' shadow-red-500 border-red-500 focus:border-red-500 border-3 border-solid'
                        : ''
                    }`}
                  >
                    <option selected disabled value="">
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
                  className={`relative px-12 py-1.5  rounded-lg font-semibold  transition duration-300 text-white bg-gray-400 hover:bg-gray-500 `}
                >
                  <span className="font-normal lg:text-lg md:text-base sm:text-sm xs:text-xs flex justify-center">
                    Cancel
                  </span>
                </button>
                <button
                  onClick={onSubmit}
                  type="submit"
                  className="relative ml-6 py-1.5 px-12  rounded-lg font-semibold  transition duration-300 text-white bg-lime-600 hover:bg-lime-700"
                >
                  <span className="font-normal  lg:text-lg md:text-base sm:text-sm xs:text-xs flex justify-center">
                    Create
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <LoadingSpinner visible={showLoading} />
    </>
  );
};

export default CreateSectionModal;
