import { useState, useEffect, useContext, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { context } from "../../../context/Formcontext.jsx";
import {
  getTicketDetailsApi,
  getGeneralSettingsApi,
} from "../services/reserveService.js";
import { calculateSeatTime } from "../../../utils/seatTimeCalculator"; // مسیر تابع در common

export default function usePaymentStatus() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showToast } = useContext(context) || {};

  const [loading, setLoading] = useState(true);
  const [ticketData, setTicketData] = useState(null);
  const [settings, setSettings] = useState(null);
  const [gamerTurnTime, setGamerTurnTime] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [downloading, setDownloading] = useState(false);

  const ticketRef = useRef(null);

  useEffect(() => {
    const success = searchParams.get("success") === "true";
    const ticketId = searchParams.get("ticketId");

    setIsSuccess(success);

    if (success && ticketId) {
      fetchTicketAndSettings(ticketId);
    } else {
      setLoading(false);
      setErrorMessage("پرداخت شما با موفقیت انجام نشد.");
    }
  }, [searchParams]);

  const fetchTicketAndSettings = async (ticketId) => {
    try {
      setLoading(true);

      const [ticketRes, settingsRes] = await Promise.all([
        getTicketDetailsApi(ticketId),
        getGeneralSettingsApi().catch(() => null),
      ]);

      if (ticketRes.status === "success") {
        const ticket = ticketRes.data;
        setTicketData(ticket);

        // اگر نوع بلیت گیمر بود، ساعت نوبت محاسبه می‌شود
        if (ticket?.type === "gamer") {
          const seatNumber = Array.isArray(ticket?.seats)
            ? ticket.seats[0]
            : ticket?.seats;

          const turnTime = calculateSeatTime(seatNumber);
          setGamerTurnTime(turnTime);
        } else {
          setGamerTurnTime(null);
        }
      } else {
        throw new Error(ticketRes.message || "خطا در دریافت اطلاعات بلیط");
      }

      if (settingsRes) {
        setSettings(settingsRes?.data ?? settingsRes);
      }
    } catch (err) {
      showToast?.(err.response?.data?.message || err.message, "error");
      setIsSuccess(false);
      setErrorMessage(
        err.response?.data?.message || "مشکلی در دریافت اطلاعات بلیت پیش آمد"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBackHome = () => navigate("/home");

  const handleDownloadPdf = async () => {
    if (!ticketRef.current) return;

    try {
      setDownloading(true);

      const element = ticketRef.current;

      const imgData = await toPng(element, {
        quality: 0.98,
        pixelRatio: 3,
        backgroundColor: "#ffffff",
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const margin = 15;
      const contentWidth = pdfWidth - margin * 2;

      const elWidth = element.offsetWidth || 350;
      const elHeight = element.offsetHeight || 400;
      const contentHeight = (elHeight * contentWidth) / elWidth;

      pdf.addImage(imgData, "PNG", margin, 20, contentWidth, contentHeight);

      const fileName = `Ticket-${ticketData?.ticketCode || "Parand"}.pdf`;
      pdf.save(fileName);

      showToast?.("فایل بلیط با موفقیت دانلود شد.", "success");
    } catch (err) {
      console.error("PDF generation error:", err);
      showToast?.("خطا در ایجاد فایل PDF بلیط", "error");
    } finally {
      setDownloading(false);
    }
  };

  return {
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
  };
}
