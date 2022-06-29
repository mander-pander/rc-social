import Cookies from 'js-cookie'

export default function Logout () {
    function onLogout() {
        Cookies.remove('x-access-token');
        document.location.reload();
    }

    return (
        <button onClick={() => onLogout()}>Logout</button>
    );
  };
