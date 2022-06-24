import Header from "./Components/Header";
import styles from './App.module.css';

function App() {

  return (
    <div>
      <ul className={styles.nav}>
       <li><a href="http://localhost:3000/posts">Home Page</a></li>
        <li><a href="http://localhost:3000/wishlist">Wishlist</a></li>
        <li><a href="http://localhost:3000/planes">Airplane Directory</a></li>
        <li><a href="http://localhost:3000/fields">AirField Directory</a></li>
        <li><a href="http://localhost:3000/createAccount">Sign Up Here</a></li>
        <li><a href="http://localhost:3000/login">Sign Into Your Account</a></li>
      </ul>
      <Header />
    </div>
  );
}

export default App;
