import React from 'react'
import HomePage from './pages/HomePage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AllTaskPage from './pages/AllTaskPage';
import PendingTaskPage from './pages/PendingTaskPage';
import CompletedTaskPage from './pages/CompletedTaskPage';
import SignUpPage from './pages/SignUpPage';
import LogInPage from './pages/LogInPage';

const App = () => {
  return (
    <div className='bg-zinc-900 text-white h-screen p-2 relative'>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage/>}>
          <Route index element={<AllTaskPage/>}/>
          <Route path="/pendingTasks" element={<PendingTaskPage/>}/>
          <Route path="/completedTasks" element={<CompletedTaskPage/>}/>
          </Route>
           <Route path='/signup' element={<SignUpPage />}/>
           <Route path='/login' element= {<LogInPage />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App