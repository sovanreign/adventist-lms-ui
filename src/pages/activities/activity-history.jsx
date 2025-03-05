import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import axios from "axios";
import { ACTIVITIES_URL } from "../../lib/constant";
import { useParams } from "react-router-dom";
import { FaTrophy } from "react-icons/fa";

export default function ActivityHistory() {
  const { id } = useParams(); // Activity id
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the activity details, including its results.
  const fetchActivityData = async () => {
    try {
      const response = await axios.get(`${ACTIVITIES_URL}/${id}`);
      setActivity(response.data);
    } catch (error) {
      console.error("Error fetching activity data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivityData();
  }, [id]);

  // Sort results by score descending to calculate rankings.
  const sortedResults =
    activity?.results?.slice().sort((a, b) => b.score - a.score) || [];

  return (
    <main className="bg-gradient-to-r from-blue-100 to-blue-50 min-h-screen">
      <Sidebar />
      <div className="ml-64">
        <Navbar title={"Activity History"} />
        <div className="p-8">
          {loading ? (
            <div className="flex justify-center items-center mt-10">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : activity ? (
            <>
              <div className="mb-8 p-6 bg-white rounded-lg shadow-xl">
                <h1 className="font-bold text-3xl mb-2 text-center text-primary">
                  {activity.title}
                </h1>
                {activity.description && (
                  <p className="text-gray-600 text-center">
                    {activity.description}
                  </p>
                )}
                <p className="text-gray-600 text-center mt-2">
                  Total Points:{" "}
                  <span className="font-semibold">{activity.totalPoints}</span>
                </p>
              </div>
              {sortedResults.length === 0 ? (
                <div className="text-center text-gray-500 mt-10">
                  <p>No students have taken this activity yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="table table-zebra w-full shadow-lg rounded-lg bg-white">
                    <thead>
                      <tr>
                        <th>Profile</th>
                        <th>Name</th>
                        <th>ID</th>
                        <th>Score</th>
                        <th>Ranking</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedResults.map((result, index) => (
                        <tr key={result.id} className="hover:bg-blue-50">
                          <td>
                            <div className="avatar">
                              <div className="mask mask-squircle h-12 w-12">
                                <img
                                  src={
                                    result.student.avatar ||
                                    (result.student.user.gender === "Male"
                                      ? "/profile-m.png"
                                      : "/profile-f.png")
                                  }
                                  alt="Avatar"
                                />
                              </div>
                            </div>
                          </td>
                          <td>
                            {result.student.user.firstName}{" "}
                            {result.student.user.lastName}
                          </td>
                          <td>{result.student.studentId}</td>
                          <td className="font-bold">{result.score}</td>
                          <td className="flex items-center">
                            {index === 0 && (
                              <FaTrophy className="text-yellow-500 mr-2" />
                            )}
                            {index + 1}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          ) : (
            <div className="text-center text-gray-500 mt-10">
              <p>Activity not found.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
