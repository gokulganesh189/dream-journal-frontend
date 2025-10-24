import { Link } from 'react-router-dom'


export default function DreamCard({ dream, onLike }: { dream: any, onLike?: (id: number) => void }) {
    return (
        <div className= "bg-white rounded-lg p-4 shadow mb-4" >
        <div className="flex items-center gap-2 text-sm text-gray-500" >
            <span>@{ dream.author_name } </span>
                    </div>
                    
    <h3 className="text-lg font-semibold mt-1" > { dream.title } </h3>
        < p className = "text-gray-700 mt-1 line-clamp-3" > { dream.content } </p>
{/* { dream.image_path && <img className="mt-2 rounded" src = {`http://localhost:8000/${dream.image_path}` } />} */}
<div className='display-flex text-blue-600'>
{onLike && (
          <button
            className={`font-semibold ${
              dream.is_liked_by_user
                ? "text-red-500 hover:text-red-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
            onClick={() => onLike(dream.id)}
          >
            ❤️ {dream.is_liked ? "Liked" : "Like"} { dream.likes_count }
          </button>
        )}
< Link to = {`/dream/${dream.id}`}> Comment { dream.comments_count } </Link>
</div>
</div>
)
}