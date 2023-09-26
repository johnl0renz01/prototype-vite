import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

import EquationSolver from './equationSolver';

import { VscCheckAll, VscPassFilled } from 'react-icons/vsc';

import { BsXCircleFill } from 'react-icons/bs';
import { BsArrowCounterclockwise } from 'react-icons/bs';

import { GoChecklist } from 'react-icons/go';
import { HiPlusSmall } from 'react-icons/hi2';

import CreateEquationSkeleton from './CreateEquationSkeleton';
import CreateEquationMessageModal from './CreateEquationMessageModal';

import { BsClipboard2X } from 'react-icons/bs';
import LoadingSpinner from './LoadingSpinner';

import { useFormik } from 'formik';

export default function DataGenerator() {
  const navigate = useNavigate();

  const [showLoading, setShowLoading] = useState(false);

  const onSubmit = async (values, actions) => {
    setShowLoading(true);
    var type = JSON.parse(window.sessionStorage.getItem('TYPE'));
    if (type !== null) {
      type = type.replace(/"/g, '');

      if (type == 'Table') {
        axios
          .post(
            'http://localhost:80/Prototype-Vite/my-project/api/0GenerateTable/save',
            values
          )
          .then(function (response) {
            console.log(response.data);
            setShowLoading(false);
          })
          .catch(function (error) {
            setShowLoading(false);
          });
      } else if (type == 'Data') {
        axios
          .post(
            'http://localhost:80/Prototype-Vite/my-project/api/0GenerateData/save',
            values
          )
          .then(function (response) {
            console.log(response.data);
            setShowLoading(false);
          })
          .catch(function (error) {
            setShowLoading(false);
          });
      }

      await new Promise(resolve => setTimeout(resolve, 1));
    } else {
      setShowLoading(false);
    }
  };

  function createTable() {
    window.sessionStorage.setItem('TYPE', JSON.stringify('Table'));
  }

  function generateData() {
    window.sessionStorage.setItem('TYPE', JSON.stringify('Data'));
  }

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
      tablename: '',
    },
    onSubmit,
  });

  return (
    <>
      <div className=" absolute p-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            name="tablename"
            type="text"
            values={values.tablename}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="off"
            placeholder="lastname_firstname"
            className="p-2"
          />

          <button
            type="submit"
            onMouseEnter={createTable}
            className="text-lg py-2 text-white bg-green-700 hover:bg-green-600 hover:font-semibold w-[12rem]"
          >
            Create Table
          </button>
          <button
            type="submit"
            onMouseEnter={generateData}
            className="text-lg py-2 text-white bg-gray-700 hover:bg-gray-600 hover:font-semibold w-[12rem]"
          >
            Generate Data
          </button>
        </form>
      </div>
      <LoadingSpinner visible={showLoading} />
    </>
  );
}
