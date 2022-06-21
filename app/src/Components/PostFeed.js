import { useState, useEffect } from 'react';
import axios from 'axios';

export default function PostFeed() {

    const [list, setList] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5050/posts`)
            .then((res) => {
                setList(res.data[0]);
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
            await axios.delete('http://localhost:5050/posts', {params})
            console.log('post deleted')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            {list.map((post) => {
                return (
                    <div>
                        <p>{post.pc}</p>
                        <p>{post.cc}</p>
                        <button onClick={() => {
                            deletePost(post.pi)
                        }}>
                            Delete
                        </button>
                    </div>
                )
            })}
        </div>
    )
}
