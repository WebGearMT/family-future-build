import React from 'react';
import { ChatHeader } from './ChatHeader';
import { ChatLeftSidebar } from './ChatLeftSidebar';
import { ChatRightSidebar } from './ChatRightSidebar';
import { ChatArea } from './ChatArea';
import { OnlineUsersProvider } from '@/contexts/OnlineUsersContext';

export interface Moderator {
  id: string;
  name: string;
}

export interface ChatRoom {
  id: string;
  name: string;
  description: string;
  rules: string[];
  moderators: Moderator[];
  isModerator?: boolean;
}

interface ChatLayoutProps {
  chatroom: ChatRoom;
  onBackToChatrooms: () => void;
}

export const ChatLayout: React.FC<ChatLayoutProps> = ({ 
  chatroom, 
  onBackToChatrooms 
}) => {
  return (
    <OnlineUsersProvider chatroomId={chatroom.id}>
      <div className="h-screen flex flex-col">
        {/* Chat Header */}
        <ChatHeader 
          chatroomName={chatroom.name}
          onBackToChatrooms={onBackToChatrooms}
        />
        
        {/* Main Chat Layout */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar */}
          <ChatLeftSidebar 
            chatroom={chatroom}
          />
          
          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col">
            <ChatArea chatroomId={chatroom.id} />
          </div>
          
          {/* Right Sidebar */}
          <ChatRightSidebar />
        </div>
      </div>
    </OnlineUsersProvider>
  );
};