import { useState } from 'react'
import { API } from '../api/client'
import { useNavigate } from 'react-router-dom'
export default function CreateDream() {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [tags, setTags] = useState('')
    const [file, setFile] = useState<File | null>(null)
    const nav = useNavigate()
    const submit = async () => {
        const form = new FormData()
        form.append('title', title)
        form.append('body', body)
        form.append('tags', tags)
        if (file) form.append('image', file)
        await API.post('/dreams/', form, {
            headers: {
                'Content-Type': 'multipart/form- data' } })
                nav('/')
        }
return (
            <div className="max-w-xl mx-auto bg-white p-4 rounded shadow">
                <h2 className="text-xl font-bold mb-2">Share a Dream</h2>
                <input className="border rounded w-full px-2 py-1 mb-2"
                    placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
                <textarea className="border rounded w-full px-2 py-1 mb-2 h-40"
                    placeholder="Describe your dream..." value={body}
                    onChange={e => setBody(e.target.value)} />
                <input className="border rounded w-full px-2 py-1 mb-2"
                    placeholder="Tags (comma separated)" value={tags}
                    onChange={e => setTags(e.target.value)} />
                <input type="file" onChange={e => setFile(e.target.files?.[0] || null)}
                    className="mb-2" />
                <button className="bg-indigo-600 text-white px-4 py-2 rounded"
                    onClick={submit}>Publish</button>
            </div>
        )
    }