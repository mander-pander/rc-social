import { BrowserRouter, Routes, Route} from 'react-router-dom';
import PostFeed from './PostFeed.js';
import DisplayAP from './DisplayAP.js';

export default function Header() {
    return (
        <BrowserRouter>
        <Routes>
          <Route path="/posts" element={<PostFeed />} />
          <Route path="/planes" element={<DisplayAP />} />

        </Routes>
      </BrowserRouter>
    )
}
