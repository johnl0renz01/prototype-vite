import axios from 'axios';
import { replace } from 'formik';

var SecureStorageData = (function () {
  let encryptedValue = '';
  let decryptedValue = '';

  var dataEncryption = function (value) {
    if (value === null || value === undefined) {
      return null;
    }
    try {
      const dataValue = value;
      let string = JSON.stringify(dataValue);

      const secret = 'k4WQ,]+.C/dJ6z9a';

      let encrypted = CryptoJS.AES.encrypt(string, secret).toString();
      //let bytes = CryptoJS.AES.decrypt(encrypted, secret);
      //let decrypted = bytes.toString(CryptoJS.enc.Utf8);
      //
      //console.log(encrypted);
      return encrypted;
    } catch {
      return null;
    }
  };

  var dataDecryption = function (value) {
    if (value === null || value === undefined) {
      //console.log('asdasd');
      return null;
    }
    try {
      //console.log(value);
      const secret = 'k4WQ,]+.C/dJ6z9a';

      let encrypted = value;
      encrypted = encrypted.replace(/"/g, '');
      let bytes = CryptoJS.AES.decrypt(encrypted, secret);
      let decrypted = bytes.toString(CryptoJS.enc.Utf8);
      //
      //console.log(decrypted);
      if (decrypted == '') {
        return null;
      } else {
        return decrypted;
      }
    } catch {
      return null;
    }
  };

  return {
    dataEncryption: dataEncryption,
    dataDecryption: dataDecryption,
  };
})();

export default SecureStorageData;
