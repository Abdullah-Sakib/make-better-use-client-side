import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import LoadingSpinner from "../../../../Components/LoadingSpinner/LoadingSpinner";

const ReportedItems = () => {
  const { data: reportedItems = [], refetch , isLoading} = useQuery({
    queryKey: ["reporteItems"],
    queryFn: () =>
    fetch("https://assignment-12-server-side-gamma.vercel.app/reportedItems", {
      headers: {
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
    }).then((res) => res.json()),
  });


  const handleDelete = (id, productId) => {
    fetch(`https://assignment-12-server-side-gamma.vercel.app/reportedItems?id=${id}&productId=${productId}`, {
      method: 'DELETE',
      headers: {
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if(data.productResult.deletedCount > 0 && data.reportResult.deletedCount > 0){
        toast.success('Reported item has been deleted.')
        refetch();
      }
    })
  };

  if(reportedItems.length === 0){
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <h2 className="text-2xl font-bold">No items found!!</h2>
      </div>
    )
  }

  if(isLoading){
    return <LoadingSpinner></LoadingSpinner>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-semibold">Reported Items</h2>
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
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reportedItems?.map((item, i) => (
                <tr key={item?._id}>
                  <th>{i + 1}</th>
                  <th>
                    <div className="avatar">
                      <div className="w-20 rounded">
                        <img
                          src={item?.image}
                          alt="Tailwind-CSS-Avatar-component"
                        />
                      </div>
                    </div>
                  </th>
                  <td className="font-semibold">{item?.name}</td>
                  <td  className="font-semibold">${item?.resellPrice}</td>
                  <td><button onClick={()=> handleDelete(item?._id, item?.productId)} className="btn btn-sm btn-error text-white">Delete</button></td>
                </tr>
              ))}
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportedItems;
