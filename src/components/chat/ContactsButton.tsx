import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import ContactsModal  from './ContactsModal';

// Sample contacts data - replace with your actual data source
const sampleContacts = [
  { id: 1, name: 'John Doe', status: 'online' as const },
  { id: 2, name: 'Jane Smith', status: 'away' as const, lastSeen: '2 hours ago' },
  { id: 3, name: 'Bob Johnson', status: 'offline' as const, lastSeen: 'yesterday' },
  { id: 4, name: 'Alice Williams', status: 'online' as const },
  { id: 5, name: 'Mike Brown', status: 'offline' as const, lastSeen: '3 days ago' }
];

export const ContactsButton: React.FC = () => {
  const [isContactsModalOpen, setIsContactsModalOpen] = useState(false);

  const handleContactsClick = () => {
    setIsContactsModalOpen(true);
    console.log('Show contacts overlay');
  };

  const handleContactSelect = (contact: any) => {
    console.log('Selected contact:', contact);
    // Add your logic here for when a contact is selected
    // For example: start a chat, navigate to profile, etc.
  };

  return (
    <>
      <Button 
        onClick={handleContactsClick}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
      >
        Contacts
      </Button>

      <ContactsModal
        isOpen={isContactsModalOpen}
        onClose={() => setIsContactsModalOpen(false)}
        contacts={sampleContacts}
        onContactSelect={handleContactSelect}
      />
    </>
  );
};
