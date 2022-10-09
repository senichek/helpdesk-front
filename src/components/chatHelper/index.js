import { useDispatch, useSelector } from 'react-redux';
import { setInputMsg, setRecipient } from '../../store/actions';
import uuid from 'react-uuid';
import './style.scss';

const HelperChat = ({ sendMsg }) => {
    debugger

    const chatUsers = useSelector((state) => state.user.connectedChatUsers);
    const messages = useSelector((state) => state.user.messages);
    const inputMsg = useSelector((state) => state.user.inputMsg);


    const dispatch = useDispatch();


    const handleRecipient = (userId) => {
        dispatch(setRecipient(userId));
    }

    const handleInputChange = (event) => {
        dispatch(setInputMsg(event.target.value));
    }

    const handleSendMsg = () => {
        //TODO добавить проверки что сообщение не ноль
        const message = {
            id: uuid(),
            text: inputMsg,
            date: new Date()
        }
        sendMsg(message);
    }

    return (
        <div className="helper-chat">
            <div className="helper-chat__list_of_users">
                {chatUsers.map(usr => (
                    <div className="helper-chat__user_name" key={usr.userId} onClick={() => handleRecipient(usr.userId)} >{usr.userId}</div>
                ))}
            </div>
            <div className="helper-chat__working_zone">
            <div className="helper-chat__messages">
                {messages.map(msg => (<div className="helper-chat__single_msg" key={msg.id}>
                    {msg.text}
                </div>))}
            </div>
            <textarea className="helper-chat__text_input" rows="5" cols="33" onChange={handleInputChange} defaultValue={inputMsg}></textarea>
            <button className="helper-chat__send_btn" onClick={handleSendMsg}>Send</button>
            </div>
        </div>
    );
};

export default HelperChat;