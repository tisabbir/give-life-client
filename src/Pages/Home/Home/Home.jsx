import Banner from "../Banner/Banner";
import ContactUs from "../ContactUs/ContactUs";
import DonationRequestsSection from "../DonationReqSection/DonationRequestsSection";
import FeaturedSection from "../FeaturedSection/FeaturedSection";

const Home = () => {
  return (
    <div>
      <Banner />
      
      <FeaturedSection />
      <ContactUs />
    </div>
  );
};

export default Home;
