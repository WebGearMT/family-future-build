import React, { useState, useEffect, useCallback, useRef } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Paperclip, Image } from 'lucide-react';
import FileAttachment from "./FileAttachment";
import ImageAttachment from "./ImageAttachment";
import PollCreator from './PollCreator';
import QuestionnaireCreator from './QuestionnaireCreator';


interface WSMessage {
  type: 'send_message' | 'message_sent' | 'message_failed' | 'file_uploaded' | 'file_upload_failed' | 'typing' | 'user_joined' | 'receive_message';
  id: string;
  payload: any;
  timestamp: number;
}

interface MessageFile {
  id: string;
  name: string;
  type: string;
  size: number;
  status: 'uploading' | 'uploaded' | 'failed';
  url?: string;
  file?: File;
}

interface ChatMessage {
  id: string;
  text: string;
  timestamp: Date;
  status: 'sending' | 'sent' | 'failed';
  files: MessageFile[];
  userId: string;
}
/*
interface questionnaireProps {

}

interface pollProps {
	
}
*/
export const ChatInput: React.FC<ChatInputProps> = ({ chatroomId }) => {
  const [message, setMessage] = useState('');
  const [messageToSend, setMessageToSend] = useState<string | null>(null);
  const [sentMessages, setSentMessages] = useState<ChatMessage[]>([]);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [attachedImages, setAttachedImages] = useState<File[]>([]);
  const [questionnaireToSend, setQuestionnaireToSend] = useState<any>(null);
  const [pollToSend, setPollToSend] = useState<any>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('disconnected');
  const pendingMessages = useRef<Map<string, ChatMessage>>(new Map());
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');



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


const generateId = (): string => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const createMessageFile = (file: File): MessageFile => ({
  id: generateId(),
  name: file.name,
  type: file.type,
  size: file.size,
  status: 'uploading',
  file
});

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

// File upload (remains the same)
const uploadFileHttp = async (file: File, messageId: string): Promise<{ success: boolean; url?: string; fileId: string }> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('messageId', messageId);
    
    const response = await fetch('/api/upload', {
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

// Message status update functions (remain the same)
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
      userId: 'current_user_id', // Replace with actual user ID
      chatRoom: 'general', // Replace with actual chat room
      fileCount: files.length
    },
    timestamp: Date.now()
  };
  
  sendWSMessage(JSON.stringify(wsMessage));
  return true;
}, [readyState, sendWSMessage]);

// Main message sending handler (updated to use new WebSocket functions)
useEffect(() => {
  const sendMessage = async () => {
    if (!message?.trim() && attachedFiles.length === 0 && attachedImages.length === 0) return;
    if (isLoading) return;

    const messageText = message.trim();
    const allFiles = [...attachedFiles, ...attachedImages];
    const userId = 'current_user_id'; // Replace with actual user ID
    
    // Create optimistic message
    const optimisticMessage = createOptimisticMessage(messageText, attachedFiles, attachedImages, userId);
    setSentMessages(prev => [...prev, optimisticMessage]);
    
    // Clear inputs immediately
    setMessage('');
    setAttachedFiles([]);
    setAttachedImages([]);
    setError('');
    setIsLoading(true);

    try {
      // Handle file uploads first (if any)
      if (allFiles.length > 0) {
        const uploadPromises = allFiles.map(file => uploadFileHttp(file, optimisticMessage.id));
        const uploadResults = await Promise.all(uploadPromises);
        
        // Update file statuses based on upload results
        uploadResults.forEach((result, index) => {
          const file = optimisticMessage.files[index];
          updateFileStatus(
            optimisticMessage.id,
            file.id,
            result.success ? 'uploaded' : 'failed',
            result.url
          );
        });
        
        // Check if any uploads failed
        const failedUploads = uploadResults.filter(result => !result.success);
        if (failedUploads.length > 0) {
          setError(`${failedUploads.length} file(s) failed to upload`);
        }
      }

      // Send message via WebSocket
      if (wsConnectionStatus === 'connected') {
        const sent = sendMessageViaWS(messageText, allFiles, optimisticMessage.id);
        if (!sent) {
          throw new Error('Failed to send message via WebSocket');
        }
      } else {
        setError('Not connected. Message will be sent when connection is restored.');
        updateMessageStatus(optimisticMessage.id, 'failed');
      }

    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Send message error:', errorMsg);
      setError(errorMsg);
      updateMessageStatus(optimisticMessage.id, 'failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger send when message or files change
  if ((message?.trim() || attachedFiles.length > 0 || attachedImages.length > 0) && !isLoading) {
    sendMessage();
  }
}, [message, attachedFiles, attachedImages, isLoading, wsConnectionStatus, sendMessageViaWS]);

const handleSendMessage = () => {
	sendMessage();
};

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

// Typing indicator (simplified)
const sendTypingIndicator = useCallback(() => {
  if (readyState === ReadyState.OPEN) {
    const wsMessage: WSMessage = {
      type: 'typing',
      id: generateId(),
      payload: {
        userId: 'current_user_id',
        chatRoom: 'general'
      },
      timestamp: Date.now()
    };
    sendWSMessage(JSON.stringify(wsMessage));
  }
}, [readyState, sendWSMessage]);

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


  // useEffect that runs when questionnaireToSend changes
  useEffect(() => {
    const sendQuestionnaire = async () => {
      if (!questionnaireToSend) return; // Don't run if no questionnaire to send
      
      try {
        console.log('Questionnaire data:', questionnaireToSend);
        
        // Send questionnaire to backend
        const response = await fetch("../../server/api.php/questionnaires", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(questionnaireToSend),
        });
        
        console.log("response: ", response);
        
      if (response.ok && result.success) {
        console.log('questionnaire sent:', result.data);
        const result = await response.json();
        
        // Add sent message to state
        setQuestionnaireToSend();
        
        // Clear message input after successful send
        setQuestionnaireToSend(null);
      } else {
        const errorMsg = result.message || 'Failed to send questionnaire';
        console.error('Error:', errorMsg);
        setError(errorMsg);
      }
    } catch (error) {
      const errorMsg = 'Network error: ' + error.message;
      console.error(errorMsg);
      setError(errorMsg);
      setQuestionnaireToSend(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Only send questionnaire if there's content and not currently loading
  if (questionnaireToSend && !isLoading) {
    sendQuestionnaire();
  }
    
  }, [questionnaireToSend]); // Runs when questionnaireToSend changes

  // Function to trigger the questionnaire sending
  const handleSendQuestionnaire = (questionnaire: any) => {
    setQuestionnaireToSend(questionnaire);
  };

  // useEffect that runs when pollToSend changes
  useEffect(() => {
    const sendPoll = async () => {
      if (!pollToSend) return; // Don't run if no poll to send
      
      try {
        console.log('Poll data:', pollToSend);
        
        // Send poll to backend
        const response = await fetch("../../server/api.php?./polls", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pollToSend),
        });
        
        console.log("response: ", response);
        
      if (response.ok && result.success) {
        console.log('poll sent:', result.data);
        const result = await response.json();
        
        // Add sent message to state
        setPollToSend();
        
        // Clear message input after successful send
        setPollToSend(null);
      } else {
        const errorMsg = result.message || 'Failed to send poll.';
        console.error('Error:', errorMsg);
        setError(errorMsg);
      }
    } catch (error) {
      const errorMsg = 'Network error: ' + error.message;
      console.error(errorMsg);
      setError(errorMsg);
      setPollToSend(null);
    } finally {
      setIsLoading(false);
    }

  // Only send questionnaire if there's content and not currently loading
  if (poll && !isLoading) {
    sendPoll();
  }
  };
    sendPoll();
  }, [pollToSend]); // Runs when pollToSend changes

  // Function to trigger the poll sending
  const handleSendPoll = (poll: any) => {
    setPollToSend(poll);
  };
  
    const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="border-t border-border bg-chat-input p-4">
      <div className="flex flex-wrap items-center gap-2">
        {/* Moderator tools placeholder - will be built later */}
        <div className="flex items-center gap-1">
          <FileAttachment 
    		onFilesSelected={attachedFiles}
    		maxFiles={3}
    		maxFileSize={25}
			allowedTypes={['.pdf', '.docx', '.txt', '.zip']} // Optional restriction
  		  />
          <ImageAttachment 
    		onImagesSelected={attachedImages}
    		maxImages={5}
    		maxFileSize={10}
  		  />
           <QuestionnaireCreator onSendQuestionnaire={handleSendQuestionnaire} />
          <PollCreator onSendPoll={handleSendPoll} />
        </div>
        
        {/* Message Input */}
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className="flex-1"
        />
        
        {/* Send Button */}
        <Button onClick={handleSendMessage} size="sm">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
