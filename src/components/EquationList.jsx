import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

import DeleteEquationModal from './DeleteEquationModal';
import DeleteEquationMessageModal from './DeleteEquationMessageModal';

import { VscEye } from 'react-icons/vsc';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import EquationListSkeleton from './EquationListSkeleton';

export default function EquationList() {
  const navigate = useNavigate();

  useEffect(() => {
    setTabIndex();

    window.addEventListener('focus', setTabIndex);
    function setTabIndex() {
      window.localStorage.setItem('CURRENT_TAB_INDEX', 2);
    }
  }, []);

  useEffect(() => {
    var logged = JSON.parse(window.localStorage.getItem('LOGGED'));
    if (logged == 'FALSE') {
      navigate('/LoginPage');
    } else {
      var closed = JSON.parse(window.localStorage.getItem('IS_CLOSED'));
      if (closed) {
        var unique = JSON.parse(window.localStorage.getItem('UNIQUE_ID'));
        axios
          .post(
            `http://localhost:80/Prototype-Vite/my-project/api/logout/${unique}`
          )
          .then(function (response) {
            window.localStorage.setItem('LOGGED', JSON.stringify('FALSE'));
            navigate('/LoginPage');
          });
      }
    }

    var account = JSON.parse(window.localStorage.getItem('ACCOUNT_TYPE'));
    if (account == 'Admin') {
      navigate('/HomePageAdmin');
    } else if (account == 'Student') {
      navigate('/Homepage');
    }
  });

  const [equationList, setEquationList] = useState([]);
  const [equationType, setEquationType] = useState([
    'Easy',
    'Average',
    'Difficult',
  ]);

  /*
  <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="characters">
                {(provided) => (
                  <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                    {characters.map(({id, name, thumb}, index) => {
  */
  function getEquations() {
    var DATA = [];
    var easyEquations = [];
    var averageEquations = [];
    var difficultEquations = [];

    axios
      .get(`http://localhost:80/Prototype-Vite/my-project/api/equationsEasy/`)
      .then(function (response) {
        for (let i = 0; i < response.data.length; i++) {
          //console.log(response.data[i]);
          easyEquations.push(response.data[i]);
        }

        axios
          .get(
            `http://localhost:80/Prototype-Vite/my-project/api/equationsAverage/`
          )
          .then(function (response) {
            for (let i = 0; i < response.data.length; i++) {
              //console.log(response.data[i]);
              averageEquations.push(response.data[i]);
            }
            axios
              .get(
                `http://localhost:80/Prototype-Vite/my-project/api/equationsDifficult/`
              )
              .then(function (response) {
                for (let i = 0; i < response.data.length; i++) {
                  //console.log(response.data[i]);
                  difficultEquations.push(response.data[i]);
                }

                DATA = [
                  {
                    id: 'Easy',
                    name: 'EASY',
                    items: easyEquations,
                    tint: 1,
                  },
                  {
                    id: 'Average',
                    name: 'AVERAGE',
                    items: averageEquations,
                    tint: 2,
                  },
                  {
                    id: 'Difficult',
                    name: 'DIFFICULT',
                    items: difficultEquations,
                    tint: 3,
                  },
                ];

                setStores(DATA);
              });
          });
      });
  }

  useEffect(() => {
    getEquations();
  }, []);

  function removeEquation(equation) {
    let equationString = equation;
    equationString = equationString.replace(/ /g, '_');
    axios
      .post(
        `http://localhost:80/Prototype-Vite/my-project/api/removeEquation/${equationString}`
      )
      .then(function (response) {
        //window.location.reload(false);
      });
  }

  const [navbarWidth, setNavbarWidth] = useState(0);
  const [logoHeight, setLogoHeight] = useState(0);

  useEffect(() => {
    document.body.style.backgroundImage =
      'linear-gradient(to top, #e2e2e2, #f1f1f1 , #ffffff)';

    window.addEventListener('resize', setWidth);
    window.addEventListener('focus', setWidth);
    window.addEventListener('click', setWidthDelay);
    setWidth();
  });

  function setWidthDelay() {
    setTimeout(function () {
      var width = window.sessionStorage.getItem('NAVBAR_TEACHER_WIDTH');
      setNavbarWidth(width);

      // Logo height
      var height = window.sessionStorage.getItem('NAVBAR_TEACHER_LOGO');
      setLogoHeight(height);
    }, 1);
  }

  function setWidth() {
    var width = window.sessionStorage.getItem('NAVBAR_TEACHER_WIDTH');
    setNavbarWidth(width);

    // Logo height
    var height = window.sessionStorage.getItem('NAVBAR_TEACHER_LOGO');
    setLogoHeight(height);
  }

  //////////////////////////////////////
  const [stores, setStores] = useState([]);

  const handleDragAndDrop = results => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === 'group') {
      const reorderedStores = [...stores];

      const storeSourceIndex = source.index;
      const storeDestinatonIndex = destination.index;

      const [removedStore] = reorderedStores.splice(storeSourceIndex, 1);
      reorderedStores.splice(storeDestinatonIndex, 0, removedStore);

      return setStores(reorderedStores);
    }
    const itemSourceIndex = source.index;
    const itemDestinationIndex = destination.index;

    const storeSourceIndex = stores.findIndex(
      store => store.id === source.droppableId
    );

    //PHP CHANGE DIFFICULTY

    var tempObj = { ...stores[storeSourceIndex].items };

    var i = 0;
    var index = source.index;
    var newObj = [];
    for (var key in tempObj) {
      newObj = tempObj[key];
      if (i == index) {
        break;
      }
      i++;
    }

    var equationType = destination.droppableId;
    var stringRequest = newObj.EquationString;
    stringRequest = stringRequest.replace(/ /g, '_');

    axios
      .post(
        `http://localhost:80/Prototype-Vite/my-project/api/editEquationType/${equationType}@${stringRequest}`
      )
      .then(function (response) {
        console.log(response.data);
        //window.location.reload(false);
      });

    //END OF PHP RELATED CODE

    const storeDestinationIndex = stores.findIndex(
      store => store.id === destination.droppableId
    );

    const newSourceItems = [...stores[storeSourceIndex].items];
    const newDestinationItems =
      source.droppableId !== destination.droppableId
        ? [...stores[storeDestinationIndex].items]
        : newSourceItems;

    const [deletedItem] = newSourceItems.splice(itemSourceIndex, 1);
    newDestinationItems.splice(itemDestinationIndex, 0, deletedItem);

    const newStores = [...stores];

    newStores[storeSourceIndex] = {
      ...stores[storeSourceIndex],
      items: newSourceItems,
    };
    newStores[storeDestinationIndex] = {
      ...stores[storeDestinationIndex],
      items: newDestinationItems,
    };

    setStores(newStores);
  };

  // MODAL DELETE
  const [showModal, setShowModal] = useState(false);
  const handleOnCloseModal = () => setShowModal(false);

  const [choiceModal, setChoiceModal] = useState(false);

  const handleOnContinueModal = e => {
    let equationString = JSON.parse(
      window.localStorage.getItem('EQUATION_STRING')
    );
    removeEquation(equationString);
    setShowModal(false);
    setDeleteMessageModal(true);
  };

  const deleteEquation = e => {
    setShowModal(true);
    let equationString = e.target.id;
    window.localStorage.setItem(
      'EQUATION_STRING',
      JSON.stringify(equationString)
    );
  };

  //MODAL MESSAGE
  const [showDeleteMessageModal, setDeleteMessageModal] = useState(false);
  const handleOnCloseMessageModal = () => {
    setDeleteMessageModal(false);
    getEquations();
  };

  //FOR SKELETON
  const [skeletonState, setSkeletonState] = useState(true);

  useEffect(() => {
    const onPageLoad = () => {
      setTimeout(hideNavbar, 1000);

      function hideNavbar() {
        setSkeletonState(false);
      }
    };
    if (document.readyState === 'complete') {
      onPageLoad();
    } else {
      window.addEventListener('load', onPageLoad, false);
      return () => window.removeEventListener('load', onPageLoad);
    }
  }, []);

  return (
    <>
      <div className={`${!skeletonState ? 'hidden' : ''}`}>
        <EquationListSkeleton />
      </div>
      <div
        className={`bg-gradient-to-t from-[#e2e2e2] via-[#f1f1f1] to-[#ffffff] h-screen 
        ${
          navbarWidth == 143
            ? 'w-[calc(100%-143px)] ml-[143px]'
            : navbarWidth == 95
            ? 'w-[calc(100%-95px)] ml-[95px]'
            : navbarWidth == 73
            ? 'w-[calc(100%-73px)] ml-[73px]'
            : navbarWidth == 39
            ? 'w-[calc(100%-39px)] ml-[39px]'
            : ''
        } ${skeletonState ? 'hidden' : ''}`}
      >
        <section id="container" className="relative mx-auto p-8 w-full">
          <div
            className={`md:-mt-0 xs:-mt-1 border-b-2 text-gray-600 lg:text-4xl font-bold
        ${
          logoHeight == 94.5
            ? 'max-h-[94.5px]'
            : logoHeight == 67.5
            ? 'max-h-[67.5px]'
            : ''
        }`}
          >
            Equation List
          </div>
          <div className="text-gray-700 mt-1.5 lg:text-lg sm:text-base xs:text-xs font-semibold tracking-wide pl-2 ">
            The following are current custom equations created. Drag the
            equation to change its difficulty.
          </div>

          <div>
            <DragDropContext onDragEnd={handleDragAndDrop}>
              <Droppable droppableId="ROOT" type="group">
                {provided => (
                  <div
                    className="hdScreen:min-h-[calc(100vh-30vh)] hdScreen:max-h-[calc(100vh-30vh)] 
                  semihdScreen:min-h-[calc(100vh-30vh)] semihdScreen:max-h-[calc(100vh-30vh)]
                  laptopScreen:min-h-[calc(100vh-40vh)] laptopScreen:max-h-[calc(100vh-40vh)]
                  averageScreen:min-h-[calc(100vh-45vh)] averageScreen:max-h-[calc(100vh-45vh)]
                  bg-white mt-3.5 grid grid-cols-3 text-center lg:text-xl xs:text-base w-full border-t-1  border-gray-400 rounded-xl"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {stores.map((store, index) => (
                      <Draggable
                        draggableId={store.id}
                        index={index}
                        key={store.id}
                        isDragDisabled={true}
                      >
                        {provided => (
                          <div
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                          >
                            <ListEquations {...store} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </section>
      </div>
      <DeleteEquationModal
        onClose={handleOnCloseModal}
        visible={showModal}
        onContinue={handleOnContinueModal}
      />
      <DeleteEquationMessageModal
        onClose={handleOnCloseMessageModal}
        visible={showDeleteMessageModal}
      />
    </>
  );

  function ListEquations({ name, items, id }) {
    return (
      <Droppable droppableId={id}>
        {provided => (
          <div
            id={name}
            className={`my-1 border-gray-400/80 border-t-2 border-t-gray-400 border-b-2 border-b-gray-400  h-full overflow-y-scroll style-3 font-semibold shadow-md ${
              name == 'EASY' ? 'border-l-[5px]' : ''
            }`}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <div className="bg-gray-200 py-1 border-b-[1px] border-gray-400 uppercase tracking-wide text-xl font-bold text-gray-700">
              {name}
            </div>
            <div className="items-container">
              {items.map((item, index) => (
                <Draggable
                  draggableId={item.EquationString}
                  index={index}
                  key={item.EquationString}
                >
                  {provided => (
                    <div
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                    >
                      <div className="font-normal bg-white pt-0.5 lg:text-lg xs:text-sm h-full    border-[1px] border-l-0 border-r-0  border-gray-400 shadow-md">
                        <div className="border-b-2 flex justify-center relative hover:bg-gray-200">
                          <p className="mx-4">{item.EquationString}</p>
                          <input
                            type="submit"
                            id={item.EquationString}
                            onClick={deleteEquation}
                            className="cursor-pointer absolute right-0 text-black/60  hover:text-red-500 rounded-full w-6 h-6"
                            title="Remove Equation"
                            value="x"
                          ></input>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    );
  }
}
