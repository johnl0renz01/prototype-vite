import React from "react";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import EquationGeneratorAverage from "./equationsAverage";
import EquationGeneratorDifficult from "./equationsDifficult";
import EndSession from "./EndSession";
import FeedbackList from "./FeedbackList";

const FinishSessionModal = ({ visible, onClose, onContinue }) => {
  const navigate = useNavigate();
  const handleOnClose = (e) => {
    if (e.target.id === "mainContainer") onClose();
  };

  const [difficulty, setDifficulty] = useState("");
  const [answered, setAnswered] = useState("");
  const [abandoned, setAbandoned] = useState("");
  const [timeSpent, setTimeSpent] = useState("");

  const [feedback, setFeedback] = useState("");

  const [levelOption, setLevelUp] = useState(false);

  useEffect(() => {
    let data1 = JSON.parse(window.localStorage.getItem("DIFFICULTY_TYPE"));
    if (data1 !== null) {
      setDifficulty(data1);
    }
    let data2 = JSON.parse(window.localStorage.getItem("QUESTION_ANSWERED"));
    if (data2 !== null) {
      setAnswered(data2);
    }

    let data3 = JSON.parse(window.localStorage.getItem("QUESTION_ABANDONED"));
    if (data3 !== null) {
      setAbandoned(data3);
    } else {
      data3 = 0;
    }

    let session = JSON.parse(window.localStorage.getItem("SESSION_END"));
    if (session == true) {
      EndSession.recordData();
      getTimeSpent();

      function getTimeSpent() {
        let sessionID = window.localStorage.getItem("SESSION_ID");
        var userLogs = window.localStorage.getItem("SESSION_USER_LOGS");
        userLogs = userLogs + "@" + sessionID;
        userLogs = userLogs.replace(/"/g, "");
        axios
          .get(
            `http://localhost:80/Prototype-Vite/my-project/api/getTimeSpent/${userLogs}`
          )
          .then(function (response) {
            setTimeSpent(response.data);
          });
      }
    }

    let isLevelUp = JSON.parse(window.localStorage.getItem("SESSION_LEVEL_UP"));
    if (isLevelUp !== null) {
      setLevelUp(true);
    }

    let feedbackMessage = "";
    if (data3 == 0) {
      if (isLevelUp !== null) {
        feedbackMessage = FeedbackList.GenerateMessage("advanceLevel");
      } else {
        feedbackMessage = FeedbackList.GenerateMessage("abandonNone");
      }
    } else if (data3 >= 15) {
      feedbackMessage = FeedbackList.GenerateMessage("abandonHighest");
    } else if (data3 >= 10) {
      feedbackMessage = FeedbackList.GenerateMessage("abandonHigh");
    } else if (data3 >= 4) {
      feedbackMessage = FeedbackList.GenerateMessage("abandonNormal");
    } else if (data3 >= 2) {
      feedbackMessage = FeedbackList.GenerateMessage("abandonLow");
    } else if (data3 == 1) {
      feedbackMessage = FeedbackList.GenerateMessage("abandonLowest");
    }

    setFeedback(feedbackMessage);
  });

  const levelUp = () => {
    let isLevelUp = JSON.parse(window.localStorage.getItem("SESSION_LEVEL_UP"));
    window.localStorage.removeItem("SESSION_LEVEL_UP");
    var equationList = [];
    var option = "";
    var difficultyType = "";
    if (isLevelUp == "average") {
      equationList = EquationGeneratorAverage.getEquationList(20);
      option = "average";
      difficultyType = "Average";
    }
    if (isLevelUp == "difficult") {
      equationList = EquationGeneratorDifficult.getEquationList(20);
      option = "difficult";
      difficultyType = "Difficult";
    }

    window.localStorage.setItem("SESSION_SCORE", 0);
    window.localStorage.setItem("QUESTION_LIST", JSON.stringify(equationList));
    window.localStorage.setItem("QUESTION_INDEX", "0");
    var userLogs = window.localStorage.getItem("SESSION_USER_LOGS");
    userLogs = userLogs + "@" + option;
    userLogs = userLogs.replace(/"/g, "");
    axios
      .post(
        `http://localhost:80/Prototype-Vite/my-project/api/selectDifficulty/${userLogs}`
      )
      .then(function (response) {
        window.localStorage.setItem(
          "SESSION_ID",
          JSON.stringify(response.data)
        );
        window.localStorage.setItem(
          "DIFFICULTY_TYPE",
          JSON.stringify(difficultyType)
        );
        window.localStorage.removeItem("TIME_SPENT");
        window.location.reload(false);
      });
  };

  const homePage = () => {
    navigate("/Homepage");
  };

  if (!visible) return null;

  /*
    Great job on persisting through the equations and answering
    most of them correctly! Remember to take your time and
    review the questions carefully. Keep up the good work and
    continue to persevere!
  */
  return (
    <>
      <div
        id="mainContainer"
        onClick={handleOnClose}
        className="fixed top-0 inset-0 z-50 bg-black bg-opacity-80 backdrop-blur-[10px] flex justify-center items-center"
      >
        <div className="bg-white w-1/3 rounded text-lg  ">
          <div className="pt-1 text-center text-xl font-semibold bg-gray-400 border-b-2 border-gray-300 h-9">
            <p className="text-gray-800">Session Summary</p>
          </div>
          <div className="text-center text-gray-800">
            <div className="p-4 text-xl font-semibold">
              <div className="flex bg-gray-800 w-full p-4 rounded-2xl min-h-[15rem] overflow-hidden">
                <div
                  id="image_bg"
                  className="relative flex items-center text-center justify-center rounded-2xl h-52 my-auto bg-gray-200  object-cover w-[15rem]  overflow-hidden"
                >
                  <img
                    className="absolute bottom-0  pt-2 -mb-4"
                    src={require("../assets/facial_expressions/PIA-Smiling2.png")}
                  ></img>
                </div>
                <div className="text-gray-200 text-xl font-normal text-justify flex items-center w-full p-2 px-10 -mt-2 break-words">
                  <p>{feedback}</p>
                </div>
              </div>

              <p className="mt-3 mb-2 py-2 rounded-lg bg-green-500">
                <span className="text-gray-800 text-2xl font-semibold ">
                  Difficulty: {difficulty}
                </span>
              </p>
              <div className="grid grid-cols-3 gap-x-2 text-base text-gray-600 pb-2 select-none">
                <div className="relative bg-gray-300  rounded-lg w-full h-[6rem] overflow-hidden">
                  <div className="absolute z-10 left-0 right-0 top-1/3 ">
                    <p>
                      <span className="text-4xl text-gray-700">{answered}</span>
                    </p>
                    <p>Answered</p>
                  </div>

                  <img
                    className="relative  opacity-30 w-28 mt-3 -ml-6 -rotate-[25deg]"
                    src={require("../assets/icons/check.png")}
                    alt=""
                  ></img>
                </div>
                <div className="relative bg-gray-300  rounded-lg w-full h-[6rem] overflow-hidden">
                  <div className="absolute z-10 left-0 right-0 top-1/3 ">
                    <p>
                      <span className="text-4xl text-gray-700">
                        {abandoned}
                      </span>
                    </p>
                    <p>Unanswered</p>
                  </div>

                  <img
                    className="relative  opacity-30 w-28 mt-3 -ml-6 -rotate-[25deg]"
                    src={require("../assets/icons/question.png")}
                    alt=""
                  ></img>
                </div>
                <div className="relative bg-gray-300  rounded-lg w-full h-[6rem] overflow-hidden">
                  <div className="absolute z-10 left-0 right-0 top-1/3 ">
                    <p>
                      <span className="text-4xl text-gray-700">
                        {timeSpent}
                      </span>
                    </p>
                    <p>Time Spent</p>
                  </div>

                  <img
                    className="relative  opacity-30 w-28 mt-3 -ml-6 -rotate-45"
                    src={require("../assets/icons/timer.png")}
                    alt=""
                  ></img>
                </div>
              </div>
            </div>
            <div className="mx-auto text-center border-t-2 border-gray-300 py-3">
              <button
                onClick={levelOption ? levelUp : homePage}
                className="mx-2 text-white bg-gray-600/60 h-10 px-4 inline-block rounded-3xl hover:bg-gray-600 hover:text-gray-100"
              >
                Finish Session
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FinishSessionModal;