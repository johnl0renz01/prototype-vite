import React, { Component } from "react";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as ReactDOM from "react-dom";
import $ from "jquery";

import QuestionList from "./questionList";
import EquationSolver from "./equationSolver";
import MY_API_KEY from "./API_KEY";

import EquationGeneratorEasy from "./equationsEasy";
import EquationGeneratorAverage from "./equationsAverage";
import EquationGeneratorDifficult from "./equationsDifficult";

export default function DifficultyPage() {
  document.body.style.height = "100vh";
  const navigate = useNavigate();

  //FOR LINKS/NAVBAR/BREADCRUMBS
  const [pageList, setPageList] = useState([]);
  const [pageLink, setPageLink] = useState([]);

  useEffect(() => {
    setPage();

    window.addEventListener("focus", setPage);
    function setPage() {
      let page = ["Home", "Difficulty"];
      let link = ["/Homepage", "/Difficulty"];
      setPageList(page);
      setPageLink(link);
      window.localStorage.setItem("NAVBAR_PAGE", JSON.stringify(pageList));
      window.localStorage.setItem("NAVBAR_PAGE_LINK", JSON.stringify(pageLink));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("NAVBAR_PAGE", JSON.stringify(pageList));
  }, [pageList]);

  useEffect(() => {
    window.localStorage.setItem("NAVBAR_PAGE_LINK", JSON.stringify(pageLink));
  }, [pageLink]);

  //END END END END END END END END END END END END

  function WhiteboardPage() {
    let page = ["Home", "Difficulty", "Whiteboard"];
    let link = ["/Homepage", "/Difficulty", "/Whiteboard"];
    setPageList(page);
    setPageLink(link);

    window.localStorage.setItem("NAVBAR_PAGE", JSON.stringify(pageList));
    window.localStorage.setItem("NAVBAR_PAGE_LINK", JSON.stringify(pageLink));
    setTimeout(proceed, 1000);

    function proceed() {
      navigate("/Whiteboard");
    }
  }

  //FOR QUESTIONS
  const [rawList, setRawList] = useState("");
  const [questionArray, setQuestionArray] = useState([]);
  const [questionList, setQuestions] = useState([]);
  const [result, setResult] = useState([]);

  useEffect(() => {
    const data = window.localStorage.getItem("QUESTION_LIST");
    if (data !== null) setQuestions(JSON.parse(data));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("QUESTION_LIST", JSON.stringify(questionList));
  }, [questionList]);

  /*
    const getData = () => {
        fetch('http://localhost:80/Prototype-React/my-app/api/setVariables.php')
        .then((response)=>response.json())
        .then((responseJson)=>
        {
            console.log(responseJson);
        })
    };

    

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = $(e.target);
        $.ajax({
            type: "POST",
            url: form.attr("action"),
            data: form.serialize(),
            success(data) {
                setResult(data);
            },
        
        });
        /*
        axios.post(`http://localhost:80/Prototype-React/my-app/api/setVariables.php`).then(function(response){
            console.log("axios is: " + response.data);
        });
        axios.post(`http://localhost:80/Prototype-React/my-app/api/data.php`, rawList).then(function(response){
            console.log("axios is: " + response.data);
        });
       
    };
   */
  const [option, setOption] = useState("");
  const [picked, isPicked] = useState(false);

  //var difficultyType = "";
  var equationList = [];
  var option_1 = document.getElementById("option_1");
  var option_2 = document.getElementById("option_2");
  var option_3 = document.getElementById("option_3");

  /* REMOVED
    const easyType = () => {
      difficultyType = "easy";
      setOption("easy");
      isPicked(true);
      resetCheck();
      ReactDOM.findDOMNode(option_1).style.visibility = "visible";
    };
  */

  const easyType = () => {
    equationList = EquationGeneratorEasy.getEquationList();
    setQuestions(equationList);
    setOption("easy");
    isPicked(true);
    resetCheck();
    ReactDOM.findDOMNode(option_1).style.visibility = "visible";
  };

  const averageType = () => {
    equationList = EquationGeneratorAverage.getEquationList();
    setQuestions(equationList);
    setOption("average");
    isPicked(true);
    resetCheck();
    ReactDOM.findDOMNode(option_2).style.visibility = "visible";
  };

  const difficultType = () => {
    equationList = EquationGeneratorDifficult.getEquationList();
    setQuestions(equationList);
    setOption("difficult");
    isPicked(true);
    resetCheck();
    ReactDOM.findDOMNode(option_3).style.visibility = "visible";
  };

  function resetCheck() {
    ReactDOM.findDOMNode(option_1).style.visibility = "hidden";
    ReactDOM.findDOMNode(option_2).style.visibility = "hidden";
    ReactDOM.findDOMNode(option_3).style.visibility = "hidden";
  }

  const pickDifficulty = () => {
    /* REMOVED
    var equationList = [];
    console.log(difficultyType);
    if (difficultyType == "easy") {
      equationList = EquationGeneratorEasy.getEquationList();
    } else if (difficultyType == "average") {
      equationList = EquationGeneratorAverage.getEquationList();
    } else if (difficultyType == "difficult") {
      equationList = EquationGeneratorDifficult.getEquationList();
    }

    setQuestions(equationList);
    */

    window.localStorage.setItem("QUESTION_LIST", JSON.stringify(questionList));
    window.localStorage.setItem("QUESTION_INDEX", "0");
    WhiteboardPage();
  };

  // CHATGPT GENERATED EQUATIONS
  /*
  function pickDifficulty() {
    console.log(difficultyType);
    var prompt = "";
    if (difficultyType == "easy") {
      prompt =
        '{"text":" Generate 5 linear equation to solve for, only 1 variable, it must be very difficult level and distinct to each other. The equation should be similiar as this example: 9x + 13 = -4x, or much even complicated, randomize each equation, include multiplication symbol between expressions, values can range from 1 to 1000. Put each equation inside bracket []"}';
    } else if (difficultyType == "average") {
      prompt =
        '{"text":" Generate 5 linear equation to solve for, only 1 variable, it must be very difficult level and distinct to each other. The equation should be similiar as this example: 23x + 2 = 13x - 26, or much even complicated, randomize each equation, include multiplication symbol between expressions, values can range from 1 to 1000. Put each equation inside bracket []"}';
    } else if (difficultyType == "difficult") {
      prompt =
        '{"text":" Generate 5 linear equation to solve for, only 1 variable, it must be very difficult level and distinct to each other. The equation should be similiar as this example: 2(3x-5) = 3(4x+2), or much even complicated, randomize each equation, include multiplication symbol between expressions, values can range from 1 to 1000. Put each equation inside bracket []"}';
    }

    var equationString = "";
    const options = {
      method: "POST",
      url: "https://chatgpt-ai-chat-bot.p.rapidapi.com/ask",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": MY_API_KEY.getGPT_KEY(),
        "X-RapidAPI-Host": "chatgpt-ai-chat-bot.p.rapidapi.com",
      },
      data: prompt,
    };

    //Generate 5 linear equation to solve for, only 1 variable, it must be very difficult level and distinct to each other. The equation should be similiar as this example: 2(3x-5) = 3(4x+2), or much even complicated, randomize each equation, include multiplication symbol between expressions, values can range from 1-1000. Put each equation inside bracket []

    axios
      .request(options)
      .then(function (response) {
        var equationList = [];

        console.log(response);
        console.log(response.data);
        console.log(response.data.split(""));

        let dataSplit = response.data.split("");
        setRawList(response.data);
        let firstBracket = 0;
        let secondBracket = 0;

        for (let i = 0; i < dataSplit.length; i++) {
          let closingBracket = false;
          if (dataSplit[i].match(/[\[]/)) {
            firstBracket = i;
          } else if (dataSplit[i].match(/[\]]/)) {
            secondBracket = i;
            closingBracket = true;
          }

          if (closingBracket) {
            let equation = [
              dataSplit.slice(firstBracket + 1, secondBracket),
            ].join("");
            equation = equation.replaceAll(",", "");
            equationString = equation;
            console.log("this isequation: " + equationString);
            equationList.push(equationString);
            closingBracket = false;
          }
        }

        setQuestions(equationList);
        console.log(questionList);

        console.log(equationList[0]);
        //QuestionList.setQuestionString(equationString);

        console.log("THE length: " + equationList.length);
        if (equationList.length > 5) {
          pickDifficulty();
        } else {
          computeEquation();
        }

        function computeEquation() {
          var equationValid = false;
          var checkEquation = "";
          for (let i = 0; i < equationList.length; i++) {
            EquationSolver.setEquation(equationList[i]);
            checkEquation = EquationSolver.getEquationAnswer();
            if (checkEquation == "invalid") {
              equationValid = false;
              break;
            } else {
              equationValid = true;
            }
          }
          if (equationValid) {
            //WhiteboardPage();
            //setQuestionArray((oldArray) => [...oldArray, equationList]);
            //console.log(questionArray);
          } else {
            pickDifficulty();
          }
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  */

  return (
    <>
      <section>
        {/* <input type="text" value={result} className="w-full"></input>*/}
        <div className="mx-auto my-16 w-9/12 select-none">
          <div className="px-12">
            <div className="px-6 pb-6 pt-10 rounded-6xl  border-l-12 border-b-12 border-gray-600/60 bg-gradient-to-t from-gray-200 via-white to-white border-r-12 border-r-gray-300/80 shadow-2xl shadow-yellow-400">
              <div className="px-14   rounded-4xl  mx-auto ">
                <div className="grid grid-rows-3 mx-auto sm:text-center  ">
                  <p className=" text-4xl font-semibold leading-none text-center ">
                    Select the session difficulty level
                  </p>
                </div>
                <div className="w-full grid gap-x-[4rem] row-gap-5 lg:grid-cols-3 -mt-10 select-none">
                  <button
                    name="easy"
                    onClick={easyType}
                    className={`w-full transform transition duration-500 hover:scale-105  ${
                      option == "easy" ? "scale-105 " : ""
                    }`}
                  >
                    <div className="relative h-12 w-20 m-auto bg-gray-400 rounded-tl-full rounded-tr-full border-l-4 border-l-gray-500 border-r-4 border-r-gray-300"></div>
                    <div className="relative -mt-9 h-9 w-12 pl-1 border-r-4 border-gray-500 m-auto bg-white rounded-tl-full rounded-tr-full "></div>

                    <div className="relative -mt-10">
                      <div className="relative rounded-5xl bg-gray-600 w-7/12 h-14 mx-auto mt-6 z-10 border-l-6 border-b-6 border-gray-700/80 border-r-6 border-r-gray-500 overflow-hidden"></div>
                      <div
                        className={`relative  hover:shadow-xl transform transition duration-500 hover:text-green-500 hover:shadow-green-400 -mt-10 bg-mainBGBrown rounded-4xl border-l-8 border-b-8 border-yellow-700 border-r-8 border-r-brTwo shadow-md  pl-8 pr-8 py-6 pb-12 ${
                          option == "easy"
                            ? "shadow-xl shadow-green-500 text-green-500"
                            : " shadow-yellow-900/90 text-gray-700"
                        }`}
                      >
                        <div className="border-l-4 border-b-4 border-gray-600/60 border-r-4 border-r-gray-300/80 shadow-md shadow-yellow-800 ">
                          <div className="bg-white border-b-2 border-black/70  pt-6 pb-2">
                            <p className=" text-xl left-0 right-0 font-bold leading-none sm:text-3xl text-center text-white">
                              EASY
                            </p>
                            <p className="absolute text-xl z-10 left-0 right-0 top-[46.5px] font-bold leading-none sm:text-3xl text-center">
                              EASY
                            </p>
                            <p className="absolute pt-0.5 text-gray-800/70 left-0 right-0 top-[47px] text-xl font-bold leading-none sm:text-3xl text-center">
                              EASY
                            </p>
                          </div>
                          <div className="text-black/80">
                            <div className="bg-white grid grid-cols-4 text-left border-b-2 border-black/70">
                              <div className="rounded-full border-3  border-black/80 h-9 w-9 m-auto text-center text-lg font-semibold">
                                1
                              </div>
                              <div className="col-span-3">
                                <p className="w-full  rounded lg:text-1.5xl  sm:text-md  py-3">
                                  2x - 2 = 1
                                </p>
                              </div>
                            </div>
                            <div className="bg-white grid grid-cols-4 text-left border-b-2 border-black/70">
                              <div className="rounded-full border-3 border-black/80  h-9 w-9 m-auto text-center text-lg font-semibold">
                                2
                              </div>
                              <div className="col-span-3">
                                <p className="w-full  rounded lg:text-1.5xl  sm:text-md  py-3">
                                  3x = -4
                                </p>
                              </div>
                            </div>
                            <div className="bg-white grid grid-cols-4 text-left border-b-2 border-black/70">
                              <div className="rounded-full border-3 border-black/80  h-9 w-9 m-auto text-center text-lg font-semibold">
                                3
                              </div>
                              <div className="col-span-3">
                                <p className="w-full  rounded lg:text-1.5xl  sm:text-md  py-3">
                                  9x + 13 = -4x
                                </p>
                              </div>
                            </div>
                            <div className="bg-white grid grid-cols-4 text-left border-b-2 border-black/70">
                              <div className="rounded-full border-3 border-black/80  h-9 w-9 m-auto text-center text-lg font-semibold">
                                4
                              </div>
                              <div className="col-span-3">
                                <p className="w-full  rounded lg:text-1.5xl  sm:text-md  py-3">
                                  23x - 72 = 36
                                </p>
                              </div>
                            </div>
                            <div className="bg-white grid grid-cols-4 text-left border-b-2 border-black/70">
                              <div className="rounded-full border-3 border-black/80  h-9 w-9 m-auto text-center text-lg font-semibold">
                                5
                              </div>
                              <div className="col-span-3">
                                <p className="w-full  rounded lg:text-1.5xl  sm:text-md  py-3">
                                  4 - x = 6x
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="bg-white py-4"></div>
                        </div>
                      </div>
                    </div>
                    <div
                      id="option_1"
                      className="invisible absolute w-24 h-24 -right-4 -bottom-4 border-white/70 border-6 rounded-full bg-gray-300 z-10 overflow-hidden "
                    >
                      <div className="mx-auto pt-4  bg-green-500 h-full">
                        <svg
                          className="mx-auto h-14 w-14 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          {" "}
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    </div>
                  </button>
                  {/*  </form> */}

                  {/*<!--Average-->*/}

                  <button
                    name="average"
                    onClick={averageType}
                    className={`w-full transform transition duration-500 hover:scale-105  ${
                      option == "average" ? "scale-105 " : ""
                    }`}
                  >
                    <div className="relative h-12 w-20 m-auto bg-gray-400 rounded-tl-full rounded-tr-full border-l-4 border-l-gray-500 border-r-4 border-r-gray-300"></div>
                    <div className="relative -mt-9 h-9 w-12 pl-1 border-r-4 border-gray-500 m-auto bg-white rounded-tl-full rounded-tr-full "></div>

                    <div className="relative -mt-10">
                      <div className="relative rounded-5xl bg-gray-600 w-7/12 h-14 mx-auto mt-6 z-10 border-l-6 border-b-6 border-gray-700/80 border-r-6 border-r-gray-500 overflow-hidden"></div>
                      <div
                        className={`relative -mt-10 transform transition duration-500 hover:shadow-xl hover:text-yellow-500 hover:shadow-yellow-400 bg-mainBGBrown rounded-4xl border-l-8 border-b-8 border-yellow-700 border-r-8 border-r-brTwo shadow-md pl-8 pr-8 py-6 pb-12 ${
                          option == "average"
                            ? "shadow-xl shadow-yellow-500 text-yellow-500"
                            : " shadow-yellow-900/90 text-gray-700"
                        }`}
                      >
                        <div className="border-l-4 border-b-4 border-gray-600/60 border-r-4 border-r-gray-300/80 shadow-md shadow-yellow-800">
                          <div className="bg-white border-b-2 border-black/70 py-4">
                            <p className=" text-xl left-0 right-0 font-bold leading-none sm:text-3xl text-center text-white">
                              AVERAGE
                            </p>
                            <p className="absolute text-xl z-10 left-0 right-0 top-[46.5px] font-bold leading-none sm:text-3xl text-center">
                              AVERAGE
                            </p>
                            <p className="absolute pt-0.5 text-gray-800/70 left-0 right-0 top-[47px] text-xl font-bold leading-none sm:text-3xl text-center">
                              AVERAGE
                            </p>
                          </div>
                          <div className="text-black/80">
                            <div className="bg-white grid grid-cols-4 text-left border-b-2 border-black/70">
                              <div className="rounded-full border-3  border-black/80 h-9 w-9 m-auto text-center text-lg font-semibold">
                                1
                              </div>
                              <div className="col-span-3">
                                <p className="w-full  rounded lg:text-1.5xl  sm:text-md  py-3">
                                  16x + 3 = 3x - 2
                                </p>
                              </div>
                            </div>
                            <div className="bg-white grid grid-cols-4 text-left border-b-2 border-black/70">
                              <div className="rounded-full border-3 border-black/80  h-9 w-9 m-auto text-center text-lg font-semibold">
                                2
                              </div>
                              <div className="col-span-3">
                                <p className="w-full  rounded lg:text-1.5xl  sm:text-md  py-3">
                                  23x + 2 = 13x - 26
                                </p>
                              </div>
                            </div>
                            <div className="bg-white grid grid-cols-4 text-left border-b-2 border-black/70">
                              <div className="rounded-full border-3 border-black/80  h-9 w-9 m-auto text-center text-lg font-semibold">
                                3
                              </div>
                              <div className="col-span-3">
                                <p className="w-full  rounded lg:text-1.5xl  sm:text-md  py-3">
                                  5x - 2 = 2x + 9
                                </p>
                              </div>
                            </div>
                            <div className="bg-white grid grid-cols-4 text-left border-b-2 border-black/70">
                              <div className="rounded-full border-3 border-black/80  h-9 w-9 m-auto text-center text-lg font-semibold">
                                4
                              </div>
                              <div className="col-span-3">
                                <p className="w-full  rounded lg:text-1.5xl  sm:text-md  py-3">
                                  32x - 11 = 16 + 47x
                                </p>
                              </div>
                            </div>
                            <div className="bg-white grid grid-cols-4 text-left border-b-2 border-black/70">
                              <div className="rounded-full border-3 border-black/80  h-9 w-9 m-auto text-center text-lg font-semibold">
                                5
                              </div>
                              <div className="col-span-3">
                                <p className="w-full  rounded lg:text-1.5xl  sm:text-md  py-3">
                                  75x - 42 + 25x = 6x
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="bg-white py-4"></div>
                        </div>
                      </div>
                    </div>
                    <div
                      id="option_2"
                      className="invisible absolute w-24 h-24 -right-4 -bottom-4 border-white/70 border-6 rounded-full bg-gray-300 z-10 overflow-hidden"
                    >
                      <div className="m-auto pt-4 bg-yellow-500 h-full">
                        <svg
                          className="mx-auto h-14 w-14 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          {" "}
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    </div>
                  </button>

                  {/*<!--DIFFICULT-->*/}

                  <button
                    name="difficult"
                    onClick={difficultType}
                    className={`w-full transform transition duration-500 hover:scale-105  ${
                      option == "difficult" ? "scale-105 " : ""
                    }`}
                  >
                    <div className="relative h-12 w-20 m-auto bg-gray-400 rounded-tl-full rounded-tr-full border-l-4 border-l-gray-500 border-r-4 border-r-gray-300"></div>
                    <div className="relative -mt-9 h-9 w-12 pl-1 border-r-4 border-gray-500 m-auto bg-white rounded-tl-full rounded-tr-full "></div>

                    <div className="relative -mt-10">
                      <div className="relative rounded-5xl bg-gray-600 w-7/12 h-14 mx-auto mt-6 z-10 border-l-6 border-b-6 border-gray-700/80 border-r-6 border-r-gray-500 overflow-hidden"></div>
                      <div
                        className={`relative -mt-10  transform transition duration-500 hover:shadow-xl hover:text-red-500 hover:shadow-red-500 bg-mainBGBrown rounded-4xl border-l-8 border-b-8 border-yellow-700 border-r-8 border-r-brTwo shadow-md  pl-8 pr-8 py-6 pb-12 ${
                          option == "difficult"
                            ? "shadow-xl shadow-red-500 text-red-500"
                            : " shadow-yellow-900/90 text-gray-700"
                        }`}
                      >
                        <div className="border-l-4 border-b-4 border-gray-600/60 border-r-4 border-r-gray-300/80 shadow-md shadow-yellow-800 ">
                          <div className="bg-white border-b-2 border-black/70 py-4">
                            <p className=" text-xl left-0 right-0 font-bold leading-none sm:text-3xl text-center text-white">
                              DIFFICULT
                            </p>
                            <p className="absolute text-xl z-10 left-0 right-0 top-[46.5px] font-bold leading-none sm:text-3xl text-center">
                              DIFFICULT
                            </p>
                            <p className="absolute pt-0.5 text-gray-800/70 left-0 right-0 top-[47px] text-xl font-bold leading-none sm:text-3xl text-center">
                              DIFFICULT
                            </p>
                          </div>
                          <div className="text-black/80">
                            <div className="bg-white grid grid-cols-4 text-left border-b-2 border-black/70">
                              <div className="rounded-full border-3 border-black/80 h-9 w-9 m-auto text-center text-lg font-semibold">
                                1
                              </div>
                              <div className="col-span-3">
                                <p className="w-full  rounded lg:text-1.5xl  sm:text-md py-3">
                                  2(3x - 5) = 3(4x + 2)
                                </p>
                              </div>
                            </div>
                            <div className="bg-white grid grid-cols-4 text-left border-b-2 border-black/70">
                              <div className="rounded-full border-3 border-black/80  h-9 w-9 m-auto text-center text-lg font-semibold">
                                2
                              </div>
                              <div className="col-span-3">
                                <p className="w-full  rounded lg:text-1.5xl  sm:text-md  py-3">
                                  4(2x - 1) = 2(3x - 8)
                                </p>
                              </div>
                            </div>
                            <div className="bg-white grid grid-cols-4 text-left border-b-2 border-black/70">
                              <div className="rounded-full border-3 border-black/80  h-9 w-9 m-auto text-center text-lg font-semibold">
                                3
                              </div>
                              <div className="col-span-3">
                                <p className="w-full  rounded lg:text-1.5xl  sm:text-md  py-3">
                                  7(x - 1) = -5(x + 5)
                                </p>
                              </div>
                            </div>
                            <div className="bg-white grid grid-cols-4 text-left border-b-2 border-black/70">
                              <div className="rounded-full border-3 border-black/80  h-9 w-9 m-auto text-center text-lg font-semibold">
                                4
                              </div>
                              <div className="col-span-3">
                                <p className="w-full  rounded lg:text-1.5xl  sm:text-md  py-3">
                                  10x + 5(2x-3) = 42x
                                </p>
                              </div>
                            </div>
                            <div className="bg-white grid grid-cols-4 text-left border-b-2 border-black/70">
                              <div className="rounded-full border-3 border-black/80  h-9 w-9 m-auto text-center text-lg font-semibold">
                                5
                              </div>
                              <div className="col-span-3">
                                <p className="w-full  rounded lg:text-1.5xl  sm:text-md  py-3">
                                  8(3x + 6) = 3(2 - 32x)
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="bg-white py-4"></div>
                        </div>
                      </div>
                    </div>
                    <div
                      id="option_3"
                      className="invisible absolute w-24 h-24 -right-4 -bottom-4 border-white/70 border-6 rounded-full bg-gray-300 z-10 overflow-hidden"
                    >
                      <div className="m-auto pt-4 bg-red-500 h-full">
                        <svg
                          className="mx-auto h-14 w-14 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          {" "}
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    </div>
                  </button>
                </div>
                <div className="w-full mx-auto text-center pt-[70px] pb-12">
                  <button
                    onClick={picked ? pickDifficulty : ""}
                    className={`inline-flex items-center justify-center text-xl rounded-full h-12 lg:w-52 font-medium tracking-wide  shadow-md   
                      ${
                        !picked
                          ? "aria-disabled: text-gray-100 bg-gray-500/50 cursor-help"
                          : "text-white bg-lime-600 hover:bg-lime-700 focus:shadow-outline focus:outline-none hover:-translate-y-0.5 ease-in-out transition duration-200 transform"
                      }`}
                    {...(!picked
                      ? {
                          title:
                            "Select difficulty first in order to continue.",
                        }
                      : {})}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
