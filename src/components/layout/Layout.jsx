import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Ticket, User, Info } from "lucide-react";

function Layout({ children }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    // فقط dir="rtl" اضافه شد، بدون دست زدن به فونت
    <div dir="rtl" className="min-h-screen w-full bg-gray-100 flex justify-center font-vazir text-right">
      {/* کانتینر اصلی موبایل */}
      <div className="w-full max-w-[430px] min-h-screen bg-[#fafafa] shadow-2xl relative flex flex-col">
        
        {/* Header - هدر چسبیده به بالا */}
        <header className="sticky top-0 h-16 flex items-center justify-between px-6 border-b border-gray-100 bg-white z-20">
          <div className="w-10"></div> 
          <span className="text-xl font-black text-gray-800">پرند بلیط</span>
          <div className="w-10"></div>
        </header>

        {/* Content Area */}
        <main className="flex-1 pb-24">
          {children}
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 w-full max-w-[430px] h-20 bg-white border-t border-gray-100 flex items-center z-30">
          {/* سمت راست در RTL: خانه و بلیت‌ها */}
          <div className="flex flex-1 justify-around items-center h-full">
            <Link to="/home" className={`flex flex-col items-center gap-1 ${isActive("/home") ? "text-cyan-500" : "text-gray-400"}`}>
              <Home size={22} />
              <span className="text-[10px] font-bold">خانه</span>
            </Link>
            <Link to="/tickets" className={`flex flex-col items-center gap-1 ${isActive("/tickets") ? "text-cyan-500" : "text-gray-400"}`}>
              <Ticket size={22} />
              <span className="text-[10px] font-bold">بلیط‌های من</span>
            </Link>
          </div>

          {/* دکمه وسط */}
          <div className="relative w-20 flex justify-center h-full">
            <div className="absolute -top-7">
              <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#00FFD6] shadow-lg shadow-cyan-400/40 border-[6px] border-[#00FFD6]">
                <span className="text-2xl">⚡</span> 
              </button>
            </div>
          </div>

          {/* سمت چپ در RTL: اطلاعات و حساب من */}
          <div className="flex flex-1 justify-around items-center h-full">
            <Link to="/info" className={`flex flex-col items-center gap-1 ${isActive("/info") ? "text-cyan-500" : "text-gray-400"}`}>
              <Info size={22} />
              <span className="text-[10px] font-bold">اطلاعات</span>
            </Link>
            <Link to="/Myaccount" className={`flex flex-col items-center gap-1 ${isActive("/profile") ? "text-cyan-500" : "text-gray-400"}`}>
              <User size={22} />
              <span className="text-[10px] font-bold">حساب من</span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Layout;
