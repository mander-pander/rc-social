import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import PostFeed from './PostFeed.js';
import DisplayAP from './DisplayAP.js';
import SignUp from './SignUp.js';
import Login from './Login.js';
import Wishlist from './Wishlist';
import DisplayAF from './DisplayAF.js';
import Cookies from 'js-cookie';

export default function Header() {
    let isLoggedIn = Boolean(Cookies.get('x-access-token'));

    return (
        <BrowserRouter>
        <Routes>
          <Route path="/posts" element={isLoggedIn ? <PostFeed /> : <Navigate to="/login" />} />
          <Route path="/wishlist" element={isLoggedIn ? <Wishlist /> : <Navigate to="/login" />} />
          <Route path="/planes" element={<DisplayAP />} />
          <Route path="/createAccount" element={<SignUp/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/fields" element={<DisplayAF/>} />
        </Routes>
      </BrowserRouter>
    )
}
