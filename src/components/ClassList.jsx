import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import * as ReactDOM from "react-dom";
import $ from "jquery";

import { VscEye } from "react-icons/vsc";

export default function ClassList() {
  const navigate = useNavigate();

  //FOR LINKS/NAVBAR/BREADCRUMBS
  const [pageList, setPageList] = useState([]);
  const [pageLink, setPageLink] = useState([]);

  useEffect(() => {
    setPage();

    window.addEventListener("focus", setPage);
    function setPage() {
      let page = ["Home", "Section List", "Class List"];
      let link = ["/AdminHomepage", "/SectionList", "/ClassList"];
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

  var currentSection = "";

  useEffect(() => {
    const data = window.localStorage.getItem("CURRENT_SECTION");
    currentSection = JSON.parse(data);
    currentSection = currentSection.replace(/ /g, "_");
  });

  const [classList, setClassList] = useState([]);
  const [sectionList, setCurrentSection] = useState([]);

  function getClassList() {
    axios
      .get(
        `http://localhost:80/Prototype-Vite/my-project/api/classList/${currentSection}`
      )
      .then(function (response) {
        console.log(response.data);
        setClassList(response.data);
      });
  }

  function getCurrentSection() {
    axios
      .get(
        `http://localhost:80/Prototype-Vite/my-project/api/sectionAdviser/${currentSection}`
      )
      .then(function (response) {
        console.log(response.data);
        setCurrentSection(response.data);
      });
  }

  useEffect(() => {
    getClassList();
    getCurrentSection();
  }, []);

  var inputText = "";

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    inputText = { [name]: value };

    axios
      .post(
        `http://localhost:80/Prototype-Vite/my-project/api/classList/${currentSection}`,
        inputText
      )
      .then(function (response) {
        console.log(response.data);
        setClassList(response.data);
      });
  };

  var currentAccount = "";

  const setCurrentAccount = () => {
    window.localStorage.setItem(
      "CURRENT_EMAIL",
      JSON.stringify(currentAccount)
    );
    for (let i = 0; i < currentAccount.length; i++) {
      if (currentAccount[i].match(/[\@]/)) {
        currentAccount = currentAccount.substring(0, i);
        currentAccount = currentAccount.replace(".", "_");
        break;
      }
    }
    console.log(currentAccount);
    window.localStorage.setItem(
      "CURRENT_ACCOUNT",
      JSON.stringify(currentAccount)
    );
  };

  const StudentDetailPage = () => {
    let page = ["Home", "Section List", "Class List", "Student Details"];
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
    setTimeout(proceed, 1);

    function proceed() {
      navigate("/StudentDetail");
    }
  };

  //Adjust BG gradient color
  function getHeight() {
    var divElement = document.getElementById("container");
    var heightValue = ReactDOM.findDOMNode(divElement).offsetHeight;
    console.log(heightValue);
    if (heightValue > 920) {
      document.body.style.height = "100%";
    } else {
      document.body.style.height = "100vh";
    }
  }

  useEffect(() => {
    getHeight();
  });

  //GO BACK FUNCTION
  const SectionListPage = () => {
    let page = ["Home", "Section List"];
    let link = ["/AdminHomepage", "/SectionList"];
    setPageList(page);
    setPageLink(link);

    window.localStorage.setItem("NAVBAR_PAGE", JSON.stringify(pageList));
    window.localStorage.setItem("NAVBAR_PAGE_LINK", JSON.stringify(pageLink));
    setTimeout(proceed, 1);

    function proceed() {
      navigate("/SectionList");
    }
  };

  return (
    <>
      <div className="h-[93.7vh] flex items-center justify-center ">
        <section
          id="container"
          className="relative w-10/12  mx-auto my-10 p-6 rounded-6xl border-l-12 border-b-12 border-yellow-700 bg-mainBGBrown border-r-12 border-r-brTwo shadow-2xl shadow-yellow-400"
        >
          <button
            onClick={SectionListPage}
            className="absolute left-0 top-[47%] bottom-1/2 -ml-[4.05rem]"
          >
            <p className="select-none fa fa-chevron-circle-left text-gray-100 text-3xl hover:text-white rounded-l-full  bg-mainBGBrown py-4 pl-2 pr-2 border-l-6 border-b-6 border-l-yellow-700 border-b-yellow-700 	 hover:bg-[#dd9932] hover:border-l-[#bd7e1f] hover:border-b-[#bd7e1f]">
              {" "}
            </p>
          </button>
          <div className="">
            <div className="float-left py-2 rounded-3xl bg-white border-r-12 border-t-12 border-yellow-700 border-l-12 border-l-brTwo shadow-yellow-700">
              <div className="w-full flex items-center justify-between px-5">
                <div className="rounded-2xl  first-letter:rounded-2xl bg-gray-200 px-5 shadow-sm shadow-gray-600 flex items-center outline-title font-bold">
                  <div className="flex">
                    <h2 className=" text-gray-500  lg:text-3xl font-semibold ">
                      {sectionList.map((section) => (
                        <>{`${section.GradeLevel} - ${section.SectionName}`}</>
                      ))}
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            <div className="float-left bg-mainBGBrown w-10 select-none">
              {"\u00A0"}
            </div>

            <div className="float-left py-2 rounded-3xl  bg-white border-r-12 border-t-12 border-yellow-700 border-l-12 border-l-brTwo shadow-yellow-700">
              <div className="inline-flex items-center justify-between px-5">
                <div className="w-full rounded-2xl first-letter:rounded-2xl bg-gray-200 px-5 shadow-sm shadow-gray-600 flex items-center outline-title font-bold">
                  <div className="relative "></div>
                  <h2 className=" text-gray-500 stroke-cyan-500 lg:text-3xl font-semibold ">
                    {sectionList.map((section) => (
                      <>{`${section.AdviserTitle}. ${section.AdviserName} ${section.AdviserSurname}`}</>
                    ))}
                  </h2>
                </div>
              </div>
            </div>

            <div className="float-left bg-mainBGBrown  w-10 select-none">
              {"\u00A0"}
            </div>

            <div className="overflow-hidden py-1 px-5 rounded-3xl   bg-white border-r-12 border-t-12 border-yellow-700 border-l-12 border-l-brTwo shadow-yellow-700">
              <div className="w-full m-1 overflow-hidden shadow-sm shadow-gray-600 rounded-2xl text-lg">
                <div className="flex bg-gray-200 py-1 items-center text-left rounded-2xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-4 h-10 w-10 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <input
                    className="bg-gray-200  outline-none ml-3 block w-full"
                    type="text"
                    name="searchQuery"
                    id="searchQuery"
                    onChange={handleChange}
                    placeholder="&nbsp;Search People..."
                  />
                </div>
              </div>
            </div>
            <div className="bg-mainBGBrown  w-1/3"></div>
          </div>

          <div className="bg-mainBGBrown  w-full">{"\u00A0"}</div>

          <div className="rounded-3xl overflow-hidden bg-gradient-to-t from-gray-200 via-gray-100 to-white shadow-lg border-r-12 border-t-12 border-yellow-700 border-l-12 border-l-brTwo shadow-yellow-700 ">
            <table className="w-full leading-normal ">
              <thead className="sticky top-0 z-40 shadow-md border-b-2 border-gray-200 bg-gray-200 text-left uppercase tracking-wider text-md font-bold text-gray-600">
                <tr>
                  <th className="pl-20 pr-96 py-3">Student Name</th>
                  <th></th>
                  <th className="pr-24 py-3">Age</th>
                  <th className="pr-20 py-3 ">Gender</th>
                  <th className="py-3">Group Type</th>
                  <th className="pl-[196px] py-3 select-none "></th>
                </tr>
              </thead>
            </table>
            <div className="relative overflow-y-scroll style-2 min-h-[680px] max-h-[680px] mx-auto w-full rounded-md">
              <div className="">
                <div className="">
                  <div className="inline-block min-w-full shadow rounded-lg ">
                    <table className="min-w-full leading-normal -mt-[28px]">
                      <thead className="invisible">
                        <tr>
                          <th className="pl-20 pr-96">Student Name</th>
                          <th></th>
                          <th className="pr-24">Age</th>
                          <th className="pr-20 ">Gender</th>
                          <th className="">Group Type</th>
                          <th className="pl-16 select-none "></th>
                        </tr>
                      </thead>
                      <tbody className="">
                        {classList.map((account, key) => (
                          <tr
                            key={key}
                            className="border-b border-gray-200 bg-white hover:bg-gray-100 text-gray-900 hover:text-indigo-600"
                          >
                            <td className="flex items-center text-md px-5 py-[10px]  whitespace-no-wrap">
                              <div className="flex-shrink-0 w-10 h-10 mr-3">
                                {account.Gender == "Male" ? (
                                  <img
                                    className="border-2 border-gray-300 rounded-full"
                                    src={require("../assets/avatar/avatar-male.png")}
                                    alt=""
                                  />
                                ) : (
                                  <img
                                    className="border-2 border-gray-300 rounded-full"
                                    src={require("../assets/avatar/avatar-female.png")}
                                    alt=""
                                  />
                                )}
                              </div>
                              <p className="pl-2">
                                {account.GivenName + " " + account.LastName}
                              </p>
                            </td>
                            <td></td>
                            <td className="pr-24">
                              <p>{account.Age}</p>
                            </td>
                            <td className="pr-20">
                              <p>{account.Gender}</p>
                            </td>
                            <td className="">
                              <p>{account.GroupType}</p>
                            </td>
                            <td className="pr-10 text-right">
                              <a
                                onClick={function () {
                                  currentAccount = account.Email;
                                  setCurrentAccount();
                                  setTimeout(StudentDetailPage, 1);
                                }}
                              >
                                <button className="relative text-md w-36 text-white bg-lime-600 hover:bg-lime-700 py-2 rounded-xl shadow-lg">
                                  <p className="pr-2">See details</p>
                                  <VscEye className="absolute right-3 top-1/3" />
                                </button>
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="w-full bg-white"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
