import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CHAT_SERVER_URL } from '../../constants';
import { setConnectedChatUsers } from '../../store/actions';
import io from 'socket.io-client';
import uuid from 'react-uuid';
import './style.scss';

// Private messaging:   https://socket.io/get-started/private-messaging-part-1/

const Chat = () => {

    const loggedInUser = useSelector((state) => state.user);

    let socket = useRef(null);

    // By the default the recipient = ID of the logged-in user. All the
    // users join their own room by default (room = userId)
    const recipient = useSelector((state) => state.user.recipient);

    const dispatch = useDispatch();

    const [inputMessage, setInputMessage] = useState("");
    const [messages, setMessages] = useState([]);
    
    useEffect(() => {
        socket.current = io(CHAT_SERVER_URL, { autoConnect: false });
        socket.current.auth = { 
            username: loggedInUser.id,
            role: loggedInUser.role
        };
        socket.current.connect();

        socket.current.on("connected_chat_users", (users) => {
            debugger
            console.log("Connected chat users >>>", users);
            dispatch(setConnectedChatUsers(users));
            });

        return () => {
            socket.current.off('connected_chat_users');
            socket.current.disconnect();
            };
    }, []);

    useEffect(() => {
        // If recipient changes, we join another room i.e. the room
        // of new recipient (recipient = room)
        if (recipient) {
            socket.current.emit('join_room', recipient);
        }

        return () => {
            socket.current.off('join_room');
            };

    }, [recipient])

    useEffect(() => {
        socket.current.on('receive_msg', (message) => {
            setMessages([...messages, message]);
        });

        return () => {
            socket.current.off('receive_msg');
            };

    }, [messages])

    const handleInputChange = (event) => {
        setInputMessage(event.target.value);
    }

    const sendMessage = () => {
        const msg = {
            id: uuid(),
            sender: loggedInUser.name,
            text: inputMessage
        }
        // Prevent sending empty strings
        if (!inputMessage || inputMessage === "") {
            return;
        }
        setMessages([...messages, msg]);
        socket.current.emit('send_msg', msg, recipient); // recipient = room
        setInputMessage("");
    }

    return (
        <div className="chat">
            <div className="chat__working-zone">
                <div className="chat__message-area">
                <div className="chat__messages">
                <p>Connected to the room: {recipient}</p>
                    {messages.map(msg => (
                        <div className="chat__message" key={msg.id}>
                            <div className="chat__message__sender">{msg.sender}</div>
                            <div className="chat__message__text">{msg.text}</div>
                        </div>
                    ))}
                </div>
                <textarea
                    className="chat__message" 
                    id="chat__message"
                    name="chat__message"
                    rows="4"
                    cols="50"
                    value={inputMessage}
                    onChange={handleInputChange}></textarea>
                </div>
            </div>
            <div className="chat__btn-area">
                <button type="button" onClick={sendMessage}>Send message</button>
            </div>
        </div>
    );
}

export default Chat;
