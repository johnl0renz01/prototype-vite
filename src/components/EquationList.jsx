import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

import { VscEye } from 'react-icons/vsc';

export default function EquationList() {
  const navigate = useNavigate();

  const [equationList, setEquationList] = useState([]);

  function getEquations() {
    axios
      .get(`http://localhost:80/Prototype-Vite/my-project/api/getEquationList/`)
      .then(function (response) {
        setEquationList(response.data);
      });
  }

  useEffect(() => {
    getEquations();
  }, []);

  const removeEquation = e => {
    let equationString = e.target.id;
    equationString = equationString.replace(/ /g, '_');
    axios
      .post(
        `http://localhost:80/Prototype-Vite/my-project/api/removeEquation/${equationString}`
      )
      .then(function (response) {
        window.location.reload(false);
      });
  };

  const [navbarWidth, setNavbarWidth] = useState(0);
  const [logoHeight, setLogoHeight] = useState(0);

  useEffect(() => {
    document.body.style.backgroundImage =
      'linear-gradient(to top, #e2e2e2, #f1f1f1 , #ffffff)';

    window.addEventListener('resize', setWidth);
    window.addEventListener('focus', setWidth);
    window.addEventListener('click', setWidthDelay);
    setWidth();
  });

  function setWidthDelay() {
    setTimeout(function () {
      var width = window.localStorage.getItem('NAVBAR_TEACHER_WIDTH');
      setNavbarWidth(width);

      // Logo height
      var height = window.localStorage.getItem('NAVBAR_TEACHER_LOGO');
      setLogoHeight(height);
    }, 1);
  }

  function setWidth() {
    var width = window.localStorage.getItem('NAVBAR_TEACHER_WIDTH');
    setNavbarWidth(width);

    // Logo height
    var height = window.localStorage.getItem('NAVBAR_TEACHER_LOGO');
    setLogoHeight(height);
  }

  return (
    <>
      <div
        className={`bg-gradient-to-t from-[#e2e2e2] via-[#f1f1f1] to-[#ffffff] h-screen 
        ${
          navbarWidth == 143
            ? 'w-[calc(100%-143px)] ml-[143px]'
            : navbarWidth == 95
            ? 'w-[calc(100%-95px)] ml-[95px]'
            : navbarWidth == 73
            ? 'w-[calc(100%-73px)] ml-[73px]'
            : navbarWidth == 39
            ? 'w-[calc(100%-39px)] ml-[39px]'
            : ''
        }`}
      >
        <section id="container" className="relative mx-auto p-8 w-full">
          <div
            className={`md:-mt-0 xs:-mt-1 border-b-2 text-gray-600 lg:text-4xl font-bold
        ${
          logoHeight == 94.5
            ? 'max-h-[94.5px]'
            : logoHeight == 67.5
            ? 'max-h-[67.5px]'
            : ''
        }`}
          >
            Equation List
          </div>
          <div className="mt-1.5 lg:text-lg sm:text-base xs:text-xs font-semibold tracking-wide pl-2 ">
            The following are current custom equations created. Drag the
            equation to change its difficulty.
          </div>

          <div className="hdScreen:min-h-[calc(100vh-30vh)] hdScreen:max-h-[calc(100vh-30vh)] 
                          semihdScreen:min-h-[calc(100vh-30vh)] semihdScreen:max-h-[calc(100vh-30vh)]
                          laptopScreen:min-h-[calc(100vh-40vh)] laptopScreen:max-h-[calc(100vh-40vh)]
                          averageScreen:min-h-[calc(100vh-45vh)] averageScreen:max-h-[calc(100vh-45vh)]
                          bg-white mt-3.5 grid grid-cols-3 text-center lg:text-xl xs:text-base w-full border-t-1  border-gray-400 rounded-xl">
            <div className="">
              <div className="py-1 border-gray-400 border-2 border-r-[3.5px] font-semibold rounded-tl-xl shadow-md">
                Easy
              </div>
              <div className="bg-white pt-0.5 lg:text-lg xs:text-sm h-full style-3 overflow-y-scroll  border-3 border-t-0 border-r-0 border-gray-400 shadow-md">
                {equationList.map((equation, index) => (
                  <>
                    {equation.EquationType == 'Easy' ? (
                      <div className="border-b-2 flex justify-center relative hover:bg-gray-200">
                        <p className="mx-4">{equation.EquationString}</p>
                        <input
                          type="submit"
                          id={equation.EquationString}
                          onClick={removeEquation}
                          className="cursor-pointer absolute right-0 text-black/60  hover:text-red-500 rounded-full w-6 h-6"
                          title="Remove Equation"
                          value="x"
                        ></input>
                      </div>
                    ) : (
                      ''
                    )}
                  </>
                ))}
              </div>
            </div>
            <div className="">
              <div className="py-1 border-gray-400 border-2 border-l-[3.5px] border-r-[3.5px]  font-semibold -ml-1.5 shadow-md">
                Average
              </div>
              <div className="bg-white pt-0.5 h-full lg:text-lg xs:text-sm style-3 overflow-y-scroll   border-3 border-t-0 border-l-0 border-r-0 border-gray-400 shadow-md">
                {equationList.map(equation => (
                  <>
                    {equation.EquationType == 'Average' ? (
                      <div className="border-b-2 flex justify-center relative hover:bg-gray-200">
                        <p className="mx-4">{equation.EquationString}</p>
                        <input
                          type="submit"
                          id={equation.EquationString}
                          onClick={removeEquation}
                          className="cursor-pointer absolute right-0 text-black/60  hover:text-red-500 rounded-full w-6 h-6"
                          title="Remove Equation"
                          value="x"
                        ></input>
                      </div>
                    ) : (
                      ''
                    )}
                  </>
                ))}
              </div>
            </div>
            <div className="">
              <div className="py-1 border-gray-400 border-2 border-l-[3.5px] font-semibold -ml-1.5 rounded-tr-xl shadow-md">
                Difficult
              </div>
              <div className="bg-white pt-0.5 h-full lg:text-lg xs:text-sm style-3 overflow-y-scroll border-3 border-t-0 border-l-0 border-gray-400 shadow-md">
                {equationList.map(equation => (
                  <>
                    {equation.EquationType == 'Difficult' ? (
                      <div className="border-b-2 flex justify-center relative hover:bg-gray-200">
                        <p className="mx-4">{equation.EquationString}</p>
                        <input
                          type="submit"
                          id={equation.EquationString}
                          onClick={removeEquation}
                          className="cursor-pointer absolute right-0 text-black/60  hover:text-red-500 rounded-full w-6 h-6"
                          title="Remove Equation"
                          value="x"
                        ></input>
                      </div>
                    ) : (
                      ''
                    )}
                  </>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
