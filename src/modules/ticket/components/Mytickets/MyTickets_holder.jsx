import React, { useState } from "react";
import { Loader2, Ticket } from "lucide-react";
import useMyTickets from "../../hooks/useMyTickets";
import MyTicketCard from "./myticketCard/MyTicketCard";
import TicketDetailsModal from "./TicketDetailsModal/TicketDetailsModal";
import Refund_holder from "../../../refund/components/Refund_modal"; 
// مسیرش رو مطابق ساختار پروژه خودت درست کن

export default function MyTickets_holder() {
  const { tickets, loading, selectedTicket, setSelectedTicket, fetchMyTickets } =
    useMyTickets();

  const [refundTicketId, setRefundTicketId] = useState(null);

  return (
    <div
      className="min-h-screen bg-[#f8fafc] px-5 py-6 pb-24 max-w-md mx-auto"
      dir="rtl"
    >
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400 font-bold text-sm">
          <Loader2 className="animate-spin text-blue-600" size={32} />
          <span>در حال دریافت بلیط‌ها...</span>
        </div>
      ) : tickets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
          <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
            <Ticket size={28} />
          </div>
          <p className="text-sm font-bold text-gray-600">
            شما هنوز بلیطی ثبت نکرده‌اید.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {tickets.map((ticket) => (
            <MyTicketCard
              key={ticket.ticket_id ?? ticket.id}
              ticket={ticket}
              onOpenDetails={setSelectedTicket}
              onOpenRefund={(ticketId) => setRefundTicketId(ticketId)}
            />
          ))}
        </div>
      )}

      {/* مودال جزئیات */}
      <TicketDetailsModal
        ticket={selectedTicket}
        onClose={() => setSelectedTicket(null)}
      />

      {/* مودال استرداد */}
      {refundTicketId && (
        <Refund_holder
          ticket_id={refundTicketId}
          onClose={() => setRefundTicketId(null)}
          onSuccess={() => {
            // اگر خواستی بعد از ثبت استرداد لیست رفرش شود
            fetchMyTickets?.();
          }}
        />
      )}
    </div>
  );
}
