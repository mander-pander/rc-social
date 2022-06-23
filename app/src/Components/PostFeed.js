import { useState, useEffect } from 'react';
import axios from 'axios';
import AddComment from './AddComment';

export default function PostFeed() {
    const [list, setList] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5050/posts`)
            .then((res) => {
                debugger;
                setList(res.data);
            })
            .catch(err => console.log(err))
    }, [list]);

    const deletePost = async (post_id) => {
        let params = {
            data: {
                post_id
            }
        }

        try {
            await axios.delete('http://localhost:5050/posts', { params })
            console.log('post deleted')
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
            console.log('comment deleted')
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div>
            {list.map((post) => {
                return (
                    <div>
                        <p>{post.pc}</p>
                        <button onClick={() => {
                            deletePost(post.pi)
                        }}> Delete Post
                        </button>
                        <AddComment />
                        {post.cc.map((comment) => {
                            return (
                                <div>
                                    <p>{comment}</p>
                                    <button onClick={() => {
                                        deleteComment(post.ci)
                                    }}>Delete Comment
                                    </button>
                                </div>
                            )
                        })}

                    </div>
                )
            })}
        </div>
    )
}
