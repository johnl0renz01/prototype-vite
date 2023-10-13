import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { VscWarning } from 'react-icons/vsc';

import StorageData from './StorageData';
import SecureStorageData from './SecureStorageData';

const DeleteEquationModal = ({ visible, onClose, onContinue }) => {
  const handleOnClose = e => {
    if (e.target.id === 'mainContainer') onClose();
  };

  if (!visible) return null;

  const [equation, setEquation] = useState('');

  useEffect(() => {
    var equation = StorageData.localStorageJSON('EQUATION_STRING');
    if (equation !== null) setEquation(equation);
  });
  return (
    <>
      <div
        id="mainContainer"
        onClick={handleOnClose}
        className="fixed top-0 inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-[1.5px] flex justify-center items-center "
      >
        <div className="bg-white  rounded text-lg hdScreen:scale-100 semihdScreen:scale-95 laptopScreen:scale-90 averageScreen:scale-90 md:scale-85 sm:scale-80 xs:scale-75 ">
          <div className="grid grid-cols-2 bg-gray-400 ">
            <VscWarning className="text-[1.85rem] ml-1 mt-0.5 text-black/60" />
            <div className="text-right">
              <button
                onClick={onClose}
                className="transition duration-200 p-2 inline-block hover:bg-red-600 hover:text-white"
              >
                <MdClose />
              </button>
            </div>
          </div>
          <div className="w-[29rem] text-center text-gray-800">
            <div className=" text-xl font-semibold py-6">
              <p className="text-xl font-semibold pt-1 ">
                Do you really want to delete this equation?
              </p>
              <span className="text-orange-600 font-bold ">{equation}</span>
            </div>
            <div className="mx-auto text-center border-t-2 border-gray-300 py-3 text-lg">
              <button
                onClick={onClose}
                className="transition duration-200 mx-2 text-white bg-gray-500/90  h-9 w-28 inline-block rounded-lg hover:bg-gray-600 hover:text-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={onContinue}
                className="transition duration-200 mx-2 text-white bg-red-600/90  h-9 w-28 inline-block rounded-lg hover:bg-red-700 hover:text-gray-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteEquationModal;
