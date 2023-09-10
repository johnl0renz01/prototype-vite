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

const ChangeSection = ({ visible, onClose, onContinue }) => {
  const navigate = useNavigate();

  const [adviserData, setAdviserData] = useState([]);

  const [sections, setSections] = useState([]);

  /*
  function getSections() {
    var fullName = JSON.parse(window.localStorage.getItem('SESSION_FULLNAME'));
    fullName = fullName.replace(/ /g, '_');
    console.log(fullName);
    axios
      .get(
        `http://localhost:80/Prototype-Vite/my-project/api/sectionHandled/${fullName}`
      )
      .then(function (response) {
        console.log(response.data);
        setSections(response.data);
      });
  }*/

  const [section, setSectionData] = useState([]);
  const [studentsTotal, setStudentsTotal] = useState([]);

  const [sectionTotal, setSectionTotal] = useState(0);
  const [sectionNames, setSectionNames] = useState([]);

  const [processData, setProcessData] = useState(false);

  function getSections() {
    var totalSections = 0;
    var ids = [];
    var sectionNames = [];

    var fullName = JSON.parse(window.localStorage.getItem('SESSION_FULLNAME'));
    fullName = fullName.replace(/ /g, '_');
    //console.log(fullName);

    axios
      .get(
        `http://localhost:80/Prototype-Vite/my-project/api/sectionHandled/${fullName}`
      )
      .then(function (response) {
        //console.log(response.data);
        setSections(response.data);
      });

    axios
      .get(
        `http://localhost:80/Prototype-Vite/my-project/api/sectionTotalv2/${fullName}`
      )
      .then(function (response) {
        //console.log(response.data);
        totalSections = response.data;
        setSectionTotal(totalSections);
        //console.log('totalSections: ' + totalSections);

        for (let i = 0; i < totalSections; i++) {
          ids.push(i);
        }

        // FOR SECTION NAMES
        const promises = ids.map(id =>
          axios.get(
            `http://localhost:80/Prototype-Vite/my-project/api/sectionNamev2/${id}@${fullName}`
          )
        );
        Promise.all([...promises]).then(function (values) {
          sectionNames.push(values);
          sectionNames = sectionNames[0];
          //console.log(sectionNames);

          var newArray = [];
          for (let i = 0; i < totalSections; i++) {
            var tempArray = [];
            var result = Object.keys(sectionNames[i]).map(key => [
              key,
              sectionNames[i][key],
            ]);

            for (let j = 0; j < result.length; j++) {
              tempArray.push(result[j][1]);
            }
            //console.log(tempArray);

            let data = JSON.stringify(tempArray[0]);
            data = data.replace(/"/g, '');
            data = data.replace(/ /g, '_');

            newArray.push(data);
          }

          //console.log(newArray);
          setSectionNames(newArray);
          setProcessData(true);
          //
        });
      });
  }

  function total() {
    //console.log('SECTION NAMES:');
    //console.log(sectionNames);
    var tally = [];
    // FOR TOTAL
    if (processData) {
      //console.log('Imh here');
      const promises2 = sectionNames.map(id =>
        axios.get(
          `http://localhost:80/Prototype-Vite/my-project/api/sectionTotalStudents/${id}`
        )
      );
      Promise.all([...promises2]).then(function (values) {
        tally.push(values);
        tally = tally[0];
        //console.log(values);

        let newArray = [];
        for (let i = 0; i < sectionTotal; i++) {
          let tempArray = [];
          let result = Object.keys(tally[i]).map(key => [key, tally[i][key]]);

          for (let j = 0; j < result.length; j++) {
            tempArray.push(result[j][1]);
          }
          //console.log(tempArray);

          let data = JSON.stringify(tempArray[0]);
          data = data.replace(/"/g, '');

          newArray.push(data);
        }

        //console.log(newArray);

        setStudentsTotal(newArray);
        setProcessData(false);
      });
    }
  }

  const [selectedSection, setSelectedSection] = useState('');

  useEffect(() => {
    var data = window.localStorage.getItem('CURRENT_SECTION');
    if (data === null) {
    } else {
      var data2 = window.sessionStorage.getItem('CURRENT_SECTION');
      console.log(data2);
      if (data2 === null) {
        data = data.replace(/"/g, '');
        total();
        setSelectedSection(data);
      } else {
        data2 = data2.replace(/"/g, '');
        total();
        setSelectedSection(data2);
      }
    }
  });

  useEffect(() => {
    var data = window.localStorage.getItem('CURRENT_SECTION');
    if (data === null) {
    } else {
      var data2 = window.sessionStorage.getItem('CURRENT_SECTION');
      console.log(data2);
      if (data2 === null) {
        getSections();
      } else {
        getSections();
      }
    }
  }, []);
  //window.localStorage.setItem("");

  const handleOnClose = e => {
    if (e.target.id === 'mainContainer') onClose();
  };

  const changeSection = event => {
    var currentSectionName = event.target.name;
    window.sessionStorage.setItem(
      'CURRENT_SECTION',
      JSON.stringify(currentSectionName)
    );
    onContinue();
  };

  if (!visible) return null;

  return (
    <>
      <div
        id="mainContainer"
        onClick={handleOnClose}
        className={`fixed top-0 z-50 inset-0 bg-black bg-opacity-50 backdrop-blur-[1.5px] flex justify-center items-center "
       `}
      >
        <div className="bg-white hdScreen:w-[27.5%] semihdScreen:w-[40%] laptopScreen:w-[45%] averageScreen:w-[45%] sm:w-[50%] xs:w-[60%] hdScreen:scale-100 semihdScreen:scale-95 laptopScreen:scale-90 averageScreen:scale-90 rounded lg:text-lg xs:text-xs shadow-md ">
          <div className="overflow-hidden  ">
            <table className="w-full leading-normal ">
              <thead className="sticky top-0 z-40 shadow-md border-b-2 border-gray-200 bg-gray-200 text-left uppercase tracking-wider md:text-base xs:text-xs font-bold text-gray-600">
                <tr>
                  <th className="lg:pl-8 w-[10%]  md:text-base sm:text-sm ">
                    <div className="lg:pl-0 sm:pl-3  xs:pl-3">Section</div>
                  </th>
                  <th className="w-[10%]  md:text-base sm:text-xs ">Total</th>
                  <th className="w-[7%] "></th>
                  <th className="w-[0%]">
                    <button
                      onClick={onClose}
                      className="bg-gray-400/70 p-2 inline-block hover:bg-red-600 transition duration-200 hover:text-white"
                    >
                      <MdClose />
                    </button>
                  </th>
                </tr>
              </thead>
            </table>

            <div className=" relative overflow-y-scroll style-2 mx-auto w-full rounded-md">
              <div className="">
                <div className="">
                  <div className="inline-block min-w-full rounded-lg ">
                    <table className="min-w-full leading-normal -mt-[28px]">
                      <thead className="invisible text-left uppercase tracking-wider font-bold md:text-base xs:text-xs">
                        <tr>
                          <th className="lg:pl-8 w-[10%] md:text-base sm:text-sm   whitespace-no-wrap">
                            Section
                          </th>
                          <th className="w-[11%]  md:text-base sm:text-sm ">
                            Total
                          </th>
                          <th className="w-[0.5%] mr-4"></th>
                        </tr>
                      </thead>

                      {sections.length > 0 ? (
                        <tbody className=" ">
                          {sections.map((currentSection, index) => (
                            <tr
                              key={index}
                              className="odd:bg-white even:bg-slate-50/30 border-b border-gray-200 bg-white hover:bg-gray-100 text-gray-900 hover:text-indigo-600"
                            >
                              <td className="flex items-center md:text-base xs:text-xs lg:px-5 py-[10px]  whitespace-no-wrap ">
                                <div className="flex-shrink-0  h-10 mr-3 break-all "></div>
                                <p className="  md:text-base xs:text-xs ">
                                  {`${currentSection.GradeLevel} - ${currentSection.SectionName} `}
                                </p>
                              </td>
                              <td className="md:text-base xs:text-xs">
                                <p>[{studentsTotal[index]}] Students</p>
                              </td>
                              <td className="text-right md:text-base xs:text-xs pr-2">
                                <div className="relative">
                                  <input
                                    onClick={
                                      selectedSection ==
                                      currentSection.SectionName
                                        ? null
                                        : changeSection
                                    }
                                    name={currentSection.SectionName}
                                    type="submit"
                                    value="Select Section"
                                    className={` py-[0.5rem]  px-4  shadow-md rounded-full font-normal  transition duration-300   lg:text-base drop-shadow-[0_2px_0px_rgba(0,0,0,0.45)] hover:drop-shadow-[0_2px_0px_rgba(0,0,0,0.6)]
                                  ${
                                    selectedSection ==
                                    currentSection.SectionName
                                      ? 'bg-gray-400/90 text-gray-300'
                                      : 'cursor-pointer bg-blue-500/90 hover:bg-blue-600 text-white'
                                  }`}
                                    {...(selectedSection ==
                                    currentSection.SectionName
                                      ? {
                                          title:
                                            'This section is already selected.',
                                        }
                                      : {})}
                                  ></input>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      ) : (
                        <></>
                      )}
                    </table>
                    <div className="w-full bg-white"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangeSection;
