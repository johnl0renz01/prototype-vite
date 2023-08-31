import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

import { useFormik } from 'formik';
import { editAccountSchema } from '../schemas';
import { editSectionSchema } from '../schemas';
import { addSectionSchema } from '../schemas';

import { VscCheckAll, VscPassFilled } from 'react-icons/vsc';

import { BsSlashCircle } from 'react-icons/bs';

import { MdClose } from 'react-icons/md';
import { VscQuestion } from 'react-icons/vsc';

const ImageModalTeacher = ({ visible, onClose, onContinue }) => {
  const navigate = useNavigate();

  const [imageLink, setImageLink] = useState('report-card-home');

  useEffect(() => {
    var link = JSON.parse(window.sessionStorage.getItem('IMAGE_LINK_TEACHER'));
    //console.log('LINK: ', link);
    if (link !== null) setImageLink(link);
  });

  if (!visible) return null;

  return (
    <>
      <div
        id="mainContainer"
        onClick={onClose}
        className={`fixed top-0 z-50 inset-0 bg-black bg-opacity-80 backdrop-blur-[1.5px] flex justify-center items-center "
       `}
      >
        <div className="  rounded lg:text-lg xs:text-xs shadow-md ">
          <div className="overflow-hidden  ">
            <button
              onClick={onClose}
              className="absolute z-10 top-5 right-5 bg-red-600 p-2 inline-block hover:bg-red-500 transition duration-200 hover:text-white"
            >
              <MdClose />
            </button>

            <div className=" relative mx-auto scale-95 rounded-md">
              <div className="">
                <img
                  className=" border-2 border-gray-300"
                  src={require(`../assets/teacher_guide/${imageLink}.png`)}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageModalTeacher;
