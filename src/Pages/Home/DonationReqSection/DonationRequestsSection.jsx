import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";


const DonationRequestsSection = () => {
    const axiosPublic = useAxiosPublic();
    const {data : pendingDonationRequests} = useQuery({
        queryKey: ['pendingDonationRequests'],
        queryFn: async () => {
            const result =  await axiosPublic.get('/pendingDonationRequests')
            return result.data;
        }
    })

    console.log(pendingDonationRequests);

    return (
        <div>
            <SectionTitle Heading={'Donation Requests'} subHeading={"Save Life by donating blood"} />
            <h1>{pendingDonationRequests?.length}</h1>
        </div>
    );
};

export default DonationRequestsSection;