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
        axios.get(`https://rc-social.herokuapp.com/posts`,
            {
                withCredentials: true,
                headers: {
                    'Access-Control-Allow-Origin': 'https://jolly-froyo-d03e7d.netlify.app',
                },
            })
            .then((res) => {
                setTimeout(() => {
                    setList(res.data);
                    setIsLoading(false);
                }, 2000)
            })
            .catch(err => console.log(err))
    }, []);

    const deletePost = async (post_id) => {
        setIsLoading(true);
        let params = {
            data: {
                post_id
            }
        }
        try {
            try {
                await axios.delete('https://rc-social.herokuapp.com/posts', { params })
            } finally {
                let res = await axios.get(`https://rc-social.herokuapp.com/posts`, {
                    withCredentials: true,
                    headers: {
                        'Access-Control-Allow-Origin': 'https://jolly-froyo-d03e7d.netlify.app',
                    },
                })
                setTimeout(() => {
                    setList(res.data);
                    setIsLoading(false);
                }, 1000)

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
            try {
                await axios.delete('https://rc-social.herokuapp.com/comments', { params });
            } finally {
                let res = await axios.get(`https://rc-social.herokuapp.com/posts`, {
                    withCredentials: true,
                    headers: {
                        'Access-Control-Allow-Origin': 'https://jolly-froyo-d03e7d.netlify.app',
                    },
                })
                setList(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    if (isLoading) {
        return <LoadingSpinner />
    }

    return (
        <div className={styles.page}>
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
                                        <Dropdown.Toggle style={{ 'background-color': 'white', 'border': 'none', 'color': 'black' }}>
                                            ...
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => {
                                                deletePost(post.pi)
                                            }}> Delete Post
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <AddComment post_id={post.pi} />

                                </div>

                                {post.cc.map((comment) => {
                                    if (comment.cc) {
                                        return (
                                            <ListGroup key={post.ci}>
                                                <ListGroup.Item className={styles.listItem} style={
                                                    {
                                                        'border-radius': '0',
                                                        'border-left': 'none', 'border-right': 'none', 'border-bottom': 'none',
                                                        'padding-right': 0
                                                    }
                                                }>
                                                    <div className={styles.comments}>
                                                        <p>{comment.cc}</p>
                                                        <Button variant="" onClick={() => {
                                                            deleteComment(comment.ci)
                                                        }}><TiTrash style={{ fill: 'red' }} />
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
