import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import * as ReactDOM from "react-dom";
import $ from "jquery";

export default function Login() {
  document.body.style.height = "100vh";

  const navigate = useNavigate();

  //FOR LINKS/NAVBAR/BREADCRUMBS
  const [pageList, setPageList] = useState([]);
  const [pageLink, setPageLink] = useState([]);

  useEffect(() => {
    let page = ["Home", "Login"];
    let link = ["/AdminHomepage", "/Login"];
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

  return (
    <>
      <div className="mx-auto my-24 grid place-items-center w-5/12 pr-16  ">
        <div className="grid grid-cols-12 gap-x-10 justify-center">
          <div className="col-span-2">
            <button
              type="button"
              className="ml-9 inline-block lg:px-4 md:px-3 sm:px-2 border-b-4 border-gray-500/90 lg:rounded-tl-2xl lg:rounded-tr-2xl sm:rounded-tl-xl sm:rounded-tr-xl text-white bg-gray-400 text-sm hover:bg-gray-500"
            >
              Admin
            </button>
          </div>
          <div className="col-span-10">
            <button
              type="button"
              disabled
              className=" ml-9 inline-block lg:px-4 md:px-3 sm:px-2 border-b-4 border-gray-600  lg:rounded-tl-2xl lg:rounded-tr-2xl sm:rounded-tl-xl sm:rounded-tr-xl text-white bg-gray-500 text-sm"
            >
              Student
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 bg-mainBGBrown rounded-5xl border-l-12 border-b-12 border-yellow-700 border-r-12 border-r-brTwo w-full shadow-2xl shadow-yellow-400 ">
          <div className="col-span-2"></div>
          <div className="bg-white py-20 rounded-r-3xl border-l-12 border-l-yellow-700 border-b-12 border-b-yellow-900/50 border-r-12 border-r-yellow-900/30 col-span-10 ">
            <div className="lg:text-4xl sm:text-2xl font-bold text-center">
              <div className="mb-5">Student</div>
              <div className="mb-5">Account Login</div>
            </div>

            <div className="mb-10 p-1  rounded-xl lg:text-2xl  grid place-items-center text-gray-400">
              <h1>(Log-in to your account)</h1>
            </div>
            <div className="mx-5">
              <form>
                <table className=" my-4 w-full">
                  <tr>
                    <td className="flex py-5 pl-9 ">
                      <label className="lg:text-xl sm:text-lg">Email: </label>
                      <input
                        className="ml-1 mr-10 bg-gray-200 rounded-lg w-full lg:text-md text-gray-700 px-3 py-0.5"
                        type="text"
                        name="email"
                        placeholder="lastname.firstname@school.edu.ph"
                        required
                      ></input>
                    </td>
                  </tr>

                  <tr>
                    <td className="flex">
                      <label className="lg:text-xl sm:text-lg">
                        Password:{" "}
                      </label>
                      <input
                        className="ml-1 mr-10 bg-gray-200 rounded-lg w-full lg:text-md text-gray-700 px-3 py-0.5"
                        type="password"
                        name="psswrd"
                        placeholder="Student LRN"
                        required
                      ></input>
                    </td>
                  </tr>

                  <tr>
                    <td className="grid place-items-center mt-16">
                      <input
                        className="bg-lime-600 rounded-5xl w-1/2 py-1 lg:text-lg sm:text-md font-semibold hover:bg-lime-700 text-white cursor-pointer"
                        type="submit"
                        value="LOG-IN"
                      ></input>
                    </td>
                  </tr>
                </table>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
