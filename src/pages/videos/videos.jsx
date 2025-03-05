import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import {
  FaLock,
  FaPlus,
  FaSearch,
  FaUnlock,
  FaEllipsisH,
  FaPlay,
} from "react-icons/fa";
import AddVideo from "./components/add-video";
import axios from "axios";
import { VIDEOS_URL } from "../../lib/constant";
import UpdateVideo from "./components/update-video";

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [openMenu, setOpenMenu] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const role = localStorage.getItem("role");

  const fetchVideos = async () => {
    try {
      const response = await axios.get(VIDEOS_URL);
      setVideos(response.data);
      setFilteredVideos(response.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
    const filtered = videos.filter((video) =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVideos(filtered);
  }, [searchTerm, videos]);

  const extractVideoId = (url) => {
    const regExp =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const toggleLock = async (id) => {
    try {
      await axios.patch(`${VIDEOS_URL}/${id}`, {
        isOpen: !videos.find((video) => video.id === id).isOpen,
      });
      fetchVideos();
    } catch (error) {
      console.error("Error toggling lock:", error);
    }
  };

  const deleteVideo = async (id) => {
    try {
      await axios.delete(`${VIDEOS_URL}/${id}`);
      fetchVideos();
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  return (
    <main>
      <Sidebar />
      <div className="ml-64">
        <Navbar title={"Learning Materials"} />

        <div className="p-8">
          <h1 className="font-semibold text-xl mb-8">Video Lessons</h1>

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
            {role === "Student" ? (
              ""
            ) : (
              <button
                className="btn btn-primary flex items-center gap-2"
                onClick={() =>
                  document.getElementById("add_video_modal").showModal()
                }
              >
                <FaPlus /> Add Video Lesson
              </button>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center items-center mt-10">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : filteredVideos.length === 0 ? (
            <div className="text-center text-gray-500 mt-10 flex flex-col items-center">
              <img src="/no-data.png" alt="No Videos" className="w-1/4" />
              <p className="text-lg">No videos found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredVideos.map((video, index) => {
                const videoId = extractVideoId(video.linkUrl);
                return (
                  <div
                    key={video.id}
                    className={`bg-white shadow-md rounded-lg p-4 relative ${
                      video.isOpen ? "opacity-100" : "opacity-50"
                    }`}
                  >
                    {videoId ? (
                      <img
                        src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
                        alt="Video Thumbnail"
                        className="w-full h-48 object-cover rounded-md cursor-pointer"
                        onClick={() => {
                          if (video.isOpen) setSelectedVideo(video);
                        }}
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-md">
                        <span className="text-gray-500">No Thumbnail</span>
                      </div>
                    )}
                    <h2 className="font-bold text-lg mt-4">{video.title}</h2>
                    <p className="text-gray-600">{video.description}</p>

                    {role === "Student" ? (
                      <button
                        className="mt-4 bg-violet-700 text-white py-2 px-4 rounded flex items-center cursor-pointer"
                        disabled={!video.isOpen}
                        onClick={() => {
                          if (!video.isOpen) {
                            return;
                          }
                          setSelectedVideo(video);
                        }}
                      >
                        <FaPlay className="mr-2" /> Watch
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          if (role === "Student") return;
                          toggleLock(video.id);
                        }}
                        className="mt-4 bg-violet-700 text-white py-2 px-4 rounded flex items-center cursor-pointer"
                      >
                        {video.isOpen ? (
                          <FaLock className="mr-2" />
                        ) : (
                          <FaUnlock className="mr-2" />
                        )}
                        {video.isOpen ? "Unlock" : "Lock"}
                      </button>
                    )}

                    <div className="absolute top-2 right-2">
                      {role === "Student" ? (
                        ""
                      ) : (
                        <button
                          className="btn btn-ghost"
                          onClick={() =>
                            setOpenMenu(openMenu === index ? null : index)
                          }
                        >
                          <FaEllipsisH />
                        </button>
                      )}

                      {openMenu === index && (
                        <div className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded-md z-10">
                          <button
                            className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                            onClick={() =>
                              document
                                .getElementById(
                                  `update_video_modal_${video.id}`
                                )
                                .showModal()
                            }
                          >
                            Update
                          </button>
                          <button
                            className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                            onClick={() => deleteVideo(video.id)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                    <UpdateVideo fetchVideos={fetchVideos} videoData={video} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {selectedVideo && (
        <dialog id="video_modal" className="modal" open>
          <div className="modal-box w-3/4 max-w-4xl">
            <h2 className="text-lg font-bold mb-4">{selectedVideo.title}</h2>
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${extractVideoId(
                selectedVideo.linkUrl
              )}`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
            <div className="modal-action">
              <button className="btn" onClick={() => setSelectedVideo(null)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}

      <AddVideo fetchVideos={fetchVideos} />
    </main>
  );
}
