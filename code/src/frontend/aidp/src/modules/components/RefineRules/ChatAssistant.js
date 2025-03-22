import { Refresh, Send, SmartToy } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";

const ChatAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isConversationEnded, setIsConversationEnded] = useState(false);
  const [updatedRules, setUpdatedRules] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isConversationEnded) return;

    // Add user message
    const userMessage = { text: inputText, isBot: false };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    // Simulate bot response
    setTimeout(async () => {
      const botResponse = {
        text: `Thank you for your input. We're processing: "${inputText}"`,
        isBot: true,
      };
      setMessages((prev) => [...prev, botResponse]);

      // Finalize conversation on specific trigger
      if (inputText.toLowerCase().includes("finalize")) {
        const finalResponse = {
          text: "Conversation finalized. Here are the updated compliance rules:",
          isBot: true,
          isFinal: true,
        };
        setMessages((prev) => [...prev, finalResponse]);
        setIsConversationEnded(true);
        setUpdatedRules([
          "Updated Data Protection Policy v2.1",
          "Revised Privacy Compliance Standard 4.3",
          "New Financial Regulation Implementation Guide",
        ]);
      }
    }, 1500);
  };

  return (
    <Box sx={{ maxWidth: "auto", mx: "auto", p: 3 }}>
      <Paper elevation={3} sx={{ p: 2, borderRadius: "12px" }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <SmartToy color="primary" sx={{ fontSize: 40 }} />
          <Typography variant="h5" component="h1" color="primary">
            Compliance Assistant
          </Typography>
        </Stack>

        <Paper
          variant="outlined"
          sx={{ height: "30vh", overflow: "auto", mb: 2, p: 1 }}
        >
          <List sx={{ p: 0 }}>
            {messages.map((msg, index) => (
              <ListItem
                key={index}
                sx={{
                  justifyContent: msg.isBot ? "flex-start" : "flex-end",
                  alignItems: "flex-start",
                  py: 0.5,
                }}
              >
                {msg.isBot && (
                  <ListItemAvatar sx={{ minWidth: 40 }}>
                    <Avatar
                      sx={{
                        bgcolor: "primary.main",
                        width: 30,
                        height: 30,
                        "& svg": { fontSize: "18px" },
                      }}
                    >
                      <SmartToy fontSize="inherit" />
                    </Avatar>
                  </ListItemAvatar>
                )}
                <Paper
                  sx={{
                    p: 1,
                    bgcolor: msg.isBot ? "action.hover" : "primary.main",
                    color: msg.isBot ? "text.primary" : "common.white",
                    maxWidth: "85%",
                    borderRadius: msg.isBot
                      ? "4px 12px 12px 12px"
                      : "12px 4px 12px 12px",
                  }}
                >
                  <ListItemText
                    primary={msg.text}
                    primaryTypographyProps={{
                      sx: {
                        fontSize: "0.9rem",
                        lineHeight: 1.3,
                      },
                    }}
                    secondary={
                      msg.isFinal && (
                        <Typography variant="caption" color="text.secondary">
                          Finalized at {new Date().toLocaleTimeString()}
                        </Typography>
                      )
                    }
                  />
                  {msg.isFinal && (
                    <>
                      <Box sx={{ textAlign: "center", mt: 2 }}>
                        <Button
                          variant="outlined"
                          color="primary"
                          startIcon={<Refresh />}
                          onClick={() => {
                            setIsConversationEnded(false);
                            setMessages([]);
                            setUpdatedRules([]);
                          }}
                          sx={{
                            borderRadius: "20px",
                            px: 4,
                            py: 1,
                            fontSize: "0.8rem",
                          }}
                        >
                          Start New Session
                        </Button>
                      </Box>
                    </>
                  )}
                </Paper>
              </ListItem>
            ))}
            <div ref={messagesEndRef} />
          </List>
        </Paper>

        {!isConversationEnded ? (
          <Stack direction="row" spacing={1} alignItems="flex-end">
            <TextField
              fullWidth
              multiline
              rows={1}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && !e.shiftKey && handleSendMessage()
              }
              placeholder="Type your message..."
              disabled={isConversationEnded}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  alignItems: "flex-start",
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isConversationEnded}
              endIcon={<Send />}
              sx={{
                height: "56px",
                borderRadius: "8px",
                px: 3,
              }}
            >
              Send
            </Button>
          </Stack>
        ) : (
          <Box sx={{ textAlign: "left", mt: 3 }}>
            <Typography
              variant="h6"
              gutterBottom
              color="success.main"
              sx={{
                fontWeight: 500,
                margin: 0,
              }}
            >
              Final Compliance Rules
            </Typography>
            <List dense sx={{ mb: 3 }}>
              {updatedRules.map((rule, index) => (
                <ListItem key={index} sx={{ py: 0.5 }}>
                  <ListItemText
                    primary={`• ${rule}`}
                    primaryTypographyProps={{
                      color: "dark",
                      variant: "body1",
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ChatAssistant;
