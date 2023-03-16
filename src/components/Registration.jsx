import React, { Component } from "react";
import { useFormik } from "formik";
import { registrationSchema } from "../schemas";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as ReactDOM from "react-dom";
import $ from "jquery";

function Registration() {
  document.body.style.height = "100vh";
  const navigate = useNavigate();

  const [pageList, setPageList] = useState([]);
  const [pageLink, setPageLink] = useState([]);

  useEffect(() => {
    let page = ["Home", "Registration"];
    let link = ["/AdminHomepage", "/Registration"];
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

  const onSubmit = async (values, actions) => {
    console.log(values);
    console.log(actions);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
  };

  const [currentAge, setAge] = useState();

  function getAge(dateString) {
    var string = dateString.replace(/[\-]/gi, "/");
    var today = new Date();
    var birthDate = new Date(string);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    setAge(age);
    setTimeout(setValue, 100);
    function setValue() {
      values.age = age;
      handleChange.age;
      document.getElementById("age").focus();
      setTimeout(document.getElementById("age").blur(), 1);
    }

    console.log(values.age);
  }
  /*
  document.getElementById("birthDay").date({
    onSelect: function () {
      document.getElementById("birthDay").blur();
    },
  });
  */

  function blur() {
    setTimeout(document.getElementById("birthDay").blur(), 1);
  }

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
      firstName: "",
      middleName: "",
      lastName: "",
      birthDay: "",
      age: "",
      section: "Rizal",
      groupType: "Facial Group",
      gradeLevel: "Grade 7",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registrationSchema,
    onSubmit,
  });
  console.log(errors);
  return (
    <>
      <div className="mx-auto my-16 w-2/3">
        <div className=" bg-white rounded-5xl shadow-2xl shadow-yellow-400">
          <div className="grid grid-cols-12 row-span-1 bg-mainBGBrown py-8 -mt-2  rounded-t-5xl shadow-md shadow-yellow-800/30 border-yellow-800 border-l-12 border-r-brTwo border-r-12">
            <div className="bg-black/30 rounded-full pt-2 mx-6 shadow-lg shadow-yellow-700 w-1/2">
              {"\u00A0"}
              <div className="bg-lime-200 rounded-full mx-1  pt-4 -mt-4 ">
                {"\u00A0"}
              </div>
            </div>

            <div className="bg-black/30 rounded-full pt-2 mx-6 shadow-lg shadow-yellow-700 w-1/2">
              {"\u00A0"}
              <div className="bg-lime-200 rounded-full mx-1  pt-4 -mt-4 ">
                {"\u00A0"}
              </div>
            </div>

            <div className="bg-black/30 rounded-full pt-2 mx-6 shadow-lg shadow-yellow-700 w-1/2">
              {"\u00A0"}
              <div className="bg-lime-200 rounded-full mx-1  pt-4 -mt-4 ">
                {"\u00A0"}
              </div>
            </div>

            <div className="bg-black/30 rounded-full pt-2 mx-6 shadow-lg shadow-yellow-700 w-1/2">
              {"\u00A0"}
              <div className="bg-lime-200 rounded-full mx-1  pt-4 -mt-4 ">
                {"\u00A0"}
              </div>
            </div>

            <div className="bg-black/30 rounded-full pt-2 mx-6 shadow-lg shadow-yellow-700 w-1/2">
              {"\u00A0"}
              <div className="bg-lime-200 rounded-full mx-1  pt-4 -mt-4 ">
                {"\u00A0"}
              </div>
            </div>

            <div className="bg-black/30 rounded-full pt-2 mx-6 shadow-lg shadow-yellow-700 w-1/2">
              {"\u00A0"}
              <div className="bg-lime-200 rounded-full mx-1  pt-4 -mt-4 ">
                {"\u00A0"}
              </div>
            </div>

            <div className="bg-black/30 rounded-full pt-2 mx-6 shadow-lg shadow-yellow-700 w-1/2">
              {"\u00A0"}
              <div className="bg-lime-200 rounded-full mx-1  pt-4 -mt-4 ">
                {"\u00A0"}
              </div>
            </div>

            <div className="bg-black/30 rounded-full pt-2 mx-6 shadow-lg shadow-yellow-700 w-1/2">
              {"\u00A0"}
              <div className="bg-lime-200 rounded-full mx-1  pt-4 -mt-4 ">
                {"\u00A0"}
              </div>
            </div>

            <div className="bg-black/30 rounded-full pt-2 mx-6 shadow-lg shadow-yellow-700 w-1/2">
              {"\u00A0"}
              <div className="bg-lime-200 rounded-full mx-1  pt-4 -mt-4 ">
                {"\u00A0"}
              </div>
            </div>

            <div className="bg-black/30 rounded-full pt-2 mx-6 shadow-lg shadow-yellow-700 w-1/2">
              {"\u00A0"}
              <div className="bg-lime-200 rounded-full mx-1  pt-4 -mt-4 ">
                {"\u00A0"}
              </div>
            </div>

            <div className="bg-black/30 rounded-full pt-2 mx-6 shadow-lg shadow-yellow-700 w-1/2">
              {"\u00A0"}
              <div className="bg-lime-200 rounded-full mx-1  pt-4 -mt-4 ">
                {"\u00A0"}
              </div>
            </div>

            <div className="bg-black/30 rounded-full pt-2 mx-6 shadow-lg shadow-yellow-700 w-1/2">
              {"\u00A0"}
              <div className="bg-lime-200 rounded-full mx-1  pt-4 -mt-4 ">
                {"\u00A0"}
              </div>
            </div>
          </div>
          <div className=" border-yellow-900/40 border-l-12 border-b-12 rounded-bl-5xl rounded-br-5xl border-r-yellow-900/20 border-r-12">
            <div className="w-full border-b-2 border-gray-300 py-4  text-2xl text-black grid place-items-center font-poppins font-semibold overflow-hidden">
              <h1>&#40; Register an account &#41;</h1>
            </div>
            <hr></hr>

            <form onSubmit={handleSubmit} action="">
              <main className="p-12 min-w-fit font-poppins font-semibold  overflow-hidden">
                <div className="grid grid-cols-3 gap-x-3">
                  {/*FirstName Input*/}
                  <div>
                    <div className="inline-flex w-full">
                      <label
                        htmlFor="firstName"
                        className="inline-block mt-2 pr-2 text-right w-24"
                      >
                        First Name:{" "}
                      </label>
                      <input
                        name="firstName"
                        type="text "
                        placeholder="Enter First Name "
                        autoComplete="new-password"
                        className={` grow p-2 border-2 rounded-md border-gray-500 focus:outline-teal-500 relative focus:ring-teal-500 shadow-sm  shadow-[#808080] ${
                          errors.firstName && touched.firstName
                            ? "shadow-red-500  border-red-500 focus:border-red-500 border-3 border-solid"
                            : ""
                        }`}
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {errors.firstName && touched.firstName && (
                      <p className="text-red-500 absolute ml-[95px] ">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  {/*MiddleName Input*/}
                  <div>
                    <div className="inline-flex w-full">
                      <label
                        htmlFor="middleName"
                        className="inline-block pt-2 pr-2 text-right w-[120px]"
                      >
                        Middle Name:{" "}
                      </label>
                      <input
                        name="middleName"
                        type="text "
                        placeholder="Enter Middle Name"
                        autoComplete="new-password"
                        className={`grow p-2 border-2  rounded-md relative border-gray-500 focus:outline-teal-500 focus:ring-teal-500 shadow-sm  shadow-[#808080] ${
                          errors.middleName && touched.middleName
                            ? " shadow-red-500 border-red-500 focus:border-red-500 border-3 border-solid"
                            : ""
                        }`}
                        value={values.middleName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {errors.middleName && touched.middleName && (
                      <p className="text-red-500 absolute ml-28 ">
                        {errors.middleName}
                      </p>
                    )}
                  </div>

                  {/*LastName Input*/}
                  <div>
                    <div className="inline-flex w-full">
                      <label
                        htmlFor="lastName"
                        className="inline-block pt-2 pr-2 text-right w-[7rem]"
                      >
                        {" "}
                        Last Name:{" "}
                      </label>
                      <input
                        name="lastName"
                        type="text "
                        placeholder="Enter Last Name"
                        autoComplete="new-password"
                        className={`grow p-2 border-2 relative rounded-md border-gray-500 focus:outline-teal-500 focus:ring-teal-500 w-52 shadow-sm shadow-[#808080] ${
                          errors.lastName && touched.lastName
                            ? " shadow-red-500 border-red-500 focus:border-red-500 border-3 border-solid"
                            : ""
                        } `}
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {errors.lastName && touched.lastName && (
                      <p className="text-red-500  absolute ml-[112px] ">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-x-3 mt-8">
                  {/*Birthday Input*/}
                  <div>
                    <div className="inline-flex w-full">
                      <label
                        htmlFor="birthDay"
                        className="inline-block pt-2 pr-2 text-right w-24"
                      >
                        Birth date:{" "}
                      </label>
                      <input
                        id="birthDay"
                        name="birthDay"
                        type="date"
                        autoComplete="new-password"
                        className="grow p-2 border-2  focus:border-none rounded-md border-gray-500 focus:outline-teal-500 focus:ring-teal-500 shadow-sm shadow-[#808080]"
                        value={values.birthDay}
                        onChange={handleChange}
                        onBlur={function (event) {
                          handleBlur;
                          getAge(values.birthDay);
                          handleChange.age;
                        }}
                        min="2000-01-01"
                        max="2013-12-31"
                      />
                    </div>
                  </div>

                  {/*Age Input*/}
                  <div>
                    <div className="inline-flex w-full">
                      <label
                        htmlFor="age"
                        className="inline-block pt-2 pr-2 text-right w-[120px]"
                      >
                        Age:{" "}
                      </label>
                      <input
                        readOnly
                        id="age"
                        type="number"
                        name="age"
                        min="1"
                        max="25"
                        placeholder="Set birthday"
                        autoComplete="new-password"
                        className={`p-2 border-2 w-[9rem] rounded-md focus:border-none border-gray-500 focus:outline-teal-500 focus:ring-teal-500 relative shadow-sm shadow-[#808080] ${
                          errors.age && touched.age
                            ? " shadow-red-500 border-red-500 focus:border-red-500 border-3 border-solid"
                            : ""
                        }`}
                        value={currentAge}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {errors.age && touched.age && (
                      <p className="text-red-500  absolute ml-28 ">
                        {errors.age}
                      </p>
                    )}
                  </div>

                  {/*Gender Input*/}
                  <div>
                    <div className="inline-flex w-full">
                      <label
                        htmlFor="sex"
                        className="inline-block pt-2 pr-2 text-right w-[7rem]"
                      >
                        Gender:{" "}
                      </label>
                      <div className="mt-2.5">
                        <input
                          name="sex"
                          type="radio"
                          className=""
                          value="male"
                          checked={values.sex === "male"}
                          onChange={handleChange}
                        />{" "}
                        Male
                        <input
                          name="sex"
                          type="radio"
                          className="ml-4"
                          value="female"
                          checked={values.sex === "female"}
                          onChange={handleChange}
                        />{" "}
                        Female
                      </div>
                    </div>
                    {touched.sex ||
                      (errors.sex && (
                        <p className="text-red-500 absolute ml-[112px]">
                          {errors.sex}
                        </p>
                      ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-x-3 mt-8">
                  {/*GradeLevel Input*/}
                  <div>
                    <div className="inline-flex w-full">
                      <label
                        htmlFor="gradeLevel"
                        className="inline-block pt-2 pr-2 text-right w-24"
                      >
                        Grade Level:{" "}
                      </label>
                      <select
                        value={values.gradeLevel}
                        onChange={handleChange}
                        name="gradeLevel"
                        id="gradeLevel"
                        className="p-2 border-2 w-32  focus:border-none rounded-md border-gray-500 focus:outline-teal-500 focus:ring-teal-500 shadow-sm shadow-[#808080]"
                      >
                        <option>Grade 7</option>
                      </select>
                    </div>
                  </div>

                  {/*Section Input*/}
                  <div>
                    <div className="inline-flex w-full">
                      <label
                        htmlFor="section"
                        className="inline-block pt-2 pr-2 text-right w-[120px]"
                      >
                        Section:
                      </label>
                      <select
                        value={values.section}
                        onChange={handleChange}
                        name="section"
                        className="p-2 border-2 w-32 focus:border-none rounded-md border-gray-500 focus:outline-teal-500 focus:ring-teal-500 shadow-sm shadow-[#808080] "
                      >
                        <option>Rizal</option>
                        <option>Bonifacio</option>
                        <option>Mabini</option>
                        <option>Aguinaldo</option>
                        <option>Jacinto</option>
                        <option>Luna</option>
                        <option>Del Pilar</option>
                        <option>Silang</option>
                      </select>
                    </div>
                  </div>

                  {/*Group Type Input*/}
                  <div>
                    <div className="inline-flex w-full">
                      <label
                        htmlFor="groupType"
                        className="inline-block pt-2 pr-2 text-right w-[7rem]"
                      >
                        Group Type:{" "}
                      </label>
                      <select
                        value={values.groupType}
                        onChange={handleChange}
                        name="groupType"
                        className="p-2 border-2 w-52 rounded-md focus:border-none border-gray-500 focus:outline-teal-500 focus:ring-teal-500 shadow-sm shadow-[#808080]"
                      >
                        <option>Facial Group</option>
                        <option>Non Facial Group</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-x-3 mt-8">
                  <div className="col-span-2">
                    {/*Email Input*/}
                    <div className="inline-flex w-full">
                      <label
                        htmlFor="email"
                        className="inline-block pt-2 pr-2 text-right w-24"
                      >
                        Email:{" "}
                      </label>
                      <input
                        name="email"
                        type="email "
                        autoComplete="off"
                        placeholder="lastname.firstname@school.edu.ph"
                        className={`grow p-2 border-2 rounded-md border-gray-500 focus:outline-teal-500 focus:ring-teal-500 shadow-sm shadow-[#808080] ${
                          errors.email && touched.email
                            ? " shadow-red-500 border-red-500 focus:border-red-500 border-3 border-solid"
                            : ""
                        }`}
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {errors.email && touched.email && (
                      <p className="text-red-500  absolute ml-[95px] ">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-x-3 mt-8">
                  {/*Password Input*/}
                  <div>
                    <div className="inline-flex w-full">
                      <label
                        htmlFor="password"
                        className="inline-block pt-2 pr-2 text-right w-24"
                      >
                        Password:{" "}
                      </label>
                      <input
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        placeholder="Enter Password"
                        className={`grow p-2 py-3 border-2  rounded-md border-gray-500 focus:outline-teal-500 focus:ring-teal-500 focus:border-none relative shadow-sm shadow-[#808080] ${
                          errors.password && touched.password
                            ? " shadow-red-500 border-red-500 focus:border-red-500 border-3 border-solid"
                            : ""
                        }`}
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {errors.password && touched.password && (
                      <p className="text-red-500  absolute ml-[95px] ">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/*Confirm  Password Input*/}
                  <div className="col-span-1">
                    <div className="inline-flex w-full">
                      <label
                        htmlFor="confirmPassword"
                        className="inline-block pt-2 pr-2 text-right w-[7rem]"
                      >
                        Confirm Password:{" "}
                      </label>
                      <input
                        name="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        placeholder="Confirm Password"
                        className={`grow p-2 border-2  rounded-md border-gray-500 focus:outline-teal-500 focus:ring-teal-500 focus:border-none shadow-sm shadow-[#808080] ${
                          errors.confirmPassword && touched.confirmPassword
                            ? " shadow-red-500 border-red-500 focus:border-red-500 border-3 border-solid"
                            : ""
                        }`}
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {errors.confirmPassword && touched.confirmPassword && (
                      <p className="text-red-500  absolute ml-28 ">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>

                <div className=" flex justify-end text-center w-full mt-16 ">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-green-500 hover:bg-green-700 shadow-lg shadow-[#808080] hover:shadow-green-500 text-white font-bold py-3 px-12  rounded-full"
                  >
                    <span className="text-xl  font-bold">Register </span>
                  </button>
                </div>
              </main>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Registration;
