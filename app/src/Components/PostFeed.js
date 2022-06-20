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
    });

    console.log(list);
    return (
        <div>
            {list.map((post) => {
                return (
                    <p>{post.content}</p>
                )
            })}
        </div>
    )
}
