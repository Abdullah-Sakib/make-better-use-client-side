import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

const MyOrders = () => {
  const { data:orders = [], isLoading } = useQuery({
    queryKey: ["myorders"],
    queryFn: () =>
      fetch(`http://localhost:5000/bookedProducts`, {
        method: "GET",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
  });

  return (
    <div>
      <h2>My orders</h2>
      {orders?.map((order) => (
        <li key={order._id}>{order.userName}</li>
      ))}
    </div>
  );
};

export default MyOrders;
