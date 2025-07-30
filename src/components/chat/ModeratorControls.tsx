import React from 'react';
//import { ModeratorsList } from './ModeratorsList';

export const ModeratorControls: React.FC = () => {
  // This will be shown only to moderators
  const currentUser = sessionStorage.getItem("name");
  
  if (!currentUser) {
  // Handle case where name is not in session storage
  	console.log("No user name found in session storage");
  }
  
  const ModeratorsList = [
  	{ id: '1', name: 'Alan MacKenzie' },
    { id: '2', name: 'Nicole Veldsman' },
    { id: '2', name: 'Mathys Taljaard' }
  ];
  
  if (!Object.values(ModeratorsList).includes(currentUser)) { 
  	return (
    	<div className="pt-4 border-t border-border" />
  	);
  } else {
  	return (
  		<div className="pt-4 border-t border-border">
	      <button className="text-sm text-chat-moderator hover:underline">
    	    Turn off Chat
    	  </button>
    	</div>
  	);
  }
};
