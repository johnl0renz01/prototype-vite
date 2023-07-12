import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

export default function SectionList() {
  document.body.style.height = '100%';

  const navigate = useNavigate();

  //FOR LINKS/NAVBAR/BREADCRUMBS
  const [pageList, setPageList] = useState([]);
  const [pageLink, setPageLink] = useState([]);

  useEffect(() => {
    setPage();
    window.addEventListener('focus', setPage);
    function setPage() {
      let page = ['Home', 'Section List'];
      let link = ['/AdminHomepage', '/SectionList'];
      setPageList(page);
      setPageLink(link);
      window.localStorage.setItem('NAVBAR_PAGE', JSON.stringify(pageList));
      window.localStorage.setItem('NAVBAR_PAGE_LINK', JSON.stringify(pageLink));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('NAVBAR_PAGE', JSON.stringify(pageList));
  }, [pageList]);

  useEffect(() => {
    window.localStorage.setItem('NAVBAR_PAGE_LINK', JSON.stringify(pageLink));
  }, [pageLink]);

  //END END END END END END END END END END END END

  const ClassListPage = () => {
    let page = ['Home', 'Section List', 'Class List'];
    let link = ['/AdminHomepage', '/SectionList', '/ClassList'];
    setPageList(page);
    setPageLink(link);

    window.localStorage.setItem('NAVBAR_PAGE', JSON.stringify(pageList));
    window.localStorage.setItem('NAVBAR_PAGE_LINK', JSON.stringify(pageLink));
    setTimeout(proceed, 1);

    function proceed() {
      navigate('/ClassList');
    }
  };

  var currentSection = '';

  const setSection = () => {
    console.log(currentSection);
    window.localStorage.setItem(
      'CURRENT_SECTION',
      JSON.stringify(currentSection)
    );
  };

  const [section, setSectionData] = useState([]);
  const [studentsTotal, setStudentsTotal] = useState([]);

  const [sectionTotal, setSectionTotal] = useState(0);
  const [sectionNames, setSectionNames] = useState([]);

  const [processData, setProcessData] = useState(false);

  const [imageUrl, setImageUrl] = useState([]);
  const [imageType, setImageType] = useState([]);

  function getSections() {
    var totalSections = 0;
    var ids = [];
    var sectionNames = [];

    axios
      .get('http://localhost:80/Prototype-Vite/my-project/api/sectionList/')
      .then(function (response) {
        console.log(response.data);
        setSectionData(response.data);

        let result = Object.values(response.data);

        let items = [];
        let keys = [];
        for (let i = 0; i < result.length; i++) {
          for (let k in result[i]) keys.push(result[i][k]);
        }

        for (let i = 6; i <= keys.length; i += 7) {
          // GET IMAGE STRING 6th index (including id)
          items.push(keys[i]);
        }

        var imgName = [];
        var imgType = [];

        for (let i = 0; i < items.length; i++) {
          let string = items[i];
          for (let j = 0; j < string.length; j++) {
            if (string[j] == '.') {
              imgName.push(string.substring(0, j));
              imgType.push(string.substring(j + 1));
              break;
            }
          }
        }
        console.log(imgName);
        console.log(imgType);

        setImageUrl(imgName);
        setImageType(imgType);
      });

    axios
      .get('http://localhost:80/Prototype-Vite/my-project/api/sectionTotal/')
      .then(function (response) {
        console.log(response.data);
        totalSections = response.data;
        setSectionTotal(totalSections);
        console.log('totalSections: ' + totalSections);

        for (let i = 0; i < totalSections; i++) {
          ids.push(i);
        }

        // FOR SECTION NAMES
        const promises = ids.map(id =>
          axios.get(
            `http://localhost:80/Prototype-Vite/my-project/api/sectionName/${id}`
          )
        );
        Promise.all([...promises]).then(function (values) {
          sectionNames.push(values);
          sectionNames = sectionNames[0];
          console.log(sectionNames);

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
            console.log(tempArray);

            let data = JSON.stringify(tempArray[0]);
            data = data.replace(/"/g, '');
            data = data.replace(/ /g, '_');

            newArray.push(data);
          }

          console.log(newArray);
          setSectionNames(newArray);
          setProcessData(true);
          //
        });
      });
  }

  function total() {
    console.log('SECTION NAMES:');
    console.log(sectionNames);
    var tally = [];
    // FOR TOTAL
    if (processData) {
      console.log('Imh here');
      const promises2 = sectionNames.map(id =>
        axios.get(
          `http://localhost:80/Prototype-Vite/my-project/api/sectionTotalStudents/${id}`
        )
      );
      Promise.all([...promises2]).then(function (values) {
        tally.push(values);
        tally = tally[0];
        console.log(values);

        let newArray = [];
        for (let i = 0; i < sectionTotal; i++) {
          let tempArray = [];
          let result = Object.keys(tally[i]).map(key => [key, tally[i][key]]);

          for (let j = 0; j < result.length; j++) {
            tempArray.push(result[j][1]);
          }
          console.log(tempArray);

          let data = JSON.stringify(tempArray[0]);
          data = data.replace(/"/g, '');

          newArray.push(data);
        }

        console.log(newArray);

        setStudentsTotal(newArray);
        setProcessData(false);
      });
    }
  }

  useEffect(() => {
    total();
  });

  function sectionCover(index, sectionOrder) {
    var currentIndex = parseInt(index);
    return {
      ...(imageUrl.length > 0 ? (
        <>
          <img
            className={`w-full rounded-xl h-48 object-cover ${
              sectionOrder > 0 ? 'opacity-100' : 'opacity-50'
            }`}
            src={require(`../assets/section_cover/${imageUrl[currentIndex]}.${imageType[currentIndex]}`)}
          />
        </>
      ) : (
        <></>
      )),
    };
  }

  /*
  async function fetchData(index) {
    ==============METHOD 1METHOD 1METHOD 1METHOD 1==============
          axios
            .get(
              `http://localhost:80/Prototype-Vite/my-project/api/sectionName/${i}`
            )
            .then((res1) => {
              console.log(res1.data);
              sectionName = res1.data;
              return axios.get(
                `http://localhost:80/Prototype-Vite/my-project/api/sectionTotalStudents/${sectionName}`
              );
            })
            .then((res2) => {
              console.log(res2.data);
              total.push(res2.data);
              //setStudentsTotal((oldArray) => [...oldArray, res2.data]);
              console.log("TOTAL: " + total);
            });
           THEN THEN THEN FUNCTIONTHEN THEN THEN FUNCTION


            ==============METHOD 2METHOD 2METHOD 2METHOD 2METHOD 2==============
    try {
      const response1 = await axios.get(
        `http://localhost:80/Prototype-Vite/my-project/api/sectionName/${index}`
      );
      const sectionName = response1.data;
      const response2 = await axios.get(
        `http://localhost:80/Prototype-Vite/my-project/api/sectionTotalStudents/${sectionName}`
      );
      setStudentsTotal((oldArray) => [...oldArray, response2.data]);
      console.log(studentsTotal);
    } catch (error) {
      console.log(error);
    }
  }
  
  =======METHOD EXTRAMETHOD EXTRAMETHOD EXTRAMETHOD EXTRAMETHOD EXTRA=======

  function totalStudents(sectionName) {
    console.log("sectname: " + sectionName);
    axios
      .get(
        `http://localhost:80/Prototype-Vite/my-project/api/sectionTotalStudents/${sectionName}`
      )
      .then(function (response) {
        console.log(response.data);
        setStudentsTotal((oldArray) => [...oldArray, response.data]);
      });
  }
  */

  useEffect(() => {
    getSections();
  }, []);

  function sectionCard(sectionName, teacherName, sectionOrder, index) {
    return (
      <div
        className={`max-w-xs  ${
          sectionOrder > 0
            ? 'bg-white border-l-8 border-b-8 border-gray-500/60 border-r-gray-200 border-t-gray-200 border-r-8 border-t-8  px-5 py-6 rounded-xl shadow-md text-indigo-600 hover:text-orange-700 hover:border-r-yellow-400/70 hover:border-t-yellow-400/70 hover:border-b-yellow-500 hover:border-l-yellow-500 hover:shadow-orange-300 transform hover:scale-105 transition duration-500'
            : 'bg-gray-400 border-l-8 border-b-8 border-gray-600/40 border-r-gray-300 border-t-gray-300 border-r-8 border-t-8  px-5 py-6 rounded-xl shadow-md text-gray-600/50'
        }`}
      >
        <h3 className="mb-3 text-xl font-bold  drop-shadow">
          7 - {sectionName}
        </h3>
        <div className="relative rounded-xl shadow-md shadow-black/40">
          {sectionCover(index, sectionOrder)}
        </div>
        <div
          className={`my-3 select-none  ${
            sectionOrder > 0 ? 'text-gray-800' : 'text-gray-600/80'
          }`}
        >
          <div className="flex space-x-3 items-center">
            <span className=" text-2xl "> Teacher: </span>
            <p className="pt-1 text-xl">{teacherName}</p>
          </div>
          <div className="flex space-x-3 items-center">
            <span className="text-2xl"> Students: </span>
            <p className="pt-1 text-xl">
              {sectionOrder > 0 ? sectionOrder + ' Students' : 'No Students'}
            </p>
          </div>
        </div>
        <a>
          <button
            onClick={function () {
              currentSection = sectionName;
              setSection();
              setTimeout(ClassListPage(), 1);
            }}
            className={`mt-3 text-xl w-full  py-2 rounded-xl  shadow-lg ${
              sectionOrder > 0
                ? 'text-white bg-lime-600 hover:bg-lime-700 hover:-translate-y-1 ease-in-out transition duration-300 transform '
                : 'text-gray-700/60 bg-gray-500 '
            }`}
            disabled={sectionOrder <= 0}
          >
            Visit Class
          </button>
        </a>
      </div>
    );
  }

  //GO BACK FUNCTION

  const AdminHomepage = () => {
    let page = ['Home'];
    let link = ['/AdminHomepage'];
    setPageList(page);
    setPageLink(link);

    window.localStorage.setItem('NAVBAR_PAGE', JSON.stringify(pageList));
    window.localStorage.setItem('NAVBAR_PAGE_LINK', JSON.stringify(pageLink));
    setTimeout(proceed, 1);

    function proceed() {
      navigate('/AdminHomepage');
    }
  };

  return (
    <>
      <section className="relative w-10/12 mx-auto my-10  p-6 rounded-6xl border-l-12 border-b-12 border-yellow-700 bg-mainBGBrown border-r-12 border-r-brTwo shadow-2xl shadow-yellow-400">
        <button
          onClick={AdminHomepage}
          className="absolute left-0 top-[47.25%] bottom-1/2 -ml-[4.05rem]"
        >
          <p className="select-none fa fa-chevron-circle-left text-gray-100 text-3xl hover:text-white rounded-l-full  bg-mainBGBrown py-4 pl-2 pr-2 border-l-6 border-b-6 border-l-yellow-700 border-b-yellow-700 	 hover:bg-[#dd9932] hover:border-l-[#bd7e1f] hover:border-b-[#bd7e1f]">
            {' '}
          </p>
        </button>
        <div className="overflow-hidden  py-5 h-full rounded-6xl  bg-gradient-to-t from-gray-200 via-gray-100 to-white shadow-lg border-r-12 border-t-12 border-yellow-700 border-l-12 border-l-brTwo shadow-yellow-700 ">
          <section className="relative mx-auto grid w-full p-10">
            <div className="grid place-items-center md:grid md:grid-cols-3 lg:grid-cols-4 gap-y-10">
              {section.map((data, index) => (
                <>
                  {sectionCard(
                    `${data.SectionName}`,
                    `${data.AdviserTitle}. ${data.AdviserSurname}`,
                    `${studentsTotal[index]}`,
                    index
                  )}
                </>
              ))}
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
