import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import { USERS_URL } from "../../lib/constant";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const role = localStorage.getItem("role");
  const id = localStorage.getItem("sub");

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${USERS_URL}/${id}`);
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (!userData) {
    return <p>Loading profile...</p>;
  }

  return (
    <main className="flex">
      <Sidebar />
      <div className="ml-64 w-full">
        <Navbar title="Profile" />
        <div className="p-8">
          <div className="my-10">
            <div className="card w-full bg-base-100 card-xs shadow-sm">
              <div className="card-body p-4">
                <div className="flex justify-between">
                  <div className="flex gap-4 items-center">
                    <div className="avatar">
                      <div className="w-32 rounded-full">
                        <img
                          src={userData.avatar || "/profile-m.png"}
                          alt="Profile"
                        />
                      </div>
                    </div>
                    <div>
                      <h1 className="text-xl font-bold">
                        {userData.firstName} {userData.lastName}
                      </h1>
                      <p className="text-lg">{userData.role}</p>
                    </div>
                  </div>
                  {/* <div>
                    <button className="btn">Edit</button>
                  </div> */}
                </div>
              </div>
            </div>

            <div className="mt-8 card w-full bg-base-100 card-xs shadow-sm">
              <div className="card-body p-4">
                <h2 className="text-lg font-semibold">Personal Information</h2>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {role !== "Student" && (
                    <div className="p-2">
                      <p className="text-sm font-semibold uppercase text-gray-600">
                        Email
                      </p>
                      <p className="text-md font-medium text-gray-900">
                        {role == "Admin"
                          ? userData.admin.email
                          : role == "Teacher"
                          ? userData.teacher.email
                          : ""}
                      </p>
                    </div>
                  )}

                  <div className="p-2">
                    <p className="text-sm font-semibold uppercase text-gray-600">
                      Age
                    </p>
                    <p className="text-md font-medium text-gray-900">
                      {userData.age}
                    </p>
                  </div>
                  <div className="p-2">
                    <p className="text-sm font-semibold uppercase text-gray-600">
                      Gender
                    </p>
                    <p className="text-md font-medium text-gray-900">
                      {userData.gender}
                    </p>
                  </div>
                  <div className="p-2">
                    <p className="text-sm font-semibold uppercase text-gray-600">
                      Address
                    </p>
                    <p className="text-md font-medium text-gray-900">
                      {userData.address}
                    </p>
                  </div>
                  <div className="p-2">
                    <p className="text-sm font-semibold uppercase text-gray-600">
                      {userData.role === "Student"
                        ? "Student ID"
                        : "Employee ID"}
                    </p>
                    <p className="text-md font-medium text-gray-900">
                      {role == "Student"
                        ? userData.student.studentId
                        : role == "Teacher"
                        ? userData.teacher.employeeId
                        : userData.admin.employeeId}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {role === "Student" && (
              <div className="mt-8 card w-full bg-base-100 card-xs shadow-sm">
                <div className="card-body p-4">
                  <h2 className="text-lg font-semibold">Achievements</h2>
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                    {achievements.length > 0 ? (
                      achievements.map((achievement, index) => (
                        <div
                          key={index}
                          className="flex flex-col items-center p-2"
                        >
                          <img
                            src={achievement.image}
                            alt={achievement.name}
                            className="w-20 h-20 object-cover"
                          />
                          <p className="text-md font-medium text-gray-900 mt-2">
                            {achievement.name}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p>No achievements available</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
