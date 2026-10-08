import React from "react";
import useCompleteProfile from "../hooks/useCompleteProfile";

function CompleteProfileModal({ isOpen, onClose }) {
  const { register, handleSubmit, errors, isSubmitting, isValid } =
    useCompleteProfile(onClose);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* باکس مودال - به صورت کارت شناور و وسط‌چین با پدینگ و ارتفاع ایمن */}
      <div
        className="relative z-10 w-full max-w-sm sm:max-w-md bg-white rounded-3xl p-5 sm:p-7 shadow-2xl transition-all animate-in fade-in zoom-in-95 duration-200"
        dir="rtl"
      >
        {/* هدر مودال */}
        <div className="mb-4 text-right">
          <h2 className="text-base sm:text-lg font-black text-gray-900">
            تکمیل اطلاعات حساب کاربری
          </h2>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            جهت صدور بلیت و پیگیری‌های بعدی، وارد کردن نام الزامی است.
          </p>
        </div>

        {/* فرم ورودی‌ها */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* فیلد نام و نام خانوادگی */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 text-right">
              نام و نام خانوادگی
            </label>
            <input
              {...register("full_name")}
              type="text"
              placeholder="مثال: علی محمدی"
              disabled={isSubmitting}
              className={`w-full h-11 px-3.5 rounded-xl bg-gray-50 border text-sm font-medium transition-all outline-none text-right ${
                errors.full_name
                  ? "border-red-400 focus:border-red-500 bg-red-50/20"
                  : "border-gray-200 focus:border-[#00FFD6] focus:bg-white"
              }`}
            />
            {errors.full_name && (
              <p className="text-[11px] text-red-500 mt-1 font-medium text-right">
                {errors.full_name.message}
              </p>
            )}
          </div>

          {/* دکمه ثبت اطلاعات */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="w-full h-11 bg-[#00FFD6] text-gray-900 font-bold text-sm rounded-xl shadow-md shadow-[#00FFD6]/20 active:scale-[0.98] transition-all flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <span className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
              ) : (
                "ثبت و ورود به پنل"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CompleteProfileModal;
