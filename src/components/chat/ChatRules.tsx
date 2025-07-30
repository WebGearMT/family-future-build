import React from 'react';

interface ChatRulesProps {
  rules: string[];
}

export const ChatRules: React.FC<ChatRulesProps> = ({ rules }) => {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-chat-sidebar-foreground">
        Chat Rules
      </h3>
      <div className="space-y-1">
        {rules.map((rule, index) => (
          <div key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="text-foreground">•</span>
            <span>{rule}</span>
          </div>
        ))}
      </div>
    </div>
  );
};