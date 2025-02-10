// src/services/chat/ChatService.ts
import axios from 'axios';
import { ErrorService } from '../ErrorService';
export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface ChatResponse {
  text: string;
  suggestions?: string[];
  action?: {
    type: 'REDIRECT' | 'CALCULATE_TAX' | 'BOOK_CONSULTATION';
    payload?: any;
  };
}

export class ChatService {
  private static readonly API_URL = '/api/chat';
  private static readonly TAX_KEYWORDS = [
    'مالیات',
    'محاسبه',
    'درآمد',
    'مالیاتی',
  ];
  private static readonly CONSULTATION_KEYWORDS = [
    'مشاوره',
    'وقت',
    'رزرو',
    'قرار',
  ];

  static async sendMessage(message: string): Promise<ChatResponse> {
    try {
      // در نسخه واقعی، این بخش به API متصل می‌شود
      // فعلاً یک نمونه ساده پیاده‌سازی می‌کنیم
      const lowerMessage = message.toLowerCase();

      // تشخیص نوع درخواست
      if (this.TAX_KEYWORDS.some(keyword => lowerMessage.includes(keyword))) {
        return {
          text: 'آیا مایل به محاسبه مالیات هستید؟',
          suggestions: ['بله، محاسبه کن', 'خیر، سوال دیگری دارم'],
          action: {
            type: 'CALCULATE_TAX',
          },
        };
      }

      if (
        this.CONSULTATION_KEYWORDS.some(keyword =>
          lowerMessage.includes(keyword)
        )
      ) {
        return {
          text: 'آیا می‌خواهید وقت مشاوره رزرو کنید؟',
          suggestions: ['بله، رزرو کن', 'اطلاعات بیشتر'],
          action: {
            type: 'BOOK_CONSULTATION',
          },
        };
      }

      return {
        text: 'چطور می‌توانم کمکتان کنم؟',
        suggestions: ['محاسبه مالیات', 'رزرو مشاوره', 'سوالات متداول'],
      };
    } catch (error) {
      await ErrorService.logError({
        severity: 'error',
        source: 'client',
        message: 'Chat service error',
        context: { message },
      });
      throw error;
    }
  }
}
