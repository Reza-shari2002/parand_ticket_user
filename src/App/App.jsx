import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Home from "../modules/home/pages/Home";
import Myaccount from "../modules/profile/pages/Myaccount";
import Editprofile from "../modules/profile/pages/Editprofile";
import SelectTicket from "../modules/ticket/pages/SelectTicket";
import ReservetTicket from "../modules/ticket/pages/ReserveTicket";
import Contact_us from "../modules/Contact-us/pages/Contact_us";
import Login from "../modules/auth/pages/Login";
import Verify_otp from "../modules/auth/pages/Verify_otp.";
import Formcontext from "../context/Formcontext";
import NotFound from "../modules/not-found/pages/NotFound";
import Payment from "../modules/ticket/pages/Payment";
import PaymentResult from "../modules/ticket/pages/PaymentResult";
import Myticket from "../modules/ticket/pages/Myticket";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/home" replace />, // ریدایرکت از روت اصلی به /home
    },
    ,
    { path: "/home", element: <Home></Home> },
    { path: "/Myaccount", element: <Myaccount></Myaccount> },
    { path: "/Editprofile", element: <Editprofile></Editprofile> },
    { path: "/Selectticket", element: <SelectTicket></SelectTicket> },
    { path: "/Reserve", element: <ReservetTicket></ReservetTicket> },
    { path: "/payment/result", element: <PaymentResult></PaymentResult> },
    { path: "/payment", element: <Payment></Payment> },
    { path: "/my-tickets", element: <Myticket></Myticket> },
    { path: "/login", element: <Login></Login> },
    { path: "/verify", element: <Verify_otp></Verify_otp> },

    { path: "/Contact-us", element: <Contact_us></Contact_us> },

    { path: "*", element: <NotFound /> },
  ]);
  return (
    <>
      <Formcontext>
        <RouterProvider router={router}></RouterProvider>
      </Formcontext>
    </>
  );
}

export default App;
