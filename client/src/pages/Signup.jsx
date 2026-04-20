import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
  };

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-lg border-0 rounded-4 p-4">
            <h3 className="text-center fw-bold mb-1">Create Account 🚀</h3>
            <p className="text-center text-muted mb-4">
              Sign up to get started
            </p>

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control rounded-3"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control rounded-3"
                  placeholder="Create a password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>

              {/* Button */}
              <button
                className="btn btn-success w-100 rounded-3 py-2 fw-semibold"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Sign Up"}
              </button>

              {/* Error */}
              {error && (
                <div className="alert alert-danger mt-3 py-2 text-center">
                  {error}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
