import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { IoAddCircleSharp } from 'react-icons/io5';

const Cards = ({ home, onAddTask }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found, please login.');
        return;
      }

      const response = await axios.get('http://localhost:5000/api/tasks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setLoading(false);
    }
  };

  const handleAddTask = async (newTaskData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/tasks',
        newTaskData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update tasks immediately
      setTasks((prevTasks) => [...prevTasks, response.data.data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleUpdateTask = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:5000/api/tasks/${editingTask._id}`,
        editingTask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update tasks immediately
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === editingTask._id ? response.data.data : task
        )
      );

      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove task immediately
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleToggleCompletion = async (taskId, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:5000/api/tasks/${taskId}`,
        { completed: !currentStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update task completion status immediately
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? response.data.data : task
        )
      );
    } catch (error) {
      console.error('Error toggling task status:', error);
    }
  };

  // Filter tasks based on home page context (completed/pending)
  const filteredTasks = tasks.filter((task) => {
    if (home === 'completed') return task.completed;
    if (home === 'pending') return !task.completed;
    return true; // For the default case (e.g., home page)
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {filteredTasks.map((item) => (
        <div
          key={item._id}
          className="border p-4 rounded-lg shadow-md hover:shadow-lg transition flex flex-col justify-between"
        >
          <div>
            <h2 className="text-lg font-bold mb-2">{item.title}</h2>
            <p className="text-gray-600">{item.description}</p>
          </div>
          <div className="flex items-center justify-between mt-4">
            <button
              className={`${
                item.completed ? 'bg-green-500' : 'bg-red-500'
              } px-2 py-1 rounded`}
              onClick={() => handleToggleCompletion(item._id, item.completed)}
            >
              {item.completed ? 'Completed' : 'Pending'}
            </button>
            <div className="flex space-x-2 font-semibold">
              <button
                className="text-blue-500"
                onClick={() => handleEditTask(item)}
              >
                <FaEdit />
              </button>
              <button
                className="text-red-500"
                onClick={() => handleDeleteTask(item._id)}
              >
                <MdDelete />
              </button>
            </div>
          </div>
        </div>
      ))}

      {editingTask && (
        <>
          <div className="fixed top-0 left-0 bg-gray-800 opacity-60 h-screen w-full z-40"></div>
          <div className="fixed top-0 left-0 flex items-center justify-center h-screen w-full z-50">
            <div className="w-2/6 bg-gray-800 p-4 rounded relative">
              <button
                className="absolute top-2 right-2 text-xl text-white"
                onClick={() => setEditingTask(null)}
              >
                &times;
              </button>
              <input
                type="text"
                placeholder="Title"
                className="py-2 px-3 rounded w-full bg-gray-700 text-white mt-8"
                value={editingTask.title}
                onChange={(e) =>
                  setEditingTask((prev) => ({ ...prev, title: e.target.value }))
                }
              />
              <textarea
                placeholder="Task Details"
                className="py-2 px-3 rounded w-full bg-gray-700 my-3 text-white"
                rows="6"
                value={editingTask.description}
                onChange={(e) =>
                  setEditingTask((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              ></textarea>
              <button
                onClick={handleUpdateTask}
                className="px-3 py-2 bg-blue-600 rounded text-white text-lg"
              >
                Update Task
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cards;
