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

const ManageSubscriptionConfirm = ({ visible, onClose, onContinue }) => {
  var check;

  const handleOnClose = e => {
    if (e.target.id === 'mainContainer') {
      for (var i = 1; i < 99999; i++) window.clearInterval(i);
      if (check != '') {
        clearInterval(check);
      }
      window.sessionStorage.removeItem('PLAN');
      window.sessionStorage.removeItem('UPLOADED');
      onClose();
    }
  };

  const closeButton = e => {
    for (var i = 1; i < 99999; i++) window.clearInterval(i);
    if (check != '') {
      clearInterval(check);
    }
    window.sessionStorage.removeItem('PLAN');
    window.sessionStorage.removeItem('UPLOADED');
    onClose();
  };

  const [showLoading, setShowLoading] = useState(false);

  const onSubmit = async (values, actions) => {
    var tempPlan = StorageData.sessionStorageJSON('TEMP_PLAN');
    if (tempPlan !== null) {
      window.localStorage.setItem(
        'S-TYPE',
        SecureStorageData.dataEncryption(tempPlan)
      );
    }

    setShowLoading(true);

    var email = StorageData.localStorageJSON('SESSION_EMAIL');
    var role = StorageData.localStorageJSON('ACCOUNT_TYPE');
    var name = StorageData.localStorageJSON('SESSION_FULLNAME');
    name = name.replace(/ /g, '_');

    axios
      .post(
        `https://pia-sfe.online/api/requestSend/${email}~${role}~${name}`,
        values
      )
      .then(function (response) {
        window.sessionStorage.setItem(
          'CURRENT_VIEW_DETAIL',
          SecureStorageData.dataEncryption(response.data)
        );
        window.sessionStorage.setItem(
          'UPLOAD_IMAGE',
          SecureStorageData.dataEncryption('TRUE')
        );
        setShowLoading(false);
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
      subject: '',
      message: '',
      type: '',
    },
    onSubmit,
  });

  const [planType, setPlanType] = useState('');
  const [currentPlan, setCurrentPlan] = useState('');
  const [uploadedState, setUploadedState] = useState(false);

  useEffect(() => {
    setPlanType('');

    var current = StorageData.localStorageJSON('S-TYPE');
    if (current !== null) {
      setCurrentPlan(current);
    }

    var plan = StorageData.sessionStorageJSON('PLAN');
    if (plan !== null) {
      setPlanType(plan);

      if (planType == '') {
        setUploadedState(false);
        clearInterval(check);
        check = setInterval(checkUploaded, 200);
      }

      if (plan == 'DOWNGRADE-1') {
        values.subject = 'Downgrade to Plan 1: Equation Builder';
        handleChange.subject;

        values.type = 'TEACHER-PLAN-1';
        handleChange.type;

        if (current == 'TEACHER-PLAN-2') {
          values.message = 'Downgrade subscription from: Plan 2 -> Plan 1';
          handleChange.message;
        } else if (current == 'TEACHER-PLAN-3') {
          values.message = 'Downgrade subscription from: Plan 3 -> Plan 1';
          handleChange.message;
        }

        window.sessionStorage.setItem(
          'TEMP_PLAN',
          SecureStorageData.dataEncryption('TEACHER-PLAN-1')
        );
      } else if (plan == 'DOWNGRADE-2') {
        values.subject = 'Downgrade to Plan 2: Equation Architect';
        handleChange.subject;

        values.type = 'TEACHER-PLAN-2';
        handleChange.type;

        if (current == 'TEACHER-PLAN-3') {
          values.message = 'Downgrade subscription from: Plan 3 -> Plan 2';
          handleChange.message;
        }

        window.sessionStorage.setItem(
          'TEMP_PLAN',
          SecureStorageData.dataEncryption('TEACHER-PLAN-2')
        );
      } else if (plan == 'UPGRADE-2') {
        values.subject = 'Upgrade to Plan 2: Equation Architect';
        handleChange.subject;

        if (current == 'TEACHER-PLAN-1') {
          values.message =
            'Upgrade subscription from: Plan 1 -> Plan 2\nPrice: ₱25';
          handleChange.message;
        }
      } else if (plan == 'UPGRADE-3') {
        values.subject = 'Upgrade to Plan 3: Equation Master';
        handleChange.subject;

        if (current == 'TEACHER-PLAN-1') {
          values.message =
            'Upgrade subscription from: Plan 1 -> Plan 3\nPrice: ₱50';
          handleChange.message;
        } else if (current == 'TEACHER-PLAN-2') {
          values.message =
            'Upgrade subscription from: Plan 2 -> Plan 3\nPrice: ₱25';
          handleChange.message;
        }
      } else if (plan == 'SUBSCRIBE-TEACHER-1') {
        values.subject = 'Subscribe to Plan 1: Equation Builder';
        handleChange.subject;
        values.message = 'Subscribe to Plan 1\nExtended: 1 Month\nPrice: ₱50';
        handleChange.message;
      } else if (plan == 'SUBSCRIBE-TEACHER-2') {
        values.subject = 'Subscribe to Plan 2: Equation Architect';
        handleChange.subject;
        values.message = 'Subscribe to Plan 2\nExtended: 1 Month\nPrice: ₱75';
        handleChange.message;
      } else if (plan == 'SUBSCRIBE-TEACHER-3') {
        values.subject = 'Subscribe to Plan 3: Equation Master';
        handleChange.subject;
        values.message = 'Subscribe to Plan 3\nExtended: 1 Month\nPrice: ₱100';
        handleChange.message;
      } else if (plan == 'SUBSCRIBE-STUDENT-1') {
        // NONE
      } else if (plan == 'EXTEND') {
        if (current == 'TEACHER-PLAN-1') {
          values.subject = 'Subscription Plan 1: Extend Time';
          handleChange.subject;

          values.message =
            'Extend subscription for Plan 1\nExtended: 1 Month\nPrice: ₱50';
          handleChange.message;
        } else if (current == 'TEACHER-PLAN-2') {
          values.subject = 'Subscription Plan 2: Extend Time';
          handleChange.subject;

          values.message =
            'Extend subscription for Plan 2\nExtended: 1 Month\nPrice: ₱75';
          handleChange.message;
        } else if (current == 'TEACHER-PLAN-3') {
          values.subject = 'Subscription Plan 3: Extend Time';
          handleChange.subject;

          values.message =
            'Extend subscription for Plan 3\nExtended: 1 Month\nPrice: ₱100';
          handleChange.message;
        }
      }
    } else {
      setUploadedState(false);
      if (check != '') {
        clearInterval(check);
      }
    }
  });

  const checkUploaded = () => {
    var uploaded = StorageData.sessionStorageJSON('UPLOADED');
    if (uploaded !== null) {
      setUploadedState(true);
    } else {
      setUploadedState(false);
    }
  };

  if (!visible) return null;

  return (
    <>
      <div
        id="mainContainer"
        onClick={handleOnClose}
        className="fixed top-0 inset-0 z-[999] bg-black bg-opacity-60 backdrop-blur-[1.5px] flex justify-center items-center "
      >
        <div className="bg-white  rounded text-lg hdScreen:scale-100 semihdScreen:scale-95 laptopScreen:scale-90 averageScreen:scale-90 md:scale-85 sm:scale-85 xs:scale-80 ">
          <div className="grid grid-cols-2 bg-gray-400 ">
            <div className="flex items-center font-semibold text-gray-800">
              <VscInfo className="text-[1.85rem] ml-1 mt-0.5 text-black/60 mr-1" />
              Process
            </div>
            <div className="text-right">
              <button
                onClick={closeButton}
                className="transition duration-200 p-2 inline-block hover:bg-red-600 hover:text-white"
              >
                <MdClose />
              </button>
            </div>
          </div>
          <div className="">
            <div className="p-4 pb-0 text-gray-700">
              <div className="flex ">
                <div
                  className={`flex flex-col  relative sm:p-6 xs:p-4 pb-2  border-black/50  lg:text-3xl xs:text-2.5xl font-bold
                            ${
                              planType == 'DOWNGRADE-1' ||
                              planType == 'DOWNGRADE-2'
                                ? ''
                                : 'border-r-[1px]'
                            }`}
                >
                  <h1 className="font-extrabold semihdScreen:text-5xl lg:text-4xl sm:text-3xl xs:text-xl border-b-[2px] border-black/50 sm:pb-4 xs:pb-1 hdScreen:leading-14 lg:leading-10 sm:leading-6 xs:leading-4 uppercase font-bakbak">
                    {planType == 'DOWNGRADE-1' ? (
                      <>
                        Downgrade: <span className="text-red-600">Plan 1</span>
                      </>
                    ) : planType == 'DOWNGRADE-2' ? (
                      <>
                        Downgrade: <span className="text-red-600">Plan 2</span>
                      </>
                    ) : planType == 'UPGRADE-2' ? (
                      <>
                        Upgrade: <span className="text-lime-700">Plan 2</span>
                      </>
                    ) : planType == 'UPGRADE-3' ? (
                      <>
                        Upgrade: <span className="text-lime-700">Plan 3</span>
                      </>
                    ) : planType == 'SUBSCRIBE-TEACHER-1' ? (
                      <>
                        Subscribe: <span className="text-lime-700">Plan 1</span>
                      </>
                    ) : planType == 'SUBSCRIBE-TEACHER-2' ? (
                      <>
                        Subscribe: <span className="text-lime-700">Plan 2</span>
                      </>
                    ) : planType == 'SUBSCRIBE-TEACHER-3' ? (
                      <>
                        Subscribe: <span className="text-lime-700">Plan 3</span>
                      </>
                    ) : planType == 'SUBSCRIBE-STUDENT-1' ? (
                      <>
                        Unlock: <span className="text-lime-700">Levels</span>
                      </>
                    ) : planType == 'EXTEND' ? (
                      <>
                        Time: <span className="text-blue-600">Extend</span>
                      </>
                    ) : (
                      <></>
                    )}
                    <br />
                    <p className="lg:mt-2 xs:mt-0.5 semihdScreen:text-4xl lg:text-3.5xl sm:text-3xl xs:text-xl font-extrabold font-sans">
                      {planType == 'DOWNGRADE-1' ||
                      planType == 'DOWNGRADE-2' ? (
                        <>
                          <span className="font-bakbak">MONEY: NO REFUND </span>
                        </>
                      ) : (
                        <>
                          <span className="font-bakbak">Total Cost: </span>
                          {planType == 'UPGRADE-2' ? (
                            <>
                              {' '}
                              <span className="text-lime-700">₱25</span>
                            </>
                          ) : planType == 'UPGRADE-3' &&
                            currentPlan == 'TEACHER-PLAN-1' ? (
                            <>
                              {' '}
                              <span className="text-lime-700">₱50</span>
                            </>
                          ) : planType == 'UPGRADE-3' &&
                            currentPlan == 'TEACHER-PLAN-2' ? (
                            <>
                              {' '}
                              <span className="text-lime-700">₱25</span>
                            </>
                          ) : planType == 'SUBSCRIBE-TEACHER-1' ? (
                            <>
                              {' '}
                              <span className="text-lime-700">₱50</span>
                            </>
                          ) : planType == 'SUBSCRIBE-TEACHER-2' ? (
                            <>
                              {' '}
                              <span className="text-lime-700">₱75</span>
                            </>
                          ) : planType == 'SUBSCRIBE-TEACHER-3' ? (
                            <>
                              {' '}
                              <span className="text-lime-700">₱100</span>
                            </>
                          ) : planType == 'SUBSCRIBE-STUDENT-1' ? (
                            <>
                              <span className="text-lime-700">₱30</span>
                            </>
                          ) : currentPlan == 'TEACHER-PLAN-1' ? (
                            <>
                              {' '}
                              <span className="text-lime-700">₱50</span>
                            </>
                          ) : currentPlan == 'TEACHER-PLAN-2' ? (
                            <>
                              {' '}
                              <span className="text-lime-700">₱75</span>
                            </>
                          ) : currentPlan == 'TEACHER-PLAN-3' ? (
                            <>
                              {' '}
                              <span className="text-lime-700">₱100</span>
                            </>
                          ) : currentPlan == 'STUDENT-PLAN-1' ? (
                            <>
                              {' '}
                              <span className="text-lime-700">₱30</span>
                            </>
                          ) : (
                            <></>
                          )}{' '}
                        </>
                      )}
                    </p>
                  </h1>
                  {/**TESTING ALTERNATIVE */}
                  <div className="hidden relative averageScreen:py-1  px-2 border-b-[2px] border-black/50 hdScreen:pb-4 lg:pb-2 xs:pb-1">
                    <h1 className="font-lato font-extrabold hdScreen:py-2 lg:py-1 xs:py-1 hdScreen:mb-1 lg:text-2xl sm:text-xl xs:text-lg">
                      Inclusions:
                    </h1>
                    <div className="hdScreen:pb-4 lg:pb-2 xs:pb-0">
                      <p className=" hdScreen:text-xl semihdScreen:text-lg averageScreen:text-base  xs:text-xs font-roboto font-[600] averageScreen:mb-0.5 xs:mb-0 flex items-center">
                        <BsCheckCircleFill className=" lg:mr-4 xs:mr-2 text-lime-600 bg-white rounded-full" />
                        Custom Equation Settings
                      </p>
                      <p className=" text-gray-600 text-left averageScreen:text-sm xs:text-xs lg:pl-10 sm:pl-5 xs:pl-5 font-poppins font-[600] semihdScreen:mb-3 sm:mb-1">
                        Manage custom equation recurrence to fine-tune the
                        learning.
                      </p>

                      <p className=" hdScreen:text-xl semihdScreen:text-lg averageScreen:text-base  xs:text-xs font-roboto font-[600] averageScreen:mb-0.5 xs:mb-0 flex items-center">
                        <BsCheckCircleFill className=" lg:mr-4 xs:mr-2 text-lime-600 bg-white rounded-full" />
                        Prioritize Custom Equations
                      </p>
                      <p className=" text-gray-600 text-left averageScreen:text-sm xs:text-xs lg:pl-10 sm:pl-5 xs:pl-5 font-poppins font-[600] semihdScreen:mb-3 sm:mb-1">
                        Prioritize custom equations for students' focus.
                      </p>
                      <p className=" hdScreen:text-xl semihdScreen:text-lg averageScreen:text-base  xs:text-xs font-roboto font-[600] averageScreen:mb-0.5 xs:mb-0 flex items-center">
                        <BsCheckCircleFill className=" lg:mr-4 xs:mr-2 text-lime-600 bg-white rounded-full" />
                        Fraction-Friendly
                      </p>
                      <p className=" text-gray-600 text-left averageScreen:text-sm xs:text-xs lg:pl-10 sm:pl-5 xs:pl-5 font-poppins font-[600]">
                        Submit answers in fractions, decimals are optional.
                      </p>
                    </div>
                  </div>
                  <div className="relative averageScreen:py-1  px-2 border-b-[2px] border-black/50 hdScreen:pb-4 lg:pb-2">
                    {planType == 'DOWNGRADE-1' || planType == 'DOWNGRADE-2' ? (
                      <>
                        <h1 className="font-lato font-extrabold xs:py-1 hdScreen:mb-1 lg:text-2xl  sm:text-xl xs:text-lg">
                          Warning:
                        </h1>
                        <p className=" hdScreen:text-xl semihdScreen:text-lg averageScreen:text-base  xs:text-xs font-roboto font-[600] averageScreen:mb-0.5 xs:mb-0 flex items-center">
                          <BsFillExclamationTriangleFill className=" lg:mr-4 xs:mr-2 text-orange-500 bg-white " />
                          Action Irreversible
                        </p>
                        <p className=" text-gray-600 text-left averageScreen:text-sm xs:text-xs lg:pl-10 sm:pl-5 xs:pl-5 font-poppins font-[600] semihdScreen:mb-3 sm:mb-1">
                          You must upgrade to new plan again, after downgrade.
                        </p>
                        <p className=" hdScreen:text-xl semihdScreen:text-lg averageScreen:text-base  xs:text-xs font-roboto font-[600] averageScreen:mb-0.5 xs:mb-0 flex items-center">
                          <BsFillExclamationTriangleFill className=" lg:mr-4 xs:mr-2 text-orange-500 bg-white " />
                          Voluntary
                        </p>
                        <p className=" text-gray-600 text-left averageScreen:text-sm xs:text-xs lg:pl-10 sm:pl-5 xs:pl-5 font-poppins font-[600]">
                          The Admin is not responsible for your actions.
                        </p>
                      </>
                    ) : planType == 'SUBSCRIBE-STUDENT-1' ||
                      currentPlan == 'STUDENT-PLAN-1' ? (
                      <>
                        <h1 className="font-lato font-extrabold xs:py-1 hdScreen:mb-1 lg:text-2xl  sm:text-xl xs:text-lg">
                          {planType == 'SUBSCRIBE-STUDENT-1' ? (
                            <>Also includes:</>
                          ) : (
                            <>Extend the usage of:</>
                          )}
                        </h1>
                        <p className=" hdScreen:text-xl semihdScreen:text-lg averageScreen:text-base  xs:text-xs font-roboto font-[600] averageScreen:mb-0.5 xs:mb-0 flex items-center">
                          <BsCheckCircleFill className=" lg:mr-4 xs:mr-2 text-lime-600 bg-white " />
                          {planType == 'SUBSCRIBE-STUDENT-1' ? (
                            <>Value & Variables</>
                          ) : (
                            <>All Levels</>
                          )}
                        </p>
                        <p className=" text-gray-600 text-left averageScreen:text-sm xs:text-xs lg:pl-10 sm:pl-5 xs:pl-5 font-poppins font-[600] semihdScreen:mb-3 sm:mb-1">
                          {planType == 'SUBSCRIBE-STUDENT-1' ? (
                            <>Small to big numbers and different variables.</>
                          ) : (
                            <>Availability of easy, average, and difficult.</>
                          )}
                        </p>
                        <p className=" hdScreen:text-xl semihdScreen:text-lg averageScreen:text-base  xs:text-xs font-roboto font-[600] averageScreen:mb-0.5 xs:mb-0 flex items-center">
                          <BsCheckCircleFill className=" lg:mr-4 xs:mr-2 text-lime-600 bg-white " />
                          {planType == 'SUBSCRIBE-STUDENT-1' ? (
                            <>Expressions</>
                          ) : (
                            <>Complex Equations</>
                          )}
                        </p>
                        <p className=" text-gray-600 text-left averageScreen:text-sm xs:text-xs lg:pl-10 sm:pl-5 xs:pl-5 font-poppins font-[600] semihdScreen:mb-3 sm:mb-1">
                          {planType == 'SUBSCRIBE-STUDENT-1' ? (
                            <>The agent will now have responsive expressions.</>
                          ) : (
                            <>Numbers, variables, and accepts fractions.</>
                          )}
                        </p>
                        <p className=" hdScreen:text-xl semihdScreen:text-lg averageScreen:text-base  xs:text-xs font-roboto font-[600] averageScreen:mb-0.5 xs:mb-0 flex items-center">
                          <BsCheckCircleFill className=" lg:mr-4 xs:mr-2 text-lime-600 bg-white " />
                          {planType == 'SUBSCRIBE-STUDENT-1' ? (
                            <>Fractions</>
                          ) : (
                            <>Expressions</>
                          )}
                        </p>
                        <p className=" text-gray-600 text-left averageScreen:text-sm xs:text-xs lg:pl-10 sm:pl-5 xs:pl-5 font-poppins font-[600]">
                          {planType == 'SUBSCRIBE-STUDENT-1' ? (
                            <>Accepts your final answer as fractions.</>
                          ) : (
                            <>Agent responsive expressions.</>
                          )}
                        </p>
                      </>
                    ) : (
                      <>
                        <h1 className="font-lato font-extrabold xs:py-1 hdScreen:mb-1 lg:text-2xl  sm:text-xl xs:text-lg">
                          Proof of Payment:
                        </h1>
                        <div>
                          <p className="text-gray-500 hdScreen:text-xl semihdScreen:text-lg averageScreen:text-base  xs:text-xs font-roboto font-[600] averageScreen:mb-0.5 xs:mb-0 flex items-center">
                            Please upload screenshot of your payment.
                          </p>
                        </div>
                        <div
                          className={`${
                            planType == 'SUBSCRIBE-STUDENT-1' ? 'hidden' : ''
                          }`}
                        >
                          <FileUploadPayment />
                        </div>
                      </>
                    )}
                  </div>

                  {planType == 'SUBSCRIBE-STUDENT-1' ||
                  currentPlan == 'STUDENT-PLAN-1' ? (
                    <>
                      <div className="relative averageScreen:py-1  px-2 border-black/50 hdScreen:pb-4 lg:pb-2">
                        <h1 className="font-lato font-extrabold xs:py-1 lg:text-2xl  sm:text-xl xs:text-lg">
                          Proof of Payment:
                        </h1>
                        <div>
                          <p className="font-normal text-gray-600 hdScreen:text-base semihdScreen:text-md averageScreen:text-sm  xs:text-xs font-roboto averageScreen:mb-0.5 xs:mb-0">
                            Please save the screenshot of your payment, <br />
                            and email it to{' '}
                            <span className="text-blue-600 underline font-semibold">
                              pedagogical.agent.sfe@gmail.com
                            </span>
                          </p>
                        </div>
                        <div
                          className={`${
                            planType == 'SUBSCRIBE-STUDENT-1' ||
                            currentPlan == 'STUDENT-PLAN-1'
                              ? 'hidden'
                              : ''
                          }`}
                        >
                          <FileUploadPayment />
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}

                  <div
                    className={`lg:mt-4 xs:mt-3  w-full flex flex-col   font-bold lg:text-xl
                  ${
                    planType == 'SUBSCRIBE-STUDENT-1' ||
                    currentPlan == 'STUDENT-PLAN-1'
                      ? 'hidden'
                      : 'gap-y-4'
                  }`}
                  >
                    <form
                      action=""
                      className={`overflow-hidden `}
                      autoComplete="off"
                      onSubmit={
                        uploadedState ||
                        planType == 'DOWNGRADE-1' ||
                        planType == 'DOWNGRADE-2'
                          ? handleSubmit
                          : null
                      }
                    >
                      <button
                        name=""
                        type={
                          uploadedState ||
                          planType == 'DOWNGRADE-1' ||
                          planType == 'DOWNGRADE-2'
                            ? 'submit'
                            : 'button'
                        }
                        onClick={
                          uploadedState ||
                          planType == 'DOWNGRADE-1' ||
                          planType == 'DOWNGRADE-2'
                            ? onSubmit
                            : null
                        }
                        title={
                          !uploadedState &&
                          planType != 'DOWNGRADE-1' &&
                          planType != 'DOWNGRADE-2'
                            ? 'No screenshot uploaded.'
                            : ''
                        }
                        className={`lg:min-h-[3.5rem] sm:min-h-[2rem] xs:min-h-[2rem] grow w-full hdScreen:text-2xl semihdScreen:text-xl lg:text-lg sm:text-sm xs:text-xs tracking-wide    transition duration-200
                       
                        ${
                          uploadedState
                            ? 'bg-lime-600 hover:bg-lime-700 text-white hover:text-gray-100 '
                            : planType == 'DOWNGRADE-1' ||
                              planType == 'DOWNGRADE-2'
                            ? 'bg-red-500 hover:bg-red-600 text-white hover:text-gray-100'
                            : 'border-2 border-gray-300 text-gray-300 cursor-default'
                        }`}
                        {...(!uploadedState
                          ? planType == 'DOWNGRADE-1' ||
                            planType == 'DOWNGRADE-2'
                            ? { disabled: false }
                            : {
                                disabled: true,
                              }
                          : { disabled: false })}
                      >
                        {planType == 'DOWNGRADE-1' || planType == 'DOWNGRADE-2'
                          ? 'Proceed'
                          : 'Confirm Payment'}
                      </button>
                    </form>
                    <button
                      onClick={closeButton}
                      className="lg:min-h-[3.5rem] sm:min-h-[2rem] xs:min-h-[2rem] grow w-full hdScreen:text-2xl semihdScreen:text-xl lg:text-lg sm:text-sm xs:text-xs tracking-wide  bg-gray-400 hover:bg-gray-500 text-white hover:text-gray-100  transition duration-200"
                    >
                      {planType == 'DOWNGRADE-1' || planType == 'DOWNGRADE-2'
                        ? 'Cancel'
                        : 'Cancel Transaction'}
                    </button>
                  </div>
                </div>
                <div
                  className={`flex-col items-center relative  border-l-[1px] border-black/50 pt-4 px-6 pb-2 text-center lg:text-3xl xs:text-2.5xl font-bold 
                ${
                  planType == 'DOWNGRADE-1' || planType == 'DOWNGRADE-2'
                    ? 'hidden'
                    : 'flex'
                }`}
                >
                  <img
                    src={require('../assets/payment/sample-gcash.jpg')}
                    className="hdScreen:w-[21rem] semihdScreen:w-[19rem] averageScreen:w-[19rem] md:w-[14rem] sm:w-[14rem] xs:w-[14rem]"
                  />
                </div>
              </div>
            </div>
            <div
              className={`w-full px-10 border-t-2 border-gray-300 py-3 
             `}
            >
              <div
                className={`w-full justify-between ${
                  planType == 'SUBSCRIBE-STUDENT-1' ||
                  currentPlan == 'STUDENT-PLAN-1'
                    ? 'flex'
                    : 'invisible'
                }`}
              >
                <button
                  onClick={onClose}
                  className={`relative px-8 py-1.5  rounded-lg font-semibold  transition duration-300 text-white bg-gray-400 hover:bg-gray-500 `}
                >
                  <span className="font-normal lg:text-lg md:text-base sm:text-sm xs:text-xs flex justify-center">
                    Cancel
                  </span>
                </button>
                <button
                  onClick={onContinue}
                  className="relative ml-6 py-1.5 px-8  mr-1.5  rounded-lg font-semibold  transition duration-300 text-white bg-lime-600 hover:bg-lime-700"
                >
                  <span className="font-normal  lg:text-lg md:text-base sm:text-sm xs:text-xs flex justify-center">
                    Finish
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LoadingSpinner visible={showLoading} />
    </>
  );
};

export default ManageSubscriptionConfirm;
