import React, { Component } from 'react';

import { MdClose } from 'react-icons/md';
import { VscInfo } from 'react-icons/vsc';

const ContactAdminMessageModal = ({ visible, onClose, onContinue }) => {
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
        <div className="bg-white  rounded text-lg hdScreen:scale-100 semihdScreen:scale-95 laptopScreen:scale-90 averageScreen:scale-90 md:scale-85 sm:scale-80 xs:scale-75 ">
          <div className="grid grid-cols-2 bg-gray-400 ">
            <VscInfo className="text-[1.85rem] ml-1 flex items-center text-black/60" />
            <div className="text-right">
              <button
                onClick={onClose}
                className="p-2 inline-block transition duration-200 hover:bg-red-600 hover:text-white"
              >
                <MdClose />
              </button>
            </div>
          </div>
          <div className="">
            <div className="p-4 ">The request has been sent successfully.</div>
            <div className="mx-auto text-center border-t-2 border-gray-300 py-3 ">
              <button
                onClick={onClose}
                className="bg-gray-400/60 transition duration-200 h-8 w-20 tracking-wide inline-block rounded-lg hover:bg-gray-400 hover:text-gray-100"
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

export default ContactAdminMessageModal;
