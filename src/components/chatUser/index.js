import { useDispatch, useSelector } from 'react-redux';
import { setInputMsg } from '../../store/actions';
import uuid from 'react-uuid';
import { ThreeDots } from  'react-loader-spinner'
import { useRef, useEffect } from 'react';
import './style.scss';
import { dateFormatter } from '../../utils/dateFormatter';


const UserChat = ({ sendMsg }) => {

    const inputMsg = useSelector((state) => state.user.inputMsg);
    const messages = useSelector((state) => state.user.messages);
    const helperConnected = useSelector((state) => state.user.helperConnected);
    const helperJoinedYourChat = useSelector((state) => state.user.helperJoinedYourChat);
    const loggedInUser = useSelector((state) => state.user);
    const chatUsers = useSelector((state) => state.user.connectedChatUsers);

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

    const handleInputChange = (event) => {
        dispatch(setInputMsg(event.target.value));
    }

    const handleSendMsg = () => {
        const message = {
            id: uuid(),
            text: inputMsg,
            date: new Date(),
            author: loggedInUser.id,
            // Chat always belongs to the user (not to the helper).
            // If you are logged in as 'helper' the chatID = recipient.
            // If you are logged in as @user' the chatID = loggedInUser.id.
            chatId: loggedInUser.id
        }
        sendMsg(message);
        dispatch(setInputMsg(''));
    }

    const onEnterPress = (event) => {
        if(event.keyCode === 13 && event.shiftKey === false) {
            event.preventDefault();
            handleSendMsg();
        }
    }

 return (
    <>
        {!helperConnected && <div className="user-chat__no_helpers">Chat is unavailable because the helpers are offline, sorry about that.</div>}
        {(!helperJoinedYourChat && helperConnected) && 
        (
            <>
            <div>The helper will contact you soon. thanks for your patience.</div>
                <ThreeDots 
                    height="80" 
                    width="80" 
                    radius="9"
                    color="#fff" 
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        width: '10%'
                    }}
                    wrapperClassName=""
                    visible={true}
                />
            </>
            )
        }
        {(helperJoinedYourChat && helperConnected) &&
                <div className="user-chat">
                    <div className="user-chat__messages">
                        {messages.map(msg => (
                        <div className={loggedInUser.id !== msg.author ? 'user-chat__single_msg_not_yours' : 'user-chat__single_msg'} key={msg.id} ref={messageRef}>
                            <div className="user-chat__single_msg_author">From: {chatUsers.find(el => el.userId === msg.author).nickname}</div>
                            <div className="user-chat__single_msg_txt">{msg.text}</div>
                            <div className="user-chat__single_msg_date">{dateFormatter(msg.date)}</div>
                        </div>
                        ))}
                    </div>
                        <textarea className="user-chat__text_input" rows="5" cols="33" onChange={handleInputChange} value={inputMsg} onKeyDown={onEnterPress}></textarea>
                        <button className="user-chat__send_btn" onClick={handleSendMsg}>Send</button>
                </div>
        }
    </>
);

};

export default UserChat;
