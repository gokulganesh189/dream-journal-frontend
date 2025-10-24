import { useState } from 'react'
import { API } from '../api/client'
import { useNavigate } from 'react-router-dom'
export default function Register() {
const [email, setEmail] = useState('')
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const nav = useNavigate()
const submit = async () => {
await API.post('/auth/register', { email, username, password })
nav('/login')
}
return (
<div className="max-w-sm mx-auto bg-white p-4 rounded shadow">
<h2 className="text-xl font-bold mb-2">Register</h2>
<input className="border rounded w-full px-2 py-1 mb-2"
placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
<input className="border rounded w-full px-2 py-1 mb-2"
placeholder="Username" value={username}
onChange={e=>setUsername(e.target.value)} />
<input className="border rounded w-full px-2 py-1 mb-2"
placeholder="Password" type="password" value={password}
onChange={e=>setPassword(e.target.value)} />
<button className="bg-green-600 text-white w-full py-2 rounded"
onClick={submit}>Create Account</button>
</div>
)
}