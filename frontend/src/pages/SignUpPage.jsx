import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name: formData.username,
        email: formData.email,
        password: formData.password,
      });

      alert('Signup successful!');
      console.log('Signup response:', response.data);
      navigate('/');

    } catch (error) {
      console.error('Error during signup:', error.response?.data || error.message);
      alert(error.response?.data?.message || "Signup failed!");
    }
  };

  return (
    <div className="h-[98vh] flex items-center justify-center">
      <div className="p-4 w-2/6 rounded bg-gray-800">
        <div className="text-2xl font-semibold">Signup</div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="username"
            className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />

          <input
            type="email"
            placeholder="email"
            className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            placeholder="password"
            className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          <div className="w-full flex items-center justify-between">
            <button type="submit" className="bg-blue-400 text-lg text-black px-3 py-2 rounded">
              SignUp
            </button>
            <Link to="/login" className="text-gray-500 hover:text-gray-200">
              Already have an account? LogIn Here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
