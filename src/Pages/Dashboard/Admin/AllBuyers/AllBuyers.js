import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import LoadingSpinner from "../../../../Components/LoadingSpinner/LoadingSpinner";

const AllBuyers = () => {
  const { data: buyers = [], refetch, isLoading } = useQuery({
    queryKey: ["allsellers"],
    queryFn: () =>
      fetch("https://assignment-12-server-side-gamma.vercel.app/users/user", {
        headers: {
          authorization: `bearer ${localStorage.getItem('accessToken')}`
        }
      }).then((res) => res.json()),
  });
 
  const handleDeleteBuyer = id => {
    fetch(`https://assignment-12-server-side-gamma.vercel.app/users/${id}`,{
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if(data.deletedCount > 0){
        refetch();
        toast.success('Buyer deleted successfully');
      }
    })
  }
 
  if(isLoading){
    return <LoadingSpinner></LoadingSpinner>
  };

  if(buyers.length === 0){
    return (
      <div>
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold">All Buyers</h2>
          <label
            htmlFor="dashboard-drawer"
            className=" drawer-button lg:hidden"
          >
            <BsFillArrowRightSquareFill className="text-3xl"></BsFillArrowRightSquareFill>
          </label>
        </div>
        <div className="min-h-[70vh] flex items-center justify-center">
          <h2 className="text-2xl font-bold">No Buyers Found!!</h2>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-semibold">My Buyers</h2>
        <label
          htmlFor="dashboard-drawer"
          className=" drawer-button lg:hidden"
        >
          <BsFillArrowRightSquareFill className="text-3xl"></BsFillArrowRightSquareFill>
        </label>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {buyers?.map((buyer, i) => (
                <tr key={buyer?._id}>
                  <th>{i + 1}</th>
                  <td className="font-semibold">{buyer?.name}</td>
                  <td className="font-semibold">{buyer?.email}</td>
                  <td>
                    <button onClick={() => handleDeleteBuyer(buyer?._id)} className="btn btn-sm btn-error text-white">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllBuyers;
