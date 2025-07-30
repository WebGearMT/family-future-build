import React from 'react';
import { useOnlineUsers } from '@/contexts/OnlineUsersContext';

export const OnlineUsersList: React.FC = () => {
  const { onlineUsers } = useOnlineUsers();

  // Sort users by join time (most recent first)
  const sortedUsers = [...onlineUsers].sort((a, b) => 
    b.joinedAt.getTime() - a.joinedAt.getTime()
  );

  return (
    <div className="space-y-2 max-h-60 overflow-y-auto">
      {sortedUsers.map((user) => (
        <div 
          key={user.id} 
          className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-all duration-200 transform hover:translate-x-1"
          title={`Joined at ${user.joinedAt.toLocaleTimeString()}`}
        >
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-chat-online rounded-full animate-pulse" />
            {user.name}
          </div>
        </div>
      ))}
      
      {onlineUsers.length === 0 && (
        <div className="text-sm text-muted-foreground italic">
          No users online
        </div>
      )}
    </div>
  );
};