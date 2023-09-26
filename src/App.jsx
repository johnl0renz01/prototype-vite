import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { Component, useEffect } from 'react';

import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import Difficulty from './components/Difficulty';
import Whiteboard from './components/Whiteboard';

import ClassList from './components/ClassList';
import StudentDetail from './components/StudentDetail';

import Registration from './components/Registration';

import './index.css';

import LoginPage from './components/LoginPage';
import TeacherNavbar from './components/TeacherNavbar';

import EquationList from './components/EquationList';
import CreateEquation from './components/CreateEquation';

import AdminNavbar from './components/AdminNavbar';
import ManageSection from './components/ManageSection';

import ManageAccount from './components/ManageAccount';
import UserRequest from './components/UserRequest';
import MyRequest from './components/MyRequest';
import HelpPageAdmin from './components/HelpPageAdmin';
import HelpPageTeacher from './components/HelpPageTeacher';

import HomePageTeacher from './components/HomePageTeacher';
import HomePageAdmin from './components/HomePageAdmin';

import ErrorPage from './components/ErrorPage';
import LogoutWarning from './components/LogoutWarning';

class App extends Component {
  componentWillUnmount() {
    localStorage.clear();
  }

  componentDidMount() {
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';

    document.body.style.backgroundImage =
      'linear-gradient(to top, #bef264, #d9f99d , #ccf779)';

    /*
    window.localStorage.setItem("NAVBAR_PAGE", JSON.stringify(""));
    window.localStorage.setItem("NAVBAR_PAGE_LINK", JSON.stringify(""));

    window.localStorage.setItem("CURRENT_ACCOUNT", JSON.stringify(""));
    window.localStorage.setItem("SESSION_ID", JSON.stringify(""));
    window.localStorage.setItem("QUESTION_INDEX", JSON.stringify(""));
    window.localStorage.setItem("CURRENT_EMAIL", JSON.stringify(""));
    window.localStorage.setItem("SESSION_USER_LOGS", JSON.stringify(""));
    window.localStorage.setItem("LOGIN_TYPE", JSON.stringify(""));
    window.localStorage.setItem("QUESTION_TYPE", JSON.stringify(""));
    window.localStorage.setItem("SESSION_EMAIL", JSON.stringify(""));
    window.localStorage.setItem("SESSION_USER", JSON.stringify(""));
    window.localStorage.setItem("NAVBAR_PAGE_LINK", JSON.stringify(""));
    window.localStorage.setItem("CURRENT_SECTION", JSON.stringify(""));
    */
  }

  render() {
    console.log('App - Rendered');
    return (
      <BrowserRouter>
        <LogoutWarning></LogoutWarning>
        <Navbar></Navbar>
        <TeacherNavbar></TeacherNavbar>
        <AdminNavbar></AdminNavbar>

        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="Homepage" element={<Homepage />} />
          <Route path="Difficulty" element={<Difficulty />} />

          <Route path="Whiteboard" element={<Whiteboard />} />

          <Route path="ClassList" element={<ClassList />} />
          <Route path="StudentDetail" element={<StudentDetail />} />

          <Route path="Registration" element={<Registration />} />

          <Route path="LoginPage" element={<LoginPage />} />

          <Route path="EquationList" element={<EquationList />} />
          <Route path="CreateEquation" element={<CreateEquation />} />
          <Route path="ManageSection" element={<ManageSection />} />

          <Route path="ManageAccount" element={<ManageAccount />} />
          <Route path="UserRequest" element={<UserRequest />} />
          <Route path="MyRequest" element={<MyRequest />} />
          <Route path="HelpPageAdmin" element={<HelpPageAdmin />} />
          <Route path="HelpPageTeacher" element={<HelpPageTeacher />} />

          <Route path="HomePageAdmin" element={<HomePageAdmin />} />
          <Route path="HomePageTeacher" element={<HomePageTeacher />} />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;

/*

<Route path="AdminHomepage" element={<AdminHomepage />} />
          <Route path="Customization" element={<Customization />} />
          <Route path="Login" element={<Login />} />
          
*/
