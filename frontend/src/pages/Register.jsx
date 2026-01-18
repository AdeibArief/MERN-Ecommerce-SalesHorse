import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const { register, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    const result = await register(formData.name, formData.email, formData.password);

    if (result?.success) {
      toast.success("Registered successfully");
      navigate("/", { replace: true });
    } else {
      toast.error(result?.message || "Registration failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body gap-6">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-3xl font-bold">Create Account</h2>
              <p className="text-base-content/60 mt-2">
                Sign up to continue shopping on <span className="font-semibold text-primary">SalesHorse</span>
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Full Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  className="input input-bordered w-full"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  className="input input-bordered w-full"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="At least 6 characters"
                  className="input input-bordered w-full"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                />
              </div>

              {/* Confirm Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Confirm Password</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Re-enter your password"
                  className="input input-bordered w-full"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="loading loading-spinner loading-sm"></span>
                    Creating account...
                  </span>
                ) : (
                  "Register"
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="divider my-0">OR</div>

            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary font-semibold">
                Login here
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom subtle note */}
        <p className="text-center text-xs text-base-content/50 mt-6">
          By registering, you agree to our Terms & Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Register;
