import React, { useState, useEffect, useCallback, useRef, ChangeEvent } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import {perform_validated_POST_request, 
  displayErrorMsg, 
  throwAsyncError } from './logic/asyncTools';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Paperclip, Image } from 'lucide-react';
import FileAttachment from "./FileAttachment";
import ImageAttachment from "./ImageAttachment";
import { PollCreator, 
TypePollOption, 
TypePoll, 
TypePollCreator } from './PollCreator';
import { QuestionnaireCreator, 
TypeQuestion, 
TypeQuestionnaire, 
TypeQuestionnaireCreator } from './QuestionnaireCreator';


export interface WSMessage {
  type: 'send_message' | 'message_sent' | 'message_failed' | 'file_uploaded' | 'file_upload_failed' | 'typing' | 'user_joined' | 'receive_message';
  id: string;
  payload: any;
  timestamp: number;
}

export interface MessageFile {
  id: string;
  name: string;
  type: string;
  size: number;
  status: 'uploading' | 'uploaded' | 'failed';
  url?: string;
  file?: File;
}

export interface ChatMessage {
  id: string;
  text: string;
  timestamp: Date;
  status: 'sending' | 'sent' | 'failed';
  files: MessageFile[];
  userId: string;
}

interface UploadResult {
  success: boolean;
  url?: string;
  fileId?: string;
}

interface ChatInputProps {
  chatroomId: string;  
  message: ChatMessage;
  files: MessageFile[];
}

export const ChatInput: React.FC<ChatInputProps> = ({ chatroomId }) => {
  // const pendingMessages = useRef<Map<string, ChatMessage>>(new Map());
  // const reconnectTimeoutRef = useRef<NodeJS.Timeout>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState<string>('');
  //const [messageToSend, setMessageToSend] = useState<string | null>(null);
  const [sentMessages, setSentMessages] = useState<ChatMessage[]>([]);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [attachedImages, setAttachedImages] = useState<File[]>([]);
  // const [questionnaireToSend, setQuestionnaireToSend] = useState<any>(null);
  // const [pollToSend, setPollToSend] = useState<any>(null);
  // const [socket, setSocket] = useState<WebSocket | null>(null);
  // const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('disconnected');



// WebSocket connection with react-use-websocket
const {
  sendMessage: sendWSMessage,
  lastMessage,
  readyState,
  getWebSocket
} = useWebSocket('ws://app.gottabenc.com:3000', { // configure ssl
  shouldReconnect: () => true,
  reconnectAttempts: 10,
  reconnectInterval: 3000,
  onOpen: () => {
    console.log('WebSocket connected');
    setError('');
  },
  onClose: () => {
    console.log('WebSocket disconnected');
  },
  onError: (error) => {
    console.error('WebSocket error:', error);
    setError('Connection error occurred');
  }
});

// Connection status helper
const wsConnectionStatus = {
  [ReadyState.CONNECTING]: 'connecting',
  [ReadyState.OPEN]: 'connected',
  [ReadyState.CLOSING]: 'disconnecting',
  [ReadyState.CLOSED]: 'disconnected',
  [ReadyState.UNINSTANTIATED]: 'uninstantiated',
}[readyState];

// The ID used for identifying a message.
const generateId = (): string => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// The ID used for identifying a user.
const generateUid = (): string => `user-${Math.random().toString(36).substr(2, 9)}`;

// The basic structure of the message
const createMessageFile = (file: File): MessageFile => ({
  id: generateId(),
  name: file.name,
  type: file.type,
  size: file.size,
  status: 'uploading',
  file
});

// Create a message that shows UI updates in advance of being send.
const createOptimisticMessage = (
  text: string, 
  files: File[], 
  images: File[],
  userId: string
): ChatMessage => ({
  id: generateId(),
  text,
  timestamp: new Date(),
  status: 'sending',
  files: [...files.map(createMessageFile), ...images.map(createMessageFile)],
  userId
});

const collectFilesFromInput = (files: File[]) => {
  setAttachedFiles(files);
  
  // Only set images if files are actually images
  const imageFiles = files.filter(file => file.type.startsWith('image/'));
  setAttachedImages(imageFiles);
};

// File upload 
const uploadFileHttp = async (file: File, messageId: string): Promise<{ success: boolean; url?: string; fileId: string }> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('messageId', messageId);
    
    const response = await fetch('../../../api.php/uploads', {
      method: 'POST',
      body: formData
    });
    
    const result = await response.json();
    
    return {
      success: result.success,
      url: result.url,
      fileId: result.fileId || generateId()
    };
  } catch (error) {
    return {
      success: false,
      fileId: generateId()
    };
  }
};

// Message status update function
const updateMessageStatus = useCallback((
  messageId: string, 
  status: ChatMessage['status']
) => {
  setSentMessages(prev => 
    prev.map(msg => 
      msg.id === messageId ? { ...msg, status } : msg
    )
  );
}, []);

// File status update function
const updateFileStatus = useCallback((
  messageId: string,
  fileId: string,
  status: MessageFile['status'],
  url?: string
) => {
  setSentMessages(prev =>
    prev.map(msg =>
      msg.id === messageId
        ? {
            ...msg,
            files: msg.files.map(file =>
              file.id === fileId
                ? { ...file, status, url }
                : file
            )
          }
        : msg
    )
  );
}, []);

// Handle incoming WebSocket messages
const handleWebSocketMessage = useCallback((wsMessage: WSMessage) => {
  switch (wsMessage.type) {
    case 'message_sent':
      updateMessageStatus(wsMessage.payload.messageId, 'sent');
      break;
      
    case 'message_failed':
      updateMessageStatus(wsMessage.payload.messageId, 'failed');
      setError(wsMessage.payload.error || 'Message failed to send');
      break;
      
    case 'file_uploaded':
      updateFileStatus(
        wsMessage.payload.messageId, 
        wsMessage.payload.fileId, 
        'uploaded', 
        wsMessage.payload.url
      );
      break;
      
    case 'file_upload_failed':
      updateFileStatus(
        wsMessage.payload.messageId, 
        wsMessage.payload.fileId, 
        'failed'
      );
      break;
      
    case 'receive_message':
      const newMessage: ChatMessage = {
        id: wsMessage.payload.messageId,
        text: wsMessage.payload.text,
        timestamp: new Date(wsMessage.payload.timestamp),
        status: 'sent',
        files: wsMessage.payload.files || [],
        userId: wsMessage.payload.userId
      };
      setSentMessages(prev => [...prev, newMessage]);
      break;
  }
}, [updateMessageStatus, updateFileStatus]);

// Listen for incoming messages
useEffect(() => {
  if (lastMessage !== null) {
    try {
      const wsMessage: WSMessage = JSON.parse(lastMessage.data);
      handleWebSocketMessage(wsMessage);
    } catch (error) {
      console.error('Failed to parse WebSocket message:', error);
    }
  }
}, [lastMessage, handleWebSocketMessage]);

// Send message via WebSocket (simplified)
const sendMessageViaWS = useCallback((text: string, files: File[], messageId?: string) => {
  if (readyState !== ReadyState.OPEN) return false;
  
  const msgId = messageId || generateId();
  const wsMessage: WSMessage = {
    type: 'send_message',
    id: msgId,
    payload: {
      messageId: msgId,
      text,
      userId: generateId(), // Replace with actual user ID
      chatRoom: 'general', // Replace with actual chat room
      fileCount: files.length
    },
    timestamp: Date.now()
  };
  
  sendWSMessage(JSON.stringify(wsMessage));
  return true;
}, [readyState, sendWSMessage]);




/* ***messageSend Related Functionality*** */

// Function used for clearing input
const clearInput = () => {
    setMessage('');
    setAttachedFiles([]);
    setAttachedImages([]);
    setError('');
    setIsLoading(true);
};

// The function used for preparing the message to be sent.
const prepareMessageForSending = (
  msgTxt: string, 
  attachedFS: File[], 
  attachedImgs: File[], 
  uid: ChatMessage["userId"]) => {
		// Create optimistic message
    const optimisticMessage = createOptimisticMessage(msgTxt, attachedFS, attachedImgs, uid);
    setSentMessages(prev => [...prev, optimisticMessage]);
    return optimisticMessage;
};

// The function used for displaying file upload status
const updateFileStatusesFromResults = (uploadResults: UploadResult[], opMsg: ChatMessage) => {
		uploadResults.forEach((result, index) => {
        const file = opMsg.files[index];
        updateFileStatus(
          opMsg.id,
          file.id,
          result.success ? 'uploaded' : 'failed',
          result.url
        );
    });
    
    return uploadResults;
};

// The handle used for handling file upload failures
const handleUploadFailures = (results: UploadResult[]) => {
		const failedUploads = results.filter(result => !result.success);
    if (failedUploads.length > 0) {
      	return setError(`${failedUploads.length} file(s) failed to upload`);
    }
    return;
};

// The function used for handling any file uploads sent along with the message.
const handleFileUploads = async (filesUploaded: File[], opMessage: ChatMessage) => {
		// Handle file uploads (if any)
      let uploadResults;
      
      if (filesUploaded.length > 0) {
        const uploadPromises = filesUploaded.map(file => uploadFileHttp(file, opMessage.id));
        uploadResults = await Promise.all(uploadPromises);
        setAttachedFiles(filesUploaded);
        setAttachedImages(filesUploaded);
        
        // Update file statuses based on upload results
        updateFileStatusesFromResults(uploadResults, opMessage);
				 
        
        // Check if any uploads failed
        handleUploadFailures(uploadResults);
      }
      
      return uploadResults;
};

// The handle used for handling the message via Web Sockets
const handleWebSocketSend = (msgTxt: string, files: File[], opMsg: ChatMessage) => {
		if (wsConnectionStatus === 'connected') {
        const sent = sendMessageViaWS(msgTxt, files, opMsg.id);
        
        if (!sent) {
          throw new Error('Failed to send message via WebSocket');
        }
        
        return sent;
        
    } else {
        updateMessageStatus(opMsg.id, 'failed');
        return setError('Not connected. Message will be sent when connection is restored.');
        
    }
};

// The handle used for handling any errors that occured during message transfer
const handleSendError = (opMsg: ChatMessage, error: Error) => {
		const errorMsg = error instanceof Error ? error.message : 'Unknown error occurred';
    
    setError(errorMsg);
    updateMessageStatus(opMsg.id, 'failed');
    
    return console.error('Send message error:', errorMsg);
};

// Typing indicator (simplified)
const sendTypingIndicator = useCallback(() => {
  if (readyState === ReadyState.OPEN) {
    const wsMessage: WSMessage = {
      type: 'typing',
      id: generateId(),
      payload: {
        userId: generateUid(),
        chatRoom: 'general'
      },
      timestamp: Date.now()
    };
    sendWSMessage(JSON.stringify(wsMessage));
  }
}, [readyState, sendWSMessage]);

// Retry failed message (updated)
const retryMessage = useCallback(async (messageId: string) => {
  const messageToRetry = sentMessages.find(msg => msg.id === messageId);
  if (!messageToRetry || messageToRetry.status !== 'failed') return;

  updateMessageStatus(messageId, 'sending');

  if (wsConnectionStatus === 'connected') {
    const allFiles = messageToRetry.files.map(f => f.file!).filter(Boolean);
    sendMessageViaWS(messageToRetry.text, allFiles, messageId);
  } else {
    setError('Cannot retry: not connected to server');
    updateMessageStatus(messageId, 'failed');
  }
}, [sentMessages, wsConnectionStatus, sendMessageViaWS]);

// Main message sending handler (updated to use new WebSocket functions)
const sendMessage = async (message: string) => {
    if (!message?.trim() && attachedFiles.length === 0 && attachedImages.length === 0) return;
    if (isLoading) return;

    const messageText = message.trim();
    const allFiles = [...attachedFiles, ...attachedImages];
    const userId = generateUid();
    
    // Prepare message for sending
    const optimisticMessage = prepareMessageForSending(messageText, attachedFiles, attachedImages, userId);
    clearInput();

    try {
      // Handle file uploads first (if any)
      handleFileUploads(allFiles, optimisticMessage);

      // Send message via WebSocket
      handleWebSocketSend(messageText, allFiles, optimisticMessage);

    } catch (error: any) {
      handleSendError(optimisticMessage, error);
      retryMessage(optimisticMessage.id);
    	
    } finally {
      setIsLoading(false);
    }
};
const handleSendMessage = () => {
 	sendMessage(message);
};

// The handle used for calling handleFileUploads on the UI file input.
/*
const processFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
  const filesToUpload = event.target.files;
  if (filesToUpload) {
    const filesArray: File[] = Array.from(filesToUpload);
    collectFilesFromInput(filesArray);
  }
};





// Connection status for UI
const getConnectionStatusText = () => {
  switch (wsConnectionStatus) {
    case 'connecting': return 'Connecting...';
    case 'connected': return 'Connected';
    case 'disconnecting': return 'Disconnecting...';
    case 'disconnected': return 'Disconnected';
    default: return 'Unknown';
  }
};



	/* ***Questionnaire Related Functionality*** */
	/*
	// The function used to create the POST request for storing questionnaires.
	const createQuestionnaireRequest = async () => {
			try {
			const response = await fetch("../../../server/api.php/questionnaires", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(questionnaireToSend),
      });
      if (response.status === 201) {
      	return response;
      }
      
      } catch (e) {
      	setError(e);
      	console.error('Error in response: ', e);
      }
	};
	
	// The handle used to handle API related errors.
	const handleApiError = (result: Error) => {
			const errorMsg = result.message || 'Failed to send questionnaire';
      
      setError(errorMsg);
      
      return console.error('Error:', errorMsg);
	};
	
	// The handle that handles the state of the questionnaire HTTP response.
	const parseAndValidateResponse = async (res): Promise<TypeQuestionnaire> => {
			const result: Response = await res.json();
			if (res.ok && result.success) {
        console.log('questionnaire sent:', result.data);
        
        // Add sent questionnaire to state
        setQuestionnaireToSend(result);
        
        // Clear input after successful send
        setQuestionnaireToSend(null);
      } else {
      	handleApiError(result);
      }
	};
	
	// The handle used for handling network errors.
	const handleNetworkError = (error) => {
			const errorMsg = 'Network error: ' + error.message;
      console.error(errorMsg);
      setError(errorMsg);
      setQuestionnaireToSend(null);
	};

  // The function that runs when questionnaireToSend changes
  const sendQuestionnaire = async () => {
      if (!questionnaireToSend) return; // Don't run if no questionnaire to send
      
      try {
       
        console.log('Questionnaire data:', questionnaireToSend);
        
        // Send questionnaire to backend
        const response = createQuestionnaireRequest();
        
        console.log("response: ", response);
        
        parseAndValidateResponse(response);

       // Send questionnaire to back-end
    } catch (error) {
      handleNetworkError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to trigger the questionnaire sending
  
  const handleSendQuestionnaire = (questionnaire: any) => {
    setQuestionnaireToSend(questionnaire);
  };
*/

	
	/* ***Poll Related Functionality*** */
	
  // The main function that runs when pollToSend changes
  /*
  const sendPoll = async (poll: TypePoll) => {
      if (!poll) return; // Don't run if no poll to send
      
      try {
        console.log('Poll data:', poll);
        
        // Perform a request, validate it, parse it and store the result.
    		const resultSuccess = perform_validated_POST_request("poll", poll);
      	console.log("response post-await: ", response);
        
        // Add poll to state
        setPollToSend(poll);
        // Clear poll input after successful send
        setPollToSend(null);
        
    } catch (error) {
    	const errorMsg = displayErrorMsg(error, "poll");
      setError(errorMsg);
      setPollToSend(null);
    } finally {
      setIsLoading(false);
    }

  };

  // Function to trigger the poll sending
  const handleSendPoll = (pollToSend: TypePollCreator.onSendPoll) => {
    setPollToSend(pollToSend);
  };
  */
	const handleChange = (event: ChangeEvent) => {
    if (event.target instanceof HTMLInputElement) {
      return setMessage(event.target.value);
    }
		
	};
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      return setSentMessages(sentMessages);
    } else {
      return sendTypingIndicator();
    }
  };

  return (
    <div className="border-t border-border bg-chat-input p-4">
      <div className="flex flex-wrap items-center gap-2">
        {/* Moderator tools placeholder - will be built later */}
        <div className="flex items-center gap-1">
        <FileAttachment 
    		onFilesSelected={collectFilesFromInput}
    		maxFiles={3}
    		maxFileSize={25}
			allowedTypes={['.pdf', '.docx', '.txt', '.zip']} // Optional restriction
  		  />
          <ImageAttachment 
    		onImagesSelected={collectFilesFromInput}
    		maxImages={5}
    		maxFileSize={10}
  		  />
  		  	{/* Add attributes similar to: value, onChange onSendPoll={handleSendPoll} }
           <QuestionnaireCreator onSendQuestionnaire={handleSendQuestionnaire} />
          <PollCreator />
          {*/}
        </div>
        
        {/* Message Input */}
        <Input
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
          className="flex-1"
        />
        
        {/* Send Button */}
        <Button 
          onClick={handleSendMessage} 
          size="sm"
          disabled={isLoading}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
