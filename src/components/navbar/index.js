import { NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logout } from '../../store/actions';
import './style.scss';

const Navbar = () => {

    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem("loggedInUser");
        dispatch(logout());
    }

    return (
        <nav className="navbar">
            <NavLink className='navbar__logout' to="/" onClick={handleLogout} >Logout</NavLink>
        </nav>
    )
}

export default Navbar;
