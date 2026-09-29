import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { context } from "../../../context/Formcontext.jsx";
import { requestPaymentApi, getGeneralSettingsApi } from "../services/reserveService.js";

export default function usePayment() {
  const navigate = useNavigate();
  const { reserveData, showToast } = useContext(context);

  // انتخاب درگاه (پیش‌فرض زرین‌پال فعال است)
  const [selectedGateway, setSelectedGateway] = useState("zarinpal");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // وضعیت و پیام تنظیمات کلی برای این نوع بلیت
  const [ticketNotice, setTicketNotice] = useState({
    message: "",
    isActive: true,
    loading: true,
  });

  // تایمر بر اساس expiresInMinutes (پیش‌فرض ۱۰ دقیقه)
  const initialMinutes = reserveData?.expiresInMinutes || 10;
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);

  // اسکرول به بالا و دریافت اطلاعات Setting
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const fetchSettings = async () => {
      try {
        const res = await getGeneralSettingsApi();
        const settings = res?.data;

        if (settings) {
          const type = reserveData?.type?.toLowerCase();
          let msg = "";
          let activeStatus = 1;

          if (type === "vip") {
            msg = settings.vip_message;
            activeStatus = settings.is_vip_active;
          } else if (type === "gamer") {
            msg = settings.gamer_message;
            activeStatus = settings.is_gamer_active;
          } else {
            // regular یا پیش‌فرض
            msg = settings.regular_message;
            activeStatus = settings.is_regular_active;
          }

          setTicketNotice({
            message: msg || "",
            isActive: activeStatus === 1,
            loading: false,
          });
        }
      } catch (err) {
        const errorMsg =
          err?.response?.data?.message || "خطا در دریافت وضعیت تنظیمات سیستم";
        showToast?.(errorMsg, "error");
        setTicketNotice((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchSettings();
  }, [reserveData?.type, showToast]);

  // مدیریت تایمر معکوس
  useEffect(() => {
    if (timeLeft <= 0) {
      showToast?.("زمان رزرو موقت شما به پایان رسید", "error");
      setTimeout(() => {
        navigate("/select-ticket");
      }, 1500);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, navigate, showToast]);

  // فرمت زمان به mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // کپی کردن کد پیگیری بلیط
  const handleCopyCode = () => {
    if (reserveData?.ticketCode) {
      navigator.clipboard.writeText(reserveData.ticketCode);
      setCopied(true);
      showToast?.("کد پیگیری کپی شد", "success");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // ارسال درخواست شروع پرداخت
  const handlePayment = async () => {
    const ticketId = reserveData?.ticketId;

    if (!ticketId) {
      showToast?.("اطلاعات رزرو یافت نشد. لطفاً مجدداً تلاش کنید.", "error");
      navigate("/select-ticket");
      return;
    }

    if (!selectedGateway) {
      showToast?.("لطفاً درگاه پرداخت را انتخاب کنید.", "error");
      return;
    }

    try {
      setLoading(true);
      const data = await requestPaymentApi(ticketId);

      if (data.status === "success" && data.data?.paymentUrl) {
        // انتقال مستقیم به درگاه پرداخت زرین‌پال
        window.location.href = data.data.paymentUrl;
      } else {
        showToast?.(data.message || "خطا در برقراری ارتباط با درگاه پرداخت", "error");
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "خطا در اتصال به درگاه پرداخت";
      showToast?.(errorMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  return {
    reserveData,
    timeLeft,
    formatTime,
    selectedGateway,
    setSelectedGateway,
    loading,
    copied,
    ticketNotice,
    handleCopyCode,
    handlePayment,
  };
}
