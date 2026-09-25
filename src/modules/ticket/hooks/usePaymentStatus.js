import { useState, useEffect, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { context } from "../../../context/Formcontext.jsx";
import { getTicketDetailsApi } from "../services/reserveService.js";

export default function usePaymentStatus() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showToast } = useContext(context);

  const [loading, setLoading] = useState(true);
  const [ticketData, setTicketData] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null); // true / false
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const success = searchParams.get("success") === "true";
    const ticketId = searchParams.get("ticketId");
    
    setIsSuccess(success);

    if (success && ticketId) {
      // اگر پرداخت موفق بود، جزئیات را از سرور بگیر
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

  return { loading, ticketData, isSuccess, errorMessage, handleBackHome };
}
