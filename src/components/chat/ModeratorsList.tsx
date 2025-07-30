import React from 'react';
import { Moderator } from './ChatLayout';

interface ModeratorsListProps {
  moderators: Moderator[];
}

export const ModeratorsList: React.FC<ModeratorsListProps> = ({ moderators }) => {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-chat-sidebar-foreground">
        Moderators
      </h3>
      <div className="space-y-1">
        {moderators.map((moderator) => (
          <div key={moderator.id} className="text-sm text-primary">
            {moderator.name}
          </div>
        ))}
      </div>
    </div>
  );
};