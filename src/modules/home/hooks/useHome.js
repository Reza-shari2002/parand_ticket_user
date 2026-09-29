import { useNavigate } from "react-router-dom";
import useProfileChecker from "../../../components/commonhook/useProfileChecker";

export default function useHome() {
  const navigate = useNavigate();

 

  const goToParandCup = () => navigate("/Selectticket");

  return {

    goToParandCup,
    
  };
}
