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
import axios from "axios";
import { ThreeDot } from "react-loading-indicators";
import { useAppContext } from "modules/context-api/AppContext";
const ChatAssistant = () => {
  const {
    chatMessages,
    setChatMessages,
    chatInputText,
    setChatInputText,
    chatConversationEnded,
    setChatConversationEnded,
    chatUpdatedRules,
    setChatUpdatedRules,
  } = useAppContext();

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const parseData = (data) => {
    const sections = data.split(/\n\n/);
    return sections.map((section, index) => {
      const [titleLine, ...rules] = section.split("\n");
      const title = titleLine.replace(/\d+\)/, "").trim();
      const formattedRules = rules.map((r) => r.replace(/^[-•]\s*/, "").trim());
      return { number: index + 1, title, rules: formattedRules };
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSendMessage = async () => {
    if (!chatInputText.trim() || chatConversationEnded) return;

    // Add user message
    const userMessage = { text: chatInputText, isBot: false };
    setChatMessages((prev) => [...prev, userMessage]);
    const botMessage = {
      text: (
        <ThreeDot
          variant="pulsate"
          color="#d32f2f"
          size="medium"
          text=""
          textColor=""
        />
      ),
      isBot: true,
    };
    setChatMessages((prev) => [...prev, botMessage]);
    setChatInputText("");

    try {
      // Send the user message to the bot's backend
      const response = await axios
        .post("http://127.0.0.1:8000/refineRules", {
          text: chatInputText,
        })
        .then((response) => {
          console.log(response.data);
          setChatMessages((prev) => prev.slice(0, prev.length - 1));

          if (response.data.error != null) {
            const botResponse = {
              text: "Please generate rules first.",
              isBot: true,
            };
            setChatMessages((prev) => [...prev, botResponse]);
          } else {
            const fields = parseData(response.data.refined_text);
            const botResponse = {
              text: (
                <div className="p-4 space-y-4">
                  {fields &&
                    fields.map(
                      (field, index) =>
                        field.title &&
                        field.title !== "." && ( // Check if title exists and is not '.'
                          <div
                            key={index}
                            className="border rounded-lg p-4 shadow-md"
                          >
                            <h3 className="text-sm text-blue-200 mb-2">
                              {`${field?.title?.replace(/\*\*/g, "") || ""}`}
                            </h3>
                            <ul className="list-decimal pl-6 space-y-1">
                              {field.rules.map((rule, idx) => (
                                <p key={idx} className="text-gray-200">
                                  {rule}
                                </p>
                              ))}
                            </ul>
                          </div>
                        )
                    )}
                </div>
              ),
              isBot: true,
            };

            setChatMessages((prev) => [...prev, botResponse]);
          }
        })
        .catch((error) => {
          const botResponse = {
            text: "Unkown error occured.",
            isBot: true,
          };
          setChatMessages((prev) => [...prev, botResponse]);
        });

      // Finalize conversation on specific trigger
      if (chatInputText.toLowerCase().includes("finalize")) {
        const finalResponse = {
          text: "Conversation finalized. Here are the updated compliance rules:",
          isBot: true,
          isFinal: true,
        };
        setChatMessages((prev) => [...prev, finalResponse]);
        setChatConversationEnded(true);
        setChatUpdatedRules([
          "Updated Data Protection Policy v2.1",
          "Revised Privacy Compliance Standard 4.3",
          "New Financial Regulation Implementation Guide",
        ]);
      }

    } catch (error) {
      console.error("Error communicating with the bot:", error);
      const errorResponse = {
        text: "Sorry, there was an error processing your request.",
        isBot: true,
      };
      setChatMessages((prev) => [...prev, errorResponse]);
    }
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
          sx={{ minHeight: "30vh", overflow: "auto", mb: 2, p: 1 }}
        >
          <List sx={{ p: 0 }}>
            {chatMessages.map((msg, index) => (
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
                            setChatConversationEnded(false);
                          setChatMessages([]);
                          setChatUpdatedRules([]);
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

        {!chatConversationEnded ? (
          <Stack direction="row" spacing={1} alignItems="flex-end">
            <TextField
              fullWidth
              multiline
              rows={1}
              value={chatInputText}
              onChange={(e) => setChatInputText(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && !e.shiftKey && handleSendMessage()
              }
              placeholder="Type your message..."
              disabled={chatConversationEnded}
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
              disabled={!chatInputText.trim() || chatConversationEnded}
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
              {chatUpdatedRules.map((rule, index) => (
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
