import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./Messages.css";

const Messages = () => {
  const [searchParams] = useSearchParams();
  const [connections, setConnections] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const initializeMessages = () => {
      try {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        if (!user) {
          setLoading(false);
          return;
        }
        setCurrentUser(user);

        // Get user's connections
        const allConnections = JSON.parse(localStorage.getItem("connections")) || [];
        const userConnections = allConnections.filter(conn => 
          conn.user1 === user.id || conn.user2 === user.id
        );

        // Get connected users' details
        const connectedUsers = userConnections.map(conn => {
          const isUser1 = conn.user1 === user.id;
          return {
            id: isUser1 ? conn.user2 : conn.user1,
            username: isUser1 ? conn.user2Username : conn.user1Username,
            connectedAt: conn.connectedAt
          };
        });

        setConnections(connectedUsers);

        // Check if a specific user is selected from URL params
        const targetUserId = searchParams.get("user");
        const targetUsername = searchParams.get("username");
        
        if (targetUserId && targetUsername) {
          const targetUser = connectedUsers.find(u => u.id === targetUserId);
          if (targetUser) {
            setSelectedUser(targetUser);
            loadMessages(user.id, targetUserId);
          }
        } else if (connectedUsers.length > 0) {
          // Select first connected user by default
          setSelectedUser(connectedUsers[0]);
          loadMessages(user.id, connectedUsers[0].id);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error initializing messages:", error);
        setLoading(false);
      }
    };

    initializeMessages();
  }, [searchParams]);

  const loadMessages = (currentUserId, otherUserId) => {
    try {
      const allMessages = JSON.parse(localStorage.getItem("messages")) || [];
      const conversationMessages = allMessages.filter(msg => 
        (msg.from === currentUserId && msg.to === otherUserId) ||
        (msg.from === otherUserId && msg.to === currentUserId)
      );

      // Sort messages by timestamp
      conversationMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      setMessages(conversationMessages);
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    loadMessages(currentUser.id, user.id);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedUser || !currentUser) return;

    try {
      const allMessages = JSON.parse(localStorage.getItem("messages")) || [];
      const message = {
        id: Date.now().toString(),
        from: currentUser.id,
        to: selectedUser.id,
        fromUsername: currentUser.username,
        toUsername: selectedUser.username,
        content: newMessage.trim(),
        timestamp: new Date().toISOString()
      };

      allMessages.push(message);
      localStorage.setItem("messages", JSON.stringify(allMessages));

      // Update current conversation
      setMessages(prev => [...prev, message]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  if (loading) {
    return (
      <div className="messages-container">
        <h2>💬 Loading Messages...</h2>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="messages-container">
        <h2>❌ Please login to view messages</h2>
      </div>
    );
  }

  if (connections.length === 0) {
    return (
      <div className="messages-container">
        <h2>💬 Messages</h2>
        <div className="no-connections">
          <p>You don't have any connections yet.</p>
          <p>Connect with potential roommates to start messaging!</p>
          <button 
            className="find-matches-btn"
            onClick={() => window.location.href = "/match"}
          >
            🎯 Find Matches
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="messages-container">
      <h2>💬 Messages</h2>
      
      <div className="messages-layout">
        {/* Connections Sidebar */}
        <div className="connections-sidebar">
          <h3>Connected Users</h3>
          <div className="connections-list">
            {connections.map((user) => (
              <div
                key={user.id}
                className={`connection-item ${selectedUser?.id === user.id ? 'active' : ''}`}
                onClick={() => handleUserSelect(user)}
              >
                <div className="user-avatar">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div className="user-info">
                  <div className="username">{user.username}</div>
                  <div className="connection-date">
                    Connected {formatDate(user.connectedAt)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="chat-area">
          {selectedUser ? (
            <>
              {/* Chat Header */}
              <div className="chat-header">
                <div className="chat-user-info">
                  <div className="user-avatar">
                    {selectedUser.username.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="username">{selectedUser.username}</div>
                    <div className="connection-status">Connected</div>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="messages-list">
                {messages.length === 0 ? (
                  <div className="no-messages">
                    <p>No messages yet. Start the conversation!</p>
                  </div>
                ) : (
                  messages.map((message) => {
                    const isOwnMessage = message.from === currentUser.id;
                    return (
                      <div
                        key={message.id}
                        className={`message ${isOwnMessage ? 'own' : 'other'}`}
                      >
                        <div className="message-content">
                          <div className="message-text">{message.content}</div>
                          <div className="message-time">
                            {formatTime(message.timestamp)}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Message Input */}
              <div className="message-input">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  rows="3"
                />
                <button 
                  className="send-btn"
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  📤 Send
                </button>
              </div>
            </>
          ) : (
            <div className="no-chat-selected">
              <p>Select a user to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages; 