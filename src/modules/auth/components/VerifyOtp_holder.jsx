import React from "react";
import useVerifyOtp from "../hooks/useVerifyOtp";

const OTP_LENGTH = 6;

function VerifyOtp_holder() {
  const {
    register,
    handleSubmit,
    setValue,
    otpValue,
    inputRef,
    timeLeft,
    formatTime,
    isSubmitting,
    isResending,
    isValid,
    phone_number,
    resendOtp,
    goBackToLogin,
  } = useVerifyOtp();

  const canResend = timeLeft <= 0;
  const { ref: formRegisterRef, ...restRegister } = register("otp");

  return (
    <div className="min-h-screen w-full bg-slate-50 flex justify-center items-center select-none">
      {/* ظرف اصلی هماهنگ با سایز موبایل */}
      <div className="w-full max-w-[430px] min-h-[100dvh] bg-white flex flex-col items-center justify-center px-6 py-8 shadow-2xl relative">
        
        {/* ۱. هدر: عنوان و دکمه تغییر شماره / ارسال مجدد */}
        <div className="w-full mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-black text-gray-900">
              کد تایید را وارد کنید
            </h1>

            {canResend ? (
              <button
                type="button"
                onClick={resendOtp}
                disabled={isResending}
                className="text-xs sm:text-sm font-bold text-cyan-600 hover:text-cyan-700 transition-colors cursor-pointer disabled:opacity-50"
              >
                {isResending ? "در حال ارسال..." : "ارسال مجدد کد"}
              </button>
            ) : (
              <button
                type="button"
                onClick={goBackToLogin}
                className="text-xs sm:text-sm font-bold text-cyan-600 hover:text-cyan-700 transition-colors cursor-pointer"
              >
                تغییر شماره موبایل
              </button>
            )}
          </div>

          <p className="text-xs text-gray-400 mt-2">
            کد ارسال‌شده به{" "}
            <span dir="ltr" className="font-bold text-gray-700">
              {phone_number}
            </span>{" "}
            را وارد کنید
          </p>
        </div>

        {/* ۲. فرم: باکس‌های کد، تایمر و دکمه تایید */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-6">
          {/* باکس‌های کد تایید */}
          <div
            className="relative flex gap-2 sm:gap-2.5 justify-center w-full cursor-pointer"
            onClick={() => inputRef.current?.focus()}
            dir="ltr"
          >
            {/* اینپوت مخفی و شفاف برای دریافت تایپ و فوکوس */}
            <input
              {...restRegister}
              ref={(e) => {
                formRegisterRef(e);
                inputRef.current = e;
              }}
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="one-time-code"
              maxLength={OTP_LENGTH}
              disabled={isSubmitting}
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
              onChange={(e) => {
                const numericOnly = e.target.value.replace(/\D/g, "").slice(0, OTP_LENGTH);
                setValue("otp", numericOnly, { shouldValidate: true });
              }}
            />

            {/* ۶ باکس نمایش کد */}
            {Array.from({ length: OTP_LENGTH }).map((_, index) => {
              const char = otpValue[index] || "";
              const isCurrent = index === otpValue.length && otpValue.length < OTP_LENGTH;

              return (
                <div
                  key={index}
                  className={`w-11 h-13 sm:w-12 sm:h-14 rounded-2xl flex items-center justify-center text-lg sm:text-xl font-black transition-all ${
                    char
                      ? "border border-cyan-300 bg-cyan-50/30 text-gray-900 shadow-sm"
                      : isCurrent
                      ? "border-2 border-cyan-400 bg-white ring-4 ring-cyan-100 shadow-sm"
                      : "border border-gray-200 bg-gray-50/60 text-gray-400"
                  }`}
                >
                  {char ? (
                    char
                  ) : isCurrent ? (
                    <span className="w-0.5 h-6 bg-cyan-500 animate-pulse"></span>
                  ) : null}
                </div>
              );
            })}
          </div>

          {/* تایمر زمان باقی‌مانده */}
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-bold text-gray-400">
              زمان باقی‌مانده:
            </span>
            <span
              dir="ltr"
              className={`text-xs sm:text-sm font-black ${
                canResend ? "text-gray-400" : "text-cyan-600"
              }`}
            >
              {formatTime()}
            </span>
          </div>

          {/* ۳. دکمه تایید نهایی */}
          <div className="w-full mt-2">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isValid || isSubmitting}
              className="w-full h-13 sm:h-14 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-bold text-base rounded-2xl shadow-lg shadow-cyan-500/25 active:scale-[0.98] transition-all flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>در حال بررسی...</span>
                </div>
              ) : (
                "تایید"
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default VerifyOtp_holder;
