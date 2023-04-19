import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import * as ReactDOM from "react-dom";
import $ from "jquery";

import { BsPersonPlusFill } from "react-icons/bs";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { BsGearFill } from "react-icons/bs";
//import { IconName } from "react-icons/fa";

export default function AdminHomepage() {
  document.body.style.height = "100vh";
  const navigate = useNavigate();

  //FOR LINKS/NAVBAR/BREADCRUMBS
  const [pageList, setPageList] = useState([]);
  const [pageLink, setPageLink] = useState([]);

  useEffect(() => {
    setPage();

    window.addEventListener("focus", setPage);
    function setPage() {
      let page = ["Home"];
      let link = ["/AdminHomepage"];
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

  const CustomizationPage = () => {
    let page = ["Home", "Customization"];
    let link = ["/AdminHomepage", "/Customization"];
    setPageList(page);
    setPageLink(link);

    window.localStorage.setItem("NAVBAR_PAGE", JSON.stringify(pageList));
    window.localStorage.setItem("NAVBAR_PAGE_LINK", JSON.stringify(pageLink));
    setTimeout(proceed, 1);

    function proceed() {
      navigate("/Customization");
    }
  };

  //GREETING "GOOD EVENING,MORNING,AFTERNOON TEACHER"
  const [currentTime, setTime] = useState();
  useEffect(() => {
    var now = new Date();
    var time = now.getHours();
    setTime(time);
  }, []);

  return (
    <>
      <section className="grid place-items-center">
        <div className="w-2/3 h-[92.5vh] flex items-center justify-center">
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
                            {currentTime >= 6 ? (
                              currentTime >= 12 && currentTime < 18 ? (
                                <>Good Afternoon Teacher</>
                              ) : currentTime >= 18 ? (
                                <>Good Evening Teacher</>
                              ) : (
                                <>Good Morning Teacher</>
                              )
                            ) : (
                              <>Good Evening Teacher</>
                            )}
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

              <div className="grid grid-cols-3 text-center border-t-2  border-gray-500 py-9 pb-16">
                <div>
                  <a onClick={RegistrationPage}>
                    <button className="relative text-center mx-2  text-white font-bold px-5  rounded-full shadow-md bg-yellow-600 hover:bg-yellow-700 hover:-translate-y-1 ease-in-out transition duration-200 transform ">
                      <span className="lg:text-3xl md:text-xl font-poppins font-semibold lg:px-4">
                        <p className="pr-12">Register Student</p>
                      </span>
                      <BsPersonPlusFill className="absolute right-5 lg:text-[2.2rem]  top-[32.5%] bottom-1/2" />
                    </button>
                  </a>
                </div>

                <div>
                  <a onClick={SectionListPage}>
                    <button className="relative text-center mx-2  text-white font-bold px-5  rounded-full shadow-md bg-yellow-600 hover:bg-yellow-700 hover:-translate-y-1 ease-in-out transition duration-200 transform ">
                      <span className="lg:text-3xl md:text-xl font-poppins font-semibold lg:px-4">
                        <p className="pr-12">Report Card</p>
                      </span>
                      <BsFillPersonVcardFill className="absolute right-6 lg:text-[2.2rem]  top-[32.5%] bottom-1/2" />
                    </button>
                  </a>
                </div>

                <div>
                  <a onClick={CustomizationPage}>
                    <button className="relative text-center mx-2  text-white font-bold px-5  rounded-full shadow-md bg-yellow-600 hover:bg-yellow-700 hover:-translate-y-1 ease-in-out transition duration-200 transform ">
                      <span className="lg:text-3xl md:text-xl font-poppins font-semibold lg:px-4">
                        <p className="pr-12">Customization</p>
                      </span>
                      <BsGearFill className="absolute right-5 lg:text-[2.2rem]  top-[32.5%] bottom-1/2" />
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
