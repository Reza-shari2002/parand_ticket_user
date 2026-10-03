import React from "react";
import { CheckCircle2, XCircle, Download, Ticket, Loader2 } from "lucide-react";
import usePaymentStatus from "../../hooks/usePaymentStatus";

export default function PaymentResult_holder() {
  const {
    loading,
    ticketData,
    settings,
    gamerTurnTime,
    isSuccess,
    errorMessage,
    ticketRef,
    downloading,
    handleDownloadPdf,
    handleBackHome,
  } = usePaymentStatus();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center font-bold">
        در حال دریافت و بررسی وضعیت بلیط...
      </div>
    );
  }

  // وضعیت ناموفق
  if (!isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center mt-10">
        <XCircle size={80} className="text-red-500 mb-6" />
        <p className="text-gray-500 mb-8">{errorMessage}</p>
        <button
          onClick={handleBackHome}
          className="w-full h-12 bg-gray-800 rounded-xl text-white font-bold cursor-pointer"
        >
          بازگشت به خانه
        </button>
      </div>
    );
  }

  // ترجمه عنوان نوع بلیط
  const getTicketTypeLabel = (type) => {
    if (type === "vip") return "VIP (ویژه)";
    if (type === "regular") return "عادی (عمومی)";
    if (type === "gamer") return "بازیکن (شرکت‌کننده)";
    return type || "-";
  };

  // فرمت تاریخ و ساعت داینامیک از settings
  const formatEventDateTime = (isoDate) => {
    if (!isoDate) return "-";
    try {
      const date = new Date(isoDate);
      return new Intl.DateTimeFormat("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch {
      return "-";
    }
  };

  const ticketType = ticketData?.type;
  const eventLocation = settings?.[`${ticketType}_location`] || "-";
  const rawEventDate = settings?.[`${ticketType}_event_date`];
  const eventDateTimeText = formatEventDateTime(rawEventDate);

  // وضعیت موفق
  return (
    <div className="flex flex-col gap-3 px-5 py-6">
      <div className="flex flex-col items-center">
        <CheckCircle2 size={70} className="text-emerald-500 mb-1" />
      </div>

      {/* کارت اطلاعات بلیط - مناسب خروجی PDF */}
      <div
        ref={ticketRef}
        className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-4"
        dir="rtl"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <Ticket size={18} />
          </div>
          <span className="font-black text-gray-700">بلیط شما</span>
          <span className="mr-auto font-mono text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
            {ticketData?.ticketCode}
          </span>
        </div>

        <div className="border-t border-dashed my-2" />

        <DetailRow label="نوع بلیط" value={getTicketTypeLabel(ticketType)} />
        <DetailRow label="مکان رویداد" value={eventLocation} />
        <DetailRow label="تاریخ و ساعت رویداد" value={eventDateTimeText} />

        {/* فقط اگر زمان نوبت گیمر محاسبه شده بود نمایش داده می‌شود */}
        {gamerTurnTime && (
          <DetailRow label="ساعت حضور نوبت شما" value={gamerTurnTime} />
        )}

        <DetailRow label="تعداد" value={`${ticketData?.quantity || 1} نفر`} />
        <DetailRow
          label="صندلی‌ها"
          value={
            Array.isArray(ticketData?.seats) && ticketData.seats.length > 0
              ? ticketData.seats.join("، ")
              : ticketData?.seats || "-"
          }
        />
        <DetailRow label="نام خریدار" value={ticketData?.user?.fullName || "-"} />
        <DetailRow label="کد ملی" value={ticketData?.user?.nationalCode || "-"} />
        <DetailRow label="شماره تماس" value={ticketData?.user?.phone || "-"} />
        <DetailRow
          label="مبلغ کل پرداخت شده"
          value={
            ticketData?.totalAmount
              ? `${Number(ticketData.totalAmount).toLocaleString("fa-IR")} ریال`
              : "-"
          }
        />
        <DetailRow
          label="تاریخ صدور"
          value={
            ticketData?.createdAt
              ? new Date(ticketData.createdAt).toLocaleDateString("fa-IR")
              : "-"
          }
        />
      </div>

      {/* دکمه دانلود PDF */}
      <button
        onClick={handleDownloadPdf}
        disabled={downloading}
        className="flex items-center justify-center gap-3 w-full h-14 bg-blue-600 rounded-2xl text-white font-bold shadow-lg shadow-blue-200 active:scale-95 transition disabled:opacity-70 cursor-pointer"
      >
        {downloading ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            <span>در حال آماده‌سازی PDF...</span>
          </>
        ) : (
          <>
            <Download size={20} />
            <span>دانلود بلیط (PDF)</span>
          </>
        )}
      </button>
    </div>
  );
}

const DetailRow = ({ label, value }) => (
  <div className="flex justify-between text-sm gap-2">
    <span className="text-gray-400 font-bold shrink-0">{label}:</span>
    <span className="text-gray-800 font-black text-left">{value}</span>
  </div>
);
