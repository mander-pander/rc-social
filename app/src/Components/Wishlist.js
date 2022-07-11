import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import styles from './CSS/DisplayAP.module.css';
import { getDomainName } from '../utils/urls';

const domainName = getDomainName();

export default function Wishlist() {
    const [list, setList] = useState([]);

    useEffect(() => {
        axios.get(`https://rc-social.herokuapp.com/wishlist/`,
            {
                withCredentials: true,
                headers: {
                    'Access-Control-Allow-Origin': domainName,
                },
            })
            .then((res) => {
                setList(res.data[0]);
            })
            .catch(err => console.log(err));
    }, []);

    const deleteItem = async (airplane_id) => {
        let params = {
            data: {
                airplane_id
            }
        }

        try {
            try {
                await axios.delete('https://rc-social.herokuapp.com/wishlist', { params });
            } finally {
                let res = await axios.get('https://rc-social.herokuapp.com/wishlist',
                    {
                        withCredentials: true,
                        headers: {
                            'Access-Control-Allow-Origin': domainName,
                        },
                    })
                setList(res.data[0]);
            }
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div className={styles.page}>
            {list.map((plane) => {
                console.log('cowman', plane);
                return (
                    <div key={plane.id} className={styles.planes}>
                        <Card className={styles.item} style={{ width: '12rem' }} >
                            <Card.Img varient="top" src={plane.img} />
                            <Card.Title>{plane.model}</Card.Title>

                            <OverlayTrigger
                                placement="bottom"
                                overlay={<Tooltip id="button-tooltip-2">Remove from wishlist.</Tooltip>}>

                                <Button variant="light" size="sm" onClick={() => { deleteItem(plane.id) }}> Remove </Button>
                            </OverlayTrigger>
                        </Card>
                    </div>
                )
            })}
        </div>
    )
}
