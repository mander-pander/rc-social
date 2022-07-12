import axios from 'axios';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import styles from './CSS/Auth.module.css';




export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://rc-social.herokuapp.com/api/login', {
            username: username,
            password: password
        },
            {
                withCredentials: true,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then(() => {
                window.location = '/posts';
            })
            .catch(err => { console.log(err) });
    }

    return (
        <div className={styles.page}>

            <Card className={styles.container} style={{ border: '2px solid black' }}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <h1>RC SOCIAL</h1>
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
                    <button className={styles.authbutton}>Submit</button>
                    <a href='https://rc-social.herokuapp.com/api/createAccount'>Create Account</a>
                </form>

            </Card>
        </div>
    )
}
