const UserChat = () => {

    const sendMessage = () => {

    };

    return (
        <div className="user-chat">
            <div className="user-chat__working-zone">
                <div className="user-chat__helper-card">
                    Help name
                </div>
                <div className="user-chat__message-area">
                <div className="user-chat__messages">
                    <div className="user-chat__message">Test message</div>
                    <div className="user-chat__message">Test message</div>
                    <div className="user-chat__message">Test message</div>
                    <div className="user-chat__message">Test message</div>
                    <div className="user-chat__message">Test message</div>
                    <div className="user-chat__message">Test message</div>
                    <div className="user-chat__message">Test message</div>
                    <div className="user-chat__message">Test message</div>
                </div>
                <textarea className="user-chat__message" id="user-chat__message" name="user-chat__message" rows="4" cols="50"></textarea>
                </div>
            </div>
            <div className="user-chat__btn-area">
                
                <button type="button" onClick={sendMessage}>Send message</button>
            </div>
        </div>
    );
};

export default UserChat;
