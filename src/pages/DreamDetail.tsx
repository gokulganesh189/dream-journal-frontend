import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { API } from '../api/client'

export default function DreamDetail() {
  const { id } = useParams()
  const [dream, setDream] = useState<any>(null)
  const [comments, setComments] = useState<any[]>([])
  const [text, setText] = useState('')

  const load = async () => {
    // Fetch all dreams (you can optimize later with a single endpoint)
    const list = await API.get('/dreams/')
    const found = list.data.find((d: any) => d.id === Number(id))
    setDream(found)

    // Fetch comments for this dream
    const { data } = await API.get(`/comments/${id}`)
    setComments(data)
  }

  useEffect(() => { load() }, [id])

  const addComment = async () => {
    if (!text.trim()) return
    await API.post(`/comments/${id}`, { body: text })
    setText('')
    load()
  }

  if (!dream) return <div>Loading dream details...</div>

  return (
    <div className="max-w-3xl mx-auto bg-white p-5 rounded shadow">
      <h2 className="text-2xl font-bold mb-2">{dream.title}</h2>
      <p className="text-gray-700 mb-3 whitespace-pre-wrap">{dream.body}</p>
      {dream.image_path && (
        <img
          className="rounded mb-3"
          src={`http://localhost:8000/${dream.image_path}`}
          alt={dream.title}
        />
      )}
      <div className="border-t pt-4 mt-4">
        <h3 className="font-semibold text-lg mb-2">Comments</h3>
        <div className="space-y-2">
          {comments.map((c: any) => (
            <div key={c.id} className="bg-gray-50 border rounded p-2">
              <div className="text-sm text-gray-500">@{c.author_name}</div>
              <div>{c.body}</div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 mt-3">
          <input
            className="border rounded px-2 py-1 flex-1"
            placeholder="Write a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            onClick={addComment}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  )
}
