import React from 'react';
import { MdClose } from 'react-icons/md';
import { VscWarning } from 'react-icons/vsc';

const NavbarModal = ({ visible, onClose, onContinue }) => {
  const handleOnClose = e => {
    if (e.target.id === 'mainContainer') onClose();
  };

  if (!visible) return null;

  return (
    <>
      <div
        id="mainContainer"
        onClick={handleOnClose}
        className="fixed top-0 z-50 inset-0 bg-black bg-opacity-50 backdrop-blur-[0.5px] flex justify-center items-center "
      >
        <div className="bg-white  rounded text-lg  hdScreen:scale-100 semihdScreen:scale-95 laptopScreen:scale-90 averageScreen:scale-90 md:scale-85 sm:scale-80 xs:scale-75">
          <div className="grid grid-cols-2 bg-yellow-500">
            <VscWarning className="text-[1.85rem] ml-1 mt-[0.18rem] text-black/60" />
            <div className="text-right">
              <button
                onClick={onClose}
                className="bg-red-500 p-2 inline-block hover:bg-red-600 hover:text-white"
              >
                <MdClose />
              </button>
            </div>
          </div>
          <div className="w-[29rem] text-center text-gray-800">
            <div className="p-4 text-xl font-semibold">
              <span className="text-orange-600 font-bold">Warning:</span> There
              is session on going.
              <p className="text-gray-500 text-lg font-normal">
                (Choosing to continue will end the current session and marks all
                unanswered questions as abandoned.)
              </p>
              <p className="text-xl font-semibold py-4">
                Do you still want to sign out?
              </p>
            </div>
            <div className="mx-auto text-center border-t-2 border-gray-300 py-3">
              <button
                onClick={onClose}
                className="mx-2 text-white bg-red-600/90 h-10 w-28 inline-block rounded-lg hover:bg-red-700 hover:text-gray-100"
              >
                No
              </button>
              <button
                onClick={onContinue}
                className="mx-2 text-white bg-lime-600 h-10 w-28 inline-block rounded-lg hover:bg-lime-700 hover:text-gray-200"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarModal;
