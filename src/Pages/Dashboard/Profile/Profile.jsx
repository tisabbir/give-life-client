import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";


const Profile = () => {

    const axiosSecure= useAxiosSecure();
    const {user} = useAuth();

    const {data : userInfo = {}} = useQuery({
        queryKey: ['user'],
        queryFn : async () => {
            const res = await axiosSecure.get(`/users/${user.email}`)
            return res.data;
        }
    })


    const {
        name,
        email,
        avatarUrl,
        district,
        upozila,
        blood,
      } = userInfo;



  return (
    <div className=" my-4">
        <SectionTitle Heading={'User Profile'} subHeading={name} />
      <div className="card w-96 bg-base-100 shadow-xl mx-auto">
        <figure className="px-10 pt-10">
          <img
            src={avatarUrl}
            alt="Shoes"
            className="rounded-full"
          />
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
    </div>
  );
};

export default Profile;
