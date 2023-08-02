import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

import EquationSolver from './equationSolver';

import { useFormik } from 'formik';
import { editAccountSchema } from '../schemas';
import { editSectionSchema } from '../schemas';
import { addSectionSchema } from '../schemas';

import { MdClose } from 'react-icons/md';
import { VscCheckAll, VscPassFilled } from 'react-icons/vsc';

import { BsSlashCircle } from 'react-icons/bs';

import { BsArrowCounterclockwise } from 'react-icons/bs';

import { GoChecklist } from 'react-icons/go';
import { HiPlusSmall } from 'react-icons/hi2';

export default function CreateSection() {
  const navigate = useNavigate();

  const [sectionDetails, setSectionDetails] = useState([]);
  const [imageUrlEdit, setImageUrlEdit] = useState('no-image-cover');
  const [imageTypeEdit, setImageTypeEdit] = useState('png');

  const onSubmit = (values, actions) => {
    console.log('SUBMITTED');
    axios
      .post(
        'http://localhost:80/Prototype-Vite/my-project/api/addSection/save',
        values
      )
      .then(function (response) {
        console.log(response.data);
      });
    //await new Promise((resolve) => setTimeout(resolve, 1));
  };

  const {
    values,
    handleBlur,
    isSubmitting,
    handleChange,
    handleSubmit,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      gradeLevel: '7',
      sectionName: '',
      adviserName: '',
      adviserSurname: '',
      title: 'Mr',
    },
    validationSchema: addSectionSchema,
    onSubmit,
  });

  const gradeLevelChange = event => {
    var value = event.target.value;
    console.log('value: ' + value);
    value = value.replace(/[A-za-z]/g, '');
    value = value.replace(/ /g, '');
    console.log('value: ' + value);
    values.gradeLevel = value;
    setGradeLevel(value);
  };

  const [navbarWidth, setNavbarWidth] = useState(0);
  const [logoHeight, setLogoHeight] = useState(0);

  useEffect(() => {
    document.body.style.backgroundImage =
      'linear-gradient(to top, #e2e2e2, #f1f1f1 , #ffffff)';

    window.addEventListener('resize', setWidth);
    setWidth();
  }, []);

  function setWidth() {
    var width = window.sessionStorage.getItem('NAVBAR_TEACHER_WIDTH');
    setNavbarWidth(width);

    // Logo height
    var height = window.sessionStorage.getItem('NAVBAR_TEACHER_LOGO');
    setLogoHeight(height);
  }

  return (
    <>
      <div
        className={`bg-gradient-to-t from-[#e2e2e2] via-[#f1f1f1] to-[#ffffff] h-screen   
      ${
        navbarWidth == 176
          ? 'w-[calc(100%-176px)] ml-[176px]'
          : navbarWidth == 168
          ? 'w-[calc(100%-168px)] ml-[168px]'
          : navbarWidth == 108
          ? 'w-[calc(100%-108px)] ml-[108px]'
          : navbarWidth == 95
          ? 'w-[calc(100%-95px)] ml-[95px]'
          : 'w-[calc(100%-176px)] ml-[176px]'
      }`}
      >
        <section className="relative mx-auto p-8 w-full">
          <div
            className={`md:-mt-0 xs:-mt-1 border-b-2 text-gray-600 lg:text-4xl font-bold
          ${
            logoHeight == 78.5
              ? 'max-h-[78.5px]'
              : logoHeight == 40.5
              ? 'max-h-[40.5px]'
              : 'max-h-[78.5px]'
          }`}
          >
            Create Section
          </div>
          <div className="p-12">
            <div className="grid grid-cols-2">
              <div className=" text-xl py-16 relative">
                <form
                  action=""
                  className="overflow-hidden"
                  autocomplete="off"
                  onSubmit={onSubmit}
                >
                  <div className="inline-flex w-full">
                    <label
                      htmlFor="gradeLevel"
                      className="inline-block pt-2 w-[10rem] text-right"
                    >
                      Grade Level:{' '}
                    </label>

                    <select
                      onChange={gradeLevelChange}
                      name="gradeLevel"
                      id="gradeLevel"
                      className="p-1  px-2 mt-1 ml-3 text-lg border-2 w-32  focus:border-none rounded-md border-gray-500 focus:outline-teal-500 focus:ring-teal-500 shadow-sm shadow-[#808080]"
                    >
                      <option className="">Grade 7</option>
                    </select>
                  </div>

                  <div className="inline-flex w-full mt-8">
                    <label
                      htmlFor="sectionName"
                      className="inline-block pt-2 w-[10rem] text-right"
                    >
                      Section Name:{' '}
                    </label>
                    <input
                      name="sectionName"
                      type="text"
                      placeholder="Enter Section Name"
                      className={`grow p-1  px-2 mt-1 ml-3 border-2 text-lg rounded-md border-gray-500 focus:outline-teal-500 focus:ring-teal-500 focus:border-none shadow-sm shadow-[#808080] ${
                        errors.sectionName && touched.sectionName
                          ? ' shadow-red-500 border-red-500 focus:border-red-500 border-3 border-solid'
                          : ''
                      }`}
                      value={values.sectionName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  {errors.sectionName && touched.sectionName && (
                    <p className=" text-base text-red-500  absolute ml-[11rem] ">
                      {errors.sectionName}
                    </p>
                  )}

                  <div className="inline-flex w-full mt-8">
                    <label
                      htmlFor="adviserName"
                      className="inline-block pt-2 w-[10rem] text-right"
                    >
                      Adviser Name:{' '}
                    </label>
                    <input
                      name="adviserName"
                      type="text"
                      placeholder="Enter Given Name"
                      className={`grow p-1  px-2 mt-1 ml-3 border-2 text-lg rounded-md border-gray-500 focus:outline-teal-500 focus:ring-teal-500 focus:border-none shadow-sm shadow-[#808080] ${
                        errors.adviserName && touched.adviserName
                          ? ' shadow-red-500 border-red-500 focus:border-red-500 border-3 border-solid'
                          : ''
                      }`}
                      value={values.adviserName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  {errors.adviserName && touched.adviserName && (
                    <p className=" text-base text-red-500  absolute ml-[11rem] ">
                      {errors.adviserName}
                    </p>
                  )}

                  <div className="inline-flex w-full mt-8">
                    <label
                      htmlFor="adviserSurname"
                      className="inline-block pt-2 w-[10rem] text-right"
                    >
                      Adviser Surname:{' '}
                    </label>
                    <input
                      name="adviserSurname"
                      type="text"
                      placeholder="Enter Last Name"
                      className={`grow p-1  px-2 mt-1 ml-3 border-2 text-lg rounded-md border-gray-500 focus:outline-teal-500 focus:ring-teal-500 focus:border-none shadow-sm shadow-[#808080] ${
                        errors.adviserSurname && touched.adviserSurname
                          ? ' shadow-red-500 border-red-500 focus:border-red-500 border-3 border-solid'
                          : ''
                      }`}
                      value={values.adviserSurname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  {errors.adviserSurname && touched.adviserSurname && (
                    <p className=" text-base text-red-500  absolute ml-[11rem] ">
                      {errors.adviserSurname}
                    </p>
                  )}

                  <div className="inline-flex w-full mt-6">
                    <label
                      htmlFor="title"
                      className="inline-block pt-2 w-[10rem] text-right"
                    >
                      Adviser's Title:{' '}
                    </label>
                    <div className="ml-3 mt-2.5">
                      <input
                        name="title"
                        type="radio"
                        className=""
                        value="Mr"
                        checked={values.title === 'Mr'}
                        onChange={handleChange}
                      />{' '}
                      Mr
                      <input
                        name="title"
                        type="radio"
                        className="ml-4"
                        value="Mrs"
                        checked={values.title === 'Mrs'}
                        onChange={handleChange}
                      />{' '}
                      Mrs
                      <input
                        name="title"
                        type="radio"
                        className="ml-4"
                        value="Ms"
                        checked={values.title === 'Ms'}
                        onChange={handleChange}
                      />{' '}
                      Ms
                    </div>
                  </div>
                  {touched.title ||
                    (errors.title && (
                      <p className="text-base text-red-500 absolute ml-[11rem]">
                        {errors.title}
                      </p>
                    ))}
                  <div className="flex justify-end  text-center absolute right-0 -bottom-7">
                    <button
                      className={`relative pb-2 px-4 py-2 shadow-md rounded-full font-semibold  transition duration-300 text-white bg-red-600 hover:bg-red-700 drop-shadow-[0_3px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_3px_0px_rgba(0,0,0,0.6)]`}
                    >
                      <span className="font-normal pl-1 text-xl flex justify-center">
                        Reset
                        <BsArrowCounterclockwise className="ml-2 mt-1.5 lg:text-xl -rotate-45" />
                      </span>
                    </button>

                    <button
                      type="submit"
                      className="relative ml-6 py-1.5 pb-2 px-4 mr-4 shadow-md rounded-full font-semibold  transition duration-300 text-white bg-lime-600 hover:bg-lime-700 drop-shadow-[0_3px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_3px_0px_rgba(0,0,0,0.6)]"
                    >
                      <span className="font-normal pl-2 text-xl flex justify-center">
                        Add Section
                        <HiPlusSmall className="ml-1 mt-1 lg:text-2xl" />
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
