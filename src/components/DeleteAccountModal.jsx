import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { VscWarning } from 'react-icons/vsc';

const DeleteAccountModal = ({ visible, onClose, onContinue }) => {
  const handleOnClose = e => {
    if (e.target.id === 'mainContainer') onClose();
  };

  if (!visible) return null;

  const [currentAccount, setCurrentAccount] = useState('');
  const [accountType, setAccountType] = useState('Teacher');
  const [assignStatus, setAssignStatus] = useState('Unassigned');

  useEffect(() => {
    var accType = JSON.parse(
      window.sessionStorage.getItem('DELETE_ACCOUNT_TYPE')
    );
    console.log(accType);
    if (accType !== null) setAccountType(accType);

    var account = JSON.parse(
      window.sessionStorage.getItem('CURRENT_ACCOUNT_DELETE')
    );
    if (account !== null) setCurrentAccount(account);

    var assign = JSON.parse(
      window.sessionStorage.getItem('TEACHER_ASSIGN_STATUS')
    );
    if (assign !== null) setAssignStatus(assign);
  });

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
              <p className="px-1 pt-1 text-base">[{currentAccount}]</p>
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
          <div className="w-[29rem] text-center text-gray-800">
            <div className="p-4 text-xl font-semibold">
              {accountType == 'Student' ? (
                <>
                  <span className="text-orange-600 font-bold">Warning:</span>{' '}
                  This account have progress records.
                  <p className="text-gray-500 text-lg font-normal">
                    (Choosing to delete will remove all data, including the
                    student's report card.)
                  </p>
                </>
              ) : (
                <>
                  {assignStatus == 'Assigned' ? (
                    <>
                      <span className="text-orange-600 font-bold">
                        Warning:
                      </span>{' '}
                      This account handle sections.
                      <p className="text-gray-500 text-lg font-normal">
                        (Choosing to delete will remove the assigned teacher
                        from each of the section they handle.)
                      </p>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              )}

              {assignStatus == 'Assigned' ? (
                <div className="py-2">
                  <p className="text-lg font-semibold ">
                    Do you still want to delete this account?
                  </p>{' '}
                  <p className="text-gray-500 text-lg font-normal">
                    ({currentAccount})
                  </p>
                </div>
              ) : (
                <>
                  {accountType == 'Student' ? (
                    <div className="py-2">
                      <p className="text-lg font-semibold ">
                        Do you still want to delete this account?
                      </p>{' '}
                      <p className="text-gray-500 text-lg font-normal">
                        ({currentAccount})
                      </p>
                    </div>
                  ) : (
                    <div className="py-2">
                      <p className="text-xl font-semibold ">
                        Do you really want to delete this account?
                      </p>{' '}
                      <p className="text-gray-500 text-lg font-normal">
                        ({currentAccount})
                      </p>
                    </div>
                  )}
                </>
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

export default DeleteAccountModal;