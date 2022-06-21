import { useState } from 'react';
import axios from 'axios';

export default function AddPost () {
    const [post, setPost] = useState('');

    function handleAddPost(e) {
        e.preventDefault();
        axios.post('http://localhost:5050/createPost', {
            content: post,
            user_id: 1
        })
        .then(() => {
            console.log('post added!')
        })
        .catch(err => console.log(err));
    }

    return (
        <form onSubmit={handleAddPost}>
            <input
                placeholder='Talk to everyone about your flight!'
                value={post}
                onChange={(e) => setPost(e.target.value)}
            />
            <button>Submit</button>
        </form>
    )
}
