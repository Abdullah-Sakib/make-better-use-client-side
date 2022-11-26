import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import CategoriesPageCard from "./CategoriesPageCard";

const CategoriesPage = () => {
  const { user } = useContext(AuthContext);
  const products = useLoaderData();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const userName = form.username.value;
    const userEmail = form.userEmail.value;
    const productName = form.productName.value;
    const productPrice = form.productPrice.value;
    const userPhoneNumber = form.userPhoneNumber.value;
    const meetingLocation = form.meetingLocation.value;

    const bookingData = {
      userName,
      userEmail,
      productName,
      productPrice,
      userPhoneNumber,
      meetingLocation,
      productImage: selectedProduct?.image,
      productId: selectedProduct?._id,
    };

    fetch(`http://localhost:5000/bookedProducts`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(bookingData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success(
            "Booking successfull. Please check My Orders and complete your payment."
          );
        }
      });

    setSelectedProduct(null);
  };

  return (
    <div className="container mx-auto my-16 lg:px-8 min-h-[80vh] grid grid-cols-3 gap-10">
      {products?.map((product) => (
        <CategoriesPageCard
          key={product._id}
          product={product}
          setSelectedProduct={setSelectedProduct}
        ></CategoriesPageCard>
      ))}
      {selectedProduct && (
        <div>
          <input type="checkbox" id="booking-modal" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box py-6 px-5">
              <form onSubmit={handleBooking}>
                <label className="label pb-1 pt-1">User name</label>
                <input
                  type="text"
                  readOnly
                  name="username"
                  placeholder="Type here"
                  defaultValue={user?.displayName}
                  className="input input-bordered w-full "
                />
                <label className="label pb-1 pt-1">User email</label>
                <input
                  type="text"
                  readOnly
                  name="userEmail"
                  placeholder="Type here"
                  defaultValue={user?.email}
                  className="input input-bordered w-full"
                />
                <label className="label pb-1 pt-1">Product name</label>
                <input
                  type="text"
                  readOnly
                  name="productName"
                  placeholder="Type here"
                  defaultValue={selectedProduct?.name}
                  className="input input-bordered w-full"
                />
                <label className="label pb-1 pt-1">Product price</label>
                <input
                  type="text"
                  readOnly
                  name="productPrice"
                  placeholder="product price"
                  defaultValue={selectedProduct?.resellPrice}
                  className="input input-bordered w-full"
                />
                <label className="label pb-1 pt-1">Phone number</label>
                <input
                  type="text"
                  name="userPhoneNumber"
                  placeholder="your phone number"
                  className="input input-bordered w-full"
                  required
                />
                <label className="label pb-1 pt-1">Meeting location</label>
                <input
                  type="text"
                  name="meetingLocation"
                  placeholder="meeting location"
                  className="input input-bordered w-full mb-3"
                  required
                />
                <button
                  htmlFor="booking-modal"
                  className="btn btn-primary w-full"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
