// ============================================
// 📁 FOLDER STRUCTURE
// ============================================
/*
src/
├── features/
│   └── auth/
│       ├── api/
│       │   └── authApi.ts
│       ├── components/
│       │   ├── LoginForm.tsx
│       │   ├── RegisterForm.tsx
│       │   └── ProtectedRoute.tsx
│       ├── hooks/
│       │   ├── useLogin.ts
│       │   ├── useLogout.ts
│       │   └── useRefreshToken.ts
│       ├── store/
│       │   └── authStore.ts (Zustand)
│       ├── types/
│       │   └── auth.types.ts
│       └── utils/
│           └── authHelpers.ts
├── lib/
│   ├── api/
│   │   ├── apiClient.ts
│   │   └── interceptors.ts
│   └── queryClient.ts
├── routes/
│   └── AppRoutes.tsx
└── App.tsx
*/

// ============================================
// 1️⃣ TYPE DEFINITIONS
// ============================================
// features/auth/types/auth.types.ts

export interface User {
  id: string;
  username: string;
  name: string;
  role: 'user' | 'admin' | 'moderator';
  avatar?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  expiresIn: number;
}

export interface RefreshTokenResponse {
  accessToken: string;
  expiresIn: number;
}

// ============================================
// 2️⃣ ZUSTAND AUTH STORE (بهتر از Context)
// ============================================
// features/auth/store/authStore.ts

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  setAuth: (user: User, accessToken: string) => void;
  clearAuth: () => void;
  updateUser: (user: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        accessToken: null,
        isAuthenticated: false,
        isLoading: true,

        setAuth: (user, accessToken) =>
          set({
            user,
            accessToken,
            isAuthenticated: true,
            isLoading: false,
          }),

        clearAuth: () =>
          set({
            user: null,
            accessToken: null,
            isAuthenticated: false,
            isLoading: false,
          }),

        updateUser: (userData) =>
          set((state) => ({
            user: state.user ? { ...state.user, ...userData } : null,
          })),

        setLoading: (loading) => set({ isLoading: loading }),
      }),
      {
        name: 'auth-storage',
        // فقط user را persist کن، نه token
        partialize: (state) => ({ user: state.user }),
      }
    )
  )
);

// ============================================
// 3️⃣ AXIOS CLIENT با INTERCEPTORS
// ============================================
// lib/api/apiClient.ts

import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/features/auth/store/authStore';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 30000,
  withCredentials: true, // برای HttpOnly Cookie
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor - اضافه کردن Token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().accessToken;
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor - مدیریت Token Refresh
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // اگر خطا 401 بود و قبلاً retry نشده
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // اگر در حال refresh هستیم، request را در صف قرار بده
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // درخواست Refresh Token
        const { data } = await axios.post<RefreshTokenResponse>(
          `${apiClient.defaults.baseURL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const { accessToken } = data;
        
        // به‌روزرسانی store
        useAuthStore.getState().setAuth(
          useAuthStore.getState().user!,
          accessToken
        );

        // پردازش صف
        processQueue(null, accessToken);

        // ارسال مجدد request اصلی
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as AxiosError, null);
        
        // Logout کاربر
        useAuthStore.getState().clearAuth();
        window.location.href = '/login';
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// ============================================
// 4️⃣ AUTH API SERVICE
// ============================================
// features/auth/api/authApi.ts

import { apiClient } from '@/lib/api/apiClient';
import type { 
  LoginCredentials, 
  RegisterData, 
  AuthResponse, 
  User 
} from '../types/auth.types';

export const authApi = {
  // Login
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>(
      '/login',
      credentials
    );
    return data;
  },

  // Register
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>(
      '/auth/register',
      userData
    );
    return data;
  },

  // Logout
  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },

  // Get Current User
  getCurrentUser: async (): Promise<User> => {
    const { data } = await apiClient.get<User>('/auth/me');
    return data;
  },

  // Refresh Token
  refreshToken: async (): Promise<RefreshTokenResponse> => {
    const { data } = await apiClient.post<RefreshTokenResponse>(
      '/auth/refresh'
    );
    return data;
  },

  // Forgot Password
  forgotPassword: async (username: string): Promise<{ message: string }> => {
    const { data } = await apiClient.post('/auth/forgot-password', { username });
    return data;
  },

  // Reset Password
  resetPassword: async (
    token: string,
    password: string
  ): Promise<{ message: string }> => {
    const { data } = await apiClient.post('/auth/reset-password', {
      token,
      password,
    });
    return data;
  },
};

// ============================================
// 5️⃣ REACT QUERY HOOKS
// ============================================
// features/auth/hooks/useLogin.ts

import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/authApi';
import { useAuthStore } from '../store/authStore';
import { toast } from 'sonner'; // or react-hot-toast
import type { LoginCredentials } from '../types/auth.types';

export const useLogin = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken);
      toast.success(`خوش آمدید ${data.user.name}!`);
      navigate('/dashboadvsdrd', { replace: true });
    },
    
    onError: (error: any) => {
      const message = error.response?.data?.message || 'خطا در ورود';
      toast.error(message);
    },
  });
};

// features/auth/hooks/useLogout.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/authApi';
import { useAuthStore } from '../store/authStore';
import { toast } from 'sonner';

export const useLogout = () => {
  const navigate = useNavigate();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authApi.logout(),
    
    onSuccess: () => {
      clearAuth();
      queryClient.clear(); // پاک کردن تمام cache
      toast.success('با موفقیت خارج شدید');
      navigate('/login', { replace: true });
    },
    
    onError: () => {
      // حتی اگر API خطا داد، کاربر را logout کن
      clearAuth();
      queryClient.clear();
      navigate('/login', { replace: true });
    },
  });
};

// features/auth/hooks/useCurrentUser.ts

import { useQuery } from '@tanstack/react-query';
import { authApi } from '../api/authApi';
import { useAuthStore } from '../store/authStore';

export const useCurrentUser = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setAuth = useAuthStore((state) => state.setAuth);
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: ['currentUser'],
    queryFn: authApi.getCurrentUser,
    enabled: isAuthenticated && !!accessToken,
    staleTime: 5 * 60 * 1000, // 5 minutes
    
    onSuccess: (user) => {
      // Update user in store
      if (accessToken) {
        setAuth(user, accessToken);
      }
    },
    
    onError: () => {
      useAuthStore.getState().clearAuth();
    },
  });
};

// ============================================
// 6️⃣ LOGIN FORM با React Hook Form + Zod
// ============================================
// features/auth/components/LoginForm.tsx

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLogin } from '../hooks/useLogin';
import { Link } from 'react-router-dom';

const loginSchema = z.object({
  username: z
    .string()
    .min(1, 'ایمیل الزامی است')
    .username('فرمت ایمیل صحیح نیست'),
  password: z
    .string()
    .min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد'),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const { mutate: login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">ورود به حساب</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* username */}
        <div>
          <label className="block text-sm font-medium mb-2">ایمیل</label>
          <input
            type="username"
            {...register('username')}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="example@username.com"
            disabled={isPending}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-2">رمز عبور</label>
          <input
            type="password"
            {...register('password')}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="••••••••"
            disabled={isPending}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember Me */}
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              {...register('rememberMe')}
              className="ml-2"
              disabled={isPending}
            />
            <span className="text-sm">مرا به خاطر بسپار</span>
          </label>

          <Link
            to="/forgot-password"
            className="text-sm text-blue-600 hover:underline"
          >
            فراموشی رمز عبور
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPending ? 'در حال ورود...' : 'ورود'}
        </button>
      </form>

      <p className="text-center mt-4 text-sm">
        حساب کاربری ندارید؟{' '}
        <Link to="/register" className="text-blue-600 hover:underline">
          ثبت نام کنید
        </Link>
      </p>
    </div>
  );
};

// ============================================
// 7️⃣ PROTECTED ROUTE COMPONENT
// ============================================
// features/auth/components/ProtectedRoute.tsx

import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useCurrentUser } from '../hooks/useCurrentUser';

interface ProtectedRouteProps {
  allowedRoles?: string[];
  redirectPath?: string;
}

export const ProtectedRoute = ({
  allowedRoles,
  redirectPath = '/login',
}: ProtectedRouteProps) => {
  const location = useLocation();
  const { isAuthenticated, user, isLoading } = useAuthStore();
  const { isLoading: isUserLoading } = useCurrentUser();

  // Loading state
  if (isLoading || isUserLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // Check role-based access
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

// ============================================
// 8️⃣ APP ROUTES SETUP
// ============================================
// routes/AppRoutes.tsx

import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import LoginPage from '@/features/auth/pages/LoginPage';
import RegisterPage from '@/features/auth/pages/RegisterPage';
import Dashboard from '@/pages/Dashboard';
import AdminPanel from '@/pages/AdminPanel';
import NotFound from '@/pages/NotFound';
import Unauthorized from '@/pages/Unauthorized';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      
      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Admin Only Routes */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin" element={<AdminPanel />} />
      </Route>

      {/* Redirects & Error Pages */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

// ============================================
// 9️⃣ MAIN APP SETUP
// ============================================
// App.tsx

import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from './lib/queryClient';
import { AppRoutes } from './routes/AppRoutes';
import { Toaster } from 'sonner';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRoutes />
        <Toaster position="top-right" richColors />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;

// ============================================
// 🔟 QUERY CLIENT CONFIGURATION
// ============================================
// lib/queryClient.ts

import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      gcTime: 5 * 60 * 1000, // 5 minutes (previously cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});

// ============================================
// ✅ PACKAGE.JSON DEPENDENCIES
// ============================================
/*
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.0",
    "@tanstack/react-query": "^5.51.0",
    "@tanstack/react-query-devtools": "^5.51.0",
    "zustand": "^4.5.4",
    "axios": "^1.7.2",
    "react-hook-form": "^7.52.1",
    "@hookform/resolvers": "^3.9.0",
    "zod": "^3.23.8",
    "sonner": "^1.5.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "typescript": "^5.5.3",
    "vite": "^5.3.4"
  }
}
*/