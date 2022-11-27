import { useQuery } from "@tanstack/react-query";
import React  from "react";
import toast from "react-hot-toast";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import LoadingSpinner from "../../../../Components/LoadingSpinner/LoadingSpinner";

const AllSellers = () => {
  const {
    data: sellers = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allsellers"],
    queryFn: () =>
      fetch("https://assignment-12-server-side-gamma.vercel.app/users/seller",{
        headers: {
          authorization: `bearer ${localStorage.getItem('accessToken')}`
        }
      }).then((res) => res.json()),
  });

  const handleDeleteSeller = (id) => {
    const agree = window.confirm('Are you sure you want to delete this seller');
    if(!agree){
      return
    }
    fetch(`https://assignment-12-server-side-gamma.vercel.app/users/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          refetch();
          toast.success("Seller deleted successfully");
        }
      });
  };

  const handleVerifySeller = (id, email) => {
    const agree = window.confirm('Are you sure you want to make this seller verified.');
    if(!agree){
      return
    }
    fetch(`https://assignment-12-server-side-gamma.vercel.app/users?id=${id}&email=${email}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Seller verified successfully");
          refetch();
        }
      });
  };

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>
  }

  if(sellers.length === 0){
    return (
      <div>
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold">All Sellers</h2>
          <label
            htmlFor="dashboard-drawer"
            className=" drawer-button lg:hidden"
          >
            <BsFillArrowRightSquareFill className="text-3xl"></BsFillArrowRightSquareFill>
          </label>
        </div>
        <div className="min-h-[70vh] flex items-center justify-center">
          <h2 className="text-2xl font-bold">No Sellers Found!!</h2>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-semibold">My Sellers</h2>
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
                <th>Verify</th>
              </tr>
            </thead>
            <tbody>
              {sellers?.map((seller, i) => (
                <tr key={seller._id}>
                  <th>{i + 1}</th>
                  <td>{seller?.name}</td>
                  <td>{seller?.email}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteSeller(seller?._id)}
                      className="btn btn-sm btn-error text-white"
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    {seller?.verifiedSeller ? (
                      <span className="text-success font-bold ml-1">Verified</span>
                    ) : (
                      <button
                        onClick={() => handleVerifySeller(seller?._id, seller?.email)}
                        className="btn btn-sm btn-success text-white"
                      >
                        Verify
                      </button>
                    )}
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

export default AllSellers;
