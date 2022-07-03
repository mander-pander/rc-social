import { useState, useEffect } from 'react';
import axios from 'axios';
import AddComment from './AddComment';
import AddPost from './AddPost';
import LoadingSpinner from "./LoadingSpinner";
import styles from '../Components/CSS/PostFeed.module.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { TiTrash } from "react-icons/ti";


export default function PostFeed() {
    const [list, setList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        setIsLoading(true);
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

    const deleteComment = async (comment_id, res) => {
        let params = {
            data: {
                comment_id
            }
        }
        try {
            await axios.delete('http://localhost:5050/comments', { params });


        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className={styles.page}>
            <LoadingSpinner />
            <div className={styles.feed}>
                <AddPost />
                {list.map((post) => {
                    return (
                        <Card className={styles.cards} style={{ 'border-radius': '0' }}>
                            <Card.Body>
                                <div className={styles.posts}>
                                    <p className={styles.content}>{post.pc}</p>
                                    <Card.Subtitle className="mb-2 text-muted" >{post.username}</Card.Subtitle>
                                    <Dropdown className={styles.deleteBtn} >
                                        <Dropdown.Toggle style={{'background-color': 'white', 'border': 'none', 'color': 'black'}}>
                                            ...
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                        <Dropdown.Item  onClick={() => {
                                            deletePost(post.pi)
                                        }}> Delete Post
                                        </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <AddComment post_id={post.pi} />

                                </div>

                                {post.cc.map((comment) => {
                                    if (comment) {
                                        return (
                                            <ListGroup >
                                                <ListGroup.Item className={styles.listItem} style={
                                                    {
                                                        'border-radius': '0',
                                                        'border-left': 'none', 'border-right': 'none', 'border-bottom': 'none',
                                                        'padding-right': 0
                                                    }
                                                }>
                                                    <div className={styles.comments}>
                                                        <p>{comment}</p>
                                                        <Button variant="outline-dark" size="sm" onClick={() => {
                                                            deleteComment(post.ci)
                                                        }}><TiTrash />
                                                        </Button>
                                                    </div>

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
