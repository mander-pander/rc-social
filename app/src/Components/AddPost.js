import { useState } from 'react';
import axios from 'axios';
import styles from './CSS/PostFeed.module.css'

export default function AddPost () {
    const [post, setPost] = useState('');

    function handleAddPost(content) {
        axios.post('http://localhost:5050/createPost', {
            content: post,
        },
        {
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
            }})
        .then(() => {
            console.log('post added!')
        })
        .catch(err => console.log(err));
    }

    return (
        <form className={styles.addpost} onSubmit={handleAddPost}>
            <input
                className={styles.addText}
                placeholder='Talk to everyone about your flight!'
                value={post}
                onChange={(e) => setPost(e.target.value)}
            />
            <br></br>
            <button className={styles.addButton}>Add Post</button>
        </form>
    )
}
