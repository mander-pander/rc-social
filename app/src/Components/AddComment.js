import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function AddComment(props) {
    const [comment, setComment] = useState('');
    const [showForm, setShowForm] = useState(false);

    function handleAddComment() {
        axios.post('http://localhost:5050/createComment', {
            content: comment,
            post_id: props.post_id
        },
        {
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
            }})
            .then(() => {
                console.log('comment added!')
            })
            .catch(err => console.log(err));
    }

    return (
        <>
            <Button variant="outline-dark" size="sm" onClick={() => setShowForm(true)}>Add Comment</Button>
            <form style={{display: showForm ? "block" : "none"}} onSubmit={handleAddComment}>
                <input
                    placeholder='Leave a comment!'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button>Submit</button>
            </form>
        </>
    )

}
