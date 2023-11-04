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

import FileUploadPayment from './FileUploadPayment';

const SubscriptionLocked = ({ visible, onClose }) => {
  const handleOnClose = e => {
    if (e.target.id === 'mainContainer') onClose();
    //window.location.reload(false);
  };

  //if (!visible) return null ;
  const [currentPlan, setCurrentPlan] = useState('');
  const [expiredState, setExpiredState] = useState(false);

  useEffect(() => {
    setCurrentPlan('');
    var current = StorageData.localStorageJSON('S-TYPE');
    if (current !== null) {
      setCurrentPlan(current);
      checkDate();
    }
  }, []);

  function checkDate() {
    let subscriptionDate = StorageData.localStorageJSON('S-DATE');
    if (subscriptionDate !== null) {
      subscriptionDate = subscriptionDate.split('-');

      subscriptionDate[1] = parseInt(subscriptionDate[1]) - 1;
      subscriptionDate[1] = subscriptionDate[1].toString();

      let endDate = new Date(
        subscriptionDate[0],
        subscriptionDate[1],
        subscriptionDate[2],
        0,
        0
      );
      //Output value in milliseconds
      let endTime = endDate.getTime();

      let todayDate = new Date();
      let todayTime = todayDate.getTime();
      if (endTime < todayTime) {
        setExpiredState(true);
      }
    }
  }

  const extendPlan = e => {
    let plan = e.target.name;
    window.sessionStorage.setItem(
      'PLAN',
      SecureStorageData.dataEncryption('EXTEND')
    );
    window.location.reload('true');
  };

  function choosePlan(e) {
    let plan = e.target.name;

    if (plan == 'plan1') {
      window.sessionStorage.setItem(
        'PLAN',
        SecureStorageData.dataEncryption('SUBSCRIBE-TEACHER-1')
      );
      window.location.reload('true');
    } else if (plan == 'plan2') {
      window.sessionStorage.setItem(
        'PLAN',
        SecureStorageData.dataEncryption('SUBSCRIBE-TEACHER-2')
      );
      window.location.reload('true');
    } else if (plan == 'plan3') {
      window.sessionStorage.setItem(
        'PLAN',
        SecureStorageData.dataEncryption('SUBSCRIBE-TEACHER-3')
      );
      window.location.reload('true');
    }
  }

  return (
    <>
      <div
        id="mainContainer"
        onClick={handleOnClose}
        className={`select-none absolute min-h-screen h-full w-full z-50 bg-black bg-opacity-10 backdrop-blur-[40px] flex justify-center items-center 
                `}
      >
        <div className="hdScreen:w-[90%] semihdScreen:w-[95%] xs:w-full h-[90%] hdScreen:-mt-10 semihdScreen:-mt-14 laptopScreen:-mt-[7rem] averageScreen:-mt-[8rem] xs:-mt-[8rem] rounded-xl text-lg hdScreen:scale-[92.5%] semihdScreen:scale-[87.5%] laptopScreen:scale-[82.5%] averageScreen:scale-[77.5%] md:scale-[75%] sm:scale-[70%] xs:scale-[65%] ">
          <div className="text-gray-700 flex flex-col h-full">
            <div className="relative text-gray-900   semihdScreen:mb-6 averageScreen:mb-3  text-center hdScreen:text-4xl semihdScreen:text-3.5xl laptopScreen:text-3xl averageScreen:text-3xl xs:text-xl font-bakbak tracking-wide font-bold uppercase ">
              <div className="relative text-center tracking-[0.03em] ">
                {expiredState ? (
                  <>Subscription expired</>
                ) : (
                  <>This feature is locked</>
                )}
                <p className="absolute z-[-5] text-white  left-0 right-0 top-0.5">
                  {expiredState ? (
                    <>Subscription expired</>
                  ) : (
                    <>This feature is locked</>
                  )}
                </p>
              </div>
            </div>
            <div className=" grow mx-auto text-center w-full border-t-2 pt-4 border-gray-400/90">
              <div className="grid grid-cols-3 hdScreen:gap-10 semihdScreen:gap-8 averageScreen:gap-6 xs:gap-4 w-full h-full">
                <div
                  className={`relative bg-gray-100 shadow-lg  w-full h-full rounded-xl flex flex-col hdScreen:px-8 semihdScreen:px-6 averageScreen:px-2 xs:px-1 semihdScreen:pb-8 xs:pb-2 averageScreen:pt-8 xs:pt-4
                  ${
                    currentPlan == '' || currentPlan == 'TEACHER-PLAN-1'
                      ? 'hover:bg-white'
                      : ''
                  }`}
                >
                  <div
                    className={`select-none absolute left-0 top-0 opacity-100  w-full h-full bg-black/30 rounded-xl  backdrop-blur-[0.5px]  flex flex-col justify-center items-center text-center transition duration-150 
                                ${
                                  currentPlan !== '' &&
                                  currentPlan != 'TEACHER-PLAN-1'
                                    ? ''
                                    : 'hidden'
                                }`}
                  ></div>
                  <h1 className="hdScreen:text-2.5xl semihdScreen:text-2xl laptopScreen:text-1.5xl averageScreen:text-1.5xl xs:text-lg font-roboto  font-[600] uppercase text-black/80">
                    Plan 1: Equation Builder
                  </h1>
                  <div className="averageScreen:mt-0 xs:-mt-2 averageScreen:mb-4 xs:mb-3">
                    <h2 className="hdScreen:text-5xl semihdScreen:text-4xl laptopScreen:text-3.5xl averageScreen:text-3.5xl sm:text-3xl xs:text-xl font-bold mt-4 text-black mb-1">
                      ₱50
                    </h2>
                    <p className="hdScreen:text-lg semihdScreen:text-base averageScreen:text-sm xs:text-xs font-normal ">
                      per month
                    </p>
                  </div>

                  <p className="averageScreen:mb-4 xs:mb-3 hdScreen:text-lg semihdScreen:text-base averageScreen:text-sm xs:text-xs font-poppins  font-[600]">
                    Unlock the custom equation-based learning. Here's what you
                    get:
                  </p>
                  <div className="grow averageScreen:py-4">
                    <div className=" mt-2 text-left hdScreen:pl-12 semihdScreen:pl-4 averageScreen:pl-4 xs:pl-2">
                      <p className=" hdScreen:text-2xl semihdScreen:text-1.5xl averageScreen:text-xl xs:text-sm font-roboto font-[600] averageScreen:mb-2 xs:mb-0.5 flex items-center">
                        <BsCheckCircleFill className="lg:mr-4 xs:mr-2 text-lime-600" />
                        Create Custom Equations
                      </p>
                      <p className=" text-gray-600 text-left averageScreen:text-base xs:text-xs px-10 font-poppins font-[600] mb-4">
                        Create custom equations for student challenges — your
                        control.
                      </p>

                      <p className=" hdScreen:text-2xl semihdScreen:text-1.5xl averageScreen:text-xl  xs:text-sm font-roboto font-[600] averageScreen:mb-2 xs:mb-0.5 flex items-center">
                        <BsCheckCircleFill className="lg:mr-4 xs:mr-2 text-lime-600" />
                        Drag and Drop Customization
                      </p>
                      <p className=" text-gray-600 text-left averageScreen:text-base xs:text-xs px-10 font-poppins font-[600]">
                        Adjust equation difficulty with easy drag-and-drop to
                        meet student needs.
                      </p>
                    </div>
                  </div>
                  <br />
                  <p className="font-roboto hdScreen:text-lg semihdScreen:text-base averageScreen:text-sm xs:text-xs font-[500] mb-4">
                    Good for educators and learners who want to personalize
                    their equation-based learning journey.
                  </p>

                  <button
                    name="plan1"
                    onClick={
                      currentPlan == 'TEACHER-PLAN-1'
                        ? extendPlan
                        : currentPlan == ''
                        ? choosePlan
                        : null
                    }
                    className={`font-leagueSpartan w-full hdScreen:h-[4rem] semihdScreen:h-[3.5rem] laptopScreen:h-[3rem] averageScreen:h-[3rem] sm:h-[2rem] xs:h-[1.rem] font-bold averageScreen:text-2xl xs:text-xl transition duration-200  tracking-wide inline-block rounded-lg  text-white hover:text-gray-100
                    ${
                      currentPlan == 'TEACHER-PLAN-1'
                        ? 'bg-blue-500 hover:bg-blue-600'
                        : currentPlan == ''
                        ? 'bg-lime-600 hover:bg-lime-700'
                        : ' bg-gray-400 '
                    }`}
                  >
                    {currentPlan == 'TEACHER-PLAN-1' ? (
                      <>Extend Subscription</>
                    ) : (
                      <>Choose Plan</>
                    )}
                  </button>
                </div>
                <div
                  className={`relative bg-gray-100 shadow-lg  w-full h-full rounded-xl flex flex-col hdScreen:px-8 semihdScreen:px-6 averageScreen:px-2 xs:px-1 semihdScreen:pb-8 xs:pb-2 averageScreen:pt-8 xs:pt-4
                  ${
                    currentPlan == '' || currentPlan == 'TEACHER-PLAN-2'
                      ? 'hover:bg-white'
                      : ''
                  }`}
                >
                  <div
                    className={`select-none absolute left-0 top-0 opacity-100  w-full h-full bg-black/30 rounded-xl  backdrop-blur-[0.5px]  flex flex-col justify-center items-center text-center transition duration-150 
                                ${
                                  currentPlan !== '' &&
                                  currentPlan != 'TEACHER-PLAN-2'
                                    ? ''
                                    : 'hidden'
                                }`}
                  ></div>
                  <h1 className="hdScreen:text-2.5xl semihdScreen:text-2xl laptopScreen:text-1.5xl averageScreen:text-1.5xl xs:text-lg font-roboto  font-[600] uppercase text-black/80">
                    Plan 2: Equation Architect
                  </h1>
                  <div className="averageScreen:mt-0 xs:-mt-2 averageScreen:mb-4 xs:mb-3">
                    <h2 className="hdScreen:text-5xl semihdScreen:text-4xl laptopScreen:text-3.5xl averageScreen:text-3.5xl sm:text-3xl xs:text-xl font-bold mt-4 text-black mb-1">
                      ₱75
                    </h2>
                    <p className="hdScreen:text-lg semihdScreen:text-base averageScreen:text-sm xs:text-xs font-normal ">
                      per month
                    </p>
                  </div>

                  <p className="averageScreen:mb-4 xs:mb-3 hdScreen:text-lg semihdScreen:text-base averageScreen:text-sm xs:text-xs font-poppins  font-[600]">
                    Upgrade with Equation Architect. With Plan 1. Including:
                  </p>
                  <div className="grow averageScreen:py-4">
                    <div className=" mt-2 text-left hdScreen:pl-12 semihdScreen:pl-4 averageScreen:pl-4 xs:pl-2">
                      <p className=" hdScreen:text-2xl semihdScreen:text-1.5xl averageScreen:text-xl  xs:text-sm font-roboto font-[600] averageScreen:mb-2 xs:mb-0.5 flex items-center">
                        <BsCheckCircleFill className="lg:mr-4 xs:mr-2 text-lime-600" />
                        Custom Equation Settings
                      </p>
                      <p className=" text-gray-600 text-left averageScreen:text-base xs:text-xs px-10 font-poppins font-[600] mb-4">
                        Manage custom equation recurrence to fine-tune the
                        learning.
                      </p>

                      <p className=" hdScreen:text-2xl semihdScreen:text-1.5xl averageScreen:text-xl  xs:text-sm font-roboto font-[600] averageScreen:mb-2 xs:mb-0.5 flex items-center">
                        <BsCheckCircleFill className="lg:mr-4 xs:mr-2 text-lime-600" />
                        Prioritize Custom Equations
                      </p>
                      <p className=" text-gray-600 text-left averageScreen:text-base xs:text-xs px-10 font-poppins font-[600] mb-4">
                        Prioritize custom equations for students' focus.
                      </p>
                      <p className=" hdScreen:text-2xl semihdScreen:text-1.5xl averageScreen:text-xl xs:text-sm font-roboto font-[600] averageScreen:mb-2 xs:mb-0.5 flex items-center">
                        <BsCheckCircleFill className="lg:mr-4 xs:mr-2 text-lime-600" />
                        Fraction-Friendly
                      </p>
                      <p className=" text-gray-600 text-left averageScreen:text-base xs:text-xs px-10 font-poppins font-[600]">
                        Submit answers in fractions, decimals are optional.
                      </p>
                    </div>
                  </div>
                  <br />
                  <p className="font-roboto hdScreen:text-lg semihdScreen:text-base averageScreen:text-sm xs:text-xs font-[500] mb-4">
                    Ideal for educators who want advanced control and better
                    support for students with varying needs.
                  </p>

                  <button
                    name="plan2"
                    onClick={
                      currentPlan == 'TEACHER-PLAN-2'
                        ? extendPlan
                        : currentPlan == ''
                        ? choosePlan
                        : null
                    }
                    className={`font-leagueSpartan w-full hdScreen:h-[4rem] semihdScreen:h-[3.5rem] laptopScreen:h-[3rem] averageScreen:h-[3rem] sm:h-[2rem] xs:h-[1.rem] font-bold averageScreen:text-2xl xs:text-xl transition duration-200  tracking-wide inline-block rounded-lg  text-white hover:text-gray-100
                    ${
                      currentPlan == 'TEACHER-PLAN-2'
                        ? 'bg-blue-500 hover:bg-blue-600'
                        : currentPlan == ''
                        ? 'bg-lime-600 hover:bg-lime-700'
                        : ' bg-gray-400 '
                    }`}
                  >
                    {currentPlan == 'TEACHER-PLAN-2' ? (
                      <>Extend Subscription</>
                    ) : (
                      <>Choose Plan</>
                    )}
                  </button>
                </div>
                <div
                  className={`relative bg-gray-100 shadow-lg  w-full h-full rounded-xl flex flex-col hdScreen:px-8 semihdScreen:px-6 averageScreen:px-2 xs:px-1 semihdScreen:pb-8 xs:pb-2 averageScreen:pt-8 xs:pt-4
                  ${
                    currentPlan == '' || currentPlan == 'TEACHER-PLAN-3'
                      ? 'hover:bg-white'
                      : ''
                  }`}
                >
                  <div
                    className={`select-none absolute left-0 top-0 opacity-100  w-full h-full bg-black/30 rounded-xl  backdrop-blur-[0.5px]  flex flex-col justify-center items-center text-center transition duration-150 
                                ${
                                  currentPlan !== '' &&
                                  currentPlan != 'TEACHER-PLAN-3'
                                    ? ''
                                    : 'hidden'
                                }`}
                  ></div>
                  <h1 className="hdScreen:text-2.5xl semihdScreen:text-2xl laptopScreen:text-1.5xl averageScreen:text-1.5xl xs:text-lg font-roboto  font-[600] uppercase text-black/80">
                    Plan 3: Equation Master
                  </h1>
                  <div className="averageScreen:mt-0 xs:-mt-2 averageScreen:mb-4 xs:mb-3">
                    <h2 className="hdScreen:text-5xl semihdScreen:text-4xl laptopScreen:text-3.5xl averageScreen:text-3.5xl sm:text-3xl xs:text-xl font-bold mt-4 text-black mb-1">
                      ₱100
                    </h2>
                    <p className="hdScreen:text-lg semihdScreen:text-base averageScreen:text-sm xs:text-xs font-normal ">
                      per month
                    </p>
                  </div>

                  <p className="averageScreen:mb-4 xs:mb-3 hdScreen:text-lg semihdScreen:text-base averageScreen:text-sm xs:text-xs font-poppins  font-[600]">
                    Complete equation manager. All Plan 1 & 2 features, with
                    addition of:
                  </p>
                  <div className="grow averageScreen:py-4">
                    <div className=" mt-2 text-left hdScreen:pl-12 semihdScreen:pl-4 averageScreen:pl-4 xs:pl-2">
                      <p className=" hdScreen:text-2xl semihdScreen:text-1.5xl averageScreen:text-xl xs:text-sm font-roboto font-[600] averageScreen:mb-2 xs:mb-0.5 flex items-center">
                        <BsCheckCircleFill className="lg:mr-4 xs:mr-2 text-lime-600" />
                        Auto-Equation Settings
                      </p>
                      <p className=" text-gray-600 text-left averageScreen:text-base xs:text-xs px-10 font-poppins font-[600] mb-4">
                        Challenge with auto-gen equations, Manage it
                        accordingly.
                      </p>

                      <p className=" hdScreen:text-2xl semihdScreen:text-1.5xl averageScreen:text-xl xs:text-sm font-roboto font-[600] averageScreen:mb-2 xs:mb-0.5 flex items-center">
                        <BsCheckCircleFill className="lg:mr-4 xs:mr-2 text-lime-600" />
                        Range Controller
                      </p>
                      <p className=" text-gray-600 text-left averageScreen:text-base xs:text-xs px-10 font-poppins font-[600] mb-4">
                        The generated values can span from 1 to 999, or even
                        extend beyond.
                      </p>
                      <p className=" hdScreen:text-2xl semihdScreen:text-1.5xl averageScreen:text-xl xs:text-sm font-roboto font-[600] averageScreen:mb-2 xs:mb-0.5 flex items-center">
                        <BsCheckCircleFill className="lg:mr-4 xs:mr-2 text-lime-600" />
                        Variable Variety
                      </p>
                      <p className=" text-gray-600 text-left averageScreen:text-base xs:text-xs px-10 font-poppins font-[600]">
                        Use different lowercase letter variables for diverse
                        equations.
                      </p>
                    </div>
                  </div>
                  <br />
                  <p className="font-roboto hdScreen:text-lg semihdScreen:text-base averageScreen:text-sm xs:text-xs font-[500] mb-4">
                    This plan is perfect for educators looking to provide a
                    diverse and challenging equation-based learning.
                  </p>

                  <button
                    name="plan3"
                    onClick={
                      currentPlan == 'TEACHER-PLAN-3'
                        ? extendPlan
                        : currentPlan == ''
                        ? choosePlan
                        : null
                    }
                    className={`font-leagueSpartan w-full hdScreen:h-[4rem] semihdScreen:h-[3.5rem] laptopScreen:h-[3rem] averageScreen:h-[3rem] sm:h-[2rem] xs:h-[1.rem] font-bold averageScreen:text-2xl xs:text-xl transition duration-200  tracking-wide inline-block rounded-lg  text-white hover:text-gray-100
                    ${
                      currentPlan == 'TEACHER-PLAN-3'
                        ? 'bg-blue-500 hover:bg-blue-600'
                        : currentPlan == ''
                        ? 'bg-lime-600 hover:bg-lime-700'
                        : ' bg-gray-400 '
                    }`}
                  >
                    {currentPlan == 'TEACHER-PLAN-3' ? (
                      <>Extend Subscription</>
                    ) : (
                      <>Choose Plan</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptionLocked;
