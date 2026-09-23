import React from "react";
import { ChevronLeft } from "lucide-react";
import useSelectTicket from "../../hooks/useSelectTicket";

function SelectTicket_holder() {
  const { selectedType, handleSelect, handleContinue } = useSelectTicket();

  const ticketOptions = [
      {
      id: "gamer",
      title: "بازیکن (شرکت‌کننده)",
      desc: "ثبت‌نام و ورود به جدول مسابقات پرند کاپ",
      price: "۳۰۰,۰۰۰ تومان",
      image: "/game.png", // مسیر عکس در public
    },
    {
      id: "vip",
      title: "تماشاچی VIP",
      desc: "جایگاه ویژه VIP + پذیرایی اختصاصی",
      price: "۳۵۰,۰۰۰ تومان",
      image: "/vip.png", // مسیر عکس در public
    },
    {
      id: "regular",
      title: "تماشاچی عادی",
      desc: "جایگاه عمومی تماشاچیان سالن مسابقات",
      price: "۱۵۰,۰۰۰ تومان",
      image: "/regular.png", // مسیر عکس در public
    },
  
  ];

  return (
    <div className="px-5 py-6 flex flex-col gap-4">
      {/* عنوان صفحه با خط زیرین دکوری */}


      {/* لیست کارت‌ها */}
      <div className="space-y-3.5">
        {ticketOptions.map((item) => {
          const isSelected = selectedType === item.id;
          return (
            <div
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className={`bg-white rounded-3xl p-4 flex items-center justify-between border-2 cursor-pointer transition-all duration-200 shadow-sm ${
                isSelected
                  ? "border-blue-500 bg-blue-50/10 shadow-md"
                  : "border-gray-100 hover:border-gray-200"
              }`}
            >
              {/* سمت راست: رادیو باتن + متن‌ها + دکمه قیمت */}
              <div className="flex items-center gap-3.5">
                {/* رادیو باتن سفارشی */}
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected ? "border-blue-600 bg-blue-600" : "border-gray-300"
                  }`}
                >
                  {isSelected && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                </div>

                <div className="space-y-1">
                  <h2 className="text-base font-bold text-gray-800">{item.title}</h2>
                  <p className="text-[11px] text-gray-400 font-medium">{item.desc}</p>
                  
                  <div className="pt-1">
                    <span className="inline-block px-3.5 py-1.5 bg-blue-50 text-blue-600 font-extrabold text-xs rounded-xl">
                      {item.price}
                    </span>
                  </div>
                </div>
              </div>

              {/* سمت چپ: تصویر و فلش */}
              <div className="flex items-center gap-2">
                <div className="w-16 h-16 shrink-0 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <ChevronLeft size={18} className="text-gray-300" />
              </div>
            </div>
          );
        })}
      </div>

      {/* دکمه ادامه ثابت پایین صفحه */}
      <div className="pt-4">
        <button
          type="button"
          onClick={handleContinue}
          className="w-full h-14 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-extrabold text-base rounded-2xl shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center"
        >
          ادامه و انتخاب سانس / صندلی
        </button>
      </div>
    </div>
  );
}

export default SelectTicket_holder;
