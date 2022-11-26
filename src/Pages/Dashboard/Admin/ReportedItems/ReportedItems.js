import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";

const ReportedItems = () => {
  const { data: reportedItems = [], refetch } = useQuery({
    queryKey: ["reporteItems"],
    queryFn: () =>
      fetch("http://localhost:5000/reportedItems").then((res) => res.json()),
  });


  const handleDelete = (id, productId) => {
    fetch(`http://localhost:5000/reportedItems?id=${id}&productId=${productId}`, {
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(data => {
      if(data.productResult.deletedCount > 0 && data.reportResult.deletedCount > 0){
        toast.success('Reported item has been deleted.')
        refetch();
      }
    })
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-5">Reported Items</h2>
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
                <tr>
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
