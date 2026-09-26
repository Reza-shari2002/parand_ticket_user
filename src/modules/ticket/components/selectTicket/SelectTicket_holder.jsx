import React from "react";
import useSelectTicket from "../../hooks/useSelectTicket";

function SelectTicket_holder() {
  const { selectedType, handleSelect, handleContinue } = useSelectTicket();

  const ticketOptions = [
    {
      id: "gamer",
      title: "بازیکن (شرکت‌کننده)",
      desc: "ثبت‌نام و ورود به جدول مسابقات پرند کاپ",
      price: "۳۰۰,۰۰۰ ریال",
      image: "/game.png",
    },
    {
      id: "vip",
      title: "تماشاچی VIP",
      desc: "جایگاه ویژه VIP + پذیرایی اختصاصی",
      price: "۳۵۰,۰۰۰ ریال",
      image: "/vip.png",
    },
    {
      id: "regular",
      title: "تماشاچی عادی",
      desc: "جایگاه عمومی تماشاچیان سالن مسابقات",
      price: "۱۵۰,۰۰۰ ریال",
      image: "/regular.png",
    },
  ];

  return (
    <div className="w-full max-w-[430px] mx-auto px-4 py-4 flex flex-col min-h-[calc(100vh-80px)] pb-28 select-none">
      {/* لیست کارت‌ها */}
      <div className="space-y-3.5 w-full">
        {ticketOptions.map((item) => {
          const isSelected = selectedType === item.id;
          return (
            <div
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className={`relative bg-white rounded-2xl p-3.5 flex items-center justify-between border-2 transition-all duration-200 cursor-pointer shadow-sm active:scale-[0.99] ${
                isSelected
                  ? "border-blue-600 bg-blue-50/15 shadow-md ring-2 ring-blue-500/20"
                  : "border-gray-100 hover:border-gray-200"
              }`}
            >
              {/* سمت راست: تصویر آیکون + عنوان + توضیحات + قیمت */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-slate-50 p-2 flex items-center justify-center border border-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex flex-col gap-1 min-w-0 flex-1">
                  <h2 className="text-sm font-black text-gray-800 truncate">
                    {item.title}
                  </h2>
                  <p className="text-[11px] text-gray-400 font-medium line-clamp-1 leading-tight">
                    {item.desc}
                  </p>
                  <div className="mt-1">
                    <span className="inline-block px-2.5 py-1 bg-blue-50 text-blue-600 font-extrabold text-xs rounded-lg border border-blue-100/50">
                      {item.price}
                    </span>
                  </div>
                </div>
              </div>

              {/* سمت چپ: رادیو باتن */}
              <div className="flex items-center mr-2 shrink-0">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected
                      ? "border-blue-600 bg-blue-600 shadow-sm"
                      : "border-gray-300"
                  }`}
                >
                  {isSelected && (
                    <div className="w-2.5 h-2.5 bg-white rounded-full" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* دکمه ادامه با فاصله مناسب از منوی پایین */}
      <div className="mt-6 w-full">
        <button
          type="button"
          onClick={handleContinue}
          className="w-full h-13 py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-extrabold text-base rounded-2xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center cursor-pointer"
        >
          ادامه و انتخاب سانس / صندلی
        </button>
      </div>
    </div>
  );
}

export default SelectTicket_holder;
