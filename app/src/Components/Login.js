import axios from 'axios';
import { useState } from 'react';

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
                console.log('account login')
            })
            .catch(err => { console.log(err) });
    }

    return (
        <div>
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
        </div>
    )
}
