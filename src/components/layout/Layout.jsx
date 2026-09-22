import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Ticket, User, Info, ChevronRight } from "lucide-react";

function Layout({ children, hideNav = false, customTitle }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  function gotoPrevpage() {
    const path = location.pathname;

    if (path === "/editProfile") {
      navigate("/Myaccount");
    } else if (path === "/Myaccount" || path === "/select-ticket") {
      navigate("/home");
    } else {
      navigate("/home"); // بازگشت هوشمند به صفحه قبل
    }
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen w-full bg-gray-100 flex justify-center font-vazir text-right"
    >
      <div className="w-full max-w-[430px] min-h-screen bg-[#fafafa] shadow-2xl relative flex flex-col">
        {/* Header */}
        <header className="sticky top-0 h-20 flex items-center justify-between px-6 border-b border-gray-100 bg-white z-20 shadow-sm">
          {/* دکمه برگشت */}
          <button
            type="button"
            onClick={gotoPrevpage}
            aria-label="بازگشت"
            className="w-10 h-10 flex items-center justify-center rounded-2xl bg-gray-50 hover:bg-gray-100 text-gray-700 active:scale-95 transition"
          >
            <ChevronRight size={22} />
          </button>

          {/* عنوان هدر */}
          <span className="text-lg font-black text-gray-800">
            {customTitle || "پرند بلیط"}
          </span>

          {/* بالانس هدر */}
          <div className="w-10" />
        </header>

        {/* Content */}
        <main className={`flex-1 ${hideNav ? "pb-8" : "pb-24"}`}>{children}</main>

        {/* Bottom Navigation (فقط در صورتی که hideNav برابر false باشد نمایش داده می‌شود) */}
        {!hideNav && (
          <nav className="fixed bottom-0 w-full max-w-[430px] h-20 bg-white border-t border-gray-100 flex items-center z-30 shadow-lg">
            <div className="flex flex-1 justify-around items-center h-full">
              <Link
                to="/home"
                className={`flex flex-col items-center gap-1 ${
                  isActive("/home") ? "text-cyan-500" : "text-gray-400"
                }`}
              >
                <Home size={22} />
                <span className="text-[10px] font-bold">خانه</span>
              </Link>

              <Link
                to="/tickets"
                className={`flex flex-col items-center gap-1 ${
                  isActive("/tickets") ? "text-cyan-500" : "text-gray-400"
                }`}
              >
                <Ticket size={22} />
                <span className="text-[10px] font-bold">بلیط‌های من</span>
              </Link>
            </div>

            <div className="relative w-20 flex justify-center h-full">
              <div className="absolute -top-7">
                <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#00FFD6] shadow-lg shadow-cyan-400/40 border-[6px] border-[#00FFD6]">
                  <span className="text-2xl">⚡</span>
                </button>
              </div>
            </div>

            <div className="flex flex-1 justify-around items-center h-full">
              <Link
                to="/info"
                className={`flex flex-col items-center gap-1 ${
                  isActive("/info") ? "text-cyan-500" : "text-gray-400"
                }`}
              >
                <Info size={22} />
                <span className="text-[10px] font-bold">اطلاعات</span>
              </Link>

              <Link
                to="/Myaccount"
                className={`flex flex-col items-center gap-1 ${
                  isActive("/Myaccount") ? "text-cyan-500" : "text-gray-400"
                }`}
              >
                <User size={22} />
                <span className="text-[10px] font-bold">حساب من</span>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}

export default Layout;
