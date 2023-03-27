import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import * as ReactDOM from "react-dom";
import $ from "jquery";

export default function StudentDetail() {
  document.body.style.height = "100vh";
  const navigate = useNavigate();

  //FOR LINKS/NAVBAR/BREADCRUMBS
  const [pageList, setPageList] = useState([]);
  const [pageLink, setPageLink] = useState([]);

  useEffect(() => {
    setPage();

    window.addEventListener("focus", setPage);
    function setPage() {
      let page = ["Home", "Section List", "Class List", "Student Detail"];
      let link = [
        "/AdminHomepage",
        "/SectionList",
        "/ClassList",
        "/StudentDetail",
      ];
      setPageList(page);
      setPageLink(link);
      window.localStorage.setItem("NAVBAR_PAGE", JSON.stringify(pageList));
      window.localStorage.setItem("NAVBAR_PAGE_LINK", JSON.stringify(pageLink));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("NAVBAR_PAGE", JSON.stringify(pageList));
  }, [pageList]);

  useEffect(() => {
    window.localStorage.setItem("NAVBAR_PAGE_LINK", JSON.stringify(pageLink));
  }, [pageLink]);

  var currentAccount = "";
  var currentEmail = "";

  useEffect(() => {
    const data1 = window.localStorage.getItem("CURRENT_EMAIL");
    const data2 = window.localStorage.getItem("CURRENT_ACCOUNT");
    currentEmail = JSON.parse(data1);
    currentAccount = JSON.parse(data2);
  }, []);

  const [accountDetail, setAccountDetail] = useState([]);
  const [accountHistory, setAccountHistory] = useState([]);
  const [tallyEasy, countEasy] = useState();
  const [tallyAverage, countAverage] = useState();
  const [tallyDifficult, countDifficult] = useState();

  const [totalUnanswered, setTotalUnanswered] = useState();
  const [totalAnswered, setTotalAnswered] = useState();
  const [accuracyRate, setAccuracy] = useState();

  function getAccountDetail() {
    axios
      .get(
        `http://localhost:80/Prototype-Vite/my-project/api/studentDetail/${currentEmail}`
      )
      .then(function (response) {
        console.log(response.data);
        setAccountDetail(response.data);
      });

    axios
      .get(
        `http://localhost:80/Prototype-Vite/my-project/api/studentHistory/${currentAccount}`
      )
      .then(function (response) {
        console.log(response.data);
        setAccountHistory(response.data);
      });
  }

  useEffect(() => {
    getAccountDetail();
  }, []);

  useEffect(() => {
    countSessions();
  });

  function countSessions() {
    let easy = 0;
    let average = 0;
    let difficult = 0;
    let totalScore = 0;
    let totalSkip = 0;
    let accuracy = 0;

    accountHistory.map(function (history) {
      if (history.SessionType === "Easy") {
        easy++;
        console.log("YAHOO!");
      } else if (history.SessionType === "Average") {
        average++;
      } else if (history.SessionType === "Difficult") {
        difficult++;
      }
      // Each session have 10 questions or might change depends.
      totalSkip += 10;
      totalScore += history.Score;
    });
    accuracy = (totalScore / totalSkip) * 100;
    totalSkip = totalSkip - totalScore;
    accuracy = Math.round(accuracy * 100 + Number.EPSILON) / 100;
    setAccuracy(accuracy);
    countEasy(easy);
    countAverage(average);
    countDifficult(difficult);
    setTotalAnswered(totalScore);
    setTotalUnanswered(totalSkip);
    //console.log(easy);
    //console.log(average);
    //console.log(difficult);
  }

  return (
    <>
      <div className="my-10  lg:scale-100 md:scale-95 w-9/12 mx-auto lg:fixed top-1/1 left-0 right-0 place-items-center  p-6 rounded-10xl border-l-12 border-b-12 border-yellow-700 bg-mainBGBrown border-r-12 border-r-brTwo shadow-2xl shadow-yellow-400">
        <div className="overflow-hidden min-h-[805px] rounded-8xl bg-gradient-to-t from-gray-200 via-white to-white shadow-xl border-r-12 border-t-12 border-yellow-700 border-l-12 border-l-brTwo shadow-yellow-700 w-full h-full p-12 ">
          <div className="grid sm:grid-cols-1 lg:grid-cols-2">
            <div className="">
              {accountDetail.map((account) => (
                <>
                  <p className="lg:text-4xl sm:text-2xl text-black font-bold leading-4 mb-5">
                    {account.GivenName +
                      " " +
                      account.MiddleName[0] +
                      "." +
                      " " +
                      account.LastName}
                  </p>
                  <p className="lg:text-xl sm:text-md text-gray-800 leading-4">
                    {account.Email}
                  </p>
                </>
              ))}
              <br></br>
              <p className="lg:text-xl sm:text-md text-black font-medium leading-4 mb-3">
                Answered Equations:{" "}
                <span id="correct" className="font-normal">
                  {totalAnswered}
                </span>
              </p>
              <p className="lg:text-xl sm:text-md text-black font-medium leading-4 mb-3">
                Unanswered Equations:{" "}
                <span id="incorrect" className="font-normal">
                  {totalUnanswered}
                </span>
              </p>
              <p className="lg:text-xl sm:text-md text-black font-medium leading-4 mb-3">
                Accuracy Rate:{" "}
                <span id="accuracy" className="font-normal">
                  {accuracyRate + "%"}
                </span>
              </p>
            </div>
            <div className="grid grid-cols-3 text-center">
              <div>
                <p className="lg:text-3xl sm:text-xl text-black font-medium leading-4 mb-5">
                  Easy
                </p>
                <div className="lg:w-32 lg:h-32 sm:w-24 sm:h-24 bg-green-500 rounded-full text-center py-5 shadow-lg shadow-green-300 mx-auto ">
                  <span className="text-green-100 lg:text-6xl sm:text-4xl">
                    {tallyEasy}
                  </span>
                </div>
              </div>
              <div>
                <p className="lg:text-3xl sm:text-xl text-black font-medium leading-4 mb-5">
                  Average
                </p>
                <div className="lg:w-32 lg:h-32 sm:w-24 sm:h-24 bg-yellow-500 rounded-full  text-center py-5 shadow-lg shadow-yellow-300 mx-auto">
                  <span className="text-yellow-100 lg:text-6xl sm:text-4xl">
                    {tallyAverage}
                  </span>
                </div>
              </div>
              <div>
                <p className="lg:text-3xl sm:text-xl text-black font-medium leading-4 mb-5">
                  Difficult
                </p>
                <div className="lg:w-32 lg:h-32 sm:w-24 sm:h-24 bg-red-500 rounded-full  text-center py-5 shadow-lg shadow-red-300 mx-auto">
                  <span className="text-red-100 lg:text-6xl sm:text-4xl">
                    {tallyDifficult}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <br></br>
          <hr></hr>
          <br></br>
          <p className="lg:text-4xl sm:text-2xl text-black font-semibold leading-4 mb-7">
            History
          </p>
          <div
            id="history"
            className="overflow-auto bg-gray-300/80 rounded-md mx-3 my-2 min-h-[22rem] max-h-[22rem] style-2"
          >
            {accountHistory.map((history) => (
              <>
                <div
                  className={`grid lg:grid-cols-11 rounded-l-md shadow relative  p-3 ${
                    history.SessionType === "Easy"
                      ? "bg-green-500"
                      : history.SessionType === "Average"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                >
                  <div className="lg:col-span-3">
                    <p className="lg:text-3xl text-green-100 font-medium leading-4 mt-1">
                      {history.SessionType}
                      <span className="lg:text-sm sm:text-xs text-white font-normal ">
                        {"\u00A0\u00A0" + history.TimeStamp}
                      </span>
                    </p>
                  </div>
                  <div className="lg:col-span-6 text-right">
                    <span className="lg:text-xl text-white font-normal">
                      Score: {history.Score + "/10"}
                    </span>
                  </div>
                  <div className="lg:col-span-2 text-right">
                    <span className="lg:text-xl text-white font-normal">
                      Time: {history.TimeSpent}
                    </span>
                  </div>
                </div>
                <hr></hr>
                <hr></hr>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
