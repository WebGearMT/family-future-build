import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface OnlineUser {
  id: string;
  name: string;
  joinedAt: Date;
}

interface OnlineUsersContextType {
  onlineUsers: OnlineUser[];
  onlineCount: number;
  addUser: (user: Omit<OnlineUser, 'joinedAt'>) => void;
  removeUser: (userId: string) => void;
  isUserOnline: (userId: string) => boolean;
}

const OnlineUsersContext = createContext<OnlineUsersContextType | undefined>(undefined);

interface OnlineUsersProviderProps {
  children: ReactNode;
  chatroomId: string;
}

export const OnlineUsersProvider: React.FC<OnlineUsersProviderProps> = ({ children, chatroomId }) => {
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([
    { id: '1', name: 'Alan MacKenzie', joinedAt: new Date() },
    { id: '2', name: 'Nicole Veldsman', joinedAt: new Date() },
    { id: '3', name: 'Mathys Taljaard', joinedAt: new Date() },
  ]);

  // Simulate users coming online and going offline for demonstration
  useEffect(() => {
    const mockUsers = [
      { id: '4', name: 'Sarah Johnson' },
      { id: '5', name: 'Mike Chen' },
      { id: '6', name: 'Emma Wilson' },
      { id: '7', name: 'David Brown' },
      { id: '8', name: 'Lisa Garcia' },
    ];

    const interval = setInterval(() => {
      const randomAction = Math.random();
      
      if (randomAction > 0.6 && mockUsers.length > 0) {
        // Add a random user
        const randomIndex = Math.floor(Math.random() * mockUsers.length);
        const userToAdd = mockUsers[randomIndex];
        
        setOnlineUsers(prev => {
          if (!prev.find(u => u.id === userToAdd.id)) {
            return [...prev, { ...userToAdd, joinedAt: new Date() }];
          }
          return prev;
        });
      } else if (randomAction < 0.3) {
        // Remove a random user (but keep at least 1 user online)
        setOnlineUsers(prev => {
          if (prev.length > 1) {
            const randomIndex = Math.floor(Math.random() * prev.length);
            return prev.filter((_, index) => index !== randomIndex);
          }
          return prev;
        });
      }
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const addUser = (user: Omit<OnlineUser, 'joinedAt'>) => {
    setOnlineUsers(prev => {
      if (!prev.find(u => u.id === user.id)) {
        return [...prev, { ...user, joinedAt: new Date() }];
      }
      return prev;
    });
  };

  const removeUser = (userId: string) => {
    setOnlineUsers(prev => prev.filter(user => user.id !== userId));
  };

  const isUserOnline = (userId: string) => {
    return onlineUsers.some(user => user.id === userId);
  };

  const value = {
    onlineUsers,
    onlineCount: onlineUsers.length,
    addUser,
    removeUser,
    isUserOnline,
  };

  return (
    <OnlineUsersContext.Provider value={value}>
      {children}
    </OnlineUsersContext.Provider>
  );
};

export const useOnlineUsers = () => {
  const context = useContext(OnlineUsersContext);
  if (context === undefined) {
    throw new Error('useOnlineUsers must be used within an OnlineUsersProvider');
  }
  return context;
};
