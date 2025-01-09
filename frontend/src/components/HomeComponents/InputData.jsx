import React from 'react';
import { RxCross2 } from 'react-icons/rx';

const InputData = ({ close }) => {
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
          />
          <textarea
            name="desc"
            cols="30"
            rows="10"
            placeholder="Task Details"
            className="py-2 px-3 rounded w-full bg-gray-700 my-3 text-white"
          ></textarea>
          <button className="px-3 py-2 bg-blue-600 rounded text-white text-lg">
            Add Task
          </button>
        </div>
      </div>
    </>
  );
};

export default InputData;
