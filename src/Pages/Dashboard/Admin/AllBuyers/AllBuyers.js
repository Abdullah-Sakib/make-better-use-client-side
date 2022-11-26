import { useQuery } from '@tanstack/react-query';
import React from 'react';

const AllBuyers = () => {
  const {data: buyers = []} = useQuery({
    queryKey: ["allsellers"],
    queryFn: () =>
      fetch("http://localhost:5000/users/user").then((res) => res.json()),
  });
  console.log(buyers);
  return (
    <div>
      <h2>All buyers</h2>
    </div>
  );
};

export default AllBuyers;