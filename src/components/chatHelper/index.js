import { useDispatch, useSelector } from 'react-redux';
import { setInputMsg, setRecipient } from '../../store/actions';
import { useRef, useEffect } from 'react';
import uuid from 'react-uuid';
import './style.scss';
import { dateFormatter } from '../../utils/dateFormatter';

const HelperChat = ({ sendMsg }) => {

    const chatUsers = useSelector((state) => state.user.connectedChatUsers);
    const messages = useSelector((state) => state.user.messages);
    const inputMsg = useSelector((state) => state.user.inputMsg);
    const loggedInUser = useSelector((state) => state.user);

    const messageRef = useRef(null);

    // Scroll the list of messages to the last message automatically.
    useEffect(() => {
        if (messageRef.current) {
            messageRef.current.scrollIntoView(
              {
                behavior: 'smooth',
                block: 'end',
              })
          }
    }, [messages])

    const dispatch = useDispatch();

    const handleRecipient = (userId) => {
        dispatch(setRecipient(userId));
    }

    const handleInputChange = (event) => {
        dispatch(setInputMsg(event.target.value));
    }

    const handleSendMsg = () => {
        const message = {
            id: uuid(),
            text: inputMsg,
            date: new Date(),
            author: loggedInUser.id
        }
        sendMsg(message);
    }

    return (
        <div className="helper-chat">
            <div className="helper-chat__list_of_users">
                {chatUsers.map(usr => (
                    usr.role === 'user' && 
                    <div className="helper-chat__user_name" key={usr.userId} onClick={() => handleRecipient(usr.userId)} >{usr.userId}</div>
                ))}
            </div>
            <div className="helper-chat__working_zone">
            <div className="helper-chat__messages">
                {messages.map(msg => (
                <div className={loggedInUser.id !== msg.author ? 'helper-chat__single_msg_not_yours' : 'helper-chat__single_msg'} key={msg.id} ref={messageRef}>
                    <div className="helper-chat__single_msg_author">From: {msg.author}</div>
                    <div className="helper-chat__single_msg_txt">{msg.text}</div>
                    <div className="helper-chat__single_msg_date">{dateFormatter(msg.date)}</div>
                </div>
                ))}
            </div>
            <textarea className="helper-chat__text_input" rows="5" cols="33" onChange={handleInputChange} defaultValue={inputMsg}></textarea>
            <button className="helper-chat__send_btn" onClick={handleSendMsg}>Send</button>
            </div>
        </div>
    );
};

export default HelperChat;