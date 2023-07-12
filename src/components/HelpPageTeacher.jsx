import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

import EditSectionModal from './EditSectionModal';

import EquationSolver from './equationSolver';

import { BsTrash3 } from 'react-icons/bs';
import { HiPencilSquare } from 'react-icons/hi2';

export default function HelpPageTeacher() {
  const navigate = useNavigate();

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

  const [category, setCategory] = useState('');

  const reportCard = () => {
    setCategory('ReportCard');
  };

  const equationList = () => {
    setCategory('EquationList');
  };

  const createEquation = () => {
    setCategory('CreateEquation');
  };

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
        <section className="relative mx-auto p-8 w-full">
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
            Help
          </div>

          <div className="mt-1.5 ">
            <div className="lg:text-lg xs:text-xs tracking-wide">
              Welcome to the help page. Listed below are the various tabs and
              instructions on how to effectively utilize them. Please choose a
              category to get started.{' '}
            </div>
          </div>
          <div className="mt-3">
            <div className="lg:text-lg xs:text-xs flex ">
              <button
                onClick={reportCard}
                className={`  lg:px-2 xs:px-1 py-1 rounded-lg lg:w-[12rem] hover:bg-gray-400 transition duration-200 ${
                  category == 'ReportCard'
                    ? 'bg-gray-500 text-white font-semibold'
                    : 'bg-gray-300 hover:bg-gray-400 text-gray-600 hover:text-gray-900'
                }`}
              >
                Report Cards
              </button>
              <button
                onClick={equationList}
                className={`ml-6 lg:px-2 xs:px-1 py-1 rounded-lg lg:w-[12rem] hover:bg-gray-400 transition duration-200 ${
                  category == 'EquationList'
                    ? 'bg-gray-500 text-white font-semibold'
                    : 'bg-gray-300 hover:bg-gray-400 text-gray-600 hover:text-gray-900'
                }`}
              >
                Equation List
              </button>

              <button
                onClick={createEquation}
                className={`ml-6 lg:px-2 xs:px-1 py-1 rounded-lg lg:w-[12rem] hover:bg-gray-400 transition duration-200 ${
                  category == 'CreateEquation'
                    ? 'bg-gray-500 text-white font-semibold'
                    : 'bg-gray-300 hover:bg-gray-400 text-gray-600 hover:text-gray-900'
                }`}
              >
                Create Equation
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
