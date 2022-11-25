import React from "react";
import { GoLocation } from "react-icons/go";

const CategoriesPageCard = ({ product, setSelectedProduct }) => {
  const {
    name,
    location,
    resellPrice,
    originalPrice,
    yearsOfUse,
    postDate,
    sellerName,
    image,
  } = product;
  return (
    <div>
      <div className="card card-compact rounded-lg bg-base-100 shadow-xl">
        <figure className="h-64">
          <img src={image} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {name?.length > 30 ? name.slice(0, 30) + "..." : name}
          </h2>
          <div className="flex flex-row-reverse justify-between">
            <p className="flex items-center justify-end text-base">
              <GoLocation className="mr-2 "></GoLocation> {location}
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
          <p className="text-base">Seller : {sellerName}</p>
          <div className="flex justify-between items-center">
            <p className="text-base">Post Time : {postDate}</p>
            <button className="btn btn-xs">Report</button>
          </div>
          <div className="card-actions justify-end">
            <label
              htmlFor="booking-modal"
              onClick={() => setSelectedProduct(product)}
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
