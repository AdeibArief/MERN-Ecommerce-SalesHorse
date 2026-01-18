import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, updateProfile, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password && formData.password !== formData.confirmPassword) {
      toast.error("Passwords dont match");
      return;
    }

    setLoading(true);

    const result = await updateProfile({
      name: formData.name,
      email: formData.email,
      password: formData.password || undefined,
    });

    if (result.success) {
      toast.success("Profile Updated successfully");
      setFormData({ ...formData, password: "", confirmPassword: "" });
    } else {
      toast.error("Something is wrong");
    }

    setLoading(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    return;
  };
  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="text-3xl card-title font-bold mb-6">My Profile</h2>

            <div className="flex items-center gap-4 mb-6 p-4 bg-base-300 rounded-lg">
              <div className="avatar">
                <div className="w-20 rounded-full">
                  <img src={user?.avatar} alt={user?.name} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold">{user?.name}</h3>
                <p className="text-base-content/60">{user?.email}</p>
                <div className=" badge badge-primary mt-2">{user?.role}</div>
              </div>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Update Profile */}
              <div className="form-control flex flex-col">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-control">
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
              <div className="divider font-bold">Change Password (Optional)</div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text"> New Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  className="input input-bordered w-full"
                  value={formData.password}
                  onChange={handleChange}
                  minLength={6}
                />
              </div>

              {formData.password && (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Confirm New Password</span>
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Re-enter new password"
                    className="input input-bordered w-full"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="btn btn-primary flex-1"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      {" "}
                      <span className="loading loading-spinner">
                        Updating...
                      </span>
                    </>
                  ) : (
                    "Update profile"
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="btn btn-error btn-outline flex-1"
                >
                  Logout
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
