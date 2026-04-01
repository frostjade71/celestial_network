import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export type WebsiteStatus = 'online' | 'maintenance' | 'offline';

interface StatusContextType {
  status: WebsiteStatus;
  isLoading: boolean;
  updateStatus: (newStatus: WebsiteStatus) => Promise<void>;
}

const StatusContext = createContext<StatusContextType | undefined>(undefined);

export const StatusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState<WebsiteStatus>('online');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const statusDocRef = doc(db, 'settings', 'status');

    // Subscribe to status changes in real-time
    const unsubscribe = onSnapshot(statusDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("Status Protocol received from Firestore:", data);
        if (data.current) {
          // Normalize to lowercase to prevent case-sensitivity issues
          setStatus(data.current.toString().toLowerCase() as WebsiteStatus);
        }
      } else {
        console.warn("Status document missing at 'settings/status'. Initializing default protocol...");
        setDoc(statusDocRef, { current: 'online', lastUpdated: Date.now() });
        setStatus('online');
      }
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching live status:", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateStatus = async (newStatus: WebsiteStatus) => {
    const statusDocRef = doc(db, 'settings', 'status');
    const updatePayload = { 
      current: newStatus,
      lastUpdated: Date.now()
    };
    
    try {
      console.log(`Setting status to: ${newStatus}`);
      await setDoc(statusDocRef, updatePayload, { merge: true });
    } catch (error) {
      console.error("Critical error updating status:", error);
      throw error; // Re-throw to allow component-level handling
    }
  };

  return (
    <StatusContext.Provider value={{ status, isLoading, updateStatus }}>
      {children}
    </StatusContext.Provider>
  );
};

export const useStatus = () => {
  const context = useContext(StatusContext);
  if (context === undefined) {
    throw new Error('useStatus must be used within a StatusProvider');
  }
  return context;
};
