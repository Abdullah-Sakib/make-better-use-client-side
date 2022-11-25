import { useQuery } from "@tanstack/react-query";
import React from "react";

const MyOrders = () => {
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["myorders"],
    queryFn: () =>
      fetch(`http://localhost:5000/bookedProducts`, {
        method: "GET",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
  });

  const { productImage, productName, productPrice } = orders;

  // console.log(productImage, productName, productPrice);
  return (
    <div>
      <div className="grid grid-cols-3 gap-10">
        {orders?.map((order) => (
          <div
            key={order._id}
            className="card card-compact rounded-lg bg-base-100 shadow-xl"
          >
            <figure className="h-44">
              <img src={order.productImage} alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {order?.productName?.length > 30
                  ? order?.productName.slice(0, 30) + "..."
                  : order?.productName}
              </h2>
              <p className="text-base">
                Price : <span className="font-bold">${order.productPrice}</span>
              </p>

              <div className="card-actions justify-end">
                <label htmlFor="booking-modal" className="btn btn-sm px-5 btn-primary">
                  Pay
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
