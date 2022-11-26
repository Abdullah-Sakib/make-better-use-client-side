import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";

const MyOrders = () => {

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["myorders"],
    queryFn: () =>
      fetch(`http://localhost:5000/bookedProducts`, {
        method: "GET",
        headers: {
          authorization: `bearer ${localStorage.getItem('accessToken')}`,
        },
      }).then((res) => {
        if(res.status === 401 || res.status === 403){
          return [];
        }
        return res.json()
      }),
  });


  if(isLoading){
    return
  }


  if (orders.length === 0) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <h2 className="text-2xl font-bold">Please Book Some Products.</h2>
      </div>
    );
  }

  console.log(orders);

  return (
    <div>
      <div className="grid grid-cols-3 gap-10">
        {orders?.map((order) => (
          <div
            key={order?._id}
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
                {order?.paid ? (
                  <span className="text-lg text-success font-bold mr-2">
                    Paid
                  </span>
                ) : (
                  <Link to={`/dashboard/checkout/${order._id}`}>
                    <label
                      htmlFor="booking-modal"
                      className="btn btn-sm px-5 btn-primary"
                    >
                      Pay
                    </label>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
