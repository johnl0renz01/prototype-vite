import React, { Component } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import { MdClose } from 'react-icons/md';
import {
  BsArrow90DegLeft,
  BsFillSendFill,
  BsDashCircle,
  BsCheckCircle,
  BsArrowDownSquare,
} from 'react-icons/bs';

import { Formik, useFormik } from 'formik';

import LoadingSpinner from './LoadingSpinner';

import StorageData from './StorageData';
import SecureStorageData from './SecureStorageData';

import ViewDetailPicture from './ViewDetailPicture';
import FileUpload from './FileUpload';

const ViewDetailModal = ({ visible, onClose, onContinue }) => {
  const [showLoading, setShowLoading] = useState(false);

  const navigate = useNavigate();

  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');

  const [status, setStatus] = useState('UNSOLVED');

  const [messageDetails, setMessageDetails] = useState([]);

  useEffect(() => {
    var requestID = StorageData.sessionStorageJSON('CURRENT_VIEW_DETAIL');

    var viewState = JSON.parse(
      window.sessionStorage.getItem('VIEW_DETAIL_STATE')
    );

    if (viewState == true) {
      window.sessionStorage.setItem('VIEW_DETAIL_STATE', false);
      getRequestDetails(requestID);
    }
  });

  function getRequestDetails(requestID) {
    setShowLoading(true);
    let id = requestID.replace(/"/g, '');
    axios
      .get(
        `http://localhost:80/Prototype-Vite/my-project/api/requestDetails/${id}`
      )
      .then(function (response) {
        var result = Object.values(response.data);

        var keys = [];
        for (var k in result[0]) keys.push(result[0][k]);

        window.sessionStorage.setItem(
          'CURRENT_VIEW_DETAIL',
          JSON.stringify(SecureStorageData.dataEncryption(keys[6]))
        );
        setShowLoading(false);
        loadValues();
        function loadValues() {
          setSubject(keys[1]);
          setMessage(keys[2]);
          setEmail(keys[3]);
          setRole(keys[4]);
          setStatus(keys[5]);
          setDate(keys[7]);
        }

        axios
          .get(
            `http://localhost:80/Prototype-Vite/my-project/api/requestMessages/${id}`
          )
          .then(function (response) {
            var result = response.data;
            if (result.length > 0 && typeof result !== 'string') {
              setMessageDetails(result);
            } else {
              setMessageDetails([]);
            }
          })
          .catch(function (error) {
            setShowLoading(false);
          });
      })
      .catch(function (error) {
        setShowLoading(false);
      });
  }

  //window.localStorage.setItem("");
  const handleOnClose = e => {
    if (e.target.id === 'mainContainer') {
      setReplyMode(false);
      for (var i = 1; i < 99999; i++) window.clearInterval(i);
      onClose();
    }
  };

  const closeButton = e => {
    setReplyMode(false);
    for (var i = 1; i < 99999; i++) window.clearInterval(i);
    onClose();
  };

  const onSubmit = async (values, actions) => {
    console.log('HERE');
    setShowLoading(true);
    var requestID = StorageData.sessionStorageJSON('CURRENT_VIEW_DETAIL');
    let id = requestID.replace(/"/g, '');
    //console.log(id);
    var email = StorageData.localStorageJSON('SESSION_EMAIL');
    if (email === null) email = '';
    //console.log(email);
    var role = StorageData.localStorageJSON('ACCOUNT_TYPE');
    //console.log(role);

    axios
      .post(
        `http://localhost:80/Prototype-Vite/my-project/api/requestReply/${id}~${role}~${email}`,
        values
      )
      .then(function (response) {
        console.log(response.data);
        window.sessionStorage.setItem(
          'UPLOAD_IMAGE',
          SecureStorageData.dataEncryption('TRUE')
        );
        setShowLoading(false);
        setReplyMode(false);
        handleReset();
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
    handleReset,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit,
  });

  const [replyMode, setReplyMode] = useState(false);
  const replyArea = document.getElementById('message');

  const reply = () => {
    setReplyMode(true);
    setTimeout(scrollToBottom, 1);
    function scrollToBottom() {
      var objDiv = document.getElementById('container');
      objDiv.scroll({ top: objDiv.scrollHeight, behavior: 'smooth' });
    }
    values.message = '';
    handleChange.message;
  };

  const cancelButton = () => {
    setReplyMode(false);
    setTimeout(scrollToBottom, 1);
    function scrollToBottom() {
      var objDiv = document.getElementById('container');
      objDiv.scroll({ top: objDiv.scrollHeight, behavior: 'smooth' });
    }
    values.message = '';
    handleChange.message;
  };

  const sendReply = () => {};

  // MODAL IMAGE
  const [showModal, setShowModal] = useState(false);
  const handleOnCloseModal = () => setShowModal(false);
  const handleOnContinueModal = () => {
    setShowModal(false);
  };

  function imagePreview(file) {
    var data = file;
    var dataName = data.substring(8);
    var fileDetails = data.split('.');
    var img = fileDetails[0];
    var extensionType = fileDetails[1];
    //console.log(extensionType);

    if (extensionType == 'jpg') {
      return (
        <>
          {' '}
          <div className="lg:pb-4 xs:pb-2">
            <img
              className="cursor-pointer"
              onClick={function () {
                setShowModal(true),
                  window.sessionStorage.setItem(
                    'IMAGE_LINK_VIEW',
                    JSON.stringify(file)
                  );
              }}
              src={
                'http://localhost:80/Prototype-Vite/my-project/api/' +
                img +
                '.jpg'
              }
            ></img>
          </div>
        </>
      );
    } else if (extensionType == 'jpeg') {
      return (
        <>
          {' '}
          <div className="lg:pb-4 xs:pb-2">
            <img
              className="cursor-pointer"
              onClick={function () {
                setShowModal(true),
                  window.sessionStorage.setItem(
                    'IMAGE_LINK_VIEW',
                    JSON.stringify(file)
                  );
              }}
              src={
                'http://localhost:80/Prototype-Vite/my-project/api/' +
                img +
                '.jpeg'
              }
            ></img>
          </div>
        </>
      );
    }
    if (extensionType == 'png') {
      return (
        <>
          {' '}
          <div className="lg:pb-4 xs:pb-2">
            <img
              className="cursor-pointer"
              onClick={function () {
                setShowModal(true),
                  window.sessionStorage.setItem(
                    'IMAGE_LINK_VIEW',
                    JSON.stringify(file)
                  );
              }}
              src={
                'http://localhost:80/Prototype-Vite/my-project/api/' +
                img +
                '.png'
              }
            ></img>
          </div>
        </>
      );
    } else if (
      extensionType !== '' &&
      extensionType !== undefined &&
      extensionType !== null
    ) {
      return (
        <>
          <div className=" lg:max-w-[15rem] sm:max-w-[8rem] xs:max-w-[7.5rem]">
            <span className="text-gray-500 font-semibold md:text-base sm:text-sm xs:text-xs">
              Attached File(s):
            </span>
            <Link
              role="button"
              to={'http://localhost:80/Prototype-Vite/my-project/api/' + data}
              target="_blank"
              download
              className="  flex justify-start items-center hdScreen:text-base semihdScreen:text-sm  laptopScreen:text-sm averageScreen:text-sm xs:text-xs   hdScreen:py-1 semihdScreen:py-1 laptopScreen:py-1 averageScreen:py-0.5  text-gray-600 hover:text-gray-700 relative   "
            >
              <i className=" fa fa-paperclip mr-1 "></i>{' '}
              <p
                title={dataName}
                className=" lg:max-w-[15rem] sm:max-w-[8rem] xs:max-w-[7.5rem] text-ellipsis overflow-hidden whitespace-nowrap"
              >
                {dataName}
              </p>
            </Link>
          </div>
        </>
      );
    }
  }

  if (!visible) return null;

  function headContent(person, timestamp, content, file, index) {
    if (file !== 0 && file !== null) {
      return (
        <div id={index}>
          <hr />

          <div className="flex my-3 items-center">
            <p className="text-left text-base mr-2 font-semibold">
              By: {person}
            </p>
            <p className="text-left text-sm">({timestamp})</p>
          </div>

          <div className="relative inline-flex w-full mb-3 whitespace-pre-line">
            {content}
          </div>
          <div className="max-w-[50%]">{imagePreview(file)}</div>
        </div>
      );
    } else if (file == null) {
      return (
        <div id={index}>
          <hr />

          <div className="flex my-3 items-center">
            <p className="text-left text-base mr-2 font-semibold">
              By: {person}
            </p>
            <p className="text-left text-sm">({timestamp})</p>
          </div>

          <div className="relative inline-flex w-full mb-3 whitespace-pre-line">
            {content}
          </div>
        </div>
      );
    }
  }

  return (
    <>
      <div
        id="mainContainer"
        onClick={handleOnClose}
        className={`fixed top-0 z-50 inset-0 bg-black bg-opacity-50 backdrop-blur-[1.5px] flex justify-center items-center "
                  ${showLoading ? 'invisible' : ''}`}
      >
        <div className="bg-white  hdScreen:w-1/3 semihdScreen:w-[40%] laptopScreen:w-[45%] averageScreen:w-[45%] md:w-[50%] sm:w-[65%] xs:w-[70%] hdScreen:scale-100 semihdScreen:scale-90 laptopScreen:scale-85 averageScreen:scale-80 md:scale-80 sm:scale-80 xs:scale-75 rounded lg:text-lg md:text-base sm:text-sm xs:text-xs shadow-md ">
          <div
            className={`flex items-center justify-center  ${
              status == 'SOLVED' ? 'bg-lime-600 ' : ' bg-red-500 '
            }  `}
          >
            <span className="grow lg:text-2xl xs:text-lg ml-2 text-white  font-bold tracking-wider ">
              {status == 'SOLVED' ? (
                <>
                  <BsCheckCircle className="lg:ml-1 xs:ml-0.5 text-white" />
                </>
              ) : (
                <>
                  <BsDashCircle className="lg:ml-1 xs:ml-0.5 text-white" />
                </>
              )}
              {/** 
              {' '}
              [{role}]{'\u00A0'}
              <span className="lg:text-l  g xs:text-base text-white">
                {email}{' '}
              </span>
              */}
            </span>
            <div className="text-right">
              <button
                onClick={closeButton}
                className=" p-3 inline-block hover:bg-gray-600 transition duration-200 hover:text-white"
              >
                <MdClose className="" />
              </button>
            </div>
          </div>
          <div className=" text-left text-gray-800 ">
            <form onSubmit={handleSubmit} action="" autoComplete="off">
              <div
                id="container"
                className=" min-h-[calc(100vh-50vh)] max-h-[calc(100vh-50vh)] overflow-y-scroll lg:text-lg md:text-base sm:text-sm xs:text-xs relative lg:py-1 lg:pb-6 xs:pb-3 lg:px-8 xs:px-2 "
              >
                <h1 className="text-2xl font-semibold py-2">{subject}</h1>
                {messageDetails.length > 0 ? (
                  <>
                    {messageDetails.map((content, index) => (
                      <div key={index}>
                        {headContent(
                          content.Name,
                          content.Date,
                          content.Message,
                          content.File,
                          index
                        )}
                      </div>
                    ))}
                  </>
                ) : (
                  <>{headContent('System', date, message, null, 0)}</>
                )}

                <div className={`my-3 ${replyMode ? '' : 'hidden'}`}>
                  <hr />
                  <textarea
                    id="message"
                    name="message"
                    type="text"
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Write your reply..."
                    rows="8"
                    className={` mt-4 w-full lg:py-2  lg:px-3  lg:text-lg xs:text-xs rounded-md border-2 border-gray-500 focus:outline-teal-500 focus:ring-teal-500 focus:border-none 
                      `}
                  />
                  <FileUpload />
                </div>
              </div>
              <div
                className={`relative flex text-center border-t-2 border-gray-300 py-3 lg:px-8 xs:px-2
                            ${
                              status == 'SOLVED'
                                ? 'justify-center'
                                : 'justify-end '
                            }`}
              >
                <div
                  className={`${replyMode ? 'absolute right-4' : 'invisible'}`}
                >
                  <button
                    type="button"
                    onClick={cancelButton}
                    className="transition duration-200  text-gray-800   lg:py-0.5 lg:px-3 sm:py-1.5 sm:px-2.5 xs:px-1 xs:py-1 tracking-normal inline-block rounded-md border-gray-300 border-2 hover:border-gray-500 
                    hdScreen:text-lg semihdScreen:text-lg laptopScreen:text-base averageScreen:text-base sm:text-sm xs:text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type={values.message != '' ? 'submit' : 'button'}
                    disabled={isSubmitting}
                    onClick={values.message != '' ? onSubmit : null}
                    className={` ml-4 relative lg:py-0.5 lg:px-3 sm:py-1.5 sm:px-2.5 xs:px-1 xs:py-1  rounded-md   ease-in-out transition duration-300 
                                ${
                                  values.message != ''
                                    ? 'cursor-pointer text-white  bg-lime-600 hover:bg-lime-700 border-2 border-lime-600 hover:border-lime-700'
                                    : 'cursor-default text-gray-300 bg-gray-400 border-2 border-gray-400'
                                }`}
                  >
                    <span className=" hdScreen:text-lg semihdScreen:text-lg laptopScreen:text-base averageScreen:text-base sm:text-sm xs:text-xs flex items-center justify-center">
                      Send
                      <BsFillSendFill className="ml-1 lg:text-xs xs:text-xs " />
                    </span>
                  </button>
                </div>

                <div
                  className={`${
                    replyMode
                      ? 'invisible'
                      : status == 'SOLVED'
                      ? 'absolute left-0 right-0'
                      : messageDetails.length < 1
                      ? 'absolute left-0 right-0'
                      : 'absolute right-4'
                  }`}
                >
                  <button
                    type="button"
                    onClick={closeButton}
                    className={`transition duration-200  text-gray-800  lg:py-0.5 lg:px-3 sm:py-1.5 sm:px-2.5 xs:px-1 xs:py-1 tracking-normal inline-block rounded-md border-2 border-gray-300 hover:border-gray-500 "
                    hdScreen:text-lg semihdScreen:text-lg laptopScreen:text-base averageScreen:text-base sm:text-sm xs:text-xs`}
                  >
                    Close
                  </button>
                  {status == 'UNSOLVED' && messageDetails.length > 0 ? (
                    <button
                      type="button"
                      onClick={reply}
                      className={`ml-4 relative lg:py-0.5 lg:px-3 sm:py-1.5 sm:px-2.5 xs:px-1 xs:py-1 text-gray-800    rounded-md  border-gray-300 border-2 hover:border-gray-500  hover:bg-gray-500 hover:text-white  ease-in-out transition duration-300 
                  `}
                    >
                      <span className=" hdScreen:text-lg semihdScreen:text-lg laptopScreen:text-base averageScreen:text-base sm:text-sm xs:text-xs flex items-center justify-center">
                        <BsArrow90DegLeft className="mr-2 hdScreen:text-[1rem] semihdScreen:text-[1rem] laptopScreen:text-[0.8rem] averageScreen:text-[0.8rem]" />
                        Reply
                      </span>
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ViewDetailPicture
        onClose={handleOnCloseModal}
        visible={showModal}
        onContinue={handleOnContinueModal}
      />
      <LoadingSpinner visible={showLoading} />
    </>
  );
};

export default ViewDetailModal;
