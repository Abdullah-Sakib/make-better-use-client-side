import React from "react";

const MyProducts = () => {
  const handleAddCategory = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const image = event.target.image.value;
    
    const data = {
      name,
      image
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
      <h2 className="text-2xl mb-2">My products</h2>
      <form onSubmit={handleAddCategory} className="flex flex-col">
        <input
          type="text"
          name="name"
          placeholder="category name"
          className="input input-bordered w-full max-w-xs mb-3"
        />
        <input
          type="text"
          name="image"
          placeholder="category image"
          className="input input-bordered w-full max-w-xs mb-3"
        />
        <button type="submit" className="btn btn-primary max-w-xs">Add</button>
      </form>
    </div>
  );
};

export default MyProducts;
