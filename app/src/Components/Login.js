import axios from 'axios';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';

import styles from './CSS/Auth.module.css';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5050/login', {
            username: username,
            password: password
        },
            {
                withCredentials: true,
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                },
            })
            .then(() => {
                window.location = `http://localhost:3000/posts`;
            })
            .catch(err => { console.log(err) });
    }

    return (
        <div className={styles.page}>
            <Card className={styles.container} style={{border: '2px solid black'}}>
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
                    <br></br>
                    <button>Submit</button>

                </form>
                <a href='http://localhost:3000/createAccount'>Create Account</a>
            </Card>
        </div>
    )
}
