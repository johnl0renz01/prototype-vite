import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import { MdClose } from 'react-icons/md';

import LoadingSpinner from './LoadingSpinner';

const ViewDetailModal = ({ visible, onClose, onContinue }) => {
  const [showLoading, setShowLoading] = useState(false);

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
    setShowLoading(true);
    let id = requestID.replace(/"/g, ' ');
    axios
      .get(`https://pia-sfe.online/api/requestDetails/${id}`)
      .then(function (response) {
        var result = Object.values(response.data);

        var keys = [];
        for (var k in result[0]) keys.push(result[0][k]);

        window.sessionStorage.setItem(
          'CURRENT_VIEW_DETAIL',
          JSON.stringify(keys[6])
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
      })
      .catch(function (error) {
        setShowLoading(false);
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
                  ${showLoading ? 'invisible' : ''}`}
      >
        <div className="bg-white hdScreen:w-1/3 semihdScreen:w-[40%] laptopScreen:w-[45%] averageScreen:w-[45%] md:w-[50%] sm:w-[65%] xs:w-[70%] hdScreen:scale-100 semihdScreen:scale-90 laptopScreen:scale-85 averageScreen:scale-80 md:scale-80 sm:scale-80 xs:scale-75 rounded lg:text-lg md:text-base sm:text-sm xs:text-xs shadow-md ">
          <div
            className={`flex items-center justify-center  ${
              status == 'SOLVED' ? 'bg-lime-600 ' : ' bg-red-500 '
            }  `}
          >
            <span className="grow lg:text-xl xs:text-lg ml-2 text-white  font-semibold">
              {' '}
              [{role}]{'\u00A0'}
              <span className="lg:text-lg xs:text-base text-white">
                {email}{' '}
              </span>
            </span>
            <div className="text-right">
              <button
                onClick={onClose}
                className=" p-3 inline-block hover:bg-gray-400 transition duration-200 hover:text-white"
              >
                <MdClose className="" />
              </button>
            </div>
          </div>
          <div className=" text-left text-gray-800">
            <div className=" lg:text-lg md:text-base sm:text-sm xs:text-xs relative lg:py-1 lg:pb-6 xs:pb-3 lg:px-8 xs:px-2 ">
              <h1 className="text-2xl font-semibold py-2">{subject}</h1>
              <hr />
              <div className="inline-flex w-full mt-2">{message}</div>
              <p className="text-right text-sm">{date}</p>
            </div>
            <div className="mx-auto text-center border-t-2 border-gray-300 py-3">
              <button
                onClick={onClose}
                className="transition duration-200 mx-2 text-white bg-gray-500/90 h-9 w-28 tracking-wide inline-block rounded-lg hover:bg-gray-600 hover:text-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <LoadingSpinner visible={showLoading} />
    </>
  );
};

export default ViewDetailModal;
