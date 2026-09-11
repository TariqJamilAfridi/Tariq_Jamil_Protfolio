import { useEffect, useRef, useState } from "react";
import { FiX, FiSend } from "react-icons/fi";
import "./AIChatbot.css";

const quickQuestions = [
  "Tell me about Tariq",
  "What are your skills?",
  "Show me your projects",
  "What technologies do you use?",
  "Tell me about your experience",
  "How can I contact you?",
];

const getBotResponse = (message) => {
  const text = message.toLowerCase();

  if (
    text.includes("hello") ||
    text.includes("hi") ||
    text.includes("hey")
  ) {
    return "Hi! 👋 I'm Tariq's AI Assistant. Feel free to ask me about his skills, projects, experience, or technologies.";
  }

  if (
    text.includes("about") ||
    text.includes("who is tariq") ||
    text.includes("tell me about tariq")
  ) {
    return "Tariq Jamil Afridi is a Full-Stack Web Developer skilled in React.js, JavaScript, HTML, CSS, Bootstrap, Node.js, Express.js, MongoDB, Git, and GitHub. He also has experience with Python, AI, Machine Learning, and Computer Vision.";
  }

  if (text.includes("skill") || text.includes("skills")) {
    return "Tariq's main skills include React.js, JavaScript, HTML, CSS, Bootstrap, Node.js, Express.js, MongoDB, REST APIs, Git, and GitHub. He also has experience with Python, AI/ML, Computer Vision, SQL, and databases.";
  }

  if (text.includes("project") || text.includes("projects")) {
    return "Tariq has worked on projects including iNotebook, a full-stack note-taking application, BeatNews, a news web application, and an Intelligent Dairy Health Monitoring System using Computer Vision.";
  }

  if (
    text.includes("technology") ||
    text.includes("technologies") ||
    text.includes("tech stack")
  ) {
    return "His web development stack includes HTML, CSS, JavaScript, Bootstrap, React.js, Node.js, Express.js, MongoDB, REST APIs, Git, and GitHub.";
  }

  if (text.includes("experience") || text.includes("work")) {
    return "Tariq has experience in frontend development, backend development, web development, AI/ML, and Computer Vision. He has also worked on an intelligent dairy health monitoring project using computer vision.";
  }

  if (
    text.includes("contact") ||
    text.includes("hire") ||
    text.includes("email")
  ) {
    return "You can contact Tariq through the Contact section of this portfolio. You can also use the contact form to send him a message directly.";
  }

  if (text.includes("react")) {
    return "Yes! Tariq works with React.js to build modern, responsive, and interactive web applications.";
  }

  if (
    text.includes("frontend") ||
    text.includes("front-end")
  ) {
    return "Tariq has strong frontend development skills with HTML, CSS, JavaScript, Bootstrap, React.js, responsive design, and modern UI development.";
  }

  if (
    text.includes("backend") ||
    text.includes("back-end")
  ) {
    return "Tariq also works with backend technologies including Node.js, Express.js, REST APIs, and MongoDB.";
  }

  if (
    text.includes("github") ||
    text.includes("git")
  ) {
    return "Tariq uses Git and GitHub for version control, project management, collaboration, and deploying his web development projects.";
  }

  return "I'm currently focused on answering questions about Tariq's portfolio. Try asking about his skills, projects, experience, technologies, React, frontend, backend, or contact information.";
};

function RobotIcon() {
  return (
    <div className="ai-bot-icon">
      <div className="bot-antenna"></div>

      <div className="bot-head">
        <div className="bot-ear bot-ear-left"></div>
        <div className="bot-ear bot-ear-right"></div>

        <div className="bot-face">
          <span className="bot-eye"></span>
          <span className="bot-eye"></span>
        </div>

        <div className="bot-mouth"></div>
      </div>
    </div>
  );
}

function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! 👋 I'm Tariq's AI Assistant. Ask me anything about his skills, projects, experience, or technologies.",
    },
  ]);

  const [input, setInput] = useState("");

  // Reference to the chat messages container
  const messagesEndRef = useRef(null);

  // Reference to the complete chatbot
  const chatbotRef = useRef(null);

  // Show greeting after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGreeting(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Automatically hide greeting
  useEffect(() => {
    if (!showGreeting) return;

    const timer = setTimeout(() => {
      setShowGreeting(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, [showGreeting]);

  // Automatically scroll to the newest message
  useEffect(() => {
    if (!isOpen) return;

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isOpen]);

  // Close chatbot when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        chatbotRef.current &&
        !chatbotRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const sendMessage = (messageText = input) => {
    const trimmedMessage = messageText.trim();

    if (!trimmedMessage) return;

    const userMessage = {
      sender: "user",
      text: trimmedMessage,
    };

    const botMessage = {
      sender: "bot",
      text: getBotResponse(trimmedMessage),
    };

    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
      botMessage,
    ]);

    setInput("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  const handleQuickQuestion = (question) => {
    sendMessage(question);
  };

  const handleOpenChat = () => {
    setIsOpen(true);
    setShowGreeting(false);
  };

  const handleCloseChat = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Chatbot window */}
      {isOpen && (
        <div
          className="ai-chatbot"
          ref={chatbotRef}
        >
          {/* Header */}
          <div className="ai-chatbot-header">
            <div className="ai-chatbot-title">
              <div className="ai-header-avatar">
                <RobotIcon />
              </div>

              <div>
                <h3>Tariq AI Assistant</h3>

                <span className="ai-status">
                  <span className="online-dot"></span>
                  Online
                </span>
              </div>
            </div>

            <button
              className="ai-close-button"
              onClick={handleCloseChat}
              aria-label="Close chatbot"
            >
              <FiX />
            </button>
          </div>

          {/* Messages */}
          <div className="ai-chatbot-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`ai-message ${
                  message.sender === "user"
                    ? "ai-user-message"
                    : "ai-bot-message"
                }`}
              >
                {message.text}
              </div>
            ))}

            {/* Invisible element at the bottom */}
            <div ref={messagesEndRef} />

            {/* Quick questions */}
            {messages.length === 1 && (
              <div className="ai-quick-questions">
                <p>What would you like to know?</p>

                {quickQuestions.map((question) => (
                  <button
                    key={question}
                    onClick={() => handleQuickQuestion(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <form
            className="ai-chatbot-input"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Ask me something..."
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />

            <button
              type="submit"
              aria-label="Send message"
            >
              <FiSend />
            </button>
          </form>
        </div>
      )}

      {/* Floating assistant */}
      {!isOpen && (
        <>
          {/* Welcome message */}
          {showGreeting && (
            <div
              className="ai-welcome-message"
              onClick={handleOpenChat}
            >
              <button
                className="ai-welcome-close"
                onClick={(event) => {
                  event.stopPropagation();
                  setShowGreeting(false);
                }}
                aria-label="Close welcome message"
              >
                <FiX />
              </button>

              <div className="ai-welcome-content">
                <div className="ai-welcome-icon">
                  <RobotIcon />
                </div>

                <div>
                  <strong>
                    Hi, I'm Tariq's AI Assistant 👋
                  </strong>

                  <p>
                    Have a question about my skills or projects?
                  </p>

                  <span>Click to chat →</span>
                </div>
              </div>
            </div>
          )}

          {/* AI button */}
          <button
            className="ai-chatbot-button"
            onClick={handleOpenChat}
            aria-label="Open Tariq AI Assistant"
          >
            <RobotIcon />
            <span>Ask AI</span>
          </button>
        </>
      )}
    </>
  );
}

export default AIChatbot;