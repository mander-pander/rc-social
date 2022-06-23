import { useState } from 'react';
import axios from 'axios';

//add state for show form/setshowform
//button that sets show form to true
//render method - render form if showform = true
//otherwise render button that toggles that form

export default function AddComment() {
    const [comment, setComment] = useState('');
    const [showForm, setShowForm] = useState(false);

    function handleAddComment(e) {
        e.preventDefault();
        axios.post('http://localhost:5050/createComment', {
            content: comment,
            user_id: 3,
            post_id: 4
        })
            .then(() => {
                console.log('comment added!')
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <button onClick={() => setShowForm(true)}>Add Comment</button>
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
