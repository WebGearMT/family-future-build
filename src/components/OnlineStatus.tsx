import React from 'react';
import { useOnlineUsers } from '@/contexts/OnlineUsersContext';

export const OnlineStatus: React.FC = () => {
  const { onlineCount } = useOnlineUsers();
  const isOnline = onlineCount > 0;
  
  return (
    <div className="flex items-center gap-2">
      <div 
        className={`w-2 h-2 rounded-full transition-colors duration-300 ${
          isOnline ? 'bg-chat-online' : 'bg-chat-offline'
        }`}
      />
      <span className="text-sm font-medium text-foreground transition-all duration-300">
        {onlineCount} Online
      </span>
    </div>
  );
};