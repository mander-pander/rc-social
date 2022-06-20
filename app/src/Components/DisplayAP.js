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
