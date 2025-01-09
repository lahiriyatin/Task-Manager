import React from 'react'
import { Link } from 'react-router-dom'

const LogInPage = () => {
  return (
    <div className="h-[98vh] flex items-center justify-center">
      <div className="p-4 w-2/6 rounded bg-gray-800">
        <div className="text-2xl font-semibold">LogIn</div>
        
        <input
          type="email"
          placeholder="email"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          name="xyz@example.com"
          required
        />
        
        <input
          type="password"
          placeholder="password"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          name="password"
        />
        
        <div className='w-full flex items-center justify-between'>
        <button className="bg-blue-400 text-lg text-black px-3 py-2 rounded">
          LogIn
        </button>
        <Link to="/signUp" className='text-gray-500 hover:text-gray-200'>Don't have an account? SignUp Here</Link>
        </div>
      </div>
    </div>
  )
}

export default LogInPage