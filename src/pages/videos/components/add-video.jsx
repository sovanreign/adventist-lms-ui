import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { VIDEOS_URL } from "../../../lib/constant";

export default function AddVideo({ fetchVideos }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [thumbnail, setThumbnail] = useState(null);

  const extractVideoId = (url) => {
    const regExp =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const handleUrlChange = (e) => {
    const videoId = extractVideoId(e.target.value);
    if (videoId) {
      setThumbnail(`https://img.youtube.com/vi/${videoId}/0.jpg`);
    } else {
      setThumbnail(null);
    }
  };

  const onSubmit = async (data) => {
    try {
      await axios.post(VIDEOS_URL, {
        title: data.title,
        description: data.description,
        linkUrl: data.linkUrl,
      });

      fetchVideos();
      document.getElementById("add_video_modal").close();
      reset();
      setThumbnail(null);
    } catch (error) {
      console.error("Error adding video:", error);
    }
  };

  return (
    <dialog id="add_video_modal" className="modal">
      <div className="modal-box w-3/4 max-w-3xl">
        <h2 className="text-lg font-bold mb-4">Add New Video Lesson</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="input input-bordered w-full"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="textarea textarea-bordered w-full"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">YouTube Link</label>
            <input
              type="text"
              {...register("linkUrl", {
                required: "YouTube link is required",
                pattern: {
                  value:
                    /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/,
                  message: "Enter a valid YouTube link",
                },
              })}
              className="input input-bordered w-full"
              onChange={handleUrlChange}
            />
            {errors.linkUrl && (
              <p className="text-red-500 text-sm">{errors.linkUrl.message}</p>
            )}
          </div>
          {thumbnail && (
            <div className="mt-4">
              <label className="block text-sm font-medium">
                Thumbnail Preview
              </label>
              <img
                src={thumbnail}
                alt="Video Thumbnail"
                className="w-full h-48 object-cover rounded-md"
              />
            </div>
          )}
          <div className="modal-action">
            <button
              type="button"
              className="btn"
              onClick={() => {
                document.getElementById("add_video_modal").close();
                reset();
                setThumbnail(null);
              }}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Video
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
