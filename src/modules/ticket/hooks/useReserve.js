import { useState, useContext, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { context } from "../../../context/Formcontext.jsx";
import {
  reserveTicketApi,
  getGeneralSettingsApi,
} from "../services/reserveService.js";
import useProfileChecker from "../../../components/commonhook/useProfileChecker";

// جدول قوانین (نام/توضیح/سقف تعداد ثابت می‌ماند)
// فقط price را از settings داینامیک می‌کنیم
const TICKET_RULES = {
  vip: {
    name: "تماشاچی VIP",
    fallbackPrice: 15000000, // فقط برای زمانی که settings هنوز نیامده
    maxCount: 5,
    desc: "جایگاه ویژه VIP + پذیرایی اختصاصی",
  },
  regular: {
    name: "تماشاچی عادی",
    fallbackPrice: 10000000,
    maxCount: 5,
    desc: "جایگاه عمومی - سالن اصلی",
  },
  gamer: {
    name: "بازیکن (شرکت‌کننده)",
    fallbackPrice: 10000000,
    maxCount: 1,
    desc: "ثبت‌نام و ورود به جدول مسابقات",
  },
};

export default function useReserve() {
  const navigate = useNavigate();
  const { ticket_type, set_ticketId, setReserveData, showToast } =
    useContext(context);
  const { isLoading, showProfileModal, closeProfileModal } =
    useProfileChecker();

  // اسکرول نرم به بالای صفحه هنگام لود
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const currentType = ticket_type || "regular";
  const baseRule = TICKET_RULES[currentType] || TICKET_RULES.regular;
  const maxAllowed = baseRule.maxCount;

  // تعداد نفرات
  const [count, setCount] = useState(1);

  // وضعیت رزرو
  const [loading, setLoading] = useState(false);

  const [settings, setSettings] = useState(null);
  const [isLoadingSettings, setIsLoadingSettings] = useState(true);
  const [settingsError, setSettingsError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchSettings() {
      try {
        setIsLoadingSettings(true);
        const response = await getGeneralSettingsApi();

        const settingsData = response?.data ?? response;

        if (isMounted) setSettings(settingsData);
      } catch (err) {
        if (isMounted) setSettingsError(true);

        const errorMsg =
          err?.response?.data?.message || "خطا در دریافت تنظیمات قیمت";

        showToast?.(errorMsg, "error");
        console.log(errorMsg);
      } finally {
        if (isMounted) setIsLoadingSettings(false);
      }
    }

    fetchSettings();
    return () => {
      isMounted = false;
    };
  }, []);

  // قیمت داینامیک بر اساس نوع انتخابی
  const dynamicUnitPrice = useMemo(() => {
    const key = `${currentType}_price`; // vip_price | regular_price | gamer_price
    const raw = settings?.[key];

    const numeric = Number(raw);
    if (Number.isFinite(numeric) && numeric >= 0) return numeric;

    return baseRule.fallbackPrice;
  }, [settings, currentType, baseRule.fallbackPrice]);

  const ticketInfo = useMemo(() => {
    return {
      name: baseRule.name,
      desc: baseRule.desc,
      maxCount: baseRule.maxCount,
      price: dynamicUnitPrice, // فقط این داینامیک شد
    };
  }, [baseRule, dynamicUnitPrice]);

  const handleIncrease = () => {
    if (count < maxAllowed) {
      setCount((prev) => prev + 1);
    } else {
      showToast?.(
        `حداکثر تعداد مجاز برای این نوع بلیط ${maxAllowed} نفر است`,
        "error",
      );
    }
  };

  const handleDecrease = () => {
    if (count > 1) {
      setCount((prev) => prev - 1);
    }
  };

  const totalAmount = count * ticketInfo.price;

  const handleReserveSubmit = async () => {
    try {
      setLoading(true);
      const data = await reserveTicketApi(currentType, count);

      if (data.status === "success" && data.data?.ticketId) {
        setReserveData?.(data.data);
        set_ticketId?.(data.data.ticketId);

        showToast?.(data.message || "رزرو موقت با موفقیت انجام شد", "success");

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

    // چیزهای قبلی
    isLoading,
    showProfileModal,
    closeProfileModal,

    // اختیاری (اگر بعدها خواستی در UI نشان بدهی)
    isLoadingSettings,
    settingsError,
  };
}
