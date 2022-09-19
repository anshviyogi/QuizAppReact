import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Dashboard from './component/AdminPage/Dashboard'
import AddQuestionPage from './component/AdminPage/AddQuestionPage'
import ViewAllQuestion from './component/AdminPage/ViewAllQuestion'
import Login from './component/Login'
import PlayQuiz from './component/StudentPage/PlayQuiz'
import axios from 'axios'

function App() {
  axios.defaults.baseURL = 'https://todo-react-fe9da.web.app/'
  return (
    <>
        <Router>
      
      <Routes>
        {/* Login/Home Route */}
        <Route path='/' element={<Login/>}/>
        <Route path='/play' element={<PlayQuiz/>}/>

        {/* Private Admin Routes */}
        <Route path='/admin' element={<><Dashboard/> <h1 style={{textAlign:"center"}}>Welcome to the Admin Dashboard</h1></>}/>
        <Route path='/admin/addQuestion' element={<><Dashboard/><AddQuestionPage/></>}/>
        <Route path='/admin/viewAllQuestions' element={<><Dashboard/><ViewAllQuestion/></>}/>

      </Routes>
    </Router>
    
    </>
  )
}

export default App