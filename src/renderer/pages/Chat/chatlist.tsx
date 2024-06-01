import React, { useState, useEffect } from 'react';

import { Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as ChatHeader } from '@assets/svg/ChatHeader.svg';
import { ReactComponent as ProfileHeader } from '@assets/svg/ProfileHeader.svg';
import { ReactComponent as RegisterHeader } from '@assets/svg/RegisterHeader.svg';

import { HeaderBox } from './chatliststyled';
import { ListBox } from './chatliststyled';
import { ChatBox } from './chatliststyled';
import { IconWrapper } from './chatliststyled';
import { NavItem } from './chatliststyled';

interface Message {
  user: string;
  to: string;
  lastchat: string;
  time: string;
}

const ChatListPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const queryString = window.location.search;
  const user = new URLSearchParams(queryString).get('user');

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await axios.get(`/lastchatlist?user=${encodeURIComponent(user || '')}`);
      setMessages(response.data);
    };

    fetchMessages();

    const ws = new WebSocket('ws://localhost:8000/ws2');

    ws.onmessage = () => {
      fetchMessages();
    };

    return () => {
      ws.close();
    };
  }, [user]);
  const navigate = useNavigate();
  const handleChatClick = (to: string) => {
    navigate('/chat', { state: { user, to } });
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
      }}
    >
      <HeaderBox>채팅</HeaderBox>
      <ListBox>
        {/* {messages.map((item, index) => {
          const friend = item.to;
          return (
            <ChatBox key={index} onClick={() => handleChatClick(friend)}>
              <Box
                  sx={{
                  //background: `url(${ProfileHeader}) no-repeat center/contain`,
                  width: '40px',
                  height: '40px',
                  marginRight: '1rem',
                }}
              />
              <Box sx={{ flex: '1' }}>
                <Box sx={{ fontSize: '2rem', fontWeight: 'bold' }}>{friend}</Box>
                <Box sx={{ color: 'gray', fontSize: '1.4rem' }}>{item.lastchat}</Box>
              </Box>
              <Box sx={{ fontSize: '1.2rem', color: 'gray' }}>{item.time}</Box>
            </ChatBox>
          );
        })} */}
      </ListBox>
      <Box
        sx={{
          display: 'flex',
          height: '10%',
          backgroundColor: '#333',
          borderRadius: '0 0 10px 10px',
          overflow: 'hidden',
        }}
      >
        <NavItem
        //onClick={() => (window.location.href = '/friendlistpage?user=' + encodeURIComponent(user || ''))}
        >
          <IconWrapper>
            <RegisterHeader style={{ width: '50%', height: '50%' }} />
            <Box sx={{ fontSize: '1.5rem', color: '#000000' }}>지금 밥약!</Box>
          </IconWrapper>
        </NavItem>
        <NavItem
        //onClick={() => (window.location.href = '/chatlistpage?user=' + encodeURIComponent(user || ''))}
        >
          <IconWrapper>
            <ChatHeader style={{ width: '50%', height: '50%' }} />
            <Box sx={{ fontSize: '1.5rem', color: '#000000' }}>채팅</Box>
          </IconWrapper>
        </NavItem>
        <NavItem
        //onClick={() => (window.location.href = '/profilepage?user=' + encodeURIComponent(user || ''))}
        >
          <IconWrapper>
            <ProfileHeader style={{ width: '50%', height: '50%' }} />
            <Box sx={{ fontSize: '1.5rem', color: '#000000' }}>나의 프로필</Box>
          </IconWrapper>
        </NavItem>
      </Box>
    </Box>
  );
};

export default ChatListPage;
