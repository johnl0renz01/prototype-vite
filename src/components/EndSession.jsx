import axios from "axios";

var EndSession = (function () {
  var recordData = function () {
    //RECORD DATA
    let sessionId = window.localStorage.getItem("SESSION_ID");
    let sessionScore = window.localStorage.getItem("SESSION_SCORE");
    let expressionAngry = window.localStorage.getItem("EXPRESSION_ANGRY");
    let expressionHappy = window.localStorage.getItem("EXPRESSION_HAPPY");
    let expressionSad = window.localStorage.getItem("EXPRESSION_SAD");
    let expressionSurprised = window.localStorage.getItem(
      "EXPRESSION_SURPRISED"
    );

    var sessionData = window.localStorage.getItem("SESSION_USER_LOGS");
    sessionData =
      sessionData +
      "@" +
      sessionId +
      "@" +
      sessionScore +
      "@" +
      expressionAngry +
      "@" +
      expressionHappy +
      "@" +
      expressionSad +
      "@" +
      expressionSurprised;
    sessionData = sessionData.replace(/"/g, "");

    axios
      .post(
        `http://localhost:80/Prototype-Vite/my-project/api/endSession/${sessionData}`
      )
      .then(function (response) {
        console.log(response.data);
        window.localStorage.removeItem("STREAK_CORRECT");

        window.localStorage.removeItem("EXPRESSION_ANGRY");
        window.localStorage.removeItem("EXPRESSION_SAD");
        window.localStorage.removeItem("EXPRESSION_HAPPY");
        window.localStorage.removeItem("EXPRESSION_SURPRISED");
        window.localStorage.removeItem("STREAK_WRONG");
        window.localStorage.removeItem("USER_LOGS");
        window.localStorage.removeItem("SESSION_SCORE");
        window.localStorage.removeItem("FINISHED_STEPS");
        window.localStorage.removeItem("FINISHED_EQUATION");
        window.localStorage.removeItem("QUESTION_ANSWERED");
        window.localStorage.removeItem("QUESTION_ABANDONED");
        window.localStorage.removeItem("TIMER");

        window.localStorage.removeItem("SESSION_FEEDBACK");
        window.localStorage.removeItem("SESSION_END");
        //window.localStorage.removeItem("DIFFICULTY_TYPE");
      });
  };

  return {
    recordData: recordData,
  };
})();

export default EndSession;
