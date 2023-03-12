import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import * as ReactDOM from "react-dom";
import $ from "jquery";

export default function ClassList() {
  const navigate = useNavigate();

  //FOR LINKS/NAVBAR/BREADCRUMBS
  const [pageList, setPageList] = useState([]);
  const [pageLink, setPageLink] = useState([]);

  useEffect(() => {
    let page = ["Home", "Section List", "Class List"];
    let link = ["/AdminHomepage", "/SectionList", "/ClassList"];
    setPageList(page);
    setPageLink(link);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("NAVBAR_PAGE", JSON.stringify(pageList));
  }, [pageList]);

  useEffect(() => {
    window.localStorage.setItem("NAVBAR_PAGE_LINK", JSON.stringify(pageLink));
  }, [pageLink]);

  const StudentDetailPage = () => {
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
    setTimeout(proceed, 1);

    function proceed() {
      navigate("/StudentDetail");
    }
  };

  return (
    <>
      <section className="relative w-10/12 mx-auto my-10 p-6 rounded-6xl border-l-12 border-b-12 border-yellow-700 bg-mainBGBrown border-r-12 border-r-brTwo shadow-2xl shadow-yellow-400">
        <div className="">
          <div className="float-left py-2 rounded-3xl bg-white border-r-12 border-t-12 border-yellow-700 border-l-12 border-l-brTwo shadow-yellow-700">
            <div className="w-full flex items-center justify-between px-5">
              <div className="rounded-2xl  first-letter:rounded-2xl bg-gray-200 px-5 shadow-sm shadow-gray-600 flex items-center outline-title font-bold">
                <div className="flex">
                  <h2 className=" text-yellow-500  lg:text-3xl font-semibold ">
                    7 - Rizal
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
                <h2 className=" text-yellow-500 stroke-cyan-500 lg:text-3xl font-semibold ">
                  Ms. Emilyn Ortencio
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
                  name=""
                  id=""
                  placeholder="&nbsp;Search People..."
                />
              </div>
            </div>
          </div>
          <div className="bg-mainBGBrown  w-1/3"></div>
        </div>

        <div className="bg-mainBGBrown  w-full my-10">{"\u00A0"}</div>

        <div className="overflow-hidden h-full rounded-3xl  bg-gradient-to-t from-gray-200 via-gray-100 to-white shadow-lg border-r-12 border-t-12 border-yellow-700 border-l-12 border-l-brTwo shadow-yellow-700 ">
          <div className="mx-auto w-fullrounded-md">
            <div>
              <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                  <table className="min-w-full leading-normal">
                    <thead className="border-b-2 border-gray-300 bg-gray-200 text-left uppercase tracking-wider text-md font-bold text-gray-600">
                      <tr>
                        <th className="pl-20 pr-96 py-3">Student Name</th>
                        <th></th>
                        <th className="pr-24 py-3">Age</th>
                        <th className="pr-20 py-3 ">Gender</th>
                        <th className="py-3">Group Type</th>
                        <th className="pl-16 py-3 select-none "></th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr className="border-b border-gray-200 bg-white hover:bg-gray-100 text-gray-900 hover:text-indigo-600">
                        <td className="flex items-center text-md px-5 py-2  whitespace-no-wrap">
                          <div className="flex-shrink-0 w-10 h-10 mr-3">
                            <img
                              className=" rounded-full"
                              src="images/rizal.png"
                              alt=""
                            />
                          </div>
                          <p className="pl-2">Paulyn Joy Dela Cruz</p>
                        </td>
                        <td></td>
                        <td className="pr-24 py-3">
                          <p>20</p>
                        </td>
                        <td className="pr-20 py-3 ">
                          <p>Female</p>
                        </td>
                        <td className="py-3 ">
                          <p>Facial Group</p>
                        </td>
                        <td className="pr-10 py-3 text-right">
                          <a onClick={StudentDetailPage}>
                            <button className="text-md w-36 text-white bg-lime-600 hover:bg-lime-700 py-2 rounded-xl shadow-lg">
                              See details
                            </button>
                          </a>
                        </td>
                      </tr>

                      <tr className="border-b border-gray-200 bg-white hover:bg-gray-100 text-gray-900 hover:text-indigo-600">
                        <td className="flex items-center text-md px-5 py-2 whitespace-no-wrap">
                          <div className="flex-shrink-0 w-10 h-10 mr-3">
                            <img
                              className="rounded-full"
                              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                              alt=""
                            />
                          </div>
                          <p className="pl-2">John Lorenz Dela Cruz</p>
                        </td>
                        <td></td>
                        <td className="pr-24 py-3">
                          <p>22</p>
                        </td>
                        <td className="pr-20 py-3">
                          <p>Male</p>
                        </td>
                        <td className="py-3 ">
                          <p>Facial Group</p>
                        </td>
                        <td className="pr-10 py-3 text-right">
                          <button className="text-md w-36 text-white bg-lime-600 hover:bg-lime-700 py-2 rounded-xl shadow-lg">
                            See details
                          </button>
                        </td>
                      </tr>

                      <tr className="border-b border-gray-200 bg-white hover:bg-gray-100 text-gray-900 hover:text-indigo-600">
                        <td className="flex items-center text-md px-5 py-2 whitespace-no-wrap">
                          <div className="flex-shrink-0 w-10 h-10 mr-3">
                            <img
                              className="rounded-full"
                              src="https://images.unsplash.com/photo-1540845511934-7721dd7adec3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                              alt=""
                            />
                          </div>
                          <p className="pl-2">Joyce Antonette Guadalupe</p>
                        </td>
                        <td></td>
                        <td className="pr-24 py-3">
                          <p>20</p>
                        </td>
                        <td className="pr-20 py-3">
                          <p>Female</p>
                        </td>
                        <td className="py-3">
                          <p>Facial Group</p>
                        </td>
                        <td className="pr-10 py-3 text-right">
                          <button className="text-md w-36 text-white bg-lime-600 hover:bg-lime-700 py-2 rounded-xl shadow-md hover:shadow-black/20">
                            See details
                          </button>
                        </td>
                      </tr>

                      <tr className="border-b border-gray-200 bg-white hover:bg-gray-100 text-gray-900 hover:text-indigo-600">
                        <td className="flex items-center text-md px-5 py-2 whitespace-no-wrap">
                          <div className="flex-shrink-0 w-10 h-10 mr-3">
                            <img
                              className="rounded-full"
                              src="https://images.unsplash.com/photo-1540845511934-7721dd7adec3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                              alt=""
                            />
                          </div>
                          <p className="pl-2">Jiabianca Macaraeg</p>
                        </td>
                        <td></td>
                        <td className="pr-24 py-3">
                          <p>21</p>
                        </td>
                        <td className="pr-20 py-3">
                          <p>Female</p>
                        </td>
                        <td className="py-3">
                          <p>Facial Group</p>
                        </td>
                        <td className="pr-10 py-3 text-right">
                          <button className="text-md w-36 text-white bg-lime-600 hover:bg-lime-700 py-2 rounded-xl shadow-lg">
                            See details
                          </button>
                        </td>
                      </tr>

                      <tr className="border-b border-gray-200 bg-white hover:bg-gray-100 text-gray-900 hover:text-indigo-600">
                        <td className="flex items-center text-md px-5 py-2 whitespace-no-wrap">
                          <div className="flex-shrink-0 w-10 h-10 mr-3">
                            <img
                              className="rounded-full"
                              src="https://images.unsplash.com/photo-1540845511934-7721dd7adec3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                              alt=""
                            />
                          </div>
                          <p className="pl-2">Piolo Jose S. Montesa</p>
                        </td>
                        <td></td>
                        <td className="pr-24 py-3">
                          <p>21</p>
                        </td>
                        <td className="pr-20 py-3">
                          <p>Male</p>
                        </td>
                        <td className="py-3">
                          <p>Facial Group</p>
                        </td>
                        <td className="pr-10 py-3 text-right">
                          <button className="text-md w-36 text-white bg-lime-600 hover:bg-lime-700 py-2 rounded-xl shadow-lg">
                            See details
                          </button>
                        </td>
                      </tr>

                      <tr className="border-b border-gray-200 bg-white hover:bg-gray-100 text-gray-900 hover:text-indigo-600">
                        <td className="flex items-center text-md px-5 py-2 whitespace-no-wrap">
                          <div className="flex-shrink-0 w-10 h-10 mr-3">
                            <img
                              className="rounded-full"
                              src="https://images.unsplash.com/photo-1540845511934-7721dd7adec3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                              alt=""
                            />
                          </div>
                          <p className="pl-2">Mark Paul Ramos</p>
                        </td>
                        <td></td>
                        <td className="pr-24 py-3">
                          <p>22</p>
                        </td>
                        <td className="pr-20 py-3">
                          <p>Male</p>
                        </td>
                        <td className="py-3">
                          <p>Facial Group</p>
                        </td>
                        <td className="pr-10 py-3 text-right">
                          <button className="text-md w-36 text-white bg-lime-600 hover:bg-lime-700 py-2 rounded-xl shadow-lg">
                            See details
                          </button>
                        </td>
                      </tr>

                      <tr className="border-b border-gray-200 bg-white hover:bg-gray-100 text-gray-900 hover:text-indigo-600">
                        <td className="flex items-center text-md px-5 py-2whitespace-no-wrap">
                          <div className="flex-shrink-0 w-10 h-10 mr-3">
                            <img
                              className="rounded-full"
                              src="https://images.unsplash.com/photo-1540845511934-7721dd7adec3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                              alt=""
                            />
                          </div>
                          <p className="pl-2">Mara Jonna Maduro</p>
                        </td>
                        <td></td>
                        <td className="pr-24 py-3">
                          <p>23</p>
                        </td>
                        <td className="pr-20 py-3">
                          <p>Female</p>
                        </td>
                        <td className="py-3">
                          <p>Facial Group</p>
                        </td>
                        <td className="pr-10 py-3 text-right">
                          <button className="text-md w-36 text-white bg-lime-600 hover:bg-lime-700 py-2 rounded-xl shadow-lg">
                            See details
                          </button>
                        </td>
                      </tr>

                      <tr className="border-b border-gray-200 bg-white hover:bg-gray-100 text-gray-900 hover:text-indigo-600">
                        <td className="flex items-center text-md px-5 py-2 whitespace-no-wrap">
                          <div className="flex-shrink-0 w-10 h-10 mr-3">
                            <img
                              className="rounded-full"
                              src="https://images.unsplash.com/photo-1540845511934-7721dd7adec3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                              alt=""
                            />
                          </div>
                          <p className="pl-2">Louis Angelo Altoveros</p>
                        </td>
                        <td></td>
                        <td className="pr-24 py-3">
                          <p>22</p>
                        </td>
                        <td className="pr-20 py-3">
                          <p>Male</p>
                        </td>
                        <td className="py-3">
                          <p>Facial Group</p>
                        </td>
                        <td className="pr-10 py-3 text-right">
                          <button className="text-md w-36 text-white bg-lime-600 hover:bg-lime-700 py-2 rounded-xl shadow-lg">
                            See details
                          </button>
                        </td>
                      </tr>

                      <tr className="border-b border-gray-200 bg-white hover:bg-gray-100 text-gray-900 hover:text-indigo-600">
                        <td className="flex items-center text-md px-5 py-2  whitespace-no-wrap">
                          <div className="flex-shrink-0 w-10 h-10 mr-3">
                            <img
                              className=" rounded-full"
                              src="images/rizal.png"
                              alt=""
                            />
                          </div>
                          <p className="pl-2">Paulyn Joy Dela Cruz</p>
                        </td>
                        <td></td>
                        <td className="pr-24 py-3">
                          <p>20</p>
                        </td>
                        <td className="pr-20 py-3 ">
                          <p>Female</p>
                        </td>
                        <td className="py-3 ">
                          <p>Facial Group</p>
                        </td>
                        <td className="pr-10 py-3 text-right">
                          <button className="text-md w-36 text-white bg-lime-600 hover:bg-lime-700 py-2 rounded-xl shadow-lg">
                            See details
                          </button>
                        </td>
                      </tr>

                      <tr className="border-b border-gray-200 bg-white hover:bg-gray-100 text-gray-900 hover:text-indigo-600">
                        <td className="flex items-center text-md px-5 py-2 whitespace-no-wrap">
                          <div className="flex-shrink-0 w-10 h-10 mr-3">
                            <img
                              className="rounded-full"
                              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                              alt=""
                            />
                          </div>
                          <p className="pl-2">John Lorenz Dela Cruz</p>
                        </td>
                        <td></td>
                        <td className="pr-24 py-3">
                          <p>22</p>
                        </td>
                        <td className="pr-20 py-3">
                          <p>Male</p>
                        </td>
                        <td className="py-3 ">
                          <p>Facial Group</p>
                        </td>
                        <td className="pr-10 py-3 text-right">
                          <button className="text-md w-36 text-white bg-lime-600 hover:bg-lime-700 py-2 rounded-xl shadow-lg">
                            See details
                          </button>
                        </td>
                      </tr>

                      <tr className="border-b border-gray-200 bg-white hover:bg-gray-100 text-gray-900 hover:text-indigo-600">
                        <td className="flex items-center text-md px-5 py-2 whitespace-no-wrap">
                          <div className="flex-shrink-0 w-10 h-10 mr-3">
                            <img
                              className="rounded-full"
                              src="https://images.unsplash.com/photo-1540845511934-7721dd7adec3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                              alt=""
                            />
                          </div>
                          <p className="pl-2">Joyce Antonette Guadalupe</p>
                        </td>
                        <td></td>
                        <td className="pr-24 py-3">
                          <p>20</p>
                        </td>
                        <td className="pr-20 py-3">
                          <p>Female</p>
                        </td>
                        <td className="py-3">
                          <p>Facial Group</p>
                        </td>
                        <td className="pr-10 py-3 text-right">
                          <button className="text-md w-36 text-white bg-lime-600 hover:bg-lime-700 py-2 rounded-xl shadow-md hover:shadow-black/20">
                            See details
                          </button>
                        </td>
                      </tr>

                      <tr className="border-b border-gray-200 bg-white hover:bg-gray-100 text-gray-900 hover:text-indigo-600">
                        <td className="flex items-center text-md px-5 py-2 whitespace-no-wrap">
                          <div className="flex-shrink-0 w-10 h-10 mr-3">
                            <img
                              className="rounded-full"
                              src="https://images.unsplash.com/photo-1540845511934-7721dd7adec3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                              alt=""
                            />
                          </div>
                          <p className="pl-2">Jiabianca Macaraeg</p>
                        </td>
                        <td></td>
                        <td className="pr-24 py-3">
                          <p>21</p>
                        </td>
                        <td className="pr-20 py-3">
                          <p>Female</p>
                        </td>
                        <td className="py-3">
                          <p>Facial Group</p>
                        </td>
                        <td className="pr-10 py-3 text-right">
                          <button className="text-md w-36 text-white bg-lime-600 hover:bg-lime-700 py-2 rounded-xl shadow-lg">
                            See details
                          </button>
                        </td>
                      </tr>

                      <tr className="border-b border-gray-200 bg-white hover:bg-gray-100 text-gray-900 hover:text-indigo-600">
                        <td className="flex items-center text-md px-5 py-2 whitespace-no-wrap">
                          <div className="flex-shrink-0 w-10 h-10 mr-3">
                            <img
                              className="rounded-full"
                              src="https://images.unsplash.com/photo-1540845511934-7721dd7adec3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                              alt=""
                            />
                          </div>
                          <p className="pl-2">Piolo Jose S. Montesa</p>
                        </td>
                        <td></td>
                        <td className="pr-24 py-3">
                          <p>21</p>
                        </td>
                        <td className="pr-20 py-3">
                          <p>Male</p>
                        </td>
                        <td className="py-3">
                          <p>Facial Group</p>
                        </td>
                        <td className="pr-10 py-3 text-right">
                          <button className="text-md w-36 text-white bg-lime-600 hover:bg-lime-700 py-2 rounded-xl shadow-lg">
                            See details
                          </button>
                        </td>
                      </tr>

                      <tr className="border-b border-gray-200 bg-white hover:bg-gray-100 text-gray-900 hover:text-indigo-600">
                        <td className="flex items-center text-md px-5 py-2 whitespace-no-wrap">
                          <div className="flex-shrink-0 w-10 h-10 mr-3">
                            <img
                              className="rounded-full"
                              src="https://images.unsplash.com/photo-1540845511934-7721dd7adec3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                              alt=""
                            />
                          </div>
                          <p className="pl-2">Mark Paul Ramos</p>
                        </td>
                        <td></td>
                        <td className="pr-24 py-3">
                          <p>22</p>
                        </td>
                        <td className="pr-20 py-3">
                          <p>Male</p>
                        </td>
                        <td className="py-3">
                          <p>Facial Group</p>
                        </td>
                        <td className="pr-10 py-3 text-right">
                          <button className="text-md w-36 text-white bg-lime-600 hover:bg-lime-700 py-2 rounded-xl shadow-lg">
                            See details
                          </button>
                        </td>
                      </tr>

                      <tr className="border-b border-gray-200 bg-white hover:bg-gray-100 text-gray-900 hover:text-indigo-600">
                        <td className="flex items-center text-md px-5 py-2whitespace-no-wrap">
                          <div className="flex-shrink-0 w-10 h-10 mr-3">
                            <img
                              className="rounded-full"
                              src="https://images.unsplash.com/photo-1540845511934-7721dd7adec3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                              alt=""
                            />
                          </div>
                          <p className="pl-2">Mara Jonna Maduro</p>
                        </td>
                        <td></td>
                        <td className="pr-24 py-3">
                          <p>23</p>
                        </td>
                        <td className="pr-20 py-3">
                          <p>Female</p>
                        </td>
                        <td className="py-3">
                          <p>Facial Group</p>
                        </td>
                        <td className="pr-10 py-3 text-right">
                          <button className="text-md w-36 text-white bg-lime-600 hover:bg-lime-700 py-2 rounded-xl shadow-lg">
                            See details
                          </button>
                        </td>
                      </tr>

                      <tr className="border-b border-gray-200 bg-white hover:bg-gray-100 text-gray-900 hover:text-indigo-600">
                        <td className="flex items-center text-md px-5 py-2 whitespace-no-wrap">
                          <div className="flex-shrink-0 w-10 h-10 mr-3">
                            <img
                              className="rounded-full"
                              src="https://images.unsplash.com/photo-1540845511934-7721dd7adec3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                              alt=""
                            />
                          </div>
                          <p className="pl-2">Louis Angelo Altoveros</p>
                        </td>
                        <td></td>
                        <td className="pr-24 py-3">
                          <p>22</p>
                        </td>
                        <td className="pr-20 py-3">
                          <p>Male</p>
                        </td>
                        <td className="py-3">
                          <p>Facial Group</p>
                        </td>
                        <td className="pr-10 py-3 text-right">
                          <button className="text-md w-36 text-white bg-lime-600 hover:bg-lime-700 py-2 rounded-xl shadow-lg">
                            See details
                          </button>
                        </td>
                      </tr>
                    </tbody>
                    <tr className="select-none bg-white text-left uppercase tracking-wider text-md font-bold text-gray-600">
                      <th className="py-4">
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                      </th>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
