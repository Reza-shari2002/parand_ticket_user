import React from "react";
import { Gamepad2, Trophy, Ticket as TicketIcon } from "lucide-react";

export default function MyTicketCard({ ticket, onOpenDetails, onOpenRefund }) {
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

  const ticketId = ticket?.ticket_id ?? ticket?.id;

  return (
    <div className="relative bg-white rounded-3xl p-5 shadow-sm border border-blue-50/80 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className="flex flex-col items-start gap-1.5 flex-1 pl-2">
          <h3 className="font-black text-gray-800 text-sm mt-1">
            مسابقات پرند کاپ
          </h3>

          <p className="text-[11px] text-gray-400 font-medium">
            {ticket?.eventDateTimeText || "-"} | {getTicketTypeLabel(ticket?.type)}
          </p>

          {ticket?.type === "gamer" && ticket?.gamerTurnTime && (
            <p className="text-[11px] text-blue-600 font-bold">
              ساعت حضور: {ticket.gamerTurnTime}
            </p>
          )}

          <span className="font-black text-blue-600 text-sm mt-0.5">
            {Number(ticket?.total_amount || 0).toLocaleString("fa-IR")} ریال
          </span>
        </div>

        <div className="w-16 h-16 rounded-2xl bg-blue-50/80 flex items-center justify-center shrink-0">
          {renderIcon(ticket?.type)}
        </div>
      </div>

      {/* دکمه‌ها */}
      <div className="grid grid-cols-2 gap-2 mt-1">
        <button
          onClick={() => onOpenDetails(ticket)}
          className="w-full py-3 bg-blue-500 hover:bg-blue-600 active:scale-[0.98] text-white text-xs font-bold rounded-2xl transition shadow-md shadow-blue-200"
        >
          مشاهده بلیط
        </button>

        <button
          type="button"
          onClick={() => onOpenRefund?.(ticketId)}
          className="w-full py-3 bg-red-500 hover:bg-red-600 active:scale-[0.98] text-white text-xs font-bold rounded-2xl transition shadow-md shadow-red-200"
        >
          استرداد بلیط
        </button>
      </div>
    </div>
  );
}
