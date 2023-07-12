import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import * as ReactDOM from 'react-dom';
import $ from 'jquery';

import { BsPersonPlusFill } from 'react-icons/bs';
import { BsFillPersonVcardFill } from 'react-icons/bs';
import { BsGearFill } from 'react-icons/bs';
//import { IconName } from "react-icons/fa";

import EquationSolver from './equationSolver';
import FileUploadForm from './FileUploadForm.jsx';

import { useFormik } from 'formik';
import { editAccountSchema } from '../schemas';
import { editSectionSchema } from '../schemas';
import { addSectionSchema } from '../schemas';

import { MdClose } from 'react-icons/md';
import { VscCheckAll, VscPassFilled } from 'react-icons/vsc';

import { BsXCircleFill } from 'react-icons/bs';
import { BsX } from 'react-icons/bs';
import { BsArrowCounterclockwise } from 'react-icons/bs';
import { BsSlashCircle } from 'react-icons/bs';
import { BsTrash3 } from 'react-icons/bs';

import { GoChecklist } from 'react-icons/go';
import { HiPlusSmall } from 'react-icons/hi2';

import { BsFillPersonFill } from 'react-icons/bs';
import { BsJournalText } from 'react-icons/bs';
import { BsJournalPlus } from 'react-icons/bs';
import { BsPersonGear } from 'react-icons/bs';
import { BsClipboardPlus } from 'react-icons/bs';
import { BsReverseLayoutTextSidebarReverse } from 'react-icons/bs';
import { BsClipboardX } from 'react-icons/bs';

import { VscEyeClosed } from 'react-icons/vsc';
import { VscEye } from 'react-icons/vsc';

import { HiPencilSquare } from 'react-icons/hi2';

import Registration from './Registration';

export default function TeacherPage() {
  return (
    <>
      <section>
        <div className="w-full absolute top-0">
          <div className="bg-gradient-to-t from-[#dbdbdb] via-[#ededed] to-[#ffffff] text-center h-screen">
            asdasds
          </div>
        </div>
      </section>
    </>
  );
}
