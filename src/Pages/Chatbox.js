import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Button,
  Paper,
  Typography,
  MenuItem,
} from "@mui/material";
import { HiMicrophone } from "react-icons/hi";
import { Send as SendIcon } from "@mui/icons-material";
import { FaGlobe } from "react-icons/fa";

// Predefined FAQ for chatbot
const predefinedQA = {
  en: [
    { question: "What are today's classes?", answer: "You have Math at 9 AM and English at 11 AM." },
    { question: "Who is my class teacher?", answer: "Your class teacher is Mrs. Johnson." },
    { question: "What is the school timing?", answer: "The school operates from 8 AM to 3 PM." },
    { question: "How can I contact the principal?", answer: "You can contact the principal at principal@school.com." },
  ],
};

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "te", name: "Telugu" },
];

const Chatbox = ({ open, onClose, userName }) => {
  // Function to generate the initial greeting message
  const getGreetingMessage = (name) => [
    { text: `Hi ${name || "User"}! How can I assist you today?`, sender: "bot" },
  ];

  // Reset chat with updated username when chatbot opens
  useEffect(() => {
    if (open) {
      setMessages(getGreetingMessage(userName));
    }
  }, [open, userName]);

  const [messages, setMessages] = useState(getGreetingMessage());
  const [inputMessage, setInputMessage] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);

  // Reset chat to greeting message when chatbot opens
  useEffect(() => {
    if (open) {
      setMessages(getGreetingMessage());
    }
  }, [open, userName]);

  // Handle text input
  const handleInputChange = (event) => {
    const userInput = event.target.value;
    setInputMessage(userInput);
    if (userInput.trim()) {
      const matches = predefinedQA[selectedLanguage]
        .filter((qa) => qa.question.includes(userInput))
        .map((qa) => qa.question);
      setFilteredQuestions(matches);
    } else {
      setFilteredQuestions([]);
    }
  };

  // Handle sending a message
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = { text: inputMessage, sender: "user" };
    setMessages([...messages, userMessage]);

    const matchedQA = predefinedQA[selectedLanguage].find(
      (qa) => qa.question.toLowerCase() === inputMessage.toLowerCase()
    );
    const botResponse = matchedQA
      ? matchedQA.answer
      : "I'm not sure about that. Please contact the school admin for more details.";

    setTimeout(() => {
      setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
    }, 1000);

    setInputMessage("");
    setFilteredQuestions([]);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  // Function to start voice recognition
  const handleVoiceInput = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = selectedLanguage;
    recognition.start();

    recognition.onresult = (event) => {
      setInputMessage(event.results[0][0].transcript);
    };
  };

  // Handle language change
  const handleLanguageChange = (langCode) => {
    setSelectedLanguage(langCode);
    setInputMessage(""); // Clear input when language is changed
    setFilteredQuestions([]); // Clear suggestions on language change
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle className="flex items-center">
        <img
          src="https://cdn-icons-png.flaticon.com/128/3558/3558860.png"
          alt="Chatbot"
          className="w-8 h-8 mr-2"
        />
        <Typography variant="h6" className="font-semibold">EduBot</Typography>

        {/* Language Icon with Dropdown Toggle */}
        <div className="relative ml-auto">
          <IconButton onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}>
            <FaGlobe size={20} />
          </IconButton>

          {languageDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-md rounded p-2 w-48" style={{ zIndex: 1000 }}>
              {languages.map((lang) => (
                <MenuItem key={lang.code} onClick={() => handleLanguageChange(lang.code)}>
                  {lang.name}
                </MenuItem>
              ))}
            </div>
          )}
        </div>
      </DialogTitle>

      <DialogContent className="space-y-4">
  {/* Messages Area */}
  <div className="flex-1 overflow-y-auto p-3 space-y-4" style={{ maxHeight: 250 }}>
    {messages.map((msg, index) => (
      <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
        {msg.sender === "bot" && (
          <img
            src="https://cdn-icons-png.flaticon.com/128/3558/3558860.png" // Chatbot Image
            alt="Bot"
            className="w-8 h-8 rounded-full mr-2"
          />
        )}
        
        <Paper
          elevation={3}
          className={`p-3 max-w-[80%] rounded-lg ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          <Typography>{msg.text}</Typography>
        </Paper>

        {msg.sender === "user" && (
          <img
            src="https://cdn-icons-png.flaticon.com/128/236/236832.png" // User Image
            alt="User"
            className="w-8 h-8 rounded-full ml-2"
          />
        )}
      </div>
    ))}
  </div>

  {/* Suggested Questions */}
  {filteredQuestions.length > 0 && (
    <div className="p-2 bg-gray-100 rounded mt-3">
      <Typography variant="subtitle2">Suggested Questions:</Typography>
      {filteredQuestions.map((q, index) => (
        <Typography key={index} className="cursor-pointer text-blue-500" onClick={() => setInputMessage(q)}>
          {q}
        </Typography>
      ))}
    </div>
  )}

  {/* Input Area */}
  <div className="flex items-center mt-4">
    <IconButton onClick={handleVoiceInput} style={{ fontSize: 30, height: "40px", width: "40px" }}>
      <HiMicrophone className="text-xl text-gray-600" />
    </IconButton>

    <TextField
      variant="outlined"
      fullWidth
      placeholder="Type a message"
      value={inputMessage}
      onChange={handleInputChange}
      onKeyDown={handleKeyPress}
      sx={{ height: "40px", "& .MuiInputBase-root": { height: "40px" } }}
    />

    <Button variant="contained" color="primary" onClick={handleSendMessage} sx={{ padding: "0 16px", height: "40px" }}>
      <SendIcon />
    </Button>
  </div>
</DialogContent>

    </Dialog>
  );
};

export default Chatbox;
