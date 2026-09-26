import { useState, useEffect, useContext, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { context } from "../../../context/Formcontext.jsx";
import { getTicketDetailsApi } from "../services/reserveService.js";

export default function usePaymentStatus() {
  // ۱. تمام هوک‌ها دقیقاً در بالاترین سطح و با ترتیب ثابت
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showToast } = useContext(context) || {};

  const [loading, setLoading] = useState(true);
  const [ticketData, setTicketData] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [downloading, setDownloading] = useState(false);

  const ticketRef = useRef(null);

  useEffect(() => {
    const success = searchParams.get("success") === "true";
    const ticketId = searchParams.get("ticketId");

    setIsSuccess(success);

    if (success && ticketId) {
      fetchTicketDetails(ticketId);
    } else {
      setLoading(false);
      setErrorMessage("پرداخت شما با موفقیت انجام نشد.");
    }
  }, [searchParams]);

  const fetchTicketDetails = async (ticketId) => {
    try {
      setLoading(true);
      const response = await getTicketDetailsApi(ticketId);

      if (response.status === "success") {
        setTicketData(response.data);
      } else {
        throw new Error(response.message || "خطا در دریافت اطلاعات بلیط");
      }
    } catch (err) {
      showToast?.(err.response?.data?.message || err.message, "error");
      setIsSuccess(false);
      setErrorMessage(err.response?.data?.message || "مشکلی در دریافت بلیط پیش آمد");
    } finally {
      setLoading(false);
    }
  };

  const handleBackHome = () => navigate("/home");

  // متد خروجی PDF بدون مشکل oklch با html-to-image
  const handleDownloadPdf = async () => {
    if (!ticketRef.current) return;

    try {
      setDownloading(true);

      const element = ticketRef.current;

      // ساخت تصویر با پشتیبانی کامل از استایل‌ها و فونت‌ها
      const imgData = await toPng(element, {
        quality: 0.98,
        pixelRatio: 3, // کیفیت بالا جهت چاپ
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

      // خواندن ابعاد المان واقعی برای حفظ نسبت طول و عرض در PDF
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
    isSuccess,
    errorMessage,
    ticketRef,
    downloading,
    handleDownloadPdf,
    handleBackHome,
  };
}
