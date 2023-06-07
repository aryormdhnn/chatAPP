import React, { useEffect, useState, useRef } from 'react';
import socketIOClient from 'socket.io-client';
import ChatBoxSender from './ChatBoxSender';
import ChatBoxReceiver from './ChatBoxReceiver';
import UserLogin from './UserLogin';
import InputText from './InputText';
import PropTypes from 'prop-types';
import {
  doc,
  setDoc,
  collection,
  serverTimestamp,
  query,
  onSnapshot,
  orderBy,
} from 'firebase/firestore';

import db from './firebaseConfig/firebaseConfig';


const ChatContainer = ({ endpoint }) => {
  let socketio = socketIOClient('5173');
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState(localStorage.getItem('user'));
  const avatar = localStorage.getItem('avatar');
  const chatsRef = collection(db, 'Messages');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  useEffect(() => {
    socketio.current = socketIOClient(endpoint);

    socketio.current.on('chat', (senderChats) => {
      setChats(senderChats);
    });

    return () => {
      socketio.current.disconnect();
    };
  }, []);

  useEffect(() => {
    const q = query(chatsRef, orderBy('createdAt', 'asc'));

    const unsub = onSnapshot(q, (querySnapshot) => {
      const fireChats = [];
      querySnapshot.forEach((doc) => {
        fireChats.push(doc.data());
      });
      setChats([...fireChats]);
    });
    return () => {
      unsub();
    };
  }, []);

  function addToFirrebase(chat) {
    const newChat = {
      avatar,
      message: chat.message,
      user,
      createdAt: serverTimestamp(),
    }

    const chatRef = doc(chatsRef)
    setDoc(chatRef, newChat)
    .then(() => console.log('Chat berhasil ditambahkan!'))
    .catch((err) => console.log(err));

  }


  useEffect(() => {
    // Memulihkan percakapan dari local storage saat komponen dimuat
    const storedChats = localStorage.getItem('chats');
    if (storedChats) {
      setChats(JSON.parse(storedChats));
    }
  }, []);

  useEffect(() => {
    // Menyimpan percakapan ke dalam local storage saat ada perubahan pada chats
    localStorage.setItem('chats', JSON.stringify(chats));
  }, [chats]);

  function sendChatToSocket(chat) {
    socketio.current.emit('chat', chat);
  }

  function addMessage(chat) {
    const newChat = { ...chat, user: localStorage.getItem('user'), avatar };
    addToFirrebase(chat);
    setChats([...chats, newChat]);
    sendChatToSocket([...chats, newChat]);
  }

  function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('avatar');
    setUser('');
  }

  function ChatsList() {
    return (
      <div style={{ height: '75vh', overflow: 'scroll', overflowX: 'hidden' }}>
        {chats.map((chat, index) => {
          if (chat.user === user) return <ChatBoxSender key={index} message={chat.message} avatar={chat.avatar} user={chat.user} />;
          return <ChatBoxReceiver key={index} message={chat.message} avatar={chat.avatar} user={chat.user} />;
          
        })}
        <div ref={messagesEndRef} />
      </div>
    );
  }

  return (
    <div>
      {user ? (
        <div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <h4>Username: {user}</h4>

            <p onClick={logout} style={{ color: 'blue', cursor: 'pointer' }}>
              Log Out
            </p>
          </div>
          <ChatsList />
          <InputText addMessage={addMessage} />
        </div>
      ) : (
        <UserLogin setUser={setUser} />
      )}

      <div style={{ margin: 10, display: 'flex', justifyContent: 'center' }}></div>
    </div>
  );
};

ChatContainer.propTypes = {
  endpoint: PropTypes.string.isRequired,
};

export default ChatContainer;
