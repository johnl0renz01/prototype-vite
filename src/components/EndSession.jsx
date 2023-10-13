import axios from 'axios';

import StorageData from './StorageData';
import SecureStorageData from './SecureStorageData';

var EndSession = (function () {
  var recordData = function () {
    //RECORD DATA
    let sessionId = StorageData.localStorageRAW('SESSION_ID');
    let sessionScore = StorageData.localStorageRAW('SESSION_SCORE');
    if (sessionScore === null) sessionScore = 0;
    let expressionAngry = StorageData.localStorageRAW('EXPRESSION_ANGRY');
    if (expressionAngry === null) expressionAngry = 0;
    let expressionHappy = StorageData.localStorageRAW('EXPRESSION_HAPPY');
    if (expressionHappy === null) expressionHappy = 0;
    let expressionSad = StorageData.localStorageRAW('EXPRESSION_SAD');
    if (expressionSad === null) expressionSad = 0;
    let expressionSurprised = StorageData.localStorageRAW(
      'EXPRESSION_SURPRISED'
    );
    if (expressionSurprised === null) expressionSurprised = 0;
    let expressionMotivation = StorageData.localStorageRAW(
      'EXPRESSION_MOTIVATION'
    );
    if (expressionMotivation === null) expressionMotivation = 0;

    let answered = StorageData.localStorageRAW('QUESTION_ANSWERED');
    if (answered === null) answered = 0;

    let abandoned = StorageData.localStorageRAW('QUESTION_ABANDONED');
    if (abandoned === null) abandoned = 0;

    let levelup = StorageData.localStorageRAW('SESSION_LEVELUP');
    if (levelup === null) levelup = 'FALSE';

    let leveldown = StorageData.localStorageRAW('SESSION_LEVELDOWN');
    if (leveldown === null) leveldown = 'FALSE';

    var sessionData = StorageData.localStorageRAW('SESSION_USER_LOGS');
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
      levelup +
      '@' +
      leveldown;
    sessionData = sessionData.replace(/"/g, '');

    var userDatabase = StorageData.localStorageRAW('SESSION_USER_LOGS');
    var currentQuestion = StorageData.localStorageRAW('PREVIOUS_QUESTION');
    var sequence = StorageData.localStorageRAW('EXPRESSION_SEQUENCE');
    if (sequence === null) sequence = '';

    var questionStatus = StorageData.localStorageRAW('QUESTION_STATUS');
    if (questionStatus === null) questionStatus = 'ABANDONED';

    var difficultyType = StorageData.localStorageRAW('DIFFICULTY_TYPE');
    if (difficultyType === null) difficultyType = '';

    var updateData =
      userDatabase +
      '@' +
      sessionId +
      '@' +
      currentQuestion +
      '@' +
      sequence +
      '@' +
      questionStatus +
      '@' +
      difficultyType;
    updateData = updateData.replace(/"/g, '');
    updateData = updateData.replace(/ /g, '_');

    if (sessionId !== null && sessionId !== '') {
      axios
        .post(`https://pia-sfe.online/api/studentSessionUpdate/${updateData}`)
        .then(function (response) {
          //console.log(response.data);
          axios
            .post(`https://pia-sfe.online/api/endSession/${sessionData}`)
            .then(function (response) {
              //console.log(response.data);
            });
        });
    }
  };

  return {
    recordData: recordData,
  };
})();

export default EndSession;
