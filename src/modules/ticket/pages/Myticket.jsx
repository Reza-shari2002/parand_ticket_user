import React from "react";
import Layout from "../../../components/layout/Layout";
import MyTickets_holder from "../components/Mytickets/MyTickets_holder";

export default function Myticket() {
  return (
    <Layout customTitle="بلیط های من" hideNav={false}>
      <MyTickets_holder></MyTickets_holder>
    </Layout>
  );
}
