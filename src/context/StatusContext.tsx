import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export type WebsiteStatus = 'online' | 'maintenance' | 'offline';
export type RealmStatus = 'open' | 'closed';

interface StatusContextType {
  status: WebsiteStatus;
  realmStatus: RealmStatus;
  realmLink: string;
  isLoading: boolean;
  updateStatus: (newStatus: WebsiteStatus) => Promise<void>;
  updateRealmStatus: (newStatus: RealmStatus) => Promise<void>;
  updateRealmLink: (newLink: string) => Promise<void>;
}

const StatusContext = createContext<StatusContextType | undefined>(undefined);

export const StatusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState<WebsiteStatus>('online');
  const [realmStatus, setRealmStatus] = useState<RealmStatus>('open');
  const [realmLink, setRealmLink] = useState<string>('https://verify.realmbot.dev/i/celestial_smp_join');
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
        
        if (data.realmLink) {
          setRealmLink(data.realmLink.toString());
        }
      } else {
        console.warn("Status document missing at 'settings/status'. Initializing default protocol...");
        setDoc(statusDocRef, { 
          current: 'online', 
          realm: 'open',
          realmLink: 'https://verify.realmbot.dev/i/celestial_smp_join',
          lastUpdated: Date.now() 
        });
        setStatus('online');
        setRealmStatus('open');
        setRealmLink('https://verify.realmbot.dev/i/celestial_smp_join');
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

  const updateRealmLink = async (newLink: string) => {
    const statusDocRef = doc(db, 'settings', 'status');
    const updatePayload = { 
      realmLink: newLink,
      lastUpdated: Date.now()
    };
    
    try {
      console.log(`Setting realm link to: ${newLink}`);
      await setDoc(statusDocRef, updatePayload, { merge: true });
    } catch (error) {
      console.error("Critical error updating realm link:", error);
      throw error;
    }
  };

  return (
    <StatusContext.Provider value={{ status, realmStatus, realmLink, isLoading, updateStatus, updateRealmStatus, updateRealmLink }}>
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
