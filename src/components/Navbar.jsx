import React from "react";
import { FaGraduationCap } from "react-icons/fa";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as ReactDOM from "react-dom";

import NavbarModal from "./NavbarModal";
import Initiation from "./Initiation";
import EndSession from "./EndSession";
import ClearStorage from "./ClearStorage";

import { HiOutlineArrowLeftOnRectangle } from "react-icons/hi2";
import { HiChevronDoubleRight } from "react-icons/hi2";
import { HiArrowUturnRight } from "react-icons/hi2";

import { BsChevronBarRight } from "react-icons/bs";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar() {
  const navigate = useNavigate();

  //SET HOMEPAGE AS FIRST LINK
  useEffect(() => {
    if (
      window.localStorage.getItem("NAVBAR_PAGE") === null ||
      window.localStorage.getItem("NAVBAR_PAGE") == []
    ) {
      Initiation.initiatePage();
    }
  }, []);

  //FOR LINKS/NAVBAR/BREADCRUMBS
  const [pageList, setPageList] = useState([]);
  const [pageLink, setPageLink] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  const length = pageList.length;

  // ADDED ARRAY NAME INSIDE use effect, empty array means run only once
  useEffect(() => {
    const data = window.localStorage.getItem("NAVBAR_PAGE");
    setPageList(JSON.parse(data));
    // UPDATE DATA ON BODY HOVER
    document.body.addEventListener("mouseover", updateData);
  }, []);

  useEffect(() => {
    const data = window.localStorage.getItem("NAVBAR_PAGE_LINK");
    setPageLink(JSON.parse(data));
  }, []);

  useEffect(() => {
    const data = window.localStorage.getItem("SESSION_USER");
    setCurrentUser(JSON.parse(data));
  }, []);

  // UPDATE DATA ON HOVER asdasd
  function updateData() {
    const page = window.localStorage.getItem("NAVBAR_PAGE");
    setPageList(JSON.parse(page));
    const link = window.localStorage.getItem("NAVBAR_PAGE_LINK");
    setPageLink(JSON.parse(link));
    var user = window.localStorage.getItem("SESSION_USER");

    setCurrentUser(JSON.parse(user));
  }

  const Login = () => {
    let page = ["Home", "Login"];
    let link = ["/Homepage", "/Login"];
    setPageList(page);
    setPageLink(link);

    window.localStorage.setItem("NAVBAR_PAGE", JSON.stringify(pageList));
    window.localStorage.setItem("NAVBAR_PAGE_LINK", JSON.stringify(pageLink));
    navigate("/Login");
  };

  const Homepage = () => {
    let page = ["Home"];
    let link = ["/Homepage"];
    setPageList(page);
    setPageLink(link);

    window.localStorage.setItem("NAVBAR_PAGE", JSON.stringify(pageList));
    window.localStorage.setItem("NAVBAR_PAGE_LINK", JSON.stringify(pageLink));
    setTimeout(proceed, 1);

    function proceed() {
      navigate("/Homepage");
    }
  };

  const AdminHomepage = () => {
    let page = ["Home"];
    let link = ["/AdminHomepage"];
    setPageList(page);
    setPageLink(link);

    window.localStorage.setItem("NAVBAR_PAGE", JSON.stringify(pageList));
    window.localStorage.setItem("NAVBAR_PAGE_LINK", JSON.stringify(pageLink));
    setTimeout(proceed, 1);

    function proceed() {
      navigate("/AdminHomepage");
    }
  };

  const signOut = () => {
    if (
      window.localStorage.getItem("SESSION_ID") != '""' &&
      window.localStorage.getItem("SESSION_ID") != null
    ) {
      setShowModal(true);
    } else {
      window.localStorage.setItem("SESSION_USER", JSON.stringify(""));
      window.localStorage.setItem("SESSION_EMAIL", JSON.stringify(""));
      navigate("/Login");
    }
  };

  const [showModal, setShowModal] = useState(false);
  const handleOnCloseModal = () => setShowModal(false);

  const [choiceModal, setChoiceModal] = useState(false);

  const handleOnContinueModal = () => {
    EndSession.recordData();
    ClearStorage.clearData();
    setChoiceModal(true);
    setShowModal(false);
    window.localStorage.setItem("SESSION_USER", JSON.stringify(""));
    window.localStorage.setItem("SESSION_EMAIL", JSON.stringify(""));
    window.localStorage.setItem("SESSION_ID", JSON.stringify(""));
    navigate("/Login");
  };

  return (
    <>
      <div
        onMouseEnter={() => updateData()}
        className="sticky top-0 z-50 pt-1 visible h-12 w-full grid grid-cols-3 bg-white py-0.5 shadow-md shadow-lime-500/80"
      >
        <div className=" p-1 pl-2 overflow-hidden font-sans ">
          {pageLink.map((page, index) =>
            //check if first
            index === 0 ? (
              page.match("/Homepage") ? (
                <a onClick={Homepage} className="cursor-pointer">
                  <i className="fas fa-graduation-cap pr-2 lg:text-2xl"></i>
                  <span className="lg:text-xl">Personal Instructing Agent</span>
                </a>
              ) : (
                <a onClick={AdminHomepage} className="cursor-pointer">
                  <i className="fas fa-graduation-cap pr-2 lg:text-2xl"></i>
                  <span className="lg:text-xl">Personal Instructing Agent</span>
                </a>
              )
            ) : (
              <></>
            )
          )}
        </div>

        <div className="lg:py-1.5  sm:py-1 text-center select-none">
          {pageList.map((page, index) =>
            length === index + 1 ? (
              // last one
              <p id="current_page" className="font-sans lg:text-xl">
                {page}
              </p>
            ) : (
              <></>
            )
          )}
        </div>

        <div className="absolute right-0 -mt-3">
          <li className="flex items-center">
            <ul className="p-4">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button
                    onClick={function () {
                      currentUser == "" || currentUser === null
                        ? navigate("/Login")
                        : "";
                    }}
                    className="inline-flex w-full justify-center rounded-md  bg-white px-3 py-1.5 lg:text-xl font-normal text-gray-700  hover:bg-gray-100 focus:outline-none  focus:ring-offset-gray-200"
                  >
                    {currentUser != "" && currentUser !== null ? (
                      window.localStorage.getItem("SESSION_ID") != '""' &&
                      window.localStorage.getItem("SESSION_ID") != null ? (
                        pageList.includes("Whiteboard") == false ? (
                          <>
                            <span className="bell fa fa-bell w-7 h-7 text-xl mr-1.5 mt-0.5"></span>
                            <>{currentUser}</>
                          </>
                        ) : (
                          <>{currentUser}</>
                        )
                      ) : (
                        <>{currentUser}</>
                      )
                    ) : (
                      <p className="flex">
                        {" "}
                        <HiOutlineArrowLeftOnRectangle className="text-2xl -ml-3 mt-[0.32rem]" />
                        <span className="ml-1 mt-[0.1rem]">Login</span>
                      </p>
                    )}

                    <ChevronDownIcon
                      className={` ${
                        currentUser == "" || currentUser === null
                          ? "invisible aria-disabled:"
                          : "visible h-5 w-5 ml-2 mt-1.5"
                      }`}
                      aria-hidden="true"
                    ></ChevronDownIcon>
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items
                    className={` absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
                      currentUser == "" || currentUser === null
                        ? "invisible"
                        : "visible"
                    }`}
                  >
                    <div className="py-1 ">
                      {window.localStorage.getItem("SESSION_ID") != '""' &&
                      window.localStorage.getItem("SESSION_ID") != null ? (
                        pageList.includes("Whiteboard") == false ? (
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={function () {
                                  navigate("/Whiteboard");
                                }}
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700 border-b-2 border-b-gray-200/80 ",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                <p className="flex px-1 min-w-[8.2rem]">
                                  {" "}
                                  <BsChevronBarRight className="text-2xl -ml-3" />
                                  <span className="ml-1 mt-[0.1rem]">
                                    Continue Session
                                  </span>
                                </p>
                              </button>
                            )}
                          </Menu.Item>
                        ) : (
                          <></>
                        )
                      ) : (
                        ""
                      )}

                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={signOut}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900 "
                                : "text-gray-700",
                              "block w-full px-4 py-2 text-left text-sm"
                            )}
                          >
                            <p className="flex px-1">
                              {" "}
                              <HiOutlineArrowLeftOnRectangle className="text-2xl -ml-3 rotate-180" />
                              <span className="ml-1 mt-[0.1rem]  min-w-[3.5rem]">
                                Sign out
                              </span>
                            </p>
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </ul>
          </li>
        </div>

        <div className="absolute z-10 top-0 left-0 right-0 mx-auto  text-center  w-1/2">
          <div className="inline-flex  hover:pt-10 mt-0.5 opacity-0 hover:opacity-100  ">
            <ul className=" shadow-sm shadow-lime-500 mt-2 pb-1 px-4 z-0 bg-white border-t-2 border-t-gray-300">
              {pageList.map((page, index) =>
                length === index + 1 ? (
                  // last one
                  <li className="inline-block">
                    <a className="no-underline text-[#799012] font-medium select-none">
                      {page}
                    </a>
                  </li>
                ) : (
                  <>
                    <li className="inline-block">
                      <a
                        onClick={() => {
                          navigate(pageLink[index]);
                          updateData;
                        }}
                        className="cursor-pointer no-underline text-gray-500 hover:text-gray-800 hover:underline"
                      >
                        {page}
                      </a>
                    </li>
                    <span className="mx-1 text-[#656565] text-xl">-</span>
                  </>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
      <div
        onMouseEnter={() => updateData()}
        className="absolute h-screen -z-50 bg-gray-200"
      ></div>
      <NavbarModal
        onClose={handleOnCloseModal}
        visible={showModal}
        onContinue={handleOnContinueModal}
      />
    </>
  );
}

export default Navbar;
