import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";

const MyProducts = () => {
  const {
    data: products = [],
    refetch,
  } = useQuery({
    queryKey: ["sellerProducts"],
    queryFn: () =>
      fetch(`http://localhost:5000/sellerProducts`, {
        method: "GET",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
  });

  console.log(products);

  const handleDeleteProduct = (id) => {
    const agree = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (agree) {
      fetch(`http://localhost:5000/products/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            toast.success("Your product deleted successfully");
            refetch();
          }
        });
    }
  };

  const handleAdvertisement = (id) => {
    const agree = window.confirm(
      "Are you sure you want to advertise this product?"
    );
    if (agree) {
      fetch(`http://localhost:5000/products/${id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if(data.modifiedCount > 0){
            toast.success("Your product has been advertised");
          }
        });
    }
  };

  return (
    <div>
      <h2 className="text-2xl mb-2">My products</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Image</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
              <th>Advertisement</th>
            </tr>
          </thead>

          <tbody>
            {products?.map((product, i) => (
              <tr key={product._id}>
                <th>{i + 1}</th>
                <th>
                  <div className="avatar">
                    <div className="w-24 rounded">
                      <img src={product?.image} alt="" />
                    </div>
                  </div>
                </th>
                <td className="font-semibold">${product?.resellPrice}</td>
                <td className="font-semibold text-success">
                  {product?.sold ? (
                    <span className="text-error">Sold</span>
                  ) : (
                    "Available"
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="btn btn-sm btn-error text-white"
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    disabled={product?.sold || product?.advertise}
                    onClick={() => handleAdvertisement(product._id)}
                    className="btn btn-sm btn-success text-white"
                  >
                    Advertise
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProducts;
