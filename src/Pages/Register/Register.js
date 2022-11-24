import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const handleCreateUser = data => {
    console.log(data);
  }
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col ">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(handleCreateUser)} className="card-body w-96">
              <h1 className="text-2xl font-bold text-center">Register</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  placeholder="full name"
                  className="input input-bordered"
                  {...register("fullname", { required: "Please provide your full name" })} 
                />
                 {errors.fullname && <p className="text-error" role="alert">{errors.fullname?.message}</p>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  {...register("email", { required: "Please provide your email" })} 
                />
                 {errors.email && <p className="text-error" role="alert">{errors.email?.message}</p>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  {...register("password", { required: "Please provide your password" })} 
                />
                 {errors.password && <p className="text-error" role="alert">{errors.password?.message}</p>}
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
        </div>
      </div>
    </div>
  );
};

export default Register;
