var CheckerLogin = (function () {
  var checkData = function () {
    var email = JSON.parse(window.localStorage.getItem("SESSION_EMAIL"));
    var accountType = JSON.parse(window.localStorage.getItem("ACCOUNT_TYPE"));
    
  };

  return {
    checkData: checkData,
  };
})();

export default CheckerLogin;
