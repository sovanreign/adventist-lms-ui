import React, { useState, useEffect } from "react";
import axios from "axios";
import { USERS_URL } from "../../lib/constant";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get user ID and role from localStorage
  const userId = localStorage.getItem("sub");
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(`${USERS_URL}/${userId}`);
        setUser(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [userId]);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-500 p-4">Error: {error.message}</div>
    );

  // Determine profile image (Admin has no profile image field)
  const profileImage =
    userRole === "Teacher"
      ? user?.teacher?.profileUrl
        ? user?.teacher?.profileUrl
        : user?.gender === "Male"
        ? "/profile-m.png"
        : "/profile-w.png"
      : userRole === "Student"
      ? user?.student?.avatar
        ? user?.student?.avatar
        : user?.gender === "Male"
        ? "/profile-m.png"
        : "/profile-w.png"
      : user?.gender === "Male"
      ? "/profile-m.png"
      : "/profile-w.png";

  return (
    <main className="flex">
      <Sidebar />
      <div className="ml-64 w-full">
        <Navbar title="Profile" />
        <div className="p-6">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center mb-6">
            <img
              src={profileImage || "https://via.placeholder.com/150"} // Default image
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-300 shadow-lg"
            />
            <h1 className="text-2xl font-bold mt-2">
              {user?.firstName} {user?.middleName ? user.middleName : ""}{" "}
              {user?.lastName}
            </h1>
            <p className="text-gray-600">{userRole}</p>
          </div>

          {/* Basic Info */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p>
              <strong>Username:</strong> {user?.username}
            </p>
            <p>
              <strong>Age:</strong> {user?.age || "N/A"}
            </p>
            <p>
              <strong>Gender:</strong> {user?.gender}
            </p>
            <p>
              <strong>Address:</strong> {user?.address || "N/A"}
            </p>
          </div>

          {/* Role-Specific Details */}
          {userRole === "Admin" && <AdminProfile admin={user?.admin} />}
          {userRole === "Teacher" && <TeacherProfile teacher={user?.teacher} />}
          {userRole === "Student" && <StudentProfile student={user?.student} />}
        </div>
      </div>
    </main>
  );
}

// Admin Profile Component
function AdminProfile({ admin }) {
  return (
    <div className="mt-6 bg-blue-100 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">Admin Details</h2>
      <p>
        <strong>Email:</strong> {admin?.email}
      </p>
      <p>
        <strong>Employee ID:</strong> {admin?.employeeId}
      </p>
    </div>
  );
}

// Teacher Profile Component
function TeacherProfile({ teacher }) {
  return (
    <div className="mt-6 bg-green-100 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">Teacher Details</h2>
      <p>
        <strong>Email:</strong> {teacher?.email}
      </p>
      <p>
        <strong>Employee ID:</strong> {teacher?.employeeId}
      </p>
      <p>
        <strong>Bio:</strong> {teacher?.bio || "N/A"}
      </p>
    </div>
  );
}

// Student Profile Component
function StudentProfile({ student }) {
  return (
    <div className="mt-6 bg-yellow-100 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">Student Details</h2>
      <p>
        <strong>Student ID:</strong> {student?.studentId}
      </p>
      <p>
        <strong>Bio:</strong> {student?.bio || "N/A"}
      </p>
      {/* <p>
        <strong>Points:</strong> {student?.points}
      </p> */}
    </div>
  );
}
