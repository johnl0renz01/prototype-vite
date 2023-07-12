import React from 'react';
import { MdClose } from 'react-icons/md';

const VideoModal = ({ visible, onClose }) => {
  const handleOnClose = e => {
    if (e.target.id === 'mainContainer') onClose();
  };

  if (!visible) return null;
  return (
    <>
      <div
        id="mainContainer"
        onClick={handleOnClose}
        className="fixed top-0 inset-0 bg-black bg-opacity-30  flex justify-center items-center "
      >
        {/* DESIGN NALANG KULANG NG LAHAT MODAL HAHAHA DITO KA MAG START */}
        <div className="bg-white p-2 rounded flex-col">
          <iframe
            width="1280"
            height="726"
            src="https://www.youtube.com/embed/8gnpIIy-g3c"
            title="Solving linear equations — Harder example | Math | SAT | Khan Academy"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
        <div className=" ">
          <button onClick={onClose} className="bg-red-500 p-2 inline-block">
            <MdClose />
          </button>
        </div>
      </div>
    </>
  );
};

export default VideoModal;
