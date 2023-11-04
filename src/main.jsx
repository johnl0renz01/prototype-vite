import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './font.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import SecureParseData from './components/SecureParseData';
import SecureStorageData from './components/SecureStorageData';

import App from './App';
import StorageData from './components/StorageData';

const root = ReactDOM.createRoot(document.getElementById('root'));

var closed = JSON.parse(window.localStorage.getItem('IS_CLOSED'));
if (closed === null) closed = false;

if (closed) {
  window.removeEventListener('mouseover', removeBeforeUnload);
} else {
  window.addEventListener('mouseover', removeBeforeUnload);
  document.onkeydown = keydown;
  document.onkeyup = keyup;
}

function removeBeforeUnload() {
  /*
  window.localStorage.setItem('IS_CLOSED', false);
  window.onbeforeunload = function () {
    // blank function do nothing
  };
  */
}

function keydown(evt) {
  /*
  if (evt.altKey) {
    window.onbeforeunload = function () {
      window.localStorage.setItem('IS_CLOSED', true);
      return 'your message';
    };
    if (evt.keyCode == 115) {
      //CTRL+ALT+F4
      alert('ALT+F4');
    }
  }
  */
}

function keyup(evt) {
  removeBeforeUnload();
}

document.addEventListener('click', checkLogged);
document.addEventListener('mouseenter', checkLogged);

function checkLogged() {
  var unique = JSON.parse(window.localStorage.getItem('UNIQUE_ID'));
  if (unique !== null) {
    axios
      .get(`https://pia-sfe.online/api/getSessionLogged/${unique}`)
      .then(function (response) {
        var result = response.data;
        if (result == 'FALSE') {
          window.localStorage.setItem(
            'LOGIN_STATUS',
            JSON.stringify('Terminated')
          );
        }
        window.localStorage.setItem('LOGGED', JSON.stringify(result));
      });
  }

  checkDate();
  function checkDate() {
    let subscriptionDate = StorageData.localStorageJSON('S-DATE');
    if (subscriptionDate !== null) {
      var dateString = subscriptionDate;
      subscriptionDate = subscriptionDate.split('-');

      subscriptionDate[1] = parseInt(subscriptionDate[1]) - 1;
      subscriptionDate[1] = subscriptionDate[1].toString();

      let endDate = new Date(
        subscriptionDate[0],
        subscriptionDate[1],
        subscriptionDate[2],
        0,
        0
      );
      //Output value in milliseconds
      let endTime = endDate.getTime();

      let todayDate = new Date();
      let todayTime = todayDate.getTime();
      if (endTime < todayTime && dateString != '0-0-0') {
        window.localStorage.setItem(
          'LOGIN_STATUS',
          JSON.stringify('Terminated')
        );
        window.localStorage.setItem('LOGGED', JSON.stringify(result));
      }
    }
  }
}

document.addEventListener('mouseenter', checkChange);

function checkChange() {
  var verify = SecureParseData.parseJSON(
    window.localStorage.getItem('UPDATE_WHITEBOARD')
  );
  if (verify !== null) {
    window.localStorage.removeItem('UPDATE_WHITEBOARD');
    window.location.reload(false);
  }
}

/*
document.addEventListener('mouseleave', removeEmail);
function removeEmail() {
  window.localStorage.setItem('SESSION_EMAIL', JSON.stringify(''));
}


document.addEventListener('mouseenter', addEmail);
function addEmail() {
  var unique = SecureParseData.parseJSON(window.localStorage.getItem('UNIQUE_ID'));

  axios
    .get(
      `https://pia-sfe.online/api/getSessionEmail/${unique}`
    )
    .then(function (response) {
      var result = response.data;
      window.localStorage.setItem('SESSION_EMAIL', JSON.stringify(result));
    });
}
*/

getLogData();

function getLogData() {
  var unique = JSON.parse(window.localStorage.getItem('UNIQUE_ID'));
  if (unique !== null) {
    axios
      .get(`https://pia-sfe.online/api/getSessionLogged/${unique}`)
      .then(function (response) {
        var result = response.data;
        if (result == 'FALSE') {
          window.localStorage.setItem(
            'LOGIN_STATUS',
            JSON.stringify('Terminated')
          );
        }
        window.localStorage.setItem('LOGGED', JSON.stringify(result));
        root.render(
          <React.Fragment>
            <App />
          </React.Fragment>
        );
      });
  } else {
    window.localStorage.setItem('LOGGED', JSON.stringify('FALSE'));
    root.render(
      <React.Fragment>
        <App />
      </React.Fragment>
    );
  }
}
