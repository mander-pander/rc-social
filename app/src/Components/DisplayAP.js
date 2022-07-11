import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './CSS/DisplayAP.module.css';
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { getDomainName } from '../utils/urls';

const domainName = getDomainName();

export default function DisplayAP() {
    const [list, setList] = useState([]);

    useEffect(() => {
        axios.get(`https://rc-social.herokuapp.com/planes`)
            .then((res) => {
                setList(res.data[0]);

            })
            .catch(err => console.log(err))
    }, []);

    const handleWL = async (airplane_id) => {
        axios.post('https://rc-social.herokuapp.com/addItem', {
            airplane_id
        },
            {
                withCredentials: true,
                headers: {
                    'Access-Control-Allow-Origin': domainName,
                }
            })
            .then(console.log('item added'))
            .catch((err) => console.log(err));
    }

    return (
        <div className={styles.page}>
            {list.map((plane) => {
                return (
                    <div className={styles.planes}>
                        <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip id="button-tooltip-2">Add this plane to your wishlist!</Tooltip>}>
                            <Card className={styles.item} style={{ width: '12rem', borderColor: '#d8ceb3' }} onClick={() => handleWL(plane.id)}>
                                <Card.Img varient="top" src={plane.img} />
                                <Card.Title>{plane.model}</Card.Title>
                            </Card>
                        </OverlayTrigger>

                    </div>
                )
            })}
        </div>
    )
}
