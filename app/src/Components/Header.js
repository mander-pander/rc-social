import { BrowserRouter, Routes, Route} from 'react-router-dom';
import PostFeed from './PostFeed.js';
import DisplayAP from './DisplayAP.js';
import SignUp from './SignUp.js';
import Login from './Login.js';
import Wishlist from './Wishlist';
import DisplayAF from './DisplayAF.js';


export default function Header() {
    return (
        <BrowserRouter>
        <Routes>
          <Route path="/posts" element={<PostFeed />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/planes" element={<DisplayAP />} />
          <Route path="/createAccount" element={<SignUp/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/fields" element={<DisplayAF/>} />
        </Routes>
      </BrowserRouter>
    )
}
