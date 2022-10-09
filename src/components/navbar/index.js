import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/actions';
import './style.scss';

const Navbar = () => {

    const dispatch = useDispatch();

    const isLogged = useSelector((state) => state.user.logged);

    const handleLogout = () => {
        localStorage.removeItem("loggedInUser");
        dispatch(logout());
    }

    return (
        <nav className="navbar">
            {isLogged &&
                <NavLink className='navbar__logout' to="/" onClick={handleLogout} >Logout</NavLink>
            }
        </nav>
    )
}

export default Navbar;
