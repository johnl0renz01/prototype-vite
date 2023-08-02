import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

import { Formik, useFormik } from 'formik';
import { editAccountSchema } from '../schemas';
import { editSectionSchema } from '../schemas';
import { contactAdminSchema } from '../schemas';

import { VscCheckAll, VscPassFilled } from 'react-icons/vsc';

import { BsSlashCircle } from 'react-icons/bs';
import { BsFillSendFill } from 'react-icons/bs';

import { MdClose } from 'react-icons/md';
import { VscQuestion } from 'react-icons/vsc';

const ContactAdminModal = ({ visible, onClose, onContinue }) => {
  const navigate = useNavigate();

  //window.localStorage.setItem("");

  const onSubmit = async (values, actions) => {
    var email = JSON.parse(window.localStorage.getItem('SESSION_EMAIL'));
    var role = JSON.parse(window.localStorage.getItem('ACCOUNT_TYPE'));
    axios
      .post(
        `http://localhost:80/Prototype-Vite/my-project/api/requestSend/${email}@${role}`,
        values
      )
      .then(function (response) {
        handleReset();
        onContinue();
      });
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
      subject: '',
      message: '',
    },
    validationSchema: contactAdminSchema,
    onSubmit,
  });

  const handleOnClose = e => {
    if (e.target.id === 'mainContainer') onClose();
  };

  if (!visible) return null;

  const sendMessage = () => {
    var email = JSON.parse(window.localStorage.getItem('SESSION_EMAIL'));
  };

  return (
    <>
      <div
        id="mainContainer"
        onClick={handleOnClose}
        className={`fixed top-0 z-50 inset-0 bg-black bg-opacity-50 backdrop-blur-[1.5px] flex justify-center items-center "
        `}
      >
        <div className="bg-white hdScreen:w-1/3 rounded lg:text-lg xs:text-xs shadow-md ">
          <div className="grid grid-cols-2 bg-gray-300 ">
            <span className="lg:text-xl xs:text-lg ml-2 mt-0.5 text-black/60 font-semibold">
              {' '}
              Contact Admin{' '}
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
              <div className=" lg:text-lg xs:text-xs relative lg:py-4 lg:pb-10 xs:pb-5 lg:px-8 xs:px-2 ">
                <div className="inline-flex w-full mt-1">
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    maxLength="45"
                    placeholder="Subject"
                    className={` placeholder:font-normal tracking-wide text-gray-600 grow p-1 font-bold px-2 mt-1 ml-3 border-2 lg:text-lg xs:text-xs rounded-md border-gray-500 focus:outline-teal-500 focus:ring-teal-500 focus:border-none shadow-sm shadow-[#808080] ${
                      errors.subject && touched.subject
                        ? ' shadow-red-500 border-red-500 focus:border-red-500 border-3 border-solid'
                        : ''
                    }`}
                    value={values.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errors.subject && touched.subject && (
                  <p className=" lg:text-base xs:text-xs text-red-500  absolute ml-[1rem] ">
                    {errors.subject}
                  </p>
                )}

                <div className="inline-flex w-full mt-8">
                  <textarea
                    id="message"
                    name="message"
                    type="text"
                    placeholder="Write your concerns..."
                    rows="8"
                    className={` grow lg:py-4  lg:px-3 mt-1 ml-3 border-2 lg:text-lg xs:text-xs rounded-md border-gray-500 focus:outline-teal-500 focus:ring-teal-500 focus:border-none shadow-sm shadow-[#808080] ${
                      errors.message && touched.message
                        ? ' shadow-red-500 border-red-500 focus:border-red-500 border-3 border-solid'
                        : ''
                    }`}
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errors.message && touched.message && (
                  <p className=" lg:text-base xs:text-xs text-red-500  absolute ml-[1rem] ">
                    {errors.message}
                  </p>
                )}
              </div>
              <div className="mx-auto text-center border-t-2 border-gray-300 py-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className={`relative px-10  h-9 w-28 tracking-wide rounded-lg font-semibold  transition duration-300 text-white bg-red-600 hover:bg-red-700 `}
                >
                  <span className="font-normal lg:text-lg xs:text-xs flex justify-center">
                    Clear
                  </span>
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={onSubmit}
                  className="relative ml-6  pl-8 pr-6 mr-1.5 h-9 w-28 rounded-lg font-semibold  transition duration-300 text-white bg-lime-600 hover:bg-lime-700"
                >
                  <span className="font-normal  lg:text-lg xs:text-xs flex justify-center">
                    Send
                    <BsFillSendFill className="ml-1.5 mt-1.5 " />
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
