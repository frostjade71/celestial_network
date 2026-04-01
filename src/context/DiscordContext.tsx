import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface DiscordMember {
  id: string;
  username: string;
  discriminator: string;
  status: string;
  avatar_url: string;
  channel_id?: string;
  game?: { name: string };
}

interface DiscordChannel {
  id: string;
  name: string;
  position: number;
}

interface DiscordData {
  id: string;
  name: string;
  instant_invite: string;
  channels: DiscordChannel[];
  members: DiscordMember[];
  presence_count: number;
}

interface DiscordContextType {
  data: DiscordData | null;
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

const DiscordContext = createContext<DiscordContextType | undefined>(undefined);

export const DiscordProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<DiscordData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const guildId = '1267622655201378314';

  const fetchDiscordData = useCallback(async () => {
    try {
      const response = await fetch(`https://discord.com/api/guilds/${guildId}/widget.json`);
      if (!response.ok) throw new Error('Failed to fetch Discord data');
      const jsonData = await response.json();
      setData(jsonData);
      setError(null);
    } catch (err) {
      console.error('Discord fetch error:', err);
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [guildId]);

  useEffect(() => {
    fetchDiscordData();
    // Refresh every 30 seconds
    const interval = setInterval(fetchDiscordData, 30000);
    return () => clearInterval(interval);
  }, [fetchDiscordData]);

  return (
    <DiscordContext.Provider value={{ data, loading, error, refresh: fetchDiscordData }}>
      {children}
    </DiscordContext.Provider>
  );
};

export const useDiscord = () => {
  const context = useContext(DiscordContext);
  if (context === undefined) {
    throw new Error('useDiscord must be used within a DiscordProvider');
  }
  return context;
};
