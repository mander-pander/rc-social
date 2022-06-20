import { Route, Routes, BrowserRouter } from "react-router-dom";
import './App.css';
import PostFeed from './Components/PostFeed';
import DisplayAP from "./Components/DisplayAP";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/posts" element={<PostFeed />} />
          <Route path="/planes" element={<DisplayAP />} />

        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
