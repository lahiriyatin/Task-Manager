import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import axios from 'axios';

const InputData = ({ close }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
  });

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token'); // Get token from localStorage
      if (!token) {
        console.log('No token found, please login.');
        return;
      }

      const response = await axios.post(
        'http://localhost:5000/api/tasks',
        {
          title: taskData.title,
          description: taskData.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle success response
      console.log('Task created:', response.data);
      alert('Task created successfully!');
      close(); // Close the modal after creating the task

    } catch (error) {
      // Handle error
      console.error('Error creating task:', error);
      alert('Failed to create task!');
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 bg-gray-800 opacity-60 h-screen w-full z-40"></div>

      <div className="fixed top-0 left-0 flex items-center justify-center h-screen w-full z-50">
        <div className="w-2/6 bg-gray-800 p-4 rounded relative">
          {/* Close Button */}
          <button
            className="absolute top-2 right-2 text-xl text-white"
            onClick={close} // Trigger the close function passed from parent
          >
            <RxCross2 />
          </button>

          {/* Input and Textarea */}
          <input
            type="text"
            placeholder="Title"
            name="title"
            className="py-2 px-3 rounded w-full bg-gray-700 text-white mt-8"
            value={taskData.title}
            onChange={handleChange}
          />
          <textarea
            name="description"
            cols="30"
            rows="10"
            placeholder="Task Details"
            className="py-2 px-3 rounded w-full bg-gray-700 my-3 text-white"
            value={taskData.description}
            onChange={handleChange}
          ></textarea>

          <button
            onClick={handleSubmit}
            className="px-3 py-2 bg-blue-600 rounded text-white text-lg"
          >
            Add Task
          </button>
        </div>
      </div>
    </>
  );
};

export default InputData;
