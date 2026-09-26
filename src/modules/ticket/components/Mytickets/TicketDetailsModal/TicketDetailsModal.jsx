import React, { useRef, useState, useContext } from "react";
import { X, Ticket, Download, Loader2 } from "lucide-react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { context } from "../../../../../context/Formcontext";

export default function TicketDetailsModal({ ticket, onClose }) {
  const [downloading, setDownloading] = useState(false);
  const ticketRef = useRef(null);
  const { showToast } = useContext(context) || {};

  if (!ticket) return null;

  const getTicketTypeLabel = (type) => {
    if (type === "vip") return "VIP (ویژه)";
    if (type === "gamer") return "شرکت‌کننده (گیمر)";
    return "عادی";
  };

  // صندلی‌ها
  const seatNumbers = Array.isArray(ticket.seats)
    ? ticket.seats.map((s) => s.seat_number).join("، ")
    : "-";

  // دانلود PDF بلیط
  const handleDownloadPdf = async () => {
    if (!ticketRef.current) return;
    try {
      setDownloading(true);
      const element = ticketRef.current;
      const imgData = await toPng(element, { quality: 0.98, pixelRatio: 3, backgroundColor: "#ffffff" });

      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const margin = 15;
      const contentWidth = pdfWidth - margin * 2;
      const elWidth = element.offsetWidth || 350;
      const elHeight = element.offsetHeight || 400;
      const contentHeight = (elHeight * contentWidth) / elWidth;

      pdf.addImage(imgData, "PNG", margin, 20, contentWidth, contentHeight);
      pdf.save(`Ticket-${ticket.ticket_code}.pdf`);
      showToast?.("فایل بلیط با موفقیت دانلود شد.", "success");
    } catch (err) {
      showToast?.("خطا در دانلود فایل بلیط", "error");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl relative flex flex-col gap-4">
        {/* هدر مودال */}
        <div className="flex items-center justify-between border-b pb-3">
          <span className="font-black text-gray-800 text-sm">جزئیات بلیط</span>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* کارت بلیط (قابل عکس‌برداری برای PDF) */}
        <div
          ref={ticketRef}
          className="bg-white p-4 rounded-2xl border border-gray-100 space-y-3"
          dir="rtl"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                <Ticket size={16} />
              </div>
              <span className="font-black text-xs text-gray-800">بلیط پرند کاپ</span>
            </div>
            <span className="font-mono font-bold text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">
              {ticket.ticket_code}
            </span>
          </div>

          <div className="border-t border-dashed border-gray-200 my-2" />

          <DetailRow label="نوع بلیط" value={getTicketTypeLabel(ticket.type)} />
          <DetailRow label="تعداد" value={`${ticket.quantity || 1} نفر`} />
          <DetailRow label="شماره صندلی‌ها" value={seatNumbers} />
          <DetailRow label="نام خریدار" value={ticket.full_name || "-"} />
          <DetailRow label="کد ملی" value={ticket.national_code || "-"} />
          <DetailRow label="شماره تماس" value={ticket.phone || "-"} />
          <DetailRow
            label="مبلغ کل"
            value={`${Number(ticket.total_amount).toLocaleString("fa-IR")} تومان`}
          />
          <DetailRow
            label="تاریخ صدور"
            value={new Date(ticket.created_at).toLocaleDateString("fa-IR")}
          />
        </div>

        {/* دکمه دانلود PDF */}
        <button
          onClick={handleDownloadPdf}
          disabled={downloading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-2xl flex items-center justify-center gap-2 text-xs shadow-md shadow-blue-200 transition"
        >
          {downloading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>
              <Download size={16} />
              <span>دانلود فایل بلیط (PDF)</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

const DetailRow = ({ label, value }) => (
  <div className="flex justify-between items-center text-xs py-0.5">
    <span className="text-gray-400 font-bold">{label}:</span>
    <span className="text-gray-800 font-bold">{value}</span>
  </div>
);
