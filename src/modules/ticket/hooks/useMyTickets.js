import { useState, useEffect, useContext } from "react";
import { getMyTicketsApi } from "../services/reserveService";
import { context } from "../../../context/Formcontext.jsx";

export default function useMyTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null); // برای نمایش در مودال جزئیات
  const { showToast } = useContext(context) || {};

  const fetchMyTickets = async () => {
    try {
      setLoading(true);
      const res = await getMyTicketsApi();

      if (res.success && res.data?.tickets) {
        setTickets(res.data.tickets);
      } else {
        throw new Error(res.message || "خطا در دریافت لیست بلیط‌ها");
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
