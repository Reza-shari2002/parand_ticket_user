import React from "react";
import useLogin from "../hooks/useLogin";

function Login_holder() {
  const { register, handleSubmit, errors, isSubmitting } = useLogin();

  return (
    <div className="min-h-screen w-full bg-slate-50 flex justify-center items-center select-none">
      {/* ظرف اصلی با چیدمان منسجم در مرکز/بالا */}
      <div className="w-full max-w-[430px] min-h-[100dvh] bg-white flex flex-col items-center justify-center px-6 py-8 shadow-2xl">
        
        {/* ۱. بخش بالایی: لوگو، عنوان و توضیحات */}
        <div className="flex flex-col items-center text-center mb-8">
          {/* عنوان پرند بلیط */}
          <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent tracking-tight mb-2">
            پرند بلیط
          </h1>

          {/* زیرعنوان */}
          <h2 className="text-sm sm:text-base font-bold text-gray-800 mb-3">
            سامانه رزرو و خرید بلیط رویدادها
          </h2>

          {/* توضیحات */}
          <p className="text-xs leading-6 text-gray-400 max-w-[300px]">
            به پرند بلیط خوش آمدید، برای دسترسی به رویدادهای جذاب، کنسرت‌ها، نمایش‌ها و سایر رویدادهای فرهنگی و تفریحی، شماره موبایل خود را وارد کنید.
          </p>
        </div>

        {/* ۲. بخش فرم (اینپوت، خطا، دکمه و متن قوانین کامپکت و چسبیده به محتوای بالا) */}
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center gap-4"
        >
          {/* اینپوت شماره موبایل */}
          <div className="w-full">
            <input
              type="tel"
              dir="ltr"
              maxLength={11}
              placeholder="شماره موبایل"
              disabled={isSubmitting}
              {...register("phone_number")}
              className={`w-full h-13 sm:h-14 px-6 text-center text-base font-semibold rounded-2xl outline-none transition-all border ${
                errors.phone_number
                  ? "border-red-400 text-red-600 bg-red-50/40 focus:ring-4 focus:ring-red-100"
                  : "border-cyan-400/80 bg-cyan-50/10 text-gray-800 placeholder:text-gray-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
              }`}
            />

            {/* پیام خطا */}
            {errors.phone_number && (
              <p className="text-xs text-red-500 text-center mt-2 font-medium">
                {errors.phone_number.message}
              </p>
            )}
          </div>

          {/* لینک قوانین و مقررات */}
          <p className="text-xs text-gray-400 text-center">
            با ورود،{" "}
            <button
              type="button"
              className="text-cyan-600 font-bold hover:underline transition-colors"
            >
              قوانین و مقررات
            </button>{" "}
            را می‌پذیرم
          </p>

          {/* دکمه ادامه (درست زیر اینپوت و قوانین) */}
          <div className="w-full mt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-13 sm:h-14 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-bold text-base rounded-2xl shadow-lg shadow-cyan-500/25 active:scale-[0.98] transition-all flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>در حال ارسال...</span>
                </div>
              ) : (
                "ادامه"
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default Login_holder;
