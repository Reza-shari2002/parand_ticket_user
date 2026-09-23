import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { context } from "../../../context/Formcontext.jsx";
import { reserveTicketApi } from "../services/reserveService.js";
import useProfileChecker from "../../../components/commonhook/useProfileChecker";

// جدول قیمت‌ها و قوانین نوع بلیط
const TICKET_PRICES = {
  vip: {
    name: "تماشاچی VIP",
    price: 350000,
    maxCount: 5,
    desc: "جایگاه ویژه VIP + پذیرایی اختصاصی",
  },
  regular: {
    name: "تماشاچی عادی",
    price: 150000,
    maxCount: 5,
    desc: "جایگاه عمومی - سالن اصلی",
  },
  gamer: {
    name: "بازیکن (شرکت‌کننده)",
    price: 300000,
    maxCount: 1,
    desc: "ثبت‌نام و ورود به جدول مسابقات",
  },
};

export default function useReserve() {
  const navigate = useNavigate();
  const { ticket_type, set_ticketId, setReserveData, showToast } = useContext(context);
  const { isLoading, showProfileModal, closeProfileModal } = useProfileChecker();

  // اسکرول نرم به بالای صفحه هنگام لود
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // نوع بلیط انتخابی (پیش‌فرض عادی)
  const currentType = ticket_type || "regular";
  const ticketInfo = TICKET_PRICES[currentType] || TICKET_PRICES.regular;
  const maxAllowed = ticketInfo.maxCount;

  // تعداد نفرات
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleIncrease = () => {
    if (count < maxAllowed) {
      setCount((prev) => prev + 1);
    } else {
      showToast?.(
        `حداکثر تعداد مجاز برای این نوع بلیط ${maxAllowed} نفر است`,
        "error"
      );
    }
  };

  const handleDecrease = () => {
    if (count > 1) {
      setCount((prev) => prev - 1);
    }
  };

  // محاسبه مبلغ کل
  const totalAmount = count * ticketInfo.price;

  // ارسال درخواست رزرو به سرور
  const handleReserveSubmit = async () => {
    try {
      setLoading(true);
      const data = await reserveTicketApi(currentType, count);

      if (data.status === "success" && data.data?.ticketId) {
        // ذخیره کل داده رزرو در کانتکست (شامل ticketId، ticketCode، totalAmount، ...)
        setReserveData?.(data.data);

        // اطمینان از ذخیره ticketId به صورت مجزا (برای سازگاری با کدهای قبلی)
        set_ticketId?.(data.data.ticketId);

        showToast?.(data.message || "رزرو موقت با موفقیت انجام شد", "success");

        // هدایت به صفحه پرداخت
        setTimeout(() => {
          navigate("/payment");
        }, 1000);
      } else {
        showToast?.(data.message || "خطا در انجام رزرو", "error");
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "خطا در برقراری ارتباط با سرور";
      showToast?.(errorMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  return {
    ticketInfo,
    currentType,
    count,
    maxAllowed,
    totalAmount,
    loading,
    handleIncrease,
    handleDecrease,
    handleReserveSubmit,
    isLoading,
    showProfileModal,
    closeProfileModal,
  };
}
