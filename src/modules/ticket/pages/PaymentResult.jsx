import React from "react";
import Layout from "../../../components/layout/Layout";
import PaymentResult_holder from "../components/PaymentResult/PaymentResult_holder";

export default function PaymentResult() {
  return (
    <Layout customTitle="نتیجه پرداخت" hideNav={false}>
      <PaymentResult_holder />
    </Layout>
  );
}
