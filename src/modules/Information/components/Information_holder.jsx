import React, { useState } from "react";
import {
  ShieldCheck,
  Gamepad2,
  Users,
  AlertCircle,
  FileText,
  CheckCircle2,
} from "lucide-react";

function Information_holder() {
  const [activeTab, setActiveTab] = useState("players");

  const playerRules = [
    "ثبت‌نام و حضور در مسابقات به منزله پذیرش کامل این قوانین و تصمیمات کمیته برگزاری است.",
    "تمامی شرکت‌کنندگان موظف به رعایت قوانین و مقررات جمهوری اسلامی ایران، شئونات اخلاقی و رفتار محترمانه نسبت به سایر بازیکنان، داوران و عوامل اجرایی هستند.",
    "هرگونه توهین، درگیری لفظی یا فیزیکی، ایجاد مزاحمت، رفتار غیراخلاقی، تهدید یا اخلال در نظم مسابقات موجب حذف فوری از تورنمنت خواهد شد.",
    "استفاده از هرگونه تقلب، دستکاری تجهیزات، سوءاستفاده از باگ‌های بازی یا اقداماتی که موجب برهم خوردن عدالت مسابقات شود ممنوع بوده و منجر به حذف از رقابت خواهد شد.",
    "شرکت‌کنندگان موظف به حفظ و مراقبت از تجهیزات، کنسول‌ها، نمایشگرها، مبلمان، تأسیسات و سایر اموال محل برگزاری هستند. در صورت ورود هرگونه خسارت ناشی از عمد، بی‌احتیاطی یا استفاده نادرست، جبران کامل خسارت بر عهده فرد خاطی خواهد بود.",
    "برگزارکننده مسئولیتی در قبال مفقود شدن، سرقت یا آسیب به وسایل شخصی شرکت‌کنندگان نخواهد داشت.",
    "اطلاعات ثبت‌نامی شرکت‌کنندگان صرفاً جهت برگزاری مسابقات استفاده شده و مطابق قوانین مربوط به حریم خصوصی نگهداری خواهد شد.",
    "شرکت‌کنندگان با حضور در مسابقات، اجازه استفاده از تصاویر، فیلم‌ها و محتوای رسانه‌ای مربوط به رویداد را برای اهداف خبری، تبلیغاتی و اطلاع‌رسانی به برگزارکننده اعطا می‌کنند.",
    "برگزارکننده حق تغییر زمان‌بندی، ساختار مسابقات، تعداد بازی‌ها، قوانین فنی و برنامه اجرایی را در صورت ضرورت حفظ می‌کند.",
    "تصمیم نهایی در خصوص نتایج مسابقات، تخلفات و تفسیر قوانین بر عهده کمیته برگزاری و داوران مسابقات بوده و برای تمامی شرکت‌کنندگان لازم‌الاجرا است.",
    "در صورت بروز شرایط خارج از کنترل برگزارکننده از جمله قطعی برق، اختلال اینترنت، حوادث غیرمترقبه یا موارد مشابه، برگزارکننده مجاز به تعویق، توقف یا تغییر روند مسابقات خواهد بود.",
    "حداقل سن شرکت‌کنندگان مطابق ضوابط اعلامی برگزارکننده است و افراد زیر ۱۸ سال در صورت درخواست برگزارکننده موظف به ارائه رضایت‌نامه ولی یا قیم قانونی خواهند بود.",
  ];

  const spectatorRules = [
    "حضور در محل برگزاری مسابقات به منزله پذیرش کامل قوانین و مقررات رویداد است.",
    "رعایت قوانین جمهوری اسلامی ایران، شئونات اخلاقی، احترام به شرکت‌کنندگان، داوران، عوامل اجرایی و سایر تماشاگران الزامی است.",
    "هرگونه توهین، درگیری لفظی یا فیزیکی، ایجاد مزاحمت، رفتار نامناسب یا برهم زدن نظم مسابقات ممنوع بوده و موجب اخراج از محل برگزاری خواهد شد.",
    "ورود به محدوده مسابقات، دستکاری تجهیزات، ایجاد اختلال در روند بازی یا دخالت در تصمیمات داوری ممنوع است.",
    "تماشاگران موظف به حفظ و نگهداری از تجهیزات و اموال محل برگزاری هستند. مسئولیت جبران هرگونه خسارت ناشی از عمد یا بی‌احتیاطی بر عهده فرد خاطی خواهد بود.",
    "رعایت حریم خصوصی افراد الزامی است. انتشار تصاویر، فیلم یا اطلاعات شخصی سایر اشخاص بدون رضایت آنان ممنوع بوده و مسئولیت قانونی آن بر عهده منتشرکننده است.",
    "برگزارکننده مجاز است از فضای عمومی رویداد جهت تصویربرداری، فیلم‌برداری و پوشش رسانه‌ای استفاده نماید.",
    "برگزارکننده مسئولیتی در قبال مفقودی یا آسیب به وسایل شخصی تماشاگران نخواهد داشت.",
    "برگزارکننده حق ممانعت از ورود یا اخراج افراد متخلف یا برهم‌زننده نظم و امنیت رویداد را برای خود محفوظ می‌دارد.",
    "حضور در سالن به منزله پذیرش کامل این مقررات است.",
  ];

  return (
    <div className="p-4 space-y-4">
      {/* بنر معرفی بالا */}
      <div className="bg-gradient-to-r from-[#8B9EFF]/15 to-[#8B9EFF]/5 border border-[#8B9EFF]/30 rounded-3xl p-4 flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-[#8B9EFF] flex items-center justify-center text-white shrink-0 shadow-md shadow-[#8B9EFF]/20">
          <ShieldCheck size={26} />
        </div>
        <div>
          <h2 className="text-base font-black text-gray-800">قوانین و مقررات رویداد</h2>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            تورنمنت بازی‌های ویدیویی پرند کاپ
          </p>
        </div>
      </div>

      {/* تب‌بندی بین بازیکنان و تماشاگران */}
      <div className="grid grid-cols-2 gap-2 bg-gray-200/70 p-1.5 rounded-2xl">
        <button
          type="button"
          onClick={() => setActiveTab("players")}
          className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
            activeTab === "players"
              ? "bg-white text-[#8B9EFF] shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <Gamepad2 size={16} />
          <span>شرکت‌کنندگان</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("spectators")}
          className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
            activeTab === "spectators"
              ? "bg-white text-[#8B9EFF] shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <Users size={16} />
          <span>تماشاگران</span>
        </button>
      </div>

      {/* لیست بندهای قوانین */}
      <div className="space-y-2.5">
        {(activeTab === "players" ? playerRules : spectatorRules).map(
          (rule, index) => (
            <div
              key={index}
              className="bg-white border border-gray-100/90 rounded-2xl p-3.5 shadow-sm flex items-start gap-3 hover:border-[#8B9EFF]/40 transition"
            >
              <div className="w-6 h-6 rounded-full bg-[#8B9EFF]/10 text-[#8B9EFF] flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                {index + 1}
              </div>
              <p className="text-xs leading-6 text-gray-700 font-medium text-justify">
                {rule}
              </p>
            </div>
          )
        )}
      </div>

      {/* باکس اخطار / یادآوری پایانی */}
      <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-3.5 flex items-center gap-3">
        <AlertCircle size={20} className="text-amber-500 shrink-0" />
        <p className="text-[11px] text-amber-800 leading-5 font-semibold">
          رعایت کامل موارد فوق جهت حفظ نظم و ایجاد محیطی پویا و رقابتی الزامی است.
        </p>
      </div>
    </div>
  );
}

export default Information_holder;
