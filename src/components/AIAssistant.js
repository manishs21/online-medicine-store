import React, { useState } from 'react';
import '../styles/aiAssistant.css';
import medicinesData from '../data/medicines.json';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hello! I\'m your AI Assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Knowledge base for common questions
  const knowledgeBase = {
    greeting: {
      keywords: ['hello', 'hi', 'hey', 'greetings'],
      response: 'Hello! Welcome to MediStore. How can I assist you today?',
    },
    deliveryTime: {
      keywords: ['delivery', 'how long', 'when', 'reach', 'time'],
      response: 'We deliver medicines within 24-48 hours in most areas. Express delivery is available for urgent orders.',
    },
    payment: {
      keywords: ['payment', 'pay', 'card', 'upi', 'wallet', 'refund', 'money'],
      response: 'We accept all major payment methods: Credit/Debit Cards, UPI, Wallets, and Net Banking. All transactions are secure and encrypted.',
    },
    prescription: {
      keywords: ['prescription', 'prescribed', 'doctor', 'rx', 'medicine without'],
      response: 'Some medicines require a valid prescription from a registered doctor. You can upload your prescription during checkout. We verify all prescriptions for authenticity.',
    },
    registration: {
      keywords: ['sign up', 'register', 'account', 'create', 'join'],
      response: 'Creating an account is easy! Click on "Sign Up" in the top right corner. Fill in your details and start shopping. It takes less than 2 minutes.',
    },
    tracking: {
      keywords: ['track', 'order status', 'where is my order', 'tracking'],
      response: 'You can track your order in real-time from your "Orders" section after login. You\'ll also receive SMS/Email updates.',
    },
    return: {
      keywords: ['return', 'refund', 'replace', 'wrong item', 'damaged'],
      response: 'We offer 7-day returns and replacements for unopened and damaged items. Contact our support team or use the "Return" option in your order.',
    },
    discount: {
      keywords: ['discount', 'offer', 'coupon', 'promo', 'sale'],
      response: 'Check our "Offers" section for current discounts and promotions. First-time customers get 20% off on their first order!',
    },
    contact: {
      keywords: ['contact', 'support', 'help', 'customer service', 'call', 'email'],
      response: 'You can reach our customer support team at: Email: support@medistore.com | Phone: 1-800-MEDI-HELP | Available 24/7',
    },
    hours: {
      keywords: ['hours', 'open', 'closed', 'timing', 'available'],
      response: 'MediStore is available 24/7 for online orders. Our customer support team is also available round the clock.',
    },
    insurance: {
      keywords: ['insurance', 'claim', 'coverage', 'health insurance'],
      response: 'We support most health insurance plans. You can pay directly through your insurance provider during checkout. Check your insurance coverage before ordering.',
    },
  };

  const getResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    // Symptom/condition keywords to look for
    const symptomKeywords = [
      'fever', 'feverish', 'headache', 'head', 'migraine', 'cold', 'cough', 'pain', 'toothache', 'stomach', 'stomachache', 'diarrhea', 'allergy', 'sore throat', 'back pain', 'body ache', 'ache'
    ];

    // If user mentions a symptom, try to find matching medicines from catalog
    const detected = symptomKeywords.filter((k) => lowerMessage.includes(k));
    if (detected.length > 0) {
      const matches = medicinesData.filter((m) => {
        const hay = `${m.name} ${m.description || ''} ${m.category || ''} ${m.brand || ''}`.toLowerCase();
        return detected.some((d) => hay.includes(d));
      });

      if (matches.length > 0) {
        const list = matches.slice(0, 5).map((m) => {
          const price = m.price !== undefined ? `₹${m.price}` : 'Price N/A';
          return `- ${m.name} (${m.category || 'General'}) — ${price}`;
        }).join('\n');

        return `For ${detected.join(', ')} you may consider:\n${list}\nPlease consult a doctor or pharmacist before taking any medicine.`;
      }

      return `I couldn't find specific over-the-counter matches for ${detected.join(', ')}. Please consult a doctor or search our catalog for related medicines.`;
    }

    // Check knowledge base
    for (const [key, value] of Object.entries(knowledgeBase)) {
      if (value.keywords.some((keyword) => lowerMessage.includes(keyword))) {
        return value.response;
      }
    }

    // Default response if no match
    return 'Thank you for your question! For more specific inquiries, please contact our support team at support@medistore.com or call 1-800-MEDI-HELP. We\'re here to help!';
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
      setIsLoading(false);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="ai-assistant">
      {/* Chat Button */}
      <button
        className="ai-assistant-button"
        onClick={() => setIsOpen(!isOpen)}
        title="AI Assistant"
      >
        <span className="ai-icon">🤖</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="ai-assistant-window">
          {/* Header */}
          <div className="ai-assistant-header">
            <div className="ai-assistant-title">
              <span className="ai-title-icon">🤖</span>
              <span>MediStore Assistant</span>
            </div>
            <button
              className="ai-close-btn"
              onClick={() => setIsOpen(false)}
              title="Close"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="ai-assistant-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`ai-message ai-message-${message.sender}`}
              >
                {message.sender === 'bot' && (
                  <span className="ai-message-icon">🤖</span>
                )}
                <div className="ai-message-content">
                  <p>{message.text}</p>
                  <span className="ai-message-time">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                {message.sender === 'user' && (
                  <span className="ai-message-icon">👤</span>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="ai-message ai-message-bot">
                <span className="ai-message-icon">🤖</span>
                <div className="ai-message-content">
                  <div className="ai-typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="ai-assistant-input">
            <input
              type="text"
              placeholder="Ask me anything..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || inputValue.trim() === ''}
              className="ai-send-btn"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
