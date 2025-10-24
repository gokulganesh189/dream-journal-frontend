import { Outlet, Link, useNavigate } from 'react-router-dom'
import { auth } from './store/auth'


export default function App() {
const nav = useNavigate()
return (
<div className="max-w-4xl mx-auto p-4">
<nav className="flex items-center justify-between py-3 border-b">
<Link to="/" className="font-bold text-xl">🌙 Dream Journal</Link>
<div className="space-x-3">
<Link to="/">Home</Link>
{auth.isAuthed() && <Link to="/create">New Dream</Link>}
{auth.isAuthed() && <Link to="/me">Profile</Link>}
{!auth.isAuthed() && <Link to="/login">Login</Link>}
{!auth.isAuthed() && <Link to="/register">Register</Link>}
{auth.isAuthed() && <button className="text-red-600" onClick={() => {auth.clear(); nav('/')}}>Logout</button>}
</div>
</nav>
<Outlet /> {/* where pages will render */}
</div>
)
}