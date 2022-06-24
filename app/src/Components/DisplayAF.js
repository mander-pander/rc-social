import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './CSS/DisplayAF.module.css'

export default function DisplayAF() {
    const [list, setList] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5050/fields`)
            .then((res) => {
                setList(res.data[0]);
            })
            .catch(err => console.log(err));
    });

    return (
        <div>
            {list.map((field) => {
                return (
                    <div>
                        <p className={styles.name}>{field.name}</p>
                        <p>{field.address}</p>
                    </div>
                )
            })}
        </div>
    )
}
