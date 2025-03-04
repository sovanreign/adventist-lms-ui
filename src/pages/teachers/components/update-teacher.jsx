import { useForm } from "react-hook-form";
import axios from "axios";
import { TEACHERS_URL, USERS_URL } from "../../../lib/constant";
import { useEffect } from "react";

export default function UpdateTeacher({ fetchTeachers, teacherData }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Populate form with existing teacher data
  useEffect(() => {
    if (teacherData) {
      setValue("username", teacherData.user?.username || "");
      setValue("email", teacherData.email || "");
      setValue("firstName", teacherData.user?.firstName || "");
      setValue("lastName", teacherData.user?.lastName || "");
      setValue("middleName", teacherData.user?.middleName || "");
      setValue("age", teacherData.user?.age || "");
      setValue("gender", teacherData.user?.gender || "");
      setValue("address", teacherData.user?.address || "");
      setValue("employeeId", teacherData.employeeId || "");
    }
  }, [teacherData, setValue]);

  const onSubmit = async (data) => {
    try {
      // Update user-related data
      await axios.patch(`${USERS_URL}/${teacherData.id}`, {
        username: data.username,
        password: data.password || teacherData.password,
        role: data.role,
        firstName: data.firstName,
        lastName: data.lastName,
        middleName: data.middleName,
        age: +data.age || null,
        gender: data.gender,
        address: data.address || null,
      });

      // Update teacher-related data
      await axios.patch(`${TEACHERS_URL}/${teacherData.id}`, {
        email: data.email,
        employeeId: data.employeeId,
      });

      fetchTeachers();
      document.getElementById(`update_teacher_modal_${teacherData.id}`).close();
      reset();
    } catch (error) {
      console.error("Error updating teacher:", error);
    }
  };

  return (
    <dialog id={`update_teacher_modal_${teacherData.id}`} className="modal">
      <div className="modal-box w-3/4 max-w-3xl">
        <h2 className="text-lg font-bold mb-4">Update Teacher</h2>
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
            <label className="block text-sm font-medium">
              New Password (optional)
            </label>
            <input
              type="password"
              {...register("password", {
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">First Name</label>
            <input
              type="text"
              {...register("firstName", { required: "First Name is required" })}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Last Name</label>
            <input
              type="text"
              {...register("lastName", { required: "Last Name is required" })}
              className="input input-bordered w-full"
            />
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
          </div>
          <div className="col-span-2 modal-action">
            <button
              type="button"
              className="btn"
              onClick={() => {
                document
                  .getElementById(`update_teacher_modal_${teacherData.id}`)
                  .close();
              }}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
