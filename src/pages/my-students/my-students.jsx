import Sidebar from "../../components/sidebar";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import { TEACHERS_URL, USERS_URL } from "../../lib/constant";
import Navbar from "../../components/navbar";

export default function MyStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);

  // Get the teacher's id from localStorage
  const teacherId = localStorage.getItem("sub");

  const fetchTeacherData = async () => {
    try {
      // Fetch teacher data (which includes a students array)
      const response = await axios.get(`${TEACHERS_URL}/${teacherId}`);
      const teacherData = response.data;
      setStudents(teacherData.students || []);
      setFilteredStudents(teacherData.students || []);
    } catch (error) {
      console.error("Error fetching teacher data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeacherData();
  }, []);

  useEffect(() => {
    const filtered = students.filter((student) =>
      student.user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [searchTerm, students]);

  return (
    <main>
      <Sidebar />
      <div className="ml-64">
        <Navbar title={"My Students"} />

        <div className="p-8">
          <h1 className="font-semibold text-xl mb-8">List of My Students</h1>

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
          </div>

          {loading ? (
            <div className="flex justify-center items-center mt-10">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="text-center text-gray-500 mt-10 flex flex-col items-center">
              <img src="/no-data.png" alt="No data" className="w-1/4" />
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
                    <th>Address</th>
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
                                src={
                                  student.avatar
                                    ? student.avatar
                                    : student.user.gender === "Male"
                                    ? "/profile-m.png"
                                    : "/profile-m.png"
                                }
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
                      <td>{student.user.address || "No Info"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
