import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_CHAT_API_URL || 'http://127.0.0.1:3001/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
  type: 'text' | 'voice';
}

export interface ChatSession {
  sessionId: string;
  createdAt: string;
  status: string;
}

export interface SendMessageResponse {
  userMessage: Message;
  aiResponse: Message;
}

// 새 채팅 세션 생성
export const createChatSession = async (): Promise<ChatSession> => {
  try {
    const response = await apiClient.post('/chat/sessions');
    return response.data;
  } catch (error) {
    console.error('Failed to create chat session:', error);
    throw new Error('채팅 세션 생성에 실패했습니다');
  }
};

// 메시지 전송
export const sendMessage = async (
  sessionId: string,
  content: string,
  type: 'text' | 'voice' = 'text'
): Promise<SendMessageResponse> => {
  try {
    const response = await apiClient.post(`/chat/sessions/${sessionId}/messages`, {
      content,
      type,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to send message:', error);
    throw new Error('메시지 전송에 실패했습니다');
  }
};

// 메시지 히스토리 조회
export const getMessageHistory = async (sessionId: string): Promise<Message[]> => {
  try {
    const response = await apiClient.get(`/chat/sessions/${sessionId}/messages`);
    return response.data.messages;
  } catch (error) {
    console.error('Failed to get message history:', error);
    throw new Error('메시지 히스토리 조회에 실패했습니다');
  }
};

// 세션 상태 확인
export const getSessionStatus = async (sessionId: string) => {
  try {
    const response = await apiClient.get(`/chat/sessions/${sessionId}/status`);
    return response.data;
  } catch (error) {
    console.error('Failed to get session status:', error);
    throw new Error('세션 상태 확인에 실패했습니다');
  }
};

// 세션 삭제
export const deleteSession = async (sessionId: string): Promise<void> => {
  try {
    await apiClient.delete(`/chat/sessions/${sessionId}`);
  } catch (error) {
    console.error('Failed to delete session:', error);
    throw new Error('세션 삭제에 실패했습니다');
  }
};

export default apiClient; 