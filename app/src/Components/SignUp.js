import axios from 'axios';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import styles from './CSS/Auth.module.css';

export default function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5050/signup', {
                username: username,
                password: password
            },
                {
                    withCredentials: true,
                    headers: {
                        'Access-Control-Allow-Origin': 'http://localhost:3000',
                    },
                });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={styles.page}>
            <Card className={styles.card} style={{ width: '18rem' }}>
                <Card.Img variant="top" src={require('./CSS/Durafly_Gloster-Gladiator-Mk1_9499000364-0.png')} />
                <form onSubmit={handleSubmit}>
                    Username:
                    <input
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    Password:
                    <input
                        placeholder="password"
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button>Submit</button>
                </form>
            </Card>
        </div>
    )
}
