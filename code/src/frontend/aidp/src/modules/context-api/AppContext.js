// content-panel-context.js
import { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Generate Rules State
  const [generatedRules, setGeneratedRules] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Refine Rules State
const [chatMessages, setChatMessages] = useState([]);
const [chatInputText, setChatInputText] = useState("");
const [chatConversationEnded, setChatConversationEnded] = useState(false);
const [chatUpdatedRules, setChatUpdatedRules] = useState([]);

  // Risk Scoring State
  const [riskScores, setRiskScores] = useState({});
  const [scoringModels, setScoringModels] = useState([]);

  const value = {
    // Generate Rules
    generatedRules,
    setGeneratedRules,
    uploadedFiles,
    setUploadedFiles,
    
    // Refine Rules
    chatMessages, setChatMessages,
    chatInputText, setChatInputText,
    chatConversationEnded, setChatConversationEnded,
    chatUpdatedRules, setChatUpdatedRules,
    
    // Risk Scoring
    riskScores,
    setRiskScores,
    scoringModels,
    setScoringModels
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};