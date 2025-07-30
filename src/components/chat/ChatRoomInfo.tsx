import React from 'react';

interface ChatRoomInfoProps {
  name: string;
  description: string;
}

export const ChatRoomInfo: React.FC<ChatRoomInfoProps> = ({ name, description }) => {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-chat-sidebar-foreground">
        {name}
      </h3>
      <p className="text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
};