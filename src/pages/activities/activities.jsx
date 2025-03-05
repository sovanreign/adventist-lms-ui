import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import { FaPlay, FaLock, FaUnlock } from "react-icons/fa";
import axios from "axios";
import { ACTIVITIES_URL, STUDENTS_URL } from "../../lib/constant";
import { useNavigate } from "react-router-dom";

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredActivities, setFilteredActivities] = useState([]);
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  // For students: store the ids of taken activities and a mapping of activityId to score.
  const [takenActivityIds, setTakenActivityIds] = useState([]);
  const [activityScores, setActivityScores] = useState({});

  const fetchActivities = async () => {
    try {
      const response = await axios.get(ACTIVITIES_URL);
      setActivities(response.data);
      setFilteredActivities(response.data);
    } catch (error) {
      console.error("Error fetching activities:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  useEffect(() => {
    const filtered = activities.filter((activity) =>
      activity.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredActivities(filtered);
  }, [searchTerm, activities]);

  // For a student, fetch their results to determine which activities they've taken.
  // The results array is expected to include objects with activityId and score.
  useEffect(() => {
    if (role === "Student") {
      const studentId = localStorage.getItem("sub");
      axios
        .get(`${STUDENTS_URL}/${studentId}`)
        .then((response) => {
          const results = response.data.results || [];
          const scoresMap = {};
          results.forEach((result) => {
            scoresMap[result.activityId] = result.score;
          });
          // Save the taken activity ids as numbers.
          setTakenActivityIds(Object.keys(scoresMap).map(Number));
          setActivityScores(scoresMap);
        })
        .catch((error) => {
          console.error("Error fetching student data:", error);
        });
    }
  }, [role]);

  const toggleLock = async (id, isOpen) => {
    try {
      await axios.patch(`${ACTIVITIES_URL}/${id}`, { isOpen: !isOpen });
      fetchActivities();
    } catch (error) {
      console.error("Error toggling lock:", error);
    }
  };

  return (
    <main>
      <Sidebar />
      <div className="ml-64">
        <Navbar title={"Games & Activities"} />

        <div className="p-8">
          <h1 className="font-semibold text-xl mb-8">Interactive Games</h1>

          <div className="flex justify-between items-center mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="input input-bordered pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center mt-10">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : filteredActivities.length === 0 ? (
            <div className="flex flex-col items-center text-center text-gray-500 mt-10">
              <img src="/no-data.png" alt="No Activities" className="w-1/4" />
              <p className="text-lg">No activities found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredActivities.map((activity) => {
                // Check if the current activity has been taken by the student.
                const alreadyTaken =
                  role === "Student" && takenActivityIds.includes(activity.id);
                return (
                  <div
                    key={activity.id}
                    className={`bg-white shadow-md rounded-lg p-4 relative cursor-pointer ${
                      alreadyTaken
                        ? "opacity-50 cursor-not-allowed"
                        : activity.isOpen
                        ? "opacity-100"
                        : "opacity-50"
                    }`}
                  >
                    <img
                      src={
                        activity.content === "count-the-fruit"
                          ? "/CTF.png"
                          : activity.content === "name-the-color"
                          ? "/CTN.png"
                          : "/FML.png"
                      }
                      alt="Activity Thumbnail"
                      className="w-full h-48 object-cover rounded-md"
                      onClick={() => {
                        navigate("/activities/history/" + activity.id);
                      }}
                    />
                    <h2 className="font-bold text-lg mt-4">{activity.title}</h2>
                    <p className="text-gray-600">{activity.description}</p>

                    {role === "Student" ? (
                      <div className="mt-4 flex items-center gap-2">
                        <button
                          className="bg-primary text-white py-2 px-4 rounded flex items-center"
                          disabled={!activity.isOpen || alreadyTaken}
                          onClick={() => {
                            if (!activity.isOpen || alreadyTaken) return;
                            navigate("/game/" + activity.id);
                          }}
                        >
                          <FaPlay className="mr-2" />
                          {alreadyTaken ? "Taken" : "Play"}
                        </button>
                        {alreadyTaken && (
                          <span className="badge">
                            {activityScores[activity.id]} / 10
                          </span>
                        )}
                      </div>
                    ) : (
                      <button
                        className="mt-4 bg-primary text-white py-2 px-4 rounded flex items-center cursor-pointer"
                        onClick={() => toggleLock(activity.id, activity.isOpen)}
                      >
                        {activity.isOpen ? (
                          <>
                            <FaLock className="mr-2" /> Lock
                          </>
                        ) : (
                          <>
                            <FaUnlock className="mr-2" /> Unlock
                          </>
                        )}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
