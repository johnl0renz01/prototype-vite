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
    let expressionMotivation = window.localStorage.getItem(
      "EXPRESSION_MOTIVATION"
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
      expressionSurprised +
      "@" +
      expressionMotivation;
    sessionData = sessionData.replace(/"/g, "");

    axios
      .post(
        `http://localhost:80/Prototype-Vite/my-project/api/endSession/${sessionData}`
      )
      .then(function (response) {
        console.log(response.data);
      });
  };

  return {
    recordData: recordData,
  };
})();

export default EndSession;
