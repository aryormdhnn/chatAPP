import React, { useState } from 'react';
import PropTypes from 'prop-types';

const InputText = ({ addMessage }) => {
  const [message, setMessage] = useState('');

  function sendMessage() {
    if (!message) return;
    addMessage({ message });
    setMessage('');
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: 10 }}>
      <input
        style={{ width: '60%', height: 40, borderRadius: 10, borderWidth: 10, fontSize: 15, paddingInline: 5 }}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here..."
      />
      <button onClick={sendMessage} style={{ width: '15%', height: 40, borderRadius: 10, fontSize: 15, marginLeft: 10 }}>
        Send
      </button>
    </div>
  );
};

InputText.propTypes = {
  addMessage: PropTypes.func.isRequired,
};

export default InputText;
