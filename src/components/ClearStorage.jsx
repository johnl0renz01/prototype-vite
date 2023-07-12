var ClearStorage = (function () {
  var clearData = function () {
    window.localStorage.removeItem('STREAK_CORRECT');
    window.localStorage.removeItem('EXPRESSION_ANGRY');
    window.localStorage.removeItem('EXPRESSION_SAD');
    window.localStorage.removeItem('EXPRESSION_HAPPY');
    window.localStorage.removeItem('EXPRESSION_SURPRISED');
    window.localStorage.removeItem('EXPRESSION_MOTIVATION');
    window.localStorage.removeItem('STREAK_WRONG');
    window.localStorage.removeItem('USER_LOGS');
    window.localStorage.removeItem('SESSION_SCORE');
    window.localStorage.removeItem('FINISHED_STEPS');
    window.localStorage.removeItem('FINISHED_EQUATION');
    window.localStorage.removeItem('QUESTION_ANSWERED');
    window.localStorage.removeItem('QUESTION_ABANDONED');
    window.localStorage.removeItem('TIMER');

    window.localStorage.removeItem('SESSION_FEEDBACK');
    window.localStorage.removeItem('SESSION_END');
    window.localStorage.removeItem('SESSION_RECORDED');
  };

  return {
    clearData: clearData,
  };
})();

export default ClearStorage;
