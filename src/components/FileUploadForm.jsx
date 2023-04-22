//src/FileUploadForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";
class FileUploadForm extends React.Component {
  UPLOAD_ENDPOINT =
    "http://localhost:80/Prototype-Vite/my-project/api/upload/save";

  componentDidMount() {
    console.log("MOUNTED");
    //document.title = `You clicked ${this.state.count} times`;
  }
  componentDidUpdate() {
    //console.log("UUPDATED");
    //document.title = `You clicked ${this.state.count} times`;
  }

  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }

  async onSubmit(e) {
    e.preventDefault();
    let res = await this.uploadFile(this.state.file);
    console.log(res.data);
    window.localStorage.setItem("FILE_UPLOADED", JSON.parse(true));
    //if (res.data == "done") {
    console.log("IM DONE");
    alert("new record successul");
    window.location.reload(false);
    //setTimeout(window.location.reload(true), 1);
    //}
  }
  onChange(e) {
    this.setState({ file: e.target.files[0] });
    window.localStorage.setItem("FILE_UPLOADED", JSON.parse(false));
  }

  async uploadFile(file) {
    const formData = new FormData();
    formData.append("avatar", file);
    return await axios.post(this.UPLOAD_ENDPOINT, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
  }

  render() {
    return (
      <div className=" w-[7rem] h-7">
        <div className="">
          <form
            method="POST"
            onSubmitCapture={this.onSubmit}
            className="form-inline"
          >
            <div className="form-group">
              <input
                type="file"
                className="form-control"
                onChange={this.onChange}
              />
            </div>{" "}
            <button
              type="submit"
              className="hidden bg-gradient-to-t from-gray-200 via-gray-100 to-white border-2 px-1 py-0.5 text-base mt-2 mb-8 hover:border-gray-400"
            >
              Upload
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default FileUploadForm;
