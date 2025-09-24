import type { FC } from "react";
import { useState } from "react";
import type { LoginFormProps } from "../types";
import { useAuthStore } from "../store/authStore";
import { Input } from "../../../shared/components/ui/Input";
import { Button } from "../../../shared/components/ui";

export const LoginForm: FC<LoginFormProps> = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const login = useAuthStore((s) => s.login);
  const isLoading = useAuthStore((s) => s.isLoading);
  const error = useAuthStore((s) => s.error);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(credentials.email, credentials.password);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[#d6f0f7]"
      dir="rtl"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xs flex flex-col items-center gap-6 bg-transparent"
        style={{ minWidth: 320 }}
      >
        {/* Logo */}
        <img src="/vite.svg" alt="logo" className="w-28 h-28 mb-2 mt-4" />
        {/* Title */}
        <h2 className="text-3xl font-bold text-[#1a3766] mb-2">
          اجازهٔ ورود به تیکمن
        </h2>
        {/* Divider */}
        <div className="w-full border-b-2 border-[#e0b96a] mb-2" />
        {/* Email Input */}
        <Input
          type="email"
          name="email"
          autoComplete="username"
          placeholder="admin@admin.co"
          value={credentials.email}
          onChange={handleChange}
          size="md"
          rounded="full"
          required
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 12.713l11.985-7.713A1 1 0 0 0 23 4H1a1 1 0 0 0-.985 1.001L12 12.713zm11.985 2.574l-4.726-3.042-6.259 4.027a1 1 0 0 1-1.001 0l-6.259-4.027-4.726 3.042A1 1 0 0 0 1 20h22a1 1 0 0 0 .985-1.001z"
              />
            </svg>
          }
        />
        {/* Password Input */}
        <Input
          type={showPassword ? "text" : "password"}
          name="password"
          autoComplete="current-password"
          placeholder="رمز عبور"
          value={credentials.password}
          onChange={handleChange}
          size="md"
          rounded="full"
          required
          icon={
            <button
              type="button"
              tabIndex={-1}
              className="text-[#e0b96a] focus:outline-none"
              style={{
                background: "none",
                border: "none",
                padding: 0,
                margin: 0,
                cursor: "pointer",
              }}
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 12c-2.761 0-5-2.239-5-5s2.239-5 5-5 5 2.239 5 5-2.239 5-5 5z"
                  />
                  <circle cx="12" cy="12" r="2.5" fill="#e0b96a" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 5c-7 0-11 7-11 7s4 7 11 7c2.5 0 4.7-.5 6.6-1.3l-1.5-1.5C15.7 18.1 13.9 18.5 12 18.5c-5.5 0-9.5-5.5-9.5-5.5S6.5 7.5 12 7.5c1.9 0 3.7.4 5.1 1.3l1.5-1.5C16.7 5.5 14.5 5 12 5zm0 12c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z"
                  />
                  <circle cx="12" cy="12" r="2.5" fill="#e0b96a" />
                </svg>
              )}
            </button>
          }
        />

        {/* Submit Button */}
        <Button
          size="md"
          rounded="full"
          variant="gradient"
          fullWidth
          isLoading={isLoading}
        >
          ورود
        </Button>
        {/* Error Message */}
        {error && (
          <div className="text-red-600 text-sm mt-1">{error.message}</div>
        )}
        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-center justify-center mt-2">
            <span className="w-8 h-3 rounded-full bg-[#6ec6e7] opacity-70 animate-pulse mr-2" />
            <span className="w-3 h-3 rounded-full bg-[#6ec6e7] opacity-70 animate-pulse" />
          </div>
        )}
      </form>
    </div>
  );
};
