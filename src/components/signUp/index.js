import './style.scss';

import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../../store/actions';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    // Not sure if we'll need this state anywhere else
    // this is why it's not in store but here.
    const [role, setRole] = useState("");
    const [inputName, setInputName] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const navigate = useNavigate();

    const isLogged = useSelector((state) => state.user.logged);

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
        case 'name':
            setInputName(event.target.value);
            break;
        case 'email':
            setInputEmail(event.target.value);
            break;
        case 'password':
            setInputPassword(event.target.value);
            break;
        case 'confirmPassword':
            setConfirmPassword(event.target.value);
            break;
        default:
            console.log(`No inputs in sign-up`);
        }
    };

    const handleRegSubmit = (event) => {
        event.preventDefault();
        console.log(role);
        console.log(inputName);
        console.log(inputEmail);
        console.log(inputPassword);
        if (inputPassword !== confirmPassword) {
            toast.info('Make sure the passwords are the same', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            const userToSignUp = {
                name: inputName,
                email: inputEmail,
                role: role,
                password: inputPassword,
                password2: confirmPassword
            }
            dispatch(signUp(userToSignUp));
        }
    };

    const handleRadioBtnChange = (event) => {
        setRole(event.target.value);
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
        <form className="signup-form" onSubmit={handleRegSubmit}>
            <h1 className="signup-form__title">Sign up</h1>
            <div className="signup-form__radios">
                <div className='signup-form__radios__input'>
                    <input
                        type="radio"
                        id="helper"
                        name="role"
                        value="helper"
                        onChange={handleRadioBtnChange}
                        required
                    />
                    <label htmlFor="musico"><h3 className='signup-form__type'>Helper</h3></label>
                    <p>I'd like to help others</p>
                </div>
                <div className='signup-form__radios__input'>
                    <input
                        type="radio"
                        id="user"
                        name="role"
                        value="user"
                        onChange={handleRadioBtnChange}
                        required
                    />
                    <label htmlFor="momer"><h3 className='signup-form__type'>User</h3></label>
                    <p>I'd like to get help</p>
                </div>
            </div>
            <input className="signup-form__input" type="text" required value={inputName} onChange={onInputChange} placeholder="Name" name="name" />
            <input className="signup-form__input" type="email" required value={inputEmail} onChange={onInputChange} placeholder="Email" name="email" />
            <input className="signup-form__input" type="password" required value={inputPassword} onChange={onInputChange} placeholder="Password" name="password" />
            <input className="signup-form__input" type="password" required value={confirmPassword} onChange={onInputChange} placeholder="Confirm password" name="confirmPassword" />
            <button className="signup-form__button" type="submit">Submit</button>
            <Link to="/">You have an account?</Link>
        </form>
    );
};

export default Signup;
