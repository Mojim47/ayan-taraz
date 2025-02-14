export namespace Chat {
    export interface Message {
      id: string;
      content: string;
      sender: string;
      timestamp: number;
      type: 'text' | 'image' | 'file';
      status: 'sent' | 'delivered' | 'read';
    }
  
    export interface Room {
      id: string;
      name: string;
      participants: string[];
      lastMessage: Message;
      unreadCount: number;
    }
  
    export interface ChatTypes {
      rooms: Room[];
      activeRoom: string | null;
      messages: Record<string, Message[]>;
      loading: boolean;
      error: string | null;
    }
  }