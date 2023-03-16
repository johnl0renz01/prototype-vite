import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import * as ReactDOM from "react-dom";
import $ from "jquery";

export default function AdminHomepage() {
  document.body.style.height = "100vh";
  const navigate = useNavigate();

  //FOR LINKS/NAVBAR/BREADCRUMBS
  const [pageList, setPageList] = useState([]);
  const [pageLink, setPageLink] = useState([]);

  useEffect(() => {
    let page = ["Home"];
    let link = ["/AdminHomepage"];
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

  const RegistrationPage = () => {
    let page = ["Home", "Registration"];
    let link = ["/AdminHomepage", "/Registration"];
    setPageList(page);
    setPageLink(link);

    window.localStorage.setItem("NAVBAR_PAGE", JSON.stringify(pageList));
    window.localStorage.setItem("NAVBAR_PAGE_LINK", JSON.stringify(pageLink));
    setTimeout(proceed, 1);

    function proceed() {
      navigate("/Registration");
    }
  };

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
      <section className="grid place-items-center">
        <div className="py-16 w-2/3">
          <main className="relative bg-white border-l-12 border-b-12 border-gray-600/60 border-r-12 border-r-gray-300/80  rounded-6xl shadow-2xl shadow-yellow-400 ">
            <div className=" border-b-16 px-8 pt-16 border-mainBGBrown overflow-hidden">
              <div class="relative w-full select-none">
                <figure>
                  <img
                    className="relative left-0 right-0 mx-auto w-2/3 overflow-hidden"
                    src={require("../assets/images/blackboard.png")}
                  ></img>
                  <figcaption>
                    <div className="absolute left-0 right-0 top-0 bottom-0 mx-auto w-1/2 h-3/4 pt-6 text-center overflow-hidden">
                      <div className="flex-row font-poppins  font-normal text-white text-center">
                        <div className="">
                          <p className="font-bold lg:text-5xl md:text-lg sm:text-xs py-8">
                            Good Evening Teacher
                          </p>
                        </div>
                        <div className="lg:text-2xl md:text-xl sm:text-xs py-10">
                          <p>
                            In this page, you can register your student and
                            monitor their mathematics performance. It is also
                            possible to create new questions for your students
                            to solve.
                          </p>
                        </div>
                        <div className="lg:text-2xl md:text-xl sm:text-xs text-center">
                          <p className="font-semibold">
                            Click the desired button{" "}
                          </p>
                          <p>to get started.</p>
                        </div>
                      </div>
                    </div>
                  </figcaption>
                </figure>
                <div className="pt-10">
                  <img
                    className="absolute bottom-0 left-0 w-1/3"
                    src={require("../assets/images/teacher_man.png")}
                  ></img>
                  <img
                    className="absolute bottom-0 right-0 w-1/4 "
                    src={require("../assets/images/teacher_woman.png")}
                  ></img>
                </div>
              </div>

              <div className="relative flex justify-evenly border-t-2 px-8 border-gray-500 py-9">
                <div>
                  <a onClick={RegistrationPage}>
                    <button className=" text-white font-bold lg:w-full  lg:p-5  rounded-full transition duration-200 shadow-md bg-yellow-600 hover:bg-yellow-700 text-center mx-2">
                      <span className="lg:text-3xl md:text-xl font-poppins font-semibold">
                        Register student
                      </span>
                    </button>
                  </a>
                </div>

                <div>
                  <a onClick={SectionListPage}>
                    <button className=" text-white font-bold lg:w-full lg:p-5  rounded-full transition duration-200 shadow-md bg-yellow-600 hover:bg-yellow-700 text-center mx-2">
                      <span className="lg:text-3xl md:text-xl font-poppins font-semibold">
                        Section List
                      </span>
                    </button>
                  </a>
                </div>

                <div>
                  <a>
                    <button className=" text-white font-bold lg:w-full lg:p-5 rounded-full transition duration-200 shadow-md bg-yellow-600 hover:bg-yellow-700 text-center mx-2">
                      <span className="lg:text-3xl  md:text-xl font-poppins font-semibold">
                        Custom Question{" "}
                      </span>
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </section>
    </>
  );
}
