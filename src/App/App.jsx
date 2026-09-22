import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Home from "../modules/home/pages/Home";
import Myaccount from "../modules/profile/pages/Myaccount"
import Editprofile from "../modules/profile/pages/Editprofile"
import SelectTicket from "../modules/ticket/pages/SelectTicket";
import Documents from "../modules/third-party-insurance/pages/Documents";
import Basic_information from "../modules/third-party-insurance/pages/Basic_information";
import Discount_transfer from "../modules/third-party-insurance/pages/Discount_transfer";
import Discount_transfer_family from "../modules/third-party-insurance/pages/Discount_transfer_family";
import Confirm from "../modules/third-party-insurance/pages/Confirm";
import Car_document from "../modules/third-party-insurance/pages/Car_document";
import PayMent from "../modules/third-party-insurance/pages/PayMent";
import Contact_us from "../modules/Contact-us/pages/Contact_us";
import Owner_policyholder from "../modules/third-party-insurance/pages/Owner_policyholder";
import Login from "../modules/auth/pages/Login";
import Verify_otp from "../modules/auth/pages/Verify_otp.";
import Formcontext from "../context/Formcontext";
import NotFound from "../modules/not-found/pages/NotFound";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/home" replace />, // ریدایرکت از روت اصلی به /home
    },
    ,
    { path: "/home", element: <Home></Home> },
    {path:"/Myaccount" , element : <Myaccount></Myaccount>} , 
    {path:"/Editprofile" , element:<Editprofile></Editprofile>} ,
    {path:"/Selectticket" , element:<SelectTicket></SelectTicket>},
    {path:"/login" , element:<Login></Login>} ,
    {path:"/verify" , element:<Verify_otp></Verify_otp>}  , 
    { path: "/documents", element: <Documents /> },
    {
      path: "/basic-information",
      element: <Basic_information></Basic_information>,
    },
    {
      path: "/Discount_transfer",
      element: <Discount_transfer></Discount_transfer>,
    },
    {
      path: "/Discount-transfer-family",
      element: <Discount_transfer_family></Discount_transfer_family>,
    },
    { path: "/Payment-type", element: <PayMent /> },
    { path: "/Confirm", element: <Confirm></Confirm> },
    { path: "/Car-document", element: <Car_document></Car_document> },
    {
      path: "/Owner-policyholder",
      element: <Owner_policyholder></Owner_policyholder>,
    },
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
