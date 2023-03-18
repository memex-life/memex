import React, { useState } from 'react';
import { Box, TextField, Typography, Button } from '@material-ui/core';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }, { text: input, sender: 'bot' }]);
      setInput('');
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
          <Typography key={index} align={message.sender === 'user' ? 'right' : 'left'}>
            {message.text}
          </Typography>
        ))}
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
