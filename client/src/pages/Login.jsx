import { useState } from "react";
import { useLogin } from "../hooks/useLogin";


export default function Login() {

// const [showPassword, setShowPassword] = useState(false); // for password




  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-lg border-0 rounded-4 p-4">
            <h3 className="text-center fw-bold mb-1">Welcome Back 👋</h3>
            <p className="text-center text-muted mb-4">Login to continue</p>

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
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>


              {/* <div className="mb-3 position-relative">
                <label className="form-label">Password</label>

                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control rounded-3 pe-5"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />

                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "38px",
                    cursor: "pointer",
                  }}
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div> */}




              {/* Button */}
              <button
                className="btn btn-primary w-100 rounded-3 py-2 fw-semibold"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
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
