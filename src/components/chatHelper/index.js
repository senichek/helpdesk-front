import { useDispatch, useSelector } from 'react-redux';
import { getSimpleUsers } from '../../store/actions';
import { useEffect } from 'react';
import { setRecipient } from '../../store/actions';
import './style.scss';
import Chat from '../chat';

const HelperChat = () => {

    const chatUsers = useSelector((state) => state.user.connectedChatUsers);
    const loggedInUser = useSelector((state) => state.user);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSimpleUsers());
    }, []);

    const handleRecipient = (userId) => {
        dispatch(setRecipient(userId));
    }

    return (
        <div className="helper-chat">
            <div className="helper-chat__working-zone">
                <div className="helper-chat__users-list">
                    {chatUsers.map(user => (
                        user.userId === loggedInUser.id ? null :
                        <div className="helper-chat__user-name" key={user.socketId} onClick={() => handleRecipient(user.userId)} >{user.userId}</div>
                        ))}
                </div>
                <Chat />
            </div>
        </div>
    );
};

export default HelperChat;