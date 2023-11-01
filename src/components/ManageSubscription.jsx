import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { VscInfo } from 'react-icons/vsc';
import {
  BsCheckCircle,
  BsCheckCircleFill,
  BsXCircleFill,
} from 'react-icons/bs';

const ManageSubscription = ({ visible, onClose }) => {
  const handleOnClose = e => {
    if (e.target.id === 'mainContainer') onClose();
    //window.location.reload(false);
  };

  if (!visible) return null;

  const [monthTally, setMonthTally] = useState('');
  const [dayTally, setDayTally] = useState('');
  const [hourTally, setHourTally] = useState('');
  const [minuteTally, setMinuteTally] = useState('');
  const [secondTally, setSecondTally] = useState('');

  //Format: Date(year, month, day, hour, minute)
  //Year is counter from 0 to 11
  let endDate = new Date(2024, 1, 1, 0, 0);
  //Output value in milliseconds
  let endTime = endDate.getTime();

  function countdown() {
    let todayDate = new Date();
    //Output value in milliseconds
    let todayTime = todayDate.getTime();

    let remainingTime = endTime - todayTime;

    //60sec => 1000 milliseconds
    let oneMin = 60 * 1000;
    //1hr => 60 minutes
    let oneHr = 60 * oneMin;
    //1 day => 24 hours
    let oneDay = 24 * oneHr;
    let oneMonth = 30 * oneDay;

    //Function to format number if it is single digit
    let addZeroes = num => (num < 10 ? `0${num}` : num);

    //If end dat is before today date
    if (endTime < todayTime) {
      clearInterval(i);
    }
    //If end date is not before today date
    else {
      //Calculating remaining days, hrs,mins ,secs
      let monthsLeft = Math.floor(remainingTime / oneMonth);
      let daysLeft = Math.floor((remainingTime % oneMonth) / oneDay);
      let hrsLeft = Math.floor((remainingTime % oneDay) / oneHr);
      let minsLeft = Math.floor((remainingTime % oneHr) / oneMin);
      let secsLeft = Math.floor((remainingTime % oneMin) / 1000);

      //Displaying Valurs
      setMonthTally(monthsLeft);
      setDayTally(daysLeft);
      setHourTally(hrsLeft);
      setMinuteTally(minsLeft);
      setSecondTally(secsLeft);
    }
  }

  useEffect(() => {
    let i = setInterval(countdown, 1000);
    countdown();
  }, []);

  const upgradePlan = e => {
    let plan = e.target.name;
    if (plan == 'plan2') {
      document.getElementById('p2-false').style.display = 'none';
      document.getElementById('p2-true').style.display = 'block';
    } else if (plan == 'plan3') {
      document.getElementById('p2-false').style.display = 'none';
      document.getElementById('p3-false').style.display = 'none';

      document.getElementById('p2-true').style.display = 'block';
      document.getElementById('p3-true').style.display = 'block';
    }
    /*
     setShowLoading(true);
    let requestID = e.target.name;
    //console.log(requestID);
    axios
      .post(
        `http://localhost:80/Prototype-Vite/my-project/api/requestSolved/${requestID}`
      )
      .then(function (response) {
        //console.log(response.data);
        updateTable();
        setShowLoading(false);
      })
      .catch(function (error) {
        setShowLoading(false);
      });
      */
  };

  const resetHover = e => {
    let plan = e.target.name;
    if (plan == 'plan2') {
      document.getElementById('p2-false').style.display = 'block';
      document.getElementById('p2-true').style.display = 'none';
    } else if (plan == 'plan3') {
      document.getElementById('p2-false').style.display = 'block';
      document.getElementById('p3-false').style.display = 'block';

      document.getElementById('p2-true').style.display = 'none';
      document.getElementById('p3-true').style.display = 'none';
    }
    /*
     setShowLoading(true);
    let requestID = e.target.name;
    //console.log(requestID);
    axios
      .post(
        `http://localhost:80/Prototype-Vite/my-project/api/requestSolved/${requestID}`
      )
      .then(function (response) {
        //console.log(response.data);
        updateTable();
        setShowLoading(false);
      })
      .catch(function (error) {
        setShowLoading(false);
      });
      */
  };

  return (
    <>
      <div
        id="mainContainer"
        onClick={handleOnClose}
        className="fixed top-0 inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-[1.5px] flex justify-center items-center "
      >
        <div className="bg-white  rounded text-lg  hdScreen:scale-100 semihdScreen:scale-95 laptopScreen:scale-90 averageScreen:scale-90 md:scale-85 sm:scale-80 xs:scale-75">
          <div className="grid grid-cols-2 bg-gray-300 ">
            <span className="lg:text-xl xs:text-lg ml-2 flex items-center text-black/60 font-semibold">
              {' '}
              My Subscription{' '}
            </span>
            <div className="text-right">
              <button
                onClick={() => {
                  onClose();
                }}
                className=" p-3 inline-block hover:bg-red-600 transition duration-200 hover:text-white"
              >
                <MdClose />
              </button>
            </div>
          </div>
          <div className="">
            <div className="p-4">
              <div className="grid grid-cols-2">
                <div className="flex flex-col px-4  gap-y-2  border-r-[1px] text-gray-700 border-black/50 ">
                  <div className="lg:py-2 xs:py-1 border-b-[2px] border-black/50 ">
                    <h1 className="font-bakbak lg:text-4xl sm:text-3xl xs:text-2xl border-black/50  leading-8">
                      Plan 1:{' '}
                      <span className="text-lime-700 font-sans  font-bold">
                        Equation Builder
                      </span>
                    </h1>
                    <div className="text-gray-700 lg:pb-2 xs:pb-1 lg:mt-2 sm:mt-0.5">
                      <h1 className="font-bakbak lg:text-4xl sm:text-3xl xs:text-2xl border-black/50  leading-8">
                        Price:{' '}
                        <span className="font-sans font-bold text-lime-600">
                          ₱50/month
                        </span>{' '}
                      </h1>
                    </div>
                  </div>
                  <div className="lg:py-2 xs:py-1 border-b-[2px] border-black/50 lg:pb-6 xs:pb-4">
                    <h1 className="font-bakbak  lg:text-4xl sm:text-3xl xs:text-2xl border-black/50 leading-8 text-gray-700 mb-4">
                      Time Left:{' '}
                    </h1>
                    <div className="shadow-md grid grid-cols-5 w-full text-center leading-[5rem] font-bold ">
                      <div className="border-2 lg:text-5xl md:text-4xl sm:text-3.5xl xs:text-3xl  ">
                        <div className="text-lime-700 shadow">{monthTally}</div>
                        <div className="border-t-2 text-base  text-ellipsis overflow-hidden py-1">
                          Month(s)
                        </div>
                      </div>
                      <div className="border-2 lg:text-5xl md:text-4xl sm:text-3.5xl xs:text-3xl">
                        <div className="text-lime-700/[95%] shadow">
                          {dayTally}
                        </div>
                        <div className="border-t-2 text-base text-ellipsis overflow-hidden py-1">
                          Day(s)
                        </div>
                      </div>
                      <div className="border-2 lg:text-5xl md:text-4xl sm:text-3.5xl xs:text-3xl ">
                        <div className="text-lime-700/90 shadow">
                          {hourTally}
                        </div>
                        <div className="border-t-2 text-base text-ellipsis overflow-hidden py-1">
                          Hour(s)
                        </div>
                      </div>
                      <div className="border-2 lg:text-5xl md:text-4xl sm:text-3.5xl xs:text-3xl  ">
                        <div className="text-lime-700/[85%] shadow">
                          {minuteTally}
                        </div>
                        <div className="border-t-2 text-base text-ellipsis overflow-hidden py-1">
                          Minute(s)
                        </div>
                      </div>
                      <div className="border-2 lg:text-5xl md:text-4xl sm:text-3.5xl xs:text-3xl ">
                        <div className="text-lime-700/[85%] shadow">
                          {secondTally}
                        </div>
                        <div className="border-t-2 text-base text-ellipsis overflow-hidden py-1">
                          Second(s)
                        </div>
                      </div>
                      {/**NEW ROW */}
                    </div>
                  </div>

                  <div className="grow w-full flex flex-col gap-y-2  font-bold lg:text-xl">
                    <button
                      name="plan2"
                      onMouseOver={upgradePlan}
                      onMouseLeave={resetHover}
                      className="grow w-full border-2 border-black/50 hover:bg-lime-600 hover:text-gray-100 hover:border-lime-600/90 transition duration-200"
                    >
                      Upgrade to Plan 2
                    </button>
                    <button
                      name="plan3"
                      onMouseOver={upgradePlan}
                      onMouseLeave={resetHover}
                      className="grow w-full border-2 border-black/50 hover:bg-lime-600 hover:text-gray-100 hover:border-lime-600/90 transition duration-200"
                    >
                      Upgrade to Plan 3
                    </button>
                    <button className="grow w-full text-white bg-blue-600/90 hover:bg-blue-600 hover:text-gray-100 transition duration-200">
                      Extend Time
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-y-2 pl-4 border-l-[1px] text-gray-700 border-black/50">
                  <div className="relative averageScreen:py-1  px-2 ">
                    <div className="text-left ">
                      <p className=" hdScreen:text-xl semihdScreen:text-lg averageScreen:text-base  xs:text-xs font-roboto font-[600] averageScreen:mb-0.5 xs:mb-0 flex items-center">
                        <BsCheckCircleFill className="lg:mr-4 xs:mr-2 text-lime-600" />
                        Custom Equation Settings
                      </p>
                      <p className=" text-gray-600 text-left averageScreen:text-sm xs:text-xs lg:pl-10 sm:pl-5 xs:pl-5 font-poppins font-[600] sm:mb-3">
                        Manage custom equation recurrence to fine-tune the
                        learning.
                      </p>

                      <p className=" hdScreen:text-xl semihdScreen:text-lg averageScreen:text-base  xs:text-xs font-roboto font-[600] averageScreen:mb-0.5 xs:mb-0 flex items-center">
                        <BsCheckCircleFill className="lg:mr-4 xs:mr-2 text-lime-600" />
                        Prioritize Custom Equations
                      </p>
                      <p className=" text-gray-600 text-left averageScreen:text-sm xs:text-xs lg:pl-10 sm:pl-5 xs:pl-5 font-poppins font-[600] sm:mb-3">
                        Prioritize custom equations for students' focus.
                      </p>
                      <p className=" hdScreen:text-xl semihdScreen:text-lg averageScreen:text-base  xs:text-xs font-roboto font-[600] averageScreen:mb-0.5 xs:mb-0 flex items-center">
                        <BsCheckCircleFill className="lg:mr-4 xs:mr-2 text-lime-600" />
                        Fraction-Friendly
                      </p>
                      <p className=" text-gray-600 text-left averageScreen:text-sm xs:text-xs lg:pl-10 sm:pl-5 xs:pl-5 font-poppins font-[600]">
                        Submit answers in fractions, decimals are optional.
                      </p>
                    </div>
                  </div>
                  <div className="relative averageScreen:py-1  px-2 ">
                    {/**
                    <div className="cursor-help select-none absolute left-0 top-0 opacity-100 hover:opacity-0 w-full h-full bg-black/20 backdrop-blur-[2px]  flex justify-center items-center text-center transition duration-150">
                      <span className="hidden text-3xl text-white font-bold  drop-shadow-[0_2px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_2px_0px_rgba(0,0,0,0.6)] ">
                        Plan 2: Locked
                      </span>
                    </div>
                  */}
                    <div className="text-left">
                      <div id="p2-true" className="hidden">
                        <p className=" hdScreen:text-xl semihdScreen:text-lg averageScreen:text-base  xs:text-xs font-roboto font-[600] averageScreen:mb-0.5 xs:mb-0 flex items-center">
                          <BsCheckCircleFill className=" lg:mr-4 xs:mr-2 text-lime-600 bg-white rounded-full" />
                          Custom Equation Settings
                        </p>
                        <p className=" text-gray-600 text-left averageScreen:text-sm xs:text-xs lg:pl-10 sm:pl-5 xs:pl-5 font-poppins font-[600] sm:mb-3">
                          Manage custom equation recurrence to fine-tune the
                          learning.
                        </p>

                        <p className=" hdScreen:text-xl semihdScreen:text-lg averageScreen:text-base  xs:text-xs font-roboto font-[600] averageScreen:mb-0.5 xs:mb-0 flex items-center">
                          <BsCheckCircleFill className=" lg:mr-4 xs:mr-2 text-lime-600 bg-white rounded-full" />
                          Prioritize Custom Equations
                        </p>
                        <p className=" text-gray-600 text-left averageScreen:text-sm xs:text-xs lg:pl-10 sm:pl-5 xs:pl-5 font-poppins font-[600] sm:mb-3">
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

                      <div id="p2-false">
                        <p className=" hdScreen:text-xl semihdScreen:text-lg averageScreen:text-base  xs:text-xs font-roboto font-[600] averageScreen:mb-0.5 xs:mb-0 flex items-center">
                          <BsXCircleFill className=" lg:mr-4 xs:mr-2 text-red-600 bg-white rounded-full" />
                          Custom Equation Settings
                        </p>
                        <p className=" text-gray-600 text-left averageScreen:text-sm xs:text-xs lg:pl-10 sm:pl-5 xs:pl-5 font-poppins font-[600] sm:mb-3">
                          Manage custom equation recurrence to fine-tune the
                          learning.
                        </p>

                        <p className=" hdScreen:text-xl semihdScreen:text-lg averageScreen:text-base  xs:text-xs font-roboto font-[600] averageScreen:mb-0.5 xs:mb-0 flex items-center">
                          <BsXCircleFill className=" lg:mr-4 xs:mr-2 text-red-600 bg-white rounded-full" />
                          Prioritize Custom Equations
                        </p>
                        <p className=" text-gray-600 text-left averageScreen:text-sm xs:text-xs lg:pl-10 sm:pl-5 xs:pl-5 font-poppins font-[600] sm:mb-3">
                          Prioritize custom equations for students' focus.
                        </p>
                        <p className=" hdScreen:text-xl semihdScreen:text-lg averageScreen:text-base  xs:text-xs font-roboto font-[600] averageScreen:mb-0.5 xs:mb-0 flex items-center">
                          <BsXCircleFill className=" lg:mr-4 xs:mr-2 text-red-600 bg-white rounded-full" />
                          Fraction-Friendly
                        </p>
                        <p className=" text-gray-600 text-left averageScreen:text-sm xs:text-xs lg:pl-10 sm:pl-5 xs:pl-5 font-poppins font-[600]">
                          Submit answers in fractions, decimals are optional.
                        </p>
                      </div>
                    </div>
                  </div>{' '}
                  <div className="relative averageScreen:py-1  px-2 ">
                    {/** 
                    <div className="select-none absolute left-0 top-0 opacity-100 hover:opacity-0 w-full h-full bg-black/20 backdrop-blur-[2px]  flex justify-center items-center text-center transition duration-150">
                      <span className="hidden text-3xl text-white font-bold  drop-shadow-[0_2px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_2px_0px_rgba(0,0,0,0.6)] ">
                        Plan 3: Locked
                      </span>
                    </div>
                    */}
                    <div className="text-left">
                      <div id="p3-true" className="hidden">
                        <p className=" hdScreen:text-xl semihdScreen:text-lg averageScreen:text-base  xs:text-xs font-roboto font-[600] averageScreen:mb-0.5 xs:mb-0 flex items-center">
                          <BsCheckCircleFill className="lg:mr-4 xs:mr-2 text-lime-600 bg-white rounded-full" />
                          Auto-Equation Settings
                        </p>
                        <p className=" text-gray-600 text-left averageScreen:text-sm xs:text-xs lg:pl-10 sm:pl-5 xs:pl-5 font-poppins font-[600] sm:mb-3">
                          Challenge with auto-gen equations, Manage it
                          accordingly.
                        </p>

                        <p className=" hdScreen:text-xl semihdScreen:text-lg averageScreen:text-base  xs:text-xs font-roboto font-[600] averageScreen:mb-0.5 xs:mb-0 flex items-center">
                          <BsCheckCircleFill className="lg:mr-4 xs:mr-2 text-lime-600 bg-white rounded-full" />
                          Range Controller
                        </p>
                        <p className=" text-gray-600 text-left averageScreen:text-sm xs:text-xs lg:pl-10 sm:pl-5 xs:pl-5 font-poppins font-[600] sm:mb-3">
                          The generated values can span from 1 to 999, or even
                          extend beyond.
                        </p>
                        <p className=" hdScreen:text-xl semihdScreen:text-lg averageScreen:text-base  xs:text-xs font-roboto font-[600] averageScreen:mb-0.5 xs:mb-0 flex items-center">
                          <BsCheckCircleFill className="lg:mr-4 xs:mr-2 text-lime-600 bg-white rounded-full" />
                          Variable Variety
                        </p>
                        <p className=" text-gray-600 text-left averageScreen:text-sm xs:text-xs lg:pl-10 sm:pl-5 xs:pl-5 font-poppins font-[600]">
                          Use different lowercase letter variables for diverse
                          equations.
                        </p>
                      </div>

                      <div id="p3-false" className="hidden">
                        <p className=" hdScreen:text-xl semihdScreen:text-lg averageScreen:text-base  xs:text-xs font-roboto font-[600] averageScreen:mb-0.5 xs:mb-0 flex items-center">
                          <BsXCircleFill className="lg:mr-4 xs:mr-2 text-red-600 bg-white rounded-full" />
                          Auto-Equation Settings
                        </p>
                        <p className=" text-gray-600 text-left averageScreen:text-sm xs:text-xs lg:pl-10 sm:pl-5 xs:pl-5 font-poppins font-[600] sm:mb-3">
                          Challenge with auto-gen equations, Manage it
                          accordingly.
                        </p>

                        <p className=" hdScreen:text-xl semihdScreen:text-lg averageScreen:text-base  xs:text-xs font-roboto font-[600] averageScreen:mb-0.5 xs:mb-0 flex items-center">
                          <BsXCircleFill className="lg:mr-4 xs:mr-2 text-red-600 bg-white rounded-full" />
                          Range Controller
                        </p>
                        <p className=" text-gray-600 text-left averageScreen:text-sm xs:text-xs lg:pl-10 sm:pl-5 xs:pl-5 font-poppins font-[600] sm:mb-3">
                          The generated values can span from 1 to 999, or even
                          extend beyond.
                        </p>
                        <p className=" hdScreen:text-xl semihdScreen:text-lg averageScreen:text-base  xs:text-xs font-roboto font-[600] averageScreen:mb-0.5 xs:mb-0 flex items-center">
                          <BsXCircleFill className="lg:mr-4 xs:mr-2 text-red-600 bg-white rounded-full" />
                          Variable Variety
                        </p>
                        <p className=" text-gray-600 text-left averageScreen:text-sm xs:text-xs lg:pl-10 sm:pl-5 xs:pl-5 font-poppins font-[600]">
                          Use different lowercase letter variables for diverse
                          equations.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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

export default ManageSubscription;
