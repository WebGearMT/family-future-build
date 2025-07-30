import React from 'react';
import { ContactsButton } from './ContactsButton';
import { OnlineStatus } from './OnlineStatus';
import { OnlineUsersList } from './OnlineUsersList';

export const ChatRightSidebar: React.FC = () => {
  return (
    <div className="w-64 bg-chat-sidebar border-l border-border flex flex-col">
      <div className="p-4 space-y-4">
        {/* Contacts Button */}
        <ContactsButton />
        
        {/* Online Status */}
        <OnlineStatus />
        
        {/* Online Users List */}
        <OnlineUsersList />
      </div>
    </div>
  );
};