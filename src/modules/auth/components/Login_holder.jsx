import React from "react";
import useLogin from "../hooks/useLogin";

function Login_holder() {
  const { register, handleSubmit, errors, isSubmitting } = useLogin();

  return (
    <div className="min-h-screen w-full bg-[#fafafa] flex justify-center items-center">
      {/* ظرف اصلی با ابعاد استاندارد موبایل */}
      <div className="w-full max-w-[430px] h-[100dvh] bg-white flex flex-col justify-between px-6 py-10 relative overflow-hidden shadow-2xl">
        
        {/* ۱. بخش بالایی: لوگو، عنوان و توضیحات */}
        <div className="flex flex-col items-center text-center mt-6">
          {/* عنوان پرند بلیط */}
          <h1 className="text-4xl font-black text-[#00FFD6] tracking-tight mb-3">
            پرند بلیط
          </h1>

          {/* زیرعنوان */}
          <h2 className="text-base font-bold text-gray-800 mb-6">
            سامانه رزرو و خرید بلیط رویدادها
          </h2>

          {/* توضیحات */}
          <p className="text-xs leading-6 text-gray-400 max-w-[320px]">
            به پرند بلیط خوش آمدید، برای دسترسی به رویدادهای جذاب، کنسرت‌ها، نمایش‌ها و سایر رویدادهای فرهنگی و تفریحی، شماره موبایل خود را وارد کنید.
          </p>
        </div>

        {/* ۲. بخش فرم (اینپوت، قوانین و دکمه چسبیده به پایین) */}
        <form
          onSubmit={handleSubmit}
          className="w-full flex-1 flex flex-col justify-between pt-10"
        >
          {/* محتوای میانی فرم: اینپوت و متن قوانین */}
          <div className="w-full flex flex-col items-center gap-4">
            <div className="w-full">
              <input
                type="tel"
                dir="ltr"
                maxLength={11}
                placeholder="شماره موبایل"
                disabled={isSubmitting}
                {...register("phone_number")}
                className={`w-full h-14 px-6 text-center text-base font-medium rounded-full outline-none transition-all border ${
                  errors.phone_number
                    ? "border-red-500 text-red-600 bg-red-50/20 focus:ring-2 focus:ring-red-200"
                    : "border-[#00FFD6] text-gray-800 placeholder:text-gray-300 focus:ring-2 focus:ring-[#00FFD6]/30"
                }`}
              />

              {/* نمایش پیام خطا */}
              {errors.phone_number && (
                <p className="text-xs text-red-500 text-center mt-2 font-medium">
                  {errors.phone_number.message}
                </p>
              )}
            </div>

            {/* لینک قوانین و مقررات */}
            <p className="text-xs text-gray-500 text-center">
              با ورود،{" "}
              <button
                type="button"
                className="text-[#00FFD6] font-bold hover:underline"
              >
                قوانین و مقررات
              </button>{" "}
              را می‌پذیرم
            </p>
          </div>

          {/* ۳. دکمه پایین صفحه */}
          <div className="w-full pb-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 bg-[#00FFD6] text-gray-900 font-extrabold text-base rounded-full shadow-lg shadow-[#00FFD6]/30 active:scale-[0.98] transition-all flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></span>
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
