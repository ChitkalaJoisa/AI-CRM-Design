import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { updateInteraction } from "../redux/interactionSlice";
import { processInteraction } from "../services/api";
import { useState, useRef, useEffect } from "react";

export default function AIChatPanel() {
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const chatEndRef = useRef(null);

  const currentInteraction = useSelector(
    (state) => state.interaction
  );

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chatHistory]);

  const handleAILog = async () => {
    if (!message.trim()) return;

    // Add user message immediately
    const userMessage = message;

    setChatHistory((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setMessage("");

    try {
      setLoading(true);

      const result = await processInteraction(
        userMessage,
        currentInteraction
      );

      console.log("Full API Result:", result);
      console.log(
        "Extracted Data:",
        result.extracted_data
      );

      const futureKeywords = [
        "tomorrow",
        "next week",
        "next month",
        "next monday",
        "next tuesday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
        "scheduled",
        "will meet",
        "meeting on",
      ];

      const hasFutureDate = futureKeywords.some(
        keyword =>
          userMessage.toLowerCase().includes(keyword)
      );

      const hasTime =
        /\b\d{1,2}(:\d{2})?\s?(am|pm)\b/i.test(userMessage) ||
        /\b\d{1,2}:\d{2}\b/.test(userMessage);

      if (hasFutureDate && !hasTime) {
        setChatHistory(prev => [
          ...prev,
          {
            sender: "ai",
            text: "I noticed this interaction is scheduled for a future date. What time is the meeting?"
          }
        ]);
      }

      dispatch(
        updateInteraction(
          result.extracted_data
        )
      );

      setChatHistory((prev) => [
        ...prev,
        {
          sender: "ai",
          text: result.response,
        },
      ]);
    } catch (error) {
      console.error(error);

      setChatHistory((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Failed to process interaction.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      sx={{
        borderRadius: 4,
        height: "calc(100vh - 120px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <CardContent sx={{ pb: 1 }}>
        <Typography
          variant="h5"
          fontWeight={700}
          color="primary"
        >
          🤖 AI Assistant
        </Typography>

        <Typography color="gray">
          Log interaction details via chat
        </Typography>
      </CardContent>

      {/* Scrollable Chat Area */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          px: 2,
          pb: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {chatHistory.length === 0 && (
          <Box
            sx={{
              background: "#E6F7FB",
              padding: 2,
              borderRadius: 2,
            }}
          >
            <Typography
              variant="body2"
              fontWeight={600}
            >
              Try saying:
            </Typography>

            <br />

            <Typography variant="body2">
              Met Dr Shetty at Apollo
              Hospital.
              <br />
              Discussed CardioPlus efficacy.
              <br />
              Shared clinical brochure.
            </Typography>
          </Box>
        )}

        {chatHistory.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent:
                msg.sender === "user"
                  ? "flex-end"
                  : "flex-start",
            }}
          >
            <Box
              sx={{
                maxWidth: "75%",
                padding: "12px 16px",
                borderRadius: "18px",
                whiteSpace: "pre-wrap",
                background:
                  msg.sender === "user"
                    ? "#1976d2"
                    : "#E6F7FB",
                color:
                  msg.sender === "user"
                    ? "white"
                    : "black",
              }}
            >
              {msg.text}
            </Box>
          </Box>
        ))}

        {/* Auto scroll target */}
        <div ref={chatEndRef} />
      </Box>

      {/* Input Area */}
      <Box
        sx={{
          p: 2,
          borderTop: "1px solid #e0e0e0",
          display: "flex",
          gap: 2,
        }}
      >
        <TextField
          fullWidth
          multiline
          minRows={2}
          placeholder="Describe interaction..."
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              !e.shiftKey
            ) {
              e.preventDefault();
              handleAILog();
            }
          }}
        />

        <Button
          variant="contained"
          disabled={loading}
          onClick={handleAILog}
          sx={{
            borderRadius: 4,
            minWidth: 100,
          }}
        >
          {loading
            ? "Logging..."
            : "AI Log"}
        </Button>
      </Box>
    </Card>
  );
}