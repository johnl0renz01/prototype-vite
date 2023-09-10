import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { VscInfo } from 'react-icons/vsc';

const ForgotPasswordMessageModal = ({ visible, onClose }) => {
  const handleOnClose = e => {
    if (e.target.id === 'mainContainer') onClose();
    //window.location.reload(false);
  };

  if (!visible) return null;

  const [email, setEmail] = useState('');

  useEffect(() => {
    var emailReset = JSON.parse(window.sessionStorage.getItem('RESET_EMAIL'));
    if (emailReset !== null) setEmail(emailReset);
  });

  return (
    <>
      <div
        id="mainContainer"
        onClick={handleOnClose}
        className="fixed top-0 inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-[1.5px] flex justify-center items-center "
      >
        <div className="bg-white w-1/4 hdScreen:scale-100 semihdScreen:scale-95 laptopScreen:scale-90 averageScreen:scale-90  rounded text-lg  ">
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
            <div className="pt-5 pb-7 px-10 text-justify text-gray-700">
              <span className="font-semibold text-black">[{email}]</span>
              <br></br>
              The reset password request has been sent.
              <br></br>
              <br></br>
              Please be patient while our administrator check and processes your
              request. Thank you for your understanding!
            </div>
            <div className="mx-auto text-center border-t-2 border-gray-300 py-3 ">
              <button
                onClick={onClose}
                className="bg-gray-400/60 h-8 w-20 tracking-wide inline-block rounded-lg hover:bg-gray-400 hover:text-gray-100"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordMessageModal;
