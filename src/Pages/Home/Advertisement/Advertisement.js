import { useQuery } from "@tanstack/react-query";
import React from "react";
import { GoLocation } from "react-icons/go";

const Advertisement = () => {
  const {
    data: products = [],
    isLoading,
  } = useQuery({
    queryKey: ["sellerProducts"],
    queryFn: () =>
      fetch(`http://localhost:5000/advertisedProducts`).then((res) =>
        res.json()
      ),
  });

  if(products.length === 0){
    return
  }

  if(isLoading){
    return
  }

  return (
    <div className="px-4 lg:px-24 mb-22 mt-24">
        <h2 className="text-3xl font-bold mb-5">Advertised products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

        {products?.map((product) => (
          <div key={product?._id} className="card card-compact rounded-lg bg-base-100 shadow-xl">
            <figure className="h-52">
              <img src={product.image} alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {product.name?.length > 30 ? product.name.slice(0, 30) + "..." : product.name}
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
                Years of use : <span className="font-bold">{product.yearsOfUse}</span>
              </p>
              <p className="text-base">Seller : {product.sellerName}</p>
              <div className="flex justify-between items-center">
                <p className="text-base">Post Time : {product.postDate}</p>
                <button className="btn btn-xs">Report</button>
              </div>
              <div className="card-actions justify-end">
                <label
                  htmlFor="booking-modal"
                  // onClick={() => setSelectedProduct(product)}
                  className="btn btn-primary"
                >
                  Book Now
                </label>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Advertisement;
