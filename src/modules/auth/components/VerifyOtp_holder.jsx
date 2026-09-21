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
    <div className="min-h-screen w-full bg-[#fafafa] flex justify-center items-center">
      <div className="w-full max-w-[430px] h-[100dvh] bg-white flex flex-col justify-between px-6 py-10 relative overflow-hidden shadow-2xl">
        
        {/* هدر: عنوان و دکمه‌ها با z-30 و Pointer events برای کلیک‌پذیری ۱۰۰٪ */}
        <div className="relative z-30">
          <div className="flex items-center justify-between mt-4">
            <h1 className="text-xl font-black text-gray-900">
              کد تایید را وارد کنید
            </h1>

            {canResend ? (
              <button
                type="button"
                onClick={resendOtp}
                disabled={isResending}
                className="text-sm font-bold text-[#00cbb0] hover:text-[#00ab94] transition-colors cursor-pointer disabled:opacity-50"
              >
                {isResending ? "در حال ارسال..." : "ارسال مجدد کد"}
              </button>
            ) : (
              <button
                type="button"
                onClick={goBackToLogin}
                className="text-sm font-bold text-[#00cbb0] hover:text-[#00ab94] transition-colors cursor-pointer"
              >
                تغییر شماره موبایل
              </button>
            )}
          </div>

          <p className="text-xs text-gray-400 mt-2">
            کد ارسال‌شده به{" "}
            <span dir="ltr" className="font-bold text-gray-600">
              {phone_number}
            </span>{" "}
            را وارد کنید
          </p>
        </div>

        {/* فرم و باکس‌های OTP */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col items-center justify-center -mt-10 relative z-20">
          <div
            className="relative flex gap-2 justify-center cursor-pointer"
            onClick={() => inputRef.current?.focus()}
            dir="ltr"
          >
            {/* اینپوت فقط روی محدوده باکس‌ها قرار دارد */}
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
                  className={`w-12 h-14 rounded-2xl flex items-center justify-center text-xl font-black transition-all ${
                    char
                      ? "border border-gray-200 bg-gray-100/70 text-gray-900"
                      : isCurrent
                      ? "border-2 border-[#00FFD6] bg-white shadow-sm shadow-[#00FFD6]/30"
                      : "border border-gray-100 bg-gray-100/60 text-gray-400"
                  }`}
                >
                  {char ? (
                    char
                  ) : isCurrent ? (
                    <span className="w-0.5 h-6 bg-[#00FFD6] animate-pulse"></span>
                  ) : null}
                </div>
              );
            })}
          </div>

          {/* تایمر زمان باقی‌مانده */}
          <div className="mt-8 flex items-center gap-2">
            <span className="text-sm font-bold text-gray-400">
              زمان باقی‌مانده:
            </span>
            <span
              dir="ltr"
              className={`text-sm font-black ${
                canResend ? "text-gray-400" : "text-[#00cbb0]"
              }`}
            >
              {formatTime()}
            </span>
          </div>
        </form>

        {/* دکمه ارسال تایید نهایی */}
        <div className="w-full pb-2 relative z-30">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isValid || isSubmitting}
            className="w-full h-14 bg-[#00FFD6] text-gray-900 font-black text-base rounded-full shadow-lg shadow-[#00FFD6]/30 active:scale-[0.98] transition-all flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? (
              <span className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></span>
            ) : (
              "تایید"
            )}
          </button>
        </div>

      </div>
    </div>
  );
}

export default VerifyOtp_holder;
