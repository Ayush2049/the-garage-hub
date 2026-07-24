import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, User } from 'lucide-react';
import './Chatbot.css';

const steps = [
  "Customer Name",
  "Mobile Number",
  "Vehicle Brand",
  "Vehicle Model",
  "Registration Number",
  "Primary Issue",
  "Preferred Visit Date (YYYY-MM-DD)",
  "Preferred Time"
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState({});
  const messagesEndRef = useRef(null);

  // Auto greeting after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasGreeted) {
        setIsOpen(true);
        setMessages([{
          sender: 'bot',
          text: "👋 Hello! Welcome to Indore Car Garage. I'm your service advisor. Would you like to schedule a vehicle inspection today?"
        }]);
        setHasGreeted(true);
      }
    }, 8000);
    return () => clearTimeout(timer);
  }, [hasGreeted]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleNaughtyInput = (text) => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes("love you")) {
      return "😊 That's kind of you, but let's get your car taken care of first. " + (currentStepIndex === 0 ? "What's your name?" : `Please provide your ${steps[currentStepIndex]}.`);
    }
    if (lowerText.includes("beautiful") || lowerText.includes("cute")) {
      return "Thank you for the compliment 😊. Now please tell me your " + (currentStepIndex === 0 ? "name" : steps[currentStepIndex]) + " so I can assist properly.";
    }
    return null;
  };

  const validateTime = (date, time) => {
    // Basic validation
    const d = new Date(date);
    const day = d.getDay(); // 0 = Sunday, 1-6 = Mon-Sat
    
    // Parse time (assuming "HH:MM AM/PM" or "HH:MM")
    // For simplicity in this demo, we'll just check hours if possible or rely on user.
    // Real implementation would parse Date object.
    const hourMatch = time.match(/(\d+)/);
    if(hourMatch) {
      let hour = parseInt(hourMatch[1]);
      if(time.toLowerCase().includes('pm') && hour !== 12) hour += 12;
      
      if(day === 0) { // Sunday
        if(hour < 10 || hour >= 16) return false;
      } else { // Mon-Sat
        if(hour < 9 || hour >= 19) return false;
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { sender: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');

    // Check for naughty input first
    const naughtyResponse = handleNaughtyInput(currentInput);
    if (naughtyResponse) {
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'bot', text: naughtyResponse }]);
      }, 600);
      return;
    }

    // Normal flow
    if (currentStepIndex === 0 && !formData.name && (currentInput.toLowerCase() === 'yes' || currentInput.toLowerCase() === 'yup')) {
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'bot', text: "Great! Let's start with your Name." }]);
      }, 600);
      return;
    }

    // Save data
    const currentStepKey = steps[currentStepIndex];
    const newFormData = { ...formData, [currentStepKey]: currentInput };
    setFormData(newFormData);

    // Date/Time validation mockup
    if (currentStepKey === "Preferred Time" && newFormData["Preferred Visit Date (YYYY-MM-DD)"]) {
       if(!validateTime(newFormData["Preferred Visit Date (YYYY-MM-DD)"], currentInput)) {
         setTimeout(() => {
           setMessages(prev => [...prev, { 
             sender: 'bot', 
             text: "I'm sorry, our business hours are Mon-Sat 9:00 AM to 7:00 PM, and Sun 10:00 AM to 4:00 PM. Please provide a time within these hours." 
           }]);
           // We don't advance the step
         }, 600);
         return;
       }
    }

    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'bot', text: `Got it. Now, please provide your ${steps[currentStepIndex + 1]}.` }]);
      }, 600);
    } else {
      // Done
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'bot', text: "Thank you! I am generating your booking summary and opening WhatsApp..." }]);
        
        // Generate WhatsApp link
        const summary = `*New Booking Request*\n\n*Name:* ${newFormData["Customer Name"]}\n*Mobile:* ${newFormData["Mobile Number"]}\n*Vehicle:* ${newFormData["Vehicle Brand"]} ${newFormData["Vehicle Model"]}\n*Reg No:* ${newFormData["Registration Number"]}\n*Issue:* ${newFormData["Primary Issue"]}\n*Date:* ${newFormData["Preferred Visit Date (YYYY-MM-DD)"]}\n*Time:* ${newFormData["Preferred Time"]}`;
        
        const encodedSummary = encodeURIComponent(summary);
        window.open(`https://wa.me/918770018340?text=${encodedSummary}`, '_blank');
        
        // Reset
        setFormData({});
        setCurrentStepIndex(0);
      }, 1500);
    }
  };

  return (
    <div className="chatbot-wrapper">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="chatbot-window glass-panel"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="chatbot-header">
              <div className="chatbot-profile">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Advisor" className="chatbot-avatar" />
                <div>
                  <h4>Priya</h4>
                  <span>Service Advisor</span>
                </div>
              </div>
              <button className="chatbot-close" onClick={() => setIsOpen(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="chatbot-messages">
              {messages.map((msg, idx) => (
                <div key={idx} className={`chat-bubble-wrapper ${msg.sender}`}>
                  {msg.sender === 'bot' && <div className="chat-avatar-small"><img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=80" alt="Bot" /></div>}
                  <div className={`chat-bubble ${msg.sender}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            <form className="chatbot-input-area" onSubmit={handleSubmit}>
              <input 
                type="text" 
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button type="submit" className="chatbot-send">
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button className="chatbot-trigger" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
};

export default Chatbot;
