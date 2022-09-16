import axios from 'axios';
import { toast } from 'react-toastify';
import { LOGIN, setUser, SIGN_UP, setSignUpSuccess, setLoginFailure } from '../store/actions';
import { API_BASE_URL } from '../constants';


const authentification = (store) => (next) => async (action) => {
    switch (action.type) {
        case SIGN_UP: {
            const { name, email, password, password2, role } = action.payload;
            try {
                const { data } = await axios.post(`${API_BASE_URL}/signup`, {
                    name,
                    email,
                    role,
                    password,
                    password2
                });
                store.dispatch(setUser(data));
                // Store the user in localStorage
                // Local storage only supports string datatype
                localStorage.setItem('loggedInUser', JSON.stringify({...data, connectedAt: new Date()}));
                // If there is token it means that signup was successful
                if (data.token) {
                    store.dispatch(setSignUpSuccess(true));
                }
            } catch (error) {
                console.log(error);
                let errorMessage;
                toast.error(`Error. ${errorMessage}`, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            break;
        }
        case LOGIN: {
            const { email, password } = action.payload;
            try {
                const { data } = await axios.post(`${API_BASE_URL}/login`, {
                    email,
                    password,
                });
                store.dispatch(setUser(data));
                // Store the user in localStorage
                // Local storage only supports string datatype
                localStorage.setItem('loggedInUser', JSON.stringify({...data, connectedAt: new Date()}));
            } catch (error) {
                console.log(error);
                store.dispatch(setLoginFailure(true));
            }
            break;
        }
        default:
            next(action);
            break;
    }
};

export default authentification;