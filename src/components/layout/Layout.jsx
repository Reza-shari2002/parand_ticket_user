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
        <header className="sticky top-0 h-16 flex items-center justify-between px-6 border-b border-gray-100 bg-white z-20 shadow-sm">
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
        <main className={`flex-1 ${hideNav ? "pb-8" : "pb-24"}`}>
          {children}
        </main>

        {/* Bottom Navigation (فقط در صورتی که hideNav برابر false باشد نمایش داده می‌شود) */}
        {!hideNav && (
          <nav className="fixed bottom-0 w-full max-w-[430px] h-20 bg-white border-t border-gray-100 flex items-center z-30 shadow-lg">
            <div className="flex flex-1 justify-around items-center h-full">
              <Link
                to="/home"
                className={`flex flex-col items-center gap-1 ${
                  isActive("/home") ? "text-[#8B9EFF]" : "text-gray-400"
                }`}
              >
                <Home size={22} />
                <span className="text-[10px] font-bold">خانه</span>
              </Link>

              <Link
                to="/my-tickets"
                className={`flex flex-col items-center gap-1 ${
                  isActive("/my-tickets") ? "text-[#8B9EFF]" : "text-gray-400"
                }`}
              >
                <Ticket size={22} />
                <span className="text-[10px] font-bold">بلیط‌های من</span>
              </Link>
            </div>

            <div className="relative w-20 flex justify-center h-full">
              <div className="absolute -top-0">
                <button className="pointer-events-auto flex h-[64px] w-[64px] items-center justify-center rounded-full border-2 border-[#ef9f43] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.18)] transition-transform duration-200 active:scale-95">
                  <svg
                    viewBox="0 0 75 45"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-11"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M27.8074 22.3636C27.4242 22.205 27.0114 22.1264 26.5955 22.1327L7.54095 22.8254C7.43688 22.8278 7.33463 22.8527 7.24152 22.8983C7.14841 22.9439 7.06672 23.0091 7.00231 23.0892C6.09335 24.3756 11.0421 26.8825 14.072 27.5092C15.284 27.7731 21.1417 28.0699 26.9658 28.1029C27.6273 28.102 28.2664 27.8684 28.7669 27.4446C29.2674 27.0208 29.5959 26.4351 29.6927 25.794C29.7608 25.3179 29.7174 24.8329 29.5657 24.3757C29.4141 23.9185 29.1582 23.5011 28.8174 23.1552C28.5289 22.8372 28.1874 22.5696 27.8074 22.3636Z"
                      fill="#F7A299"
                    />

                    <path
                      d="M25.4845 29.917L12.1194 30.4118C12.0154 30.4142 11.9131 30.4391 11.82 30.4847C11.7269 30.5304 11.6452 30.5956 11.5808 30.6757C10.6718 31.9621 15.6543 34.4689 18.6505 35.0956C19.4248 35.2606 22.118 35.4255 25.4509 35.5574C26.1581 35.5881 26.8513 35.3577 27.3936 34.9119C27.9358 34.4661 28.2877 33.8372 28.3797 33.1495C28.4439 32.7443 28.4165 32.3302 28.2995 31.9365C28.1826 31.5427 27.9789 31.1789 27.7028 30.8707C27.4267 30.5624 27.085 30.3173 26.7017 30.1525C26.3185 29.9878 25.903 29.9074 25.4845 29.917Z"
                      fill="#F5C082"
                    />

                    <path
                      d="M65.0412 2.11102C58.8805 -1.78117 44.3707 -1.31939 38.0753 12.3693C37.3949 13.8378 36.8102 15.3471 36.3247 16.8882C36.2999 16.9671 36.254 17.0381 36.1917 17.0937C36.1293 17.1493 36.053 17.1875 35.9704 17.2043C35.8879 17.2211 35.8023 17.216 35.7225 17.1894C35.6427 17.1628 35.5717 17.1157 35.5168 17.0531C34.8917 16.3497 34.166 15.7386 33.3622 15.2389C31.6237 14.1642 29.5918 13.6349 27.5381 13.7216L0.639585 14.6782C0.53551 14.6806 0.433265 14.7055 0.340152 14.7511C0.247039 14.7968 0.165357 14.862 0.100941 14.9421C-0.808021 16.2285 4.14077 18.7353 7.17064 19.362C8.82024 19.7249 18.9871 20.1537 26.0568 19.8568C26.9554 19.8189 27.8499 19.994 28.6646 20.3672C29.4793 20.7405 30.19 21.3009 30.7363 22.0008C31.1925 22.5687 31.5286 23.22 31.7251 23.9166C31.9217 24.6131 31.9746 25.3411 31.8809 26.0579C31.7799 26.7176 31.6789 27.3773 31.5443 28.037L31.2413 29.7192C30.8373 31.8303 30.4333 33.9413 30.366 35.6895C30.366 36.1183 30.366 36.5801 30.3997 36.9759C30.8036 40.6702 33.5642 41.033 34.8435 41C34.966 41.0077 35.0877 40.9765 35.1908 40.9112C35.2938 40.8459 35.3727 40.7498 35.4158 40.6372H35.4494C35.4494 40.5712 39.1526 32.0941 43.9668 29.2574C48.7809 26.4208 50.5315 27.0805 57.9715 25.7941C60.18 25.4052 62.2864 24.5859 64.1658 23.3847C66.0452 22.1836 67.6594 20.625 68.9127 18.8013C72.7505 11.8415 71.2019 6.00322 65.0412 2.11102ZM64.1322 16.0306H64.0986C62.4034 18.3271 59.8724 19.8977 57.0289 20.4175C55.0763 20.7474 53.5613 20.9453 52.2147 21.1102C48.3769 21.572 45.6163 21.9348 41.1052 24.5736C41.0264 24.6145 40.9379 24.6342 40.8488 24.6307C40.7597 24.6272 40.6731 24.6007 40.5978 24.5538C40.5226 24.5068 40.4613 24.4412 40.4204 24.3636C40.3794 24.286 40.3602 24.1991 40.3646 24.1118C40.8053 20.8194 41.7353 17.6078 43.1251 14.5792C47.2996 5.50845 55.8169 4.45294 60.4964 5.97024C61.0277 6.14132 61.5362 6.37386 62.0113 6.66292C63.8629 7.81738 64.9739 9.13677 65.3105 10.5221C65.6472 11.9075 64.9402 14.4803 64.1322 16.0306Z"
                      fill="#F79520"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex flex-1 justify-around items-center h-full">
              <Link
                to="/info"
                className={`flex flex-col items-center gap-1 ${
                  isActive("/info") ? "text-[#8B9EFF]" : "text-gray-400"
                }`}
              >
                <Info size={22} />
                <span className="text-[10px] font-bold">اطلاعات</span>
              </Link>

              <Link
                to="/Myaccount"
                className={`flex flex-col items-center gap-1 ${
                  isActive("/Myaccount") ? "text-[#8B9EFF]" : "text-gray-400"
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
