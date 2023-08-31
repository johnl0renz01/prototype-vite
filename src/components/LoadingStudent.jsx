import React, { Component } from 'react';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

import EquationSolver from './equationSolver';
import MY_API_KEY from './API_KEY';

export default function LoadingStudent() {
  document.body.style.height = '100vh';

  function changeImage() {}

  return (
    <>
      <section className=" z-10 grid place-items-center select-none">
        <div className="min-h-[calc(100vh-12.5rem)] flex items-center justify-center">
          <div className=" text-center hdScreen:scale-100 semihdScreen:scale-[97.5%] laptopScreen:scale-[95%] averageScreen:scale-[92.5%]">
            <div className=" max-h-[20rem] pt-7 w-full  rounded-full overflow-hidden ">
              <img
                src={require('../assets/images/loading-student.gif')}
                alt=""
                className="rounded-full w-[20rem]"
              />
            </div>
            <div className=" inline-flex blink "> 
              <span className="font-league-spartan tracking-wide text-gray-700 text-2xl font-bold">
                LOADING
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
