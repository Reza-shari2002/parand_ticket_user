import { useNavigate } from "react-router-dom";
import useProfileChecker from "../../../components/commonhook/useProfileChecker";

export default function useHome() {
  const navigate = useNavigate();

  const { isLoading, showProfileModal, closeProfileModal } =
    useProfileChecker();

  const goToParandCup = () => navigate("/parand-cup");

  return {
    isLoading,
    showProfileModal,
    goToParandCup,
    closeProfileModal,
  };
}
