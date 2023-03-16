import React, { Component } from "react";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as ReactDOM from "react-dom";
import $ from "jquery";

import EquationSolver from "./equationSolver";
import MY_API_KEY from "./API_KEY";

export default function Homepage() {
  document.body.style.height = "100vh";

  const navigate = useNavigate();

  //FOR LINKS/NAVBAR/BREADCRUMBS
  const [pageList, setPageList] = useState([]);
  const [pageLink, setPageLink] = useState([]);

  useEffect(() => {
    let page = ["Home"];
    let link = ["/Homepage"];
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

  const DifficultyPage = () => {
    let page = ["Home", "Difficulty"];
    let link = ["/Homepage", "/Difficulty"];
    setPageList(page);
    setPageLink(link);

    window.localStorage.setItem("NAVBAR_PAGE", JSON.stringify(pageList));
    window.localStorage.setItem("NAVBAR_PAGE_LINK", JSON.stringify(pageLink));
    setTimeout(proceed, 1);

    function proceed() {
      navigate("/Difficulty");
    }
  };

  return (
    <>
      <section className="grid place-items-center">
        <div className="py-16 w-2/3">
          <div className="bg-white border-l-12 border-b-12 border-gray-600/60 border-r-12 border-r-gray-300/80 px-8 py-2 rounded-6xl shadow-2xl shadow-yellow-400 ">
            <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 ">
              <div className="lg:flex w-full overflow-hidden bg-white rounded-6xl sm:mx-auto">
                <div className="sm:col-span-3 select-none">
                  <img
                    src={require("../assets/images/home_pic.png")}
                    alt=""
                    className="object-fill sm:w-screen lg:h-full"
                  />
                </div>
                <div className="grid p-8 bg-white lg:px-16 lg:pl-10 lg:w-3/4">
                  <div>
                    <p className="mb-3 inline-block text-xs font-semibold tracking-wider uppercase rounded-full">
                      Let's learn Linear Equations!
                    </p>
                    <h5 className="mb-5 text-3xl font-bold leading-none sm:text-4xl ">
                      PERSONAL INSTRUCTING AGENT
                    </h5>
                    <p className="text-gray-800 text-justify">
                      <span className="font-bold ">
                        {" "}
                        Personal Instructing Agents (PIA){" "}
                      </span>{" "}
                      are human-like computer characters that aim to guide and
                      support students in learning their academic lessons.
                    </p>
                  </div>
                  <div className="flex mx-auto ">
                    <button
                      onClick={DifficultyPage}
                      className="mt-10 inline-flex items-center justify-center text-xl rounded-full h-12 lg:px-28 md:lg:px-28 px-16 mr-6 font-medium tracking-wide text-white transition duration-200 shadow-md bg-yellow-600 hover:bg-yellow-700 focus:shadow-outline focus:outline-none"
                    >
                      Start
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
