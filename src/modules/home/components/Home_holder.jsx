import React from "react";
import useHome from "../hooks/useHome";
import CompleteProfileModal from "../../profile/components/CompleteProfileModal";
import LoadingScreen from "../../../components/common/LoadingScreen";

function Home_holder() {
  const { isLoading, showProfileModal, goToParandCup, closeProfileModal } =
    useHome();

  if (isLoading) return <LoadingScreen />;

  const emptySlots = Array.from({ length: 8 });

  return (
    <div className="flex flex-col min-h-full p-4 sm:p-5 gap-4">
      {/* گرید سرویس‌ها */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {/* کارت پرند کاپ (اول رندر می‌شود تا همیشه خانه اول باشد) */}
        <div
          onClick={goToParandCup}
          className="group relative aspect-square bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md flex flex-col items-center justify-center p-3 cursor-pointer active:scale-95 transition-all duration-200 hover:border-[#00FFD6]"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-cyan-50/60 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform overflow-hidden relative">
            <img
              src="/assets/gamepad.png"
              alt="پرند کاپ"
              className="w-11 h-11 sm:w-14 sm:h-14 object-contain relative z-10"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <span className="absolute text-3xl sm:text-4xl">🎮</span>
          </div>

          <span className="text-xs sm:text-sm font-black text-gray-800 text-center">
            پرند کاپ
          </span>
        </div>

        {/* ۸ سلول خالی */}
        {emptySlots.map((_, i) => (
          <div
            key={i}
            className="aspect-square bg-white rounded-2xl border border-gray-100 shadow-sm"
          />
        ))}
      </div>

      {/* بنر مسابقات پرند کاپ */}
      <div
        onClick={goToParandCup}
        className="relative w-full min-h-[145px] sm:min-h-[165px] rounded-3xl overflow-hidden cursor-pointer active:scale-[0.99] transition-all shadow-xl shadow-cyan-900/10 bg-gradient-to-l from-[#0b132b] via-[#1c2541] to-[#1e1b4b] flex items-center justify-between p-5 sm:p-6 text-white border border-cyan-500/20"
      >
        <div className="absolute -left-10 -bottom-10 w-36 h-36 bg-[#00FFD6]/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-start gap-1 sm:gap-2 max-w-[60%]">
          <span className="text-xs sm:text-sm font-bold text-gray-300">
            مسابقات بزرگ
          </span>
          <span className="text-2xl sm:text-3xl font-black text-[#00FFD6] tracking-wide drop-shadow">
            پرند کاپ
          </span>
          <span className="text-[11px] sm:text-xs text-cyan-200/80 mt-1">
            ثبت‌نام و رزرو مستقیم بلیت
          </span>
        </div>

        <div className="relative z-10 flex items-center justify-end gap-1 sm:gap-2 pointer-events-none">
          <img
            src="/assets/trophy.png"
            alt="کاپ مسابقات"
            className="w-12 h-12 sm:w-16 sm:h-16 object-contain drop-shadow-lg"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <img
            src="/assets/gamepad.png"
            alt="دسته بازی"
            className="w-14 h-14 sm:w-20 sm:h-20 object-contain drop-shadow-lg"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      </div>

      {/* مودال تکمیل اطلاعات */}
      <CompleteProfileModal
        isOpen={showProfileModal}
        onClose={closeProfileModal}
      />
    </div>
  );
}

export default Home_holder;
