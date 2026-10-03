import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import useHome from "../hooks/useHome";

function Home_holder() {
  const { goToParandCup } = useHome();

  // ۲ باکس خالی ردیف بالا
  const emptySlots = Array.from({ length: 2 });

  return (
    <div className="w-full max-w-[430px] mx-auto min-h-[calc(100vh-80px)] px-4 pt-3 pb-6 select-none flex flex-col justify-between gap-5">
      {/* بخش بالایی: آیکون‌ها و بنر */}
      <div className="flex flex-col gap-4 w-full">
        {/* ۱. ردیف آیکون‌ها */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3 w-full">
          {/* کارت پرند کاپ */}
          <div
            onClick={goToParandCup}
            className="group relative aspect-square bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md flex flex-col items-center justify-center p-2.5 cursor-pointer active:scale-95 transition-all duration-200 hover:border-cyan-400"
          >
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-cyan-50/70 flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform overflow-hidden relative border border-cyan-100/50">
              <img
                src="/daste_white_bg.png"
                alt="پرند کاپ"
                className="w-16 h-16 object-contain relative z-10"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <span className="absolute text-2xl">🎮</span>
            </div>

            <span className="text-xs font-black text-gray-800 text-center">
              پرند کاپ
            </span>
          </div>

          {/* خانه‌های خالی */}
          {emptySlots.map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-white/70 rounded-2xl border border-gray-100/80 shadow-xs"
            />
          ))}
        </div>

        {/* ۲. بنر مسابقات پرند کاپ */}
        <div className="w-full">
          <Link
            to="/Selectticket"
            className="block relative w-full aspect-[2.1/1] rounded-2xl sm:rounded-3xl overflow-hidden shadow-md shadow-blue-500/10 border border-gray-100 bg-gray-50 active:scale-[0.98] transition-transform duration-150"
          >
            <img
              src="/parandcup_banner.png"
              alt="بنر مسابقات پرند کاپ"
              className="w-full h-full object-cover select-none pointer-events-none"
            />
          </Link>
        </div>
      </div>

      {/* بخش پایینی: باکس یکپارچه و شکیل نمادهای اعتماد و درگاه */}
      <div className="w-full bg-white rounded-3xl border border-gray-100/90 p-4 shadow-sm shadow-gray-200/50 flex flex-col items-center">
        {/* عنوان بالای باکس */}
        <div className="flex items-center gap-1.5 text-gray-500 mb-3">
          <ShieldCheck size={16} className="text-emerald-500" />
          <span className="text-[11px] font-bold tracking-tight text-gray-600">
            پرداخت امن و مورد تأیید
          </span>
        </div>

        {/* محتوای لوگوها با اندازه بزرگتر و تفکیک شیک */}
        <div className="w-full flex items-center justify-around gap-4 bg-gray-50/60 rounded-2xl p-2.5 border border-gray-100">
          {/* لوگو زرین‌پال */}
          <div
            title="درگاه پرداخت زرین‌پال"
            className="flex-1 h-14 flex items-center justify-center p-1"
          >
            <img
              src="/zarinpall.png"
              alt="زرین پال"
              className="h-full w-full object-contain filter drop-shadow-xs"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextSibling.style.display = "flex";
              }}
            />
            <div className="hidden flex-col items-center justify-center text-gray-400 text-xs font-bold">
              <span className="text-amber-500 font-black">ZP</span>
              <span>زرین‌پال</span>
            </div>
          </div>

          {/* خط جداکننده وسط */}
          <div className="w-[1px] h-9 bg-gray-200" />

          {/* لوگو اینماد */}
          <a
            href="https://trustseal.enamad.ir/?id=584004&Code=FbSJaAzRqHblHHUgtbB8ZQ5glh9w7AbG"
            target="_blank"
            rel="noopener noreferrer"
            title="نماد اعتماد الکترونیکی"
            className="flex-1 h-14 flex items-center justify-center p-1 active:scale-95 transition-transform"
          >
            <img
              src="/e-nemad.png"
              alt="اینماد"
              className="h-full w-full object-contain filter drop-shadow-xs"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextSibling.style.display = "flex";
              }}
            />
            <div className="hidden flex-col items-center justify-center text-gray-400 text-xs font-bold">
              <ShieldCheck size={20} className="text-blue-500 mb-0.5" />
              <span>اینماد</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home_holder;
