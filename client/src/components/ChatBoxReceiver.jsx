import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Image } from 'antd';

const ChatBoxReceiver = ({ avatar, user, message }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'row' }}>
      <Avatar
        size={50}
        src={
          <Image
            src={avatar}
            style={{
              objectFit: 'cover',
              width: 45,
              height: 45,
              borderRadius: '100%',
            }}
            preview={false}
          />
        }
      />
      <p style={{ padding: 10, backgroundColor: '#dcf8c6', borderRadius: 10, maxWidth: '60%' }}>
        <strong style={{ fontSize: 13 }}>{user}</strong> <br />
        {message}
      </p>
    </div>
  );
};

ChatBoxReceiver.propTypes = {
  avatar: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default ChatBoxReceiver;