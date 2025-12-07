import { useForm } from "react-hook-form";
import { useState } from "react";
import TextInput from "../../../shared/components/ui/Input";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

type FormValues = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const loginMutation = useLogin();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data: FormValues) => {
    setErrorMessage("");
    try {
      await loginMutation.mutateAsync(data);
      navigate("/dashboard");
    } catch (err) {
      setErrorMessage("نام کاربری یا رمز عبور اشتباه است");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8 overflow-hidden" dir="rtl" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1a1f3a 25%, #1a2d3a 50%, #0f2a2e 75%, #0f172a 100%)" }}>
      {/* Animated background elements with cyan gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl animate-pulse" style={{ background: "linear-gradient(252deg, #37abb8 0%, #71fbff 100%)", opacity: 0.15 }}></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl animate-pulse" style={{ background: "linear-gradient(252deg, #37abb8 0%, #71fbff 100%)", opacity: 0.1, animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ background: "linear-gradient(252deg, #37abb8 0%, #71fbff 100%)", opacity: 0.08, animationDelay: "2s" }}></div>
      </div>

      {/* Main container */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md">
        {/* Logo/Header section */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl shadow-xl mb-4 sm:mb-6" style={{ background: "linear-gradient(252deg, #37abb8 0%, #71fbff 100%)" }}>
            <svg className="w-7 h-7 sm:w-8 sm:h-8 text-slate-900" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">ورود به حساب</h1>
          <p className="text-sm sm:text-base text-gray-400">به داشبورد خود خوش آمدید</p>
        </div>

        {/* Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 space-y-6">
          {/* Error message */}
          {errorMessage && (
            <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-2xl">
              <p className="text-sm sm:text-base text-red-200">{errorMessage}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
            {/* Email/Username field */}
            <TextInput
              label="ایمیل یا نام کاربری"
              id="username"
              type="text"
              placeholder="example@mail.com"
              register={register}
              required
              errors={errors}
              icon={
                <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.93 5.93a15.993 15.993 0 016.638-5.6a1 1 0 111.064 1.635m-7.701 5.173a5.047 5.047 0 002.91 9.588H9a1 1 0 100-2H5.888a3.047 3.047 0 110-6.094h5a1 1 0 100-2h-5a5.047 5.047 0 00-2.91 9.588M17.09 5.03a1 1 0 010 1.414l-5.646 5.646a1 1 0 01-1.414-1.414l5.646-5.646a1 1 0 011.414 0z" />
                </svg>
              }
            />

            {/* Password field */}
            <TextInput
              label="رمز عبور"
              id="password"
              type="password"
              placeholder="••••••••"
              register={register}
              required
              errors={errors}
              showTogglePassword
              onTogglePassword={() => setShowPassword(!showPassword)}
              isPasswordVisible={showPassword}
              icon={
                <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" />
                </svg>
              }
            />

            {/* Remember me */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-gray-400 cursor-pointer accent-cyan-400"
              />
              <label htmlFor="remember" className="text-sm text-gray-400 cursor-pointer hover:text-gray-300 transition">
                مرا به خاطر بسپار
              </label>
              <a href="#" className="text-xs sm:text-sm text-cyan-400 hover:text-cyan-300 transition mr-auto">
                فراموشی رمز؟
              </a>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full py-3 sm:py-4 text-white font-semibold rounded-2xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: loginMutation.isPending ? "#6b7280" : "linear-gradient(252deg, #37abb8 0%, #71fbff 100%)" }}
            >
              {loginMutation.isPending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  درحال ورود...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  ورود
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-900 text-gray-400">یا</span>
            </div>
          </div>

          {/* Social login */}
          {/* <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <button
              type="button"
              className="py-3 px-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl text-white font-medium transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            </button>
            <button
              type="button"
              className="py-3 px-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl text-white font-medium transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>
          </div> */}
        </div>

        {/* Signup link */}
        <p className="mt-6 sm:mt-8 text-center text-sm sm:text-base text-gray-400">
          حساب کاربری ندارید؟{" "}
          <a href="/signup" className="font-semibold text-cyan-400 hover:text-cyan-300 transition">
            ثبت نام
          </a>
        </p>
      </div>
    </div>
  );
}
