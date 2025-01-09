import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { IoAddCircleSharp } from 'react-icons/io5';

const Cards = ({ home, onAddTask }) => {
  const data = [
    {
      title: 'Sample Title 1',
      desc: 'Description for the first card. Add more details here.',
      status: 'Pending',
    },
    {
      title: 'Sample Title 2',
      desc: 'Description for the second card. Add more details here.',
      status: 'Completed',
    },
    {
      title: 'Sample Title 3',
      desc: 'Description for the third card. Add more details here.',
      status: 'Pending',
    },
    {
      title: 'Sample Title 4',
      desc: 'Description for the fourth card. Add more details here.',
      status: 'Pending',
    },
    {
      title: 'Sample Title 5',
      desc: 'Description for the fifth card. Add more details here.',
      status: 'Pending',
    },
    {
      title: 'Sample Title 6',
      desc: 'Description for the sixth card. Add more details here.',
      status: 'Pending',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {data.map((item, i) => (
        <div
          key={i}
          className="border p-4 rounded-lg shadow-md hover:shadow-lg transition flex flex-col justify-between"
        >
          <div>
            <h2 className="text-lg font-bold mb-2">{item.title}</h2>
            <p className="text-gray-600">{item.desc}</p>
          </div>
          <div className="flex items-center justify-between mt-4">
            <button
              className={`${
                item.status === 'Pending' ? 'bg-red-500' : 'bg-green-500'
              } px-2 py-1 rounded`}
            >
              {item.status}
            </button>
            <div className="flex space-x-2 font-semibold">
              <button className="text-blue-500">
                <FaEdit />
              </button>
              <button className="text-red-500">
                <MdDelete />
              </button>
            </div>
          </div>
        </div>
      ))}

      {home === 'true' && (
        <div
          onClick={onAddTask}  // Trigger the function passed from parent
          className="border p-4 rounded-lg shadow-md hover:shadow-lg flex flex-col justify-center items-center hover:scale-105 cursor-pointer transition-all duration-300"
        >
          <IoAddCircleSharp className="text-5xl" />
          <h1 className="text-2xl mt-2">Add Task</h1>
        </div>
      )}
    </div>
  );
};

export default Cards;
