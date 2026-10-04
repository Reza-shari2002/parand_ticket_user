import React from "react";
import useSelectTicket from "../../hooks/useSelectTicket";

function SelectTicket_holder() {
  const {
    selectedType,
    handleSelect,
    handleContinue,
    ticketPrices,
    settings,
    isLoadingSettings,
    settingsError,
  } = useSelectTicket();

  const ticketOptions = [
    {
      id: "gamer",
      title: "بازیکن (شرکت‌کننده)",
      desc: "ثبت‌نام و جدول مسابقات",
      image: "/game.png",
    },
    {
      id: "vip",
      title: "تماشاچی VIP",
      desc: "فینال مسابقه",
      image: "/vip.png",
    },
    {
      id: "regular",
      title: "تماشاچی عادی",
      desc: "فینال  مسابقات",
      image: "/regular.png",
    },
  ];

  const formatPrice = (price) => {
    if (isLoadingSettings) return "در حال دریافت...";
    if (settingsError) return "خطا در دریافت";
    if (price === null || price === undefined || price === "") {
      return "قیمت نامشخص";
    }

    const numericPrice = Number(price);
    if (!Number.isFinite(numericPrice)) {
      return "قیمت نامعتبر";
    }

    return `${new Intl.NumberFormat("fa-IR").format(numericPrice)} ریال`;
  };

  const formatEventDate = (isoDate) => {
    if (!isoDate) return "زمان نامشخص";
    try {
      const date = new Date(isoDate);
      return new Intl.DateTimeFormat("fa-IR", {
        timeZone: "UTC", // جلوگیری از اعمال مجدد اختلاف زمانی ۳:۳۰
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch {
      return "زمان نامعتبر";
    }
  };

  return (
    <div className="w-full max-w-[430px] mx-auto px-4 py-4 flex flex-col min-h-[calc(100vh-80px)] pb-28 select-none">
      <div className="space-y-3.5 w-full">
        {ticketOptions.map((item) => {
          const isSelected = selectedType === item.id;
          const location = settings?.[`${item.id}_location`];
          const date = settings?.[`${item.id}_event_date`];

          return (
            <div
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className={`relative bg-white rounded-3xl overflow-hidden flex items-stretch border-[2.5px] transition-all duration-200 cursor-pointer shadow-sm active:scale-[0.99] ${
                isSelected
                  ? "border-blue-600 bg-blue-50/15 shadow-md ring-2 ring-blue-500/20"
                  : "border-gray-100 hover:border-gray-200"
              }`}
            >
              {/* بخش ۱/۳: تصویر */}
              <div className="w-1/3 min-w-[110px] bg-slate-50 p-3 flex items-center justify-center border-l border-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-20 object-contain drop-shadow-sm"
                />
              </div>

              {/* بخش ۲/۳: اطلاعات متنی، زمان/مکان و قیمت */}
              <div className="w-2/3 p-3.5 flex flex-col justify-between min-w-0">
                <div className="flex flex-col gap-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h2 className="text-sm font-black text-gray-800 truncate">
                      {item.title}
                    </h2>
                    {/* رادیو باتن */}
                    <div
                      className={`w-5 h-5 shrink-0 rounded-full border-2 flex items-center justify-center transition-all ${
                        isSelected
                          ? "border-blue-600 bg-blue-600"
                          : "border-gray-300"
                      }`}
                    >
                      {isSelected && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                  </div>

                  <p className="text-[11px] text-gray-400 font-medium truncate leading-tight">
                    {item.desc}
                  </p>

                  <div className="mt-1 flex flex-col gap-0.5 text-[10.5px] text-gray-500">
                    <div className="flex items-center gap-1 truncate">
                      <span className="text-gray-400">📍</span>
                      <span className="truncate">
                        {location || "مکان نامشخص"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 truncate">
                      <span className="text-gray-400">🕒</span>
                      <span>{formatEventDate(date)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-2.5 pt-1.5 border-t border-slate-100/80 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 font-bold">
                    قیمت بلیت:
                  </span>
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-600 font-black text-xs rounded-lg border border-blue-100/60">
                    {formatPrice(ticketPrices[item.id])}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* دکمه اقدام */}
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
