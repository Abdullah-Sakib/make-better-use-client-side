import axios from "axios";
import { format } from "date-fns/esm";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../Contexts/AuthProvider/AuthProvider";

const AddProducts = () => {
  const { user } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    axios
      .get("http://localhost:5000/categories", {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((result) => {
        setCategories(result.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleAddProduct = (data) => {
    setProcessing(true);
    data.sellerName = user.displayName;
    data.sellerEmail = user.email;
    data.postDate = format(new Date(), "PP");

    const productImage = data.image[0];
    const formData = new FormData();
    formData.append("image", productImage);

    fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbb_API}`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((imgData) => {
        const img = imgData.data.url;
        data.image = img;
        saveProductInDB(data);
      });
  };

  const saveProductInDB = (data) => {
    fetch("http://localhost:5000/products", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Product Added Successfully.");
          reset();
          setProcessing(false);
          navigate("/dashboard/myproducts");
        }
      });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Add a product</h2>
      <form
        onSubmit={handleSubmit(handleAddProduct)}
        className="flex flex-col md:w-1/2 p-5 bg-base-100 rounded-lg"
      >
        <label className="label font-semibold">Image</label>
        <input
          type="file"
          id="file"
          className="file-input file-input-bordered w-full "
          {...register("image", { required: true })}
        />

        <label className="label font-semibold">Product Name</label>
        <input
          type="text"
          name="productName"
          placeholder="product name"
          className="input input-bordered w-full "
          {...register("name", { required: true })}
        />

        <label className="label font-semibold">Original Price</label>
        <input
          type="number"
          placeholder="original price"
          className="input input-bordered w-full "
          {...register("originalPrice", { required: true })}
        />

        <label className="label font-semibold">Resell Price</label>
        <input
          type="number"
          placeholder="resell price"
          className="input input-bordered w-full "
          {...register("resellPrice", { required: true })}
        />

        <label className="label font-semibold">Years of use</label>
        <input
          type="number"
          placeholder="years of use"
          className="input input-bordered w-full "
          {...register("yearsOfUse", { required: true })}
        />

        <label className="label font-semibold">Product Condition</label>
        <select
          name="condition"
          className="select select-bordered text-base font-normal  w-full mb-3"
          {...register("condition", { required: true })}
          defaultValue={"select product condition"}
        >
          <option disabled value="select product condition">
            select product condition
          </option>
          <option className="text-black" value="excellent">
            Excellent
          </option>
          <option className="text-black" value="good">
            Good
          </option>
          <option className="text-black" value="fair">
            Fair
          </option>
        </select>

        <label className="label font-semibold">Phone Number</label>
        <input
          type="number"
          name="phone number"
          placeholder="phone number"
          className="input input-bordered w-full"
          {...register("number", { required: true })}
        />

        <label className="label font-semibold">Location</label>
        <input
          type="text"
          name="location"
          placeholder="location"
          className="input input-bordered w-full mb-3"
          {...register("location", { required: true })}
        />

        <label className="label font-semibold">
          Select Your Product Category
        </label>
        <select
          name="category"
          className="select select-bordered text-base font-normal  w-full "
          {...register("category", { required: true })}
          defaultValue={"select product category"}
        >
          <option disabled value="select product category">
            select product category
          </option>
          {categories?.map((category) => (
            <option key={category._id} value={category?.name}>
              {category?.name}
            </option>
          ))}
        </select>

        <label className="label font-semibold">Purchase Date</label>
        <input
          type="date"
          name="purchaseYear"
          placeholder="Year of purchase"
          className="input input-bordered w-full "
          {...register("purchaseDate", { required: true })}
        />

        <label className="label font-semibold">Description</label>
        <textarea
          className="textarea textarea-bordered mb-5"
          placeholder="Description"
          {...register("description", { required: true })}
        ></textarea>
        <button type="submit" className="btn btn-primary" disabled={processing}>
          Add
        </button>
        {processing && <progress className="progress w-full"></progress>}
      </form>
    </div>
  );
};

export default AddProducts;
