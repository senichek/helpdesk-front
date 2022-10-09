import { useDispatch, useSelector } from 'react-redux';
import { setInputMsg } from '../../store/actions';
import uuid from 'react-uuid';

const UserChat = ({ sendMsg }) => {

    const inputMsg = useSelector((state) => state.user.inputMsg);
    const messages = useSelector((state) => state.user.messages);

    const dispatch = useDispatch();

    const handleInputChange = (event) => {
        dispatch(setInputMsg(event.target.value));
    }

    const handleSendMsg = () => {
        const message = {
            id: uuid(),
            text: inputMsg,
            date: new Date()
        }
        sendMsg(message);
    }

    return (
        <div className="user-chat">
            <div className="user-chat__messages">
                {messages.map(msg => (<div className="user-chat__single_msg" key={msg.id}>
                    {msg.text}
                </div>))}
            </div>
            <textarea className="user-chat__text_input" rows="5" cols="33" onChange={handleInputChange} defaultValue={inputMsg}></textarea>
            <button className="user-chat__send_btn" onClick={handleSendMsg}>Send</button>
        </div>
    );
};

export default UserChat;
