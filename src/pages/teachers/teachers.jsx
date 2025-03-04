import Sidebar from "../../components/sidebar";
import { FaSearch, FaPlus, FaEllipsisH } from "react-icons/fa";
import { useState, useEffect } from "react";
import AddTeacher from "./components/add-teacher";
import axios from "axios";
import { TEACHERS_URL, USERS_URL } from "../../lib/constant";
import Navbar from "../../components/navbar";
import UpdateTeacher from "./components/update-teacher";

export default function Teachers() {
  const [openMenu, setOpenMenu] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTeachers, setFilteredTeachers] = useState([]);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get(TEACHERS_URL);
      setTeachers(response.data);
      setFilteredTeachers(response.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  useEffect(() => {
    const filtered = teachers.filter((teacher) =>
      teacher.user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTeachers(filtered);
  }, [searchTerm, teachers]);

  const deleteTeacher = async (id) => {
    try {
      await axios.delete(`${USERS_URL}/${id}`);
      setTeachers((prev) => prev.filter((teacher) => teacher.id !== id));
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  return (
    <main>
      <Sidebar />
      <div className="ml-64">
        <Navbar title={"Teachers"} />

        <div className="p-8">
          <h1 className="font-semibold text-xl mb-8">List of Teachers</h1>

          {/* Search, Filter, and Add Button */}
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
                document.getElementById("add_teacher_modal").showModal()
              }
            >
              <FaPlus /> Add Teacher
            </button>
          </div>

          {/* Loading Spinner */}
          {loading ? (
            <div className="flex justify-center items-center mt-10">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : filteredTeachers.length === 0 ? (
            <div className="text-center text-gray-500 mt-10 flex flex-col items-center">
              <img src="/no-data.png" alt="" className="w-1/4" />
              <p className="text-lg">No teachers found</p>
            </div>
          ) : (
            <div className="">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>Email</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeachers.map((teacher, index) => (
                    <tr key={index}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              <img
                                src={teacher.avatar || "/profile-w.png"}
                                alt="Avatar"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">
                              {teacher.user.firstName} {teacher.user.lastName}
                            </div>
                            <div className="text-sm opacity-50">
                              {teacher.employeeId}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{teacher.user.gender}</td>
                      <td>{teacher.user.age}</td>
                      <td>{teacher.email}</td>
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
                                    `update_teacher_modal_${teacher.id}`
                                  )
                                  .showModal();
                              }}
                            >
                              Update
                            </button>
                            <button
                              className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                              onClick={() => deleteTeacher(teacher.id)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                      <UpdateTeacher
                        teacherData={teacher}
                        fetchTeachers={fetchTeachers}
                      />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <AddTeacher fetchTeachers={fetchTeachers} />
    </main>
  );
}
