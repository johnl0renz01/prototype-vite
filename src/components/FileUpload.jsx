//src/FileUploadForm.js
import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import StorageData from './StorageData';

class FileUpload extends React.Component {
  //UPLOAD_ENDPOINT = `https://pia-sfe.online/api/upload-image/${requestID}`;
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    //this.uploadFile = this.uploadFile.bind(this);
  }
  //UNUSED
  async onSubmit(e) {
    e.preventDefault();
    let res = await this.uploadFile(this.state.file);
    console.log(res.data);
  }
  async onChange(e) {
    if (e.target.files[0].size > 2000000) {
      alert('File is too big! Maximum file size is 2MB.');
      for (var i = 1; i < 99999; i++) window.clearInterval(i);
      return;
    } else {
      var UPLOAD_ENDPOINT = '';
      window.sessionStorage.removeItem('UPLOAD_IMAGE');
      this.setState({ file: e.target.files[0] });
      var file = e.target.files[0];
      var filename = file.name;
      document.getElementById('filename').textContent = filename;
      document.getElementById('filename').title = filename;

      setInterval(checkStatus, 200);
      async function checkStatus() {
        var requestID = StorageData.sessionStorageJSON('CURRENT_VIEW_DETAIL');
        UPLOAD_ENDPOINT = `https://pia-sfe.online/api/upload-image/${requestID}`;

        var uploadImage = StorageData.sessionStorageJSON('UPLOAD_IMAGE');
        console.log(uploadImage);

        if (uploadImage !== null) {
          UPLOAD_ENDPOINT = `https://pia-sfe.online/api/upload-image/${requestID}`;
          window.sessionStorage.removeItem('UPLOAD_IMAGE');

          e.preventDefault();
          let res = await uploadFile(file);
          console.log(res.data);
        }
      }

      function uploadFile(file) {
        const formData = new FormData();
        formData.append('avatar', file);
        return axios.post(UPLOAD_ENDPOINT, formData, {
          headers: {
            'content-type': 'multipart/form-data',
          },
        });
      }
    }
  }

  /*
  async uploadFile(file) {
    const formData = new FormData();
    formData.append('avatar', file);
    return await axios.post(this.UPLOAD_ENDPOINT, formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  }
*/

  render() {
    return (
      <div className="container text-right">
        <div className="row">
          <div>
            <div className="form-group ">
              <label
                htmlFor="file"
                className="lg:text-base xs:text-xs cursor-pointer text-right inline-flex justify-end "
              >
                <i className=" fa fa-paperclip mr-1 mt-1"></i>{' '}
                <p
                  title=""
                  id="filename"
                  className=" lg:max-w-[13rem] sm:max-w-[8rem] xs:max-w-[7.5rem] text-ellipsis overflow-hidden whitespace-nowrap"
                >
                  Attach File
                </p>
              </label>
              <input
                id="file"
                name="file"
                type="file"
                className="form-control"
                onChange={this.onChange}
                hidden
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default FileUpload;
