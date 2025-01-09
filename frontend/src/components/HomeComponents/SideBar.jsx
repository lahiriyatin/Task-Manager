import React from 'react';
import { CgNotes } from "react-icons/cg";
import { FaCheck } from "react-icons/fa6";
import { TbNotesOff } from "react-icons/tb";
import { Link } from "react-router-dom";

const SideBar = () => {

  const data = [
    {
      title: "All Tasks",
      icons: <CgNotes />,
      link: "/",
    },
    {
      title: "Completed Tasks",
      icons: <FaCheck />,
      link: "/completedTasks",
    },
    {
      title: "Pending Tasks",
      icons: <TbNotesOff />,
      link: "/pendingTasks",
    },
  ];

  return (
    <>
      <div>
        <h2 className='text-xl font-semibold'>TaskManagerUser</h2>
        <h4 className='mb-1 text-gray-400'>user@email</h4>
        <hr />
      </div>
      <div>
        {data.map((items, i) => 
        <Link 
        to={items.link}
        key={i}
        className='my-2 flex items-center hover:bg-slate-950 p-2 rounded transition-all duration-300'>
          {items.icons}
          &nbsp;&nbsp;
          {items.title}
        </Link>
        )}
      </div>
      <div>
        <button className='bg-gray-800 w-full p-2 rounded-xl hover:scale-105 transition-all duration-200'>Log Out</button>
      </div>
    </>
  )
}

export default SideBar