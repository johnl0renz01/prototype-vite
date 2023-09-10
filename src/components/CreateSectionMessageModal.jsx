import React from 'react';
import { MdClose } from 'react-icons/md';
import { VscInfo } from 'react-icons/vsc';

const CreateSectionMessageModal = ({ visible, onClose }) => {
  const handleOnClose = e => {
    if (e.target.id === 'mainContainer') onClose();
    //window.location.reload(false);
  };

  if (!visible) return null;

  return (
    <>
      <div
        id="mainContainer"
        onClick={handleOnClose}
        className="fixed top-0 inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-[1.5px] flex justify-center items-center "
      >
        <div className="bg-white  rounded text-lg hdScreen:w-1/3 semihdScreen:w-[40%] laptopScreen:w-[45%] averageScreen:w-[45%] md:w-[50%] sm:w-[65%] xs:w-[70%] hdScreen:scale-100 semihdScreen:scale-90 laptopScreen:scale-85 averageScreen:scale-80 md:scale-80 sm:scale-80 xs:scale-75  lg:text-lg md:text-base sm:text-sm xs:text-xs shadow-md">
          <div className="grid grid-cols-2 bg-gray-400 ">
            <VscInfo className="text-[1.85rem] ml-1 mt-0.5 text-black/60" />
            <div className="text-right">
              <button
                onClick={onClose}
                className="bg-red-500 p-2 inline-block hover:bg-red-600 hover:text-white"
              >
                <MdClose />
              </button>
            </div>
          </div>
          <div className="">
            <div className="p-4 ">
              The section has been created successfully.
            </div>
            <div className="mx-auto text-center border-t-2 border-gray-300 py-3 ">
              <button
                onClick={onClose}
                className="bg-gray-400/60 h-8 w-20 tracking-wide inline-block rounded-lg hover:bg-gray-400 hover:text-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateSectionMessageModal;
