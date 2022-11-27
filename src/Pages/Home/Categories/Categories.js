import axios from "axios";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("https://assignment-12-server-side-gamma.vercel.app/categories")
      .then((result) => {
        setCategories(result.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="">
      <div className="relative px-4 pb-10 pt-8 md:pb-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 text-center md:text-start">
        <h2 className=" mb-4 text-4xl font-extrabold leading-none">Categories</h2>
        
        <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories?.map((category) => (
            <CategoryCard key={category._id} category={category}></CategoryCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
