import { useState } from 'react'
import { API } from '../api/client'
import { useNavigate } from 'react-router-dom'
import { auth } from '../store/auth'
export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const nav = useNavigate()
    const submit = async () => {
    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)

    const { data } = await API.post('/auth/login', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    })

    auth.set(data.access_token)
    nav('/')
    }
    return (
        <div className="max-w-sm mx-auto bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2">Login</h2>
            <input className="border rounded w-full px-2 py-1 mb-2"
                placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input className="border rounded w-full px-2 py-1 mb-2"
                placeholder="Password" type="password" value={password}
                onChange={e => setPassword(e.target.value)} />
            <button className="bg-blue-600 text-white w-full py-2 rounded"
                onClick={submit}>Login</button>
        </div>
    )
}