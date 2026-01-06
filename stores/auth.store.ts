import { create } from 'zustand';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setAuth: (user: User, token: string) => void;
}

// 模擬 API 延遲
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// 模擬用戶資料庫（僅用於假資料測試）
const mockUsers: { email: string; password: string; id: string }[] = [
  { id: '1', email: 'test@example.com', password: 'password123' },
];

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true });

    await delay(800); // 模擬網路延遲

    // 模擬登入驗證
    const user = mockUsers.find((u) => u.email === email && u.password === password);

    if (!user) {
      set({ isLoading: false });
      throw new Error('帳號或密碼錯誤');
    }

    const mockToken = `mock-token-${Date.now()}`;

    set({
      user: { id: user.id, email: user.email },
      token: mockToken,
      isAuthenticated: true,
      isLoading: false,
    });
  },

  register: async (email: string, password: string) => {
    set({ isLoading: true });

    await delay(800);

    // 檢查 email 是否已存在
    const exists = mockUsers.some((u) => u.email === email);
    if (exists) {
      set({ isLoading: false });
      throw new Error('此 Email 已被註冊');
    }

    // 建立新用戶
    const newUser = {
      id: String(mockUsers.length + 1),
      email,
      password,
    };
    mockUsers.push(newUser);

    const mockToken = `mock-token-${Date.now()}`;

    set({
      user: { id: newUser.id, email: newUser.email },
      token: mockToken,
      isAuthenticated: true,
      isLoading: false,
    });
  },

  logout: () => {
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },

  setAuth: (user: User, token: string) => {
    set({
      user,
      token,
      isAuthenticated: true,
    });
  },
}));
