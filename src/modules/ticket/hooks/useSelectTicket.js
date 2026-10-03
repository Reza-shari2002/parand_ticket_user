import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { context } from "../../../context/Formcontext.jsx";
import { getGeneralSettingsApi } from "../services/reserveService";

export default function useSelectTicket() {
  const navigate = useNavigate();
  const { ticket_type, set_ticket_type, showToast } = useContext(context);

  const [selectedType, setSelectedType] = useState(ticket_type || "vip");
  const [settings, setSettings] = useState(null);
  const [isLoadingSettings, setIsLoadingSettings] = useState(true);
  const [settingsError, setSettingsError] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    let isMounted = true;

    async function fetchSettings() {
      try {
        const response = await getGeneralSettingsApi();
        const settingsData = response?.data ?? response;

        if (isMounted) {
          setSettings(settingsData);
        }
      } catch (err) {
        const errorMsg =
          err?.response?.data?.message || "خطا در دریافت وضعیت تنظیمات سیستم";
        showToast?.(errorMsg, "error");

        if (isMounted) {
          setSettingsError(true);
        }
      } finally {
        if (isMounted) {
          setIsLoadingSettings(false);
        }
      }
    }

    fetchSettings();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSelect = (type) => {
    setSelectedType(type);
  };

  const handleContinue = () => {
    set_ticket_type(selectedType);
    navigate("/Reserve");
  };

  const ticketPrices = {
    gamer: settings?.gamer_price,
    vip: settings?.vip_price,
    regular: settings?.regular_price,
  };

  return {
    selectedType,
    handleSelect,
    handleContinue,
    ticketPrices,
    settings,
    isLoadingSettings,
    settingsError,
  };
}
