import React from 'react';
import { MdClose } from 'react-icons/md';

const PenModal = ({ visible, onClose }) => {
  const handleOnClose = e => {
    if (e.target.id === 'mainContainer') onClose();
  };

  if (!visible) return null;

  return (
    <>
      <div
        id="mainContainer"
        onClick={handleOnClose}
        className="fixed top-0 inset-0 bg-black bg-opacity-50 backdrop-blur-[0.5px]  flex justify-center items-center "
      >
        <div className="bg-white  rounded text-lg  ">
          <div className="text-right bg-gray-400 border-b-2 border-gray-300">
            <button
              onClick={onClose}
              className="bg-red-500 p-2 inline-block hover:bg-red-600 hover:text-white"
            >
              <MdClose />
            </button>
          </div>
          <div className="w-[1300px] h-[742px]">
            <div className="bg-gray-800 w-[1300px] h-[742px]"></div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PenModal;
