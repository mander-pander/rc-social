import { useEffect } from "react";
import axios from 'axios';
import Header from "./Components/Header";
import styles from './App.module.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logout from "./Components/Logout";
import Cookies from 'js-cookie';

function App() {
  useEffect(() => {
    axios.get(`http://localhost:5050/loginstatus`, {
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
      }
    })

      .catch((err) => {
        if (err.response.status === 401) {
          Cookies.remove('x-access-token');
        }
      })
  }, []);

  let isLoggedIn = Boolean(Cookies.get('x-access-token'));
  return (
    <>
      <Navbar style={{ padding: 0 }}>
        <Nav as="ul" className={styles.nav}>
          <Nav.Item as="li">
            <Nav.Link href="http://localhost:3000/posts" style={{fontFamily: 'Oswald', color: '#6c757d'}}>RC-Social</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link href="http://localhost:3000/posts">Home Page</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link href="http://localhost:3000/wishlist">Wishlist</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link href="http://localhost:3000/planes">Airplane Directory</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link href="http://localhost:3000/fields">Airfield Directory</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            {isLoggedIn ? <Logout /> : <Nav.Link href="http://localhost:3000/login">Login</Nav.Link>}
          </Nav.Item>
        </Nav>
      </Navbar>
      <Header />
    </>
  );
}

export default App;
