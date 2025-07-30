import React from 'react';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';

interface ChatAreaProps {
  chatroomId: string;
}

export const ChatArea: React.FC<ChatAreaProps> = ({ chatroomId }) => {
  return (
    <div className="flex-1 flex flex-col bg-chat-main">
      {/* Messages Area */}
      <ChatMessages chatroomId={chatroomId} />
      
      {/* Input Area */}
      <ChatInput chatroomId={chatroomId} />
    </div>
  );
};