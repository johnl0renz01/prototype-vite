import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

import EquationGeneratorEasy from './equationsEasy';
import EquationGeneratorAverage from './equationsAverage';
import EquationGeneratorDifficult from './equationsDifficult';

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
      } else if (type == 'SessionTable') {
        axios
          .post(
            'http://localhost:80/Prototype-Vite/my-project/api/0GenerateSessionTable/save',
            values
          )
          .then(function (response) {
            console.log(response.data);
            setShowLoading(false);
          })
          .catch(function (error) {
            setShowLoading(false);
          });
      } else if (type == 'SessionData') {
        axios
          .post(
            'http://localhost:80/Prototype-Vite/my-project/api/0GenerateSessionData/save',
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

  function generateSessionTable() {
    window.sessionStorage.setItem('TYPE', JSON.stringify('SessionTable'));
  }

  function generateSessionData() {
    window.sessionStorage.setItem('TYPE', JSON.stringify('SessionData'));
  }

  const [questions, setQuestions] = useState([]);

  const generateEasyQuestions = () => {
    var equationList = [];
    equationList = EquationGeneratorEasy.getEquationList(20);
    setQuestions(equationList);
    var equationToString = questions.toString();
    equationToString = equationToString.replace(/ /g, '_');
    console.log(equationToString);
    values.equations = equationToString;
    handleChange.equations;
    document.getElementById('demo').innerHTML = values.equations;
  };

  const generateAverageQuestions = () => {
    var equationList = [];
    equationList = EquationGeneratorAverage.getEquationList(20);
    setQuestions(equationList);
    var equationToString = questions.toString();
    equationToString = equationToString.replace(/ /g, '_');
    console.log(equationToString);
    values.equations = equationToString;
    handleChange.equations;
    document.getElementById('demo').innerHTML = values.equations;
  };

  const generateDifficultQuestions = () => {
    var equationList = [];
    equationList = EquationGeneratorDifficult.getEquationList(20);
    setQuestions(equationList);
    var equationToString = questions.toString();
    equationToString = equationToString.replace(/ /g, '_');
    console.log(equationToString);
    values.equations = equationToString;
    handleChange.equations;
    document.getElementById('demo').innerHTML = values.equations;
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
      tablename: '',
      sessionid: '',
      equations: '',
      totalquestions: '',
    },
    onSubmit,
  });

  return (
    <>
      <div className=" absolute p-4 z-[999]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex items-center">
            <label className="mr-4 font-semibold">User database:</label>
            <input
              name="tablename"
              type="text"
              values={values.tablename}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
              placeholder="lastname_firstname"
              className="p-2"
              required
            />
          </div>

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
          <br />
          <h1 className="text-xl font-bold">For Session Table</h1>
          <div className="flex items-center">
            <label className="mr-4 font-semibold">Session ID:</label>
            <input
              name="sessionid"
              type="text"
              maxLength="2"
              values={values.sessionid}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
              placeholder="ex. 133"
              className="p-2"
            />
            <label className="mx-4 font-semibold">Total Quantity:</label>
            <input
              name="totalquestions"
              type="text"
              maxLength="2"
              values={values.totalquestions}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
              placeholder="#Answered + #Abandoned"
              className="p-2 w-[13rem]"
            />
          </div>

          <div className="flex gap-x-4">
            <button
              type="button"
              onClick={generateEasyQuestions}
              className="text-lg py-2 text-white bg-green-700 hover:bg-green-600 border-3 border-white/0 hover:border-black/30 hover:font-semibold w-[7rem]"
            >
              Easy
            </button>
            <button
              type="button"
              onClick={generateAverageQuestions}
              className="text-lg py-2 text-white bg-yellow-700 hover:bg-yellow-600 border-3 border-white/0 hover:border-black/30 hover:font-semibold w-[7rem]"
            >
              Average
            </button>
            <button
              type="button"
              onClick={generateDifficultQuestions}
              className="text-lg py-2 text-white bg-red-700 hover:bg-red-600 border-3 border-white/0 hover:border-black/30 hover:font-semibold w-[7rem]"
            >
              Difficult
            </button>
          </div>

          <p
            id="demo"
            className="min-w-[35rem] min-h-[10rem] max-w-[35rem] max-h-[10rem] overflow-hidden overflow-y-scroll bg-white"
          ></p>

          <button
            type="submit"
            onMouseEnter={generateSessionTable}
            className="text-lg py-2 text-white bg-green-700 hover:bg-green-600 hover:font-semibold w-[14rem]"
          >
            Create Session Table
          </button>

          <button
            type="submit"
            onMouseEnter={generateSessionData}
            className="text-lg py-2 text-white bg-gray-700 hover:bg-gray-600 hover:font-semibold w-[14rem]"
          >
            Generate Session Data
          </button>
        </form>
      </div>
      <LoadingSpinner visible={showLoading} />
    </>
  );
}
