import React from "react";
import { Clock, Copy, Check, ShieldCheck, CheckCircle2  , Ticket} from "lucide-react";
import usePayment from "../../hooks/usePayment";

export default function Payment_holder() {
  const {
    reserveData,
    timeLeft,
    formatTime,
    selectedGateway,
    setSelectedGateway,
    loading,
    copied,
    handleCopyCode,
    handlePayment,
  } = usePayment();

  // نام نوع بلیط بر اساس type
  const getTicketTypeName = (type) => {
    switch (type) {
      case "vip":
        return "تماشاچی VIP";
      case "gamer":
        return "بازیکن مسابقات";
      default:
        return "تماشاچی عادی";
    }
  };

  return (
    <div className="flex flex-col gap-4 px-5 py-3">
      {/* باکس هشدار و تایمر رزرو موقت */}
      <div className="flex items-center justify-between rounded-2xl border border-blue-100 bg-blue-50/60 p-3.5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-200">
            <Clock size={22} className="animate-pulse" />
          </div>
          <div>
            <h4 className="text-sm font-black text-gray-900">
              رزرو موقت به مدت {reserveData?.expiresInMinutes || 10} دقیقه
            </h4>
            <p className="mt-0.5 text-[11px] text-gray-500">
              صندلی‌ها به مدت ۱۰ دقیقه برای شما رزرو شدند
            </p>
          </div>
        </div>

        {/* شمارشگر معکوس */}
        <div className="flex min-w-[64px] items-center justify-center rounded-xl bg-blue-600 px-3 py-1.5 font-mono text-sm font-black text-white shadow-sm">
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* کارت جزئیات پیش‌فاکتور */}
      <div className="flex flex-col gap-3.5 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
        {/* رویداد */}
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-gray-400">رویداد:</span>
          <span className="font-black text-gray-800">
            مسابقات پرند کاپ ({getTicketTypeName(reserveData?.type)})
          </span>
        </div>

        {/* کد پیگیری بلیط */}
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-gray-400">کد پیگیری بلیط:</span>
          <div className="flex items-center gap-1.5 font-mono font-bold text-gray-800">
            <span>{reserveData?.ticketCode || "---"}</span>
            <button
              type="button"
              onClick={handleCopyCode}
              aria-label="کپی کد"
              className="text-gray-400 hover:text-blue-600 transition active:scale-90"
            >
              {copied ? <Check size={15} className="text-emerald-500" /> : <Copy size={15} />}
            </button>
          </div>
        </div>

        {/* تعداد نفرات */}
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-gray-400">تعداد نفرات:</span>
          <span className="font-black text-gray-800">
            {reserveData?.quantity ? `${reserveData.quantity} نفر` : "۱ نفر"}
          </span>
        </div>

        {/* شماره صندلی‌ها */}
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-gray-400">شماره صندلی‌ها:</span>
          <div className="flex flex-wrap items-center justify-end gap-1.5">
            {Array.isArray(reserveData?.seats) && reserveData.seats.length > 0 ? (
              reserveData.seats.map((seat) => (
                <span
                  key={seat}
                  className="rounded-lg bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-700"
                >
                  صندلی {seat}
                </span>
              ))
            ) : (
              <span className="text-gray-400">ثبت سیستمی</span>
            )}
          </div>
        </div>

        <div className="my-1 border-t border-dashed border-gray-200" />

        {/* مبلغ قابل پرداخت */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-gray-400">مبلغ قابل پرداخت:</span>
          <div className="flex items-baseline gap-1 text-blue-600">
            <span className="text-xl font-black">
              {Number(reserveData?.totalAmount || 0).toLocaleString("fa-IR")}
            </span>
            <span className="text-xs font-bold text-gray-500">تومان</span>
          </div>
        </div>
      </div>

      {/* انتخاب درگاه زرین‌پال */}
      <button
        type="button"
        onClick={() => setSelectedGateway("zarinpal")}
        className={`relative flex items-center justify-between rounded-2xl border-2 p-3.5 transition-all active:scale-[0.99] ${
          selectedGateway === "zarinpal"
            ? "border-blue-600 bg-blue-50/40 shadow-sm"
            : "border-gray-100 bg-white"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`flex h-6 w-6 items-center justify-center rounded-full border transition-all ${
              selectedGateway === "zarinpal"
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-gray-300 bg-white"
            }`}
          >
            {selectedGateway === "zarinpal" && <CheckCircle2 size={16} />}
          </div>

          <div className="text-right">
            <h5 className="text-sm font-black text-gray-900">زرین‌پال (ZarinPal)</h5>
            <p className="mt-0.5 text-[11px] text-gray-400">
              پرداخت امن از طریق درگاه معتبر زرین‌پال
            </p>
          </div>
        </div>

        {/* بج لوگوی زرین‌پال */}
        <div className="flex h-10 w-14 items-center justify-center rounded-xl bg-blue-600 text-xs font-black tracking-wider text-white shadow-md shadow-blue-200">
          ZarinPal
        </div>
      </button>

      {/* دکمه پرداخت آنلاین */}
      <button
        type="button"
        onClick={handlePayment}
        disabled={loading || timeLeft <= 0}
        className="mt-2 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ShieldCheck size={20} />
        {loading ? (
          <span className="text-sm">در حال انتقال به درگاه...</span>
        ) : (
          <span className="text-sm font-black">
            پرداخت آنلاین{" "}
            {Number(reserveData?.totalAmount || 0).toLocaleString("fa-IR")} تومان
          </span>
        )}
      </button>
    </div>
  );
}
