import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import './index.css'
import History from './pages/History'
import Saved from './pages/Saved'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/history" element={<History/>} />
      <Route path="/saved" element={<Saved/>} />
    </Routes>
  )
}