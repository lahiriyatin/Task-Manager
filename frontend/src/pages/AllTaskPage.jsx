import React, { useState } from 'react';
import Cards from '../components/HomeComponents/cards';
import { IoAddCircleSharp } from 'react-icons/io5';
import InputData from '../components/HomeComponents/InputData';

const AllTaskPage = () => {
  const [showModal, setShowModal] = useState(false);

  const handleAddTaskClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div>
        <div className="w-full flex justify-end px-4 py-2">
          <button onClick={handleAddTaskClick}>
            <IoAddCircleSharp className="text-5xl text-gray-300 hover:text-gray-100 transition-all duration-200" />
          </button>
        </div>
        <Cards home="true" onAddTask={handleAddTaskClick} />
      </div>
      {showModal && <InputData close={handleCloseModal} />}
    </>
  );
};

export default AllTaskPage;
