import { Link} from "react-router-dom";
import "../styles/Navbar.css"
function Navbar({onLogout}){
    const isLoggedIn = localStorage.getItem('token');

    return(
        <nav className="navbar">
            <Link to={'/'}>Homepage</Link>

            {!isLoggedIn
            ?   
                    <>
                        <Link to={'/login'}>Login </Link>
                        <Link to={'/signup'}>Sign up</Link>
                    </>
                
            : <button onClick={onLogout}>Logout</button>
        }
        </nav>
    )
}

export default Navbar