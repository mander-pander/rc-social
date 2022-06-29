import Header from "./Components/Header";
import styles from './App.module.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logout from "./Components/Logout";

function App() {

  return (
    <>
      <Navbar>
        <Nav as="ul" className={styles.nav}>
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
            <Nav.Link href="http://localhost:3000/createAccount">Create Account</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link href="http://localhost:3000/login">Login</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Logout />
          </Nav.Item>
        </Nav>
      </Navbar>
      <Header />
    </>
  );
}

export default App;
