import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Wishlist() {
    const [list, setList] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5050/wishlist/`,
        {
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
            },
        })
        .then((res) => {
            setList(res.data);
        })
        .catch(err => console.log(err));
    }, [list]);

    return (
        <div>
            {list.map((plane) => {
                return (
                    <p>{plane.model}</p>
                )
            })}
        </div>
    )
}
