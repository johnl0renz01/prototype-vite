import axios from 'axios';
import { replace } from 'formik';

var SecureStorageData = (function () {
  let encryptedValue = '';
  let decryptedValue = '';

  var dataEncryption = function (value) {
    const dataValue = value;
    let string = JSON.stringify(dataValue);

    const secret = 'k4WQ,]+.C/dJ6z9a';

    let encrypted = CryptoJS.AES.encrypt(string, secret).toString();
    //let bytes = CryptoJS.AES.decrypt(encrypted, secret);
    //let decrypted = bytes.toString(CryptoJS.enc.Utf8);

    console.log(encrypted);
    return encrypted;
  };

  var dataDecryption = function (value) {
    const secret = 'k4WQ,]+.C/dJ6z9a';
    let encrypted = value;
    let bytes = CryptoJS.AES.decrypt(encrypted, secret);
    let decrypted = bytes.toString(CryptoJS.enc.Utf8);

    console.log(JSON.parse(decrypted));
    return decrypted;
  };

  return {
    dataEncryption: dataEncryption,
    dataDecryption: dataDecryption,
  };
})();

export default SecureStorageData;
