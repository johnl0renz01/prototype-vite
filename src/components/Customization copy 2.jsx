import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import * as ReactDOM from "react-dom";
import $ from "jquery";

import EquationSolver from "./equationSolver";
import FileUploadForm from "./FileUploadForm.jsx";

import { useFormik } from "formik";
import { editAccountSchema } from "../schemas";
import { editSectionSchema } from "../schemas";
import { addSectionSchema } from "../schemas";

import { MdClose } from "react-icons/md";
import { VscCheckAll, VscPassFilled } from "react-icons/vsc";

import { BsXCircleFill } from "react-icons/bs";
import { BsX } from "react-icons/bs";
import { BsArrowCounterclockwise } from "react-icons/bs";
import { BsSlashCircle } from "react-icons/bs";
import { BsTrash3 } from "react-icons/bs";

import { GoChecklist } from "react-icons/go";
import { HiPlusSmall } from "react-icons/hi2";

import { BsJournalText } from "react-icons/bs";
import { BsJournalPlus } from "react-icons/bs";
import { BsPersonGear } from "react-icons/bs";
import { BsClipboardPlus } from "react-icons/bs";
import { BsReverseLayoutTextSidebarReverse } from "react-icons/bs";
import { BsClipboardX } from "react-icons/bs";

import { VscEyeClosed } from "react-icons/vsc";
import { VscEye } from "react-icons/vsc";

import { HiPencilSquare } from "react-icons/hi2";

//import * from '../assets'

export default function Customization() {
  document.body.style.height = "100vh";
  const navigate = useNavigate();

  //FOR LINKS/NAVBAR/BREADCRUMBS
  const [pageList, setPageList] = useState([]);
  const [pageLink, setPageLink] = useState([]);

  useEffect(() => {
    setPage();

    window.addEventListener("focus", setPage);
    function setPage() {
      let page = ["Home", "Customization"];
      let link = ["/AdminHomepage", "/Customization"];
      setPageList(page);
      setPageLink(link);
      window.localStorage.setItem("NAVBAR_PAGE", JSON.stringify(pageList));
      window.localStorage.setItem("NAVBAR_PAGE_LINK", JSON.stringify(pageLink));
    }

    let tab = JSON.parse(window.localStorage.getItem("CURRENT_TAB"));
    let visibility = JSON.parse(
      window.localStorage.getItem("CURRENT_TAB_INDEX")
    );
    if (tab === null) {
      setCustomEquationsState("visible");
      setCurrentTab("customEquations");
    } else {
      setCurrentTab(tab);
      if (visibility == 1) {
        resetStates();
        setCustomEquationsState("visible");
      } else if (visibility == 2) {
        resetStates();
        setCreateQuestionState("visible");
      } else if (visibility == 3) {
        resetStates();
        setSectionListState("visible");
      } else if (visibility == 4) {
        resetStates();
        setAddSectionState("visible");
      } else if (visibility == 5) {
        resetStates();
        setEditAccountState("visible");
      }
    }

    //window.localStorage.removeItem("FILE_UPLOADED");

    getEquations();
  }, []);

  useEffect(() => {
    window.localStorage.setItem("NAVBAR_PAGE", JSON.stringify(pageList));
  }, [pageList]);

  useEffect(() => {
    window.localStorage.setItem("NAVBAR_PAGE_LINK", JSON.stringify(pageLink));
  }, [pageLink]);

  //END END END END END END END END END END END END

  window.addEventListener(
    "load",
    function () {
      //loadAnswers();
    },
    { once: true }
  );

  const [equationList, setEquationList] = useState([]);

  function getEquations() {
    axios
      .get(`http://localhost:80/Prototype-Vite/my-project/api/getEquationList/`)
      .then(function (response) {
        setEquationList(response.data);
        console.log(response.data);
      });
  }

  //CREATE QUESTIONS / EQUATIONS //CREATE QUESTIONS / EQUATIONS//CREATE QUESTIONS / EQUATIONS//CREATE QUESTIONS / EQUATIONS//CREATE QUESTIONS / EQUATIONS //CREATE QUESTIONS / EQUATIONS
  //CREATE QUESTIONS / EQUATIONS//CREATE QUESTIONS / EQUATIONS//CREATE QUESTIONS / EQUATIONS//CREATE QUESTIONS / EQUATIONS//CREATE QUESTIONS / EQUATIONS//CREATE QUESTIONS / EQUATIONS

  function createQuestion() {
    const [equationString, setEquationString] = useState("");
    const [equationResult, setEquationResult] = useState("");
    const [equationSteps, setEquationSteps] = useState([]);
    const [difficulty, setDifficulty] = useState("");
    const [choice, setChoice] = useState("");

    const [isDuplicate, setDuplicateState] = useState(false);
    const [isValid, setValidState] = useState(false);
    const [isSolved, setSolvedState] = useState(false);

    const [showSteps, setStepsState] = useState(false);

    const [equationLink, setEquationLink] = useState("");

    var fixedEquationString = "";
    var fixedEquationSteps = [];
    var steps = [];

    const inputChange = (event) => {
      document.getElementById("validation_result").style.visibility = "hidden";
      setValidState(false);
      setSolvedState(false);
      setStepsState(false);
      setDifficulty("");
      setChoice("");
      setEquationString(event.target.value);
      //const name = event.target.name;
      //const value = event.target.value;
      //setInputs((values) => ({ ...values, [name]: value }));
    };

    const validateEquation = () => {
      let equationLink = equationString.replace(/ /g, "");

      equationLink = formatGivenEquation(equationLink);

      function formatGivenEquation(currentEquation) {
        let firstIndex = 0;
        let fixedString = "";
        let equalSignIndex = 0;
        for (let j = 1; j <= currentEquation.length; j++) {
          if (currentEquation.length === j) {
            fixedString = fixedString.concat(
              [currentEquation.slice(firstIndex, j)].join("")
            );
            break;
          }
          if (currentEquation[j].match(/[\-]/)) {
            if (j - 1 === equalSignIndex) {
              continue;
            }
          }

          if (currentEquation[j].match(/[\-\+\*\/\=]/)) {
            fixedString = fixedString.concat(
              [
                currentEquation.slice(firstIndex, j),
                " ",
                currentEquation[j],
                " ",
              ].join("")
            );
            firstIndex = j + 1;
          }

          if (currentEquation[j].match(/[\=]/)) {
            equalSignIndex = j;
          }
        }
        return fixedString;
      }
      console.log(equationLink);
      equationLink = equationLink.replace(/ /g, "_");

      axios
        .post(
          `http://localhost:80/Prototype-Vite/my-project/api/verifyEquation/${equationLink}`
        )
        .then(function (response) {
          console.log(response.data);
          document.getElementById("validation_result").style.visibility =
            "visible";
          setEquationResult(equationString);
          if (response.data === "duplicate") {
            setDuplicateState(true);
            setValidState(false);
          } else {
            setDuplicateState(false);
            if (equationString.trim() != "") {
              EquationSolver.setEquation(equationString);
              let answer = EquationSolver.getEquationAnswer();
              console.log(answer);
              if (answer == "solved") {
                setSolvedState(true);
                setValidState(false);
              } else if (answer != "invalid") {
                setValidState(true);
                steps = EquationSolver.getEquationSteps();

                // SET PROPER SPACING
                for (let i = 0; i < steps.length; i++) {
                  let currentEquation = steps[i];
                  let firstIndex = 0;
                  let fixedString = "";
                  let equalSignIndex = 0;

                  formatEquation(currentEquation);
                  function formatEquation(currentEquation) {
                    for (let j = 1; j <= currentEquation.length; j++) {
                      if (currentEquation.length === j) {
                        fixedString = fixedString.concat(
                          [currentEquation.slice(firstIndex, j)].join("")
                        );
                        break;
                      }
                      if (currentEquation[j].match(/[\-]/)) {
                        if (j - 1 === equalSignIndex) {
                          continue;
                        }
                      }

                      if (currentEquation[j].match(/[\-\+\*\/\=]/)) {
                        fixedString = fixedString.concat(
                          [
                            currentEquation.slice(firstIndex, j),
                            " ",
                            currentEquation[j],
                            " ",
                          ].join("")
                        );
                        firstIndex = j + 1;
                      }

                      if (currentEquation[j].match(/[\=]/)) {
                        equalSignIndex = j;
                      }
                    }
                  }

                  fixedEquationSteps.push(fixedString);

                  if (i == 0) {
                    fixedEquationString = equationString.trim();
                    fixedEquationString = fixedEquationString.replace(/ /g, "");
                    fixedString = "";
                    firstIndex = 0;
                    equalSignIndex = 0;

                    formatEquation(fixedEquationString);
                    fixedEquationString = fixedString;
                    fixedEquationString = fixedEquationString.replace(
                      / /g,
                      "_"
                    );

                    console.log("ASDSADAS: " + fixedEquationString);
                    setEquationLink(fixedEquationString);
                  }
                }
              }
              setEquationSteps(fixedEquationSteps);
            }
          }
        });
    };

    const resetEquation = () => {
      document.getElementById("validation_result").style.visibility = "hidden";
      setValidState(false);
      setSolvedState(false);
      setStepsState(false);
      setDifficulty("");
      setChoice("");
      setEquationString("");
    };

    const optionEasy = () => {
      setDifficulty("Easy");
      setChoice("Easy");
      setStepsState(true);
    };

    const optionAverage = () => {
      setDifficulty("Average");
      setChoice("Average");
      setStepsState(true);
    };

    const optionDifficult = () => {
      setDifficulty("Difficult");
      setChoice("Difficult");
      setStepsState(true);
    };

    const addEquation = () => {
      var equationDetails = difficulty + "@" + equationLink;
      console.log(equationDetails);
      axios
        .post(
          `http://localhost:80/Prototype-Vite/my-project/api/addEquation/${equationDetails}`
        )
        .then(function (response) {
          resetEquation();
          console.log(response.data);
          setEquationAddState(true);
          setTimeout(resetState, 3000);
          function resetState() {
            setEquationAddState(false);
          }
        });
    };

    const [equationAdded, setEquationAddState] = useState(false);

    return (
      <>
        <div
          className={`absolute w-full min-h-[46rem] max-h-[46rem] flex flex-col justify-center items-center bg-gradient-to-t from-gray-200 via-white to-white z-50 ${
            equationAdded ? "" : "invisible"
          }`}
        >
          <div className="lg:text-4xl sm:text-2xl font-bold text-center">
            <div className="mb-5 select-none">Equation Successfully Added</div>
          </div>

          <div className="p-1  rounded-xl lg:text-2xl  grid place-items-center text-gray-400 select-none">
            <h1 className="select-none">
              (Move to the equation list tab to see.)
            </h1>
          </div>
        </div>
        <div id="create_question" className="text-2xl p-4 text-gray-700">
          <div>Enter the equation:</div>
          <div className="flex mt-0.5">
            <input
              autoComplete="off"
              name="input"
              value={equationString}
              onChange={inputChange}
              type="text"
              className="w-full grow  p-1 px-2 border-2 rounded-md border-gray-400 focus:outline-teal-500 relative focus:ring-teal-500 shadow-sm  shadow-[#808080]"
            ></input>
            <button
              onClick={equationString != "" ? validateEquation : undefined}
              className={`ml-6 py-1.5 lg:w-36 px-4 shadow-md rounded-full transition duration-300 ${
                equationString != ""
                  ? " text-white  bg-yellow-600 hover:bg-yellow-700"
                  : " cursor-default text-gray-300  bg-gray-400 "
              }`}
            >
              <span className="pl-1 text-xl flex justify-center">
                Validate
                <GoChecklist className="ml-2 mt-1 lg:text-2xl" />
              </span>
            </button>
          </div>
          <div className="text-gray-500 text-lg">
            (Click "Validate" to check if the equation could be solved by the
            algorithm.)
          </div>

          <div
            id="validation_result"
            className={` invisible transition duration-500 select-none ${
              equationString.length >= 30 ? "" : "flex"
            }`}
          >
            <div>
              <div className="">
                <p className=" my-2 border-2  border-gray-300 shadow-md p-1 px-2 rounded-xl">
                  {equationResult}
                </p>
              </div>
            </div>

            <div className="flex">
              {isValid ? (
                <>
                  <VscPassFilled className="ml-3 mt-[1.10rem] lg:text-2xl text-lime-600" />
                </>
              ) : (
                <>
                  {" "}
                  <BsXCircleFill className="ml-3 mt-[1.10rem] lg:text-2xl text-red-500" />
                </>
              )}
              <p
                className={`text-lg  font-semibold border-gray-300 inline-block p-1 px-2 rounded-xl ${
                  equationString.length >= 30
                    ? isValid
                      ? "text-lime-600"
                      : "text-red-600"
                    : isValid
                    ? "text-lime-600 mt-3"
                    : "text-red-600 mt-3"
                }`}
              >
                {...isDuplicate
                  ? "Invalid: (This equation already exist in the equation list.)"
                  : isSolved
                  ? "Invalid: (This equation is already solved)"
                  : isValid
                  ? "Valid: (This equation could be solved by the algorithm)"
                  : "Invalid: (This equation is unable to solve by the algorithm)"}
              </p>
            </div>
          </div>

          <div
            className={`mt-4 text-xl font-semibold  transition select-none ${
              isValid ? "opacity-100  duration-[1500ms]" : "opacity-0"
            }`}
          >
            What is the difficulty level of this equation?
            <div className="mt-2 flex">
              <button
                onClick={isValid ? optionEasy : undefined}
                className={`py-1.5 px-10  shadow-md rounded-xl  transition duration-300 ${
                  isValid
                    ? choice == "Easy"
                      ? "bg-gray-700  text-gray-200"
                      : "bg-gray-400 hover:bg-gray-600 text-white"
                    : choice == "Easy"
                    ? "bg-gray-700  text-gray-200 cursor-default"
                    : "bg-gray-400 hover:bg-gray-600 text-white cursor-default"
                }`}
              >
                <span className="text-xl">Easy</span>
              </button>
              <button
                onClick={isValid ? optionAverage : undefined}
                className={`ml-6 py-1.5 px-10  shadow-md rounded-xl  transition duration-300 ${
                  isValid
                    ? choice == "Average"
                      ? "bg-gray-700  text-gray-200"
                      : "bg-gray-400 hover:bg-gray-600 text-white"
                    : choice == "Average"
                    ? "bg-gray-700  text-gray-200 cursor-default"
                    : "bg-gray-400 hover:bg-gray-600 text-white cursor-default"
                }`}
              >
                <span className="text-xl">Average</span>
              </button>
              <button
                onClick={isValid ? optionDifficult : undefined}
                className={`ml-6 py-1.5 px-10  shadow-md rounded-xl  transition duration-300 ${
                  isValid
                    ? choice == "Difficult"
                      ? "bg-gray-700  text-gray-200"
                      : "bg-gray-400 hover:bg-gray-600 text-white"
                    : choice == "Difficult"
                    ? "bg-gray-700  text-gray-200 cursor-default"
                    : "bg-gray-400 hover:bg-gray-600 text-white cursor-default"
                }`}
              >
                <span className="text-xl">Difficult</span>
              </button>
            </div>
          </div>
          <div
            className={`flex mt-6 shadow-md transition  select-none ${
              showSteps ? "opacity-100  duration-[1500ms]" : "opacity-0"
            }`}
          >
            <div className="">
              <div className="bg-gray-400 px-2 py-1 transition duration-300">
                Steps to solve:
              </div>
              {equationSteps.map((step, index) =>
                index % 2 == 0 ? (
                  <div className="bg-gray-200 px-2 py-1">{step}</div>
                ) : (
                  <div className="bg-gray-300 px-2 py-1">{step}</div>
                )
              )}
            </div>
            <div className="grow border-l-2 border-gray-500/80">
              <div className="bg-gray-400 px-2 py-1">Explanation:</div>
              {equationSteps.length === 1 ? (
                <>
                  <div className="bg-gray-200 px-2 py-1">
                    The equation is solved. Dividing constant by the
                    coefficient.{" "}
                  </div>
                </>
              ) : equationSteps.length === 2 ? (
                <>
                  <div className="bg-gray-200 px-2 py-1">
                    Simplify both expression.{" "}
                  </div>
                  <div className="bg-gray-300 px-2 py-1">
                    The equation is solved. Dividing constant by the
                    coefficient.{" "}
                  </div>
                </>
              ) : equationSteps.length === 3 ? (
                <>
                  <div className="bg-gray-200 px-2 py-1">
                    Arrange expressions. Variables in the left side and constant
                    in the right side.{" "}
                  </div>
                  <div className="bg-gray-300 px-2 py-1">
                    Simplify both remaining expression.{" "}
                  </div>
                  <div className="bg-gray-200 px-2 py-1">
                    The equation is solved. Dividing constant by the
                    coefficient.{" "}
                  </div>
                </>
              ) : equationSteps.length === 4 ? (
                <>
                  <div className="bg-gray-200 px-2 py-1">
                    Arithmetic operations performed in both variables and
                    constant.{" "}
                  </div>
                  <div className="bg-gray-300 px-2 py-1">
                    Arrange expressions. Variables in the left side and constant
                    in the right side.{" "}
                  </div>
                  <div className="bg-gray-200 px-2 py-1">
                    Simplify both remaining expression.{" "}
                  </div>
                  <div className="bg-gray-300 px-2 py-1">
                    The equation is solved. Dividing constant by the
                    coefficient.{" "}
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>

          <div className="flex justify-end absolute bottom-4 right-4">
            <button
              onClick={showSteps ? resetEquation : undefined}
              className={`ml-6 py-1.5 pb-2 px-4 shadow-md rounded-full  transition duration-300 ${
                showSteps
                  ? "text-white bg-red-600 hover:bg-red-700"
                  : "cursor-default text-gray-300 bg-gray-400"
              }`}
            >
              <span className="pl-1 text-xl flex justify-center">
                Reset
                <BsArrowCounterclockwise className="ml-2 mt-1.5 lg:text-xl -rotate-45" />
              </span>
            </button>
            <button
              onClick={showSteps ? addEquation : undefined}
              className={` ml-6 py-1.5 pb-2 px-3 shadow-md rounded-full  transition duration-300 ${
                showSteps
                  ? "text-white bg-lime-600 hover:bg-lime-700"
                  : "cursor-default text-gray-300 bg-gray-400"
              }`}
            >
              <span className="pl-2 text-xl flex justify-center">
                Add Equation
                <HiPlusSmall className="ml-1 mt-1 lg:text-2xl" />
              </span>
            </button>
          </div>
        </div>
      </>
    );
  }

  // EDIT STUDENT // EDIT STUDENT // EDIT STUDENT // EDIT STUDENT // EDIT STUDENT // EDIT STUDENT // EDIT STUDENT // EDIT STUDENT // EDIT STUDENT // EDIT STUDENT // EDIT STUDENT // EDIT STUDENT
  // EDIT STUDENT // EDIT STUDENT // EDIT STUDENT // EDIT STUDENT // EDIT STUDENT // EDIT STUDENT // EDIT STUDENT // EDIT STUDENT // EDIT STUDENT // EDIT STUDENT // EDIT STUDENT

  function EditStudentInfo() {
    const [accountValidation, setAccountValidation] = useState("");

    const onSubmit = async (values, actions) => {
      console.log("test");
      axios
        .post(
          `http://localhost:80/Prototype-Vite/my-project/api/loginStudent/save`,
          values
        )
        .then(function (response) {
          console.log(response.data);
          var currentData = JSON.stringify(response.data);
          setAccountValidation(currentData);
          console.log(currentData);

          currentData = currentData.replace("{", "");
          currentData = currentData.replace("}", "");
          currentData = currentData.replace('"GivenName":', "");
          currentData = currentData.replace('"Email":', "");

          var userData = [];
          convertStringToArray();
          function convertStringToArray() {
            let firstIndex = 0;
            let endIndex = 0;
            for (let i = 0; i < currentData.length; i++) {
              let isEnd = false;
              if (currentData[i] == ",") {
                firstIndex = 0;
                endIndex = 0;
                continue;
              }

              if (currentData[i] == '"') {
                if (firstIndex == 0) {
                  firstIndex = i + 1;
                } else {
                  endIndex = i;
                  isEnd = true;
                }
              }
              if (isEnd) {
                //console.log(currentData.substring(firstIndex, endIndex));
                userData.push(currentData.substring(firstIndex, endIndex));
                isEnd = false;
              }
            }
          }
          if (currentData != '"Invalid"') {
            window.localStorage.setItem(
              "SESSION_EMAIL",
              JSON.stringify(userData[1])
            );
            navigate("/EditAccount");
          }
        });

      await new Promise((resolve) => setTimeout(resolve, 1));
      actions.resetForm();
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
        email: "",
        password: "",
      },
      //Page Validation Form
      validationSchema: editAccountSchema,
      onSubmit,
    });

    const [passwordState, setPasswordState] = useState(false);
    const passwordElement = document.getElementById("password");

    const showPassword = () => {
      if (passwordState) {
        setPasswordState(false);
        ReactDOM.findDOMNode(passwordElement).type = "password";
      } else {
        setPasswordState(true);
        ReactDOM.findDOMNode(passwordElement).type = "text";
      }
    };

    return (
      <div className="min-h-[44rem] max-h-[44rem] flex flex-col justify-center items-center">
        <div className="lg:text-4xl sm:text-2xl font-bold text-center">
          <div className="mb-5 select-none">Account Login</div>
        </div>

        <div className="p-1  rounded-xl lg:text-2xl  grid place-items-center text-gray-400 select-none">
          <h1 className="select-none">
            (Log-in student's account to continue)
          </h1>
          <p className="text-red-500 text-center text-lg pt-4 pl-6">
            {accountValidation == '"Invalid"'
              ? "Invalid email or password. Please try again."
              : "\u00A0"}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="">
          <div className="grid grid-rows-2 text-left h-20 flex items-center justify-center">
            <div className="">
              <label
                className="ml-4 mb-4 text-lg  font-semibold pl-0.5"
                htmlFor="email"
              >
                Email:
              </label>
              {errors.email && touched.email && (
                <p className="text-red-500 ml-[5rem] -mt-[26px]">
                  {errors.email}
                </p>
              )}
            </div>
            <div className="flex">
              <input
                onFocus={function () {
                  setAccountValidation("");
                }}
                className={`bg-[#e0e0e0] rounded-full w-[32rem] text-lg text-gray-700 px-4  py-1.5 mr-3  ${
                  errors.email && touched.email
                    ? " border-red-500 focus:border-red-500 border-2 border-solid"
                    : ""
                }`}
                type="email"
                name="email"
                placeholder="lastname.firstname@sanfrancisco.edu.ph"
                autoComplete="off"
                /* Formik email validation Section  */

                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>

          <div className="grid grid-rows-2 text-left h-20 flex items-center justify-center mt-4">
            <div className="">
              <label
                className="ml-4 mb-4 text-lg  font-semibold pl-0.5"
                htmlFor="password"
              >
                Password:
              </label>
              {errors.password && touched.password && (
                <p className="text-red-500 ml-[7rem] -mt-[26px]">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="flex relative">
              <input
                onFocus={function () {
                  setAccountValidation("");
                }}
                className={` bg-[#e0e0e0] rounded-full w-[32rem] text-lg text-gray-700 px-4 pr-10  py-1.5 mr-3  ${
                  errors.password && touched.password
                    ? " border-red-500 focus:border-red-500 border-2 border-solid"
                    : ""
                } `}
                id="password"
                type="password"
                name="password"
                placeholder="Input password"
                autoComplete="off"
                /* Formik password validation Section */

                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {passwordState ? (
                <VscEye
                  onClick={showPassword}
                  className="text-gray-500 cursor-pointer absolute right-6 top-[0.6rem]  text-xl hover:text-black"
                />
              ) : (
                <VscEyeClosed
                  onClick={showPassword}
                  className="text-gray-500 cursor-pointer absolute right-6 top-[0.6rem] text-xl hover:text-black"
                />
              )}
            </div>
          </div>
          <button
            disabled={isSubmitting}
            type="submit"
            className="mt-10 flex items-center justify-center bg-lime-600 rounded-5xl w-1/2 mx-auto py-2 lg:text-lg sm:text-md font-semibold hover:bg-lime-700 text-white ease-in-out transition duration-200 transform"
          >
            <span className="text-xl font-semibold">LOG-IN </span>
          </button>
        </form>
      </div>
    );
  }

  const [imageUrl, setImageUrl] = useState("no-image-cover");
  const [imageType, setImageType] = useState("png");
  const [gradeLevel, setGradeLevel] = useState("");

  useEffect(() => {
    //getUploadedImage();
    let data = JSON.parse(window.localStorage.getItem("FILE_UPLOADED"));
    if (data !== null) {
      setTimeout(getUploadedImage(), 1000);
      //window.localStorage.removeItem("FILE_UPLOADED");
    }
  });

  function getUploadedImage() {
    axios
      .get(`http://localhost:80/Prototype-Vite/my-project/api/upload/`)
      .then(function (response) {
        let imageLink = response.data;
        imageLink = imageLink.replace(/ /g, "-");
        let type = "";
        for (let i = imageLink.length; i > 0; i--) {
          if (imageLink[i] == ".") {
            type = imageLink.substring(i + 1);
            imageLink = imageLink.substring(0, i);

            break;
          }
        }
        console.log("type: " + type);
        if (import.meta.hot) {
          import.meta.hot.accept("./FileUploadForm.jsx", (newFoo) => {
            // the callback receives the updated './foo.js' module
          });
        }

        try {
          console.log(
            "VALIDATION: " + require("../assets/uploads/" + imageLink + ".png")
          );

          if (type == "png") {
            require("../assets/uploads/" + imageLink + ".png");
          } else if (type == "jpg") {
            require("../assets/uploads/" + imageLink + ".jpg");
          } else if (type == "jpeg") {
            require("../assets/uploads/" + imageLink + ".jpeg");
          }

          setImageUrl(imageLink);
          setImageType(type);
        } catch (err) {
          setImageUrl("PIA-Neutral");
          setImageType("png");
        }

        //setImageUrl(imageLink);
      });
  }

  const [section, setSection] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [imageUrlList, setImageUrlList] = useState([]);
  const [imageTypeList, setImageTypeList] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);

  var inputText = "";

  useEffect(() => {
    getSectionList();
    getAccounts();
  }, []);

  function getSectionList() {
    axios
      .get(`http://localhost:80/Prototype-Vite/my-project/api/sectionList/`)
      .then(function (response) {
        setSection(response.data);
        let result = Object.values(response.data);

        let items = [];
        let keys = [];
        for (let i = 0; i < result.length; i++) {
          for (let k in result[i]) keys.push(result[i][k]);
        }

        for (let i = 6; i <= keys.length; i += 7) {
          // GET IMAGE STRING 6th index (including id)
          items.push(keys[i]);
        }

        var imgName = [];
        var imgType = [];

        for (let i = 0; i < items.length; i++) {
          let string = items[i];
          for (let j = 0; j < string.length; j++) {
            if (string[j] == ".") {
              imgName.push(string.substring(0, j));
              imgType.push(string.substring(j + 1));
              break;
            }
          }
        }
        console.log(imgName);
        console.log(imgType);

        setImageUrlList(imgName);
        setImageTypeList(imgType);
      });
  }

  function getAccounts() {
    axios
      .get(
        `http://localhost:80/Prototype-Vite/my-project/api/getAccountSection/`
      )
      .then(function (response) {
        let responseData = response.data;
        var newArray = [];
        for (let i = 0; i < responseData.length; i++) {
          var tempArray = [];
          var result = Object.keys(responseData[i]).map((key) => [
            key,
            responseData[i][key],
          ]);

          for (let j = 0; j < result.length; j++) {
            tempArray.push(result[j][1]);
          }
          console.log(tempArray);

          let data = JSON.stringify(tempArray[0]);
          data = data.replace(/"/g, "");

          newArray.push(data);
        }

        console.log(newArray);
        setAccounts(newArray);
      });
  }

  // SECTION LIST // SECTION LIST // SECTION LIST // SECTION LIST // SECTION LIST // SECTION LIST // SECTION LIST // SECTION LIST // SECTION LIST // SECTION LIST
  // SECTION LIST // SECTION LIST // SECTION LIST // SECTION LIST // SECTION LIST // SECTION LIST // SECTION LIST // SECTION LIST // SECTION LIST // SECTION LIST // SECTION LIST

  const editMode = (e) => {
    let sectionName = e.target.name;
    getSectionDetails(sectionName);
    resetStates();
    setEditSectionState("visible");
  };

  // // ADDED// ADDED

  function sectionCover(index) {
    var currentIndex = parseInt(index);

    /*
    if (currentIndex == imageUrlList.length) {
      return;
    }
    try {
      console.log(
        "VALIDATION: " +
          require(`../assets/section_cover/${imageUrlList[currentIndex]}.${imageTypeList[currentIndex]}`)
      );
      console.log("VALID!");
    } catch (err) {
      console.log("INVAVAVAVVALID!");
    }

    console.log(imageUrlList.length);
    */

    return {
      ...(imageUrlList.length > 0 ? (
        <>
          <img
            className="min-w-[5rem] max-w-[5rem] object-cover min-h-14 max-h-14 py-1 "
            src={require(`../assets/section_cover/${imageUrlList[currentIndex]}.${imageTypeList[currentIndex]}`)}
          ></img>
        </>
      ) : (
        <></>
      )),
    };
  }
  // ADDED// ADDED// ADDED//

  function sectionList() {
    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      inputText = { [name]: value };

      axios
        .post(
          `http://localhost:80/Prototype-Vite/my-project/api/sectionList/`,
          inputText
        )
        .then(function (response) {
          setSection(response.data);
        });
    };

    return (
      <>
        <div className="w-full grid grid-cols-7 text-xl text-center font-semibold">
          <div className="p-3 pb-5 border-b-2 border-gray-400">Grade Level</div>
          <div className="p-3 pb-5 border-l-2 border-b-2 border-gray-400">
            Section Name
          </div>
          <div className="p-3 pb-5 border-l-2 border-b-2 border-gray-400 col-span-2">
            Adviser Name
          </div>
          <div className="p-3 pb-5 border-l-2 border-b-2 border-gray-400">
            Cover Image
          </div>
          <div className="relative px-2 border-l-2 border-b-2 border-gray-400 col-span-2">
            <div className="absolute top-1 overflow-hidden py-1 px-2 ">
              <div className="w-full m-1 overflow-hidden shadow-sm shadow-gray-600 rounded-2xl text-lg">
                <div className="flex bg-gray-200 py-1 items-center text-left rounded-2xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-4 h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <input
                    className="bg-gray-200  outline-none ml-2 block w-full text-lg font-normal"
                    type="text"
                    name="searchQuery"
                    id="searchQuery"
                    onChange={handleChange}
                    placeholder="&nbsp;Search Section..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="min-h-[44rem] max-h-[44rem] overflow-y-scroll style-3">
          {section.map((currentSection, index) => (
            <>
              <div className="border-b-2 hover:bg-gray-200 ">
                <div className="w-full grid grid-cols-7 text-xl text-center place-items-center ">
                  <div className="px-2  w-full h-full grid place-items-center">
                    Grade {currentSection.GradeLevel}
                  </div>
                  <div className="px-2 w-full h-full grid place-items-center">
                    {currentSection.SectionName}
                  </div>
                  <div className="px-2  w-full h-full grid place-items-center col-span-2">
                    {`${currentSection.AdviserTitle}. ${currentSection.AdviserName} ${currentSection.AdviserSurname}`}
                  </div>
                  <div className="px-2 w-full h-full grid place-items-center  ">
                    {sectionCover(index)}
                  </div>
                  <div className="relative">
                    <input
                      onClick={editMode}
                      name={currentSection.SectionName}
                      type="submit"
                      value="Edit"
                      className="cursor-pointer py-[0.2rem]  pl-4 pr-[2.15rem]   shadow-md rounded-full font-normal  transition duration-300 text-white bg-blue-500/90 hover:bg-blue-600 lg:text-base"
                    ></input>
                    <span className=" absolute top-[0.25rem] right-3 font-normal text-base flex justify-center">
                      <HiPencilSquare className="ml-1 mt-[0.2rem] lg:text-lg text-white" />
                    </span>
                  </div>

                  <div className="mr-16">
                    {accounts.includes(currentSection.SectionName) ? (
                      <>
                        <button
                          disabled
                          className="relative py-[0.2rem]  px-4 shadow-md rounded-full font-semibold  text-gray-300 bg-gray-400 "
                          title="You can only delete an empty section."
                        >
                          <span className="font-normal pl-2 text-base flex justify-center">
                            Delete
                            <BsTrash3 className="ml-1 mt-[0.25rem] lg:text-base" />
                          </span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="submit"
                          className="relative py-[0.2rem]  px-4 shadow-md rounded-full font-semibold  transition duration-500 text-white bg-red-500 hover:bg-red-700"
                        >
                          <span className="font-normal pl-2 text-base flex justify-center">
                            Delete
                            <BsTrash3 className="ml-1 mt-[0.25rem] lg:text-base" />
                          </span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </>
    );
  }

  // EDIT SECTION // EDIT SECTION// EDIT SECTION// EDIT SECTION// EDIT SECTION// EDIT SECTION// EDIT SECTION// EDIT SECTION// EDIT SECTION// EDIT SECTION// EDIT SECTION// EDIT SECTION
  // EDIT SECTION// EDIT SECTION// EDIT SECTION// EDIT SECTION// EDIT SECTION// EDIT SECTION// EDIT SECTION// EDIT SECTION// EDIT SECTION// EDIT SECTION// EDIT SECTION// EDIT SECTION

  const [sectionDetails, setSectionDetails] = useState([]);
  const [imageUrlEdit, setImageUrlEdit] = useState("no-image-cover");
  const [imageTypeEdit, setImageTypeEdit] = useState("png");

  function getSectionDetails(sectionName) {
    let sectionLink = sectionName.replace(/ /g, "_");
    axios
      .get(
        `http://localhost:80/Prototype-Vite/my-project/api/sectionDetails/${sectionLink}`
      )
      .then(function (response) {
        setSectionDetails(response.data);
        var result = Object.values(response.data);

        var keys = [];
        for (var k in result[0]) keys.push(result[0][k]);

        window.localStorage.setItem(
          "EDIT_SECTION_NAME",
          JSON.stringify(keys[2])
        );
        setEditSectionName(keys[2]);
        setEditAdviserName(keys[3]);
        setEditAdviserSurname(keys[4]);
        setEditTitle(keys[5]);
        let url = keys[6];
        let imgName = "";
        let imgType = "";
        for (let i = 0; i < url.length; i++) {
          if (url[i] == ".") {
            imgName = url.substring(0, i);
            imgType = url.substring(i + 1);
          }
        }
        setImageUrlEdit(imgName);
        setImageTypeEdit(imgType);
      });
  }

  const [editSectionName, setEditSectionName] = useState("");
  const [editAdviserName, setEditAdviserName] = useState("");
  const [editAdviserSurname, setEditAdviserSurname] = useState("");
  const [editTitle, setEditTitle] = useState("");

  function editSection() {
    //window.localStorage.setItem("");

    const onSubmit = (values, actions) => {
      console.log("SUBMITTED");
      axios
        .post(
          "http://localhost:80/Prototype-Vite/my-project/api/addSection/save",
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
        gradeLevel: "7",
        sectionName: "",
        adviserName: "",
        adviserSurname: "",
        title: "",
      },
      validationSchema: addSectionSchema,
      onSubmit,
    });

    const sectionNameChange = (event) => {
      const value = event.target.value;
      values.sectionName = value;
      setEditSectionName(value);
    };

    const adviserNameChange = (event) => {
      const value = event.target.value;
      values.adviserName = value;
      setEditAdviserName(value);
    };

    const adviserSurnameChange = (event) => {
      const value = event.target.value;
      values.adviserSurname = value;
      setEditAdviserSurname(value);
    };

    const titleChange = (event) => {
      const value = event.target.value;
      values.title = value;
      setEditTitle(value);
    };

    loadValues();

    function loadValues() {
      values.sectionName = editSectionName;
      values.adviserName = editAdviserName;
      values.adviserSurname = editAdviserSurname;
      values.title = editTitle;
    }

    function sectionCard(gradeLevel, sectionName, lastName, title) {
      return (
        <div
          className={`  max-w-xs scale-135 
       
               bg-white border-l-8 border-b-8 border-gray-500/60 border-r-gray-200 border-t-gray-200 border-r-8 border-t-8  px-5 py-6 rounded-xl shadow-md text-indigo-600 hover:text-orange-700 hover:border-r-yellow-400/70 hover:border-t-yellow-400/70 hover:border-b-yellow-500 hover:border-l-yellow-500 hover:shadow-orange-300 transform hover:scale-140 transition duration-500
              `}
        >
          <div className="text-gray-700/40 absolute  top-0 left-1/2 -translate-x-1/2">
            (Preview Only)
          </div>
          <h3 className="mb-3 text-xl font-bold  drop-shadow">
            {gradeLevel} - {sectionName}
          </h3>
          <div className="relative rounded-xl shadow-md shadow-black/40">
            {imageUrlEdit.length > 0 ? (
              <>
                <img
                  className={`w-full rounded-xl h-48 object-cover opacity-100
              `}
                  src={require(`../assets/section_cover/${imageUrlEdit}.${imageTypeEdit}`)}
                  onError={(e) => {
                    e.target.src = require("../assets/images/error.jpg");
                  }}
                  alt=""
                />
              </>
            ) : (
              <></>
            )}
          </div>
          <div className={`my-3 select-none  text-gray-800`}>
            <div className="flex space-x-3 items-center">
              <span className=" text-2xl "> Teacher: </span>
              <p className="pt-1 text-xl">
                {title != "" ? `${title}. ` : ""}
                {lastName}
              </p>
            </div>
            <div className="flex space-x-3 items-center">
              <span className="text-2xl"> Students: </span>
              <p className="pt-1 text-xl">## Students</p>
            </div>
          </div>
          <a>
            <button
              disabled
              className={`mt-3 text-xl w-full  py-2 rounded-xl  shadow-lg text-gray-300 bg-gray-500/90`}
            >
              Visit class
            </button>
          </a>
        </div>
      );
    }

    /*
     <div className="min-h-[44rem] max-h-[44rem] flex flex-col justify-center items-center">
          <div className="lg:text-4xl sm:text-2xl font-bold text-center">
            <div className="mb-5 select-none">Account Login</div>
          </div>

          <div className="p-1  rounded-xl lg:text-2xl  grid place-items-center text-gray-400 select-none">
            <h1 className="select-none">
              (Log-in student's account to continue)
            </h1>
            <p className="text-red-500 text-center text-lg pt-4 pl-6"></p>
          </div>
        </div>
    */

    const gradeLevelChange = (event) => {
      var value = event.target.value;
      console.log("value: " + value);
      value = value.replace(/[A-za-z]/g, "");
      value = value.replace(/ /g, "");
      console.log("value: " + value);
      values.gradeLevel = value;
      setGradeLevel(value);
    };

    //REMOVED
    //onSubmit={(e) => onSubmit(e)}
    return (
      <>
        <div className="p-12">
          <div className="grid grid-cols-2">
            <div className=" text-xl py-16 relative">
              <form
                action=""
                className="overflow-hidden"
                autocomplete="off"
                onSubmit={onSubmit}
              >
                <div className="flex mb-8">
                  <p className="w-[10rem] text-right">Set Cover Image:</p>

                  <p className="ml-3 text-base mt-1 ">
                    <FileUploadForm />
                  </p>
                </div>

                <div className="inline-flex w-full">
                  <label
                    htmlFor="gradeLevel"
                    className="inline-block pt-2 w-[10rem] text-right"
                  >
                    Grade Level:{" "}
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
                    Section Name:{" "}
                  </label>
                  <input
                    name="sectionName"
                    type="text"
                    placeholder="Enter Section Name"
                    className={`grow p-1  px-2 mt-1 ml-3 border-2 text-lg rounded-md border-gray-500 focus:outline-teal-500 focus:ring-teal-500 focus:border-none shadow-sm shadow-[#808080] ${
                      errors.sectionName && touched.sectionName
                        ? " shadow-red-500 border-red-500 focus:border-red-500 border-3 border-solid"
                        : ""
                    }`}
                    value={editSectionName}
                    onChange={sectionNameChange}
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
                    Adviser Name:{" "}
                  </label>
                  <input
                    name="adviserName"
                    type="text"
                    placeholder="Enter Given Name"
                    className={`grow p-1  px-2 mt-1 ml-3 border-2 text-lg rounded-md border-gray-500 focus:outline-teal-500 focus:ring-teal-500 focus:border-none shadow-sm shadow-[#808080] ${
                      errors.adviserName && touched.adviserName
                        ? " shadow-red-500 border-red-500 focus:border-red-500 border-3 border-solid"
                        : ""
                    }`}
                    value={editAdviserName}
                    onChange={adviserNameChange}
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
                    Adviser Surname:{" "}
                  </label>
                  <input
                    name="adviserSurname"
                    type="text"
                    placeholder="Enter Last Name"
                    className={`grow p-1  px-2 mt-1 ml-3 border-2 text-lg rounded-md border-gray-500 focus:outline-teal-500 focus:ring-teal-500 focus:border-none shadow-sm shadow-[#808080] ${
                      errors.adviserSurname && touched.adviserSurname
                        ? " shadow-red-500 border-red-500 focus:border-red-500 border-3 border-solid"
                        : ""
                    }`}
                    value={editAdviserSurname}
                    onChange={adviserSurnameChange}
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
                    Adviser's Title:{" "}
                  </label>
                  <div className="ml-3 mt-2.5">
                    <input
                      name="title"
                      type="radio"
                      className=""
                      value="Mr"
                      checked={editTitle === "Mr"}
                      onChange={titleChange}
                    />{" "}
                    Mr
                    <input
                      name="title"
                      type="radio"
                      className="ml-4"
                      value="Mrs"
                      checked={editTitle === "Mrs"}
                      onChange={titleChange}
                    />{" "}
                    Mrs
                    <input
                      name="title"
                      type="radio"
                      className="ml-4"
                      value="Ms"
                      checked={editTitle === "Ms"}
                      onChange={titleChange}
                    />{" "}
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
                    className={`relative pb-2 px-4 py-2 shadow-md rounded-full font-semibold  transition duration-300 text-white bg-red-600 hover:bg-red-700 `}
                  >
                    <span className="font-normal pl-1 text-xl flex justify-center">
                      Cancel
                      <BsSlashCircle className="ml-2 mt-1.5 lg:text-xl" />
                    </span>
                  </button>

                  <button
                    type="submit"
                    className="relative ml-6 py-1.5 pb-2 px-4 mr-1.5 shadow-md rounded-full font-semibold  transition duration-300 text-white bg-lime-600 hover:bg-lime-700"
                  >
                    <span className="font-normal pl-2 text-xl flex justify-center">
                      Apply Changes
                      <VscCheckAll className="ml-1 mt-1 lg:text-2xl" />
                    </span>
                  </button>
                </div>
              </form>
            </div>
            <div className=" w-full h-full pt-24 pl-28">
              {sectionCard(
                values.gradeLevel,
                editSectionName,
                editAdviserSurname,
                editTitle
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  // ADD SECTION// ADD SECTION// ADD SECTION// ADD SECTION// ADD SECTION// ADD SECTION// ADD SECTION// ADD SECTION// ADD SECTION// ADD SECTION// ADD SECTION// ADD SECTION
  // ADD SECTION// ADD SECTION// ADD SECTION// ADD SECTION// ADD SECTION// ADD SECTION// ADD SECTION// ADD SECTION// ADD SECTION// ADD SECTION// ADD SECTION// ADD SECTION

  function addSection() {
    //window.localStorage.setItem("");
    const onSubmit = (values, actions) => {
      console.log("SUBMITTED");
      axios
        .post(
          "http://localhost:80/Prototype-Vite/my-project/api/addSection/save",
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
        gradeLevel: "7",
        sectionName: "",
        adviserName: "",
        adviserSurname: "",
        title: "",
      },
      validationSchema: addSectionSchema,
      onSubmit,
    });

    function sectionCard(gradeLevel, sectionName, lastName, title) {
      return (
        <div
          className={`  max-w-xs scale-135 
       
               bg-white border-l-8 border-b-8 border-gray-500/60 border-r-gray-200 border-t-gray-200 border-r-8 border-t-8  px-5 py-6 rounded-xl shadow-md text-indigo-600 hover:text-orange-700 hover:border-r-yellow-400/70 hover:border-t-yellow-400/70 hover:border-b-yellow-500 hover:border-l-yellow-500 hover:shadow-orange-300 transform hover:scale-140 transition duration-500
              `}
        >
          <div className="text-gray-700/40 absolute  top-0 left-1/2 -translate-x-1/2">
            (Preview Only)
          </div>
          <h3 className="mb-3 text-xl font-bold  drop-shadow">
            {gradeLevel} - {sectionName}
          </h3>
          <div className="relative rounded-xl shadow-md shadow-black/40">
            {imageType == "png" ? (
              <>
                <img
                  className={`w-full rounded-xl h-48 object-cover opacity-100
              `}
                  src={require("../assets/section_cover/" + imageUrl + ".png")}
                  onError={(e) => {
                    e.target.src = require("../assets/images/error.jpg");
                  }}
                  alt=""
                />
              </>
            ) : imageType == "jpg" ? (
              <>
                <img
                  className={`w-full rounded-xl h-48 object-cover opacity-100
                `}
                  src={require("../assets/section_cover/" + imageUrl + ".jpg")}
                  onError={(e) => {
                    e.target.src = require("../assets/images/error.jpg");
                  }}
                  alt=""
                />
              </>
            ) : imageType == "jpeg" ? (
              <>
                <img
                  className={`w-full rounded-xl h-48 object-cover opacity-100
                  `}
                  src={require("../assets/section_cover/" + imageUrl + ".jpeg")}
                  onError={(e) => {
                    e.target.src = require("../assets/images/error.jpg");
                  }}
                  alt=""
                />
              </>
            ) : (
              <img
                className={`w-full rounded-xl h-48 object-cover opacity-100
                  `}
                src={require("../assets/section_cover/" + imageUrl + ".png")}
                onError={(e) => {
                  e.target.src = require("../assets/images/error.jpg");
                }}
                alt=""
              />
            )}
          </div>
          <div className={`my-3 select-none  text-gray-800`}>
            <div className="flex space-x-3 items-center">
              <span className=" text-2xl "> Teacher: </span>
              <p className="pt-1 text-xl">
                {title != "" ? `${title}. ` : ""}
                {lastName}
              </p>
            </div>
            <div className="flex space-x-3 items-center">
              <span className="text-2xl"> Students: </span>
              <p className="pt-1 text-xl">## Students</p>
            </div>
          </div>
          <a>
            <button
              disabled
              className={`mt-3 text-xl w-full  py-2 rounded-xl  shadow-lg text-gray-300 bg-gray-500/90`}
            >
              Visit class
            </button>
          </a>
        </div>
      );
    }

    /*
     <div className="min-h-[44rem] max-h-[44rem] flex flex-col justify-center items-center">
          <div className="lg:text-4xl sm:text-2xl font-bold text-center">
            <div className="mb-5 select-none">Account Login</div>
          </div>

          <div className="p-1  rounded-xl lg:text-2xl  grid place-items-center text-gray-400 select-none">
            <h1 className="select-none">
              (Log-in student's account to continue)
            </h1>
            <p className="text-red-500 text-center text-lg pt-4 pl-6"></p>
          </div>
        </div>
    */

    const gradeLevelChange = (event) => {
      var value = event.target.value;
      console.log("value: " + value);
      value = value.replace(/[A-za-z]/g, "");
      value = value.replace(/ /g, "");
      console.log("value: " + value);
      values.gradeLevel = value;
      setGradeLevel(value);
    };

    //REMOVED
    //onSubmit={(e) => onSubmit(e)}
    return (
      <>
        <div className="p-12">
          <div className="grid grid-cols-2">
            <div className=" text-xl py-16 relative">
              <form
                action=""
                className="overflow-hidden"
                autocomplete="off"
                onSubmit={onSubmit}
              >
                <div className="flex mb-8">
                  <p className="w-[10rem] text-right">Set Cover Image:</p>

                  <p className="ml-3 text-base mt-1 ">
                    <FileUploadForm />
                  </p>
                </div>

                <div className="inline-flex w-full">
                  <label
                    htmlFor="gradeLevel"
                    className="inline-block pt-2 w-[10rem] text-right"
                  >
                    Grade Level:{" "}
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
                    Section Name:{" "}
                  </label>
                  <input
                    name="sectionName"
                    type="text"
                    placeholder="Enter Section Name"
                    className={`grow p-1  px-2 mt-1 ml-3 border-2 text-lg rounded-md border-gray-500 focus:outline-teal-500 focus:ring-teal-500 focus:border-none shadow-sm shadow-[#808080] ${
                      errors.sectionName && touched.sectionName
                        ? " shadow-red-500 border-red-500 focus:border-red-500 border-3 border-solid"
                        : ""
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
                    Adviser Name:{" "}
                  </label>
                  <input
                    name="adviserName"
                    type="text"
                    placeholder="Enter Given Name"
                    className={`grow p-1  px-2 mt-1 ml-3 border-2 text-lg rounded-md border-gray-500 focus:outline-teal-500 focus:ring-teal-500 focus:border-none shadow-sm shadow-[#808080] ${
                      errors.adviserName && touched.adviserName
                        ? " shadow-red-500 border-red-500 focus:border-red-500 border-3 border-solid"
                        : ""
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
                    Adviser Surname:{" "}
                  </label>
                  <input
                    name="adviserSurname"
                    type="text"
                    placeholder="Enter Last Name"
                    className={`grow p-1  px-2 mt-1 ml-3 border-2 text-lg rounded-md border-gray-500 focus:outline-teal-500 focus:ring-teal-500 focus:border-none shadow-sm shadow-[#808080] ${
                      errors.adviserSurname && touched.adviserSurname
                        ? " shadow-red-500 border-red-500 focus:border-red-500 border-3 border-solid"
                        : ""
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
                    Adviser's Title:{" "}
                  </label>
                  <div className="ml-3 mt-2.5">
                    <input
                      name="title"
                      type="radio"
                      className=""
                      value="Mr"
                      checked={values.title === "Mr"}
                      onChange={handleChange}
                    />{" "}
                    Mr
                    <input
                      name="title"
                      type="radio"
                      className="ml-4"
                      value="Mrs"
                      checked={values.title === "Mrs"}
                      onChange={handleChange}
                    />{" "}
                    Mrs
                    <input
                      name="title"
                      type="radio"
                      className="ml-4"
                      value="Ms"
                      checked={values.title === "Ms"}
                      onChange={handleChange}
                    />{" "}
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
                    className={`relative pb-2 px-4 py-2 shadow-md rounded-full font-semibold  transition duration-300 text-white bg-red-600 hover:bg-red-700 `}
                  >
                    <span className="font-normal pl-1 text-xl flex justify-center">
                      Reset
                      <BsArrowCounterclockwise className="ml-2 mt-1.5 lg:text-xl -rotate-45" />
                    </span>
                  </button>

                  <button
                    type="submit"
                    className="relative ml-6 py-1.5 pb-2 px-4 mr-4 shadow-md rounded-full font-semibold  transition duration-300 text-white bg-lime-600 hover:bg-lime-700"
                  >
                    <span className="font-normal pl-2 text-xl flex justify-center">
                      Add Section
                      <HiPlusSmall className="ml-1 mt-1 lg:text-2xl" />
                    </span>
                  </button>
                </div>
              </form>
            </div>
            <div className=" w-full h-full pt-24 pl-28">
              {sectionCard(
                values.gradeLevel,
                values.sectionName,
                values.adviserSurname,
                values.title
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  const removeEquation = (e) => {
    let equationString = e.target.id;
    equationString = equationString.replace(/ /g, "_");
    axios
      .post(
        `http://localhost:80/Prototype-Vite/my-project/api/removeEquation/${equationString}`
      )
      .then(function (response) {
        window.location.reload(false);
      });
  };

  function resetStates() {
    setCustomEquationsState("hidden");
    setCreateQuestionState("hidden");
    setSectionListState("hidden");
    setEditSectionState("hidden");
    setAddSectionState("hidden");
    setEditAccountState("hidden");
  }

  const [currentTab, setCurrentTab] = useState("");
  const [showCustomEquations, setCustomEquationsState] = useState("hidden");
  const [showCreateQuestion, setCreateQuestionState] = useState("hidden");
  const [showSectionList, setSectionListState] = useState("hidden");
  const [showEditSection, setEditSectionState] = useState("hidden");
  const [showAddSection, setAddSectionState] = useState("hidden");
  const [showEditAccount, setEditAccountState] = useState("hidden");

  return (
    <>
      <section className="h-[92.5vh] flex items-center justify-center ">
        <div className="py-20 w-[70%] ">
          <main className=" relative h-[50rem] bg-white border-l-12 border-b-12 border-yellow-700  rounded-6xl shadow-2xl shadow-yellow-400 overflow-hidden ">
            <div className="flex w-full  overflow-hidden h-full">
              <div className="bg-mainBGBrown w-72 pt-2 border-l-12 border-r-12 border-mainBGBrown text-xl font-semibold ">
                <div className="bg-yellow-700 rounded-t-3xl select-none">
                  <div
                    onClick={function () {
                      resetStates();
                      setCustomEquationsState("visible");
                      setCurrentTab("customEquations");
                      getEquations();
                      window.localStorage.setItem(
                        "CURRENT_TAB",
                        JSON.stringify("customEquations")
                      );
                      window.localStorage.setItem(
                        "CURRENT_TAB_INDEX",
                        JSON.stringify(1)
                      );
                    }}
                    className={`cursor-pointer py-2 my-1.5 rounded-t-3xl border-b-8 ease-in-out transform transition duration-150 ${
                      currentTab == "customEquations"
                        ? "  text-gray-800 bg-[#bcbcbc] border-b-gray-600/90"
                        : "text-gray-700 border-gray-400  hover:border-gray-500/90 bg-[#f1f1f1] hover:text-gray-800 hover:bg-[#b3b3b3]"
                    }`}
                  >
                    <span className="pr-2 text-xl flex ">
                      <BsJournalText className="ml-[1.15rem] mr-2 mt-1 lg:text-2xl" />
                      Equation List
                    </span>
                  </div>

                  <div
                    onClick={function () {
                      resetStates();
                      setCreateQuestionState("visible");
                      setCurrentTab("createEquations");
                      window.localStorage.setItem(
                        "CURRENT_TAB",
                        JSON.stringify("createEquations")
                      );
                      window.localStorage.setItem(
                        "CURRENT_TAB_INDEX",
                        JSON.stringify(2)
                      );
                    }}
                    className={`cursor-pointer py-2 my-1.5 rounded-t-3xl border-b-8 ease-in-out transform transition duration-150 ${
                      currentTab == "createEquations"
                        ? "  text-gray-800 bg-[#bcbcbc] border-b-gray-600/90"
                        : "text-gray-700 border-gray-400  hover:border-gray-500/90 bg-[#f1f1f1] hover:text-gray-800 hover:bg-[#b3b3b3]"
                    }`}
                  >
                    <span className="pr-2 text-xl flex ">
                      <BsJournalPlus className="ml-[1.15rem] mr-2 mt-1 lg:text-2xl" />
                      Create Equation
                    </span>
                  </div>

                  <div
                    onClick={function () {
                      resetStates();
                      setSectionListState("visible");
                      setCurrentTab("sectionList");
                      window.localStorage.setItem(
                        "CURRENT_TAB",
                        JSON.stringify("sectionList")
                      );
                      window.localStorage.setItem(
                        "CURRENT_TAB_INDEX",
                        JSON.stringify(3)
                      );
                    }}
                    className={`cursor-pointer py-2 my-1.5 rounded-t-3xl border-b-8 ease-in-out transform transition duration-150 ${
                      currentTab == "sectionList"
                        ? "  text-gray-800 bg-[#bcbcbc] border-b-gray-600/90"
                        : "text-gray-700 border-gray-400  hover:border-gray-500/90 bg-[#f1f1f1] hover:text-gray-800 hover:bg-[#b3b3b3]"
                    }`}
                  >
                    <span className="pr-2 text-xl flex ">
                      <BsReverseLayoutTextSidebarReverse className="ml-[1.15rem] mr-2 mt-1 lg:text-2xl" />
                      Section List
                    </span>
                  </div>
                  <div
                    onClick={function () {
                      resetStates();
                      setAddSectionState("visible");
                      setCurrentTab("addSection");
                      window.localStorage.setItem(
                        "CURRENT_TAB",
                        JSON.stringify("addSection")
                      );
                      window.localStorage.setItem(
                        "CURRENT_TAB_INDEX",
                        JSON.stringify(4)
                      );
                    }}
                    className={`cursor-pointer py-2 my-1.5 rounded-t-3xl border-b-8 ease-in-out transform transition duration-150 ${
                      currentTab == "addSection"
                        ? "  text-gray-800 bg-[#bcbcbc] border-b-gray-600/90"
                        : "text-gray-700 border-gray-400  hover:border-gray-500/90 bg-[#f1f1f1] hover:text-gray-800 hover:bg-[#b3b3b3]"
                    }`}
                  >
                    <span className="pr-2 text-xl flex ">
                      <BsClipboardPlus className="ml-[1.15rem] mr-2 mt-1 lg:text-2xl" />
                      Create Section
                    </span>
                  </div>
                  <div
                    onClick={function () {
                      resetStates();
                      setEditAccountState("visible");
                      setCurrentTab("editStudent");
                      window.localStorage.setItem(
                        "CURRENT_TAB",
                        JSON.stringify("editStudent")
                      );
                      window.localStorage.setItem(
                        "CURRENT_TAB_INDEX",
                        JSON.stringify(5)
                      );
                    }}
                    className={`cursor-pointer py-2 my-1.5 rounded-t-3xl border-b-8 ease-in-out transform transition duration-150 ${
                      currentTab == "editStudent"
                        ? "  text-gray-800 bg-[#bcbcbc] border-b-gray-600/90"
                        : "text-gray-700 border-gray-400  hover:border-gray-500/90 bg-[#f1f1f1] hover:text-gray-800 hover:bg-[#b3b3b3]"
                    }`}
                  >
                    <span className="pr-2 text-xl flex ">
                      <BsPersonGear className="ml-[1.15rem] mr-2 mt-1 lg:text-2xl" />
                      Edit Information
                    </span>
                  </div>
                  <div className="h-1"></div>
                </div>
              </div>
              <div className="bg-[#a76f15] w-3"></div>
              <div className="bg-gradient-to-t from-gray-200 via-white to-white p-4 w-full rounded-r-5xl border-b-12 border-b-yellow-900/50 border-r-12 border-r-yellow-900/30">
                <div className="relative w-full h-full border-3 border-gray-700/40 rounded-tr-4xl rounded-br-4xl overflow-hidden">
                  <div className={showCustomEquations}>
                    <div className="grid grid-cols-3 text-center text-xl  w-full h-full">
                      <div className="min-h-[44rem] max-h-[44rem] ">
                        <div className="py-1 border-gray-400 border-2 font-semibold -ml-1">
                          Easy
                        </div>
                        <div className="bg-gradient-to-t from-gray-300 via-gray-100 to-white h-full style-3 overflow-y-scroll">
                          {equationList.map((equation, index) => (
                            <>
                              {equation.EquationType == "Easy" ? (
                                <div className="border-b-2 flex justify-center relative hover:bg-gray-200">
                                  <p className="">
                                    {equation.EquationString}
                                    <input
                                      type="submit"
                                      id={equation.EquationString}
                                      onClick={removeEquation}
                                      className="cursor-pointer absolute right-0 text-black/60  hover:text-red-500 rounded-full w-6 h-6"
                                      title="Remove Equation"
                                      value="x"
                                    ></input>
                                  </p>
                                </div>
                              ) : (
                                ""
                              )}
                            </>
                          ))}
                        </div>
                      </div>
                      <div className="min-h-[44rem] max-h-[44rem]">
                        <div className="py-1 border-gray-400 border-2  font-semibold -ml-1.5">
                          Average
                        </div>
                        <div className="bg-gradient-to-t from-gray-200 via-gray-100 to-white h-full style-3 overflow-y-scroll">
                          {equationList.map((equation) => (
                            <>
                              {equation.EquationType == "Average" ? (
                                <div className="border-b-2 flex justify-center relative hover:bg-gray-200">
                                  <p className="">
                                    {equation.EquationString}
                                    <input
                                      type="submit"
                                      id={equation.EquationString}
                                      onClick={removeEquation}
                                      className="cursor-pointer absolute right-0 text-black/60  hover:text-red-500 rounded-full w-6 h-6"
                                      title="Remove Equation"
                                      value="x"
                                    ></input>
                                  </p>
                                </div>
                              ) : (
                                ""
                              )}
                            </>
                          ))}
                        </div>
                      </div>
                      <div className="min-h-[44rem] max-h-[44rem]">
                        <div className="py-1 border-gray-400 border-2 font-semibold -ml-1.5">
                          Difficult
                        </div>
                        <div className="bg-gradient-to-t from-gray-200 via-gray-100 to-white h-full style-3 overflow-y-scroll">
                          {equationList.map((equation) => (
                            <>
                              {equation.EquationType == "Difficult" ? (
                                <div className="border-b-2 flex justify-center relative hover:bg-gray-200">
                                  <p className="">
                                    {equation.EquationString}
                                    <input
                                      type="submit"
                                      id={equation.EquationString}
                                      onClick={removeEquation}
                                      className="cursor-pointer absolute right-0 text-black/60  hover:text-red-500 rounded-full w-6 h-6"
                                      title="Remove Equation"
                                      value="x"
                                    ></input>
                                  </p>
                                </div>
                              ) : (
                                ""
                              )}
                            </>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={showCreateQuestion}>{createQuestion()}</div>
                  <div className={showSectionList}>{sectionList()}</div>
                  <div className={showEditSection}>{editSection()}</div>
                  <div className={showAddSection}>{addSection()}</div>
                  <div className={showEditAccount}>{EditStudentInfo()}</div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </section>
    </>
  );
}
