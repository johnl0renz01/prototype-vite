import React from "react";
import { MdClose } from "react-icons/md";

const VideoModal = ({ visible, onClose }) => {
  const handleOnClose = (e) => {
    if (e.target.id === "mainContainer") onClose();
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
          <div className="">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoModal;
