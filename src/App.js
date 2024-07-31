import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './LOG1.png'; // Importation de l'image

function App() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Simuler une réponse initiale du chatbot
    setMessages([{ role: 'bot', content: 'Bonjour ! Comment puis-je vous aider ?' }]);
  }, []);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = () => {
    if (userInput.trim()) {
      setMessages([...messages, { role: 'user', content: userInput }]);
      setUserInput('');

      // Simuler une réponse du chatbot avec un délai de 1 seconde
      setTimeout(() => {
        fetch('/api/chatbot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: userInput }),
        })
        .then(response => response.json())
        .then(data => {
          setMessages([...messages, { role: 'user', content: userInput }, { role: 'bot', content: data.message }]);
        });
      }, 1000);
    }
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div>
      {/* Bouton de chatbot */}
      <div className="chatbot-button" onClick={togglePopup}>
        <img src={logo} alt="Robot" />
      </div>

      {/* Popup du chatbot */}
      <div className={`chatbot-popup ${showPopup ? 'show' : ''}`}>
        <div className="messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.role}`}>
              {message.content}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', marginTop: '10px' }}>
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Votre message"
          />
          <button onClick={handleSubmit}>Envoyer</button>
        </div>
      </div>
    </div>
  );
}

export default App;
