import React, { FormEventHandler, ChangeEventHandler } from 'react';
import "../../app/globals.css";
import socket from '../../socket';

interface ChatFooterProps {
  textMessage: string;
  handleSendMessage: FormEventHandler<HTMLFormElement>;
  handleOnchange: ChangeEventHandler<HTMLInputElement>
}

const ChatFooter: React.FC<ChatFooterProps> = (props) => {
  return (
    <div className="chat__footer">
      <form className="form" onSubmit={props.handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={props.textMessage}
          onChange={props.handleOnchange}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;