import './App.css'
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './Layout'
import QuizPage from './pages/QuizPage'
import ResultsPage from './pages/ResultsPage'

function App() {

  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="quiz" element={<QuizPage/>} />
              <Route path="results" element={<ResultsPage/>} />
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
