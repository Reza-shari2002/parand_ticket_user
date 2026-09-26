import React from "react";
import { Gamepad2, Trophy, Ticket as TicketIcon } from "lucide-react";

export default function MyTicketCard({ ticket, onOpenDetails }) {
  // آیکون متناسب با نوع بلیط یا رویداد
  const renderIcon = (type) => {
    if (type === "gamer") return <Gamepad2 className="w-9 h-9 text-blue-500" />;
    if (type === "vip") return <Trophy className="w-9 h-9 text-blue-500" />;
    return <TicketIcon className="w-9 h-9 text-blue-500" />;
  };

  const getTicketTypeLabel = (type) => {
    if (type === "vip") return "VIP (ویژه)";
    if (type === "gamer") return "شرکت‌کننده (گیمر)";
    return "عادی";
  };

  const formattedDate = ticket?.created_at
    ? new Date(ticket.created_at).toLocaleDateString("fa-IR")
    : "۲۸ مهر ۱۴۰۵";

  return (
    <div className="relative bg-white rounded-3xl p-5 shadow-sm border border-blue-50/80 flex flex-col gap-3">
      {/* ردیف بالا: بج وضعیت، محتوای عنوان و آیکون */}
      <div className="flex items-start justify-between">
        {/* سمت راست: بج و عناوین */}
        <div className="flex flex-col items-start gap-1.5 flex-1 pl-2">
          <span className="bg-blue-500 text-white text-[11px] font-bold px-3 py-0.5 rounded-full">
            {ticket?.status === "paid" ? "فعال" : "نامشخص"}
          </span>

          <h3 className="font-black text-gray-800 text-sm mt-1">
            مسابقات پرند کاپ {ticket?.type === "vip" ? "- مرحله نهایی" : ""}
          </h3>

          <p className="text-[11px] text-gray-400 font-medium">
            {formattedDate} | {getTicketTypeLabel(ticket?.type)}
          </p>

          <span className="font-black text-blue-600 text-sm mt-0.5">
            {Number(ticket?.total_amount || 0).toLocaleString("fa-IR")} تومان
          </span>
        </div>

        {/* سمت چپ: باکس آیکون با بک‌گراند ملایم آبی */}
        <div className="w-16 h-16 rounded-2xl bg-blue-50/80 flex items-center justify-center shrink-0">
          {renderIcon(ticket?.type)}
        </div>
      </div>

      {/* دکمه مشاهده بلیط */}
      <button
        onClick={() => onOpenDetails(ticket)}
        className="w-full mt-1 py-3 bg-blue-500 hover:bg-blue-600 active:scale-[0.98] text-white text-xs font-bold rounded-2xl transition shadow-md shadow-blue-200"
      >
        مشاهده بلیط
      </button>
    </div>
  );
}
