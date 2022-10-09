import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CHAT_SERVER_URL } from '../../constants';
import { setConnectedChatUsers, setMsg } from '../../store/actions';
import io from 'socket.io-client';
import uuid from 'react-uuid';
import './style.scss';
import UserChat from '../chatUser';
import HelperChat from '../chatHelper';

// Private messaging:   https://socket.io/get-started/private-messaging-part-1/

const Chat = () => {

    const loggedInUser = useSelector((state) => state.user);

    let socket = useRef(null);

    // By the default the recipient = ID of the logged-in user. All the
    // users join their own room by default (room = userId)
    const recipient = useSelector((state) => state.user.recipient);
    const messages = useSelector((state) => state.user.messages);

    const dispatch = useDispatch();
    
    useEffect(() => {
        socket.current = io(CHAT_SERVER_URL, { autoConnect: false });
        socket.current.auth = { 
            username: loggedInUser.id,
            role: loggedInUser.role
        };
        socket.current.connect();

        socket.current.on("connected_chat_users", (users) => {
            console.log("Connected chat users >>>", users);
            debugger
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
            const msg = {
                id: uuid(),
                text: message,
                date: new Date()
            }
            dispatch(setMsg(msg)); // Add message to the collection of existing ones
        });

        return () => {
            socket.current.off('receive_msg');
            };

    }, [messages])

    const sendMessage = (msg) => {
        if (msg.text === null || msg.text === '') {
            return;
        }

        socket.current.emit('send_msg', msg.text, recipient);

        const message = {
            id: uuid(),
            text: msg.text,
            date: new Date()
        }
        dispatch(setMsg(message)); // Add message to the collection of existing ones

        return () => {
            socket.current.off('receive_msg');
            };
    }

    return (
        <div className="chat">
            {loggedInUser.role === 'user' && <UserChat sendMsg={sendMessage} />}
            {loggedInUser.role === 'helper' && <HelperChat sendMsg={sendMessage} />}
        </div>
    );
}

export default Chat;
