import React, { useState } from 'react';
import Cards from '../components/HomeComponents/cards';
import { IoAddCircleSharp } from 'react-icons/io5';
import InputData from '../components/HomeComponents/InputData';

const AllTaskPage = () => {
  const [showModal, setShowModal] = useState(false);

  // Show the modal for adding a new task
  const handleAddTaskClick = () => {
    setShowModal(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Handle adding a new task
  const handleTaskAdded = () => {
    setShowModal(false);
    // Optionally, you can implement logic to refresh the task list here.
  };

  return (
    <>
      <div>
        {/* Add Task Button */}
        <div className="w-full flex justify-end px-4 py-2">
          <button onClick={handleAddTaskClick}>
            <IoAddCircleSharp className="text-5xl text-gray-300 hover:text-gray-100 transition-all duration-200" />
          </button>
        </div>

        {/* Render all tasks */}
        <Cards home="all" onAddTask={handleAddTaskClick} />
      </div>

      {/* Input Modal */}
      {showModal && <InputData close={handleCloseModal} onTaskAdded={handleTaskAdded} />}
    </>
  );
};

export default AllTaskPage;
