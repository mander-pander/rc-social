import { useState, useEffect } from 'react';
import axios from 'axios';

export default function DisplayAP() {
    const [list, setList] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5050/planes`)
            .then((res) => {
                setList(res.data[0]);
            })
            .catch(err => console.log(err))
    });

    function handleWL(e) {
        e.preventDefault();
        axios.post('http://localhost:5050/addItem', {
            wishlist_id: 50,
            airplane_id: 8
        })
        .then(() => {
            console.log('item added!')
        })
        .catch(err => console.log(err));
    }

    return (
        <div>
            {list.map((plane) => {
                return (
                    <div>
                        <p>{plane.model}</p>
                        <button onClick={handleWL}>Add to wishlist</button>
                    </div>
                )
            })}
        </div>
    )
}
