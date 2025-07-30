import React from 'react';
import { ChatRoomInfo } from './ChatRoomInfo';
import { ModeratorsList } from './ModeratorsList';
import { ChatRules } from './ChatRules';
import { ModeratorControls } from './ModeratorControls';
import { ChatRoom } from './ChatLayout';

interface ChatLeftSidebarProps {
  chatroom: ChatRoom;
}

export const ChatLeftSidebar: React.FC<ChatLeftSidebarProps> = ({ chatroom }) => {
  return (
    <div className="w-64 bg-chat-sidebar border-r border-border flex flex-col">
      <div className="p-4 space-y-6">
        {/* Chatroom Information */}
        <ChatRoomInfo 
          name={chatroom.name}
          description={chatroom.description}
        />
        
        {/* Moderators List */}
        <ModeratorsList moderators={chatroom.moderators} />
        
        {/* Chat Rules */}
        <ChatRules rules={chatroom.rules} />
        
        {/* Moderator Controls */}
        {chatroom.isModerator && <ModeratorControls />}
      </div>
    </div>
  );
};