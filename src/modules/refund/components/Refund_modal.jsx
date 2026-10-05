import React from "react";
import { X, AlertTriangle, ArrowRight, Loader2, CreditCard, ShieldAlert } from "lucide-react";
import useRefund from "../hook/useRefund";

export default function Refund_holder({ ticket_id, onClose, onSuccess }) {
  const {
    step,
    setStep,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    isValid,
  } = useRefund({ ticket_id, onClose, onSuccess });

  if (!ticket_id) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl relative flex flex-col gap-4">
        
        {/* هدر مودال */}
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2">
            {step === "form" && (
              <button
                type="button"
                onClick={() => setStep("confirm")}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition"
              >
                <ArrowRight size={18} />
              </button>
            )}
            <span className="font-black text-gray-800 text-sm">
              {step === "confirm" ? "درخواست استرداد وجه" : "اطلاعات حساب بانکی"}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition"
          >
            <X size={18} />
          </button>
        </div>

        {step === "confirm" && (
          <div className="space-y-4 py-2 text-center" dir="rtl">
            <div className="w-14 h-14 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mx-auto">
              <ShieldAlert size={32} />
            </div>

            <div className="space-y-2">
              <h3 className="font-black text-sm text-gray-800">
                آیا از درخواست استرداد بلیط مطمئن هستید؟
              </h3>
              <p className="text-xs text-gray-500 leading-5 px-2">
                در صورت ثبت درخواست، بلیط شما باطل شده و امکان صدور مجدد آن وجود نخواهد داشت. وجه بلیط پس از بررسی به حساب شما واریز می‌گردد.
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 py-2.5 rounded-2xl border border-gray-200 text-gray-600 font-bold text-xs hover:bg-gray-50 transition"
              >
                انصراف
              </button>

              <button
                type="button"
                onClick={() => setStep("form")}
                className="w-1/2 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md shadow-amber-200 transition"
              >
                بله، ادامه می‌دهم
              </button>
            </div>
          </div>
        )}

        {step === "form" && (
          <form onSubmit={handleSubmit} className="space-y-3" dir="rtl">
            {/* نام و نام خانوادگی */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-600">
                نام و نام خانوادگی صاحب حساب
              </label>
              <input
                type="text"
                {...register("full_name")}
                className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition"
              />
              {errors.full_name && (
                <span className="text-[10px] text-red-500 font-bold">
                  {errors.full_name.message}
                </span>
              )}
            </div>

            {/* کد ملی */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-600">
                کد ملی
              </label>
              <input
                type="text"
                maxLength={10}
                dir="ltr"
                {...register("national_code")}
                className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition font-mono"
              />
              {errors.national_code && (
                <span className="text-[10px] text-red-500 font-bold">
                  {errors.national_code.message}
                </span>
              )}
            </div>



            {/* شماره کارت */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-600">
                شماره کارت بانکی (۱۶ رقمی)
              </label>
              <input
                type="text"
                maxLength={19}
                dir="ltr"
                {...register("card_number")}
                placeholder="6037997123456789"
                className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition font-mono"
              />
              {errors.card_number && (
                <span className="text-[10px] text-red-500 font-bold">
                  {errors.card_number.message}
                </span>
              )}
            </div>

            {/* دکمه ارسال */}
            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className="w-full mt-2 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold rounded-2xl flex items-center justify-center gap-2 text-xs shadow-md shadow-blue-200 transition"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>در حال ثبت درخواست...</span>
                </>
              ) : (
                <>
                  <CreditCard size={16} />
                  <span>ثبت و تایید درخواست استرداد</span>
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
