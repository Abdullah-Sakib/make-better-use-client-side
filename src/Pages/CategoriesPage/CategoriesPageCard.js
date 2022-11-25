import React from "react";

const CategoriesPageCard = ({ product }) => {
  console.log(product);
  return (
    <div>
      <div className="card card-compact rounded-lg bg-base-100 shadow-xl">
        <figure className="h-52">
          <img
            src={product?.image}
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{product?.name}</h2>
          <p>{product?.description.length > 100 ? product.description.slice(0, 100) + '...' : product?.description}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPageCard;
