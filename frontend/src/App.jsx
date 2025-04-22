import { useState, React } from 'react'
import Userinput from '../Pages/Userinput'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Quiz from '../Components/Quiz'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Userinput />} />
        <Route
          path='quiz/:uniquelink'
          element={<Quiz />}
        />
      </Routes>
    </Router>
  )
}

export default App
