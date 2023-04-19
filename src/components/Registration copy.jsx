import React, { Component } from "react";
import { useFormik } from "formik";
import { registrationSchema } from "../schemas";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as ReactDOM from "react-dom";
import $ from "jquery";

import RegistrationModal from "./RegistrationModal";

function Registration() {
  document.body.style.height = "100vh";
  const navigate = useNavigate();

  const [pageList, setPageList] = useState([]);
  const [pageLink, setPageLink] = useState([]);

  useEffect(() => {
    setPage();
    window.addEventListener("focus", setPage);
    function setPage() {
      let page = ["Home", "Registration"];
      let link = ["/AdminHomepage", "/Registration"];
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

  const onSubmit = async (values, actions) => {
    console.log("SUBMITTED");
    axios
      .post(
        "http://localhost:80/Prototype-Vite/my-project/api/registerAccount/save",
        values
      )
      .then(function (response) {
        console.log(response.data);
        //window.location.reload(false);
      });
    await new Promise((resolve) => setTimeout(resolve, 1));
    setShowModal(true);
    actions.resetForm();

    //ADDITIONAL RESET
    /*
    setBirthday("");
    setAge("");
    setFirstName("");
    setLastName("");
    setEmail("");
    values.age = "";
    values.firstName = "";
    values.lastName = "";
    */
  };

  const [currentAge, setAge] = useState("");

  function getAge(dateString) {
    var string = dateString.replace(/[\-]/gi, "/");
    var today = new Date();
    var birthDate = new Date(string);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    setAge(age.toString());
    setTimeout(setValue, 100);
    function setValue() {
      values.age = age;
      handleChange.age;
      document.getElementById("age").focus();
      setTimeout(document.getElementById("age").blur(), 1);
    }

    console.log(values.age);
  }

  const [birthday, setBirthday] = useState("");

  const dateChange = (event) => {
    const value = event.target.value;
    values.birthDay = value;
    setBirthday(value);
    getAge(values.birthDay);
    handleChange.age;
  };

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  var fName = "";
  var lName = "";
  var tempEmail = "";

  const firstNameChange = (event) => {
    const value = event.target.value;
    var emailValue = value.replace(/\s/g, "");
    emailValue = emailValue.toLowerCase();

    values.firstName = value;
    handleChange.firstName;

    setFirstName(emailValue);
    fName = emailValue;

    if (lastName != "") {
      setEmail(lastName + "." + emailValue + "@sanfrancisco.edu.ph");
      tempEmail = lastName + "." + emailValue + "@sanfrancisco.edu.ph";
    } else {
      if (firstName === "") {
        setEmail("");
        tempEmail = "";
      } else {
        setEmail(emailValue + "@sanfrancisco.edu.ph");
        tempEmail = emailValue + "@sanfrancisco.edu.ph";
      }
    }

    values.email = tempEmail;
    handleChange.email;

    //UPDATE INSTANTLY
    document.getElementById("firstName").focus();
    document.getElementById("firstName").blur();
    document.getElementById("email").focus();
    document.getElementById("email").blur();
    document.getElementById("firstName").focus();
  };

  const lastNameChange = (event) => {
    const value = event.target.value;
    var emailValue = value.replace(/\s/g, "");
    emailValue = emailValue.toLowerCase();

    values.lastName = value;
    handleChange.lastName;

    setLastName(emailValue);
    lName = emailValue;

    if (firstName != "") {
      setEmail(emailValue + "." + firstName + "@sanfrancisco.edu.ph");
      tempEmail = emailValue + "." + firstName + "@sanfrancisco.edu.ph";
    } else {
      if (lastName === "") {
        setEmail("");
        tempEmail = "";
      } else {
        setEmail(emailValue + "@sanfrancisco.edu.ph");
        tempEmail = emailValue + "@sanfrancisco.edu.ph";
      }
    }

    values.email = tempEmail;
    handleChange.email;

    //UPDATE INSTANTLY
    document.getElementById("lastName").focus();
    document.getElementById("lastName").blur();
    document.getElementById("email").focus();
    document.getElementById("email").blur();
    document.getElementById("lastName").focus();
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

  //FOR MODAL
  const [showModal, setShowModal] = useState(false);
  const handleOnCloseModal = () => setShowModal(false);

  return (
    <>
      <div className="mx-auto my-24 w-2/3">
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

            <form
              onSubmit={handleSubmit}
              action=""
              className="overflow-hidden"
              autocomplete="off"
            >
              <main className="py-12 pr-12 min-w-fit font-poppins font-semibold  overflow-hidden">
                <div className="grid grid-cols-3 gap-x-3 ">
                  {/*FirstName Input*/}
                  <div>
                    <div className="inline-flex w-full">
                      <label
                        htmlFor="firstName"
                        className="inline-block mt-2 pr-2 text-right w-[136px]"
                      >
                        Given Name:{" "}
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text "
                        placeholder="Enter Given Name "
                        autoComplete="new-password"
                        className={` grow p-2 border-2 rounded-md border-gray-500 focus:outline-teal-500 relative focus:ring-teal-500 shadow-sm  shadow-[#808080] ${
                          errors.firstName && touched.firstName
                            ? "shadow-red-500  border-red-500 focus:border-red-500 border-3 border-solid"
                            : ""
                        }`}
                        value={values.firstName}
                        onChange={firstNameChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {errors.firstName && touched.firstName && (
                      <p className="text-red-500 absolute ml-[136px] ">
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
                        className={`grow p-2 border-2  rounded-md relative border-gray-500 focus:outline-teal-500 focus:ring-teal-500 shadow-sm  shadow-[#808080]`}
                        value={values.middleName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
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
                        id="lastName"
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
                        onChange={lastNameChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {errors.lastName && touched.lastName && (
                      <p className="text-red-500  absolute ml-[7rem] ">
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
                        className="inline-block pt-2 pr-2 text-right w-[136px]"
                      >
                        Birth date:{" "}
                      </label>
                      <input
                        id="birthDay"
                        name="birthDay"
                        type="date"
                        autoComplete="new-password"
                        className="grow p-2 border-2  focus:border-none rounded-md border-gray-500 focus:outline-teal-500 focus:ring-teal-500 shadow-sm shadow-[#808080]"
                        onChange={dateChange}
                        onBlur={handleBlur}
                        value={birthday}
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
                        name="age"
                        type="text"
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
                      <p className="text-red-500  absolute ml-[120px] ">
                        {errors.age}
                      </p>
                    )}
                  </div>

                  {/*Gender Input*/}
                  <div>
                    <div className="inline-flex w-full ">
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
                          value="Male"
                          checked={values.sex === "Male"}
                          onChange={handleChange}
                        />{" "}
                        Male
                        <input
                          name="sex"
                          type="radio"
                          className="ml-4"
                          value="Female"
                          checked={values.sex === "Female"}
                          onChange={handleChange}
                        />{" "}
                        Female
                      </div>
                    </div>
                    {touched.sex ||
                      (errors.sex && (
                        <p className="text-red-500 absolute ml-[7rem]">
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
                        className="inline-block pt-2 pr-2 text-right w-[136px]"
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
                        <option className="font-semibold">Grade 7</option>
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
                        <option className="font-semibold">Rizal</option>
                        <option className="font-semibold">Bonifacio</option>
                        <option className="font-semibold">Mabini</option>
                        <option className="font-semibold">Aguinaldo</option>
                        <option className="font-semibold">Jacinto</option>
                        <option className="font-semibold">Luna</option>
                        <option className="font-semibold">Del Pilar</option>
                        <option className="font-semibold">Silang</option>
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
                        <option className="font-semibold">Facial Group</option>
                        <option className="font-semibold">
                          Non Facial Group
                        </option>
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
                        className="inline-block pt-2 pr-2 text-right w-[136px]"
                      >
                        Email:{" "}
                      </label>
                      <input
                        readOnly
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="off"
                        placeholder="lastname.firstname@school.edu.ph"
                        className={`grow p-2 border-2 rounded-md border-gray-500 focus:outline-teal-500 focus:ring-teal-500 shadow-sm shadow-[#808080] ${
                          errors.email && touched.email
                            ? " shadow-red-500 border-red-500 focus:border-red-500 border-3 border-solid"
                            : ""
                        }`}
                        value={email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {errors.email && touched.email && (
                      <p className="text-red-500  absolute ml-[136px] ">
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
                        className="inline-block pt-2 pr-2 text-right w-[136px]"
                      >
                        Password:{" "}
                      </label>
                      <input
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        placeholder="Enter Password"
                        className={`grow p-2 py-[14.5px] border-2  rounded-md border-gray-500 focus:outline-teal-500 focus:ring-teal-500 focus:border-none relative shadow-sm shadow-[#808080] ${
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
                      <p className="text-red-500  absolute ml-[136px] ">
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
                    className="py-3 px-12 text-white font-bold  shadow-md rounded-full bg-lime-600 hover:bg-lime-700 hover:-translate-y-0.5 ease-in-out transition duration-300 transform "
                  >
                    <span className="text-xl  font-bold">Register </span>
                  </button>
                </div>
              </main>
            </form>
          </div>
        </div>
      </div>
      <RegistrationModal onClose={handleOnCloseModal} visible={showModal} />
    </>
  );
}

export default Registration;
