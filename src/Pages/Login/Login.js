import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import { BsGoogle } from "react-icons/bs";

const Login = () => {
  const { logIn, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleLogIn = (data) => {
    logIn(data.email, data.password)
      .then((result) => {
        reset();
        const user = result.user;
        getJWT({ email: user?.email });
        toast.success(`${user?.displayName} loged in successfully.`);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error("Please Try Again.");
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        const dataToSave = {
          fullname: user?.displayName,
          email: user?.email,
          seller: false,
        };
        saveUserInDatabase(dataToSave);
        getJWT({ email: result.user?.email });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error("Please Try Again.");
      });
  };

  const saveUserInDatabase = (data) => {
    const userData = {
      name: data.fullname,
      email: data.email,
      seller: `${data?.seller ? "seller" : "user"}`,
    };
    fetch("https://assignment-12-server-side-gamma.vercel.app/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success(`${userData.name} registered successfully`);
      });
  };

  const getJWT = (user) => {
    fetch("https://assignment-12-server-side-gamma.vercel.app/jwt", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("accessToken", data.accessToken);
      });
  };

  return (
    <div>
      <div className="md:hero md:min-h-screen mt-10 mb-20">
        <div className="md:hero-content flex-col px-6">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form
              onSubmit={handleSubmit(handleLogIn)}
              className="card-body w-full md:w-96"
            >
              <h1 className="text-2xl font-bold text-center">Login</h1>
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
                <label className="label">
                  <a href="/" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-2">
                <button className="btn btn-primary">Login</button>
              </div>
              <p className="text-sm text-center mt-2">
                Don't have an Account?{" "}
                <Link to="/register" className="font-bold text-primary">
                  Register
                </Link>
              </p>
            </form>
          </div>
          <div className="divider font-semibold">OR</div>
          <div>
            <button
              onClick={handleGoogleLogin}
              className="flex items-center shadow-xl w-full md:w-96 h-10 rounded-full bg-primary text-white py-6 border"
            >
              <BsGoogle className="text-3xl ml-2 "></BsGoogle>{" "}
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

export default Login;
