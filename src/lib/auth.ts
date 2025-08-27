import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'investor' | 'admin' | 'ops' | 'compliance';
  language: 'en' | 'ur';
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  requiresTwoFactor: boolean;
  login: (email: string, password: string) => Promise<{ requiresTwoFactor?: boolean }>;
  verify2FA: (code: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  language: 'en' | 'ur';
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      requiresTwoFactor: false,

      login: async (email: string, password: string) => {
        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Login failed');
          }

          const data = await response.json();

          if (data.requiresTwoFactor) {
            set({ 
              token: data.token, 
              requiresTwoFactor: true,
              user: data.user 
            });
            return { requiresTwoFactor: true };
          } else {
            set({
              user: data.user,
              token: data.token,
              isAuthenticated: true,
              requiresTwoFactor: false,
            });
            return {};
          }
        } catch (error) {
          throw error;
        }
      },

      verify2FA: async (code: string) => {
        const { token } = get();
        if (!token) throw new Error('No token available');

        try {
          const response = await fetch('/api/auth/verify-2fa', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token, code }),
          });

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || '2FA verification failed');
          }

          const data = await response.json();
          set({
            user: data.user,
            isAuthenticated: true,
            requiresTwoFactor: false,
          });
        } catch (error) {
          throw error;
        }
      },

      register: async (data: RegisterData) => {
        try {
          const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Registration failed');
          }

          const result = await response.json();
          set({
            user: result.user,
            isAuthenticated: false, // Require login after registration
            requiresTwoFactor: false,
          });
        } catch (error) {
          throw error;
        }
      },

      logout: () => {
        const { token } = get();
        if (token) {
          fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }).catch(console.error);
        }
        
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          requiresTwoFactor: false,
        });
      },

      setUser: (user: User) => {
        set({ user });
      },
    }),
    {
      name: 'hmr-auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Auth helper hook for API calls
export const useAuthenticatedFetch = () => {
  const { token } = useAuth();

  return async (url: string, options: RequestInit = {}) => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return fetch(url, {
      ...options,
      headers,
    });
  };
};