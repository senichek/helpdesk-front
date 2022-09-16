import axios from 'axios';
import { toast } from 'react-toastify';
import { GET_SIMPLE_USERS, setSimpleUsers } from '../store/actions';
import { API_BASE_URL } from '../constants';


const userCrud = (store) => (next) => async (action) => {
    switch (action.type) {
        case GET_SIMPLE_USERS: {
            try {
                const { data } = await axios.get(`${API_BASE_URL}/users`, {
                    headers: {
                        Authorization: `Bearer ${store.getState().user.token}`
                    }
                });
                store.dispatch(setSimpleUsers(data));
            } catch (error) {
                console.log(error);
            }
            break;
        }
        default:
            next(action);
            break;
    }
};

export default userCrud;