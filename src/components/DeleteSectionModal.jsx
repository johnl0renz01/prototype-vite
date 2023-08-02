import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { VscWarning } from 'react-icons/vsc';

const DeleteSectionModal = ({ visible, onClose, onContinue }) => {
  const handleOnClose = e => {
    if (e.target.id === 'mainContainer') onClose();
  };

  if (!visible) return null;

  const [deleteType, setDeleteType] = useState('');

  const [currentSection, setCurrentSection] = useState('');

  const [sectionStatus, setSectionStatus] = useState('Empty');

  useEffect(() => {
    var section = JSON.parse(
      window.sessionStorage.getItem('CURRENT_SECTION_DELETE')
    );
    if (section !== null) setCurrentSection(section);

    var status = JSON.parse(
      window.sessionStorage.getItem('DELETE_SECTION_STATUS')
    );
    if (status !== null) setSectionStatus(status);
  });

  const typeSection = () => {
    setDeleteType('Section');
  };

  const typeSectionStudents = () => {
    setDeleteType('SectionStudents');
  };

  return (
    <>
      <div
        id="mainContainer"
        onClick={handleOnClose}
        className="fixed top-0 inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-[0.5px] flex justify-center items-center "
      >
        <div className="bg-white  rounded text-lg  ">
          <div className="flex bg-yellow-500 ">
            <div className="grow flex">
              <VscWarning className="text-[1.85rem] ml-1 mt-[0.18rem] text-black/60" />
              <p className="px-1 pt-1 text-base">[{currentSection}]</p>
            </div>
            <div className="text-right">
              <button
                onClick={onClose}
                className="bg-red-500 p-2 inline-block hover:bg-red-600 hover:text-white"
              >
                <MdClose />
              </button>
            </div>
          </div>
          <div className="w-[32rem] text-center text-gray-800">
            <div className="p-4 pb-6 text-xl font-semibold">
              {sectionStatus == 'Active' ? (
                <>
                  <span className="text-orange-600 font-bold">Warning:</span>{' '}
                  This section have students enrolled.
                  <div className="flex py-2">
                    <p className="pr-2  text-left text-red-500  font-bold text-lg">
                      Deletion type:
                    </p>
                    <button
                      onClick={typeSection}
                      className={`text-base lg:px-4 xs:px-1 py-1 rounded-lg  border-2   transition duration-200 ${
                        deleteType == 'Section'
                          ? 'bg-gray-500/80 text-white font-semibold border-gray-500/80'
                          : 'bg-gray-100 hover:bg-gray-500/80 text-gray-500  border-gray-300 hover:border-gray-500/80  hover:text-white'
                      }`}
                    >
                      Section
                    </button>
                    <button
                      onClick={typeSectionStudents}
                      className={`text-base ml-4 lg:px-4 xs:px-1 rounded-lg border-2  transition duration-200 ${
                        deleteType == 'SectionStudents'
                          ? 'bg-gray-500/80 text-white font-semibold border-gray-500/80'
                          : 'bg-gray-100 hover:bg-gray-500/80 text-gray-500  border-gray-300 hover:border-gray-500/80  hover:text-white'
                      }`}
                    >
                      Section & Students' Accounts
                    </button>
                  </div>
                  {deleteType == 'Section' ? (
                    <p className="text-gray-500 text-lg font-normal">
                      (Choosing to delete this section only. The students won't
                      be able to use system until they're enrolled again.)
                    </p>
                  ) : (
                    <p className="text-gray-500 text-lg font-normal">
                      (Choosing to delete both section and students. All
                      students' accounts enrolled in this section will be
                      deleted.)
                    </p>
                  )}
                </>
              ) : (
                <></>
              )}
              {sectionStatus == 'Active' ? (
                <></>
              ) : (
                <div className="pt-2">
                  <p className="text-xl font-semibold ">
                    Do you really want to delete this section?
                  </p>{' '}
                  <p className="text-gray-500 text-xl font-normal">
                    ({currentSection})
                  </p>
                </div>
              )}
            </div>
            <div className="mx-auto text-center  border-t-2 border-gray-300 py-3">
              <button
                onClick={onClose}
                className="mx-2 text-white tracking-wide bg-gray-500/90 h-9 w-28 inline-block rounded-lg hover:bg-gray-600 hover:text-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={onContinue}
                className="mx-2 text-white tracking-wide bg-red-600/90 h-9 w-28 inline-block rounded-lg hover:bg-red-700 hover:text-gray-200"
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

export default DeleteSectionModal;
