import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Formik, useFormik } from 'formik';
import { MdClose } from 'react-icons/md';
import { VscInfo, VscQuestion, VscWarning } from 'react-icons/vsc';
import {
  BsCheckCircle,
  BsCheckCircleFill,
  BsXCircleFill,
  BsFillExclamationTriangleFill,
} from 'react-icons/bs';

import LoadingSpinner from './LoadingSpinner';
import StorageData from './StorageData';
import SecureStorageData from './SecureStorageData';

const ManageSubscriptionMessage = ({ visible, onClose }) => {
  const handleOnClose = e => {
    if (e.target.id === 'mainContainer') onClose();
    //window.location.reload(false);
  };

  if (!visible) return null;

  const [subscriberName, setSubscriberName] = useState('John Doe');
  const [product, setProduct] = useState('');

  useEffect(() => {
    var plan = StorageData.sessionStorageJSON('PLAN');
    if (plan !== null) {
      setProduct(plan);
    }
  });

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <>
      <div
        id="mainContainer"
        onClick={handleOnClose}
        className="fixed top-0 inset-0 z-[1000] bg-black bg-opacity-70 backdrop-blur-[1.5px] flex justify-center items-center "
      >
        <div
          className={`bg-white rounded semihdScreen:text-lg xs:text-base  hdScreen:scale-100 semihdScreen:scale-95 laptopScreen:scale-90 averageScreen:scale-90 md:scale-85 sm:scale-80 xs:scale-75
                      ${
                        product !== 'DOWNGRADE-1' && product !== 'DOWNGRADE-2'
                          ? 'hdScreen:w-[32.5%] semihdScreen:w-[37.5%] laptopScreen:w-[40%] averageScreen:w-[42.5%] md:w-[55%] sm:w-[70%] xs:w-[90%]'
                          : ''
                      } `}
        >
          <div className="grid grid-cols-2 bg-gray-400 b">
            <VscInfo className="text-[1.85rem] ml-1 mt-0.5 text-black/60" />
            <div className="text-right">
              <button
                onClick={onClose}
                className="transition duration-200 p-2 inline-block hover:bg-red-600 hover:text-white"
              >
                <MdClose />
              </button>
            </div>
          </div>
          <div className="">
            <div className="p-4">
              {product !== 'DOWNGRADE-1' && product !== 'DOWNGRADE-2' ? (
                <>
                  <div className=" font-roboto">
                    <div className="mx-auto px-6 hdScreen:py-6 semihdScreen:py-4 lg:py-2 bg-dark-200 rounded-lg text-gray-600 flex flex-col items-center">
                      <h2 className="semihdScreen:text-3xl lg:text-2xl xs:text-xl font-extrabold text-green-700 mb-4 text-center ">
                        Thank you for your support!
                      </h2>

                      <p className="semihdScreen:text-lg xs:text-base mb-4 text-center font-lato ">
                        Your purchase not only supports our website but also
                        validates our commitment to providing you with the best
                        products and services.
                      </p>

                      <p className="semihdScreen:text-lg xs:text-base mb-4 text-center font-lato ">
                        For now, we will{' '}
                        <span className="text-lime-700 font-bold">verify</span>{' '}
                        your payment. If you have any questions, feedback, or
                        require assistance, please don't hesitate to reach out.
                      </p>

                      <p className="semihdScreen:text-lg xs:text-base  text-gray-400 text-center font-lato ">
                        Please wait while we verify your payment. (Within a day)
                      </p>
                      <p className="semihdScreen:text-lg xs:text-base font-semibold text-green-700 text-center font-lato ">
                        - pedagogical.agent.sfe@gmail.com
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-center">
                  Your current plan has been downgraded.
                </p>
              )}
            </div>
            <div className="mx-auto text-center border-t-2 border-gray-300 py-3 ">
              <button
                onClick={onClose}
                className="transition duration-200 bg-gray-400/60 h-8 w-20 tracking-wide inline-block rounded-lg hover:bg-gray-400 hover:text-gray-100"
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

export default ManageSubscriptionMessage;
