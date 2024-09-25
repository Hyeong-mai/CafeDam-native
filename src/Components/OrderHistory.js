import { useState } from "react";
import OrderHistoryIcon from "./OrderHistoryIcon";
import OrderHistoryLayout from "./OrderHistoryLayout";

const OrderHistory = ({ orderHistory }) => {
  const [seeModal, setSeeModal] = useState(false);
  return (
    <>
      <OrderHistoryIcon setSeeModal={setSeeModal} />
      <OrderHistoryLayout
        orderHistory={orderHistory}
        seeModal={seeModal}
        setSeeModal={setSeeModal}
      />
    </>
  );
};
export default OrderHistory;
