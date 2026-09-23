import React from "react";
import Layout from "../../../components/layout/Layout";
import Payment_holder from "../components/payment/Payment_holder";

export default function Payment() {
  return (
    <Layout customTitle="پیش‌فاکتور و پرداخت" hideNav={false}>
      <Payment_holder />
    </Layout>
  );
}
