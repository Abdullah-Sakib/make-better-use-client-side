import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import LoadingSpinner from "../../../../Components/LoadingSpinner/LoadingSpinner";

const MyProducts = () => {
  const {
    data: products = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["sellerProducts"],
    queryFn: () =>
      fetch(`https://assignment-12-server-side-gamma.vercel.app/sellerProducts`, {
        method: "GET",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
  });

  const handleDeleteProduct = (id) => {
    const agree = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (agree) {
      fetch(`https://assignment-12-server-side-gamma.vercel.app/products/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
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
      fetch(`https://assignment-12-server-side-gamma.vercel.app/products/${id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount > 0) {
            toast.success("Your product has been advertised");
            refetch();
          }
        });
    }
  };

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>
  }

  if (products.length === 0) {
    return (
      <div>
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold">My Porducts</h2>
          <label
            htmlFor="dashboard-drawer"
            className=" drawer-button lg:hidden"
          >
            <BsFillArrowRightSquareFill className="text-3xl"></BsFillArrowRightSquareFill>
          </label>
        </div>
        <div className="min-h-[70vh] flex items-center justify-center">
          <h2 className="text-2xl font-bold">No Products Found!!</h2>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-semibold">My Products</h2>
        <label
          htmlFor="dashboard-drawer"
          className=" drawer-button lg:hidden"
        >
          <BsFillArrowRightSquareFill className="text-3xl"></BsFillArrowRightSquareFill>
        </label>
      </div>
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
