// import { useForm } from "react-hook-form";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { USERS_URL } from "../../../lib/constant";

// export default function EditProfile({ userData, fetchUserProfile }) {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     setValue,
//     formState: { errors },
//   } = useForm();

//   useEffect(() => {
//     if (userData) {
//       setValue("username", userData.username || "");
//       setValue("email", userData.email || "");
//       setValue("firstName", userData.firstName || "");
//       setValue("lastName", userData.lastName || "");
//       setValue("middleName", userData.middleName || "");
//       setValue("age", userData.age || "");
//       setValue("gender", userData.gender || "");
//       setValue("address", userData.address || "");
//     }
//   }, [userData, setValue]);

//   const onSubmit = async (data) => {
//     try {
//       await axios.patch(`${USERS_URL}/${userData.id}`, {
//         username: data.username,
//         email: data.email,
//         firstName: data.firstName,
//         lastName: data.lastName,
//         middleName: data.middleName,
//         age: +data.age || null,
//         gender: data.gender,
//         address: data.address || null,
//       });

//       fetchUserProfile();
//       document.getElementById("edit_profile_modal").close();
//       reset();
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     }
//   };

//   return (
//     <dialog id="edit_profile_modal" className="modal">
//       <div className="modal-box w-3/4 max-w-3xl">
//         <h2 className="text-lg font-bold mb-4">Edit Profile</h2>
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="grid grid-cols-2 gap-4"
//         >
//           <div>
//             <label className="block text-sm font-medium">Username</label>
//             <input
//               type="text"
//               {...register("username", { required: "Username is required" })}
//               className="input input-bordered w-full"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Email</label>
//             <input
//               type="email"
//               {...register("email", { required: "Email is required" })}
//               className="input input-bordered w-full"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">First Name</label>
//             <input
//               type="text"
//               {...register("firstName", { required: "First Name is required" })}
//               className="input input-bordered w-full"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Last Name</label>
//             <input
//               type="text"
//               {...register("lastName", { required: "Last Name is required" })}
//               className="input input-bordered w-full"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Middle Name</label>
//             <input
//               type="text"
//               {...register("middleName")}
//               className="input input-bordered w-full"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Age</label>
//             <input
//               type="number"
//               {...register("age")}
//               className="input input-bordered w-full"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Gender</label>
//             <select
//               {...register("gender", { required: "Gender is required" })}
//               className="input input-bordered w-full"
//             >
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Address</label>
//             <input
//               type="text"
//               {...register("address")}
//               className="input input-bordered w-full"
//             />
//           </div>
//           <div className="col-span-2 modal-action">
//             <button
//               type="button"
//               className="btn"
//               onClick={() => {
//                 document.getElementById("edit_profile_modal").close();
//               }}
//             >
//               Cancel
//             </button>
//             <button type="submit" className="btn btn-primary">
//               Update
//             </button>
//           </div>
//         </form>
//       </div>
//     </dialog>
//   );
// }
