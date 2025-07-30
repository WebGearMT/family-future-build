import React, {useState, useEffect} from 'react';

interface ChatMessagesProps {
  chatroomId: string;
}

interface QuestionnaireProps {
  chatroomId: string;
}

interface PollProps {
  chatroomId: string;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ chatroomId }) => {
  const [messageToDisplay, setMessageToDisplay] = useState('');
  const [poll, setPoll] = useState([]);
  const [questionnaire, setQuestionnaire] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState({
    messages: false,
    polls: false,
    questionnaires: false
  });
  
// Helper function to update loading state
const setLoadingState = (key: keyof typeof loading, value: boolean) => {
  setLoading(prev => ({ ...prev, [key]: value }));
};

// Messages handler with simplified error handling
useEffect(() => {
  const handleDisplayMessages = async () => {
    try {
      setLoadingState('messages', true);
      setError('');
      
      console.log('Message data:', messageToDisplay);
      
      const response = await fetch("../../server/api.php/messages");
      console.log("response pre-await: ", response);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log("response post-await: ", response);
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      setMessageToDisplay(result);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to fetch messages';
      console.error('Error fetching messages:', errorMsg);
      setError(errorMsg);
    } finally {
      setLoadingState('messages', false);
    }
  };
  
  handleDisplayMessages();
}, [poll]);

// Poll handler with simplified error handling
useEffect(() => {
  const handleDisplayPoll = async () => {
    try {
      setLoadingState('polls', true);
      setError('');
      
      console.log('Poll data:', poll);
      
      const response = await fetch("../../server/api.php?table=polls");
      console.log("response pre-await: ", response);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log("response post-await: ", response);
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      setPoll(result);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to fetch polls';
      console.error('Error fetching polls:', errorMsg);
      setError(errorMsg);
    } finally {
      setLoadingState('polls', false);
    }
  };
  
  handleDisplayPoll();
}, [poll]);

// Questionnaire handler with simplified error handling
useEffect(() => {
  const handleDisplayQuestionnaire = async () => {
    try {
      setLoadingState('questionnaires', true);
      setError('');
      
      console.log('Questionnaire data:', questionnaire);
      
      const response = await fetch("../../server/api.php?table=questionnaires");
      console.log("response pre-await: ", response);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log("response post-await: ", response);
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      setQuestionnaire(result);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to fetch questionnaires';
      console.error('Error fetching questionnaires:', errorMsg);
      setError(errorMsg);
    } finally {
      setLoadingState('questionnaires', false);
    }
  };
  
  handleDisplayQuestionnaire();
}, [questionnaire]);
  
  return (
    <div className="flex-1 p-4 overflow-y-auto">
      {/* Messages will be displayed here */}
      <div className="text-center text-muted-foreground mt-8">
        {messageToDisplay ? <div>{messageToDisplay}</div> : <div /> }
        {poll ? <div>{poll}</div> : <div /> }
        {questionnaire ? <div>{questionnaire}</div> : <div /> }
      </div>
    </div>
  );
};
