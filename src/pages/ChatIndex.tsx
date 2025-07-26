import React from 'react';
import { ChatLayout, ChatRoom } from '@/components/chat/ChatLayout';

const Index = () => {
  const handleBackToChatrooms = () => {
    console.log('Navigate back to chatrooms');
  };

  // Mock chatroom data - this would come from your dashboard/API
  const mockChatroom: ChatRoom = {
    id: 'room-1',
    name: 'All Things Shipping',
    description: 'This chatroom is for discussing shipping.',
    rules: [
      'No bashing',
      'No politics', 
      'No religious discussions',
      'Be respectful',
      'No advertising'
    ],
    moderators: [
      { id: '1', name: 'Alan MacKenzie' },
      { id: '2', name: 'Nicole Veldsman' }
    ],
    isModerator: true
  };

  return (
    <ChatLayout 
      chatroom={mockChatroom}
      onBackToChatrooms={handleBackToChatrooms}
    />
  );
};

export default Index;
