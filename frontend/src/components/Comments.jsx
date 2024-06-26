import { useEffect, useState } from 'react'
import { formatDistanceToNowStrict } from 'date-fns'
import { FadeLoader } from 'react-spinners'

const Comments = ({gameId}) => {
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    const [text, setText] = useState('')

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`/api/comments/${gameId}/comments`)
                const data = await response.json()
                if (Array.isArray(data)) {
                    setComments(data)
                } else {
                    setComments([])
                }
                setLoading(false)
            } catch (error) {
                console.error('Error fetching comments', error)
                setComments([])
                setLoading(false)
            }
        }

        fetchComments()
    }, [gameId])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`/api/comments/${gameId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ gameId, text })
            })
            const newComment = await response.json()
            setComments([...comments, newComment])
            setText('')
        } catch (error) {
            console.error('Error posting comment', error)
        }
    };

    if (loading) {
        return (
            <div className='text-white font-bold text-xl flex justify-center mt-24'>
              <FadeLoader color="#ffffff" loading={loading} margin={2} />
            </div>
          )
    }

    return (
        <div className='ml-4'>
            <div className='flex items-start'>
                <div className='bg-bgNavbar my-4 rounded-lg w-1/2'>
                    <h2 className='text-3xl font-bold pl-6 pt-2 text-white'> Comments </h2>
                    <ul className='text-white bg-bgNavbar py-4 px-4 rounded-md'>
                        {comments.map((comment, index) => (
                            <li key={index} className='bg-zinc-800 px-4 py-3 max-w-xl rounded-lg mb-3'>
                                <div className='flex items-center pb-2'>
                                    <img className="h-12 w-12 rounded-full object-cover" src={comment.userId.profilePicture} alt={comment.userId.username} />
                                    <p className=' pl-3 text-xl font-bold'>@{comment.userId.username}</p>
                                    <p className='pl-3 font-medium text-nowrap'> {formatDistanceToNowStrict(new Date(comment.createdAt), { addSuffix: true })} </p>
                                </div>
                                <p className='font-semibold pl-2'>{comment.text}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col items-start mb-8 mt-4 ml-10 bg-bgNavbar py-4 px-4 rounded-lg'>
                    <h1 className='text-white font-bold text-3xl pb-2 pl-2'> Add Comment: </h1>
                    <textarea className="text-white bg-zinc-800 w-96 h-24 rounded-md mb-2 px-4 py-2" value={text} onChange={(e) => setText(e.target.value)} required></textarea>
                    <button type="submit" className='bg-blue-500 rounded-2xl py-2 px-4 text-white'>Post Comment</button>
                </form>
            </div>
        </div>
    );
};

export default Comments;
