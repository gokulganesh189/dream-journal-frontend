import { useEffect, useState } from 'react'
import { API } from '../api/client'
export default function Profile() {
const [me, setMe] = useState<any>(null)
const [myDreams, setMyDreams] = useState<any[]>([])
useEffect(() => {
(async () => {
const { data } = await API.get('/auth/me')
setMe(data)
const { data: list } = await API.get('/dreams/')
setMyDreams(list.filter((d:any)=>d.author.id===data.id))
})()
}, [])
if (!me) return <div>Loading...</div>
return (
<div>
<h2 className="text-2xl font-bold mb-2">@{me.username}</h2>
<p className="text-gray-600">{me.email}</p>
<h3 className="text-xl font-semibold mt-4 mb-2">My Dreams</h3>
{myDreams.map(d => (
<div key={d.id} className="bg-white rounded p-3 shadow mb-2">
<div className="font-semibold">{d.title}</div>
<div className="text-sm text-gray-600">Likes: {d.like_count}</div>
</div>
))}
</div>
)
}