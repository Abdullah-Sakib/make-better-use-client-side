import { useQuery } from "@tanstack/react-query";
import React from "react";

const AllSellers = () => {
  const { data: sellers = [] } = useQuery({
    queryKey: ["allsellers"],
    queryFn: () =>
      fetch("http://localhost:5000/users/seller").then((res) => res.json()),
  });

  console.log(sellers);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-5">All sellers</h2>
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

              {
                sellers?.map((seller, i) => (
                  <tr>
                  <th>{i + 1}</th>
                  <td>{seller?.name}</td>
                  <td>{seller?.email}</td>
                  <td><button className="btn btn-sm btn-error text-white">Delete</button></td>
                  <td><button className="btn btn-sm btn-success text-white">Verify</button></td>
                </tr>
                ))
              }
             
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllSellers;
