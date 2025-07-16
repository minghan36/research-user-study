'use client';

import { createContext, useContext, useState } from 'react';

// Create the context
const ParticipantContext = createContext();

// Create a provider component
export function ParticipantProvider({ children }) {
  const [participantId, setParticipantId] = useState(null);
  const [groupNumber, setGroupNumber] = useState(0);

  // Function to set participant data
  const setParticipantData = (id, group) => {
    setParticipantId(id);
    setGroupNumber(group);
  };

  // Function to clear participant data
  const clearParticipantData = () => {
    setParticipantId(null);
    setGroupNumber(null);
  };

  const value = {
    participantId,
    groupNumber,
    setParticipantData,
    clearParticipantData,
    setParticipantId,
    setGroupNumber,
  };

  return (
    <ParticipantContext.Provider value={value}>
      {children}
    </ParticipantContext.Provider>
  );
}

// Custom hook to use the participant context
export function useParticipant() {
  const context = useContext(ParticipantContext);
  
  if (context === undefined) {
    throw new Error('useParticipant must be used within a ParticipantProvider');
  }
  
  return context;
}

// Export the context for advanced usage if needed
export { ParticipantContext };
