var Initiation = (function () {
  var initiatePage = function () {
    let page = ["Home"];
    let link = ["/Homepage"];
    window.localStorage.setItem("NAVBAR_PAGE", JSON.stringify(page));
    window.localStorage.setItem("NAVBAR_PAGE_LINK", JSON.stringify(link));
    window.localStorage.setItem("SYSTEM_VERSION", JSON.stringify("FULL"));
  };

  return {
    initiatePage: initiatePage,
  };
})();

export default Initiation;
