import axiosInstance from "../../../components/commonService/axiosInstance";

export const refundApi = async (payload) => {
  try {
    const response = await axiosInstance.post("/refund", payload);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    const errorMsg =
      error.response?.data?.message ||
      error.response?.data?.errors?.[0] ||
      "خطایی در ثبت درخواست رخ داد.";
    return {
      success: false,
      error: errorMsg,
    };
  }
};
