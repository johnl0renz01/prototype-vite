import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import React, { Component } from 'react';

import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import Difficulty from './components/Difficulty';
import Whiteboard from './components/Whiteboard';

import AdminHomepage from './components/AdminHomepage';
import SectionList from './components/SectionList';
import ClassList from './components/ClassList';
import StudentDetail from './components/StudentDetail';
import Customization from './components/Customization';
import EditAccount from './components/EditAccount';

import Login from './components/Login';
import Registration from './components/Registration';

import Initiation from './components/Initiation';

import './index.css';

import LoginPage from './components/LoginPage';

import TeacherPage from './components/TeacherPage';
import TeacherNavbar from './components/TeacherNavbar';

import EquationList from './components/EquationList';
import CreateEquation from './components/CreateEquation';

import AdminNavbar from './components/AdminNavbar';
import ManageSection from './components/ManageSection';
import EditSection from './components/EditSection';
import CreateSection from './components/CreateSection';

import ManageAccount from './components/ManageAccount';
import ResetPassword from './components/ResetPassword';
import UserRequest from './components/UserRequest';
import HelpPageAdmin from './components/HelpPageAdmin';
import HelpPageTeacher from './components/HelpPageTeacher';

import HomePageTeacher from './components/HomePageTeacher';
import HomePageAdmin from './components/HomePageAdmin';

class App extends Component {
  componentDidMount() {
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
        <Navbar></Navbar>
        <TeacherNavbar></TeacherNavbar>
        <AdminNavbar></AdminNavbar>

        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="Homepage" element={<Homepage />} />
          <Route path="Difficulty" element={<Difficulty />} />

          <Route path="Whiteboard" element={<Whiteboard />} />

          <Route path="AdminHomepage" element={<AdminHomepage />} />
          <Route path="SectionList" element={<SectionList />} />
          <Route path="ClassList" element={<ClassList />} />
          <Route path="StudentDetail" element={<StudentDetail />} />
          <Route path="Customization" element={<Customization />} />
          <Route path="EditAccount" element={<EditAccount />} />

          <Route path="Login" element={<Login />} />
          <Route path="Registration" element={<Registration />} />

          <Route path="LoginPage" element={<LoginPage />} />
          <Route path="TeacherPage" element={<TeacherPage />} />

          <Route path="EquationList" element={<EquationList />} />
          <Route path="CreateEquation" element={<CreateEquation />} />
          <Route path="ManageSection" element={<ManageSection />} />
          <Route path="EditSection" element={<EditSection />} />
          <Route path="CreateSection" element={<CreateSection />} />

          <Route path="ManageAccount" element={<ManageAccount />} />
          <Route path="ResetPassword" element={<ResetPassword />} />
          <Route path="UserRequest" element={<UserRequest />} />
          <Route path="HelpPageAdmin" element={<HelpPageAdmin />} />
          <Route path="HelpPageTeacher" element={<HelpPageTeacher />} />

          <Route path="HomePageAdmin" element={<HomePageAdmin />} />
          <Route path="HomePageTeacher" element={<HomePageTeacher />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
