import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { STUDENTS_URL, USERS_URL, TEACHERS_URL } from "../../../lib/constant";

export default function AddStudent({ fetchStudents }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get(TEACHERS_URL);
        setTeachers(response.data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };
    fetchTeachers();
  }, []);

  const onSubmit = async (data) => {
    try {
      // First, send user-related data to users API
      const userResponse = await axios.post(USERS_URL, {
        username: data.username,
        password: data.password,
        role: "Student",
        firstName: data.firstName,
        lastName: data.lastName,
        middleName: data.middleName,
        age: +data.age || null,
        gender: data.gender,
        address: data.address || null,
      });

      const userId = userResponse.data.id; // Extract generated user ID

      // Then, send student-related data to students API
      await axios.post(STUDENTS_URL, {
        id: userId,
        studentId: data.studentId,
        teacherId: +data.teacherId,
      });

      fetchStudents();
      document.getElementById("add_student_modal").close();
      reset();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <dialog id="add_student_modal" className="modal">
      <div className="modal-box w-3/4 max-w-3xl">
        <h2 className="text-lg font-bold mb-4">Add New Student</h2>
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
            <label className="block text-sm font-medium">Student ID</label>
            <input
              type="text"
              {...register("studentId", { required: "Student ID is required" })}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Teacher</label>
            <select
              {...register("teacherId", { required: "Teacher is required" })}
              className="input input-bordered w-full"
            >
              <option value="">Select a teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.user.firstName} {teacher.user.lastName}
                </option>
              ))}
            </select>
            {errors.teacherId && (
              <p className="text-red-500 text-sm">{errors.teacherId.message}</p>
            )}
          </div>
          <div className="col-span-2 modal-action">
            <button
              type="button"
              className="btn"
              onClick={() => {
                document.getElementById("add_student_modal").close();
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
