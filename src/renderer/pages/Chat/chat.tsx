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

import { NavItem, IconWrapper } from './chatliststyled';
import { HeaderBox, ListBox, FromContent, ToContent } from './chatstyled';

interface MessageFormat {
  from: string;
  to: string;
  content: string;
  timestamp: string;
}

const ChatPage: React.FC = () => {
  const location = useLocation();
  const { user1, to } = location.state;
  const user2 = to;
  const navigate = useNavigate();
  const [messages, setMessages] = useState<MessageFormat[]>([]);
  const [content, setContent] = useState<string>(`${user2}님에게 메세지 보내기`);
  const [isPlaceholder, setIsPlaceholder] = useState<boolean>(true);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const ws = useRef<WebSocket | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChatData = async () => {
      if (user1 && user2) {
        try {
          await axios.get(baseUrl + `/chat/id/${user1}`).then((res) => {
            const filteredMessages = res.data.result.filter(
              (message: MessageFormat) =>
                (message.to === user1 && message.from === user2) || (message.to === user2 && message.from === user1),
            );
            setMessages(filteredMessages);
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
    /*const result: MessageFormat[] = [
      {
        from: 'mano',
        to: 'maru',
        content: '안녕하세요',
        timestamp: '오전 10시',
      },
      {
        from: 'maru',
        to: 'mano',
        content: '네 반갑습니다',
        timestamp: '오전 11시',
      },
    ];
    setMessages(result);
    setError(null);*/
    ws.current = new WebSocket('ws://localhost:8082/ws');

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.from === user1 || data.to === user1) {
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    };

    return () => {
      ws.current?.close();
    };
  }, [user1, user2]);

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      const newMessage = {
        from: user1,
        to: user2,
        content: content,
      };
      /*const newMessage1: MessageFormat = {
        from: user1,
        to: user2,
        content: content,
        timestamp: '시간모름',
      };

      setMessages((prevMessages) => [...prevMessages, newMessage1]);
      ws.current?.send(JSON.stringify(newMessage1));
      setContent('');
      setIsPlaceholder(true); */
      try {
        await axios.post(baseUrl + `/chat/id/${user1}`, newMessage).then((res) => {
          setMessages((prevMessages) => [...prevMessages, res.data.result]);
          ws.current?.send(JSON.stringify(res.data.result));
          setContent(`${user2}님에게 메세지 보내기`);
          setIsPlaceholder(true);
        });
      } catch (err: any) {
        if (err.response && err.response.status === 500) {
          console.error('Internal server error');
        } else {
          console.error('An error occurred while sending the message');
        }
      }
    }
  };

  const handleFocus = () => {
    if (isPlaceholder) {
      setContent('');
      setIsPlaceholder(false);
    }
  };

  const handleBlur = () => {
    if (content.trim() === '') {
      setContent('');
      setIsPlaceholder(true);
    }
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#FFFEF3',
      }}
    >
      <HeaderBox>
        <Box onClick={() => navigate(-1)} sx={{ cursor: 'pointer', position: 'absolute', left: '1rem' }}>
          <svg width="7rem" height="7rem" viewBox="0 0 24 24" style={{ position: 'relative', top: '-5rem' }}>
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </Box>
        <UserDefault style={{ scale: '200%', marginTop: '10%' }} />
        <Box sx={{ fontSize: '3rem', color: '#000', marginTop: '2.5%' }}>{user2}</Box>
      </HeaderBox>
      <ListBox ref={boxRef}>
        {messages.map((item, index) => (
          <Box key={index}>
            {item.from === user1 ? (
              <FromContent>
                <Box sx={{ color: '#000', fontSize: '1.5rem' }}>{item.timestamp}</Box>
                <Box
                  sx={{
                    display: 'inline-block',
                    padding: '0.5rem 1rem',
                    margin: '0.5rem 0',
                    borderRadius: '2rem',
                    fontSize: '3rem',
                    color: '#FFFFFF',
                    backgroundColor: '#477A2F',
                  }}
                  dangerouslySetInnerHTML={{ __html: item.content.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;') }}
                ></Box>
              </FromContent>
            ) : (
              <ToContent>
                <Box>
                  <Box sx={{ color: '#000', fontSize: '1.5rem' }}>{item.timestamp}</Box>
                  <Box
                    sx={{
                      display: 'inline-block',
                      padding: '0.5rem 1rem',
                      margin: '0.5rem 0',
                      borderRadius: '2rem',
                      fontSize: '3rem',
                      color: '#000',
                      backgroundColor: '#E5EAE1',
                    }}
                    dangerouslySetInnerHTML={{ __html: item.content.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;') }}
                  ></Box>
                </Box>
              </ToContent>
            )}
          </Box>
        ))}
      </ListBox>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '1rem',
          borderTop: '1px solid #ddd',
          backgroundColor: '#FFFEF3',
          height: '10%',
        }}
      >
        <textarea
          className="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              handleSubmit(e);
              e.preventDefault(); // Enter 키로 인해 폼이 제출되지 않도록 방지
            }
          }}
          style={{
            flex: 1,
            padding: '1rem',
            borderRadius: '2rem',
            border: '1px solid #ddd',
            height: '80%',
            backgroundColor: '#D7E5D5',
            fontSize: '3rem',
            resize: 'none',
            color: '#9B9191',
            display: 'flex',
            justifyContent: 'center',
          }}
        ></textarea>
        <button
          type="submit"
          className="submit1"
          style={{
            marginLeft: '1rem',
            padding: '0.5rem 1rem',
            borderRadius: '1rem',
            backgroundColor: '#477A2F',
            color: '#fff',
            border: 'none',
            fontSize: '1rem',
            height: '50%',
            width: '7rem',
          }}
        >
          Send
        </button>
      </form>
      <Box sx={{ display: 'flex', justifyContent: 'space-around', backgroundColor: '#DCE4D7', padding: '1rem 0' }}>
        <NavItem sx={{ flex: 1 }}>
          <IconWrapper
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
          >
            <RegisterHeader style={{ width: '50%', height: '50%' }} />
            <Box sx={{ fontSize: '1.5rem', color: '#000' }}>지금 밥약!</Box>
          </IconWrapper>
        </NavItem>
        <NavItem sx={{ flex: 1 }}>
          <IconWrapper
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
          >
            <ChatHeader style={{ width: '50%', height: '50%' }} />
            <Box sx={{ fontSize: '1.5rem', color: '#000' }}>채팅</Box>
          </IconWrapper>
        </NavItem>
        <NavItem sx={{ flex: 1 }}>
          <IconWrapper
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
          >
            <ProfileHeader style={{ width: '50%', height: '50%' }} />
            <Box sx={{ fontSize: '1.5rem', color: '#000' }}>나의 프로필</Box>
          </IconWrapper>
        </NavItem>
      </Box>
    </Box>
  );
};

export default ChatPage;
