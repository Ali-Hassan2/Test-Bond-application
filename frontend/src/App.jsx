import { useState, React } from 'react'
import Userinput from '../Pages/Userinput'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Quiz from '../Pages/Quiz'


function App() {
  return (

    <>
    <div class="relative h-full w-full bg-slate-950">
  <div class="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(252,211,77,0.2),rgba(255,255,255,0))]"></div>
  <div class="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(252,211,77,0.2),rgba(255,255,255,0))]"></div>
</div>

    <Router>
      <Routes>
        <Route path="/" element={<Userinput />} />
        <Route
          path='quiz/:uniquelink'
          element={<Quiz />}
        />
      </Routes>
    </Router>
    </>
  )
}

export default App
