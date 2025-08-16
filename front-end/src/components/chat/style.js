import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
`;

export const ChatContainer = styled.div`
  position: fixed;
  bottom: 20px;
  width: 90vw;
  max-height: 400px;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
  z-index: 1000; 
  padding: 8px;
`;

export const Input = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  outline: none;
`;

export const SendBtn = styled.button`
  margin-top: 4px;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background-color: #c83131ff;
  color: white;
  cursor: pointer;
`;
