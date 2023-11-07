import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'

export default function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
