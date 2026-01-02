import { Link} from "react-router-dom";
import "../styles/Navbar.css"
function Navbar({onLogout}){
    const isLoggedIn = localStorage.getItem('token');

    return(
        <nav className="navbar">
            <Link to={'/'}>Homepage</Link>

            {!isLoggedIn
            ?   <div>
                    <Link to={'/login'}>Login</Link>
                    <Link to={'/signup'}>Sign up</Link>
                </div>
            : <button onClick={onLogout}>Logout</button>
        }
        </nav>
    )
}

export default Navbar