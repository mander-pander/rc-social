import { useState } from 'react';
import axios from 'axios';
import styles from './CSS/PostFeed.module.css'

export default function AddPost() {
    const [post, setPost] = useState('');

    function handleAddPost(content) {
        axios.post('https://rc-social.herokuapp.com/createPost', {
            content: post,
        },
            {
                withCredentials: true,
                headers: {
                    'Access-Control-Allow-Origin': 'https://jolly-froyo-d03e7d.netlify.app',
                }
            })
            .then(() => {
                console.log('post added!')
            })
            .catch(err => console.log(err));
    }

    return (
        <form className={styles.addpost} onSubmit={handleAddPost}>
            <textarea
                className={styles.addText}
                placeholder='Talk to everyone about your flight!'
                value={post}
                onChange={(e) => setPost(e.target.value)}
                rows="5"
            />
            <br></br>
            <button className={styles.addButton}>Add Post</button>
        </form>
    )
}
