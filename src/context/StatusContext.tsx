import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export type WebsiteStatus = 'online' | 'maintenance' | 'offline';
export type RealmStatus = 'open' | 'closed';

interface StatusContextType {
  status: WebsiteStatus;
  realmStatus: RealmStatus;
  isLoading: boolean;
  updateStatus: (newStatus: WebsiteStatus) => Promise<void>;
  updateRealmStatus: (newStatus: RealmStatus) => Promise<void>;
}

const StatusContext = createContext<StatusContextType | undefined>(undefined);

export const StatusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState<WebsiteStatus>('online');
  const [realmStatus, setRealmStatus] = useState<RealmStatus>('open');
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

        if (data.realm) {
          setRealmStatus(data.realm.toString().toLowerCase() as RealmStatus);
        }
      } else {
        console.warn("Status document missing at 'settings/status'. Initializing default protocol...");
        setDoc(statusDocRef, { 
          current: 'online', 
          realm: 'open',
          lastUpdated: Date.now() 
        });
        setStatus('online');
        setRealmStatus('open');
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
      console.log(`Setting website status to: ${newStatus}`);
      await setDoc(statusDocRef, updatePayload, { merge: true });
    } catch (error) {
      console.error("Critical error updating website status:", error);
      throw error;
    }
  };

  const updateRealmStatus = async (newStatus: RealmStatus) => {
    const statusDocRef = doc(db, 'settings', 'status');
    const updatePayload = { 
      realm: newStatus,
      lastUpdated: Date.now()
    };
    
    try {
      console.log(`Setting realm status to: ${newStatus}`);
      await setDoc(statusDocRef, updatePayload, { merge: true });
    } catch (error) {
      console.error("Critical error updating realm status:", error);
      throw error;
    }
  };

  return (
    <StatusContext.Provider value={{ status, realmStatus, isLoading, updateStatus, updateRealmStatus }}>
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
