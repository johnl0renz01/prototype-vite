import axios from 'axios';

var UpdateSession = (function () {
  var recordData = function () {
    //RECORD DATA
    let sessionId = window.localStorage.getItem('SESSION_ID');
    let sessionScore = window.localStorage.getItem('SESSION_SCORE');
    if (sessionScore === null) sessionScore = 0;
    let expressionAngry = window.localStorage.getItem('EXPRESSION_ANGRY');
    if (expressionAngry === null) expressionAngry = 0;
    let expressionHappy = window.localStorage.getItem('EXPRESSION_HAPPY');
    if (expressionHappy === null) expressionHappy = 0;
    let expressionSad = window.localStorage.getItem('EXPRESSION_SAD');
    if (expressionSad === null) expressionSad = 0;
    let expressionSurprised = window.localStorage.getItem(
      'EXPRESSION_SURPRISED'
    );
    if (expressionSurprised === null) expressionSurprised = 0;
    let expressionMotivation = window.localStorage.getItem(
      'EXPRESSION_MOTIVATION'
    );
    if (expressionMotivation === null) expressionMotivation = 0;

    var sessionData = window.localStorage.getItem('SESSION_USER_LOGS');
    sessionData =
      sessionData +
      '@' +
      sessionId +
      '@' +
      sessionScore +
      '@' +
      expressionAngry +
      '@' +
      expressionHappy +
      '@' +
      expressionSad +
      '@' +
      expressionSurprised +
      '@' +
      expressionMotivation;
    sessionData = sessionData.replace(/"/g, '');

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

export default UpdateSession;
