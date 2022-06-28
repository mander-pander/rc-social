import { useState, useEffect } from 'react';
import axios from 'axios';
import AddComment from './AddComment';
import AddPost from './AddPost';
import styles from '../Components/CSS/PostFeed.module.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { TiTrash } from "react-icons/ti";

export default function PostFeed() {
    const [list, setList] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5050/posts`,
            {
                withCredentials: true,
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                },
            })
            .then((res) => {
                setList(res.data);
            })
            .catch(err => console.log(err))
    }, []);

    const deletePost = async (post_id) => {
        let params = {
            data: {
                post_id
            }
        }
        try {
            try {
                await axios.delete('http://localhost:5050/posts', { params })
            } finally {
                let res = await axios.get(`http://localhost:5050/posts`, {
                    withCredentials: true,
                    headers: {
                        'Access-Control-Allow-Origin': 'http://localhost:3000',
                    },
                })
                setList(res.data);
            }
        } catch (error) {
            console.log(error)
        }
    };

    const deleteComment = async (comment_id) => {
        let params = {
            data: {
                comment_id
            }
        }
        try {
            await axios.delete('http://localhost:5050/comments', { params })

        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.feed}>
                <AddPost />
                {list.map((post) => {
                    return (
                        <Card>
                            <Card.Body>
                                <div className={styles.posts}>
                                    <p className={styles.content}>{post.pc}</p>
                                    <Button variant="outline-danger" size="sm" onClick={() => {
                                        deletePost(post.pi)
                                    }}> Delete Post
                                    </Button>
                                    <AddComment />
                                </div>

                                {post.cc.map((comment) => {
                                    if (comment) {
                                        return (
                                            <ListGroup >
                                                <ListGroup.Item >
                                                    <div className={styles.comments}> {comment}
                                                        <Button variant="outline-warning" size="sm" onClick={() => {
                                                            deleteComment(post.ci)
                                                        }}><TiTrash />
                                                        </Button></div>

                                                </ListGroup.Item>
                                            </ListGroup>
                                        )
                                    }
                                })}
                            </Card.Body>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}
