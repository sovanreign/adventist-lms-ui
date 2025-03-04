import Sidebar from "../../components/sidebar";
import { FaSearch, FaPlus, FaEllipsisH } from "react-icons/fa";
import { useState, useEffect } from "react";
import AddStudent from "./components/add-student";
import axios from "axios";
import { STUDENTS_URL, USERS_URL } from "../../lib/constant";
import Navbar from "../../components/navbar";
import UpdateStudent from "./components/update-student";

export default function Students() {
  const [openMenu, setOpenMenu] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(STUDENTS_URL);
      setStudents(response.data);
      setFilteredStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    const filtered = students.filter((student) =>
      student.user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [searchTerm, students]);

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`${USERS_URL}/${id}`);
      setStudents((prev) => prev.filter((student) => student.id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <main>
      <Sidebar />
      <div className="ml-64">
        <Navbar title={"Students"} />

        <div className="p-8">
          <h1 className="font-semibold text-xl mb-8">List of Students</h1>

          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="input input-bordered pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-3 text-gray-500" />
              </div>
            </div>
            <button
              className="btn btn-primary flex items-center gap-2"
              onClick={() =>
                document.getElementById("add_student_modal").showModal()
              }
            >
              <FaPlus /> Add Student
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center mt-10">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="text-center text-gray-500 mt-10 flex flex-col items-center">
              <img src="/no-data.png" alt="" className="w-1/4" />
              <p className="text-lg">No students found</p>
            </div>
          ) : (
            <div className="">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>Teacher</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student, index) => (
                    <tr key={index}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              <img
                                src={student.avatar || "/profile-w.png"}
                                alt="Avatar"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">
                              {student.user.firstName} {student.user.lastName}
                            </div>
                            <div className="text-sm opacity-50">
                              {student.studentId}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{student.user.gender}</td>
                      <td>{student.user.age}</td>
                      {student.teacher ? (
                        <td>
                          {student.teacher.user.firstName}{" "}
                          {student.teacher.user.lastName}
                        </td>
                      ) : (
                        <td>None</td>
                      )}

                      <td className="relative">
                        <button
                          className="btn btn-ghost btn-xs"
                          onClick={() =>
                            setOpenMenu(openMenu === index ? null : index)
                          }
                        >
                          <FaEllipsisH />
                        </button>
                        {openMenu === index && (
                          <div className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded-md z-10">
                            <button
                              className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                              onClick={() => {
                                document
                                  .getElementById(
                                    `update_student_modal_${student.id}`
                                  )
                                  .showModal();
                              }}
                            >
                              Update
                            </button>
                            <button
                              className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                              onClick={() => deleteStudent(student.id)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                      <UpdateStudent
                        studentData={student}
                        fetchStudents={fetchStudents}
                      />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <AddStudent fetchStudents={fetchStudents} />
    </main>
  );
}
