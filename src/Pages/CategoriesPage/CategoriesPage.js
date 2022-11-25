import React from "react";
import { useLoaderData } from "react-router-dom";
import CategoriesPageCard from "./CategoriesPageCard";

const CategoriesPage = () => {
  const products = useLoaderData();
  return (
    <div className="container mx-auto my-16 lg:px-8 min-h-[80vh] grid grid-cols-3 gap-10">
      {products?.map((product) => (
        <CategoriesPageCard key={product._id} product={product}></CategoriesPageCard>
      ))}
    </div>
  );
};

export default CategoriesPage;
