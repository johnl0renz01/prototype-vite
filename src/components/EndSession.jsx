import axios from 'axios';

var EndSession = (function () {
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

    let answered = window.localStorage.getItem('QUESTION_ANSWERED');
    if (answered === null) answered = 0;

    let abandoned = window.localStorage.getItem('QUESTION_ABANDONED');
    if (abandoned === null) abandoned = 0;

    let levelup = window.localStorage.getItem('SESSION_LEVELUP');
    if (levelup === null) levelup = 'FALSE';

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
      expressionMotivation +
      '@' +
      answered +
      '@' +
      abandoned +
      '@' +
      levelup;
    sessionData = sessionData.replace(/"/g, '');

    var userDatabase = window.localStorage.getItem('SESSION_USER_LOGS');
    var currentQuestion = window.localStorage.getItem('PREVIOUS_QUESTION');
    var sequence = window.localStorage.getItem('EXPRESSION_SEQUENCE');
    if (sequence === null) sequence = '';

    var questionStatus = window.localStorage.getItem('QUESTION_STATUS');
    if (questionStatus === null) questionStatus = 'ABANDONED';

    var updateData =
      userDatabase +
      '@' +
      sessionId +
      '@' +
      currentQuestion +
      '@' +
      sequence +
      '@' +
      questionStatus;
    updateData = updateData.replace(/"/g, '');
    updateData = updateData.replace(/ /g, '_');

    axios
      .post(
        `http://localhost:80/Prototype-Vite/my-project/api/studentSessionUpdate/${updateData}`
      )
      .then(function (response) {
        console.log(response.data);
        axios
          .post(
            `http://localhost:80/Prototype-Vite/my-project/api/endSession/${sessionData}`
          )
          .then(function (response) {
            console.log(response.data);
          });
      });
  };

  return {
    recordData: recordData,
  };
})();

export default EndSession;
