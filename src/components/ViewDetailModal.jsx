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

const ViewDetailModal = ({ visible, onClose, onContinue }) => {
  const navigate = useNavigate();

  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');

  const [status, setStatus] = useState('UNSOLVED');

  useEffect(() => {
    var requestID = JSON.parse(
      window.sessionStorage.getItem('CURRENT_VIEW_DETAIL')
    );

    var viewState = JSON.parse(
      window.sessionStorage.getItem('VIEW_DETAIL_STATE')
    );

    if (viewState == true) {
      window.sessionStorage.setItem('VIEW_DETAIL_STATE', false);
      getRequestDetails(requestID);
    }
  });

  function getRequestDetails(requestID) {
    let id = requestID.replace(/"/g, ' ');
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
          JSON.stringify(keys[6])
        );
        loadValues();
        function loadValues() {
          setSubject(keys[1]);
          setMessage(keys[2]);
          setEmail(keys[3]);
          setRole(keys[4]);
          setStatus(keys[5]);
          setDate(keys[7]);
        }
      });
  }

  //window.localStorage.setItem("");
  const handleOnClose = e => {
    if (e.target.id === 'mainContainer') onClose();
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
        <div className="bg-white hdScreen:w-1/3 semihdScreen:w-[40%] laptopScreen:w-[45%] averageScreen:w-[45%] md:w-[50%] sm:w-[65%] xs:w-[70%] hdScreen:scale-100 semihdScreen:scale-90 laptopScreen:scale-85 averageScreen:scale-80 md:scale-80 sm:scale-80 xs:scale-75 rounded lg:text-lg md:text-base sm:text-sm xs:text-xs shadow-md ">
          <div
            className={`flex   ${
              status == 'SOLVED' ? 'bg-lime-600 ' : ' bg-red-500 '
            }  `}
          >
            <span className="grow lg:text-lg xs:text-lg ml-2 mt-1 text-black/70 font-semibold">
              {' '}
              [{role}]{'\u00A0'}
              <span className="lg:text-base xs:text-base">{email} </span>
            </span>
            <div className="text-right">
              <button
                onClick={onClose}
                className="bg-gray-500 p-2 inline-block hover:bg-gray-400 transition duration-200 hover:text-white"
              >
                <MdClose />
              </button>
            </div>
          </div>
          <div className=" text-center text-gray-800">
            <div className=" lg:text-lg md:text-base sm:text-sm xs:text-xs relative lg:py-1 lg:pb-6 xs:pb-3 lg:px-8 xs:px-2 ">
              <div className="inline-flex w-full mt-4">
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  maxLength="45"
                  className={`  tracking-wide text-gray-600 grow p-1 font-bold px-2 mt-1 ml-3 border-2 lg:text-lg md:text-base sm:text-sm xs:text-xs rounded-md border-gray-500   shadow-sm shadow-[#808080]
                     `}
                  value={subject}
                  readOnly
                />
              </div>

              <div className="inline-flex w-full mt-2">
                <textarea
                  id="message"
                  name="message"
                  type="text"
                  rows="8"
                  className={` grow lg:py-4  lg:px-3 mt-1 ml-3 border-2 lg:text-lg md:text-base sm:text-sm xs:text-xs rounded-md border-gray-500   shadow-sm shadow-[#808080] `}
                  value={message}
                  readOnly
                />
              </div>
              <p className="text-right text-sm">{date}</p>
            </div>
            <div className="mx-auto text-center border-t-2 border-gray-300 py-3">
              <button
                onClick={onClose}
                className="mx-2 text-white bg-gray-500/90 h-9 w-28 tracking-wide inline-block rounded-lg hover:bg-gray-600 hover:text-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewDetailModal;
