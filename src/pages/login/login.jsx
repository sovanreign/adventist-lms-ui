import { useForm } from "react-hook-form";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { LOGIN_URL } from "../../lib/constant";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${LOGIN_URL}`, data);
      const token = response.data.access_token;
      const decodedToken = jwtDecode(token);

      // Store token if needed
      localStorage.setItem("token", token);
      localStorage.setItem("sub", decodedToken.sub);
      localStorage.setItem("role", decodedToken.role);

      navigate("/home");
    } catch (error) {
      if (error.response?.status === 401) {
        reset();
        setError("username", {
          type: "manual",
          message: "Incorrect username or password",
        });
      } else {
        console.error("Login failed:", error.response?.data || error.message);
      }
    }
  };

  return (
    <div className="h-screen grid grid-cols-5">
      {/* Left Column - Empty */}
      <div className="col-span-3">
        <div className="flex items-center justify-center gap-10 mt-8">
          <img src="/logo.png" alt="School Logo" width={60} height={60} />
          <div>
            <h3 className="font-semibold">Malasiqui Adventist School, Inc.</h3>
            <p className="text-xs text-center">Malasiqui, Pangasinan</p>
          </div>
        </div>

        <div className="flex justify-center mt-24">
          <img src="/kinder.png" alt="Kinder Image" width={500} height={500} />
        </div>
      </div>

      {/* Right Column - Login Form */}
      <div className="col-span-2 flex items-center justify-center bg-violet-800">
        <div className="card w-96 bg-white shadow-xl p-6">
          <h2 className="text-2xl font-bold text-center">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            {/* Username */}
            <div>
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                {...register("username", { required: "Username is required" })}
                className="input input-bordered w-full"
                placeholder="your username"
              />
              {errors.username && (
                <p className="text-red-500 text-xs">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                placeholder="******"
                className="input input-bordered w-full"
              />
              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn bg-violet-600 hover:bg-violet-700 text-white w-full"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
