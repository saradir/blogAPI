import "../styles/MessageBox.css"
function MessageBox({message}){
    return (
        message ? (
        <div className={`message-container ${message.type}`}>
            {message.text}
        </div>
        ) : null
    );
}

export default MessageBox;