import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React, { Component } from "react";
import Background from "./components/background";
import Header from "./components/header";
import MyForm from "./components/testing";
import Algorithm from "./components/algo";

import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Difficulty from "./components/Difficulty";
import Whiteboard from "./components/Whiteboard";

import AdminHomepage from "./components/AdminHomepage";
import SectionList from "./components/SectionList";
import ClassList from "./components/ClassList";
import StudentDetail from "./components/StudentDetail";

import Login from "./components/Login";
import Registration from "./components/Registration";

import "./index.css";

class App extends Component {
  componentDidMount() {
    document.body.style.height = "100vh";
    document.body.style.backgroundImage =
      "linear-gradient(to top, #bef264, #d9f99d , #ccf779)";
  }

  render() {
    function a() {}

    console.log("App - Rendered");
    return (
      <BrowserRouter>
        <Navbar></Navbar>

        <Routes>
          <Route path="Homepage" element={<Homepage />} />
          <Route path="Difficulty" element={<Difficulty />} />

          <Route path="Whiteboard" element={<Whiteboard />} />

          <Route path="AdminHomepage" element={<AdminHomepage />} />
          <Route path="SectionList" element={<SectionList />} />
          <Route path="ClassList" element={<ClassList />} />
          <Route path="StudentDetail" element={<StudentDetail />} />

          <Route path="Login" element={<Login />} />
          <Route path="Registration" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
