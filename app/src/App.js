import './App.css';
import Header from "./Components/Header";

function App() {

  return (
    <div className="App">
      <ul>
        <li><a href="http://localhost:3000/posts">Home Page</a></li>
        <li><a href="http://localhost:3000/planes">Airplane Directory</a></li>
      </ul>
      <Header />
    </div>
  );
}

export default App;
