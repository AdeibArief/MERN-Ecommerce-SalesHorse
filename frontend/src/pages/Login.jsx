import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, location, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await login(formData.email, formData.password);

    if (success) {
      toast.success("Logged in sucessfully");
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 flex items-center justify-center">
      <div className=" w-full max-w-md ">
        <div className="card bg-base-100 shadow-2xl">
          <div className="card-body gap-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold">Login</h2>
              <p className="text-base-content/60 mt-2">
                Login to start purchasing...
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="form-control flex flex-col gap-1">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>

                <input
                  type="email"
                  name="email"
                  className="input input-bordered w-full"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-control flex flex-col gap-1">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>

                <input
                  type="password"
                  name="password"
                  className="input input-bordered w-full"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                className="btn btn-primary btn-block"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner">Logging in </span>
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            {/* Register link */}
            <div className="divider">OR</div>
            <p className="text-center">
              Don't have an account register here{" "}
              <Link className="link link-primary font-bold" to="/register">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
