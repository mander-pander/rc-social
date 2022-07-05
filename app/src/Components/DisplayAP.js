import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './CSS/DisplayAP.module.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export default function DisplayAP() {
    const [list, setList] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5050/planes`)
            .then((res) => {
                setList(res.data[0]);

            })
            .catch(err => console.log(err))
    }, []);

    const handleWL = async (airplane_id) => {
        axios.post('http://localhost:5050/addItem', {
            airplane_id
        },
        {
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
            }})
        .then(console.log('item added'))
        .catch((err) => console.log(err));
    }

    return (
        <div className={styles.page}>
            {list.map((plane) => {
                return (
                    <div className={styles.planes}>
                        <Card className={styles.item} style={{ width: '12rem' }} >
                            <Card.Img varient="top" src={plane.img}/>
                            <Card.Title>{plane.model}</Card.Title>
                            <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip id="button-tooltip-2">Add this plane to your wishlist!</Tooltip>}>

                            <Button variant="light" size="sm" onClick={() => handleWL(plane.id)}> + </Button>
                            </OverlayTrigger>
                        </Card>
                    </div>
                )
            })}
        </div>
    )
}
