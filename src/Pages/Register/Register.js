import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BsGoogle } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";

const Register = () => {
  const { createUser, updateUserProfile, googleLogin } =
    useContext(AuthContext);
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const handleCreateUser = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        updateUserProfile(data.fullname)
          .then(() => {
            reset();
            saveUserInDatabase(data);
            const user = result.user;
            getJWT({email: user?.email});
            navigate(from, {replace: true});
            toast.success(`${data?.fullname} registered successfully`);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        const dataToSave = {
          fullname: user?.displayName,
          email: user?.email,
          seller: false
        };
        getJWT({email: result.user?.email});
        navigate(from, {replace: true});
        toast.success(`${result.user?.displayName} login successfully`);
        saveUserInDatabase(dataToSave);
      })
      .catch((error) => console.error(error));
  };

  const saveUserInDatabase = data => {
    const userData = {
      name: data.fullname,
      email: data.email,
      role: `${data?.seller ? 'seller': 'user'}`
    };
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization:`bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify(userData)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
  };

  const getJWT = user => {
    fetch('http://localhost:5000/jwt', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      localStorage.setItem('accessToken', data.accessToken)
    })
  };

  return (
    <div>
      <div className="hero mt-10 mb-20">
        <div className="hero-content flex-col ">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form
              onSubmit={handleSubmit(handleCreateUser)}
              className="card-body w-96"
            >
              <h1 className="text-2xl font-bold text-center">Register</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  placeholder="full name"
                  className="input input-bordered"
                  {...register("fullname", {
                    required: "Please provide your full name",
                  })}
                />
                {errors.fullname && (
                  <p className="text-error mt-1" role="alert">
                    {errors.fullname?.message}
                  </p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  {...register("email", {
                    required: "Please provide your email",
                  })}
                />
                {errors.email && (
                  <p className="text-error mt-1" role="alert">
                    {errors.email?.message}
                  </p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  {...register("password", {
                    required: "Please provide your password",
                  })}
                />
                {errors.password && (
                  <p className="text-error mt-1" role="alert">
                    {errors.password?.message}
                  </p>
                )}
              </div>
              <div className="form-control">
                <label className="label cursor-pointer justify-start">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    {...register("seller")}
                  />
                  <span className="label-text ml-4">Seller Account</span>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Register</button>
              </div>
              <p className="text-sm text-center mt-2">
                Already have an Account?{" "}
                <Link to="/login" className="font-bold text-primary">
                  Login
                </Link>
              </p>
            </form>
          </div>
          <div className="divider font-semibold">OR</div>
          <div>
            <button
              onClick={handleGoogleLogin}
              className="flex items-center shadow-xl w-96 h-10 rounded-full bg-primary text-white py-6 border"
            >
              <BsGoogle className="text-4xl ml-2 text-orange-400"></BsGoogle>{" "}
              <span className="flex-grow font-semibold">
                Continue With Google
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
