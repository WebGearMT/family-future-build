import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';



interface ChatHeaderProps {
  chatroomName: string;
  onBackToChatrooms: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  chatroomName, 
  onBackToChatrooms 
}) => {
  return (
    <div className="bg-background border-b border-border px-6 py-4">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBackToChatrooms}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Chatrooms
        </Button>
      </div>
      <h1 className="text-2xl font-bold text-foreground mt-2">
        {chatroomName}
      </h1>
    </div>
  );
};
