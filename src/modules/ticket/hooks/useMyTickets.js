import { useState, useEffect, useContext } from "react";
import { getMyTicketsApi, getGeneralSettingsApi } from "../services/reserveService";
import { context } from "../../../context/Formcontext.jsx";
import { calculateSeatTime } from "../../../utils/seatTimeCalculator"; // یا مسیر فایل seatTimeCalculator

export default function useMyTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const { showToast } = useContext(context) || {};

  // فرمت تاریخ و ساعت رویداد به فارسی
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

  const fetchMyTickets = async () => {
    try {
      setLoading(true);

      const [ticketsRes, settingsRes] = await Promise.all([
        getMyTicketsApi(),
        getGeneralSettingsApi().catch(() => null),
      ]);

      if (ticketsRes.success && Array.isArray(ticketsRes.data?.tickets)) {
        const settings = settingsRes?.data?.settings ?? settingsRes?.data ?? settingsRes ?? {};

        const preparedTickets = ticketsRes.data.tickets.map((ticket) => {
          const type = ticket.type;
          const rawDate = settings[`${type}_event_date`];
          const location = settings[`${type}_location`] || "-";

          // برای تایپ gamer صندلی دقیقاً seats[0].seat_number است
          let gamerTurnTime = null;
          if (type === "gamer" && ticket.seats?.[0]?.seat_number) {
            gamerTurnTime = calculateSeatTime(ticket.seats[0].seat_number);
          }

          return {
            ...ticket,
            eventLocation: location,
            eventDateTimeText: formatEventDateTime(rawDate),
            gamerTurnTime,
          };
        });

        setTickets(preparedTickets);
      } else {
        throw new Error(ticketsRes.message || "خطا در دریافت لیست بلیط‌ها");
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || "خطایی رخ داد";
      showToast?.(errMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyTickets();
  }, []);

  return {
    tickets,
    loading,
    selectedTicket,
    setSelectedTicket,
    fetchMyTickets,
  };
}
