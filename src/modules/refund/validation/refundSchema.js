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
    .matches(/^[0-9]{10}$/, "کد ملی باید دقیقاً ۱۰ رقم انگلیسی باشد"),

  card_number: yup
    .string()
    .trim()
    .required("شماره کارت الزامی است")
    .test("no-persian-digits", "شماره کارت باید با اعداد انگلیسی وارد شود", (value) => {
      if (!value) return true;
      return !/[۰-۹٠-٩]/.test(value);
    })
    .matches(/^[0-9]{16}$/, "شماره کارت باید دقیقاً ۱۶ رقم انگلیسی بدون خط تیره باشد"),
});
