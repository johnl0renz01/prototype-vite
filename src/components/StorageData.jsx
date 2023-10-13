import axios from 'axios';
import { replace } from 'formik';

import SecureParseData from './SecureParseData';
import SecureStorageData from './SecureStorageData';

var StorageData = (function () {
  var localStorageJSON = function (value) {
    let request = SecureParseData.parseJSON(
      SecureStorageData.dataDecryption(window.localStorage.getItem(value))
    );
    return request;
  };

  var localStorageRAW = function (value) {
    let request = SecureParseData.parseStorage(
      SecureStorageData.dataDecryption(window.localStorage.getItem(value))
    );
    return request;
  };

  var sessionStorageJSON = function (value) {
    let request = SecureParseData.parseJSON(
      SecureStorageData.dataDecryption(window.sessionStorage.getItem(value))
    );
    return request;
  };

  var sessionStorageRAW = function (value) {
    let request = SecureParseData.parseStorage(
      SecureStorageData.dataDecryption(window.sessionStorage.getItem(value))
    );
    return request;
  };

  return {
    localStorageJSON: localStorageJSON,
    localStorageRAW: localStorageRAW,
    sessionStorageJSON: sessionStorageJSON,
    sessionStorageRAW: sessionStorageRAW,
  };
})();

export default StorageData;
