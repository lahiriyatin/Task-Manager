import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LogInPage = () => {
  const [formData, setFormData] = useState({
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
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      // Assuming the response contains the token
      const token = response.data.data.token;

      // Save token to localStorage
      localStorage.setItem('token', token);

      alert('Login successful!');
      console.log('Login response:', response.data);

      // Redirect to dashboard after successful login
      navigate('/');
    } catch (error) {
      console.error('Error during login:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Login failed!');
    }
  };

  return (
    <div className="h-[98vh] flex items-center justify-center">
      <div className="p-4 w-2/6 rounded bg-gray-800">
        <div className="text-2xl font-semibold">LogIn</div>
        <form onSubmit={handleSubmit}>
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
            required
          />
          
          <div className="w-full flex items-center justify-between">
            <button type="submit" className="bg-blue-400 text-lg text-black px-3 py-2 rounded">
              LogIn
            </button>
            <Link to="/signup" className="text-gray-500 hover:text-gray-200">
              Don't have an account? SignUp Here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogInPage;
