import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './style.css'
import App from './App'
import Home from './pages/Home'
import DreamDetail from './pages/DreamDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import CreateDream from './pages/CreateDream'
import Profile from './pages/Profile'
import { auth } from './store/auth'


function PrivateRoute({ children }: { children: JSX.Element }) {
return auth.isAuthed() ? children : <Navigate to="/login" />
}


createRoot(document.getElementById('root')!).render(
<BrowserRouter>
<Routes>
<Route element={<App />}>
<Route path="/" element={<Home />} />
<Route path="/dream/:id" element={<DreamDetail />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/create" element={<PrivateRoute><CreateDream /></PrivateRoute>} />
<Route path="/me" element={<PrivateRoute><Profile /></PrivateRoute>} />
</Route>
</Routes>
</BrowserRouter>
)