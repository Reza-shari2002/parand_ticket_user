import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { context } from "../../../context/Formcontext";
import { refundSchema } from "../validation/refundSchema";
import { refundApi } from "../service/Refundservice";

export default function useRefund({ ticket_id, onClose, onSuccess }) {
  const [step, setStep] = useState("confirm"); // 'confirm' | 'form'
  const { showToast } = useContext(context) || {};

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(refundSchema),
    mode: "onChange",
    defaultValues: {
      full_name: "",
      national_code: "",
      iban: "IR",
      card_number: "",
    },
  });

  const onSubmit = async (formData) => {
    // تمیزسازی شبا و کارت قبل از ارسال
    const payload = {
      ticket_id: Number(ticket_id),
      full_name: formData.full_name.trim(),
      national_code: formData.national_code.trim(),
      iban: formData.iban.toUpperCase().replace(/\s/g, ""),
      card_number: formData.card_number.replace(/[\s-]/g, ""),
    };

    const result = await refundApi(payload);

    if (result.success) {
      showToast?.(result.data?.message || "درخواست استرداد با موفقیت ثبت شد.", "success");
      reset();
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } else {
      showToast?.(result.error, "error");
    }
  };

  return {
    step,
    setStep,
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
    isValid,
  };
}
