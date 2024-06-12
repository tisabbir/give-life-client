import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { FaPenToSquare } from "react-icons/fa6";
import { useState } from "react";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import auth from "../../../firebase/firebase.config";

const Profile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [editable, setEditable] = useState(false);

  const { data: userInfo = {}, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const { name, email, avatarUrl, district, upozila, blood } = userInfo;

  const handleEdit = () => {
    setEditable(true);
  };
  const handleSave = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedName = form.name.value;
    const updatedDistrict = form.district.value;
    const updatedUpozila = form.upozila.value;
    const updatedBlood = form.blood.value;
    const updatedPhoto = form.photo.value;

    

    const updatedUser = {
      updatedName,
      updatedPhoto,
      updatedDistrict,
      updatedUpozila,
      updatedBlood,
    };

    axiosSecure.patch(`/users/${email}`, updatedUser)
    .then(res => {
        if(res.data.modifiedCount>0){

            updateProfile(auth.currentUser, {
                displayName: updatedName,
                photoURL: updatedPhoto,
              }).then(() => {
                // Profile updated!

              }).catch((error) => {
                // An error occurred
                console.log(error);
              });

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your profile has been updated",
                showConfirmButton: false,
                timer: 1500
              });
    
              setEditable(false);
              refetch();
        }
    })
    .catch(err => {
        console.log(err);
    })
  };

  return (
    <div className="mb-12">
      <SectionTitle Heading={"User Profile"} subHeading={name} />

      {editable ? (
        <div className="card w-full md:w-96 bg-base-100 shadow-xl mx-auto mt-4">
          <div className="flex  justify-end"></div>
          <figure className="">
            <img src={avatarUrl} alt="Shoes" className="max-w-72 w-3/4 rounded-full" />
          </figure>
          <div className="card-body items-center text-left">
            <form onSubmit={handleSave} className="space-y-4">
              <p className="flex justify-between items-center">
                Email : <span>{email}</span>{" "}
              </p>
              <p className="flex justify-between items-center">
                Name :
                <input
                  name="name"
                  defaultValue={name}
                  className="input input-sm border-2 border-gray-200 ml-4 "
                />
              </p>
              <p className="flex justify-between items-center">
                Picture :
                <input
                  name="photo"
                  defaultValue={avatarUrl}
                  className="input input-sm border-2 border-gray-200 ml-4 "
                />
              </p>
              <p className="flex justify-between items-center">
                District :{" "}
                <input
                  name="district"
                  defaultValue={district}
                  className="input input-sm border-2 border-gray-200 ml-4"
                />
              </p>
              <p className="flex justify-between items-center">
                Upozila :{" "}
                <input
                  name="upozila"
                  defaultValue={upozila}
                  className="input input-sm border-2 border-gray-200 ml-4"
                />{" "}
              </p>
              <p className="flex justify-between items-center">
                Blood Group :{" "}
                <input
                  name="blood"
                  defaultValue={blood}
                  className="input input-sm border-2 border-gray-200 ml-4"
                />{" "}
              </p>
              <input
                className="btn bg-[#9B111E] text-white w-full"
                type="submit"
                value={"Save"}
              />
            </form>
          </div>
        </div>
      ) : (
        <div className="card w-96 bg-base-100 shadow-xl mx-auto mt-4">
          <div className="flex  justify-end">
            <FaPenToSquare
              onClick={handleEdit}
              className="text-2xl text-[#9B111E] mr-4 hover:text-gray-500"
            />
          </div>
          <figure className="px-10 pt-10">
            <img src={avatarUrl} alt="Shoes" className="rounded-full" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title text-[#9B111E]">{name}</h2>
            <div>
              <p>Email : {email}</p>
              <p>District : {district}</p>
              <p>Upozila : {upozila}</p>
              <p>Blood Group : {blood}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
