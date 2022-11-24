import React from "react";

const AddProducts = () => {
  const handleAddCategory = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const image = event.target.image.value;

    const data = {
      name,
      image,
    };

    // fetch('http://localhost:5000/categories', {
    //   method: 'POST',
    //   headers: {
    //     'content-type': 'application/json'
    //   },
    //   body: JSON.stringify(data)
    // })
    // .then(res => res.json())
    // .then(data => console.log(data))
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Add products</h2>
      <form onSubmit={handleAddCategory} className="flex flex-col md:w-1/2">
        <input
          type="text"
          name="productName"
          placeholder="product name"
          className="input input-bordered w-full mb-3"
        />
        <input
          type="text"
          name="price"
          placeholder="price"
          className="input input-bordered w-full mb-3"
        />
        <select name="condition" className="select select-bordered text-base font-normal  w-full mb-3" >
          <option disabled selected >
            select product condition
          </option>
          <option className="text-black" value='excellent'>Excellent</option>
          <option className="text-black" value='good'>Good</option>
          <option className="text-black" value="fair">Fair</option>
        </select>
        <input
          type="number"
          name="phone number"
          placeholder="phone number"
          className="input input-bordered w-full mb-3"
        />
        <input
          type="text"
          name="location"
          placeholder="location"
          className="input input-bordered w-full mb-3"
        />
        <select name="category" className="select select-bordered text-base font-normal  w-full mb-3" >
          <option disabled selected >
            select product category
          </option>
          <option className="text-black" value='excellent'>Excellent</option>
          <option className="text-black" value='good'>Good</option>
          <option className="text-black" value="fair">Fair</option>
        </select>
        <input
          type="date"
          name="purchaseYear"
          placeholder="Year of purchase"
          className="input input-bordered w-full mb-3"
        />
        <textarea className="textarea textarea-bordered mb-3" placeholder="Description"></textarea>
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddProducts;
