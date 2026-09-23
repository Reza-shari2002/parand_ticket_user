import React from "react";
import { Wallet, Ticket, Plus, Minus, Loader2 } from "lucide-react";
import useReserve from "../../hooks/useReserve";
import CompleteProfileModal from "../../../profile/components/CompleteProfileModal";
import LoadingScreen from "../../../../components/common/LoadingScreen";
function Reserve_holder() {
  const {
    ticketInfo,
    currentType,
    count,
    maxAllowed,
    totalAmount,
    loading,
    handleIncrease,
    handleDecrease,
    handleReserveSubmit,
    isLoading,
    showProfileModal,
    closeProfileModal,
  } = useReserve();

  if (isLoading) return <LoadingScreen />;

  const formatPrice = (price) => {
    return Number(price).toLocaleString("fa-IR");
  };

  return (
    <div className="px-5 py-6 flex flex-col gap-5">
      {/* ۱. کارت اطلاعات بلیط انتخابی */}
      <div className="bg-white rounded-3xl p-4 flex items-center justify-between border border-gray-100 shadow-sm">
        <div className="space-y-1">
          <h2 className="text-sm font-black text-gray-800">
            مسابقات پرند کاپ - {ticketInfo.name}
          </h2>
          <p className="text-[11px] text-gray-400 font-medium">
            {ticketInfo.desc}
          </p>

          <div className="pt-1">
            <span className="inline-block px-3 py-1 bg-blue-50 text-[#8B9EFF] font-extrabold text-xs rounded-xl">
              {formatPrice(ticketInfo.price)} تومان برای هر نفر
            </span>
          </div>
        </div>

        <div className="w-14 h-14 shrink-0 bg-blue-50/60 rounded-2xl flex items-center justify-center text-[#8B9EFF]">
          <Ticket size={28} />
        </div>
      </div>

      {/* ۲. بخش انتخاب تعداد نفرات */}
      <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex flex-col items-center gap-4">
        <span className="text-sm font-black text-gray-800">تعداد نفرات</span>

        <div className="flex items-center justify-center gap-6 w-full">
          {/* دکمه منفی */}
          <button
            type="button"
            onClick={handleDecrease}
            disabled={count <= 1}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-sm ${
              count <= 1
                ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                : "bg-blue-50 hover:bg-blue-100 text-[#8B9EFF] active:scale-95"
            }`}
          >
            <Minus size={20} />
          </button>

          {/* عدد تعداد */}
          <span className="text-2xl font-black text-gray-800 w-10 text-center">
            {formatPrice(count)}
          </span>

          {/* دکمه مثبت */}
          <button
            type="button"
            onClick={handleIncrease}
            disabled={count >= maxAllowed}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-sm ${
              count >= maxAllowed
                ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                : "bg-[#8B9EFF] hover:bg-[#8B9EFF] text-white shadow-blue-500/30 active:scale-95"
            }`}
          >
            <Plus size={20} />
          </button>
        </div>

        <span className="text-[11px] text-gray-400 font-medium">
          {maxAllowed === 1
            ? "برای ثبت‌نام بازیکن فقط امکان رزرو ۱ جایگاه وجود دارد"
            : `حداکثر ${maxAllowed} بلیط در هر خرید`}
        </span>
      </div>

      {/* ۳. بخش نمایش مبلغ کل */}
      <div className="bg-white rounded-3xl p-4 px-5 flex items-center justify-between border border-gray-100 shadow-sm">
        <span className="text-sm font-bold text-gray-700">مبلغ کل:</span>

        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
            <Wallet size={20} />
          </div>
          <span className="px-4 py-2 bg-blue-50 text-blue-600 font-black text-sm rounded-2xl">
            {formatPrice(totalAmount)} تومان
          </span>
        </div>
      </div>

      {/* ۴. دکمه ادامه و ثبت نهایی */}
      <div className="pt-2">
        <button
          type="button"
          onClick={handleReserveSubmit}
          disabled={loading}
          className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 active:scale-[0.99] disabled:opacity-70 text-white font-extrabold text-base rounded-2xl shadow-lg shadow-emerald-500/30 transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={22} />
              <span>در حال ثبت رزرو...</span>
            </>
          ) : (
            <span>ادامه و ثبت نهایی</span>
          )}
        </button>
      </div>
      <CompleteProfileModal
        isOpen={showProfileModal}
        onClose={closeProfileModal}
      />
    </div>
  );
}

export default Reserve_holder;
