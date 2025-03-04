import { useForm } from "react-hook-form";
import axios from "axios";
import { TEACHERS_URL, USERS_URL } from "../../../lib/constant";

export default function AddTeacher({ fetchTeachers }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // First, send user-related data to users API
      const userResponse = await axios.post(USERS_URL, {
        username: data.username,
        password: data.password,
        role: data.role,
        firstName: data.firstName,
        lastName: data.lastName,
        middleName: data.middleName,
        age: +data.age || null,
        gender: data.gender,
        address: data.address || null,
      });

      const userId = userResponse.data.id; // Extract generated user ID

      // Then, send teacher-related data to teachers API
      await axios.post(TEACHERS_URL, {
        id: userId,
        email: data.email,

        employeeId: data.employeeId,
      });

      fetchTeachers();
      document.getElementById("add_teacher_modal").close();
      reset();
    } catch (error) {
      console.error("Error adding teacher:", error);
    }
  };

  return (
    <dialog id="add_teacher_modal" className="modal">
      <div className="modal-box w-3/4 max-w-3xl">
        <h2 className="text-lg font-bold mb-4">Add New Teacher</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              {...register("username", { required: "Username is required" })}
              className="input input-bordered w-full"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="input input-bordered w-full"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Role</label>
            <input
              type="text"
              {...register("role", { required: "Role is required" })}
              className="input input-bordered w-full"
              defaultValue="Teacher"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium">First Name</label>
            <input
              type="text"
              {...register("firstName", { required: "First Name is required" })}
              className="input input-bordered w-full"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Last Name</label>
            <input
              type="text"
              {...register("lastName", { required: "Last Name is required" })}
              className="input input-bordered w-full"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Middle Name</label>
            <input
              type="text"
              {...register("middleName")}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Age</label>
            <input
              type="number"
              {...register("age")}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Gender</label>
            <select
              {...register("gender", { required: "Gender is required" })}
              className="input input-bordered w-full"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Address</label>
            <input
              type="text"
              {...register("address")}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="input input-bordered w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Employee ID</label>
            <input
              type="text"
              {...register("employeeId", {
                required: "Employee ID is required",
              })}
              className="input input-bordered w-full"
            />
            {errors.employeeId && (
              <p className="text-red-500 text-sm">
                {errors.employeeId.message}
              </p>
            )}
          </div>
          <div className="col-span-2 modal-action">
            <button
              type="button"
              className="btn"
              onClick={() => {
                document.getElementById("add_teacher_modal").close();
                reset();
              }}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
