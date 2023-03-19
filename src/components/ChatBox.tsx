import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, Button, CircularProgress } from '@material-ui/core';
import { styled } from "@mui/material/styles";
import { knowledgeBase } from './KnowledgeBase';
import { Document } from '../types';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

interface MessageBubbleProps {
  sender: 'user' | 'bot';
}

async function getAnswer(question: string): Promise<string> {
  const answer = await knowledgeBase.answerQuestion(question);
  return answer;
}

const MessageBubble = styled(Box)<MessageBubbleProps>`
  background-color: ${({ theme, sender }) =>
    sender === 'user' ? theme.palette.primary.main : theme.palette.grey[300]};
  color: ${({ theme, sender }) => (sender === 'user' ? theme.palette.primary.contrastText : theme.palette.text.primary)};
  padding: 8px 12px;
  border-radius: ${({ sender }) =>
    sender === 'user' ? '16px 16px 0px 16px' : '16px 16px 16px 0px'};
  margin: 4px 0;
  max-width: 70%;
  word-wrap: break-word;
`;

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);

  useEffect(() => {
    const greetingMessage: Message = {
      text: 'Hello! How may I help you today?',
      sender: 'bot',
    };
    setMessages([greetingMessage]);
  }, []);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
      setIsBotTyping(true);
      setTimeout(async () => {
        const response = await getAnswer(input);
        const bot_response: Message = {
          text: response,
          sender: 'bot',
        };
        setMessages((prevMessages) => [...prevMessages, bot_response]);
        setIsBotTyping(false);
      }, 300);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={2} width="300px">
      <Box display="flex" flexDirection="column" width="100%" mb={2} maxHeight="300px" overflow="auto">
        {messages.map((message, index) => (
          <Box
            key={index}
            alignSelf={message.sender === 'user' ? 'flex-end' : 'flex-start'}
          >
            <MessageBubble sender={message.sender}>
              <Typography variant="body1">{message.text}</Typography>
            </MessageBubble>
          </Box>
        ))}
        {isBotTyping && (
          <Box alignSelf="flex-start" display="flex" alignItems="center" pl={1}>
            <CircularProgress size={16} />
            <Typography variant="body1" style={{ marginLeft: '8px' }}>
              Typing...
            </Typography>
          </Box>
        )}
      </Box>
      <Box display="flex" width="100%">
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button
          color="primary"
          variant="contained"
          onClick={handleSend}
          style={{ marginLeft: '8px' }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatBox;
