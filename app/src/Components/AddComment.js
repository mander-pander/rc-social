import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'

export default function AddComment() {
    const [comment, setComment] = useState('');
    const [showForm, setShowForm] = useState(false);

    function handleAddComment(content) {
        axios.post('http://localhost:5050/createComment', {
            content: comment,
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
        <div>
            <Button variant="outline-dark" onClick={() => setShowForm(true)}>Add Comment</Button>
            <form style={{display: showForm ? "block" : "none"}} onSubmit={handleAddComment}>
                <input
                    placeholder='Talk to everyone about your flight!'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button>Submit</button>
            </form>
        </div>
    )

}
