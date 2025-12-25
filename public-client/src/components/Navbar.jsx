import { Link} from "react-router-dom";

function Navbar(){
    const isLoggedIn = localStorage.getItem('token');

    return(
        <nav>
            <Link to={'/'}>Homepage</Link>

            {!isLoggedIn
            ? <Link to={'/login'}>Login</Link>
            : <Link to={'/logout'}>Logout</Link>
        }
        </nav>
    )
}

export default Navbar