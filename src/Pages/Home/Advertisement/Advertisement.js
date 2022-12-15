import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { GoLocation } from "react-icons/go";
import { MdVerified } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthProvider/AuthProvider";

const Advertisement = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["advertisedProducts"],
    queryFn: () =>
      fetch(`https://assignment-12-server-side-gamma.vercel.app/advertisedProducts`).then((res) =>
        res.json()
      ),
  });

  const unsoldProducts = products.filter(product => !product?.sold);

  console.log(unsoldProducts);

  if (unsoldProducts.length === 0) {
    return;
  }

  if (isLoading) {
    return;
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

  const handleReport = (product) => {
    const agree = window.confirm(
      "Are you sure you want to report this product?"
    );
    if (!agree) {
      return;
    }
    const reportedItem = {
      productId: product?._id,
      name: product?.name,
      location: product?.location,
      resellPrice: product?.resellPrice,
      originalPrice: product?.originalPrice,
      yearsOfUse: product?.yearsOfUse,
      postDate: product?.postDate,
      sellerName: product?.sellerName,
      image: product?.image,
      verifiedSeller: product?.verifiedSeller,
    };

    fetch("https://assignment-12-server-side-gamma.vercel.app/reportedItems", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(reportedItem),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("This product has been roported to Admin.");
        }
      });
  };

  const bookingCheck = product => {
    if (user) {
      setSelectedProduct(product);
    } else {
      navigate("/login" );
    }
  };

  return (
    <div className="px-4 py-10 md:pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8  md:text-start">
      <h2 className="text-4xl font-extrabold leading-none mb-7 text-center md:text-start">
        Advertised products
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {unsoldProducts?.map((product) => (
          <div
            key={product?._id}
            className="card card-compact rounded-lg bg-base-100 shadow-xl"
          >
            <figure className="h-52">
              <img src={product.image} alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {product.name?.length > 30
                  ? product.name.slice(0, 30) + "..."
                  : product.name}
              </h2>
              <div className="flex flex-row-reverse justify-between">
                <p className="flex items-center justify-end text-base">
                  <GoLocation className="mr-2 "></GoLocation> {product.location}
                </p>
                <p className="text-base">
                  Resell Price :{" "}
                  <span className="font-bold">${product.resellPrice}</span>
                </p>
              </div>
              <p className="text-base">
                Original Price :{" "}
                <span className="font-bold">${product.originalPrice}</span>
              </p>
              <p className="text-base">
                Years of use :{" "}
                <span className="font-bold">{product.yearsOfUse}</span>
              </p>
              <p className="text-base">
            Seller :{" "}
            {!product?.verifiedSeller ? (
              <span>{product?.sellerName}</span>
            ) : (
              <span className="">
                {product?.sellerName}{" "}
                <MdVerified className="text-blue-500 ml-1 inline"></MdVerified>
              </span>
            )}{" "}
          </p>
              <div className="flex justify-between items-center">
                <p className="text-base">Post Time : {product.postDate}</p>
                <button
                  onClick={() => handleReport(product)}
                  className="btn btn-xs"
                >
                  Report
                </button>
              </div>
              <div className="card-actions justify-end">
                <label
                  htmlFor="booking-modal"
                  onClick={() => bookingCheck(product)}
                  className="btn btn-primary"
                >
                  Book Now
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* booking modal  */}
      <div>
        {selectedProduct && (
          <div>
            <input
              type="checkbox"
              id="booking-modal"
              className="modal-toggle"
            />
            <div className="modal">
              <div className="modal-box relative py-6 px-5">
                <label
                  htmlFor="booking-modal"
                  className="btn btn-sm btn-circle absolute right-2 top-2"
                >
                  ✕
                </label>
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
    </div>
  );
};

export default Advertisement;
