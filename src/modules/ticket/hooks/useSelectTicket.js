import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { context } from "../../../context/Formcontext.jsx"; // مسیر کانتکست شما

export default function useSelectTicket() {
  const navigate = useNavigate();
  const { ticket_type, set_ticket_type } = useContext(context);

  // پیش‌فرض روی VIP یا مقدار موجود در کانتکست
  const [selectedType, setSelectedType] = useState(ticket_type || "vip");

  const handleSelect = (type) => {
    setSelectedType(type);
  };

  const handleContinue = () => {
    // ذخیره در کانتکست
    set_ticket_type(selectedType);
    // هدایت به صفحه رزرو سانس/صندلی
    navigate("/reserve");
  };

  return {
    selectedType,
    handleSelect,
    handleContinue,
  };
}
