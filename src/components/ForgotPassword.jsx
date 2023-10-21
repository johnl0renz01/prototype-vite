import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

import { useFormik } from 'formik';

import { forgotPasswordSchema } from '../schemas';

import LoadingSpinner from './LoadingSpinner';

import ForgotPasswordInvalidModal from './ForgotPasswordInvalidModal';
import ForgotPasswordValidModal from './ForgotPasswordValidModal';

const ForgotPassword = ({ visible, onClose, onContinue }) => {
  const [showLoading, setShowLoading] = useState(false);

  const onSubmit = async (values, actions) => {
    var isForgot = JSON.parse(window.sessionStorage.getItem('FORGOT_PASSWORD'));
    console.log(isForgot);

    if (isForgot) {
      setShowLoading(true);
      console.log('TESTING IM HERE');
      var type = JSON.parse(window.sessionStorage.getItem('RESET_TYPE'));
      type = type.replace(/"/g, '');
      if (type == 'Email') {
        axios
          .post(
            `http://localhost:80/Prototype-Vite/my-project/api/forgotPassEmail/save`,
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
      } else if (type == 'Code') {
        axios
          .post(
            `http://localhost:80/Prototype-Vite/my-project/api/resetPasswordCode/save`,
            values
          )
          .then(function (response) {
            console.log(response.data);
            setShowLoading(false);
            var result = response.data;
            if (result == 'Valid') {
              setMessageModal2(true);
            } else {
              setMessageModal(true);
            }
          })
          .catch(function (error) {
            setShowLoading(false);
          });
      }
    }

    await new Promise(resolve => setTimeout(resolve, 1));
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
      emailReset: '',
      code: '',
    },
    //Page Validation Form
    validationSchema: forgotPasswordSchema,
    onSubmit,
  });

  const [a, seta] = useState('');
  const [resetType, setResetType] = useState('Email');

  useEffect(() => {
    var type = JSON.parse(window.sessionStorage.getItem('RESET_TYPE'));
    if (type !== null) setResetType(type);
  });

  useEffect(() => {
    window.sessionStorage.setItem('RESET_TYPE', JSON.stringify('Email'));
  }, []);

  const emailRequest = () => {
    var email = values.emailReset;
    window.sessionStorage.setItem('RESET_EMAIL', JSON.stringify(email));
  };

  const codeRequest = () => {
    var email = values.emailReset;
    window.sessionStorage.setItem('RESET_EMAIL', JSON.stringify(email));
  };

  // MODAL INVALID
  const [showMessageModal, setMessageModal] = useState(false);
  const handleOnCloseMessageModal = () => {
    setMessageModal(false);
    onClose();
  };

  // MODAL VALID
  const [showMessageModal2, setMessageModal2] = useState(false);
  const handleOnCloseMessageModal2 = () => {
    setMessageModal2(false);
    onClose();
  };
  return (
    <>
      <div className={`mt-2`}>
        <form onSubmit={handleSubmit}>
          <div className="border-2 border-gray-400 p-4 pb-6 rounded-xl">
            <p>
              {resetType == 'Email' ? (
                <>
                  To request a password reset, please enter your email address
                  below. After that, click on submit. It may take a while.
                </>
              ) : (
                <>
                  To reset password instantly, please enter your email and the
                  special code given from registration.{' '}
                  <span className="text-gray-600">(Teacher's code)</span>
                </>
              )}
            </p>
            <input
              className={`mt-2 bg-[#e0e0e0] rounded-xl w-full lg:text-lg sm:text-base xs:text-xs text-gray-700 px-4  py-1.5   
                          `}
              id="emailReset"
              name="emailReset"
              type="email"
              values={values.emailReset}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="lastname.firstname@sfe.edu.ph"
              autoComplete="off"
            />
            {resetType == 'Code' ? (
              <input
                className={`mt-2 bg-[#e0e0e0] rounded-xl w-full lg:text-lg sm:text-base xs:text-xs text-gray-700 px-4  py-1.5   
                    `}
                name="code"
                values={values.code}
                onChange={handleChange}
                onBlur={handleBlur}
                type="password"
                placeholder="Input code"
                autoComplete="off"
              />
            ) : (
              <></>
            )}
          </div>

          <div className=" mt-4 mb-3 text-center w-full ">
            <button
              disabled={isSubmitting}
              type="submit"
              onClick={
                resetType == 'Email'
                  ? values.emailReset != ''
                    ? emailRequest
                    : null
                  : resetType == 'Code'
                  ? values.emailReset != '' && values.code != ''
                    ? codeRequest
                    : null
                  : null
              }
              className={`rounded-2xl w-1/2 py-2 lg:lg:text-lg sm:text-base xs:text-xs sm:text-md font-semibold   ease-in-out transition duration-200 transform drop-shadow-[0_3px_0px_rgba(0,0,0,0.45)] 
                                  ${
                                    resetType == 'Email'
                                      ? values.emailReset != ''
                                        ? 'text-white bg-lime-600 hover:bg-lime-700 hover:drop-shadow-[0_3px_0px_rgba(0,0,0,0.6)]'
                                        : 'text-gray-300 cursor-default bg-gray-400'
                                      : resetType == 'Code'
                                      ? values.emailReset != '' &&
                                        values.code != ''
                                        ? 'text-white bg-lime-600 hover:bg-lime-700 hover:drop-shadow-[0_3px_0px_rgba(0,0,0,0.6)]'
                                        : 'text-gray-300 cursor-default bg-gray-400'
                                      : 'text-gray-300 cursor-default bg-gray-400'
                                  }`}
            >
              <span className="lg:text-xl sm:text-base xs:text-xs font-semibold">
                SUBMIT
              </span>
            </button>
          </div>
        </form>
      </div>
      <ForgotPasswordInvalidModal
        onClose={handleOnCloseMessageModal}
        visible={showMessageModal}
      />
      <ForgotPasswordValidModal
        onClose={handleOnCloseMessageModal2}
        visible={showMessageModal2}
      />
      <LoadingSpinner visible={showLoading} />
    </>
  );
};

export default ForgotPassword;
