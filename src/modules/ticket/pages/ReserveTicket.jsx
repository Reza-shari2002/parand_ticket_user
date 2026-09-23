import React from "react";
import Layout from "../../../components/layout/Layout";
import Reserve_holder from "../components/reserveTicket/Reserve_holder";

function ReservetTicket() {
  return (
    <Layout hideNav={true} customTitle="انتخاب تعداد نفرات">
      <Reserve_holder></Reserve_holder>
    </Layout>
  );
}

export default ReservetTicket;