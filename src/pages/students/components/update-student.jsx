import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { STUDENTS_URL, USERS_URL, TEACHERS_URL } from "../../../lib/constant";

export default function UpdateStudent({ fetchStudents, studentData }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
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

  useEffect(() => {
    if (studentData) {
      setValue("username", studentData.user?.username || "");
      setValue("email", studentData.user?.email || "");
      setValue("firstName", studentData.user?.firstName || "");
      setValue("lastName", studentData.user?.lastName || "");
      setValue("middleName", studentData.user?.middleName || "");
      setValue("age", studentData.user?.age || "");
      setValue("gender", studentData.user?.gender || "");
      setValue("address", studentData.user?.address || "");
      setValue("studentId", studentData.studentId || "");
      setValue("teacherId", studentData.teacherId || "");
    }
  }, [studentData, setValue]);

  const onSubmit = async (data) => {
    try {
      await axios.patch(`${USERS_URL}/${studentData.user.id}`, {
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        middleName: data.middleName,
        age: +data.age || null,
        gender: data.gender,
        address: data.address || null,
      });

      await axios.patch(`${STUDENTS_URL}/${studentData.id}`, {
        studentId: data.studentId,
        teacherId: +data.teacherId,
      });

      fetchStudents();
      document.getElementById(`update_student_modal_${studentData.id}`).close();
      reset();
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  return (
    <dialog id={`update_student_modal_${studentData.id}`} className="modal">
      <div className="modal-box w-3/4 max-w-3xl">
        <h2 className="text-lg font-bold mb-4">Update Student</h2>
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
          </div>
          <div className="col-span-2 modal-action">
            <button
              type="button"
              className="btn"
              onClick={() => {
                document
                  .getElementById(`update_student_modal_${studentData.id}`)
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
