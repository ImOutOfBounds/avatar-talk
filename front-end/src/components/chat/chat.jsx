import React, { useState } from 'react';
import { Container, ChatContainer, Input, SendBtn } from './style';
import AvatarContainer from '../avatarContainer/avatarContainer';

function Chat() {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';

      setIsSpeaking(true);

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      console.log('Este navegador não suporta síntese de voz.');
    }
  };

  const sendMessage = async () => {
    if (!message) return;

    try {
      const res = await fetch('http://127.0.0.1:5000/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: message }),
      });
      const data = await res.json();

      const responseText = data.response || 'Não entendi o que você quis dizer.';
      setChatLog((prev) => [...prev, { sender: 'bot', text: responseText }]);

      speak(responseText);
    } catch (err) {
      console.error('Erro ao se comunicar com a API:', err);
    }

    setMessage('');
  };

  return (
    <Container>
      <ChatContainer>
        <div style={{ flex: 1, overflowY: 'auto', marginBottom: '8px' }}>
          {chatLog.map((msg, idx) => (
            <div key={idx} style={{ textAlign: 'left' }}>
              <span>{msg.text}</span>
            </div>
          ))}
        </div>
        <Input
          id="chat-input"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <SendBtn onClick={sendMessage}> ^ </SendBtn>
      </ChatContainer>

      <AvatarContainer playAnimation={isSpeaking} />
    </Container>
  );
}

export default Chat;
