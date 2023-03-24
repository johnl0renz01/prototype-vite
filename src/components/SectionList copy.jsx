import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import * as ReactDOM from "react-dom";
import $ from "jquery";

export default function SectionList() {
  document.body.style.height = "100";

  const navigate = useNavigate();

  //FOR LINKS/NAVBAR/BREADCRUMBS
  const [pageList, setPageList] = useState([]);
  const [pageLink, setPageLink] = useState([]);

  useEffect(() => {
    let page = ["Home", "Section List"];
    let link = ["/AdminHomepage", "/SectionList"];
    setPageList(page);
    setPageLink(link);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("NAVBAR_PAGE", JSON.stringify(pageList));
  }, [pageList]);

  useEffect(() => {
    window.localStorage.setItem("NAVBAR_PAGE_LINK", JSON.stringify(pageLink));
  }, [pageLink]);

  //END END END END END END END END END END END END

  const ClassListPage = () => {
    let page = ["Home", "Section List", "Class List"];
    let link = ["/AdminHomepage", "/SectionList", "/ClassList"];
    setPageList(page);
    setPageLink(link);

    window.localStorage.setItem("NAVBAR_PAGE", JSON.stringify(pageList));
    window.localStorage.setItem("NAVBAR_PAGE_LINK", JSON.stringify(pageLink));
    setTimeout(proceed, 1);

    function proceed() {
      navigate("/ClassList");
    }
  };

  const [section1, setSection1] = useState();
  const [section2, setSection2] = useState();
  const [section3, setSection3] = useState();
  const [section4, setSection4] = useState();
  const [section5, setSection5] = useState();
  const [section6, setSection6] = useState();
  const [section7, setSection7] = useState();
  const [section8, setSection8] = useState();

  function getSections() {
    axios
      .get(
        "http://localhost:80/Prototype-Vite/my-project/api/sectionList/Rizal"
      )
      .then(function (response1) {
        console.log(response1.data);
        setSection1(response1.data);
      });

    axios
      .get(
        "http://localhost:80/Prototype-Vite/my-project/api/sectionList/Bonifacio"
      )
      .then(function (response2) {
        console.log(response2.data);
        setSection2(response2.data);
      });

    axios
      .get(
        "http://localhost:80/Prototype-Vite/my-project/api/sectionList/Mabini"
      )
      .then(function (response3) {
        console.log(response3.data);
        setSection3(response3.data);
      });

    axios
      .get(
        "http://localhost:80/Prototype-Vite/my-project/api/sectionList/Aguinaldo"
      )
      .then(function (response4) {
        console.log(response4.data);
        setSection4(response4.data);
      });

    axios
      .get(
        "http://localhost:80/Prototype-Vite/my-project/api/sectionList/Jacinto"
      )
      .then(function (response5) {
        console.log(response5.data);
        setSection5(response5.data);
      });

    axios
      .get("http://localhost:80/Prototype-Vite/my-project/api/sectionList/Luna")
      .then(function (response6) {
        console.log(response6.data);
        setSection6(response6.data);
      });

    axios
      .get(
        "http://localhost:80/Prototype-Vite/my-project/api/sectionList/Del Pilar"
      )
      .then(function (response7) {
        console.log(response7.data);
        setSection7(response7.data);
      });

    axios
      .get(
        "http://localhost:80/Prototype-Vite/my-project/api/sectionList/Silang"
      )
      .then(function (response8) {
        console.log(response8.data);
        setSection8(response8.data);
      });
  }

  useEffect(() => {
    getSections();
  }, []);

  function test(sectionName, teacherName, sectionOrder) {
    return (
      <div
        className={`max-w-xs  ${
          sectionOrder > 0
            ? "bg-white border-l-8 border-b-8 border-gray-500/60 border-r-gray-200 border-t-gray-200 border-r-8 border-t-8  px-5 py-6 rounded-xl shadow-md text-indigo-600 hover:text-orange-700 hover:border-r-yellow-400/70 hover:border-t-yellow-400/70 hover:border-b-yellow-500 hover:border-l-yellow-500 hover:shadow-orange-300 transform hover:scale-105 transition duration-500"
            : "bg-gray-400 border-l-8 border-b-8 border-gray-600/40 border-r-gray-300 border-t-gray-300 border-r-8 border-t-8  px-5 py-6 rounded-xl shadow-md text-gray-600/50"
        }`}
      >
        <h3 className="mb-3 text-xl font-bold  drop-shadow">
          7 - {sectionName}
        </h3>
        <div className="relative rounded-xl shadow-md shadow-black/40">
          <img
            className={`w-full rounded-xl h-48 object-cover ${
              sectionOrder > 0 ? "opacity-100" : "opacity-50"
            }`}
            src="data:image/jpeg;base64,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"
            alt="Colors"
          />
        </div>
        <div
          className={`my-3 select-none  ${
            sectionOrder > 0 ? "text-gray-800" : "text-gray-600/80"
          }`}
        >
          <div className="flex space-x-3 items-center">
            <span className=" text-2xl "> Teacher: </span>
            <p className="pt-1 text-xl">{teacherName}</p>
          </div>
          <div className="flex space-x-3 items-center">
            <span className="text-2xl"> Students: </span>
            <p className="pt-1 text-xl">
              {sectionOrder > 0 ? sectionOrder + " Students" : "No Students"}
            </p>
          </div>
        </div>
        <a>
          <button
            onClick={ClassListPage}
            className={`mt-3 text-xl w-full  py-2 rounded-xl  shadow-lg ${
              sectionOrder > 0
                ? "text-white bg-lime-600 hover:bg-lime-700 hover:-translate-y-1 ease-in-out transition duration-300 transform "
                : "text-gray-700/60 bg-gray-500 "
            }`}
            disabled={sectionOrder < 0}
          >
            Visit class
          </button>
        </a>
      </div>
    );
  }

  return (
    <>
      <section className="relative w-10/12 mx-auto my-10  p-6 rounded-6xl border-l-12 border-b-12 border-yellow-700 bg-mainBGBrown border-r-12 border-r-brTwo shadow-2xl shadow-yellow-400">
        {/*
        <div className="mt-4 mx-6">
           
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-gray-600 font-semibold text-3xl">
                Section List
              </h2>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex bg-gray-50 items-center p-2 rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
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
                  className="bg-gray-50 outline-none ml-1 block"
                  type="text"
                  name=""
                  id=""
                  placeholder="&nbsp;Search..."
                />
              </div>
            </div>
          </div>
        </div>
        */}
        <div className="overflow-hidden  py-5 h-full rounded-6xl  bg-gradient-to-t from-gray-200 via-gray-100 to-white shadow-lg border-r-12 border-t-12 border-yellow-700 border-l-12 border-l-brTwo shadow-yellow-700 ">
          <section className="relative mx-auto grid w-full p-10">
            <div className="grid place-items-center md:grid md:grid-cols-3 lg:grid-cols-4 gap-y-10">
              {test("Rizal", "Ms. Ortencio", section1)}
              <div className="max-w-xs bg-white border-l-8 border-b-8 border-gray-500/60 border-r-gray-200 border-t-gray-200 border-r-8 border-t-8  px-5 py-6 rounded-xl shadow-md text-indigo-600 hover:text-orange-700 hover:border-r-yellow-400/70 hover:border-t-yellow-400/70 hover:border-b-yellow-500 hover:border-l-yellow-500 hover:shadow-orange-300 transform hover:scale-105 transition duration-500">
                <h3 className="mb-3 text-xl font-bold drop-shadow">
                  7 - Bonifacio
                </h3>
                <div className="relative rounded-xl shadow-md shadow-black/40">
                  <img
                    className="w-full h-48 rounded-xl object-cover"
                    src="data:image/jpeg;base64,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"
                    alt="Colors"
                  />
                </div>
                <div className="my-3 select-none text-gray-800">
                  <div className="flex space-x-3 items-center">
                    <span className="text-2xl"> Teacher: </span>
                    <p className="pt-1 text-xl">Mr. Bana</p>
                  </div>
                  <div className="flex space-x-3 items-center">
                    <span className="text-2xl"> Students: </span>
                    <p className="pt-1 text-xl">
                      {section2 + "\u00A0"} Students
                    </p>
                  </div>
                </div>
                <button className="mt-3 text-xl w-full text-white bg-lime-600 hover:bg-lime-700 py-2 rounded-xl shadow-lg">
                  Visit class
                </button>
              </div>

              <div className="max-w-xs bg-white border-l-8 border-b-8 border-gray-500/60 border-r-gray-200 border-t-gray-200 border-r-8 border-t-8  px-5 py-6 rounded-xl shadow-md text-indigo-600 hover:text-orange-700 hover:border-r-yellow-400/70 hover:border-t-yellow-400/70 hover:border-b-yellow-500 hover:border-l-yellow-500 hover:shadow-orange-300 transform hover:scale-105 transition duration-500">
                <h3 className="mb-3 text-xl font-bold drop-shadow">
                  7 - Mabini
                </h3>
                <div className="relative rounded-xl shadow-md shadow-black/40">
                  <img
                    className="w-full h-48 rounded-xl object-cover"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa8j0eiHdwjPJQeGYDuxBoxxkh7s68Iq0bGw&usqp=CAU"
                    alt="Colors"
                  />
                </div>
                <div className="my-3 select-none text-gray-800">
                  <div className="flex space-x-3 items-center">
                    <span className="text-2xl "> Teacher: </span>
                    <p className="pt-1 text-xl">Mr. Afable</p>
                  </div>
                  <div className="flex space-x-3 items-center">
                    <span className="text-2xl"> Students: </span>
                    <p className="pt-1 text-xl">
                      {section3 + "\u00A0"} Students
                    </p>
                  </div>
                </div>
                <button className="mt-3 text-xl w-full text-white bg-lime-600 hover:bg-lime-700 py-2 rounded-xl shadow-lg">
                  Visit class
                </button>
              </div>

              <div className="max-w-xs bg-white border-l-8 border-b-8 border-gray-500/60 border-r-gray-200 border-t-gray-200 border-r-8 border-t-8  px-5 py-6 rounded-xl shadow-md text-indigo-600 hover:text-orange-700 hover:border-r-yellow-400/70 hover:border-t-yellow-400/70 hover:border-b-yellow-500 hover:border-l-yellow-500 hover:shadow-orange-300 transform hover:scale-105 transition duration-500">
                <h3 className="mb-3 text-xl font-bold  drop-shadow">
                  7 -Aguinaldo
                </h3>
                <div className="relative rounded-xl shadow-md shadow-black/40">
                  <img
                    className="w-full h-48 rounded-xl object-cover"
                    src="https://www.mybalitz.com/wp-content/uploads/2021/07/emilio_auginaldo-1024x683.jpg"
                    alt="Colors"
                  />
                </div>
                <div className="my-3 select-none text-gray-800">
                  <div className="flex space-x-3 items-center">
                    <span className=" text-2xl "> Teacher: </span>
                    <p className="pt-1 text-xl">Ms. R. Tolentino</p>
                  </div>
                  <div className="flex space-x-3 items-center">
                    <span className="text-2xl"> Students: </span>
                    <p className="pt-1 text-xl">
                      {section4 + "\u00A0"} Students
                    </p>
                  </div>
                </div>
                <button className="mt-3 text-xl w-full text-white bg-lime-600 hover:bg-lime-700 py-2 rounded-xl shadow-lg">
                  Visit class
                </button>
              </div>

              <div className="max-w-xs bg-white border-l-8 border-b-8 border-gray-500/60 border-r-gray-200 border-t-gray-200 border-r-8 border-t-8  px-5 py-6 rounded-xl shadow-md text-indigo-600 hover:text-orange-700 hover:border-r-yellow-400/70 hover:border-t-yellow-400/70 hover:border-b-yellow-500 hover:border-l-yellow-500 hover:shadow-orange-300 transform hover:scale-105 transition duration-500">
                <h3 className="mb-3 text-xl font-bold drop-shadow">
                  7 -Jacinto
                </h3>
                <div className="relative rounded-xl shadow-md shadow-black/40">
                  <img
                    className="w-full h-48 rounded-xl object-cover"
                    src="https://files01.pna.gov.ph/ograph/2019/04/13/0-02-06-6de5dec39017b9b451f0113a6319e07af3f22bf1e7b1eab764dc613cf50686f53800b90f.jpg"
                    alt="Colors"
                  />
                </div>
                <div className="my-3 select-none text-gray-800">
                  <div className="flex space-x-3 items-center">
                    <span className="text-2xl "> Teacher: </span>
                    <p className="pt-1 text-xl">Ms. Ventura</p>
                  </div>
                  <div className="flex space-x-3 items-center">
                    <span className="text-2xl"> Students: </span>
                    <p className="pt-1 text-xl">
                      {section5 + "\u00A0"} Students
                    </p>
                  </div>
                </div>
                <button className="mt-3 text-xl w-full text-white bg-lime-600 hover:bg-lime-700 py-2 rounded-xl shadow-lg">
                  Visit class
                </button>
              </div>

              <div className="max-w-xs bg-white border-l-8 border-b-8 border-gray-500/60 border-r-gray-200 border-t-gray-200 border-r-8 border-t-8  px-5 py-6 rounded-xl shadow-md text-indigo-600 hover:text-orange-700 hover:border-r-yellow-400/70 hover:border-t-yellow-400/70 hover:border-b-yellow-500 hover:border-l-yellow-500 hover:shadow-orange-300 transform hover:scale-105 transition duration-500">
                <h3 className="mb-3 text-xl font-bold">7 -Luna</h3>
                <div className="relative rounded-xl shadow-md shadow-black/40">
                  <img
                    className="w-full h-48 rounded-xl object-cover"
                    src="https://www.mybalitz.com/wp-content/uploads/2021/07/general-antonio-luna-1024x683.jpeg"
                    alt="Colors"
                  />
                </div>
                <div className="my-3 select-none text-gray-800">
                  <div className="flex space-x-3 items-center">
                    <span className=" text-2xl "> Teacher: </span>
                    <p className="pt-1 text-xl">Ms. Ramirez</p>
                  </div>
                  <div className="flex space-x-3 items-center">
                    <span className="text-2xl"> Students: </span>
                    <p className="pt-1 text-xl">
                      {section6 + "\u00A0"} Students
                    </p>
                  </div>
                </div>
                <button className="mt-3 text-xl w-full text-white bg-lime-600 hover:bg-lime-700 py-2 rounded-xl shadow-lg">
                  Visit class
                </button>
              </div>

              <div className="max-w-xs bg-white border-l-8 border-b-8 border-gray-500/60 border-r-gray-200 border-t-gray-200 border-r-8 border-t-8  px-5 py-6 rounded-xl shadow-md text-indigo-600 hover:text-orange-700 hover:border-r-yellow-400/70 hover:border-t-yellow-400/70 hover:border-b-yellow-500 hover:border-l-yellow-500 hover:shadow-orange-300 transform hover:scale-105 transition duration-500">
                <h3 className="mb-3 text-xl font-bold drop-shadow">
                  7 - Del Pilar
                </h3>
                <div className="relative rounded-xl shadow-md shadow-black/40">
                  <img
                    className="w-full h-48 rounded-xl object-cover"
                    src="https://www.1898miniaturas.com/wp-content/uploads/2017/05/Gregorio-Del-Pilar.jpg"
                    alt="Colors"
                  />
                </div>
                <div className="my-3 select-none text-gray-800">
                  <div className="flex space-x-3 items-center">
                    <span className=" text-2xl "> Teacher: </span>
                    <p className="pt-1 text-xl">Ms. Co</p>
                  </div>
                  <div className="flex space-x-3 items-center">
                    <span className="text-2xl"> Students: </span>
                    <p className="pt-1 text-xl">
                      {section7 + "\u00A0"} Students
                    </p>
                  </div>
                </div>
                <button className="mt-3 text-xl w-full text-white bg-lime-600 hover:bg-lime-700 py-2 rounded-xl shadow-lg">
                  Visit class
                </button>
              </div>

              <div className="max-w-xs bg-white border-l-8 border-b-8 border-gray-500/60 border-r-gray-200 border-t-gray-200 border-r-8 border-t-8  px-5 py-6 rounded-xl shadow-md text-indigo-600 hover:text-orange-700 hover:border-r-yellow-400/70 hover:border-t-yellow-400/70 hover:border-b-yellow-500 hover:border-l-yellow-500 hover:shadow-orange-300 transform hover:scale-105 transition duration-500">
                <h3 className="mb-3 text-xl font-bold drop-shadow">
                  7 - Silang
                </h3>
                <div className="relative rounded-xl shadow-md shadow-black/40">
                  <img
                    className="w-full h-48 rounded-xl object-cover"
                    src="data:image/jpeg;base64,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"
                    alt="Colors"
                  />
                </div>
                <div className="my-3 select-none text-gray-800">
                  <div className="flex space-x-3 items-center">
                    <span className=" text-2xl "> Teacher: </span>
                    <p className="pt-1 text-xl">Mr. Callope</p>
                  </div>
                  <div className="flex space-x-3 items-center">
                    <span className="text-2xl"> Students: </span>
                    <p className="pt-1 text-xl">
                      {section8 + "\u00A0"} Students
                    </p>
                  </div>
                </div>
                <button className="mt-3 text-xl w-full text-white bg-lime-600 hover:bg-lime-700 py-2 rounded-xl shadow-lg">
                  Visit class
                </button>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
