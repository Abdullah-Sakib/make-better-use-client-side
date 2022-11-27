import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useLoaderData, useNavigation } from "react-router-dom";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import CategoriesPageCard from "./CategoriesPageCard";

const CategoriesPage = () => {
  const { user } = useContext(AuthContext);
  const products = useLoaderData();
  const navigation = useNavigation();
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (navigation.state === "loading") {
    return <LoadingSpinner></LoadingSpinner>;
  }

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

    fetch(`https://assignment-12-server-side-gamma.vercel.app/bookedProducts`, {
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
    <div className="container mx-auto my-16 lg:px-8 min-h-[80vh] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-5 ">
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
            <div className="modal-box relative py-6 px-5">
            <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
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
                  Book
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
