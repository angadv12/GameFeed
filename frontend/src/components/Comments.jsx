// components/Comments.js
import { useEffect, useState } from 'react';

const Comments = ({ gameId }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [text, setText] = useState('');

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`/api/comments/${gameId}/comments`);
                const data = await response.json();
                console.log('Fetched comments:', data); // Debugging line
                if (Array.isArray(data)) {
                    setComments(data);
                } else {
                    setComments([]); // Ensure comments is an array
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching comments', error);
                setComments([]); // Ensure comments is an array on error
                setLoading(false);
            }
        };

        fetchComments();
    }, [gameId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/comments/${gameId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ gameId, text })
            });
            const newComment = await response.json();
            setComments([...comments, newComment]);
            setText('');
        } catch (error) {
            console.error('Error posting comment', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Comments</h2>
            <form onSubmit={handleSubmit}>
                <textarea className="text-black" value={text} onChange={(e) => setText(e.target.value)} required></textarea>
                <button type="submit">Post Comment</button>
            </form>
            <ul>
                {comments.map((comment, index) => (
                    <li key={index}>
                        <img className="h-16 w-16 rounded-full object-cover" src={comment.userId.profilePicture} alt={comment.userId.name} />
                        <strong>{comment.userId.name}</strong>
                        <p>{comment.text}</p>
                        <small>{new Date(comment.createdAt).toLocaleString()}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Comments;
