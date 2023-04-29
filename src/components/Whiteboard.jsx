import React, { Component } from "react";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as ReactDOM from "react-dom";
import $ from "jquery";

import HintModal from "./HintModal";
import VideoModal from "./VideoModal";
import PenModal from "./PenModal";

import FinishSessionModal from "./FinishSessionModal";
import EquationSolver from "./equationSolver";
import FeedbackList from "./FeedbackList";

import MY_API_KEY from "./API_KEY";

import "../board.css";
//import Board from "./Board.jsx";

export default function Whiteboard() {
  //Clear all  timeouts
  var highestTimeoutId = setTimeout(";");

  document.body.style.height = "100vh";
  const navigate = useNavigate();

  //FOR LINKS/NAVBAR/BREADCRUMBS
  const [pageList, setPageList] = useState([]);
  const [pageLink, setPageLink] = useState([]);

  useEffect(() => {
    setPage();

    window.addEventListener("focus", setPage);
    function setPage() {
      let page = ["Home", "Difficulty", "Whiteboard"];
      let link = ["/Homepage", "/Difficulty", "/Whiteboard"];
      setPageList(page);
      setPageLink(link);
      window.localStorage.setItem("NAVBAR_PAGE", JSON.stringify(pageList));
      window.localStorage.setItem("NAVBAR_PAGE_LINK", JSON.stringify(pageLink));
    }

    const data1 = window.localStorage.getItem("EXPRESSION_HAPPY");
    if (data1 == null)
      window.localStorage.setItem("EXPRESSION_HAPPY", JSON.stringify(0));

    const data2 = window.localStorage.getItem("EXPRESSION_SAD");
    if (data2 == null)
      window.localStorage.setItem("EXPRESSION_SAD", JSON.stringify(0));

    const data3 = window.localStorage.getItem("EXPRESSION_ANGRY");
    if (data3 == null)
      window.localStorage.setItem("EXPRESSION_ANGRY", JSON.stringify(0));

    const data4 = window.localStorage.getItem("EXPRESSION_SURPRISED");
    if (data4 == null)
      window.localStorage.setItem("EXPRESSION_SURPRISED", JSON.stringify(0));

    const data5 = window.localStorage.getItem("SESSION_SCORE");
    if (data5 == null)
      window.localStorage.setItem("SESSION_SCORE", JSON.stringify(0));

    document.getElementById("whiteboard").click();
  }, []);

  useEffect(() => {
    window.localStorage.setItem("NAVBAR_PAGE", JSON.stringify(pageList));
  }, [pageList]);

  useEffect(() => {
    window.localStorage.setItem("NAVBAR_PAGE_LINK", JSON.stringify(pageLink));
  }, [pageLink]);

  //END END END END END END END END END END END END

  const [questionList, setQuestions] = useState([]);
  const questionAnswers = [];
  const questionSteps = [];

  const [coefficientLetter, setCoeffLetter] = useState("");

  useEffect(() => {
    const data = window.localStorage.getItem("QUESTION_LIST");
    if (data !== null) setQuestions(JSON.parse(data));
  }, []);

  function getCoefficient() {
    let data = parseInt(
      JSON.parse(window.localStorage.getItem("QUESTION_INDEX"))
    );
    console.log("DATATASDADA: " + data);
    EquationSolver.setEquation(questionList[data]);
    EquationSolver.getEquationAnswer();
    let coefficient = EquationSolver.getCoefficientLetter();
    setCoeffLetter(coefficient);
  }
  //STRING IS OKAY, FIX THE equation solver shit
  function computeEquation() {
    let isInvalid = false;
    for (let i = 0; i < questionList.length; i++) {
      EquationSolver.setEquation(questionList[i]);

      let answer = EquationSolver.getEquationAnswer();
      let steps = EquationSolver.getEquationSteps();

      //console.log("answe:" + answer);
      console.log("steps is this: " + steps);
      questionAnswers.push(answer);
      questionSteps.push(steps);

      // console.log("COEFEFEFECECE: " + coefficient);

      if (answer == "invalid") {
        isInvalid = true;
        break;
      }
    }

    if (isInvalid) {
      // GO BACK TO DIFFICULTY
      setTimeout(DifficultyPage, 1);
      function DifficultyPage() {
        let page = ["Home", "Difficulty"];
        let link = ["/Homepage", "/Difficulty"];
        setPageList(page);
        setPageLink(link);

        window.localStorage.setItem("NAVBAR_PAGE", JSON.stringify(pageList));
        window.localStorage.setItem(
          "NAVBAR_PAGE_LINK",
          JSON.stringify(pageLink)
        );
        setTimeout(proceed, 1);

        function proceed() {
          navigate("/Difficulty");
        }
      }
    }
  }

  const [currentQuestionIndex, setQuestionIndex] = useState(0);

  useEffect(() => {
    const data = window.localStorage.getItem("QUESTION_INDEX");
    if (data !== null) setQuestionIndex(JSON.parse(data));
  }, []);

  /* TEST CASE

  "3(2x-14)+4x-7=1"
1
: 
"7(5x-20)-3x+8=5"
2
: 
"9(3x+3)+2x-10=2"
3
: 
"2(5x+2)+7x-14=10"
4
: 
"4(6x-13)+5x+15=8"
  */

  const [textInput, setAnswer] = useState("");
  const [textLog, setLog] = useState("");
  const [updatedLog, updateLog] = useState("");

  const [arrTextLog, arrSetLog] = useState([]);

  const [arrUpdatedLog, arrUpdateLog] = useState([]);

  const [imageLink, setImageLink] = useState("PIA-Neutral");

  const [updatedBoard, updateBoard] = useState(textInput);

  // ANSWER OF QUESTION
  // MUST FETCH API

  //console.log("ETO ANG PINAKAMAOUPET: " + questionAnswers[currentQuestionIndex]);
  var ans = "x=";
  ans = ans.concat(questionAnswers[currentQuestionIndex]);
  const [answer, correctAnswer] = useState([]);
  const [answerDisplay, setDisplay] = useState([]);
  const [hint, setHint] = useState([]);
  const [countTally, checkCount] = useState(0);
  const [length, setLength] = useState();

  function currentQuestionTimer() {
    let counter = JSON.parse(window.localStorage.getItem("TIMER"));
    if (counter === null) {
      counter = 1;
    } else {
      counter++;
    }
    window.localStorage.setItem("TIMER", counter);
  }

  useEffect(() => {
    for (let i = 0; i < highestTimeoutId; i++) {
      clearTimeout(i);
    }
    if (
      !JSON.parse(window.localStorage.getItem("FINISHED_EQUATION")) ||
      window.localStorage.getItem("FINISHED_EQUATION") == null
    ) {
      setInterval(currentQuestionTimer, 1000);
    }
  }, []);
  //WINDOW ON LOAD FUNCTION
  window.addEventListener(
    "load",
    function () {
      loadAnswers();
    },
    { once: true }
  );

  const loadAnswers = (e) => {
    //GET CURRENT COEFFICIENT
    getCoefficient();

    let logs = JSON.parse(window.localStorage.getItem("USER_LOGS"));
    if (logs != null) {
      let logsArray = logs.split("‰");
      arrSetLog(logsArray);
      console.log(logsArray);
    }

    function scrollLogs() {
      var objDiv = document.getElementById("logs");
      objDiv.scroll({ top: objDiv.scrollHeight, behavior: "smooth" });
    }

    setTimeout(scrollLogs, 1);

    if (questionAnswers.length == 0) {
      //console.log("before:" + questionAnswers.length);
      computeEquation();
      //console.log("after:" + questionAnswers.length);
    }

    if (countTally === 0) {
      //ans = "x=";
      //ans = ans.concat(questionAnswers[currentQuestionIndex]);
      //console.log(ans);
      //correctAnswer(oldArray => [...oldArray,ans] );
      //
      let steps = questionSteps[currentQuestionIndex];
      //steps.push(ans);
      var equationSteps = [];

      for (let i = 0; i < steps.length; i++) {
        equationSteps.push(steps[i]);
      }
      correctAnswer(equationSteps);

      /*
      for (let i = 0; i< steps.length; i++) {
        console.log("multple steps: " + steps[i]);
        let value = steps[i];
        correctAnswer(oldArray => [...oldArray, value]);
      }
      */
      checkCount(equationSteps.length);
      setLength(equationSteps.length);

      var fixedEquationSteps = [];
      // SET PROPER SPACING
      for (let i = 0; i < equationSteps.length; i++) {
        var currentEquation = equationSteps[i];
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
        fixedEquationSteps.push(fixedString);
      }
      console.log("this is fixedEquationSteps: " + fixedEquationSteps);
      setDisplay(fixedEquationSteps);

      var hintMessage = [];
      if (fixedEquationSteps.length === 1) {
        hintMessage.push(FeedbackList.GenerateMessage("stepFinal"));
      } else if (fixedEquationSteps.length === 2) {
        hintMessage.push(FeedbackList.GenerateMessage("stepSimplify"));
        hintMessage.push(FeedbackList.GenerateMessage("stepFinal"));
      } else if (fixedEquationSteps.length === 3) {
        hintMessage.push(FeedbackList.GenerateMessage("stepArrange"));
        hintMessage.push(FeedbackList.GenerateMessage("stepSimplify"));
        hintMessage.push(FeedbackList.GenerateMessage("stepFinal"));
      } else if (fixedEquationSteps.length === 4) {
        hintMessage.push(FeedbackList.GenerateMessage("stepArithmetic"));
        hintMessage.push(FeedbackList.GenerateMessage("stepArrange"));
        hintMessage.push(FeedbackList.GenerateMessage("stepSimplify"));
        hintMessage.push(FeedbackList.GenerateMessage("stepFinal"));
      }
      hintMessage.push("");
      setHint(hintMessage);

      document.getElementById("whiteboard").click();
      setTimeout(checkAnswered, 1);
    }
  };

  function checkAnswered() {
    let data1 = parseInt(window.localStorage.getItem("FINISHED_STEPS"));
    let data2 = window.localStorage.getItem("FINISHED_EQUATION");
    if (data1 != null && data1 != 0) {
      console.log("yes");
      let currentIndex = data1;
      console.log("CURRINDEX: " + currentIndex);
      ReactDOM.findDOMNode(answerArea).style.visibility = "visible";
      //Display from n to current
      for (let i = 0; i < currentIndex; i++) {
        let element = document.getElementById("answer" + i);
        console.log("ELEMENT: " + element);
        ReactDOM.findDOMNode(element).style.visibility = "visible";
      }
    }

    if (data2 != null && data2 != "false") {
      displaySolved();
    }
  }

  //PIA
  const [textResponse, setResponse] = useState(
    "Please input your solution or answer for this problem."
  );
  const [subtextResponse, setSubtext] = useState("");
  const [questionResponse, setQuestionResponse] = useState("");

  const invalidColor = "#b5b7ba";
  const defaultColor = "#e2e8f0";
  const correctColor = "#6edf12";
  const wrongColor = "#ff5842";
  const angryColor = "#f51d00";
  const hintColor = "#fff700";
  const motivationColor1 = "#ff9900";
  const motivationColor2 = "#ff7700";

  /*

  EXTRA CODE
    window.addEventListener("popstate", (event) => {
    if (
      confirm("Are you sure you want to save this thing into the database?")
    ) {
      // Save it!
      console.log("Thing was saved to the database.");
    } else {
      // Do nothing!
      console.log("Thing was not saved to the database.");
    }
  });
*/

  // BEFORE UNLOAD CODE
  /*
  window.addEventListener("beforeunload", function (e) {
    // Cancel the event
    e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
    // Chrome requires returnValue to be set
    e.returnValue = "";
  });
*/

  var userLogs = "";
  var userNameLogs = "";
  var userName = "";
  useEffect(() => {
    setUserData();
  });

  function setUserData() {
    userName = window.localStorage.getItem("SESSION_USER");
    userName = userName.replace(/"/g, "");
    userNameLogs = userName;
    userName = userName.replace(/ /g, "_");

    userLogs = window.localStorage.getItem("SESSION_USER_LOGS");
    userLogs = userLogs + "@" + window.localStorage.getItem("SESSION_ID");
    userLogs = userLogs + "@" + userName;
    userLogs = userLogs.replace(/"/g, "");
  }

  const [inputs, setInputs] = useState([]);

  const handleChange = (event) => {
    setLog(event.target.value);
    setAnswer(event.target.value);

    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  //SUBMITs
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(answer[answer.length - 1]);

    //console.log(userLogs);

    //If string is not empty
    if (textInput.trim() !== "") {
      axios
        .post(
          `http://localhost:80/Prototype-Vite/my-project/api/whiteboardLog/${userLogs}`,
          inputs
        )
        .then(function (response) {
          //console.log(response.data);
        });
    }
    //Clear inputbox
    setAnswer("");
  };
  //PHP CONNECT END
  //=========================

  // Message Area DIV
  const answerArea = document.getElementById("answer_area");
  const messageArea = document.getElementById("message_area");
  const messageAreaTail = document.getElementById("message_area_tail");
  const imageBackground = document.getElementById("image_bg");
  //Confirmation Area DIV
  const confirmationArea = document.getElementById("solved");

  //Choice Area DIV
  const choiceArea = document.getElementById("choice");
  const choiceArea2 = document.getElementById("choiceTwo");

  //Skip Area
  const skipArea = document.getElementById("skip_button");

  //Check if problem is solved
  const [isSolved, setFinish] = useState(false);

  //For suggestion level up
  const [levelUp, setLevelUp] = useState(false);

  const nextQuestion = (e) => {
    //SESSION SCORE
    var currentScore = window.localStorage.getItem("SESSION_SCORE");
    if (
      currentScore == null ||
      currentScore == undefined ||
      currentScore == "0"
    ) {
      currentScore = "0";
    }

    currentScore = parseInt(currentScore);
    currentScore++;
    window.localStorage.setItem("SESSION_SCORE", currentScore);

    ReactDOM.findDOMNode(confirmationArea).style.visibility = "hidden";
    ReactDOM.findDOMNode(choiceArea).style.visibility = "hidden";
    ReactDOM.findDOMNode(choiceArea2).style.visibility = "hidden";

    ReactDOM.findDOMNode(answerArea).style.visibility = "hidden";
    setDisplay([]);

    setFinish(false);
    setLevelUp(false);
    newQuestion();

    /*
    correctAnswer();
    setDisplay();
    checkCount();
    setLength();
    */
    let count = currentQuestionIndex;
    count++;
    setQuestionIndex(count);
    checkCount(0);

    computeEquation();
    loadAnswers();
    window.localStorage.setItem("FINISHED_EQUATION", false);
    window.localStorage.setItem("FINISHED_STEPS", 0);
    //window.localStorage.setItem("STREAK_CORRECT", 0);
    window.localStorage.setItem("QUESTION_INDEX", JSON.stringify(count));

    window.localStorage.setItem("TIMER", 0);
    setInterval(currentQuestionTimer, 1000);

    setQuestionResponse("");
  };

  const skipQuestion = () => {
    var data = window.localStorage.getItem("QUESTION_ABANDONED");
    if (data == null || data == undefined || data == "0") {
      data = "0";
    }

    data = parseInt(data);
    data++;
    window.localStorage.setItem("QUESTION_ABANDONED", data);

    ReactDOM.findDOMNode(answerArea).style.visibility = "hidden";
    setDisplay([]);

    setFinish(false);
    setLevelUp(false);
    newQuestion();
    let count = currentQuestionIndex;
    count++;
    setQuestionIndex(count);
    checkCount(0);

    computeEquation();
    loadAnswers();
    window.localStorage.setItem("FINISHED_EQUATION", false);
    window.localStorage.setItem("FINISHED_STEPS", 0);
    window.localStorage.setItem("QUESTION_INDEX", JSON.stringify(count));

    window.localStorage.setItem("TIMER", 0);
    setInterval(currentQuestionTimer, 1000);
    ReactDOM.findDOMNode(skipArea).style.visibility = "hidden";
    window.localStorage.setItem("STREAK_WRONG", 0);
  };

  //=============================CLICK BUTTON=============================
  const handleClick = (event) => {
    getCoefficient();

    //Focus inputbox
    let inputID = document.getElementById("input_box");
    ReactDOM.findDOMNode(inputID).focus();

    //If string is not empty
    if (textInput.trim() !== "") {
      setHintState(false);
      //Clear all  timeouts
      for (let i = 0; i < highestTimeoutId; i++) {
        clearTimeout(i);
      }

      // **********************API BAD WORDS FILTER**********************

      var Filter = require("bad-words"),
        filter = new Filter();

      var newBadWords = ["stupid", "idiot", "dumb", "tang", "tangina"];
      filter.addWords(...newBadWords);

      var filipinoBadwords = require("filipino-badwords-list");
      filter.addWords(...filipinoBadwords.array);

      //var valueChanged = false;
      var isProfanity = false;
      var newValue = event.target.value;
      if (newValue !== filter.clean(newValue)) {
        newValue = filter.clean(newValue);
        isProfanity = true;
      }

      arrSetLog((oldArray) => [...oldArray, userNameLogs + ": " + newValue]);

      //KEEP DATA OF LOGS
      var logText = "";
      if (window.localStorage.getItem("USER_LOGS") != null) {
        console.log(window.localStorage.getItem("USER_LOGS"));
        logText =
          logText + JSON.parse(window.localStorage.getItem("USER_LOGS"));

        logText = logText + ("‰" + userNameLogs + ": " + newValue);
        window.localStorage.setItem("USER_LOGS", JSON.stringify(logText));
      } else {
        window.localStorage.setItem(
          "USER_LOGS",
          JSON.stringify(userNameLogs + ": " + newValue)
        );
      }

      //Check if the answer is correct *if yes display in whiteboard

      var trimmedText = textInput.replace(/\s/g, "");
      //console.log("trim: ", trimmedText);

      if (!isSolved) {
        setInterval(currentQuestionTimer, 1000); //RUN TIMER

        if (answer.indexOf(trimmedText) > -1) {
          let isRepeat = false;

          let currentIndex = answer.indexOf(trimmedText);

          ReactDOM.findDOMNode(answerArea).style.visibility = "visible";

          //Display from n to current
          for (let i = 0; i <= currentIndex; i++) {
            let element = document.getElementById("answer" + i);

            if (ReactDOM.findDOMNode(element).style.visibility === "visible") {
              isRepeat = true;
            } else {
              isRepeat = false;
            }

            //console.log(element);
            ReactDOM.findDOMNode(element).style.visibility = "visible";
          }

          if (answer[answer.length - 1] === trimmedText) {
            displaySolved();
            window.localStorage.setItem("FINISHED_STEPS", currentIndex + 1);
            window.localStorage.setItem("FINISHED_EQUATION", true);
            increaseCorrectStreak();

            increaseTally("EXPRESSION_HAPPY");
            increaseTally("QUESTION_ANSWERED");

            return;
          } else {
            //CHECK IF ANSWER IS REPEATED
            if (isRepeat) {
              displayRepeated();
            } else {
              increaseStepIndex();
              increaseCorrectStreak();
              displayCorrect();
            }
          }
        }

        // WRONG ANSWER or IRRELEVANT
        else {
          let search = coefficientLetter;
          console.log("COEFFICIENT LETTER: " + search);
          let find = new RegExp(search, "gi");
          let removedCoeff = trimmedText.replace(find, "");
          console.log("removedCoeff: " + removedCoeff);
          let result = removedCoeff.match(/[a-zA-Z]/gi);
          console.log("RESULT: " + result);

          if (isProfanity) {
            displayAngry();
          } else if (result != null) {
            if (result.length > 0) {
              increaseIrrelevantStreak();
              displayMad();
            }
          } else {
            increaseWrongStreak();
            displayWrong();
          }
          // setResponse("Sometimes we're tested not to show our weaknesses, but to discover our strength. You can do it! Try and solve again.")
        }
      } else {
        if (isProfanity) {
          displayAngrySolved();
        }
        return;
      }

      //arrUpdateLog("User: " + arrSetLog);

      var objDiv = document.getElementById("logs");
      objDiv.scroll({ top: objDiv.scrollHeight, behavior: "smooth" });
    }

    //END OF FUNCTION
  };

  function increaseStepIndex() {
    let stepIndex = window.localStorage.getItem("FINISHED_STEPS");
    if (stepIndex == null) {
      stepIndex = 0;
      stepIndex++;
    } else {
      stepIndex++;
    }
    window.localStorage.setItem("FINISHED_STEPS", stepIndex);
  }

  function increaseCorrectStreak() {
    let streakCount = window.localStorage.getItem("STREAK_CORRECT");
    if (streakCount == null) {
      streakCount = 0;
      streakCount++;
    } else {
      streakCount++;
    }
    window.localStorage.setItem("STREAK_CORRECT", streakCount);
    window.localStorage.setItem("STREAK_WRONG", 0);
    window.localStorage.setItem("STREAK_IRRELEVANT", 0);
  }

  function increaseWrongStreak() {
    let streakCount = window.localStorage.getItem("STREAK_WRONG");
    if (streakCount == null) {
      streakCount = 0;
      streakCount++;
    } else {
      streakCount++;
    }
    window.localStorage.setItem("STREAK_WRONG", streakCount);
    window.localStorage.setItem("STREAK_CORRECT", 0);
    window.localStorage.setItem("STREAK_IRRELEVANT", 0);
  }

  function increaseIrrelevantStreak() {
    let streakCount = window.localStorage.getItem("STREAK_IRRELEVANT");
    if (streakCount == null) {
      streakCount = 0;
      streakCount++;
    } else {
      streakCount++;
    }
    window.localStorage.setItem("STREAK_IRRELEVANT", streakCount);
  }

  // INCREASE TALLY FUNCTION

  function increaseTally(expressionType) {
    // UPDATE DATA
    var data = window.localStorage.getItem(expressionType);
    if (data == null || data == undefined || data == "0") {
      data = "0";
    }

    data = parseInt(data);
    data++;
    window.localStorage.setItem(expressionType, JSON.stringify(data));
    //END OF LINE
  }

  // CHANGE  RESPONSE BG COLOR FUNCTION

  function changeResponseColor(color) {
    ReactDOM.findDOMNode(imageBackground).style.backgroundColor = color;
    ReactDOM.findDOMNode(messageArea).style.backgroundColor = color;
    ReactDOM.findDOMNode(messageAreaTail).style.borderRight =
      "18px solid " + color;
  }

  function displayAngrySolved() {
    //ADD IF SHORTENED OR FULL
    if (
      JSON.parse(window.localStorage.getItem("SYSTEM_VERSION")) ==
      "Facial Group"
    ) {
      increaseTally("EXPRESSION_ANGRY");
      setImageLink("PIA-Mad");
      changeResponseColor(angryColor);
    }
    //
    setResponse("Please refrain from cursing or using any vulgar words");
    setSubtext("");

    ReactDOM.findDOMNode(confirmationArea).style.visibility = "hidden";
    ReactDOM.findDOMNode(choiceArea).style.visibility = "hidden";
    ReactDOM.findDOMNode(choiceArea2).style.visibility = "hidden";

    setTimeout(displaySolved, 5000);
  }

  function displaySolved() {
    ReactDOM.findDOMNode(confirmationArea).style.visibility = "visible";

    if (levelUp) {
      displayLevelUp();
      return;
    }

    let currentTime = JSON.parse(window.localStorage.getItem("TIMER"));
    if (currentTime <= 60 || currentTime == null) {
      //ADD IF SHORTENED OR FULL
      if (
        JSON.parse(window.localStorage.getItem("SYSTEM_VERSION")) ==
        "Facial Group"
      ) {
        setImageLink("PIA-Surprised");
        changeResponseColor(correctColor);
      }
      //
      setResponse("Impressive Work!\n You solved the given equation quickly.");
      setSubtext("");
      window.localStorage.setItem("TIMER", 0);
      function resetTimeout() {
        for (let i = 0; i < highestTimeoutId; i++) {
          clearTimeout(i);
        }
      }

      setTimeout(resetTimeout(), 1);
    } else {
      //ADD IF SHORTENED OR FULL
      if (
        JSON.parse(window.localStorage.getItem("SYSTEM_VERSION")) ==
        "Facial Group"
      ) {
        setImageLink("PIA-Smiling");
        changeResponseColor(correctColor);
      }
      //
      setResponse("Congratulations!\n You solved the given equation.");
      setSubtext("");
    }

    //10th question easy
    let diffType = window.localStorage.getItem("DIFFICULTY_TYPE");
    if (
      JSON.parse(window.localStorage.getItem("QUESTION_ANSWERED")) >= 10 &&
      (diffType == '"Easy"' || diffType == "Easy")
    ) {
      setTimeout(displayLevelUp, 3500);
    } else if (
      JSON.parse(window.localStorage.getItem("QUESTION_ANSWERED")) >= 6 &&
      (diffType == '"Average"' || diffType == "Average")
    ) {
      setTimeout(displayLevelUp, 3500);
    } else {
      setQuestionResponse("Proceed to next question?");
      ReactDOM.findDOMNode(choiceArea).style.visibility = "visible";
    }

    setFinish(true);
  }

  //window.localStorage.setItem("DIFFICULTY_TYPE", JSON.stringify("Easy"));

  function displayLevelUp() {
    let diffType = window.localStorage.getItem("DIFFICULTY_TYPE");
    if (diffType == '"Easy"' || diffType == "Easy") {
      setResponse(
        "Since you solved more than 10 equations. I suggest that you try the average level equations."
      );
    } else if (diffType == '"Average"' || diffType == "Average") {
      setResponse(
        "Since you solved more than 6 equations. I suggest that you try the difficult level equations."
      );
    }
    //ADD IF SHORTENED OR FULL
    if (
      JSON.parse(window.localStorage.getItem("SYSTEM_VERSION")) ==
      "Facial Group"
    ) {
      setImageLink("PIA-Smiling2");
      changeResponseColor(correctColor);
    }
    //

    setSubtext("");
    setQuestionResponse("Level up difficulty type?");

    ReactDOM.findDOMNode(choiceArea2).style.visibility = "visible";
    setLevelUp(true);
  }

  function displayRepeated() {
    //ADD IF SHORTENED OR FULL
    if (
      JSON.parse(window.localStorage.getItem("SYSTEM_VERSION")) ==
      "Facial Group"
    ) {
      setImageLink("PIA-Confused2");
      changeResponseColor(invalidColor);
    }
    //

    setResponse("You already completed that step.");
    setSubtext("");

    setTimeout(timer, 5000);
  }

  function displayCorrect() {
    ReactDOM.findDOMNode(skipArea).style.visibility = "hidden";
    //ADD IF SHORTENED OR FULL
    //INCREASE EXPRESSION TALLY
    if (
      JSON.parse(window.localStorage.getItem("SYSTEM_VERSION")) ==
      "Facial Group"
    ) {
      increaseTally("EXPRESSION_HAPPY");
    }
    //

    let data = parseInt(
      JSON.parse(window.localStorage.getItem("STREAK_CORRECT"))
    );
    if (data === null) {
      data = 0;
    }

    if (data >= 6) {
      //ADD IF SHORTENED OR FULL
      if (
        JSON.parse(window.localStorage.getItem("SYSTEM_VERSION")) ==
        "Facial Group"
      ) {
        setImageLink("PIA-Happy4");
      }
      //
      setResponse(FeedbackList.GenerateMessage("correct1"));
      setSubtext(FeedbackList.GenerateMessage("subCorrect1"));
    } else if (data >= 4) {
      //ADD IF SHORTENED OR FULL
      if (
        JSON.parse(window.localStorage.getItem("SYSTEM_VERSION")) ==
        "Facial Group"
      ) {
        setImageLink("PIA-Happy3");
      }
      //
      setResponse(FeedbackList.GenerateMessage("correct1"));
      setSubtext(FeedbackList.GenerateMessage("subCorrect1"));
    } else if (data >= 2) {
      //ADD IF SHORTENED OR FULL
      if (
        JSON.parse(window.localStorage.getItem("SYSTEM_VERSION")) ==
        "Facial Group"
      ) {
        setImageLink("PIA-Happy2");
      }
      //
      setResponse(FeedbackList.GenerateMessage("correct2"));
      setSubtext(FeedbackList.GenerateMessage("subCorrec2"));
    } else {
      //ADD IF SHORTENED OR FULL
      if (
        JSON.parse(window.localStorage.getItem("SYSTEM_VERSION")) ==
        "Facial Group"
      ) {
        setImageLink("PIA-Happy");
      }
      //
      setResponse(FeedbackList.GenerateMessage("correct3"));
      setSubtext(FeedbackList.GenerateMessage("subCorrect2"));
    }

    //ADD IF SHORTENED OR FULL
    if (
      JSON.parse(window.localStorage.getItem("SYSTEM_VERSION")) ==
      "Facial Group"
    ) {
      changeResponseColor(correctColor);
    }
    //
    setTimeout(timer, 5000);
  }

  function displayWrong() {
    //ADD IF SHORTENED OR FULL
    //INCREASE EXPRESSION TALLY
    if (
      JSON.parse(window.localStorage.getItem("SYSTEM_VERSION")) ==
      "Facial Group"
    ) {
      increaseTally("EXPRESSION_SAD");
    }
    //

    let dataCorrect = parseInt(
      JSON.parse(window.localStorage.getItem("STREAK_CORRECT"))
    );
    if (dataCorrect === null) {
      dataCorrect = 0;
    }

    let dataWrong = parseInt(
      JSON.parse(window.localStorage.getItem("STREAK_WRONG"))
    );
    if (dataWrong === null) {
      dataWrong = 0;
    }

    /*
    if (dataCorrect == 1) {
      //ADD IF SHORTENED OR FULL
      if (JSON.parse(window.localStorage.getItem("SYSTEM_VERSION")) == "Facial Group") {
        setImageLink("PIA-LightSad");
      }
      //
      setResponse("Your answer is wrong.");
    } 
    */
    if (dataCorrect >= 2) {
      //ADD IF SHORTENED OR FULL
      if (
        JSON.parse(window.localStorage.getItem("SYSTEM_VERSION")) ==
        "Facial Group"
      ) {
        increaseTally("EXPRESSION_SURPRISED");
        setImageLink("PIA-Surprised");
      }
      //
      setResponse("Oh my! It seems like your solution is not correct.");
      setSubtext("");
    } else if (dataWrong != 0 && dataWrong % 2 == 0) {
      let links = ["PIA-Crying", "PIA-Crying2", "PIA-Crying3"];
      let currentLink = links[Math.floor(Math.random() * links.length)];
      //ADD IF SHORTENED OR FULL
      if (
        JSON.parse(window.localStorage.getItem("SYSTEM_VERSION")) ==
        "Facial Group"
      ) {
        setImageLink(currentLink);
        changeResponseColor(wrongColor);
      }
      //
      setResponse(FeedbackList.GenerateMessage("wrong1"));
      setSubtext("Please try again.");

      //ADD IF shortened or full
      if (
        JSON.parse(window.localStorage.getItem("SYSTEM_VERSION")) ==
        "Facial Group"
      ) {
        setTimeout(displayMotivation, 5000);
      }
      return;
    } else {
      //ADD IF SHORTENED OR FULL
      if (
        JSON.parse(window.localStorage.getItem("SYSTEM_VERSION")) ==
        "Facial Group"
      ) {
        setImageLink("PIA-Sad");
      }
      //
      setResponse(FeedbackList.GenerateMessage("wrong1"));
    }

    if (dataWrong >= 10) {
      ReactDOM.findDOMNode(skipArea).style.visibility = "visible";
    }

    setSubtext("Please try again.");

    //ADD IF SHORTENED OR FULL
    if (
      JSON.parse(window.localStorage.getItem("SYSTEM_VERSION")) ==
      "Facial Group"
    ) {
      changeResponseColor(wrongColor);
    }
    //
    setTimeout(timer, 5000);
  }

  function displayMotivation() {
    setImageLink("PIA-Talking1");
    let messageType = ["motivation1", "motivation2", "motivation3"];
    let message = messageType[Math.floor(Math.random() * messageType.length)];
    setResponse(FeedbackList.GenerateMessage(message));
    setSubtext("");
    changeResponseColor(motivationColor1);

    setTimeout(displayInspiration, 5000);
  }

  function displayInspiration() {
    setImageLink("PIA-Wink");
    setResponse(FeedbackList.GenerateMessage("motivation4"));
    setSubtext("");
    changeResponseColor(motivationColor2);
  }

  function displayMad() {
    //INCREASE EXPRESSION TALLY
    let streakCount = window.localStorage.getItem("STREAK_IRRELEVANT");
    if (streakCount >= 2) {
      //ADD IF SHORTENED OR FULL
      if (
        JSON.parse(window.localStorage.getItem("SYSTEM_VERSION")) ==
        "Facial Group"
      ) {
        increaseTally("EXPRESSION_ANGRY");
        setImageLink("PIA-Mad");
        changeResponseColor(wrongColor);
      }
      //
      setResponse(
        "Enter only the matching variables for the given problem. Please take this seriously."
      );
      // "Enter appropriate answer only for the given problem. Please take this seriously and answer the given problem."
      setSubtext("");
      setTimeout(timer, 6500);
    } else {
      if (
        JSON.parse(window.localStorage.getItem("SYSTEM_VERSION")) ==
        "Facial Group"
      ) {
        setImageLink("PIA-Talking1");
      }
      setResponse(
        "Your answer is irrelevant. Please input matching variables only."
      );
      //"Your answer is irrelevant. Please only input appropriate answer for the given problem."
      setSubtext("");
      changeResponseColor(defaultColor);
      setTimeout(timer, 5000);
    }
  }

  function displayAngry() {
    //ADD IF SHORTENED OR FULL
    //INCREASE EXPRESSION TALLY
    if (
      JSON.parse(window.localStorage.getItem("SYSTEM_VERSION")) ==
      "Facial Group"
    ) {
      increaseTally("EXPRESSION_ANGRY");
      setImageLink("PIA-Angry");
      changeResponseColor(angryColor);
    }
    //
    setResponse(
      "Your answer is out of topic. Please refrain from cursing or using any vulgar words."
    );
    setSubtext("");

    setTimeout(timer, 5000);
  }

  //Revert back text messages and color
  //const a = () => {
  function timer() {
    setImageLink("PIA-Neutral");

    setResponse("Please input your solution or answer for this problem.");
    setSubtext("");
    changeResponseColor(defaultColor);
    //ReactDOM.findDOMNode(messageArea).style.boxShadow = '0px -2px 10px 2px ' + defaultColor;
  }

  function newQuestion() {
    setImageLink("PIA-Neutral");

    setResponse("This is the next question I've got for you.");
    setSubtext("");
    changeResponseColor(defaultColor);
    //ReactDOM.findDOMNode(messageArea).style.boxShadow = '0px -2px 10px 2px ' + defaultColor;
  }

  function helpModeResponse() {
    setImageLink("PIA-Neutral");

    setResponse(
      "You are currently in help mode. Click anywhere to change to default."
    );
    setSubtext("");
    changeResponseColor(defaultColor);
  }

  function hintModeResponse() {
    let imageArray = ["PIA-Talking1", "PIA-Talking2", "PIA-Talking3"];
    let imageLink = imageArray[Math.floor(Math.random() * imageArray.length)];

    if (
      JSON.parse(window.localStorage.getItem("SYSTEM_VERSION")) ==
      "Facial Group"
    ) {
      setImageLink(imageLink);
      changeResponseColor(hintColor);
    }

    let hintIndex = JSON.parse(window.localStorage.getItem("FINISHED_STEPS"));
    console.log("hintindex: " + hintIndex);
    if (hintIndex === null) {
      hintIndex = 0;
    } else {
      hintIndex = parseInt(hintIndex);
    }
    setResponse(hint[hintIndex]);
    setSubtext("");
  }

  function tutorialModeResponse() {
    setImageLink("PIA-Neutral");

    setResponse(
      "Tutorial video mode. Click the tutorial video button to change to default."
    );
    setSubtext("");
    changeResponseColor(defaultColor);
  }

  function penModeResponse() {
    setImageLink("PIA-Neutral");

    setResponse(
      "You are currently in pen mode. Click the pen button to change to default."
    );
    setSubtext("");
    changeResponseColor(defaultColor);
  }

  //};

  //    clearInterval(a.timer);

  //{arrUpdatedLog.map(log => <p>{log}</p>)}

  function clickLog(input) {
    let clickData = userLogs + "@" + input;
    //LOG DATA
    axios
      .post(
        `http://localhost:80/Prototype-Vite/my-project/api/whiteboardClick/${clickData}`
      )
      .then(function (response) {
        //console.log(response.data);
      });
  }

  function hideResponseOption() {
    ReactDOM.findDOMNode(confirmationArea).style.visibility = "hidden";
    ReactDOM.findDOMNode(choiceArea).style.visibility = "hidden";
    ReactDOM.findDOMNode(choiceArea2).style.visibility = "hidden";
  }

  const clearLogs = () => {
    clickLog("Trash_Button_Clicked");
    arrSetLog([]);
    window.localStorage.removeItem("USER_LOGS");
  };

  //HELP BUTTON

  const [isHelp, setHelpState] = useState(false);

  const helpCursor = () => {
    clickLog("Help_Button_Clicked");

    document.body.style.cursor = "help";
    setTimeout(defaultCursor, 1);
    setHelpState(true);
    setHintState(false);
    setPenState(false);
    setTutorialState(false);
    helpModeResponse();

    if (isSolved) {
      setTimeout(hideResponseOption, 1);
    }
  };

  function defaultCursor() {
    document.body.addEventListener("click", changeCursor);
    function changeCursor() {
      document.body.style.cursor = "default";
      if (document.getElementById("help").matches(":hover")) {
        for (let i = 0; i < highestTimeoutId; i++) {
          clearTimeout(i);
        }
        if (!isSolved) {
          setInterval(currentQuestionTimer, 1000);
        }
        document.body.style.cursor = "help";
        document.body.removeEventListener("click", changeCursor);
      } else {
        if (isSolved) {
          //setTimeout(displaySolved, 1);  ORIGINAL
          displaySolved(); //MODIFIED
        } else {
          timer();
        }
        document.body.removeEventListener("click", changeCursor);
        setHelpState(false);
      }
    }
  }

  var whiteboardHeightValue = 0;

  var penAreaHeightValue = 0;
  var penAreaWidthValue = 0;

  function getHeightGivenArea() {
    var divElement = document.getElementById("givenArea");
    whiteboardHeightValue = ReactDOM.findDOMNode(divElement).offsetHeight;
    // console.log(whiteboardHeightValue);
    if (whiteboardHeightValue <= 135) {
      document.getElementById("container").style.gridTemplateRows =
        "repeat(13, 1fr)";
    } else {
      document.getElementById("container").style.gridTemplateRows =
        "repeat(11, 1fr)";
    }

    //123px and //147px
  }

  function setArea() {
    var divElement1 = document.getElementById("givenArea");
    var divElement2 = document.getElementById("solutionArea");
    var divElement3 = document.getElementById("streakArea");

    var heightValue1 = ReactDOM.findDOMNode(divElement1).offsetHeight;
    var heightValue2 = ReactDOM.findDOMNode(divElement2).offsetHeight;

    var widthValue1 = ReactDOM.findDOMNode(divElement1).offsetWidth;
    var widthValue2 = ReactDOM.findDOMNode(divElement3).offsetWidth;

    penAreaHeightValue = heightValue1 + heightValue2 - 13;
    penAreaWidthValue = widthValue1 + widthValue2 - 24;

    // console.log(penAreaHeightValue);
    // console.log(penAreaWidthValue);

    document.getElementById("penArea").style.height = penAreaHeightValue + "px";
    document.getElementById("penArea").style.width = penAreaWidthValue + "px";

    document.getElementById("tutorialArea").style.height =
      penAreaHeightValue + "px";
    document.getElementById("tutorialArea").style.width =
      penAreaWidthValue + "px";

    //123px and //147px
  }

  useEffect(() => {
    getHeightGivenArea();
    setArea();
  });

  {
  }
  //HINT BUTTON
  const [isHint, setHintState] = useState(false);

  const hintMode = () => {
    setTutorialState(false);
    setPenState(false);
    if (isHint) {
      timer();
      setHintState(false);
    } else {
      clickLog("Hint_Button_Clicked");
      for (let i = 0; i < highestTimeoutId; i++) {
        clearTimeout(i);
      }
      if (!isSolved) {
        setInterval(currentQuestionTimer, 1000);
      }
      setTimeout(hintModeResponse, 1);
      setHintState(true);
    }
  };

  //TUTORIAL BUTTON
  const [isTutorial, setTutorialState] = useState(false);

  const tutorialMode = () => {
    setHintState(false);
    setPenState(false);
    if (isTutorial) {
      if (isSolved) {
        setTimeout(displaySolved, 1);
      } else {
        timer();
      }
      setTutorialState(false);
    } else {
      clickLog("Tutorial_Button_Clicked");
      if (isSolved) {
        setTimeout(hideResponseOption, 1);
      }
      for (let i = 0; i < highestTimeoutId; i++) {
        clearTimeout(i);
      }

      if (!isSolved) {
        setInterval(currentQuestionTimer, 1000);
      }
      setTimeout(tutorialModeResponse, 1);
      setTutorialState(true);
    }
  };

  //PEN BUTTON

  useEffect(() => {
    penCodeBlock();
  }, []);

  function penCodeBlock() {
    const canvas = document.querySelector("canvas"),
      toolBtns = document.querySelectorAll(".tool"),
      fillColor = document.querySelector("#fill-color"),
      sizeSlider = document.querySelector("#size-slider"),
      colorBtns = document.querySelectorAll(".colors .option"),
      colorPicker = document.querySelector("#color-picker"),
      clearCanvas = document.querySelector(".clear-canvas"),
      saveImg = document.querySelector(".save-img"),
      ctx = canvas.getContext("2d");
    // global variables with default value
    let prevMouseX,
      prevMouseY,
      snapshot,
      isDrawing = false,
      selectedTool = "brush",
      brushWidth = 5,
      selectedColor = "#000";
    const setCanvasBackground = () => {
      // setting whole canvas background to white, so the downloaded img background will be white
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = selectedColor; // setting fillstyle back to the selectedColor, it'll be the brush color
    };

    document
      .getElementById("pen_button")
      .addEventListener("mouseover", setCanvasArea);
    function setCanvasArea() {
      // setting canvas width/height.. offsetwidth/height returns viewable width/height of an element
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      setCanvasBackground();
      document
        .getElementById("pen_button")
        .removeEventListener("mouseover", setCanvasArea);
    }
    const drawRect = (e) => {
      // if fillColor isn't checked draw a rect with border else draw rect with background
      if (!fillColor.checked) {
        // creating circle according to the mouse pointer
        return ctx.strokeRect(
          e.offsetX,
          e.offsetY,
          prevMouseX - e.offsetX,
          prevMouseY - e.offsetY
        );
      }
      ctx.fillRect(
        e.offsetX,
        e.offsetY,
        prevMouseX - e.offsetX,
        prevMouseY - e.offsetY
      );
    };
    const drawCircle = (e) => {
      ctx.beginPath(); // creating new path to draw circle
      // getting radius for circle according to the mouse pointer
      let radius = Math.sqrt(
        Math.pow(prevMouseX - e.offsetX, 2) +
          Math.pow(prevMouseY - e.offsetY, 2)
      );
      ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI); // creating circle according to the mouse pointer
      fillColor.checked ? ctx.fill() : ctx.stroke(); // if fillColor is checked fill circle else draw border circle
    };
    const drawTriangle = (e) => {
      ctx.beginPath(); // creating new path to draw circle
      ctx.moveTo(prevMouseX, prevMouseY); // moving triangle to the mouse pointer
      ctx.lineTo(e.offsetX, e.offsetY); // creating first line according to the mouse pointer
      ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY); // creating bottom line of triangle
      ctx.closePath(); // closing path of a triangle so the third line draw automatically
      fillColor.checked ? ctx.fill() : ctx.stroke(); // if fillColor is checked fill triangle else draw border
    };
    const startDraw = (e) => {
      isDrawing = true;
      prevMouseX = e.offsetX; // passing current mouseX position as prevMouseX value
      prevMouseY = e.offsetY; // passing current mouseY position as prevMouseY value
      ctx.beginPath(); // creating new path to draw
      ctx.lineWidth = brushWidth; // passing brushSize as line width
      ctx.strokeStyle = selectedColor; // passing selectedColor as stroke style
      ctx.fillStyle = selectedColor; // passing selectedColor as fill style
      // copying canvas data & passing as snapshot value.. this avoids dragging the image
      snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    };
    const drawing = (e) => {
      if (!isDrawing) return; // if isDrawing is false return from here
      ctx.putImageData(snapshot, 0, 0); // adding copied canvas data on to this canvas
      if (selectedTool === "brush" || selectedTool === "eraser") {
        // if selected tool is eraser then set strokeStyle to white
        // to paint white color on to the existing canvas content else set the stroke color to selected color
        ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
        ctx.lineTo(e.offsetX, e.offsetY); // creating line according to the mouse pointer
        ctx.stroke(); // drawing/filling line with color
      } else if (selectedTool === "rectangle") {
        drawRect(e);
      } else if (selectedTool === "circle") {
        drawCircle(e);
      } else {
        drawTriangle(e);
      }
    };
    toolBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // adding click event to all tool option
        // removing active class from the previous option and adding on current clicked option
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active");
        selectedTool = btn.id;
      });
    });
    sizeSlider.addEventListener(
      "change",
      () => (brushWidth = sizeSlider.value)
    ); // passing slider value as brushSize
    colorBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // adding click event to all color button
        // removing selected class from the previous option and adding on current clicked option
        document
          .querySelector(".options .selected")
          .classList.remove("selected");
        btn.classList.add("selected");
        // passing selected btn background color as selectedColor value
        selectedColor = window
          .getComputedStyle(btn)
          .getPropertyValue("background-color");
      });
    });
    colorPicker.addEventListener("change", () => {
      // passing picked color value from color picker to last color btn background
      colorPicker.parentElement.style.background = colorPicker.value;
      colorPicker.parentElement.click();
    });
    clearCanvas.addEventListener("click", () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // clearing whole canvas
      setCanvasBackground();
    });
    saveImg.addEventListener("click", () => {
      const link = document.createElement("a"); // creating <a> element
      link.download = `${Date.now()}.jpg`; // passing current date as link download value
      link.href = canvas.toDataURL(); // passing canvasData as link href value
      link.click(); // clicking link to download image
    });
    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mousemove", drawing);
    canvas.addEventListener("mouseup", () => (isDrawing = false));
  }

  const [isPen, setPenState] = useState(false);

  const penMode = () => {
    setHintState(false);
    setTutorialState(false);
    if (isPen) {
      if (isSolved) {
        setTimeout(displaySolved, 1);
      } else {
        timer();
      }
      setPenState(false);
      document.body.style.cursor = "default";
    } else {
      clickLog("Pen_Button_Clicked");
      if (isSolved) {
        setTimeout(hideResponseOption, 1);
      }
      for (let i = 0; i < highestTimeoutId; i++) {
        clearTimeout(i);
      }
      if (!isSolved) {
        setInterval(currentQuestionTimer, 1000);
      }
      setTimeout(penModeResponse, 1);
      setPenState(true);
    }
  };

  const [isBrush, setBrushState] = useState(true);

  const brushMode = () => {
    setBrushState(true);
  };

  const eraserMode = () => {
    setBrushState(false);
  };

  //FOR MODAL
  const [showModal, setShowModal] = useState(false);
  const handleOnCloseModal = () => setShowModal(false);

  //window.localStorage.setItem("QUESTION_INDEX", 3);
  //window.localStorage.setItem("DIFFICULTY_TYPE", JSON.stringify("Easy"));
  //END SESSION
  useEffect(() => {
    if (JSON.parse(window.localStorage.getItem("SESSION_END") == "true")) {
      setShowModal(true);
    }
    //END AT 20th
    if (JSON.parse(window.localStorage.getItem("QUESTION_INDEX") >= 19)) {
      setShowModal(true);
      window.localStorage.setItem("SESSION_END", true);
    }
  });

  const setLevel = () => {
    window.localStorage.setItem("SESSION_SCORE", 20);
    let diffType = window.localStorage.getItem("DIFFICULTY_TYPE");
    if (diffType == '"Easy"' || diffType == "Easy") {
      window.localStorage.setItem(
        "SESSION_LEVEL_UP",
        JSON.stringify("average")
      );
    } else if (diffType == '"Average"' || diffType == "Average") {
      window.localStorage.setItem(
        "SESSION_LEVEL_UP",
        JSON.stringify("difficult")
      );
    }
    window.localStorage.setItem("SESSION_END", true);
    setShowModal(true);
  };
  return (
    <>
      {/*<!--Container pang edit ng grids-->*/}
      <div
        id="whiteboard"
        className="scale-95 h-[92.5vh] flex items-center justify-center"
        onMouseEnter={loadAnswers}
        onClick={loadAnswers}
      >
        <div className="w-10/12 mx-auto grid  rounded-bl-6xl rounded-tr-6xl rounded-tl-6xl border-l-12 border-b-12 border-yellow-700 border-r-brTwo border-r-12  md:flex-row items-center  bg-mainBGBrown shadow-lg shadow-yellow-400  ">
          {/*<!--Mothergrids-->*/}
          <div
            id="container"
            className={`relative grid grid-cols-21  bg-mainBrown  overflow-hidden pt-3 pl-3 pr-3 ${
              whiteboardHeightValue <= 123 ? "" : "grid-rows-11"
            }`}
          >
            {/*<!--Button container-->*/}
            <div
              id="toolbar"
              className="  row-span-16 rounded-l-6xl overflow-hidden"
            >
              <nav className="flex flex-col items  ">
                {/*<!--Question-->*/}
                <div
                  className={`text-gray-500 hover:text-white focus:outline-none focus:text-white rounded-full ${
                    isHelp ? "ml-2 my-1" : "px-3 py-2"
                  }`}
                  {...(isHelp
                    ? {
                        dataTooltip:
                          "Button to gather information by hovering around the system.",
                      }
                    : {})}
                  {...(isHelp ? { dataTooltipPosition: "right" } : {})}
                >
                  <svg
                    id="help"
                    onClick={helpCursor}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className={`cursor-pointer h-11 w-11  hover:fill-gray-200/90 hover:bg-gray-200/90 hover:text-white rounded-full p-1 drop-shadow-[0_3px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_3px_0px_rgba(0,0,0,0.6)] ${
                      isHelp
                        ? "hover:border-3 hover:border-white fill-gray-200 bg-gray-200/90 text-white"
                        : "text-black/50 bg-gray-300/90 fill-gray-300/90"
                    }`}
                  >
                    {!isHelp && <title>Help</title>}

                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                    />
                  </svg>
                </div>

                {/*<!--Hint-->*/}
                <div
                  className={`text-gray-500 hover:text-white focus:outline-none focus:text-white ${
                    isHelp ? "ml-2 my-1" : "px-3 py-2"
                  }`}
                  {...(isHelp
                    ? {
                        dataTooltip:
                          "Button to call for the assistance of PIA, like what step should be done.",
                      }
                    : {})}
                  {...(isHelp ? { dataTooltipPosition: "right" } : {})}
                >
                  <svg
                    id="help_button"
                    onClick={!isSolved ? hintMode : undefined}
                    className={` h-11 w-11 rounded-full   p-1 drop-shadow-[0_3px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_3px_0px_rgba(0,0,0,0.6)] ${
                      isSolved
                        ? isHelp
                          ? "hover:border-3 hover:border-white text-black/50 fill-gray-400/90 bg-gray-400/90 cursor-default aria-disabled: hover:text-white"
                          : " text-black/50 fill-gray-400/90 bg-gray-400/90 cursor-default aria-disabled:"
                        : isHint
                        ? "cursor-pointer  fill-yellow-300/90 bg-yellow-300/90 text-white/70 hover:fill-yellow-300/90 hover:bg-yellow-300/90 hover:text-white"
                        : isHelp
                        ? "hover:border-3 hover:border-white cursor-pointer  text-black/50 fill-yellow-400/90 bg-yellow-400/90 hover:fill-yellow-300/90 hover:bg-yellow-300/90 hover:text-white"
                        : "cursor-pointer  text-black/50 fill-yellow-400/90 bg-yellow-400/90 hover:fill-yellow-300/90 hover:bg-yellow-300/90 hover:text-white"
                    }`}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {!isHelp && (
                      <title>
                        {!isSolved
                          ? "Hint"
                          : "Hint Unavailable: The equation is solved"}
                      </title>
                    )}
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>

                {/*<!--Video-->*/}
                <div
                  className={`text-gray-500 hover:text-white focus:outline-none focus:text-white drop-shadow-[0_3px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_3px_0px_rgba(0,0,0,0.6)] ${
                    isHelp ? "ml-2 my-1" : "px-3 py-2"
                  }`}
                  {...(isHelp
                    ? {
                        dataTooltip:
                          "Button to switch to tutorial video mode, where linear equation is the lesson.",
                      }
                    : {})}
                  {...(isHelp ? { dataTooltipPosition: "right" } : {})}
                >
                  <svg
                    onClick={tutorialMode}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className={`cursor-pointer  w-11 h-11 p-1   hover:fill-red-500/90 hover:bg-red-500/90 hover:text-white rounded-full ${
                      isTutorial
                        ? "fill-red-500 bg-red-500/90 text-white "
                        : isHelp
                        ? "hover:border-3 hover:border-white text-black/50 fill-red-700/90 bg-red-700/90"
                        : "text-black/50 fill-red-700/90 bg-red-700/90"
                    }`}
                  >
                    {!isHelp && <title>Tutorial Video</title>}
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                    />
                  </svg>
                </div>

                {/*<!--Pen-->*/}
                <div
                  className={`text-gray-500 hover:text-white focus:outline-none focus:text-white drop-shadow-[0_3px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_3px_0px_rgba(0,0,0,0.6)] ${
                    isHelp ? "ml-2 my-1" : "px-3 py-2"
                  }`}
                  {...(isHelp
                    ? {
                        dataTooltip:
                          "Button to enable drawing mode in the whiteboard.",
                      }
                    : {})}
                  {...(isHelp ? { dataTooltipPosition: "right" } : {})}
                >
                  <svg
                    id="pen_button"
                    onClick={penMode}
                    className={`cursor-pointer  h-11 w-11  rounded-full hover:fill-lime-600/90 hover:bg-lime-600/90 hover:text-white p-1 ${
                      isPen
                        ? "fill-lime-600 bg-lime-600/90 text-white "
                        : isHelp
                        ? "hover:border-3 hover:border-white text-black/50 bg-lime-700/90 fill-lime-700/90"
                        : "text-black/50 bg-lime-700/90 fill-lime-700/90"
                    }`}
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    {!isHelp && <title>Draw</title>}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />{" "}
                    <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
                  </svg>
                </div>
              </nav>
            </div>

            {/*<!--Given Area-->*/}
            <div
              id="givenArea"
              className={` col-span-9 bg-white row-span-2  border-l-12  border-l-brTwo border-t-12 border-t-yellow-700 ${
                isHelp ? "hover:border-4 hover:border-red-500 " : ""
              }`}
              {...(isHelp
                ? {
                    dataTooltip:
                      "The area for the given question and the equation you need to solve.",
                  }
                : {})}
              {...(isHelp ? { dataTooltipPosition: "bottom" } : {})}
            >
              {/* PEN AREA, not modal */}
              <div
                id="tutorialArea"
                className={`bg-gray-800 absolute  z-50 overflow-hidden" ${
                  isTutorial ? "" : "invisible"
                } `}
              >
                <section>
                  <div>
                    <iframe
                      className="absolute w-full aspect-auto h-full"
                      src="https://www.youtube.com/embed/crJI4iZ_DbI"
                      title="Solving linear equations — Harder example | Math | SAT | Khan Academy"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowfullscreen
                    ></iframe>
                  </div>
                </section>
              </div>
              <div
                id="penArea"
                className={`absolute z-10" ${isPen ? "" : "invisible"} `}
              >
                <section
                  className={`drawing-board h-full ${
                    isBrush ? "hover:cursor-brush" : "hover:cursor-eraser"
                  } `}
                >
                  <canvas className=""></canvas>
                </section>
              </div>
              <div
                className={`flex relative flex-col ml-7 mt-7 ${
                  isPen ? "select-none" : ""
                } `}
              >
                <div className="text-3.5xl font-medium inline-flex ">
                  <span className=" font-poppins font-bold">Given: &nbsp;</span>
                  <span className="font-poppins">
                    {questionList[currentQuestionIndex]}
                  </span>
                </div>
              </div>
            </div>

            {/*<!--Synthetic Facial AREA-->*/}
            <div
              id="facialArea"
              className="col-span-5 row-span-5 bg-white border-t-12 border-r-12  border-yellow-700  select-none"
            >
              <div
                className="flex  justify-center relative"
                {...(isHelp
                  ? {
                      dataTooltip:
                        "This is the area for facial expression res ponse of PIA.",
                    }
                  : {})}
                {...(isHelp ? { dataTooltipPosition: "bottom" } : {})}
              >
                <div
                  id="image_bg"
                  className={`z-10 relative flex items-center text-center justify-center rounded-full bg-slate-200   object-cover w-65% mt-3 px-6 pt-2 ml-[70px] overflow-hidden ${
                    isHelp ? "hover:border-[5px] hover:border-red-500" : ""
                  }`}
                >
                  <img
                    className="-mb-1"
                    src={require("../assets/facial_expressions/" +
                      imageLink +
                      ".png")}
                    alt=""
                  ></img>
                </div>
                <img
                  className="invisible absolute mt-52 object-scale-down w-52 h-52 ml-14"
                  src=""
                  alt=""
                ></img>
                <h3 className="invisible absolute mt-72 text-2xl font-bold  text-yellow-300 ml-14">
                  <span>
                    STREAK: <span>5</span>
                  </span>
                </h3>
              </div>
            </div>

            {/*<!--Synthetic Facial Message AREA-->*/}
            <div
              className={`select-none relative col-span-6 row-span-5 overflow-hidden bg-mainBGBrown    border-t-12 border-t-yellow-700 border-r-12 border-r-yellow-700  rounded-tr-6xl ${
                isHelp
                  ? "ml-2 hover:border-6 hover:border-red-500 hover:overflow-visible"
                  : "ml-3"
              }`}
              {...(isHelp
                ? {
                    dataTooltip:
                      "The feedback area of PIA. Some feedback need your response and there will be options underneath it.",
                  }
                : {})}
              {...(isHelp ? { dataTooltipPosition: "bottom" } : {})}
            >
              <div
                id="message_area_tail"
                className={`absolute w-0 h-0 border-t-25 border-t-transparent border-b-25 border-b-transparent border-r-18 border-r-slate-200 left-0 top-1/3 z-10  bg-brTwo ${
                  isHelp ? "left-1" : isTutorial ? "invisible" : ""
                }`}
              />
              <div
                id="message_area"
                className="border-l-brTwo border-l-18 relative grid grid-rows-6 h-full w-2/2  bg-slate-200 rounded-tr-4xl "
              >
                <div className="row-span-5 flex justify-center text-center items-center  drop-shadow-[0_2px_1px_rgba(255,255,255,0.35)]">
                  <p className=" text-3xl leading-9 font-poppins font-semibold px-4">
                    {textResponse}

                    <p className="text-4.5xl mt-3 font-extrabold ">
                      {" "}
                      {subtextResponse}
                    </p>
                  </p>
                  <span
                    id="solved"
                    className="invisible absolute bottom-0 text-2xl leading-9 font-poppins font-semibold"
                  >
                    {questionResponse}
                  </span>
                </div>

                {/*<!-- CONTINUE OR NO area-->*/}
                <div className="bg-gray-500/20  relative px-8  text-white drop-shadow-[0_2px_1px_rgba(0,0,0,0.35)]">
                  <div className="grid mt-1.5">
                    <div
                      id="choice"
                      className="invisible absolute flex items-center justify-center z-10 mx-auto left-0 right-0"
                    >
                      <button
                        onClick={nextQuestion}
                        className="bg-yes hover:bg-lime-500 text-xl font-bold py-1 w-32 rounded-full border border-black font-leagueSpartan text-center"
                      >
                        <span className="drop-shadow-[0_2px_1px_rgba(0,0,0,0.35)]">
                          SURE!
                        </span>
                      </button>
                    </div>
                    <div id="choiceTwo" className="invisible grid grid-cols-2">
                      <div className="mx-auto ">
                        <button
                          onClick={setLevel}
                          className="bg-yes hover:bg-lime-500 text-xl font-bold py-1 w-32 rounded-full border border-black font-leagueSpartan text-center"
                        >
                          <span className="drop-shadow-[0_2px_1px_rgba(0,0,0,0.35)]">
                            SURE!
                          </span>
                        </button>
                      </div>
                      <div className="mx-auto">
                        <button
                          onClick={nextQuestion}
                          className="bg-no hover:bg-red-600 text-xl font-bold py-1 w-32 rounded-full border border-black font-leagueSpartan text-center"
                        >
                          <span className="drop-shadow-[0_2px_1px_rgba(0,0,0,0.35)]">
                            NOT YET
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*&& textInput === "3"*/}
            {/*<!-- main WHITE BOARD area-->*/}
            <div
              id="solutionArea"
              className={`col-span-9 row-span-12 bg-white  border-l-12  border-l-brTwo ${
                isHelp ? "hover:border-4 hover:border-red-500" : ""
              }`}
              {...(isHelp
                ? {
                    dataTooltip:
                      "The area for correct step or answers you must input.",
                  }
                : {})}
              {...(isHelp ? { dataTooltipPosition: "right" } : {})}
            >
              <div className="flex">
                {
                  <p className="ml-32 font-poppins text-3.5xl font-medium">
                    <div id="answer_area" className="invisible p-2 text-center">
                      {answerDisplay.map((ans, index) =>
                        length === index + 1 ? (
                          // last one
                          <div
                            id={"answer" + index}
                            className="invisible px-2 border-black border-2"
                          >
                            {ans}
                          </div>
                        ) : (
                          <div id={"answer" + index} className="invisible">
                            {ans}
                          </div>
                        )
                      )}
                    </div>
                  </p>
                }
              </div>
            </div>

            {/*<!--Streak etc. -->*/}
            <div
              id="streakArea"
              className="col-span-5 row-span-5 bg-white border-r-12  border-yellow-700 "
            >
              <div className="flex relative"></div>
            </div>

            {/*<!--userlogs TEXT divider section-->*/}
            <div className="col-span-6 ml-3 border-l-18 border-brTwo pt-1 bg-mainBGBrown ">
              <div className="flex justify-center text-center border-dotted border-b-4">
                <p className="text-3.5xl font-poppins font-bold text-white overflow-hidden">
                  USER LOGS
                </p>
              </div>
            </div>

            {/*<!--userLogs STORING area --> UPDATE: ADDED +1 ROWSPAN*/}
            <div
              className={`col-span-5 row-span-8 ml-3 border-l-18 -mr-20 border-brTwo ${
                isHelp ? " hover:bg-red-500" : ""
              }`}
              {...(isHelp
                ? {
                    dataTooltip:
                      "This is the area to show your input logs, You could copy and paste text from here to input box.",
                  }
                : {})}
              {...(isHelp ? { dataTooltipPosition: "bottom" } : {})}
            >
              <div
                id="logs"
                className="px-5 overflow-auto max-h-[26rem]  style-1 pb-11"
              >
                {
                  <p className=" text-white break-word font-poppins text-3xl">
                    {arrTextLog.map((entry) => (
                      <p>{entry}</p>
                    ))}
                  </p>
                }
              </div>
            </div>

            {/*<!--White area in whiteboard under synthetic face-->*/}
            <div
              className={`relative col-span-5 row-span-4 bg-white border-r-12  border-r-yellow-700 ${
                isPen ? "invisible" : ""
              }`}
            >
              <button
                onClick={skipQuestion}
                id="skip_button"
                className="invisible absolute bottom-2 right-2 text-gray-400/60 bg-gray-200/50 px-2 py-0.5 rounded-full hover:bg-gray-300 hover:text-gray-600"
              >
                Skip
              </button>
              <div className="flex justify-center"></div>
            </div>

            {/*<!--text Area-->*/}
            <div
              className={`col-span-14 row-span-2  bg-mainBGBrown border-r-yellow-700 border-r-12 ${
                isHelp ? " hover:bg-red-500" : ""
              }`}
              {...(isHelp
                ? {
                    dataTooltip:
                      "The area to put your answers, and submit it. Please write relevant answers only.",
                  }
                : {})}
              {...(isHelp ? { dataTooltipPosition: "top" } : {})}
            >
              <div className="flex flex-col  border-borderBr rounded-5xl border-12 mt-3.5 m-3.5 mx-4 ">
                <div
                  className={`relative  bg-borderBr font-poppins ${
                    isPen ? "hidden" : " "
                  }`}
                >
                  <form autocomplete="off" onSubmit={handleSubmit}>
                    <input
                      id="input_box"
                      value={textInput}
                      onChange={handleChange}
                      maxLength="50"
                      type="text"
                      name="chat"
                      className={` block rounded-5xl w-full p-5  text-2xl  ${
                        isTutorial ? "bg-gray-300 placeholder-gray-500" : ""
                      }`}
                      placeholder="Input your answer here."
                      {...(isTutorial
                        ? {
                            disabled: true,
                          }
                        : {})}
                    ></input>
                    <button
                      onClick={textInput !== "" ? handleClick : undefined}
                      value={textInput}
                      className={` select-none text-white text-xl font-light absolute  right-2.5 bottom-2  rounded-full px-4 py-3  ${
                        isTutorial
                          ? "cursor-default bg-gray-400"
                          : "bg-lime-700  cursor-pointer dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800  hover:bg-lime-800 focus:ring-2 focus:outline-none drop-shadow-[0_2px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_2px_0px_rgba(0,0,0,0.6)]"
                      }`}
                      {...(isTutorial
                        ? {
                            disabled: true,
                          }
                        : {})}
                    >
                      Submit
                    </button>
                  </form>
                </div>
                <div
                  id="penTools"
                  className={`relative bg-borderBr font-poppins  ${
                    isPen ? "" : "hidden"
                  }`}
                >
                  <div className="">
                    <section className="bg-white lg:w-full flex rounded-5xl pt-1.5 overflow-hidden">
                      <div className="row">
                        <label className="title hidden">Shapes</label>
                        <ul className="options hidden">
                          <li className="option tool" id="rectangle">
                            <img
                              src={require("../assets/icons/rectangle.svg")}
                              alt=""
                            ></img>
                            <span>Rectangle</span>
                          </li>
                          <li className="option tool" id="circle">
                            <img
                              src={require("../assets/icons/circle.svg")}
                              alt=""
                            ></img>
                            <span>Circle</span>
                          </li>
                          <li className="option tool" id="triangle">
                            <img
                              src={require("../assets/icons/triangle.svg")}
                              alt=""
                            ></img>
                            <span>Triangle</span>
                          </li>
                          <li className="option">
                            <input type="checkbox" id="fill-color"></input>
                            <label htmlFor="fill-color">Fill color</label>
                          </li>
                        </ul>
                      </div>
                      <div className=" row py-1">
                        <ul className="options flex ">
                          <li
                            onClick={brushMode}
                            className="option active tool px-2 pl-6 border-r-4 mx-auto "
                            id="brush"
                          >
                            <img
                              className="w-8 h-8"
                              src={require("../assets/icons/brush.svg")}
                              alt=""
                            ></img>
                            <span className="text-lg font-semibold">Brush</span>
                          </li>
                          <li
                            onClick={eraserMode}
                            className="option tool px-2  border-r-4 "
                            id="eraser"
                          >
                            <img
                              className="w-8 h-8"
                              src={require("../assets/icons/eraser.svg")}
                              alt=""
                            ></img>
                            <span className="text-lg  font-semibold">
                              Eraser
                            </span>
                          </li>
                          <li
                            title="Set brush or eraser size."
                            className="option px-2 w-72 border-r-4  cursor-default select-none"
                          >
                            <input
                              className="cursor-pointer"
                              type="range"
                              id="size-slider"
                              min="1"
                              max="30"
                              defaultValue="5"
                            ></input>
                          </li>
                        </ul>
                      </div>
                      <div className="row colors relative ml-20 mt-3">
                        <label className="title hidden">Colors</label>
                        <ul className="options scale-190 gap-x-2">
                          <li className="option"></li>
                          <li className="option selected"></li>
                          <li className="option"></li>
                          <li className="option"></li>
                          <li title="Color Picker" className="option">
                            <input
                              type="color"
                              id="color-picker"
                              defaultValue="#4A98F7"
                            ></input>
                          </li>
                        </ul>
                      </div>
                      <div className="row buttons">
                        <button className="clear-canvas ml-20 mt-2">
                          Clear Drawing
                        </button>
                        <button className="save-img hidden">
                          Save As Image
                        </button>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>

            {/*<!--Trashcan area--> UPDATE: REMOVED 5 colspan*/}
            <div className="col-span-6 row-span-2 ml-3 border-l-18 border-brTwo ">
              <div className="flex justify-end mt-8 ">
                <button
                  className=""
                  onClick={clearLogs}
                  {...(isHelp
                    ? {
                        dataTooltip:
                          "The trash bin button. It removes all text from the current user logs.",
                      }
                    : {})}
                  {...(isHelp ? { dataTooltipPosition: "left" } : {})}
                >
                  <svg
                    className={`h-20 w-20 bg-white rounded-full p-3 hover:bg-gray-300 drop-shadow-[0_3px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_3px_0px_rgba(0,0,0,0.6)] ${
                      isHelp ? "hover:border-6 hover:border-red-500" : ""
                    }`}
                    id="Layer_1"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    //xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 512 512"
                  >
                    <defs>
                      <linearGradient
                        id="linear-gradient"
                        x1="256"
                        y1="582.3"
                        x2="256"
                        y2="-70.35"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0" stopColor="#231f20" />
                        <stop offset="1" stopColor="#58595b" />
                      </linearGradient>
                    </defs>
                    {!isHelp && <title>Clear Logs</title>}
                    <path
                      d="M84.47,16.86,231.05,37.92l1.87-13.33a28.45,28.45,0,0,1,32-24.31h0a28.65,28.65,0,0,1,24,32.35L287,46,433.62,67A21.88,21.88,0,0,1,452,91.74v0a21.69,21.69,0,0,1-24.43,18.56L78.38,60.15A21.88,21.88,0,0,1,60,35.43v0A21.72,21.72,0,0,1,84.47,16.86Zm328,92H88.56c-12.17,0-20.67,10-18.86,22.14l52.93,358.9C124.44,502.05,135.85,512,148,512H352.55c12.15,0,23.58-9.95,25.4-22.08L431.31,131C433.12,118.81,424.64,108.85,412.49,108.85ZM179.79,432.73l-.69.07a13.34,13.34,0,0,1-14.48-12.07L141.8,182.35a13.42,13.42,0,0,1,11.91-14.66l.69-.07a13.37,13.37,0,0,1,14.48,12.07l22.84,238.4A13.4,13.4,0,0,1,179.79,432.73ZM264.09,420a13.37,13.37,0,0,1-13.27,13.44h-.67A13.41,13.41,0,0,1,236.87,420V180.48A13.41,13.41,0,0,1,250.15,167h.67a13.37,13.37,0,0,1,13.27,13.44Zm71.6.78A13.35,13.35,0,0,1,321.2,432.8l-.72-.07a13.44,13.44,0,0,1-11.89-14.68l23.09-238.37a13.36,13.36,0,0,1,14.52-12l.65.07a13.44,13.44,0,0,1,11.94,14.66Z"
                      fillRule="evenodd"
                      fill="url(#linear-gradient)"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FinishSessionModal visible={showModal} />
    </>
  );
}
//onClose={handleOnCloseModal} removed
