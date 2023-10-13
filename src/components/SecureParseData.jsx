import axios from 'axios';
import { replace } from 'formik';

var SecureParseData = (function () {
  var parseJSON = function (value) {
    if (value === null || value === undefined) {
      return null;
    }
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  };

  var parseStorage = function (value) {
    if (value === null || value === undefined) {
      return null;
    }
    try {
      return value;
    } catch {
      return null;
    }
  };

  return {
    parseJSON: parseJSON,
    parseStorage: parseStorage,
  };
})();

export default SecureParseData;
