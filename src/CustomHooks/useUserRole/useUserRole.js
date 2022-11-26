import { useState } from "react";

const useUserRole = () => {
  const [role, setRole] = useState("");
  const [roleLoading, setRoleLoading] = useState(true);

  fetch(`http://localhost:5000/userrole`, {
    headers: {
      authorization: `bearer ${localStorage.getItem("accessToken")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
        setRole(data?.role);
        setRoleLoading(false);
    })
    .catch(error => {
      console.log(error);
      setRoleLoading(false);
    })

  return {role, roleLoading};
};

export default useUserRole;
