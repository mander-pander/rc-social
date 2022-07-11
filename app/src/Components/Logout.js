import Cookies from 'js-cookie';
import Nav from 'react-bootstrap/Nav';

export default function Logout() {
    function onLogout() {
        Cookies.remove('x-access-token');
        window.location = 'https://rc-social.herokuapp.com/login';
    }

    return (
        <Nav.Link onClick={() => onLogout()}>Logout</Nav.Link>
    );
};
