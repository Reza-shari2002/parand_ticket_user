import React from "react";
import Layout from "../../../components/layout/Layout";
import SelectTicket_holder from "../components/selectTicket/SelectTicket_holder";

function SelectTicket() {
  return (
    <Layout hideNav={true} customTitle="انتخاب نوع بلیط">
      <SelectTicket_holder />
    </Layout>
  );
}

export default SelectTicket;
