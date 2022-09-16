import { useDispatch, useSelector } from 'react-redux';
import { getSimpleUsers } from '../../store/actions';
import { useEffect } from 'react';
import './style.scss';

const HelperChat = () => {

    const users = useSelector((state) => state.user.listOfSimpleUsers);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSimpleUsers());
    }, []);

    const sendMessage = () => {
        alert("Send msg");
    }

    return (
        <div className="helper-chat">
            <div className="helper-chat__working-zone">
                <div className="helper-chat__users-list">
                    {users.map(user => (
                        <div className="helper-chat__user-name" key={user.id}>{user.name}</div>
                        ))}
                </div>
                <div className="helper-chat__message-area">
                <div className="helper-chat__messages">
                    <div className="helper-chat__message">Test message</div>
                    <div className="helper-chat__message">Test message</div>
                    <div className="helper-chat__message">Test message</div>
                    <div className="helper-chat__message">Test message</div>
                    <div className="helper-chat__message">Test message</div>
                    <div className="helper-chat__message">Test message</div>
                    <div className="helper-chat__message">Test message</div>
                    <div className="helper-chat__message">Test message</div>
                </div>
                <textarea className="helper-chat__message" id="helper-chat__message" name="helper-chat__message" rows="4" cols="50"></textarea>
                </div>
            </div>
            <div className="helper-chat__btn-area">
                
                <button type="button" onClick={sendMessage}>Send message</button>
            </div>
        </div>
    );
};

export default HelperChat;