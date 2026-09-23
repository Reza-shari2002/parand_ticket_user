import axiosInstance from "../../../components/commonService/axiosInstance";


export const reserveTicketApi = async (type, count) => {
  const response = await axiosInstance.post("/tickets/reserve", {
    type,
    count: Number(count),
  });
  return response.data;
};

export const requestPaymentApi = async (ticketId) => {
  const response = await axiosInstance.post("/payment/request", { ticketId });
  return response.data;
};
