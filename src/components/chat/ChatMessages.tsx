import React, {useState, useEffect} from 'react';
import { ChatMessage, TypeChatMessage } from './ChatMessage';
import { TypePoll } from './PollCreator';
import { TypeQuestionnaire } from './QuestionnaireCreator';
import { perform_validated_GET_request, displayErrorMsg } from '../../utils/asyncTools';


interface ChatMessagesProps {
  chatroomId: string;
  message: TypeChatMessage[];
  chatPoll: TypePoll;
  chatQuestionnaie: TypeQuestionnaire;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ chatroomId }) => {
  const [messageToDisplay, setMessageToDisplay] = useState<TypeChatMessage[]>([]);
  const [poll, setPoll] = useState<TypePoll[]>([]);
  const [questionnaire, setQuestionnaire] = useState<TypeQuestionnaire[]>([]);
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
  const handleDisplayMessages =  async (): Promise<void> => {
    try {
    	// Show a loading animation
      setLoadingState('messages', true);
      setError('');
      
      console.log('Message data:', messageToDisplay);
      
      // Perform a request, validate it, parse it and store the result.
      const messages = await perform_validated_GET_request(undefined, "messages");
      const data = await messages.json();
    
    // Validate response format
    if (!Array.isArray(data)) {
      throw new Error("Invalid response format: Expected array of messages");
    }
    
    // Update messages state
    setMessageToDisplay(data);
      
    // Handle any errors returned by the function and stop the loading animation.
    } catch (error: any) {
      	const errorMsg = displayErrorMsg(error, "messages");
      	setError(errorMsg);
        return Promise.resolve();
    } finally {
      setLoadingState('messages', false);
    }
  };


// Poll handler with simplified error handling
useEffect(() => {
  const handleDisplayPoll = async (): Promise<void> => {
    try {
    	// Show a loading animation
      setLoadingState('polls', true);
      setError('');
      
      console.log('Poll data:', poll);
      
      // Perform a request, validate it, parse it and store the result.
      const pollToSend = await perform_validated_GET_request(undefined, "polls");
      const data = await pollToSend.json();
      // Update the message state with the result returned.
      setPoll([data]);
      
    // Handle any errors returned by the function and stop the loading animation.
    } catch (error: any) {
      	const errorMsg = displayErrorMsg(error, "poll");
      	setError(errorMsg);
    } finally {
      setLoadingState('polls', false);
    }
  };
  
  const controller = new AbortController();
  
  handleDisplayPoll();
  controller.abort();
}, [poll]);


// Questionnaire handler with simplified error handling
useEffect(() => {
  const handleDisplayQuestionnaire = async (): Promise<void> => {
    try {
    	// Show a loading animation
      setLoadingState('questionnaires', true);
      setError('');
      
      console.log('Questionnaire data:', questionnaire);
      
      // Perform a request, validate it, parse it and store the result.
      const questionnaieToSend = await perform_validated_GET_request(undefined, "questionnaires");
      const data = await questionnaieToSend.json();
      
      // Update the message state with the result returned.
      setQuestionnaire(data);
      
    // Handle any errors returned by the function and stop the loading animation.
    } catch (error: any) {
      	const errorMsg = displayErrorMsg(error, "questionnaire");
      	setError(errorMsg);
    } finally {
      setLoadingState('polls', false);
    }
  };
  
  const controller = new AbortController();
  
  handleDisplayQuestionnaire();
  
  controller.abort();
}, [questionnaire]);

  
  return (
    <div className="flex-1 p-4 overflow-y-auto">
      {/* Messages will be displayed here */}
      <div className="text-center text-muted-foreground mt-8">
        {messageToDisplay.length > 0 ? (
        <div className="messages-container">
        {messageToDisplay.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>
      ) : (
        <div>No messages to display</div>
      )}
        {poll.length > 0 ? (
        <div>
          {poll.map((p, index) => (
            <div key={index}>{/* Render poll data */}</div>
          ))}
        </div>
      ) : (
        <div />
      )}
        {questionnaire.length > 0 ? (
        <div>
          {questionnaire.map((q, index) => (
            <div key={index}>{/* Render questionnaire data */}</div>
          ))}
        </div>
      ) : (
        <div />
      )}
      </div>
    </div>
  );
};
