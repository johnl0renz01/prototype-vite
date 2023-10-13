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

import {
  BsSlashCircle,
  BsQuestionCircleFill,
  BsQuestionCircle,
} from 'react-icons/bs';

import { MdClose } from 'react-icons/md';
import { VscQuestion } from 'react-icons/vsc';

import LoadingSpinner from './LoadingSpinner';

import StorageData from './StorageData';
import SecureStorageData from './SecureStorageData';

const EquationSettingsModal = ({ visible, onClose, onContinue }) => {
  const [showLoading, setShowLoading] = useState(false);
  const navigate = useNavigate();

  const [adviserData, setAdviserData] = useState([]);

  const handleOnClose = e => {
    if (e.target.id === 'mainContainer') onClose();
  };

  const onSubmit = async (values, actions) => {
    setShowLoading(true);
    var tableName = StorageData.localStorageJSON('SESSION_USER_LOGS');

    let tableLink = tableName + '_equation_settings';

    axios
      .post(
        `https://pia-sfe.online/api/equationSettingsDetails/${tableLink}`,
        values
      )
      .then(function (response) {
        console.log(response.data);
        setShowLoading(false);
        onContinue();
      })
      .catch(function (error) {
        setShowLoading(false);
      });

    await new Promise(resolve => setTimeout(resolve, 1));
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
      occurrenceValue: 0,
      prioritize: 'FALSE',
      fraction: 'FALSE',
      minimumValue: 0,
      maximumValue: 1,
      different: 'FALSE',
    },
    onSubmit,
  });

  useEffect(() => {
    var tableName = StorageData.localStorageJSON('SESSION_USER_LOGS');

    var settingsState = StorageData.sessionStorageJSON(
      'EQUATION_SETTINGS_STATE'
    );

    if (settingsState == true) {
      window.sessionStorage.setItem('EQUATION_SETTINGS_STATE', false);
      setShowLoading(true);
      getSettingsDetails(tableName);
    }
  });

  function getSettingsDetails(tableName) {
    let tableLink = tableName + '_equation_settings';

    axios
      .get(`https://pia-sfe.online/api/equationSettingsDetails/${tableLink}`)
      .then(function (response) {
        var result = Object.values(response.data);

        var keys = [];
        for (var k in result[0]) keys.push(result[0][k]);
        loadValues();
        function loadValues() {
          //FOR OCCURRENCE VALUE
          values.occurrenceValue = keys[1];
          setOccurrenceValue(keys[1]);

          //FOR PRIORITIZATION
          if (keys[2] == 'TRUE') {
            values.prioritize = 'TRUE';
            setIsPrioritize(true);
          } else {
            values.prioritize = 'FALSE';
            setIsPrioritize(false);
          }

          //FOR FRACTION
          if (keys[3] == 'TRUE') {
            values.fraction = 'TRUE';
            setIsFraction(true);
          } else {
            values.fraction = 'FALSE';
            setIsFraction(false);
          }

          //FOR MINIMUM VALUE
          values.minimumValue = keys[4];
          setMinimumVal(keys[4]);

          //FOR MAXIMUM VALUE
          values.maximumValue = keys[5];
          setMaximumVal(keys[5]);

          //FOR DIFFERENT VARIABLES
          if (keys[6] == 'TRUE') {
            values.different = 'TRUE';
            setIsDifferentVariables(true);
          } else {
            values.different = 'FALSE';
            setIsDifferentVariables(false);
          }
        }
        setShowLoading(false);
      })
      .catch(function (error) {
        setShowLoading(false);
      });
  }

  //FOR OCCURRENCE
  const [occurrenceVal, setOccurrenceValue] = useState(0);

  const occurrenceValueChange = e => {
    var occurrenceValue = parseInt(e.target.value);
    values.occurrenceValue = occurrenceValue;
    setOccurrenceValue(occurrenceValue);
  };

  //FOR VALUE OF GENERATED EQUATIONS
  const [minimumVal, setMinimumVal] = useState(0);
  const [maximumVal, setMaximumVal] = useState(0);

  //MIN
  const minimumValueChange = e => {
    var min = parseInt(e.target.value);
    values.minimumValue = min;
    setMinimumVal(min);

    if (parseInt(maximumVal) <= min) {
      var max = min;
      max++;

      values.maximumValue = max;
      setMaximumVal(max);
    }
  };

  //MAX
  const maximumValueChange = e => {
    var max = parseInt(e.target.value);
    values.maximumValue = max;

    if (max > minimumVal) {
      setMaximumVal(max);
    } else {
      let min = parseInt(minimumVal);
      min++;

      values.maximumValue = min;
      setMaximumVal(min);
    }
  };

  const [isPrioritize, setIsPrioritize] = useState(false);
  const [isFraction, setIsFraction] = useState(false);
  const [isDifferentVariables, setIsDifferentVariables] = useState(false);

  const prioritize = () => {
    if (isPrioritize) {
      values.prioritize = 'FALSE';
      setIsPrioritize(false);
    } else {
      values.prioritize = 'TRUE';
      setIsPrioritize(true);
    }
  };

  const fraction = () => {
    if (isFraction) {
      values.fraction = 'FALSE';
      setIsFraction(false);
    } else {
      values.fraction = 'TRUE';
      setIsFraction(true);
    }
  };

  const differentVariables = () => {
    if (isDifferentVariables) {
      values.different = 'FALSE';
      setIsDifferentVariables(false);
    } else {
      values.different = 'TRUE';
      setIsDifferentVariables(true);
    }
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
        <div className="bg-white hdScreen:w-1/3 semihdScreen:w-[40%] laptopScreen:w-[45%] averageScreen:w-[45%] hdScreen:scale-100 semihdScreen:scale-95 laptopScreen:scale-90 averageScreen:scale-90 rounded lg:text-lg md:text-base sm:text-sm xs:text-xs shadow-md ">
          <div className="grid grid-cols-2 bg-gray-300 ">
            <span className="lg:text-xl xs:text-lg ml-2 flex items-center text-black/60 font-semibold">
              {' '}
              Equation Settings{' '}
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
          <form action="" autoComplete="off" onSubmit={handleSubmit}>
            <div className="p-4 pb-8 text-gray-800">
              <div className="grid grid-cols-2">
                <div className=" px-6 border-r-[1px]  border-black/50">
                  <h1 className="font-bold text-xl text-center  border-b-[1px] pb-2 mb-2 border-black/50">
                    Custom Equations
                  </h1>
                  <div className="font-semibold flex items-center justify-between">
                    Chance of occurrence: {occurrenceVal}%
                    <BsQuestionCircle
                      title="Set the chance value for the custom equation to appear in the question list."
                      className="text-gray-500 hover:text-lime-600 rounded-full cursor-pointer"
                    />
                  </div>
                  <div className="range my-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      className="input-range"
                      value={occurrenceVal}
                      onChange={occurrenceValueChange}
                    />
                  </div>

                  <div className="py-2 font-semibold flex items-center justify-between">
                    Prioritize custom equations:
                    <BsQuestionCircle
                      title="Give all the custom equations first in the list of questions."
                      className="text-gray-500 hover:text-lime-600 rounded-full cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-evenly gap-x-10">
                    <button
                      type="button"
                      onClick={prioritize}
                      className={`w-full  rounded-md 
                                    ${
                                      !isPrioritize
                                        ? 'bg-red-600 font-semibold text-white'
                                        : 'bg-gray-200 hover:font-semibold hover:text-white hover:bg-gray-400'
                                    }`}
                    >
                      No
                    </button>
                    <button
                      type="button"
                      onClick={prioritize}
                      className={`w-full rounded-md 
                                  ${
                                    isPrioritize
                                      ? 'bg-lime-600 font-semibold text-white'
                                      : 'bg-gray-200 hover:font-semibold hover:text-white hover:bg-gray-400'
                                  }`}
                    >
                      Yes
                    </button>
                  </div>

                  <div className="py-2 font-semibold flex items-center justify-between">
                    Accept fraction as answer:
                    <BsQuestionCircle
                      title="Accepts the fraction form answer from the students."
                      className="text-gray-500 hover:text-lime-600 rounded-full cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-evenly gap-x-10">
                    <button
                      type="button"
                      onClick={fraction}
                      className={`w-full  rounded-md 
                                    ${
                                      !isFraction
                                        ? 'bg-red-600 font-semibold text-white'
                                        : 'bg-gray-200 hover:font-semibold hover:text-white hover:bg-gray-400'
                                    }`}
                    >
                      No
                    </button>
                    <button
                      type="button"
                      onClick={fraction}
                      className={`w-full rounded-md 
                                  ${
                                    isFraction
                                      ? 'bg-lime-600 font-semibold text-white'
                                      : 'bg-gray-200 hover:font-semibold hover:text-white hover:bg-gray-400'
                                  }`}
                    >
                      Yes
                    </button>
                  </div>
                </div>
                <div className="flex flex-col px-6 border-l-[1px] border-black/50">
                  <h1 className="font-bold text-xl text-center  border-b-[1px] pb-2 mb-2 border-black/50">
                    Auto Generated Equations
                  </h1>
                  <div className="font-semibold flex items-center justify-between">
                    Value range: {minimumVal} - {maximumVal}
                    <BsQuestionCircle
                      title="Set the value range for each generated equations."
                      className="text-gray-500 hover:text-lime-600 rounded-full cursor-pointer"
                    />
                  </div>
                  <p className="text-base text-gray-500">
                    (Use arrow keys for precision)
                  </p>

                  <div className="range my-2 flex">
                    <p className="mr-1">Min: </p>
                    <input
                      type="range"
                      min="1"
                      max="998"
                      className="input-range"
                      value={minimumVal}
                      onChange={minimumValueChange}
                    />
                  </div>
                  <div className="range my-2">
                    <p className="mr-1">Max: </p>
                    <input
                      type="range"
                      min="1"
                      max="999"
                      className="input-range"
                      value={maximumVal}
                      onChange={maximumValueChange}
                    />
                  </div>

                  <div className="py-2 font-semibold flex items-center justify-between">
                    Use different letter variables:
                    <BsQuestionCircle
                      title="Use different letter variables (a, b, c, ...z) for each equation generated."
                      className="text-gray-500 hover:text-lime-600 rounded-full cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-evenly gap-x-10">
                    <button
                      type="button"
                      onClick={differentVariables}
                      className={`w-full  rounded-md 
                                    ${
                                      !isDifferentVariables
                                        ? 'bg-red-600 font-semibold text-white'
                                        : 'bg-gray-200 hover:font-semibold hover:text-white hover:bg-gray-400'
                                    }`}
                    >
                      No
                    </button>
                    <button
                      type="button"
                      onClick={differentVariables}
                      className={`w-full rounded-md 
                                  ${
                                    isDifferentVariables
                                      ? 'bg-lime-600 font-semibold text-white'
                                      : 'bg-gray-200 hover:font-semibold hover:text-white hover:bg-gray-400'
                                  }`}
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto text-center border-t-2 border-gray-300 py-3">
              <button
                type="button"
                onClick={onClose}
                className={`ml-4 relative lg:py-0.5 w-[10rem] lg:px-3 sm:py-1.5 sm:px-2.5 xs:px-1 xs:py-1 text-gray-800    rounded-md  border-gray-300 border-2 hover:border-gray-500  hover:bg-gray-500 hover:text-white  ease-in-out transition duration-300 
              `}
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={onSubmit}
                className={`ml-4 relative lg:py-0.5 w-[10rem] lg:px-3 sm:py-1.5 sm:px-2.5 xs:px-1 xs:py-1 text-gray-800    rounded-md  border-gray-300 border-2 hover:border-gray-500  hover:bg-gray-500 hover:text-white  ease-in-out transition duration-300 
                  `}
              >
                <span className=" hdScreen:text-lg semihdScreen:text-lg laptopScreen:text-base averageScreen:text-base sm:text-sm xs:text-xs flex items-center justify-center">
                  Apply Changes
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
      <LoadingSpinner visible={showLoading} />
    </>
  );
};

export default EquationSettingsModal;
