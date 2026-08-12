import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import './index.css'
import History from './pages/History'
import Saved from './pages/Saved'
import Documentation from './pages/Documentation'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Register from './pages/Register'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/history" element={<History/>} />
      <Route path="/saved" element={<Saved/>} />
      <Route path="/documentation" element={<Documentation/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/profile' element={<Profile/>} />
    </Routes>
  )
}