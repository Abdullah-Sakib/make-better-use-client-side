import React from "react";
import toast from "react-hot-toast";
import { GoLocation } from "react-icons/go";
import { MdVerified } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const CategoriesPageCard = ({
  product,
  setSelectedProduct,
  user,
  location,
}) => {
  const navigate = useNavigate();
  const {
    name,
    resellPrice,
    originalPrice,
    yearsOfUse,
    postDate,
    sellerName,
    image,
    verifiedSeller,
    _id,
  } = product;

  const handleReport = () => {
    const agree = window.confirm(
      "Are you sure you want to report this product?"
    );
    if (!agree) {
      return;
    }
    const reportedItem = {
      productId: _id,
      name,
      location: product?.location,
      resellPrice,
      originalPrice,
      yearsOfUse,
      postDate,
      sellerName,
      image,
      verifiedSeller,
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

  const bookingCheck = () => {
    if (user) {
      setSelectedProduct(product);
    } else {
      navigate("/login", { state: { from: location } });
    }
  };

  return (
    <div>
      <div className="card card-compact rounded-lg bg-base-100 shadow-xl">
        <figure className="h-56">
          <img src={image} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {name?.length > 29 ? name.slice(0, 29) + "..." : name}
          </h2>
          <div className="flex flex-row-reverse justify-between">
            <p className="flex items-center justify-end text-base">
              <GoLocation className="mr-2 "></GoLocation> {product?.location}
            </p>
            <p className="text-base">
              Resell Price : <span className="font-bold">${resellPrice}</span>
            </p>
          </div>
          <p className="text-base">
            Original Price : <span className="font-bold">${originalPrice}</span>
          </p>
          <p className="text-base">
            Years of use : <span className="font-bold">{yearsOfUse}</span>
          </p>
          <p className="text-base">
            Seller :{" "}
            {!verifiedSeller ? (
              <span>{sellerName}</span>
            ) : (
              <span className="">
                {sellerName}{" "}
                <MdVerified className="text-blue-500 ml-1 inline"></MdVerified>
              </span>
            )}{" "}
          </p>
          <div className="flex justify-between items-center">
            <p className="text-base">Post Time : {postDate}</p>
            <button onClick={handleReport} className="btn btn-xs">
              Report
            </button>
          </div>
          <div className="card-actions justify-end">
            <label
              htmlFor="booking-modal"
              onClick={bookingCheck}
              className="btn btn-primary"
            >
              Book Now
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPageCard;
