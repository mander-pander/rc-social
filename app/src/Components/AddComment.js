import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import styles from './CSS/PostFeed.module.css'

export default function AddComment(props) {
    const [comment, setComment] = useState('');
    const [showForm, setShowForm] = useState(false);

    const handleClose = () => setShowForm(false);
    const handleShow = () => setShowForm(true);

    function handleAddComment() {
        axios.post('https://rc-social.herokuapp.com/createComment', {
            content: comment,
            post_id: props.post_id
        },
            {
                withCredentials: true,
                headers: {
                    'Access-Control-Allow-Origin': 'https://jolly-froyo-d03e7d.netlify.app',
                }
            })
            .then(() => {
                console.log('comment added!')
            })
            .catch(err => console.log(err));
    }

    return (
        <>
            <Button className={styles.commentBtn} variant="outline-dark" size="sm" onClick={handleShow}>+</Button>
            <Modal show={showForm} onHide={handleClose} animation={false} size='lg' aria-labelledby="contained-modal-title-vcenter"
                centered className={styles.commentForm} style={{ display: 'flex' }}>
                <Modal.Header closeButton>Add a comment</Modal.Header>
                <Modal.Body>
                    <Form style={{ display: showForm ? "block" : "none" }} onSubmit={handleAddComment}>
                        <Form.Control as="textarea" rows={3}
                            placeholder='Leave a comment!'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <button className={styles.addComment}>Submit</button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )

}
