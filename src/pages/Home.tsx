import { useEffect, useState } from 'react'
import { API } from '../api/client'
import DreamCard from '../components/DreamCard'


export default function Home() {
const [dreams, setDreams] = useState<any[]>([])


const fetchAll = async () => {
const { data } = await API.get('/dreams/')
setDreams(data)
}


useEffect(() => { fetchAll() }, [])


const onLike = async (id:number) => {
await API.post(`/likes/${id}`)
fetchAll()
}


return (
<div>
<h2 className="text-2xl font-bold mb-3">Latest Dreams</h2>
{dreams.map(d => <DreamCard key={d.id} dream={d} onLike={onLike} />)}
</div>
)
}