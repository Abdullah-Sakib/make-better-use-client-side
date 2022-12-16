import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useLoaderData, useLocation, useNavigation } from "react-router-dom";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import CategoriesPageCard from "./CategoriesPageCard";

const CategoriesPage = () => {
  const { user } = useContext(AuthContext);
  const products = useLoaderData();
  const unsoldProducts = products.filter((product) => !product?.sold);
  const navigation = useNavigation();
  const location = useLocation();
  const [selectedProduct, setSelectedProduct] = useState(null);

  console.log(selectedProduct);

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
    <div className="mx-auto my-16 lg:px-8 min-h-[80vh] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-5 ">
      {unsoldProducts?.map((product) => (
        <CategoriesPageCard
          key={product._id}
          product={product}
          setSelectedProduct={setSelectedProduct}
          user={user}
          location={location}
        ></CategoriesPageCard>
      ))}
      {selectedProduct && (
        <div>
          <input type="checkbox" id="booking-modal" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box relative pt-10 px-5 pb-5">
              <label
                htmlFor="booking-modal"
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              <form onSubmit={handleBooking}>
                <input
                  type="text"
                  readOnly
                  name="username"
                  placeholder="Type here"
                  value={user?.displayName}
                  className="input input-bordered w-full block px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
                <input
                  type="text"
                  readOnly
                  name="userEmail"
                  placeholder="Type here"
                  value={user?.email}
                  className="input input-bordered w-full block px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />

                <input
                  type="text"
                  readOnly
                  name="productName"
                  placeholder="Type here"
                  value={`Name: ${selectedProduct?.name}`}
                  className="input input-bordered w-full block px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
                <input
                  type="text"
                  readOnly
                  name="productPrice"
                  placeholder="product price"
                  value={`Price: ${selectedProduct?.resellPrice}`}
                  className="input input-bordered w-full block px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />

                <input
                  type="text"
                  name="userPhoneNumber"
                  placeholder="your phone number"
                  className="input input-bordered w-full block px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  required
                />

                <input
                  type="text"
                  name="meetingLocation"
                  placeholder="meeting location"
                  className="input input-bordered w-full block px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring "
                  required
                />
                <button
                  htmlFor="booking-modal"
                  className="btn btn-primary w-full mt-4"
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
