import * as yup from "yup";

export const refundSchema = yup.object().shape({
  full_name: yup
    .string()
    .trim()
    .required("نام و نام خانوادگی الزامی است")
    .min(3, "نام و نام خانوادگی باید حداقل ۳ حرف باشد"),

  national_code: yup
    .string()
    .trim()
    .required("کد ملی الزامی است")
    .matches(/^\d{10}$/, "کد ملی باید دقیقاً ۱۰ رقم باشد"),

  iban: yup
    .string()
    .trim()
    .required("شماره شبا الزامی است")
    .transform((value) => (value ? value.toUpperCase().replace(/\s/g, "") : value))
    .matches(/^IR\d{24}$/, "شماره شبا نامعتبر است (مثال: IR123456789012345678901234)"),

  card_number: yup
    .string()
    .trim()
    .required("شماره کارت الزامی است")
    .transform((value) => (value ? value.replace(/[\s-]/g, "") : value))
    .matches(/^\d{16}$/, "شماره کارت باید ۱۶ رقم باشد"),
});
