import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

import { useFormik } from 'formik';
import { changePasswordSchema } from '../schemas';

import { VscCheckAll, VscPassFilled } from 'react-icons/vsc';

import { BsSlashCircle } from 'react-icons/bs';

import { MdClose } from 'react-icons/md';
import { VscQuestion } from 'react-icons/vsc';

import LoadingSpinner from './LoadingSpinner';

import StorageData from './StorageData';
import SecureStorageData from './SecureStorageData';

import ChangePasswordInvalidModal from './ChangePasswordInvalidModal';

const ChangePasswordModal = ({ visible, onClose, onContinue }) => {
  const [showLoading, setShowLoading] = useState(false);
  const navigate = useNavigate();

  const [adviserData, setAdviserData] = useState([]);

  //window.localStorage.setItem("");

  const onSubmit = (values, actions) => {
    var email = StorageData.localStorageJSON('SESSION_EMAIL');
    if (email !== null) {
      setShowLoading(true);
      axios
        .post(
          `http://localhost:80/Prototype-Vite/my-project/api/editPassword/${email}`,
          values
        )
        .then(function (response) {
          console.log(response.data);
          var result = response.data;
          result = result.replace(/"/g, '');
          if (result == 'Invalid') {
            setShowLoading(false);
            setShowMessageModal(true);
            actions.resetForm();
          } else {
            setShowLoading(false);
            actions.resetForm();
            onContinue();
            //  resetForm();
          }
        })
        .catch(function (error) {
          setShowLoading(false);
          actions.resetForm();
        });
      //await new Promise((resolve) => setTimeout(resolve, 1));
    } else {
      actions.resetForm();
    }
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
      oldPassword: '',
      newPassword: '',
    },
    validationSchema: changePasswordSchema,
    onSubmit,
  });

  // MODAL EDIT MESSAGE
  const [showMessageModal, setShowMessageModal] = useState(false);
  const handleOnCloseMessageModal = () => {
    setShowMessageModal(false);
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
              Change Password{' '}
            </span>
            <div className="text-right">
              <button
                onClick={() => {
                  onClose();
                  handleReset();
                }}
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
              <div className=" lg:text-lg md:text-base sm:text-sm xs:text-xs relative py-6 pb-10 px-10 ">
                <div className="inline-flex w-full mt-2">
                  <label
                    htmlFor="sectionName"
                    className="inline-block pt-2 text-right pl-2"
                  >
                    Old Password:{' '}
                  </label>
                  <input
                    value={values.oldPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="oldPassword"
                    id="oldPassword"
                    type="password"
                    autoComplete="off"
                    placeholder="Enter Old Password"
                    className={`grow p-1  px-2 mt-1 ml-3 border-[1px] lg:text-lg md:text-base sm:text-sm xs:text-xs rounded-md border-gray-500 focus:outline-teal-500 focus:ring-teal-500 focus:border-none  shadow-[#808080] ${
                      errors.oldPassword && touched.oldPassword
                        ? ' shadow-red-500 border-red-500 focus:border-red-500 border-3 border-solid'
                        : ''
                    }
                   `}
                  />
                </div>
                {errors.oldPassword && touched.oldPassword && (
                  <p className=" lg:text-base xs:text-xs text-red-500 absolute ml-[8rem]">
                    {errors.oldPassword}
                  </p>
                )}

                <div className="inline-flex w-full mt-8">
                  <label
                    htmlFor="sectionName"
                    className="inline-block pt-2 text-right"
                  >
                    New Password:{' '}
                  </label>
                  <input
                    value={values.newPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="newPassword"
                    id="newPassword"
                    type="password"
                    autoComplete="off"
                    placeholder="Enter New Password"
                    className={`grow p-1  px-2 mt-1 ml-3 border-[1px] lg:text-lg md:text-base sm:text-sm xs:text-xs rounded-md border-gray-500 focus:outline-teal-500 focus:ring-teal-500 focus:border-none  shadow-[#808080] ${
                      errors.newPassword && touched.newPassword
                        ? ' shadow-red-500 border-red-500 focus:border-red-500 border-3 border-solid'
                        : ''
                    }
                   `}
                  />
                </div>
                {errors.newPassword && touched.newPassword && (
                  <p className=" lg:text-base xs:text-xs text-red-500 absolute ml-[8rem]">
                    {errors.newPassword}
                  </p>
                )}
              </div>
              <div className="mx-auto text-center border-t-2 border-gray-300 py-3">
                <button
                  onClick={() => {
                    onClose();
                    handleReset();
                  }}
                  className={`relative px-12 py-1.5  rounded-lg font-semibold  transition duration-300 text-white bg-red-600 hover:bg-red-700 `}
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
                    Apply
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <LoadingSpinner visible={showLoading} />

      <ChangePasswordInvalidModal
        onClose={handleOnCloseMessageModal}
        visible={showMessageModal}
      />
    </>
  );
};

export default ChangePasswordModal;
