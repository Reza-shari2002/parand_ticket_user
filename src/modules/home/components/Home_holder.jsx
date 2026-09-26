import React from "react";
import {Link} from "react-router-dom"
import useHome from "../hooks/useHome";
import CompleteProfileModal from "../../profile/components/CompleteProfileModal";
import LoadingScreen from "../../../components/common/LoadingScreen";

function Home_holder() {
  const { isLoading, showProfileModal, goToParandCup, closeProfileModal } =
    useHome();

  if (isLoading) return <LoadingScreen />;

  const emptySlots = Array.from({ length: 5 });

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
              src="/daste_white_bg.png"
              alt="پرند کاپ"
              className="w-24 h-24 sm:w-14 sm:h-14 object-contain relative z-10"
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
      {/* بنر کلیک‌خور برای هدایت مستقیم به انتخاب بلیط */}
      <div className="w-full px-4 pt-3 pb-2">
        <Link
          to="/Selectticket"
          className="block relative w-full aspect-[21/9] sm:aspect-[2.4/1] rounded-3xl overflow-hidden shadow-md shadow-blue-500/10 border border-gray-100/80 bg-gray-50 active:scale-[0.98] transition-transform duration-150"
        >
          <img
            src="/parandcup_banner.png"
            alt="بنر مسابقات پرند کاپ"
            className="w-full h-full object-cover select-none pointer-events-none"
          />
        </Link>
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
