import { Link } from "react-router-dom";
import PrimaryBtn from "../../../Components/PrimaryButton/PrimaryBtn";


const ContentManagement = () => {
    return (
        <div>
            <Link to={'/dashboard/content-management/add-blog'} className="flex justify-end mr-4"><PrimaryBtn btnText={'Add Blog'} /></Link>
        </div>
    );
};

export default ContentManagement;