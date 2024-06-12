import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useVolunteer = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data : isVolunteer, isPending : isVolunteerLoading} = useQuery({
        queryKey: ['isVolunteer', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/volunteer/${user.email}`)
            return res.data?.volunteer;
        }
    })
    return [isVolunteer, isVolunteerLoading];
};

export default useVolunteer;