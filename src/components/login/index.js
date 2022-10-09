import './style.scss';

import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/actions';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    

    const isLogged = useSelector((state) => state.user.logged);

    const navigate = useNavigate();

    useEffect(() => {
        if (isLogged) {
            return navigate('/chat');
        } else {
            return navigate('/');
        }
    }, [isLogged]);

    const dispatch = useDispatch();

    const onInputChange = (event) => {
        switch (event.target.name) {
        case 'email':
            setInputEmail(event.target.value);
            break;
        case 'password':
            setInputPassword(event.target.value);
            break;
        default:
            console.log(`No inputs in login`);
        }
    };

    const handleLoginSubmit = (event) => {
        event.preventDefault();
        console.log(inputEmail);
        console.log(inputPassword);

        const userToLogin = {
            email: inputEmail,
            password: inputPassword,
        }

        dispatch(login(userToLogin));
    };

    /* const showSignUpSuccessMessage = useSelector((state) => (state.user.showSignUpSuccessMessage));
    if (showSignUpSuccessMessage) {
        toast.success('The account has been created', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    } */

    return (
        <form className="signup-form" onSubmit={handleLoginSubmit}>
            <h1 className="signup-form__title">Login</h1>
            <input className="signup-form__input" type="email" required value={inputEmail} onChange={onInputChange} placeholder="Email" name="email" />
            <input className="signup-form__input" type="password" required value={inputPassword} onChange={onInputChange} placeholder="Password" name="password" />
            <button className="signup-form__button" type="submit">Submit</button>
            <Link to="/signup">Create account</Link>
        </form>
    );
};

export default Login;
