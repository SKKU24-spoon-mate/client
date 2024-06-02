import React, { useEffect, useRef, useState } from 'react';

import { Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { ReactComponent as ChatHeader } from '@assets/svg/ChatHeader.svg';
import { ReactComponent as ProfileHeader } from '@assets/svg/ProfileHeader.svg';
import { ReactComponent as RegisterHeader } from '@assets/svg/RegisterHeader.svg';
import { ReactComponent as UserDefault } from '@assets/svg/UserDefault.svg';
import { baseUrl } from '@interfaces';

import { HeaderBox } from './chatliststyled';
import { ListBox } from './chatliststyled';
import { ChatBox } from './chatliststyled';
import { IconWrapper } from './chatliststyled';
import { NavItem } from './chatliststyled';

interface MessageFormat {
  from: string;
  to: string;
  content: string;
  createdAt: string;
}

const ChatListPage: React.FC = () => {
  const [messages, setMessages] = useState<MessageFormat[]>([]);
  //const location = useLocation();
  //const { user1 } = location.state;
  const user1 = 'test2'; //
  const [error, setError] = useState<string | null>(null);
  const ws = useRef<WebSocket | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const fetchChatData = async () => {
      if (user1) {
        try {
          await axios.get(baseUrl + `/chat/id/${user1}`).then((res) => {
            const filteredMessages = res.data
              .filter((message: MessageFormat) => message.from === user1 || message.to === user1)
              .reduce((acc: Record<string, MessageFormat>, message: MessageFormat) => {
                const otherUser = message.from === user1 ? message.to : message.from;
                if (!acc[otherUser] || new Date(acc[otherUser].createdAt) < new Date(message.createdAt)) {
                  acc[otherUser] = message;
                }
                return acc;
              }, {});
            const recentMessages = Object.values(filteredMessages) as MessageFormat[];
            setMessages(recentMessages);

            setError(null);
          });
        } catch (err: any) {
          if (err.response && err.response.status === 404) {
            setError('Invalid user name');
          } else {
            setError('An error occurred while fetching the chat data');
          }
        }
      }
    };
    fetchChatData();
    ws.current = new WebSocket('ws://localhost:8082/ws');

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.from === user1 || data.to === user1) {
        setMessages((prevMessages) => {
          const updatedMessages = prevMessages.filter(
            (message) =>
              !(message.from === data.to && message.to === data.from) &&
              !(message.from === data.from && message.to === data.to),
          );

          return [...updatedMessages, data];
        });
      }
    };

    return () => {
      ws.current?.close();
    };
  }, [user1]);

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
  }, [messages]);

  const navigate = useNavigate();
  const handleChatClick = (to: string) => {
    navigate('/chat', { state: { user1, to } });
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
        {messages.map((item: MessageFormat) => {
          let friend: string;
          const dateTime = new Date(item.createdAt);
          const hours = dateTime.getUTCHours();
          const minutes = dateTime.getUTCMinutes();
          const seconds = dateTime.getUTCSeconds();
          const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
          if (item.to === user1) {
            friend = item.from;
          } else {
            friend = item.to;
          }
          return (
            <ChatBox key={`${item.createdAt}-${friend}`} onClick={() => handleChatClick(friend)}>
              <UserDefault
                style={{
                  width: '40px',
                  height: '40px',
                  marginRight: '3rem',
                  marginLeft: '3rem',
                  scale: '200%',
                }}
              />
              <Box sx={{ flex: '1' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Box sx={{ fontSize: '3rem', fontWeight: 'bold' }}>{friend}</Box>
                  <Box sx={{ fontSize: '1.2rem', color: 'gray', marginLeft: '1rem' }}>{timeString}</Box>
                </Box>
                <Box sx={{ color: 'gray', fontSize: '2rem', marginTop: '0.5rem' }}>{item.content}</Box>
              </Box>
            </ChatBox>
          );
        })}
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
