// تابع کمکی برای تبدیل ارقام انگلیسی به فارسی
const toPersianDigits = (num) => {
  const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return String(num).replace(/\d/g, (x) => farsiDigits[x]);
};

/**
 * محاسبه زمان حضور با توجه به شماره صندلی
 * @param {number|string} seatNumber - شماره صندلی
 * @returns {string} - ساعت حضور به فرمت فارسی "۱۹:۱۵" یا وضعیت رزرو
 */
export const calculateSeatTime = (seatNumber) => {
  const seat = Number(seatNumber);

  if (!seat || isNaN(seat) || seat < 1) {
    return "شماره صندلی نامعتبر";
  }

  // اگر شماره صندلی بیشتر از ۶۴ باشد
  if (seat > 64) {
    return "در حال رزرو";
  }

  // صندلی‌های ۵۷ تا ۶۴ (تایم آخر)
  if (seat > 56) {
    return "۲۱:۱۵";
  }

  // زمان پایه: ۱۹:۱۵ (۱۱۵۵ دقیقه از ابتدای روز)
  const BASE_TIME_IN_MINUTES = 19 * 60 + 15;

  // محاسبه گروه ۱۴ تایی (0، 1، 2، 3)
  const groupIndex = Math.floor((seat - 1) / 14);
  const totalMinutes = BASE_TIME_IN_MINUTES + groupIndex * 30;

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");

  // بازگرداندن ساعت و دقیقه با دو‌نقطه فارسی
  return `${toPersianDigits(formattedHours)}:${toPersianDigits(formattedMinutes)}`;
};
