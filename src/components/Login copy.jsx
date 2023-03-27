import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import * as ReactDOM from "react-dom";
import $ from "jquery";

import { useFormik } from "formik";
import { loginSchema } from "../schemas";

export default function Login() {
  document.body.style.height = "100vh";

  const navigate = useNavigate();

  //FOR LINKS/NAVBAR/BREADCRUMBS
  const [pageList, setPageList] = useState([]);
  const [pageLink, setPageLink] = useState([]);

  useEffect(() => {
    let page = ["Home", "Login"];
    let link = ["/Homepage", "/Login"];
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

  // FOR LOGIN

  const [accType, setAccType] = useState("Student");
  var accountType = "loginStudent";

  useEffect(() => {
    const data = window.localStorage.getItem("LOGIN_TYPE");
    if (data !== null) setAccType(JSON.parse(data));
    accountType = "login" + JSON.parse(data);
  });

  useEffect(() => {
    if (accountType == "loginStudent") {
      values.username = "randomstring";
    } else {
      values.email = "randomstring@string.com";
    }
  }, []);

  const [currentUser, setCurrentUser] = useState("");

  const onSubmit = async (values, actions) => {
    console.log(accountType);
    let isStudent = false;
    axios
      .post(
        `http://localhost:80/Prototype-Vite/my-project/api/${accountType}/save`,
        values
      )
      .then(function (response) {
        console.log(response.data);
        var currentData = JSON.stringify(response.data);
        console.log(currentData);
        currentData = currentData.replace("{", "");
        currentData = currentData.replace("}", "");
        currentData = currentData.replace('"GivenName":', "");
        currentData = currentData.replace('"Email":', "");

        var userData = [];
        convertStringToArray();
        function convertStringToArray() {
          let firstIndex = 0;
          let endIndex = 0;
          for (let i = 0; i < currentData.length; i++) {
            let isEnd = false;
            if (currentData[i] == ",") {
              firstIndex = 0;
              endIndex = 0;
              continue;
            }

            if (currentData[i] == '"') {
              if (firstIndex == 0) {
                firstIndex = i + 1;
              } else {
                endIndex = i;
                isEnd = true;
              }
            }
            if (isEnd) {
              console.log(currentData.substring(firstIndex, endIndex));
              userData.push(currentData.substring(firstIndex, endIndex));
              isEnd = false;
            }
          }
        }

        if (currentData.includes(",")) {
          window.localStorage.setItem(
            "SESSION_USER",
            JSON.stringify(userData[0])
          );
          window.localStorage.setItem(
            "SESSION_EMAIL",
            JSON.stringify(userData[1])
          );
          isStudent = true;
        } else {
          currentData = currentData.replace(/"/g, "");
          window.localStorage.setItem(
            "SESSION_USER",
            JSON.stringify(currentData)
          );
          window.localStorage.setItem("SESSION_EMAIL", JSON.stringify(""));
        }
      });

    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
    if (isStudent) {
      navigate("/Homepage");
    } else {
      navigate("/AdminHomepage");
    }
  };

  const {
    values,
    handleBlur,
    isSubmitting,
    handleChange,
    handleSubmit,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
      username: "",
    },
    //Page Validation Form
    validationSchema: loginSchema,
    onSubmit,
  });
  console.log(errors);

  const changeAccountType = () => {
    const data = window.localStorage.getItem("LOGIN_TYPE");
    accountType = "login" + JSON.parse(data);

    if (accountType == "loginAdmin") {
      values.username = "randomstring";
      values.email = "";
      errors.email = "";
      touched.email = false;

      accountType = "loginStudent";
      window.localStorage.setItem("LOGIN_TYPE", JSON.stringify("Student"));
      setAccType("Student");
    } else {
      values.email = "randomstring@string.com";
      values.username = "";
      errors.username = "";
      touched.username = false;

      accountType = "loginAdmin";
      window.localStorage.setItem("LOGIN_TYPE", JSON.stringify("Admin"));
      setAccType("Admin");
    }
    touched.password = false;
    errors.password = "";
    values.password = "";
  };

  return (
    <>
      <div className="mx-auto my-24 grid place-items-center w-5/12 lg:pr-16  ">
        <div className="grid grid-cols-12 gap-x-10 justify-center">
          <div className="col-span-2">
            <button
              onClick={changeAccountType}
              type="button"
              className="ml-9 inline-block lg:px-4 md:px-3 sm:px-2 border-b-4 border-gray-500/90 lg:rounded-tl-2xl lg:rounded-tr-2xl sm:rounded-tl-xl sm:rounded-tr-xl text-white bg-gray-400 text-sm hover:bg-gray-500 hover:border-gray-600"
            >
              {accType == "Student" ? "Admin" : "Student"}
            </button>
          </div>
          <div className="col-span-10">
            <button
              type="button"
              disabled
              className=" ml-9 inline-block lg:px-4 md:px-3 sm:px-2 border-b-4 border-gray-600  lg:rounded-tl-2xl lg:rounded-tr-2xl sm:rounded-tl-xl sm:rounded-tr-xl text-white bg-gray-500 text-sm"
            >
              {accType}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 bg-mainBGBrown rounded-5xl border-l-12 border-b-12 border-yellow-700 border-r-12 border-r-brTwo w-full shadow-2xl shadow-yellow-400 ">
          <div className="col-span-2"></div>
          <div className="bg-white py-20 rounded-r-3xl border-l-12 border-l-yellow-700 border-b-12 border-b-yellow-900/50 border-r-12 border-r-yellow-900/30 col-span-10">
            <div className="lg:text-4xl sm:text-2xl font-bold text-center">
              <div className="mb-5">{accType}</div>
              <div className="mb-5">Account Login</div>
            </div>

            <div className="mb-20 p-1  rounded-xl lg:text-2xl  grid place-items-center text-gray-400">
              <h1>(Log-in to your account)</h1>
            </div>
            <div className="mx-5">
              <form onSubmit={handleSubmit} className="mt-6">
                {/* Email Input */}

                <div className="grid grid-rows-2 text-left mt-10 h-20">
                  <div className="flex">
                    <label
                      className={`mr-2 text-lg mt-1.5 font-semibold ${
                        accType == "Student" ? "ml-9 pl-0.5" : ""
                      }`}
                      htmlFor={accType == "Student" ? "email" : "username"}
                    >
                      {accType == "Student" ? "Email:" : "Username:"}
                    </label>
                    <input
                      className={`bg-[#e0e0e0] rounded-full w-full text-lg text-gray-700 px-4  py-1.5 mr-3  ${
                        accType == "Student"
                          ? errors.email && touched.email
                            ? " border-red-500 focus:border-red-500 border-2 border-solid"
                            : ""
                          : errors.username && touched.username
                          ? " border-red-500 focus:border-red-500 border-2 border-solid"
                          : ""
                      }`}
                      type={accType == "Student" ? "email" : "text"}
                      name={accType == "Student" ? "email" : "username"}
                      placeholder={
                        accType == "Student"
                          ? "lastname.firstname@sanfrancisco.edu.ph"
                          : "Enter your username"
                      }
                      autoComplete="off"
                      /* Formik email validation Section  */

                      value={
                        accType == "Student" ? values.email : values.username
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>

                  <div className="">
                    {accType == "Student"
                      ? errors.email &&
                        touched.email && (
                          <p className="text-red-500 ml-28 flex-w">
                            {errors.email}
                          </p>
                        )
                      : errors.username &&
                        touched.username && (
                          <p className="text-red-500 ml-28 flex-w">
                            {errors.username}
                          </p>
                        )}
                  </div>
                </div>

                {/* Password Input */}
                <div className="grid grid-rows-2 text-left h-20">
                  <div className="flex">
                    <label
                      htmlFor="password"
                      className="mr-3 text-lg mt-1.5 font-semibold"
                    >
                      {" "}
                      Password:{" "}
                    </label>
                    <input
                      className={` bg-[#e0e0e0] rounded-full w-full text-lg text-gray-700 px-4  py-1.5 mr-3 ${
                        errors.password && touched.password
                          ? " border-red-500 focus:border-red-500 border-2 border-solid"
                          : ""
                      } `}
                      type="password"
                      name="password"
                      placeholder="Input password"
                      autoComplete="off"
                      /* Formik password validation Section */

                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  <div>
                    {errors.password && touched.password && (
                      <p className="text-red-500 ml-28 flex-w">
                        {errors.password}
                      </p>
                    )}
                  </div>
                </div>

                {/* Login Button */}
                <div className=" mt-6 mb-8 text-center w-full ">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="bg-lime-600 rounded-5xl w-1/2 py-2 lg:text-lg sm:text-md font-semibold hover:bg-lime-700 text-white cursor-pointer"
                  >
                    <span className="text-xl font-semibold">LOG-IN </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
