import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import * as ReactDOM from "react-dom";
import $ from "jquery";

import EquationSolver from "./equationSolver";
import FileUploadForm from "./FileUploadForm";

import { useFormik } from "formik";
import { editAccountSchema } from "../schemas";
import { addSectionSchema } from "../schemas";

import { MdClose } from "react-icons/md";

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
        setEditAccountState("visible");
      } else if (visibility == 4) {
        resetStates();
        setAddSectionState("visible");
      } else if (visibility == 5) {
        resetStates();
      }
    }

    let data = JSON.parse(window.localStorage.getItem("FILE_UPLOADED"));
    if (data !== null) {
      setTimeout(getUploadedImage(), 100);
    }
    getEquations();
  }, []);

  useEffect(() => {
    window.localStorage.setItem("NAVBAR_PAGE", JSON.stringify(pageList));
  }, [pageList]);

  useEffect(() => {
    window.localStorage.setItem("NAVBAR_PAGE_LINK", JSON.stringify(pageLink));
  }, [pageLink]);

  //END END END END END END END END END END END END

  const [equationList, setEquationList] = useState([]);

  function getEquations() {
    axios
      .get(`http://localhost:80/Prototype-Vite/my-project/api/getEquationList/`)
      .then(function (response) {
        setEquationList(response.data);
        console.log(response.data);
      });
  }

  //CREATE QUESTIONS / EQUATIONS

  function createQuestion() {
    const [equationString, setEquationString] = useState("");
    const [equationResult, setEquationResult] = useState("");
    const [equationSteps, setEquationSteps] = useState([]);
    const [difficulty, setDifficulty] = useState("");
    const [choice, setChoice] = useState("");

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
      if (equationString.trim() != "") {
        setEquationResult(equationString);

        document.getElementById("validation_result").style.visibility =
          "visible";
        console.log(equationString);
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
            var currentEquation = steps[i];
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
              fixedEquationString = fixedEquationString.replace(/ /g, "_");

              console.log("ASDSADAS: " + fixedEquationString);
              setEquationLink(fixedEquationString);
            }
          }
        }
        setEquationSteps(fixedEquationSteps);
      }
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
              (Move to the custom equations tab to see.)
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
              className={`ml-6 py-1.5 lg:w-36  shadow-md rounded-full transition duration-300 ${
                equationString != ""
                  ? " text-white  bg-yellow-600 hover:bg-yellow-700"
                  : " cursor-default text-gray-300  bg-gray-400 "
              }`}
            >
              <span className="text-xl">Validate </span>
            </button>
          </div>
          <div className="text-gray-500 text-lg">
            (Click "Validate" to check if the equation could be solved by the
            algorithm.)
          </div>

          <div
            id="validation_result"
            className={`invisible transition duration-500 select-none ${
              equationString.length >= 30 ? "" : "flex"
            }`}
          >
            <div>
              <p className="my-2 border-2 border-gray-300 shadow-md  inline-block p-1 px-2 rounded-xl">
                {equationResult}
              </p>
            </div>
            <div>
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
                {...isSolved
                  ? "* Invalid: (This equation is already solved)"
                  : isValid
                  ? "* Valid: (This equation could be solved by the algorithm)"
                  : "* Invalid: (This equation is unable to solve by the algorithm)"}
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
              className={`ml-6 py-1.5 pb-2 lg:w-[7rem]   shadow-md rounded-full  transition duration-300 ${
                showSteps
                  ? "text-white bg-red-600 hover:bg-red-700"
                  : "cursor-default text-gray-300 bg-gray-400"
              }`}
            >
              <span className="text-xl">Reset </span>
            </button>
            <button
              onClick={showSteps ? addEquation : undefined}
              className={`ml-6 py-1.5 pb-2 lg:w-[11rem] shadow-md rounded-full  transition duration-300 ${
                showSteps
                  ? "text-white bg-lime-600 hover:bg-lime-700"
                  : "cursor-default text-gray-300 bg-gray-400"
              }`}
            >
              <span className="text-xl">Add Equation </span>
            </button>
          </div>
        </div>
      </>
    );
  }

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

            <div className="flex ">
              <input
                onFocus={function () {
                  setAccountValidation("");
                }}
                className={` bg-[#e0e0e0] rounded-full w-[32rem] text-lg text-gray-700 px-4  py-1.5 mr-3  ${
                  errors.password && touched.password
                    ? " border-red-500 focus:border-red-500 border-2 border-solid"
                    : ""
                } `}
                type="password"
                name="password"
                placeholder="Input password"
                autoComplete="off"
                /* Formik password validation Section */

                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
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

  const [imageUrl, setImageUrl] = useState("PIA-Neutral");
  const [imageType, setImageType] = useState("png");
  const [gradeLevel, setGradeLevel] = useState("");

  useEffect(() => {
    //getUploadedImage();
  });

  const getUploadedImage = () => {
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
        setImageUrl(imageLink);
        setImageType(type);
      });
  };

  function addSection() {
    //window.localStorage.setItem("");
    const onSubmit = async (e, values, actions) => {
      e.preventDefault();
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
        sex: "",
      },
      validationSchema: addSectionSchema,
      onSubmit,
    });

    function sectionCard(gradeLevel, sectionName, teacherName, sex) {
      return (
        <div
          className={`  max-w-xs scale-135 
       
               bg-white border-l-8 border-b-8 border-gray-500/60 border-r-gray-200 border-t-gray-200 border-r-8 border-t-8  px-5 py-6 rounded-xl shadow-md text-indigo-600 hover:text-orange-700 hover:border-r-yellow-400/70 hover:border-t-yellow-400/70 hover:border-b-yellow-500 hover:border-l-yellow-500 hover:shadow-orange-300 transform hover:scale-140 transition duration-500
              `}
        >
          <div className="text-gray-700/50 absolute  top-0 left-1/2 -translate-x-1/2">
            Section Preview
          </div>
          <h3 className="mb-3 text-xl font-bold  drop-shadow">
            {gradeLevel} - {sectionName}
          </h3>
          <div className="relative rounded-xl shadow-md shadow-black/40">
            {imageType == "png" ? (
              <>
                <img
                  className={`w-full rounded-xl h-48 object- opacity-100
              `}
                  src={require("../assets/uploads/" + imageUrl + ".png")}
                  onError={(e) => {
                    e.target.src = require("../assets/images/error.jpg");
                  }}
                  alt=""
                />
              </>
            ) : imageType == "jpg" ? (
              <>
                <img
                  className={`w-full rounded-xl h-48 object- opacity-100
                `}
                  src={require("../assets/uploads/" + imageUrl + ".jpg")}
                  onError={(e) => {
                    e.target.src = require("../assets/images/error.jpg");
                  }}
                  alt=""
                />
              </>
            ) : imageType == "jpeg" ? (
              <>
                <img
                  className={`w-full rounded-xl h-48 object- opacity-100
                  `}
                  src={require("../assets/uploads/" + imageUrl + ".jpeg")}
                  onError={(e) => {
                    e.target.src = require("../assets/images/error.jpg");
                  }}
                  alt=""
                />
              </>
            ) : (
              <img
                className={`w-full rounded-xl h-48 object- opacity-100
                  `}
                src={require("../assets/uploads/" + imageUrl + ".png")}
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
                {sex == "Male" ? "Sir " : "Maam "}
                {teacherName}
              </p>
            </div>
            <div className="flex space-x-3 items-center">
              <span className="text-2xl"> Students: </span>
              <p className="pt-1 text-xl">## Students</p>
            </div>
          </div>
          <a>
            <button
              className={`mt-3 text-xl w-full  py-2 rounded-xl  shadow-lg text-gray-300 bg-gray-500/90`}
              disabled
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

    return (
      <>
        <div className="p-12">
          <div className="grid grid-cols-2">
            <div className="pt-24 text-xl">
              <form
                action=""
                className="overflow-hidden"
                autocomplete="off"
                onSubmit={(e) => onSubmit(e)}
              >
                <div className="flex mb-[10rem]">
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
                    <option className="">Grade 8</option>
                    <option className="">Grade 9</option>
                    <option className="">Grade 10</option>
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
                    Adviser Surname:{" "}
                  </label>
                  <input
                    name="adviserName"
                    type="text"
                    placeholder="Enter Adviser Surname"
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

                <div className="inline-flex w-full mt-6">
                  <label
                    htmlFor="sex"
                    className="inline-block pt-2 w-[10rem] text-right"
                  >
                    Adviser's Gender:{" "}
                  </label>
                  <div className="ml-3 mt-2.5">
                    <input
                      name="sex"
                      type="radio"
                      className=""
                      value="Male"
                      checked={values.sex === "Male"}
                      onChange={handleChange}
                    />{" "}
                    Male
                    <input
                      name="sex"
                      type="radio"
                      className="ml-4"
                      value="Female"
                      checked={values.sex === "Female"}
                      onChange={handleChange}
                    />{" "}
                    Female
                  </div>
                </div>
                {touched.sex ||
                  (errors.sex && (
                    <p className="text-base text-red-500 absolute ml-[11rem]">
                      {errors.sex}
                    </p>
                  ))}
              </form>
            </div>
            <div className=" w-full h-full pt-24 pl-28">
              {sectionCard(
                values.gradeLevel,
                values.sectionName,
                values.adviserName,
                values.sex
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  function resetStates() {
    setCustomEquationsState("hidden");
    setCreateQuestionState("hidden");
    setEditAccountState("hidden");
    setAddSectionState("hidden");
  }

  const [currentTab, setCurrentTab] = useState("");
  const [showCustomEquations, setCustomEquationsState] = useState("hidden");
  const [showCreateQuestion, setCreateQuestionState] = useState("hidden");
  const [showEditAccount, setEditAccountState] = useState("hidden");
  const [showAddSection, setAddSectionState] = useState("hidden");

  return (
    <>
      <section className="h-[92.5vh] flex items-center justify-center ">
        <div className="py-20 w-[70%] ">
          <main className=" relative h-[50rem] bg-white border-l-12 border-b-12 border-yellow-700  rounded-6xl shadow-2xl shadow-yellow-400 overflow-hidden ">
            <div className="flex w-full  overflow-hidden h-full">
              <div className="bg-mainBGBrown w-64 pt-2 border-l-12 border-r-12 border-mainBGBrown text-xl font-semibold text-center">
                <div className="bg-yellow-700 rounded-t-3xl">
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
                    Custom Equations
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
                    Create Equation
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
                        JSON.stringify(3)
                      );
                    }}
                    className={`cursor-pointer py-2 my-1.5 rounded-t-3xl border-b-8 ease-in-out transform transition duration-150 ${
                      currentTab == "editStudent"
                        ? "  text-gray-800 bg-[#bcbcbc] border-b-gray-600/90"
                        : "text-gray-700 border-gray-400  hover:border-gray-500/90 bg-[#f1f1f1] hover:text-gray-800 hover:bg-[#b3b3b3]"
                    }`}
                  >
                    Edit Student Info
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
                    Add Section
                  </div>

                  <div className="cursor-pointer py-2 my-1.5 rounded-t-3xl text-gray-700 border-gray-400 border-b-8 hover:border-gray-500/90 bg-[#f1f1f1] hover:text-gray-800 hover:bg-[#b3b3b3] ease-in-out transform transition duration-150">
                    Edit Section
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
                          {equationList.map((equation) => (
                            <>
                              {equation.EquationType == "Easy" ? (
                                <div className="border-b-2 flex justify-center relative hover:bg-gray-200">
                                  <p className="">{equation.EquationString}</p>
                                  <button
                                    className="absolute right-0 text-red-500   inline-block hover:bg-red-600 hover:text-white rounded-full top-1"
                                    title="Remove Equation"
                                  >
                                    <MdClose />
                                  </button>
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
                                <div className="border-b-2">
                                  {equation.EquationString}
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
                                <div className="border-b-2">
                                  {equation.EquationString}
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
                  <div className={showEditAccount}>{EditStudentInfo()}</div>
                  <div className={showAddSection}>{addSection()}</div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </section>
    </>
  );
}
