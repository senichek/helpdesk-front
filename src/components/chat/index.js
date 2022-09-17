import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CHAT_SERVER_URL } from '../../constants';
import { setConnectedChatUsers } from '../../store/actions';
import io from 'socket.io-client';

// Private messaging:   https://socket.io/get-started/private-messaging-part-1/

const Chat = () => {

    const loggedInUser = useSelector((state) => state.user);

    const socket = io(CHAT_SERVER_URL, { autoConnect: false });

    const recipient = useSelector((state) => state.user.recipient);

    const dispatch = useDispatch();

    useEffect(() => {
        
        socket.auth = { username: loggedInUser.id };
        socket.connect();

        socket.on("connected_chat_users", (users) => {
            console.log("Connected chat users >>>", users);
            dispatch(setConnectedChatUsers(users));
            });

            return () => {
                socket.off('connected_chat_users');
              };
    }, []);

    const sendMessage = () => {

    }

    return (
        <div className="chat">
            <div className="chat__working-zone">
                <div className="chat__message-area">
                <div className="chat__messages">
                <p>You are talking to: {recipient}</p>
                    <div className="chat__message">Test message</div>
                    <div className="chat__message">Test message</div>
                    <div className="chat__message">Test message</div>
                    <div className="chat__message">Test message</div>
                    <div className="chat__message">Test message</div>
                    <div className="chat__message">Test message</div>
                    <div className="chat__message">Test message</div>
                    <div className="chat__message">Test message</div>
                </div>
                <textarea className="chat__message" id="chat__message" name="chat__message" rows="4" cols="50"></textarea>
                </div>
            </div>
            <div className="chat__btn-area">
                <button type="button" onClick={sendMessage}>Send message</button>
            </div>
        </div>
    );
}

export default Chat;
